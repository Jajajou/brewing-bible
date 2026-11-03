/* ============================================================
   The Brewing Bible — journal.js

   Trang nhật ký pha trên điện thoại. Ba lớp, tách rõ:

     journal-core.js   logic thuần (tỉ lệ, thời gian, CSV, bản sao)
     file này          DOM + IndexedDB + nén ảnh
     không có gì       không server, không tài khoản, không gọi mạng

   Vì sao IndexedDB chứ không phải localStorage: ảnh bã. localStorage chỉ
   chứa được chuỗi, và giới hạn ~5 MB — ba tấm ảnh là hết. IndexedDB lưu
   được Blob, và giữ được vài trăm lần pha.

   Giới hạn phải nói thẳng (và trang có nói với người dùng): đây là bộ
   nhớ của MỘT trình duyệt trên MỘT máy. Xoá dữ liệu trình duyệt là mất.
   Nên "Xuất bản sao" là một phần của việc ghi, không phải tính năng phụ.
   ============================================================ */
(function () {
  "use strict";

  var C = window.JOURNAL_CORE;
  if (!C) {
    document.body.innerHTML = '<p style="font:16px system-ui;padding:2rem">Thiếu journal-core.js.</p>';
    return;
  }

  var $ = function (sel) { return document.querySelector(sel); };
  var $$ = function (sel) { return Array.prototype.slice.call(document.querySelectorAll(sel)); };

  var DB_NAME = "brewing-bible-journal";
  var DB_VER = 1;
  var STORE = "brews";

  /* Cấu hình đồng bộ nằm trong localStorage, không nằm trong repo: URL
     triển khai và token chỉ sống trên máy bạn. Không có hai thứ đó thì
     trang chạy y như cũ, chỉ là không đẩy đi đâu. */
  var SYNC_KEY = "nuocba.journal.sync";

  /* Kích thước ảnh: đủ để nhìn ra hố và mảng khô khi phóng to, nhưng
     không phải ảnh gốc 4–8 MB. 1200 px cạnh dài ở chất lượng 0,75 cho ra
     khoảng 150–250 KB; bản thu nhỏ 320 px cho danh sách. */
  var MAX_EDGE = 1200;
  var THUMB_EDGE = 320;
  var QUALITY = 0.75;

  var all = [];          /* bản ghi, đã sắp xếp */
  var editingId = "";    /* đang sửa bản ghi nào ("" = thêm mới) */
  var editingCreatedAt = 0;
  var editingPhoto = null;
  var editingThumb = null;
  var pendingPhoto = null;
  var pendingThumb = null;
  var photoCleared = false;
  var formUrl = "";      /* object URL của ảnh đang xem trong form */
  var listUrls = [];     /* object URL của danh sách, để thu hồi khi vẽ lại */

  /* ---------- IndexedDB ---------- */

  var dbPromise = null;

  function openDb() {
    if (dbPromise) return dbPromise;
    dbPromise = new Promise(function (resolve, reject) {
      var req = indexedDB.open(DB_NAME, DB_VER);
      req.onupgradeneeded = function () {
        var db = req.result;
        if (!db.objectStoreNames.contains(STORE)) {
          var st = db.createObjectStore(STORE, { keyPath: "id" });
          st.createIndex("date", "date");
        }
      };
      req.onsuccess = function () { resolve(req.result); };
      req.onerror = function () { reject(req.error); };
    });
    return dbPromise;
  }

  function tx(mode, fn) {
    return openDb().then(function (db) {
      return new Promise(function (resolve, reject) {
        var t = db.transaction(STORE, mode);
        var out;
        try {
          out = fn(t.objectStore(STORE));
        } catch (e) {
          reject(e);
          return;
        }
        t.oncomplete = function () {
          resolve(out && "result" in out ? out.result : out);
        };
        t.onerror = function () { reject(t.error); };
        t.onabort = function () { reject(t.error); };
      });
    });
  }

  var store = {
    all: function () { return tx("readonly", function (s) { return s.getAll(); }); },
    put: function (rec) { return tx("readwrite", function (s) { s.put(rec); }); },
    del: function (id) { return tx("readwrite", function (s) { s.delete(id); }); }
  };

  /* ---------- ảnh ---------- */

  /* createImageBitmap tự xoay theo EXIF khi được bảo; ảnh chụp dọc bằng
     điện thoại sẽ nằm ngang nếu bỏ qua bước này. Máy không hỗ trợ thì
     rơi về <img>, chấp nhận ảnh có thể xoay. */
  function loadBitmap(file) {
    if (window.createImageBitmap) {
      return createImageBitmap(file, { imageOrientation: "from-image" }).catch(function () {
        return createImageBitmap(file);
      });
    }
    return new Promise(function (resolve, reject) {
      var url = URL.createObjectURL(file);
      var img = new Image();
      img.onload = function () { URL.revokeObjectURL(url); resolve(img); };
      img.onerror = function () {
        URL.revokeObjectURL(url);
        reject(new Error("Không đọc được ảnh."));
      };
      img.src = url;
    });
  }

  function scaledCanvas(src, maxEdge) {
    var w = src.width;
    var h = src.height;
    var scale = Math.min(1, maxEdge / Math.max(w, h));
    var cv = document.createElement("canvas");
    cv.width = Math.max(1, Math.round(w * scale));
    cv.height = Math.max(1, Math.round(h * scale));
    var ctx = cv.getContext("2d");
    ctx.drawImage(src, 0, 0, cv.width, cv.height);
    return cv;
  }

  function toJpeg(canvas, quality) {
    return new Promise(function (resolve, reject) {
      canvas.toBlob(function (blob) {
        if (blob) resolve(blob);
        else reject(new Error("Không nén được ảnh."));
      }, "image/jpeg", quality);
    });
  }

  function compressPhoto(file) {
    return loadBitmap(file).then(function (bmp) {
      return Promise.all([
        toJpeg(scaledCanvas(bmp, MAX_EDGE), QUALITY),
        toJpeg(scaledCanvas(bmp, THUMB_EDGE), 0.7)
      ]).then(function (out) {
        if (bmp.close) bmp.close();
        return { photo: out[0], thumb: out[1] };
      });
    });
  }

  /* ---------- form ---------- */

  function checkedValue(name) {
    var el = document.querySelector('input[name="' + name + '"]:checked');
    return el ? el.value : "";
  }

  function setChecked(name, value) {
    $$('input[name="' + name + '"]').forEach(function (el) {
      el.checked = el.value === String(value);
    });
  }

  function todayIso() {
    return C.text ? "" : C.dateText(new Date());
  }

  function updateRatio() {
    var txt = C.ratioText($("#f-dose").value, $("#f-water").value, ",");
    $("#ratioOut").textContent = txt || "1:—";
  }

  function showErrors(list) {
    var box = $("#err");
    if (!list || !list.length) {
      box.hidden = true;
      box.textContent = "";
      return;
    }
    box.hidden = false;
    box.textContent = list.join(" ");
  }

  function setPhotoPreview(blob) {
    if (formUrl) { URL.revokeObjectURL(formUrl); formUrl = ""; }
    var img = $("#photoPreview");
    if (!blob) {
      img.hidden = true;
      img.removeAttribute("src");
      $("#clearPhoto").hidden = true;
      return;
    }
    formUrl = URL.createObjectURL(blob);
    img.src = formUrl;
    img.hidden = false;
    $("#clearPhoto").hidden = false;
  }

  function resetForm(keepParams) {
    var keep = keepParams
      ? {
          coffee: $("#f-coffee").value,
          days: $("#f-days").value,
          dose: $("#f-dose").value,
          water: $("#f-water").value,
          temp: $("#f-temp").value,
          grind: $("#f-grind").value,
          brewer: $("#f-brewer").value
        }
      : null;

    $("#form").reset();
    $("#f-date").value = todayIso();

    if (keep) {
      $("#f-coffee").value = keep.coffee;
      $("#f-days").value = keep.days;
      $("#f-dose").value = keep.dose;
      $("#f-water").value = keep.water;
      $("#f-temp").value = keep.temp;
      $("#f-grind").value = keep.grind;
      $("#f-brewer").value = keep.brewer;
    }
    $("#keepNext").checked = true;

    editingId = "";
    editingCreatedAt = 0;
    editingPhoto = null;
    editingThumb = null;
    pendingPhoto = null;
    pendingThumb = null;
    photoCleared = false;
    $("#f-photo").value = "";
    setPhotoPreview(null);
    $("#submitBtn").textContent = "Lưu lần pha này";
    $("#cancelEdit").hidden = true;
    showErrors(null);
    updateRatio();
  }

  function startEdit(id) {
    var rec = all.filter(function (r) { return r.id === id; })[0];
    if (!rec) return;

    editingId = rec.id;
    editingCreatedAt = rec.createdAt;
    editingPhoto = rec.photo || null;
    editingThumb = rec.thumb || null;
    pendingPhoto = null;
    pendingThumb = null;
    photoCleared = false;

    $("#f-date").value = rec.date;
    $("#f-coffee").value = rec.coffee;
    $("#f-days").value = rec.daysOffRoast === null ? "" : rec.daysOffRoast;
    $("#f-dose").value = rec.dose === null ? "" : rec.dose;
    $("#f-water").value = rec.water === null ? "" : rec.water;
    $("#f-temp").value = rec.temp === null ? "" : rec.temp;
    $("#f-grind").value = rec.grind;
    $("#f-brewer").value = rec.brewer;
    $("#f-total").value = C.timeText(rec.totalSec);
    $("#f-draw").value = C.timeText(rec.drawdownSec);
    $("#f-note").value = rec.note;
    setChecked("bed", rec.bed);
    setChecked("sang", rec.axes.sang === null ? "" : rec.axes.sang);
    setChecked("day", rec.axes.day === null ? "" : rec.axes.day);
    setChecked("huong", rec.axes.huong === null ? "" : rec.axes.huong);
    setChecked("hau", rec.axes.hau === null ? "" : rec.axes.hau);
    setPhotoPreview(rec.thumb || rec.photo || null);

    $("#submitBtn").textContent = "Cập nhật";
    $("#cancelEdit").hidden = false;
    showErrors(null);
    updateRatio();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function collect() {
    return C.normalize({
      id: editingId,
      createdAt: editingCreatedAt,
      date: $("#f-date").value,
      coffee: $("#f-coffee").value,
      daysOffRoast: $("#f-days").value,
      dose: $("#f-dose").value,
      water: $("#f-water").value,
      temp: $("#f-temp").value,
      grind: $("#f-grind").value,
      brewer: $("#f-brewer").value,
      totalSec: $("#f-total").value,
      drawdownSec: $("#f-draw").value,
      bed: checkedValue("bed"),
      axes: {
        sang: checkedValue("sang"),
        day: checkedValue("day"),
        huong: checkedValue("huong"),
        hau: checkedValue("hau")
      },
      note: $("#f-note").value
    });
  }

  function uid() {
    if (window.crypto && crypto.randomUUID) return crypto.randomUUID();
    return "b" + Date.now().toString(36) + Math.random().toString(36).slice(2, 10);
  }

  function save(ev) {
    if (ev) ev.preventDefault();
    var rec = collect();
    var errs = C.validate(rec);
    if (errs.length) {
      showErrors(errs);
      return;
    }
    showErrors(null);

    rec.id = editingId || uid();
    rec.createdAt = editingId ? editingCreatedAt : Date.now();
    rec.updatedAt = Date.now();
    rec.photo = photoCleared ? null : (pendingPhoto || editingPhoto || null);
    rec.thumb = photoCleared ? null : (pendingThumb || editingThumb || null);

    /* Sửa gì cũng phải đẩy lại. Ảnh thì chỉ đẩy khi nó thật sự đổi —
       so bằng đúng đối tượng Blob, vì ảnh không đổi được chép nguyên
       tham chiếu từ bản ghi cũ. */
    var prev = editingId ? all.filter(function (r) { return r.id === editingId; })[0] : null;
    rec.syncedAt = 0;
    rec.photoUrl = prev && prev.photo && rec.photo === prev.photo ? (prev.photoUrl || "") : "";

    var keep = $("#keepNext").checked;

    store.put(rec).then(function () {
      /* Xin quyền lưu bền: trình duyệt có thể dọn IndexedDB khi máy hết
         chỗ. Không phải trình duyệt nào cũng hỏi, và iOS bỏ qua — nhưng
         gọi được thì gọi, im lặng. */
      if (navigator.storage && navigator.storage.persist) {
        navigator.storage.persist().catch(function () {});
      }
      return refresh().then(function () {
        resetForm(keep);
        /* Đẩy luôn, nhưng không chờ: lưu được là việc chính đã xong. */
        if (hasSync()) pushPending(false);
      });
    }).catch(function (err) {
      showErrors(["Không lưu được: " + (err && err.message ? err.message : err)]);
    });
  }

  function remove(id) {
    var rec = all.filter(function (r) { return r.id === id; })[0];
    if (!rec) return;
    var label = (rec.coffee || "lần pha") + " · " + C.dateShort(rec.date);
    if (!window.confirm("Xoá " + label + "?")) return;
    store.del(id).then(function () {
      if (editingId === id) resetForm(false);
      return refresh();
    }).catch(function (err) {
      showErrors(["Không xoá được: " + (err && err.message ? err.message : err)]);
    });
  }

  /* ---------- danh sách ---------- */

  function esc(s) {
    return String(s === null || s === undefined ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function facts(rec) {
    var bits = [];
    if (rec.dose !== null) bits.push(rec.dose + " g");
    if (rec.water !== null) bits.push(rec.water + " g");
    if (rec.temp !== null) bits.push(rec.temp + " °C");
    if (rec.grind) bits.push(esc(rec.grind));
    if (rec.brewer) bits.push(esc(rec.brewer));
    if (rec.totalSec !== null) bits.push(C.timeText(rec.totalSec) + " tổng");
    if (rec.drawdownSec !== null) bits.push(C.timeText(rec.drawdownSec) + " rút");
    if (rec.daysOffRoast !== null) bits.push(rec.daysOffRoast + " ngày sau rang");
    return bits.join(" · ");
  }

  function axisChip(label, v) {
    return '<span class="ax"><b>' + esc(label) + "</b>" + (v === null ? "—" : v) + "</span>";
  }

  function card(rec) {
    var url = "";
    var photo = rec.thumb || rec.photo;
    if (photo) {
      url = URL.createObjectURL(photo);
      listUrls.push(url);
    }
    var full = "";
    if (rec.photo) {
      full = URL.createObjectURL(rec.photo);
      listUrls.push(full);
    }

    var html = '<article class="brew' + (rec.id === editingId ? " editing" : "") + '">';
    html += '<div class="brew-top">';
    html += '<span class="brew-date">' + esc(C.dateShort(rec.date)) + "</span>";
    if (hasSync() && !rec.syncedAt) {
      html += '<span class="sync-dot" title="Chưa đẩy lên Google Sheet">chưa đẩy</span>';
    }
    html += '<h3 class="brew-name">' + esc(rec.coffee || "Không tên") + "</h3>";
    if (rec.photo) {
      html += '<a class="brew-thumb" href="' + esc(full) + '" target="_blank" rel="noopener">' +
        '<img src="' + esc(url) + '" alt="Bã sau khi pha" loading="lazy"></a>';
    }
    html += "</div>";

    if (C.ratio(rec.dose, rec.water) !== null) {
      html += '<p class="brew-ratio">' + esc(C.ratioText(rec.dose, rec.water, ",")) + "</p>";
    }
    if (facts(rec)) html += '<p class="brew-facts">' + facts(rec) + "</p>";
    if (rec.bed) html += '<p class="brew-bed">Bã: <b>' + esc(C.bedLabel(rec.bed)) + "</b></p>";

    if (rec.axes.sang !== null || rec.axes.day !== null || rec.axes.huong !== null || rec.axes.hau !== null) {
      html += '<p class="brew-axes">' +
        axisChip("Sáng", rec.axes.sang) + axisChip("Đầy", rec.axes.day) +
        axisChip("Hướng", rec.axes.huong) + axisChip("Hậu vị", rec.axes.hau) + "</p>";
    }
    if (rec.note) html += '<p class="brew-note">' + esc(rec.note) + "</p>";

    html += '<p class="brew-actions">' +
      '<button type="button" class="ghost sm" data-act="edit" data-id="' + esc(rec.id) + '">Sửa</button>' +
      '<button type="button" class="ghost sm danger" data-act="del" data-id="' + esc(rec.id) + '">Xoá</button>' +
      "</p>";
    html += "</article>";
    return html;
  }

  function render() {
    listUrls.forEach(function (u) { URL.revokeObjectURL(u); });
    listUrls = [];

    var list = $("#list");
    var n = all.length;
    $("#count").textContent = n ? n + " lần" : "";

    if (!n) {
      list.innerHTML = '<p class="empty">Chưa có lần nào. Lần đầu mất khoảng 40 giây — bảy dòng như mẫu trong sách.</p>';
    } else {
      list.innerHTML = all.map(card).join("");
    }
    storageInfo();
    updateSyncUi();
  }

  function storageInfo() {
    var el = $("#storage");
    if (!el) return;
    if (!navigator.storage || !navigator.storage.estimate) {
      el.textContent = "";
      return;
    }
    navigator.storage.estimate().then(function (est) {
      var used = est.usage || 0;
      el.textContent = "Đang dùng " + sizeText(used) + " trong bộ nhớ của trình duyệt này.";
    }).catch(function () { el.textContent = ""; });
  }

  function sizeText(bytes) {
    if (bytes < 1024) return bytes + " B";
    if (bytes < 1024 * 1024) return Math.round(bytes / 1024) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1).replace(".", ",") + " MB";
  }

  function refresh() {
    return store.all().then(function (rows) {
      all = C.sortRecords(rows.map(C.normalize));
      render();
    });
  }

  /* ---------- đồng bộ Google Sheet (tuỳ chọn) ----------
     Một chiều: máy này đẩy lên Sheet của bạn, không có server của sách ở
     giữa, và không gửi gì đi khi bạn chưa dán URL + token.

     Ảnh bã đi kèm lần đẩy đầu tiên rồi nằm trong Drive; Sheet giữ URL.
     Lần đẩy sau (sau khi sửa) không gửi lại ảnh — trừ khi bạn đổi ảnh. */

  function getSync() {
    try {
      var raw = localStorage.getItem(SYNC_KEY);
      var cfg = raw ? JSON.parse(raw) : {};
      return { url: String(cfg.url || ""), token: String(cfg.token || "") };
    } catch (e) {
      return { url: "", token: "" };
    }
  }

  function saveSync(url, token) {
    var cfg = { url: String(url || "").trim(), token: String(token || "").trim() };
    try {
      if (!cfg.url && !cfg.token) localStorage.removeItem(SYNC_KEY);
      else localStorage.setItem(SYNC_KEY, JSON.stringify(cfg));
    } catch (e) {}
  }

  function hasSync() {
    var cfg = getSync();
    return !!(cfg.url && cfg.token);
  }

  function syncStatus(text, kind) {
    var el = $("#syncStatus");
    if (!el) return;
    el.textContent = text || "";
    el.className = "sync-status" + (kind ? " " + kind : "");
  }

  function updateSyncUi() {
    var cfg = getSync();
    var url = $("#syncUrl");
    var token = $("#syncToken");
    /* Đừng ghi đè ô đang gõ. */
    if (url && document.activeElement !== url) url.value = cfg.url;
    if (token && document.activeElement !== token) token.value = cfg.token;

    var pendingEl = $("#syncPending");
    if (pendingEl) {
      var n = all.filter(function (r) { return !r.syncedAt; }).length;
      pendingEl.textContent = hasSync() ? (n ? n + " chưa đẩy" : "") : "";
    }
  }

  function syncPhotoName(rec) {
    var slug = String(rec.coffee || "ca-phe").toLowerCase()
      .replace(/đ/g, "d")
      .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40);
    return (C.dateText(rec.date) || "khong-ngay") + "_" + (slug || "ca-phe") + "_ba.jpg";
  }

  function postSync(payload) {
    var cfg = getSync();
    if (!cfg.url) return Promise.reject(new Error("Chưa có URL triển khai."));
    return fetch(cfg.url, {
      method: "POST",
      /* text/plain để trình duyệt không gửi preflight: Apps Script không
         trả lời OPTIONS. Nội dung vẫn là JSON. */
      headers: { "Content-Type": "text/plain;charset=utf-8" },
      body: JSON.stringify(payload),
      redirect: "follow"
    }).then(function (res) {
      return res.text().then(function (txt) {
        var data = null;
        try { data = JSON.parse(txt); } catch (e) {}
        if (!data) throw new Error("Máy nhận trả về thứ không phải JSON (HTTP " + res.status + ").");
        if (!res.ok || data.ok !== true) throw new Error(data.error || ("HTTP " + res.status));
        return data;
      });
    });
  }

  function payloadFor(rec) {
    var cfg = getSync();
    var payload = {
      token: cfg.token,
      kind: "brew",
      brew: {
        id: rec.id,
        date: rec.date,
        coffee: rec.coffee,
        daysOffRoast: rec.daysOffRoast,
        dose: rec.dose,
        water: rec.water,
        ratio: C.ratio(rec.dose, rec.water),
        temp: rec.temp,
        grind: rec.grind,
        brewer: rec.brewer,
        totalSec: rec.totalSec,
        drawdownSec: rec.drawdownSec,
        bed: C.bedLabel(rec.bed),
        axes: rec.axes,
        note: rec.note,
        updatedAt: rec.updatedAt
      }
    };
    if (!rec.photo || rec.photoUrl) return Promise.resolve(payload);
    return blobToDataUrl(rec.photo).then(function (dataUrl) {
      payload.brew.photoBase64 = dataUrl;
      payload.brew.photoName = syncPhotoName(rec);
      return payload;
    });
  }

  function pushOne(rec) {
    return payloadFor(rec).then(postSync).then(function (data) {
      rec.syncedAt = Date.now();
      if (data.photoUrl) rec.photoUrl = data.photoUrl;
      return store.put(rec);
    });
  }

  var pushing = false;

  /* Đẩy hàng chờ theo thứ tự, từng cái một: Apps Script trả lời chậm
     (1–2 giây), nên bắn song song chỉ làm tăng số lần lỗi. */
  function pushPending(manual) {
    var cfg = getSync();
    if (!cfg.url || !cfg.token) {
      if (manual) syncStatus("Chưa có URL và token. Dán vào hai ô trên rồi lưu.", "bad");
      return Promise.resolve({ pushed: 0, failed: 0 });
    }
    if (pushing) return Promise.resolve({ pushed: 0, failed: 0 });

    var queue = all.filter(function (r) { return !r.syncedAt; });
    if (!queue.length) {
      if (manual) syncStatus("Không còn gì để đẩy.", "ok");
      return Promise.resolve({ pushed: 0, failed: 0 });
    }

    pushing = true;
    var pushed = 0;
    var failed = 0;
    var lastErr = "";
    syncStatus("Đang đẩy 0/" + queue.length + "…");

    var chain = Promise.resolve();
    queue.forEach(function (rec, i) {
      chain = chain.then(function () {
        return pushOne(rec).then(function () {
          pushed++;
          syncStatus("Đang đẩy " + (i + 1) + "/" + queue.length + "…");
        }).catch(function (err) {
          failed++;
          lastErr = err && err.message ? err.message : String(err);
        });
      });
    });

    return chain.then(function () {
      return refresh();
    }).then(function () {
      pushing = false;
      if (failed) syncStatus("Đã đẩy " + pushed + ", còn " + failed + " lỗi: " + lastErr, "bad");
      else syncStatus("Đã đẩy " + pushed + " lần pha lên Sheet.", "ok");
      return { pushed: pushed, failed: failed };
    }).catch(function (err) {
      pushing = false;
      syncStatus("Lỗi: " + (err && err.message ? err.message : err), "bad");
      return { pushed: pushed, failed: failed };
    });
  }

  function testSync() {
    var cfg = getSync();
    if (!cfg.url || !cfg.token) {
      syncStatus("Cần cả URL và token.", "bad");
      return;
    }
    syncStatus("Đang kiểm tra…");
    postSync({ token: cfg.token, kind: "ping" }).then(function (data) {
      syncStatus("Kết nối được." + (data.sheet ? " Sheet: " + data.sheet : ""), "ok");
    }).catch(function (err) {
      syncStatus("Không kết nối được: " + (err && err.message ? err.message : err), "bad");
    });
  }

  /* ---------- xuất / nhập ---------- */

  function blobToDataUrl(blob) {
    return new Promise(function (resolve, reject) {
      var fr = new FileReader();
      fr.onload = function () { resolve(fr.result); };
      fr.onerror = function () { reject(fr.error); };
      fr.readAsDataURL(blob);
    });
  }

  function dataUrlToBlob(dataUrl) {
    var m = /^data:([^;,]*)(;base64)?,([\s\S]*)$/.exec(String(dataUrl || ""));
    if (!m) return null;
    var bin = m[2] ? atob(m[3]) : decodeURIComponent(m[3]);
    var arr = new Uint8Array(bin.length);
    for (var i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
    return new Blob([arr], { type: m[1] || "image/jpeg" });
  }

  function download(filename, text, mime) {
    var blob = new Blob([text], { type: mime || "text/plain;charset=utf-8" });
    var url = URL.createObjectURL(blob);
    var a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    a.remove();
    setTimeout(function () { URL.revokeObjectURL(url); }, 4000);
  }

  function stamp() {
    return C.dateText(new Date());
  }

  function exportCsv() {
    if (!all.length) {
      showErrors(["Chưa có lần pha nào để xuất."]);
      return;
    }
    /* BOM để Excel nhận ra UTF-8; thiếu nó thì "Cà phê" thành "CÃ phÃª". */
    download("nhat-ky-" + stamp() + ".csv", "\ufeff" + C.toCsv(all), "text/csv;charset=utf-8");
  }

  function exportBackup() {
    if (!all.length) {
      showErrors(["Chưa có lần pha nào để xuất."]);
      return;
    }
    var btn = $("#exportHtml");
    btn.disabled = true;
    btn.textContent = "Đang đóng gói…";

    var jobs = all.map(function (rec) {
      if (!rec.photo) return Promise.resolve(rec);
      return Promise.all([blobToDataUrl(rec.photo), rec.thumb ? blobToDataUrl(rec.thumb) : Promise.resolve(null)])
        .then(function (out) {
          var copy = Object.assign({}, rec);
          copy.photo = out[0];
          copy.thumb = out[1];
          return copy;
        });
    });

    Promise.all(jobs).then(function (records) {
      var html = C.buildBackup(records, { exportedAt: new Date().toISOString() });
      download("nhat-ky-" + stamp() + ".html", html, "text/html;charset=utf-8");
    }).catch(function (err) {
      showErrors(["Không xuất được: " + (err && err.message ? err.message : err)]);
    }).then(function () {
      btn.disabled = false;
      btn.textContent = "Xuất bản sao (.html)";
    });
  }

  function importFile(file) {
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function () {
      var data;
      try {
        data = C.readBackup(reader.result);
      } catch (err) {
        showErrors([err.message]);
        return;
      }
      var known = {};
      all.forEach(function (r) { known[r.id] = true; });

      var added = 0;
      var skipped = 0;
      var chain = Promise.resolve();

      data.brews.forEach(function (raw) {
        chain = chain.then(function () {
          var rec = C.normalize(raw);
          if (!rec.id) rec.id = uid();
          if (known[rec.id]) { skipped++; return; }
          known[rec.id] = true;

          if (typeof rec.photo === "string") {
            var blob = dataUrlToBlob(rec.photo);
            rec.photo = blob;
          }
          if (typeof rec.thumb === "string") {
            rec.thumb = dataUrlToBlob(rec.thumb);
          }
          rec.updatedAt = rec.updatedAt || Date.now();
          rec.createdAt = rec.createdAt || Date.now();
          added++;
          return store.put(rec);
        });
      });

      chain.then(function () {
        return refresh();
      }).then(function () {
        showErrors(null);
        alert("Đã nhập " + added + " lần pha" + (skipped ? ", bỏ qua " + skipped + " bản đã có" : "") + ".");
      }).catch(function (err) {
        showErrors(["Không nhập được: " + (err && err.message ? err.message : err)]);
      });
    };
    reader.onerror = function () { showErrors(["Không đọc được tệp."]); };
    reader.readAsText(file, "utf-8");
  }

  /* ---------- giao diện tối ---------- */

  function applyTheme(t) {
    document.documentElement.setAttribute("data-theme", t);
    try { localStorage.setItem("nuocba.theme", JSON.stringify(t)); } catch (e) {}
  }

  function initTheme() {
    var t = "light";
    try {
      var saved = localStorage.getItem("nuocba.theme");
      if (saved) t = JSON.parse(saved);
    } catch (e) {}
    if (!t) t = "light";
    applyTheme(t);
    var btn = $("#themeToggle");
    if (btn) {
      btn.addEventListener("click", function () {
        var cur = document.documentElement.getAttribute("data-theme");
        applyTheme(cur === "dark" ? "light" : "dark");
      });
    }
  }

  /* ---------- gắn ---------- */

  function wire() {
    $("#form").addEventListener("submit", save);
    $("#f-dose").addEventListener("input", updateRatio);
    $("#f-water").addEventListener("input", updateRatio);

    $("#cancelEdit").addEventListener("click", function () { resetForm(false); });

    $("#f-photo").addEventListener("change", function (ev) {
      var file = ev.target.files && ev.target.files[0];
      if (!file) return;
      $("#photoState").textContent = "Đang nén…";
      compressPhoto(file).then(function (out) {
        pendingPhoto = out.photo;
        pendingThumb = out.thumb;
        photoCleared = false;
        setPhotoPreview(out.photo);
        $("#photoState").textContent = Math.round(out.photo.size / 1024) + " KB";
      }).catch(function (err) {
        $("#photoState").textContent = "";
        showErrors(["Ảnh không dùng được: " + (err && err.message ? err.message : err)]);
      });
    });

    $("#clearPhoto").addEventListener("click", function () {
      pendingPhoto = null;
      pendingThumb = null;
      photoCleared = true;
      $("#f-photo").value = "";
      $("#photoState").textContent = "";
      setPhotoPreview(null);
    });

    $("#list").addEventListener("click", function (ev) {
      var btn = ev.target.closest("[data-act]");
      if (!btn) return;
      var id = btn.getAttribute("data-id");
      if (btn.getAttribute("data-act") === "edit") startEdit(id);
      else remove(id);
    });

    $("#syncSave").addEventListener("click", function () {
      saveSync($("#syncUrl").value, $("#syncToken").value);
      updateSyncUi();
      syncStatus(hasSync() ? "Đã lưu trên máy này." : "Đã xoá cấu hình đồng bộ.", "ok");
    });
    $("#syncTest").addEventListener("click", function () {
      saveSync($("#syncUrl").value, $("#syncToken").value);
      updateSyncUi();
      testSync();
    });
    $("#syncPush").addEventListener("click", function () {
      saveSync($("#syncUrl").value, $("#syncToken").value);
      updateSyncUi();
      pushPending(true);
    });

    $("#exportHtml").addEventListener("click", exportBackup);
    $("#exportCsv").addEventListener("click", exportCsv);
    $("#exportTop").addEventListener("click", exportBackup);

    $("#importFile").addEventListener("change", function (ev) {
      var file = ev.target.files && ev.target.files[0];
      importFile(file);
      ev.target.value = "";
    });
  }

  function boot() {
    if (!window.indexedDB) {
      document.body.innerHTML = '<p style="font:16px system-ui;padding:2rem">Trình duyệt này không có IndexedDB, nên trang nhật ký không lưu được. Dùng Chrome, Safari hoặc Firefox bản mới.</p>';
      return;
    }
    initTheme();
    wire();
    $("#f-date").value = todayIso();
    updateRatio();
    refresh().then(function () {
      updateSyncUi();
      /* Còn hàng chờ từ lần trước — mất mạng, hoặc đóng tab giữa lúc đẩy —
         thì đẩy lại một lượt. Máy nhận nhận theo id nên đẩy lại không
         nhân đôi dòng. */
      if (hasSync()) pushPending(false);
    }).catch(function (err) {
      showErrors(["Không mở được cơ sở dữ liệu: " + (err && err.message ? err.message : err)]);
    });
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();
