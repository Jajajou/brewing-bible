/* ============================================================
   The Brewing Bible — journal-i18n.js

   Chuỗi giao diện cho trang nhật ký, hai ngôn ngữ. Tách khỏi journal.js
   để dịch thuật là một việc riêng, và để test được bằng `node --test`:
   hai bảng phải có đúng cùng tập khoá, không khoá nào rỗng, và cùng tập
   chỗ trống {x}.

   Vì sao không dùng i18n.js của sách: trang này tự chứa, không nạp
   book.js, và bảng chuỗi của sách mô tả mục lục / tìm kiếm / nút in —
   không có một khoá nào cho nhật ký. Hai bảng riêng, mỗi bảng đúng việc
   của nó, hơn là một bảng chung phải gánh cả hai.

   Quy ước: `vi` là bản gốc. Thiếu khoá ở `en` thì rơi về `vi`, không bao
   giờ hiện rỗng — nhưng test bắt buộc hai bảng khớp nhau, nên chỗ rơi
   đó chỉ là lưới an toàn lúc đang sửa, không phải trạng thái bình thường.

   Dữ liệu (CSV, cột trên Sheet) KHÔNG đi qua tệp này: tiêu đề cột giữ
   tiếng Việt ở mọi ngôn ngữ giao diện, để hai người dùng hai ngôn ngữ
   vẫn so sánh được cùng một Sheet.
   ============================================================ */
(function (root) {
  "use strict";

  var S = {
    vi: {
      "doc.title": "Nhật ký pha — The Brewing Bible",
      "doc.desc": "Ghi một lần pha bằng điện thoại: bảy dòng như mẫu trong sách, cộng ảnh bã và bốn trục vị. Dữ liệu nằm trong máy, xuất được ra bản sao.",
      "doc.appleTitle": "Nhật ký pha",
      "doc.heading": "Nhật ký pha",

      "nav.back": "Sách",
      "nav.guide": "Hướng dẫn",
      "nav.themeAria": "Đổi giao diện sáng/tối",
      "nav.langAria": "Đổi ngôn ngữ",
      "nav.langOther": "EN",

      "lede": "Bảy dòng của mẫu trong sách, cộng ảnh bã. Ghi xong một lần pha mất khoảng 40 giây.",
      "local.data": "<b>Dữ liệu nằm trong trình duyệt này</b> — không có server nào nhận. Xoá dữ liệu trình duyệt là mất, nên xuất bản sao mỗi tuần.",
      "local.export": "Xuất bản sao",

      "form.date": "Ngày",
      "form.days": "Ngày sau rang",
      "form.coffee": "Cà",
      "form.coffeePh": "tên, xưởng rang",
      "form.dose": "Cà (g)",
      "form.water": "Nước (g)",
      "form.temp": "Nhiệt (°C)",
      "form.grind": "Cỡ xay",
      "form.grindPh": "Comandante 22",
      "form.brewer": "Dụng cụ",
      "form.brewerPh": "V60",
      "form.bed": "Bã",
      "form.total": "Tổng (m:ss)",
      "form.draw": "Rút (m:ss)",

      "bed.deu": "Đều",
      "bed.ho": "Có hố",
      "bed.mang-kho": "Mảng khô",
      "bed.lan": "Lẫn",

      "form.poursLegend": "Các bước rót (không bắt buộc)",
      "form.poursHint": "Mỗi bước là một mốc thời gian và tổng nước đã rót tính đến mốc đó — đúng con số bạn đọc trên cân. Để trống nếu bạn chỉ muốn ghi tổng và rút.",
      "form.poursAdd": "+ Thêm lần rót",
      "form.pourRow": "Lần {n}",
      "form.pourTimePh": "0:45",
      "form.pourWaterPh": "120",
      "form.pourTimeAria": "Thời gian của lần rót {n}",
      "form.pourWaterAria": "Nước cộng dồn của lần rót {n}, gam",
      "form.pourRemoveAria": "Xoá lần rót {n}",
      "form.poursIncomplete": "Bước {n} còn thiếu thời gian hoặc nước — dòng đó sẽ không được lưu.",

      "form.axesLegend": "Vị, mỗi trục 1–5",
      "axes.sang": "Sáng",
      "axes.day": "Đầy",
      "axes.huong": "Hướng",
      "axes.hau": "Hậu vị",
      "axes.hint": "1 và 5 là hai đầu của thang trong sách: sáng 1 chín/nặng → 5 tươi/nhiều acid; đầy 1 mỏng → 5 tròn; hướng 1 caramel/hạt → 5 trái cây/hoa; hậu vị 1 sạch/ngắn → 5 nặng/dài.",

      "form.note": "Ghi chú (một câu)",
      "form.notePh": "hố ở giữa, fines ở đáy…",

      "photo.pick": "📷 Chụp bã",
      "photo.clear": "Xoá ảnh",
      "photo.hint": "Ảnh được nén tại máy còn cạnh dài 1200 px trước khi lưu. Nhìn phễu sau khi rút — hố, mảng khô trên thành giấy, fines ở đáy. Đó là mục “đọc bã” của sách.",
      "photo.alt": "Ảnh bã vừa chụp",
      "photo.compressing": "Đang nén…",
      "photo.listAlt": "Bã sau khi pha",

      "actions.save": "Lưu lần pha này",
      "actions.update": "Cập nhật",
      "actions.cancel": "Huỷ sửa",
      "actions.keep": "Giữ cà / tỉ lệ / nhiệt / xay / bước rót",
      "actions.edit": "Sửa",
      "actions.delete": "Xoá",

      "history.heading": "Đã ghi",
      "history.count": "{n} lần",
      "history.empty": "Chưa có lần nào. Lần đầu mất khoảng 40 giây — bảy dòng như mẫu trong sách.",
      "storage.using": "Đang dùng {size} trong bộ nhớ của trình duyệt này.",

      "card.noName": "Không tên",
      "card.bedPrefix": "Bã: ",
      "card.poursPrefix": "Rót: ",
      "card.total": "tổng",
      "card.draw": "rút",
      "card.days": "ngày sau rang",
      "card.unsynced": "chưa đẩy",
      "card.unsyncedTitle": "Chưa đẩy lên Google Sheet",
      "card.otherTitle": "Ghi ở nhật ký khác, không phải máy này",
      "card.other": "nhật ký {code}",

      "sync.summary": "Đồng bộ Google Sheet (tuỳ chọn)",
      "sync.help": "Dán URL triển khai và token của bạn. Cấu hình chỉ nằm trên máy này, không nằm trong trang. Cách dựng máy nhận: <a href=\"guide.html\">hướng dẫn</a> · <a href=\"SYNC.md\">bản kỹ thuật</a>.",
      "sync.owner": "Nhật ký của ai",
      "sync.ownerPh": "tên bạn",
      "sync.code": "Mã nhật ký này",
      "sync.nameHelp": "Tên đi vào cột “Người ghi” trên Sheet. Hai nhật ký đẩy vào cùng một Sheet vẫn biết dòng nào của ai — đây là nhãn, không phải đăng nhập.",
      "sync.url": "URL triển khai (kết thúc /exec)",
      "sync.token": "Token",
      "sync.tokenPh": "chuỗi bạn đặt trong Code.gs",
      "sync.save": "Lưu cấu hình",
      "sync.test": "Kiểm tra kết nối",
      "sync.push": "Đẩy lên Sheet",
      "sync.savedLocal": "Đã lưu trên máy này.",
      "sync.clearedCfg": "Đã xoá cấu hình đồng bộ.",
      "sync.needCfg": "Chưa có URL và token. Dán vào hai ô trên rồi lưu.",
      "sync.needBoth": "Cần cả URL và token.",
      "sync.nothing": "Không còn gì để đẩy.",
      "sync.checking": "Đang kiểm tra…",
      "sync.connected": "Kết nối được.",
      "sync.connectedSheet": "Kết nối được. Sheet: {sheet}",
      "sync.connectFail": "Không kết nối được: {err}",
      "sync.noUrl": "Chưa có URL triển khai.",
      "sync.pushingStart": "Đang đẩy 0/{n}…",
      "sync.pushing": "Đang đẩy {i}/{n}…",
      "sync.pushed": "Đã đẩy {n} lần pha lên Sheet.",
      "sync.pushedSome": "Đã đẩy {pushed}, còn {failed} lỗi: {err}",
      "sync.error": "Lỗi: {err}",
      "sync.pendingCount": "{n} chưa đẩy",

      "tools.exportHtml": "Xuất bản sao (.html)",
      "tools.exportCsv": "Xuất CSV",
      "tools.import": "Nhập bản sao",
      "tools.note": "Bản sao .html tự chứa dữ liệu và ảnh — mở được bằng trình duyệt, nhập lại được. CSV để mở bằng bảng tính: một hàng một lần pha.",
      "export.busy": "Đang đóng gói…",

      "footer.text": "Trang này không gửi gì ra ngoài. Muốn giữ lâu: bấm <b>Xuất bản sao</b> rồi cất tệp đó ở Drive, hoặc gửi cho chính mình. Ảnh bã, cùng tên cà và cỡ xay, là thứ cho bạn biết lần sau nên đổi gì — xem chương “Đọc bã: chẩn đoán bằng mắt” trong <a href=\"./\">sách</a>.",

      "confirm.delete": "Xoá {label}?",
      "confirm.brew": "lần pha",

      "err.db": "Không mở được cơ sở dữ liệu: {err}",
      "err.save": "Không lưu được: {err}",
      "err.delete": "Không xoá được: {err}",
      "err.export": "Không xuất được: {err}",
      "err.exportNone": "Chưa có lần pha nào để xuất.",
      "err.photo": "Ảnh không dùng được: {err}",
      "err.importRead": "Không đọc được tệp.",
      "err.importFail": "Không nhập được: {err}",
      "err.backupJson": "Tệp không phải JSON hợp lệ — có phải bản sao của nhật ký không?",
      "err.backupNoBrews": "Không thấy danh sách lần pha trong tệp.",
      "err.noStore": "Trình duyệt này không có IndexedDB, nên trang nhật ký không lưu được. Dùng Chrome, Safari hoặc Firefox bản mới.",
      "err.noCore": "Thiếu journal-core.js.",
      "alert.imported": "Đã nhập {n} lần pha.",
      "alert.importedSkipped": "Đã nhập {n} lần pha, bỏ qua {skipped} bản đã có.",

      "validate.date": "Thiếu ngày (hoặc ngày sai dạng).",
      "validate.dose.zero": "Cà phải lớn hơn 0 g.",
      "validate.dose.missing": "Thiếu khối lượng cà (g).",
      "validate.water.zero": "Nước phải lớn hơn 0 g.",
      "validate.water.missing": "Thiếu khối lượng nước (g).",
      "validate.temp.range": "Nhiệt độ phải trong khoảng 0–100 °C.",
      "validate.ratio.range": "Tỉ lệ {ratio} nằm ngoài khoảng 1:3–1:40 — kiểm lại đơn vị.",

      "pour.time": "Bước {n}: mốc thời gian không tăng so với bước trước.",
      "pour.water": "Bước {n}: nước không tăng so với bước trước.",
      "pour.over": "Bước cuối vượt ô Nước (g) — kiểm lại con số."
    },

    en: {
      "doc.title": "Brew log — The Brewing Bible",
      "doc.desc": "Log a brew on your phone: the seven lines of the book's template, plus a photo of the bed and four taste axes. Data stays on your device and exports to a backup file.",
      "doc.appleTitle": "Brew log",
      "doc.heading": "Brew log",

      "nav.back": "Book",
      "nav.guide": "Guide",
      "nav.themeAria": "Toggle light and dark",
      "nav.langAria": "Change language",
      "nav.langOther": "VI",

      "lede": "The seven lines of the book's template, plus a photo of the bed. Logging one brew takes about 40 seconds.",
      "local.data": "<b>The data lives in this browser</b> — no server receives it. Clearing browser data loses it, so export a backup every week.",
      "local.export": "Export backup",

      "form.date": "Date",
      "form.days": "Days off roast",
      "form.coffee": "Coffee",
      "form.coffeePh": "name, roaster",
      "form.dose": "Coffee (g)",
      "form.water": "Water (g)",
      "form.temp": "Temp (°C)",
      "form.grind": "Grind",
      "form.grindPh": "Comandante 22",
      "form.brewer": "Brewer",
      "form.brewerPh": "V60",
      "form.bed": "Bed",
      "form.total": "Total (m:ss)",
      "form.draw": "Drawdown (m:ss)",

      "bed.deu": "Even",
      "bed.ho": "Crater",
      "bed.mang-kho": "Dry patch",
      "bed.lan": "Patchy",

      "form.poursLegend": "Pour steps (optional)",
      "form.poursHint": "Each step is a time on the clock and the total water poured by then — the number you read on the scale. Leave it empty if you only want total and drawdown.",
      "form.poursAdd": "+ Add pour",
      "form.pourRow": "Pour {n}",
      "form.pourTimePh": "0:45",
      "form.pourWaterPh": "120",
      "form.pourTimeAria": "Time of pour {n}",
      "form.pourWaterAria": "Cumulative water of pour {n}, grams",
      "form.pourRemoveAria": "Remove pour {n}",
      "form.poursIncomplete": "Pour {n} is missing a time or a water amount — that row will not be saved.",

      "form.axesLegend": "Taste, 1–5 on each axis",
      "axes.sang": "Brightness",
      "axes.day": "Body",
      "axes.huong": "Direction",
      "axes.hau": "Finish",
      "axes.hint": "1 and 5 are the ends of the book's scale: brightness 1 baked/heavy → 5 fresh/high acid; body 1 thin → 5 round; direction 1 caramel/nut → 5 fruit/floral; finish 1 clean/short → 5 heavy/long.",

      "form.note": "Note (one sentence)",
      "form.notePh": "crater in the middle, fines at the bottom…",

      "photo.pick": "📷 Shoot the bed",
      "photo.clear": "Remove photo",
      "photo.hint": "The photo is compressed on the device to 1200 px on the long edge before saving. Look at the cone after the drawdown — the crater, the dry patches on the filter wall, the fines at the bottom. That is the book's “reading the bed” section.",
      "photo.alt": "Photo of the bed just taken",
      "photo.compressing": "Compressing…",
      "photo.listAlt": "Bed after brewing",

      "actions.save": "Save this brew",
      "actions.update": "Update",
      "actions.cancel": "Cancel edit",
      "actions.keep": "Keep coffee / ratio / temp / grind / pours",
      "actions.edit": "Edit",
      "actions.delete": "Delete",

      "history.heading": "Logged",
      "history.count": "{n} brews",
      "history.empty": "Nothing yet. The first one takes about 40 seconds — seven lines, as in the book's template.",
      "storage.using": "Using {size} in this browser's storage.",

      "card.noName": "Unnamed",
      "card.bedPrefix": "Bed: ",
      "card.poursPrefix": "Pours: ",
      "card.total": "total",
      "card.draw": "drawdown",
      "card.days": "days off roast",
      "card.unsynced": "not synced",
      "card.unsyncedTitle": "Not pushed to Google Sheets yet",
      "card.otherTitle": "Recorded in another log, not on this device",
      "card.other": "log {code}",

      "sync.summary": "Sync to Google Sheets (optional)",
      "sync.help": "Paste your deployment URL and token. The configuration stays on this device, never in the page. How to build the receiver: <a href=\"guide.html\">guide</a> · <a href=\"SYNC.md\">technical notes</a>.",
      "sync.owner": "Whose log is this",
      "sync.ownerPh": "your name",
      "sync.code": "This log's code",
      "sync.nameHelp": "The name goes into the “Người ghi” column on the Sheet. Two logs pushing into one Sheet still know which row is whose — this is a label, not a login.",
      "sync.url": "Deployment URL (ends in /exec)",
      "sync.token": "Token",
      "sync.tokenPh": "the string you set in Code.gs",
      "sync.save": "Save configuration",
      "sync.test": "Test connection",
      "sync.push": "Push to Sheet",
      "sync.savedLocal": "Saved on this device.",
      "sync.clearedCfg": "Sync configuration removed.",
      "sync.needCfg": "No URL or token yet. Paste both above and save.",
      "sync.needBoth": "Both the URL and the token are needed.",
      "sync.nothing": "Nothing left to push.",
      "sync.checking": "Checking…",
      "sync.connected": "Connected.",
      "sync.connectedSheet": "Connected. Sheet: {sheet}",
      "sync.connectFail": "Could not connect: {err}",
      "sync.noUrl": "No deployment URL yet.",
      "sync.pushingStart": "Pushing 0/{n}…",
      "sync.pushing": "Pushing {i}/{n}…",
      "sync.pushed": "Pushed {n} brews to the Sheet.",
      "sync.pushedSome": "Pushed {pushed}, {failed} failed: {err}",
      "sync.error": "Error: {err}",
      "sync.pendingCount": "{n} unsynced",

      "tools.exportHtml": "Export backup (.html)",
      "tools.exportCsv": "Export CSV",
      "tools.import": "Import backup",
      "tools.note": "The .html backup carries its own data and photos — opens in any browser, imports back in. CSV is for spreadsheets: one row per brew.",
      "export.busy": "Packaging…",

      "footer.text": "This page sends nothing anywhere. To keep it: press <b>Export backup</b> and store the file in Drive, or mail it to yourself. The bed photo, the coffee name and the grind setting are what tell you what to change next time — see the chapter “Reading the bed: diagnosis by eye” in the <a href=\"./\">book</a>.",

      "confirm.delete": "Delete {label}?",
      "confirm.brew": "brew",

      "err.db": "Could not open the database: {err}",
      "err.save": "Could not save: {err}",
      "err.delete": "Could not delete: {err}",
      "err.export": "Could not export: {err}",
      "err.exportNone": "No brews to export yet.",
      "err.photo": "That photo will not work: {err}",
      "err.importRead": "Could not read the file.",
      "err.importFail": "Could not import: {err}",
      "err.backupJson": "That file is not valid JSON — is it a brew log backup?",
      "err.backupNoBrews": "No brews were found in that file.",
      "err.noStore": "This browser has no IndexedDB, so the brew log cannot store anything. Use a current Chrome, Safari or Firefox.",
      "err.noCore": "journal-core.js is missing.",
      "alert.imported": "Imported {n} brews.",
      "alert.importedSkipped": "Imported {n} brews, skipped {skipped} already present.",

      "validate.date": "Date is missing (or in the wrong format).",
      "validate.dose.zero": "Coffee must be more than 0 g.",
      "validate.dose.missing": "Coffee weight (g) is missing.",
      "validate.water.zero": "Water must be more than 0 g.",
      "validate.water.missing": "Water weight (g) is missing.",
      "validate.temp.range": "Temperature must be between 0 and 100 °C.",
      "validate.ratio.range": "The ratio {ratio} falls outside 1:3–1:40 — check your units.",

      "pour.time": "Pour {n}: the time does not increase from the previous step.",
      "pour.water": "Pour {n}: the water amount does not increase from the previous step.",
      "pour.over": "The last pour is above the Water (g) figure — check the number."
    }
  };

  var ORDER = ["vi", "en"];

  /* Thay {x} bằng vars.x. Giữ nguyên {x} khi thiếu biến, để lỗi hiện ra
     thành chỗ trống nhìn thấy được thay vì "undefined". */
  function t(lang, key, vars) {
    var table = S[lang] || S.vi;
    var s = table[key];
    if (s === undefined) s = S.vi[key];
    if (s === undefined) return "";
    if (!vars) return s;
    return String(s).replace(/\{(\w+)\}/g, function (m, k) {
      return vars[k] === undefined ? m : String(vars[k]);
    });
  }

  /* ?lang= thắng (để gửi link), rồi lựa chọn đã nhớ, rồi ngôn ngữ trình
     duyệt — nhưng chỉ nhận tiếng Anh, vì trang chỉ có hai thứ tiếng.
     Nhận tham số thay vì tự đọc location/localStorage để test được. */
  function pickLang(queryLang, savedLang, navLang) {
    var q = String(queryLang || "").toLowerCase();
    if (S[q]) return q;
    var saved = String(savedLang || "").toLowerCase();
    if (S[saved]) return saved;
    if (String(navLang || "").slice(0, 2).toLowerCase() === "en") return "en";
    return "vi";
  }

  root.JOURNAL_I18N = {
    strings: S,
    langs: ORDER,
    t: t,
    pickLang: pickLang
  };
  if (typeof module === "object" && module.exports) module.exports = root.JOURNAL_I18N;
})(typeof window !== "undefined" ? window : globalThis);
