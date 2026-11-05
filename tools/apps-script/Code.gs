/**
 * Nhật ký pha — máy nhận (The Brewing Bible)
 *
 * Dán tệp này vào một Google Sheet: Extensions → Apps Script → Code.gs.
 * Rồi làm đúng bốn bước trong SYNC.md. Tóm tắt:
 *
 *   1. Đổi TOKEN bên dưới thành chuỗi ngẫu nhiên của bạn.
 *   2. Deploy → New deployment → Web app
 *        Execute as: Me
 *        Who has access: Anyone
 *   3. Copy URL kết thúc bằng /exec.
 *   4. Dán URL + token vào trang journal.html, bấm "Kiểm tra kết nối".
 *
 * Vì sao "Anyone": trang nhật ký là trang tĩnh, không có đăng nhập Google.
 * Nếu để "Anyone with Google account", trình duyệt sẽ không gửi được. Cái
 * chặn truy cập là TOKEN, không phải quyền của deployment — xem mục bảo
 * mật trong SYNC.md để biết nó chặn được gì và không chặn được gì.
 *
 * Máy nhận chỉ biết hai việc: ghi một dòng (theo id: có thì cập nhật, chưa
 * có thì thêm) và lưu ảnh bã vào Drive. Không có lệnh xoá, không đọc dữ
 * liệu ra ngoài.
 */

/* Đổi dòng này. Đừng dùng chuỗi mẫu: script từ chối chạy khi còn chuỗi mẫu. */
const TOKEN = "DAN-TOKEN-CUA-BAN-VAO-DAY";

const SHEET_NAME = "Nhật ký pha";
const FOLDER_NAME = "Brewing Bible — ảnh bã";

/* Thứ tự cột. Đổi ở đây thì phải đổi cả mảng values trong upsertBrew_ và
   cột Ảnh (cột 19) ở dòng đọc lại ảnh cũ. */
const HEADER = [
  "id", "Ngày", "Cà", "Ngày sau rang", "Cà (g)", "Nước (g)", "Tỉ lệ", "Nhiệt (°C)",
  "Xay", "Dụng cụ", "Tổng (s)", "Rút (s)", "Bã",
  "Sáng", "Đầy", "Hướng", "Hậu vị", "Ghi chú", "Ảnh", "Cập nhật",
  "Mã nhật ký", "Người ghi", "Các bước"
];

const COL_PHOTO = 19; /* 1-based, khớp HEADER ở trên */

function doPost(e) {
  try {
    if (TOKEN === "DAN-TOKEN-CUA-BAN-VAO-DAY") {
      return json_({ ok: false, error: "Chưa đổi TOKEN trong Code.gs." });
    }
    if (!e || !e.postData || !e.postData.contents) {
      return json_({ ok: false, error: "Thiếu nội dung." });
    }

    var body;
    try {
      body = JSON.parse(e.postData.contents);
    } catch (err) {
      return json_({ ok: false, error: "Body không phải JSON." });
    }

    if (String(body.token || "") !== TOKEN) {
      return json_({ ok: false, error: "Sai token." });
    }

    if (body.kind === "ping") {
      return json_({ ok: true, pong: true, sheet: sheet_().getName() });
    }
    if (body.kind !== "brew" || !body.brew || !body.brew.id) {
      return json_({ ok: false, error: "Thiếu kind hoặc brew.id." });
    }

    return json_(upsertBrew_(body.brew));
  } catch (err) {
    return json_({ ok: false, error: String(err && err.message ? err.message : err) });
  }
}

/* Mở thẳng URL /exec bằng trình duyệt thì thấy dòng này. Không có dữ liệu
   nào ở đây, và không cần token — nó không trả lời gì ngoài câu chào. */
function doGet() {
  return ContentService
    .createTextOutput("Nhật ký pha — máy nhận đang chạy. Gửi dữ liệu bằng trang journal.html.")
    .setMimeType(ContentService.MimeType.TEXT);
}

function json_(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function sheet_() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var sh = ss.getSheetByName(SHEET_NAME);
  if (!sh) sh = ss.insertSheet(SHEET_NAME);
  fixHeader_(sh);
  return sh;
}

/* Bảng tính là thứ người ta sửa tay. Thêm cột vào HEADER (như "Mã nhật ký"
   và "Người ghi") thì sheet cũ vẫn phải có tiêu đề cho cột mới, nếu không
   dữ liệu ghi vào cột không tên và chẳng ai đọc ra được. Chỉ điền ô tiêu đề
   còn trống — không ghi đè cột bạn đã đổi tên. */
function fixHeader_(sh) {
  if (sh.getLastRow() === 0) {
    sh.appendRow(HEADER);
    sh.getRange(1, 1, 1, HEADER.length).setFontWeight("bold");
    sh.setFrozenRows(1);
    return;
  }
  var width = Math.max(sh.getLastColumn(), 1);
  var have = sh.getRange(1, 1, 1, width).getValues()[0];
  var filled = 0;
  for (var i = 0; i < HEADER.length; i++) {
    if (String(have[i] || "") !== "") continue;
    sh.getRange(1, i + 1).setValue(HEADER[i]);
    filled++;
  }
  if (filled) sh.getRange(1, 1, 1, HEADER.length).setFontWeight("bold");
}

function folder_() {
  var props = PropertiesService.getScriptProperties();
  var id = props.getProperty("folderId");
  if (id) {
    try {
      return DriveApp.getFolderById(id);
    } catch (err) {
      /* Folder bị xoá: tạo lại, đừng làm hỏng cả lần đẩy. */
    }
  }
  var it = DriveApp.getFoldersByName(FOLDER_NAME);
  var folder = it.hasNext() ? it.next() : DriveApp.createFolder(FOLDER_NAME);
  props.setProperty("folderId", folder.getId());
  return folder;
}

/* Base64 của trang nhật ký → một tệp JPEG trong Drive. Trả URL tệp.
    Ảnh đã được nén tại máy (cạnh dài 1200 px) nên thường 150–250 KB. */
function savePhoto_(b) {
  var dataUrl = String(b.photoBase64 || "");
  var m = /^data:([^;,]*)(;base64)?,([\s\S]*)$/.exec(dataUrl);
  if (!m) return "";

  var bytes = Utilities.base64Decode(m[3]);
  var name = String(b.photoName || ("ba-" + b.id + ".jpg")).replace(/[^\w.\-]+/g, "_");
  var blob = Utilities.newBlob(bytes, m[1] || "image/jpeg", name);
  var file = folder_().createFile(blob);
  file.setDescription("Nhật ký pha " + (b.date || "") + " — " + (b.coffee || ""));
  return file.getUrl();
}

function numOr_(v) {
  if (v === null || v === undefined || v === "") return "";
  var n = Number(v);
  return isFinite(n) ? n : "";
}

/* Ghi theo id: tìm dòng cũ thì cập nhật, không có thì thêm mới. Nhờ vậy
   lần đẩy lại sau khi mất mạng không sinh ra dòng trùng, và sửa một lần
   pha trên điện thoại thì Sheet cũng được sửa theo. */
function upsertBrew_(b) {
  var sh = sheet_();
  var last = sh.getLastRow();

  var row = 0;
  if (last > 1) {
    var ids = sh.getRange(2, 1, last - 1, 1).getValues();
    for (var i = 0; i < ids.length; i++) {
      if (String(ids[i][0]) === String(b.id)) {
        row = i + 2;
        break;
      }
    }
  }

  var photoUrl = "";
  if (b.photoBase64) {
    photoUrl = savePhoto_(b);
  } else if (row) {
    photoUrl = String(sh.getRange(row, COL_PHOTO).getValue() || "");
  }

  var axes = b.axes || {};
  var values = [
    String(b.id || ""),
    String(b.date || ""),
    String(b.coffee || ""),
    numOr_(b.daysOffRoast),
    numOr_(b.dose),
    numOr_(b.water),
    numOr_(b.ratio),
    numOr_(b.temp),
    String(b.grind || ""),
    String(b.brewer || ""),
    numOr_(b.totalSec),
    numOr_(b.drawdownSec),
    String(b.bed || ""),
    numOr_(axes.sang),
    numOr_(axes.day),
    numOr_(axes.huong),
    numOr_(axes.hau),
    String(b.note || ""),
    photoUrl,
    String(b.updatedAt ? new Date(Number(b.updatedAt)).toISOString() : new Date().toISOString()),
    String(b.ownerId || ""),
    String(b.ownerName || ""),
    /* "0:00/30 · 0:45/120 · 1:30/250" — một ô, không tách thành Bước 1,
       Bước 2: số bước thay đổi mỗi người, cột cố định sẽ đầy ô trống. */
    String(b.pours || "")
  ];

  if (row) {
    sh.getRange(row, 1, 1, values.length).setValues([values]);
  } else {
    sh.appendRow(values);
    row = sh.getLastRow();
  }

  return { ok: true, row: row, photoUrl: photoUrl };
}
