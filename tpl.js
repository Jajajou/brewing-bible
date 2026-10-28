/* ============================================================
   The Brewing Bible — tpl.js
   Trang in cho một khối mẫu (nhật ký pha, phiếu cupping, tóm tắt
   bao cà). Mở bằng tpl.html?ch=<id chương>&i=<thứ tự khối>&lang=<vi|en|ja>.

   Vì sao là một trang riêng chứ không phải cửa sổ dựng bằng JS: trang
   riêng mở được bằng link, tải lại được, chia sẻ được, và không phụ
   thuộc việc trình duyệt có cho popup hay không.
   ============================================================ */
(function () {
  "use strict";

  var I18N = window.BOOK_I18N || { ui: { vi: {} } };
  var qs = new URLSearchParams(location.search);
  var LANG = I18N.ui[qs.get("lang")] ? qs.get("lang") : "vi";
  var T = I18N.ui[LANG];
  var CH_ID = qs.get("ch") || "";
  var INDEX = Math.max(0, parseInt(qs.get("i"), 10) || 0);
  /* &n=100 → mở sẵn 100 bản, khỏi phải gõ lại. Tiện để gửi thẳng link
     cho người in. */
  var COPIES = Math.max(1, Math.min(400, parseInt(qs.get("n"), 10) || 1));

  var $ = function (sel) { return document.querySelector(sel); };

  function load(src) {
    return new Promise(function (resolve) {
      var s = document.createElement("script");
      s.src = src;
      s.onload = resolve;
      s.onerror = resolve; /* thiếu file thì báo ở dưới, không treo trang */
      document.body.appendChild(s);
    });
  }

  /* Nội dung: tiếng Việt nằm trong 9 file part, bản dịch trong một file. */
  function loadContent() {
    if (LANG === "vi") {
      var chain = Promise.resolve();
      for (var n = 1; n <= 9; n++) {
        chain = chain.then(load.bind(null, "content/part-" + n + ".js?v=9"));
      }
      return chain;
    }
    return load("content/" + LANG + "/text.js");
  }

  function findChapter() {
    if (LANG === "vi") {
      var parts = window.BOOK_PARTS || [];
      for (var i = 0; i < parts.length; i++) {
        var chs = parts[i].chapters || [];
        for (var j = 0; j < chs.length; j++) {
          if (chs[j].id === CH_ID) return chs[j];
        }
      }
      return null;
    }
    /* Bản dịch để chương trong một object theo id, không phải mảng. */
    var all = (window.BOOK_TEXT && window.BOOK_TEXT.chapters) || {};
    var hit = all[CH_ID];
    if (!hit) return null;
    hit.id = CH_ID;
    return hit;
  }

  function blockFrom(body, i) {
    var t = document.createElement("template");
    t.innerHTML = body || "";
    return t.content.querySelectorAll("[data-tpl]")[i] || null;
  }

  function fail(msg) {
    $("#sheets").innerHTML =
      '<p style="font-family:system-ui,sans-serif;font-size:14px;line-height:1.6;color:#8a322a">' +
      msg + "</p>";
    $("#go").disabled = true;
  }

  function fill() {
    var n = Math.max(1, Math.min(400, parseInt($("#n").value, 10) || 1));
    $("#sheets").innerHTML = new Array(n + 1).join(SHEET);
  }

  var SHEET = "";

  function build(block, ch) {
    var labelEl = block.querySelector(".fx-label");
    var label = labelEl ? labelEl.textContent.trim() : ch.title;
    document.title = label + " — " + T.tplSheet;

    SHEET =
      '<section class="sheet">' +
        '<p class="hdr"><span>' + esc(T.tplSheet) + "</span>" +
        '<span class="ch">' + esc(ch.title) + "</span></p>" +
        '<div class="tpl">' + block.innerHTML + "</div>" +
      "</section>";

    fill();
  }

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function wire() {
    $("#n").value = COPIES;
    $("#go").textContent = T.tplGo;
    $("#close").textContent = T.tplClose;
    $("#copiesLabel").textContent = T.tplCopies;
    $("#hint").textContent = T.tplHint;

    $("#n").addEventListener("change", fill);
    $("#go").addEventListener("click", function () {
      fill();
      window.print();
    });
    $("#close").addEventListener("click", function () { window.close(); });
  }

  wire();

  loadContent().then(function () {
    var ch = findChapter();
    if (!ch) {
      /* Bản dịch chưa có chương này: chỉ cho in bản tiếng Việt. */
      if (LANG !== "vi") { location.replace("tpl.html?ch=" + encodeURIComponent(CH_ID) + "&i=" + INDEX + "&lang=vi"); return; }
      fail("Không tìm thấy chương.");
      return;
    }
    if (!ch.body) {
      if (LANG !== "vi") { location.replace("tpl.html?ch=" + encodeURIComponent(CH_ID) + "&i=" + INDEX + "&lang=vi"); return; }
      fail(T.untranslatedTitle);
      return;
    }
    var block = blockFrom(ch.body, INDEX);
    if (!block) { fail("Không tìm thấy mẫu."); return; }
    build(block, ch);
  });
})();
