/* ============================================================
   The Brewing Bible — journal-core.js

   Phần logic thuần của trang nhật ký pha: đổi đơn vị, kiểm dữ liệu,
   xuất CSV, đóng gói và đọc lại bản sao. Không đụng DOM, không đụng
   IndexedDB, không gọi mạng — nên test được bằng `node --test` như
   search.js, còn journal.js chỉ còn việc vẽ và lưu.

   Đơn vị: gam, °C, giây. Tỉ lệ luôn viết dạng "1:x".
   ============================================================ */
(function (root) {
  "use strict";

  var CORE = {};

  /* ---------- nhỏ ---------- */

  function str(v) {
    return v === null || v === undefined ? "" : String(v).trim();
  }

  /* Nhận cả "16,7" (bàn phím tiếng Việt) lẫn "16.7". */
  function num(v) {
    if (v === null || v === undefined || v === "") return null;
    var n = typeof v === "number" ? v : parseFloat(String(v).trim().replace(",", "."));
    return isFinite(n) ? n : null;
  }

  /* ---------- bã ----------
     Bốn hình dạng mắt thường phân biệt được khi nhìn phễu sau khi rút.
     Đây đúng là mục "bã" trong mẫu của chương Nhật ký pha, cộng thêm
     "mảng khô" bắn lên thành giấy mà chương Đọc bã mô tả. */

  CORE.BEDS = [
    { key: "deu", label: "Đều" },
    { key: "ho", label: "Có hố" },
    { key: "mang-kho", label: "Mảng khô" },
    { key: "lan", label: "Lẫn" }
  ];

  CORE.bedLabel = function (key) {
    var k = str(key);
    for (var i = 0; i < CORE.BEDS.length; i++) {
      if (CORE.BEDS[i].key === k) return CORE.BEDS[i].label;
    }
    return "";
  };

  /* ---------- tỉ lệ ---------- */

  /* Số thuận để so sánh và để đưa vào bảng tính: 250/15 → 16.7 */
  CORE.ratio = function (dose, water) {
    var d = num(dose);
    var w = num(water);
    if (d === null || w === null || d <= 0 || w <= 0) return null;
    return Math.round((w / d) * 10) / 10;
  };

  /* Một chữ số thập phân, và chỉ khi cần: 1:16 chứ không phải 1:16.0 */
  CORE.ratioText = function (dose, water, sep) {
    var r = CORE.ratio(dose, water);
    if (r === null) return "";
    var s = String(r);
    if (r === Math.round(r)) s = String(Math.round(r));
    if (sep === ",") s = s.replace(".", ",");
    return "1:" + s;
  };

  /* ---------- thời gian ---------- */

  /* "2:45" → 165; "165" → 165; "2:75" → null (không có phút 75 giây). */
  CORE.parseTime = function (v) {
    var s = str(v).replace(/\s+/g, "");
    if (!s) return null;
    var m = /^(\d{1,3}):(\d{1,2})$/.exec(s);
    if (m) {
      var mm = parseInt(m[1], 10);
      var ss = parseInt(m[2], 10);
      if (ss > 59) return null;
      return mm * 60 + ss;
    }
    if (/^\d{1,4}([.,]\d)?$/.test(s)) {
      return Math.round(parseFloat(s.replace(",", ".")));
    }
    return null;
  };

  CORE.timeText = function (sec) {
    var t = num(sec);
    if (t === null || t < 0) return "";
    t = Math.round(t);
    var m = Math.floor(t / 60);
    var s = t % 60;
    return m + ":" + (s < 10 ? "0" + s : s);
  };

  /* ---------- ngày ---------- */

  /* Luôn "YYYY-MM-DD" theo giờ máy, không qua UTC: ghi lúc 23:50 ở Hà Nội
     không được thành ngày hôm sau. */
  CORE.dateText = function (v) {
    if (v instanceof Date && !isNaN(v.getTime())) {
      var y = v.getFullYear();
      var mo = v.getMonth() + 1;
      var d = v.getDate();
      return y + "-" + (mo < 10 ? "0" + mo : mo) + "-" + (d < 10 ? "0" + d : d);
    }
    var s = str(v);
    if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return s;
    var iso = /^(\d{4})-(\d{2})-(\d{2})T/.exec(s);
    if (iso) return iso[1] + "-" + iso[2] + "-" + iso[3];
    return "";
  };

  /* "2026-11-03" → "3/11" (danh sách) — năm chỉ hiện khi khác năm nay. */
  CORE.dateShort = function (v, today) {
    var s = CORE.dateText(v);
    if (!s) return "";
    var parts = s.split("-");
    var d = parseInt(parts[2], 10);
    var m = parseInt(parts[1], 10);
    var y = CORE.dateText(today || new Date()).slice(0, 4);
    var out = d + "/" + m;
    if (parts[0] !== y) out += "/" + parts[0];
    return out;
  };

  /* ---------- bản ghi ---------- */

  CORE.emptyRecord = function () {
    return {
      id: "",
      createdAt: 0,
      updatedAt: 0,
      date: "",
      coffee: "",
      daysOffRoast: null,
      dose: null,
      water: null,
      temp: null,
      grind: "",
      brewer: "",
      totalSec: null,
      drawdownSec: null,
      bed: "",
      axes: { sang: null, day: null, huong: null, hau: null },
      note: "",
      photo: null,
      thumb: null
    };
  };

  function axis(v) {
    var n = num(v);
    if (n === null) return null;
    n = Math.round(n);
    return n < 1 ? 1 : n > 5 ? 5 : n;
  }

  /* Chuẩn hoá một object thô (từ form, từ tệp nhập, từ IndexedDB) thành
     đúng hình dạng của CORE.emptyRecord. Trường lạ bị bỏ, không mang theo
     vào cơ sở dữ liệu. */
  CORE.normalize = function (raw) {
    raw = raw && typeof raw === "object" ? raw : {};
    var rec = CORE.emptyRecord();
    var ax = raw.axes && typeof raw.axes === "object" ? raw.axes : {};

    rec.id = str(raw.id);
    rec.createdAt = Math.max(0, Math.round(num(raw.createdAt) || 0));
    rec.updatedAt = Math.max(0, Math.round(num(raw.updatedAt) || 0));
    rec.date = CORE.dateText(raw.date);
    rec.coffee = str(raw.coffee);
    rec.daysOffRoast = (function () {
      var n = num(raw.daysOffRoast);
      if (n === null || n < 0) return null;
      return Math.round(n);
    })();
    rec.dose = num(raw.dose);
    rec.water = num(raw.water);
    rec.temp = num(raw.temp);
    rec.grind = str(raw.grind);
    rec.brewer = str(raw.brewer);
    rec.totalSec = CORE.parseTime(raw.totalSec);
    rec.drawdownSec = CORE.parseTime(raw.drawdownSec);
    rec.bed = CORE.bedLabel(raw.bed) ? str(raw.bed) : "";
    rec.axes = {
      sang: axis(ax.sang),
      day: axis(ax.day),
      huong: axis(ax.huong),
      hau: axis(ax.hau)
    };
    rec.note = str(raw.note);
    rec.photo = raw.photo === undefined ? null : raw.photo;
    rec.thumb = raw.thumb === undefined ? null : raw.thumb;
    return rec;
  };

  /* Lỗi chặn lưu. Chỉ bốn trường: ngày, cà, nước, và nhiệt độ nếu có nhập.
     Mọi thứ khác để trống được — mẫu của sách cũng để trống được. */
  CORE.validate = function (rec) {
    var errs = [];
    if (!rec || !CORE.dateText(rec.date)) errs.push("Thiếu ngày (hoặc ngày sai dạng).");
    if (rec && rec.dose !== null && rec.dose !== undefined) {
      if (!(rec.dose > 0)) errs.push("Cà phải lớn hơn 0 g.");
    } else {
      errs.push("Thiếu khối lượng cà (g).");
    }
    if (rec && rec.water !== null && rec.water !== undefined) {
      if (!(rec.water > 0)) errs.push("Nước phải lớn hơn 0 g.");
    } else {
      errs.push("Thiếu khối lượng nước (g).");
    }
    if (rec && rec.temp !== null && rec.temp !== undefined && !(rec.temp >= 0 && rec.temp <= 100)) {
      errs.push("Nhiệt độ phải trong khoảng 0–100 °C.");
    }
    var r = rec ? CORE.ratio(rec.dose, rec.water) : null;
    if (r !== null && (r < 3 || r > 40)) {
      errs.push("Tỉ lệ " + CORE.ratioText(rec.dose, rec.water, ",") + " nằm ngoài khoảng 1:3–1:40 — kiểm lại đơn vị.");
    }
    return errs;
  };

  /* Mới nhất trước; cùng ngày thì bản ghi tạo sau lên trước. */
  CORE.sortRecords = function (list) {
    return (list || []).slice().sort(function (a, b) {
      var d = String(b && b.date ? b.date : "").localeCompare(String(a && a.date ? a.date : ""));
      if (d) return d;
      return (b && b.createdAt ? b.createdAt : 0) - (a && a.createdAt ? a.createdAt : 0);
    });
  };

  /* ---------- CSV ----------
     Xuất để mở bằng bảng tính: một hàng một lần pha. Số thập phân dùng
     dấu chấm, không dùng dấu phẩy — máy đặt dấu phẩy làm phân cách thập
     phân sẽ đọc "16,7" thành hai cột. */

  CORE.CSV_HEADER = [
    "Ngày", "Cà", "Ngày sau rang", "Cà (g)", "Nước (g)", "Tỉ lệ", "Nhiệt (°C)",
    "Xay", "Dụng cụ", "Tổng (s)", "Rút (s)", "Bã",
    "Sáng", "Đầy", "Hướng", "Hậu vị", "Ghi chú", "Có ảnh"
  ];

  function csvCell(v) {
    if (v === null || v === undefined) return "";
    var s;
    if (typeof v === "number") {
      s = String(Math.round(v * 10) / 10);
    } else {
      s = String(v);
    }
    /* Một ô bắt đầu bằng = + - @ bị Excel/LibreOffice hiểu là công thức.
       Thêm dấu nháy đơn để nó ở lại là chữ. */
    if (/^[=+\-@\t\r]/.test(s)) s = "'" + s;
    if (/[",\n\r;]/.test(s)) s = '"' + s.replace(/"/g, '""') + '"';
    return s;
  }

  CORE.csvCell = csvCell;

  CORE.toCsv = function (records) {
    var rows = [CORE.CSV_HEADER.map(csvCell).join(",")];
    (records || []).forEach(function (r) {
      var rec = CORE.normalize(r);
      rows.push([
        rec.date,
        rec.coffee,
        rec.daysOffRoast === null ? "" : rec.daysOffRoast,
        rec.dose,
        rec.water,
        CORE.ratio(rec.dose, rec.water),
        rec.temp,
        rec.grind,
        rec.brewer,
        rec.totalSec,
        rec.drawdownSec,
        CORE.bedLabel(rec.bed),
        rec.axes.sang,
        rec.axes.day,
        rec.axes.huong,
        rec.axes.hau,
        rec.note,
        rec.photo ? "có" : ""
      ].map(csvCell).join(","));
    });
    return rows.join("\r\n") + "\r\n";
  };

  /* ---------- bản sao ----------
     Một tệp .html tự chứa: mở được bằng trình duyệt để đọc, và nhập lại
     được bằng chính trang nhật ký. Ảnh nằm trong đó dưới dạng data URL.

     Vì sao không phải ZIP: repo này không có thư viện nào, và tự viết ZIP
     là thêm một chỗ để sai. Một tệp HTML có JSON ở trong là thứ mở được
     hai mươi năm nữa mà không cần công cụ gì. */

  CORE.BACKUP_VERSION = 1;
  CORE.BACKUP_KIND = "brewing-bible-journal";

  function escHtml(s) {
    return String(s === null || s === undefined ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  CORE.buildBackup = function (brews, meta) {
    meta = meta || {};
    var payload = {
      kind: CORE.BACKUP_KIND,
      version: CORE.BACKUP_VERSION,
      exportedAt: meta.exportedAt || new Date().toISOString(),
      brews: brews || []
    };
    /* "<\/" là escape hợp lệ của JSON cho "/", nên JSON.parse đọc lại đúng
       nguyên văn — nhưng chuỗi "</script>" trong ghi chú không còn đóng
       được thẻ script của tệp này. */
    var json = JSON.stringify(payload).replace(/<\//g, "<\\/");
    var n = payload.brews.length;
    var when = escHtml(payload.exportedAt.slice(0, 10));

    return [
      "<!DOCTYPE html>",
      '<html lang="vi"><head><meta charset="utf-8">',
      '<meta name="viewport" content="width=device-width, initial-scale=1">',
      "<title>Nhật ký pha — bản sao " + when + "</title>",
      "<style>body{font:15px/1.6 system-ui,-apple-system,sans-serif;max-width:42rem;margin:2rem auto;padding:0 1.2rem;color:#221d17;background:#f4efe5}",
      "h1{font-size:1.4rem;margin:0 0 .3rem}p{color:#7d7065}code{background:#ece4d6;padding:.1em .3em;border-radius:3px}",
      "table{border-collapse:collapse;width:100%;font-size:.85rem;margin-top:1.5rem}td,th{border-bottom:1px solid #ded2bf;padding:.35rem .5rem;text-align:left}</style>",
      "</head><body>",
      "<h1>Nhật ký pha — bản sao</h1>",
      "<p>" + n + " lần pha · xuất ngày " + when + ". Tệp này tự chứa dữ liệu và ảnh. ",
      "Mở <code>journal.html</code> của sách rồi chọn <strong>Nhập bản sao</strong> để đưa trở lại.</p>",
      "<table><thead><tr><th>Ngày</th><th>Cà</th><th>Tỉ lệ</th><th>Bã</th><th>Vị</th></tr></thead><tbody>",
      payload.brews.map(function (r) {
        var rec = CORE.normalize(r);
        return "<tr><td>" + escHtml(rec.date) + "</td><td>" + escHtml(rec.coffee) + "</td><td>" +
          escHtml(CORE.ratioText(rec.dose, rec.water, ",")) + "</td><td>" +
          escHtml(CORE.bedLabel(rec.bed)) + "</td><td>" +
          escHtml([rec.axes.sang, rec.axes.day, rec.axes.huong, rec.axes.hau].map(function (a) {
            return a === null ? "—" : a;
          }).join("/")) + "</td></tr>";
      }).join(""),
      "</tbody></table>",
      '<script type="application/json" id="brew-data">' + json + "<\/script>",
      "</body></html>"
    ].join("\n");
  };

  /* Nhận cả .html (bản sao của trang này) lẫn .json (mảng trần hoặc
     object có khoá brews). */
  CORE.readBackup = function (text) {
    var s = String(text === null || text === undefined ? "" : text);
    var m = /<script[^>]*id=["']brew-data["'][^>]*>([\s\S]*?)<\/script>/i.exec(s);
    var body = m ? m[1] : s;
    var data;
    try {
      data = JSON.parse(body);
    } catch (e) {
      throw new Error("Tệp không phải JSON hợp lệ — có phải bản sao của nhật ký không?");
    }
    if (Array.isArray(data)) return { version: 0, brews: data };
    if (!data || typeof data !== "object" || !Array.isArray(data.brews)) {
      throw new Error("Không thấy danh sách lần pha trong tệp.");
    }
    return data;
  };

  root.JOURNAL_CORE = CORE;
  if (typeof module === "object" && module.exports) module.exports = CORE;
})(typeof window !== "undefined" ? window : globalThis);
