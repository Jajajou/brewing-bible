/* ============================================================
   Nước, Bã và Ánh Sáng — book.js
   Router, mục lục, tìm kiếm, tiến độ đọc, giao diện.
   ============================================================ */
(function () {
  "use strict";

  var PARTS = window.BOOK_PARTS || [];
  var S = window.BOOK_SEARCH; /* search.js: bỏ dấu, chấm điểm, snippet */

  /* ---------- ngôn ngữ ---------- */
  var I18N = window.BOOK_I18N || {
    lang: "vi",
    langs: ["vi"],
    ui: { vi: {} },
    chapterLabel: function (l, n) { return "Chương " + String(n).padStart(2, "0"); },
    partLabel: function (l, r) { return "Phần " + r; }
  };
  var LANG = I18N.lang;
  var T = I18N.ui[LANG] || I18N.ui.vi;

  function chLabel(n) { return I18N.chapterLabel(LANG, n); }
  function partLabel(part, pi) {
    if (part && part.appendix) return (I18N.ui[LANG] || {}).appendix || "Phụ lục";
    return I18N.partLabel(LANG, (part && part.roman) || ROMAN[pi] || "");
  }

  /* bản dịch nằm ở content/<lang>/text.js; tiếng Việt là nguồn gốc */
  function loadOverlay(lang) {
    return new Promise(function (resolve) {
      var s = document.createElement("script");
      s.src = "content/" + lang + "/text.js?v=fabab58";
      s.onload = function () { resolve(window.BOOK_TEXT || null); };
      s.onerror = function () { resolve(null); };
      document.head.appendChild(s);
    });
  }

  /* ---------- flatten ---------- */
  var flat = [];
  PARTS.forEach(function (part) {
    var inPart = 0;
    (part.chapters || []).forEach(function (ch) {
      inPart++;
      flat.push({ ch: ch, part: part, n: flat.length + 1, np: inPart });
    });
  });

  var byId = {};
  flat.forEach(function (entry) {
    if (entry.ch.id) byId[entry.ch.id] = entry;
  });

  /* Phụ lục là chương của nó, không phải chương 30–33: bìa vẫn ghi 29 chương,
     và thanh tiến độ đọc cũng chỉ đếm 29 chương chính. */
  function isAppendix(part) { return !!(part && part.appendix); }
  var MAIN = flat.filter(function (e) { return !isAppendix(e.part); });
  var MAIN_PARTS = PARTS.filter(function (p) { return !isAppendix(p); });
  var TOTAL = MAIN.length;

  function numLabel(entry) {
    return S.numLabel(isAppendix(entry.part), entry.n, entry.np);
  }
  function kickerLabel(entry) {
    return isAppendix(entry.part) ? partLabel(entry.part) + " A" + entry.np : chLabel(entry.n);
  }

  /* Ghép bản dịch vào cấu trúc gốc: giữ nguyên id và thứ tự, chỉ thay
     tiêu đề / lede / thân bài. Chương chưa có thân bài dịch thì đánh
     dấu __translated = false để hiện thông báo thay vì im lặng. */
  function applyTranslation(text) {
    var parts = (text && text.parts) || {};
    var chs = (text && text.chapters) || {};
    var missing = 0;

    PARTS.forEach(function (part) {
      var pt = parts[part.id];
      if (pt) {
        part.titleVi = part.title;
        if (pt.title) part.title = pt.title;
        if (pt.blurb) part.blurb = pt.blurb;
      }
      (part.chapters || []).forEach(function (ch) {
        var ct = chs[ch.id];
        if (ct) {
          ch.titleVi = ch.title;
          if (ct.title) ch.title = ct.title;
          if (ct.lede) ch.lede = ct.lede;
          if (ct.tags) ch.tags = ct.tags;
          if (ct.minutes) ch.minutes = ct.minutes;
        }

        /* Bản gốc: mọi chương đều đọc được. Bản dịch: chương chưa có thân
           bài thì để rỗng và hiện thông báo — không trộn tiếng Việt vào
           giữa một trang tiếng Anh. */
        if (LANG === "vi") {
          ch.__translated = true;
          return;
        }
        ch.bodyVi = ch.body;
        ch.body = (ct && ct.body) ? ct.body : "";
        ch.__translated = !!ch.body;
        if (!ch.__translated) missing++;
      });
    });

    window.BOOK_MISSING = missing;
  }

  /* ---------- storage ---------- */
  var LS = {
    get: function (k, d) {
      try {
        var v = localStorage.getItem("nuocba." + k);
        return v === null ? d : JSON.parse(v);
      } catch (e) { return d; }
    },
    set: function (k, v) {
      try { localStorage.setItem("nuocba." + k, JSON.stringify(v)); } catch (e) {}
    }
  };

  var readSet = {};
  (LS.get("read", []) || []).forEach(function (id) { readSet[id] = true; });

  /* ---------- helpers ---------- */
  function $(sel) { return document.querySelector(sel); }

  function esc(s) {
    return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  var ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

  /* địa chỉ của cùng chương đó ở bản tiếng Việt */
  function viUrl(id) {
    return location.pathname + "?lang=vi#/" + id;
  }

  function switchLang(lang) {
    try { localStorage.setItem("nuocba.lang", lang); } catch (e) {}
    var hash = location.hash || "#/";
    location.href = location.pathname + "?lang=" + lang + hash;
  }

  /* ---------- plain text index for search ---------- */
  var index = [];

  function buildIndex() {
    index = flat.map(function (entry) {
      var tmp = document.createElement("div");
      tmp.innerHTML = entry.ch.body || "";
      var rec = S.makeRecord(entry.ch.title, entry.ch.lede, tmp.textContent || "");
      rec.entry = entry;
      return rec;
    });
  }

  /* ---------- build TOC ---------- */
  function buildToc() {
    var toc = $("#toc");
    var html = "";
    PARTS.forEach(function (part, pi) {
      var chs = part.chapters || [];
      if (!chs.length) return;
      html += '<div class="toc-part">';
      html += '<p class="toc-part-head"><span class="num">' + (part.roman || ROMAN[pi] || "") +
              "</span><span>" + esc(part.title) + "</span></p>";
      html += '<ul class="toc-list">';
      chs.forEach(function (ch) {
        var entry = byId[ch.id];
        if (!entry) return;
        html += '<li><a class="toc-link" href="#/' + ch.id + '" data-ch="' + ch.id + '">' +
                '<span class="n">' + numLabel(entry) + "</span>" +
                "<span>" + esc(ch.title) +
                (ch.__translated ? "" : '<span class="toc-todo">' + esc(T.untranslatedBadge) + "</span>") +
                "</span></a></li>";
      });
      html += "</ul></div>";
    });
    toc.innerHTML = html;
  }

  /* ---------- cover ---------- */
  function renderCover() {
    var html = "";
    html += '<div class="cover">';
    html += '<p class="cover-kicker">' + esc(T.coverKicker) + "</p>";
    html += "<h1>The Brewing<br><em>Bible</em></h1>";
    html += '<p class="cover-dek">' + esc(T.coverDek) + "</p>";

    html += '<div class="cover-meta">';
    html += "<div><b>" + TOTAL + "</b>" + esc(T.metaChapters) + "</div>";
    html += "<div><b>" + MAIN_PARTS.length + "</b>" + esc(T.metaParts) + "</div>";
    html += "<div><b>" + esc(T.metaHoursValue) + "</b>" + esc(T.metaHours) + "</div>";
    html += "<div><b>" + esc(T.metaTiersValue) + "</b>" + esc(T.metaTiers) + "</div>";
    html += "</div>";

    html += "<p>" + T.coverBody + "</p>";

    html += '<div class="tier-legend">' +
      '<div><span class="tier tier-a">' + esc(T.tierA[0]) + "</span><span>" + esc(T.tierA[1]) + "</span></div>" +
      '<div><span class="tier tier-b">' + esc(T.tierB[0]) + "</span><span>" + esc(T.tierB[1]) + "</span></div>" +
      '<div><span class="tier tier-c">' + esc(T.tierC[0]) + "</span><span>" + esc(T.tierC[1]) + "</span></div>" +
      '<p class="tier-legend-foot">' + esc(T.tierFoot) + "</p>" +
      "</div>";

    /* table of contents on the cover */
    html += '<div class="cover-toc">';
    PARTS.forEach(function (part, pi) {
      var chs = part.chapters || [];
      if (!chs.length) return;
      html += '<div class="ctoc-part">';
      html += '<p class="ctoc-head">' + esc(part.title) +
              '<span>' + esc(partLabel(part, pi)) + (part.blurb ? " · " + esc(part.blurb) : "") + "</span></p>";
      chs.forEach(function (ch) {
        var entry = byId[ch.id];
        if (!entry) return;
        html += '<a class="ctoc-item" href="#/' + ch.id + '">' +
                '<span class="n">' + numLabel(entry) + "</span>" +
                "<span>" + esc(ch.title) + "</span></a>";
      });
      html += "</div>";
    });
    html += "</div>";

    html += '<div class="cta-row">';
    html += '<a class="btn btn-primary" href="#/' + (flat[0] ? flat[0].ch.id : "") + '">' + esc(T.start) + "</a>";
    html += '<button class="btn btn-ghost" id="randomCh">' + esc(T.random) + "</button>";
    html += '<a class="btn btn-ghost" href="the-brewing-bible.pdf" download>' + esc(T.pdf) + "</a>";
    html += '<a class="btn btn-ghost" href="the-brewing-bible.epub" download>' + esc(T.epub) + "</a>";
    html += "</div>";

    html += "</div>";

    $("#page").innerHTML = html;
    document.title = T.title;

    var rnd = $("#randomCh");
    if (rnd) {
      rnd.addEventListener("click", function () {
        var pick = flat[Math.floor(Math.random() * flat.length)];
        if (pick) location.hash = "#/" + pick.ch.id;
      });
    }
  }

  /* ---------- chapter view ---------- */
  function renderChapter(id) {
    var entry = byId[id];
    if (!entry) { location.hash = "#/"; return; }

    var ch = entry.ch;
    var part = entry.part;
    var pi = PARTS.indexOf(part);

    var html = "";
    html += '<div class="chapter">';
    html += '<header class="chapter-head">';
    html += '<p class="chapter-kicker"><span>' + esc(kickerLabel(entry)) + "</span>" +
            '<span class="dot"></span>' +
            '<span class="part-name">' +
              esc(isAppendix(part) ? part.title : partLabel(part, pi) + " · " + part.title) +
            "</span></p>";
    html += "<h2>" + esc(ch.title) + "</h2>";
    if (ch.lede) html += '<p class="chapter-lede">' + esc(ch.lede) + "</p>";

    html += '<div class="chapter-meta">';
    if (ch.minutes) html += "<span>" + esc(T.minutes(ch.minutes)) + "</span>";
    (ch.tags || []).forEach(function (t) {
      html += '<span class="tag">' + esc(t) + "</span>";
    });
    html += "</div></header>";

    if (ch.__translated) {
      /* Hình minh hoạ được chèn theo vị trí tiêu đề, không sửa vào từng
         bản dịch — nên một chương có ba bản vẫn nhận đúng hình. */
      var body = ch.body || "";
      if (window.BOOK_FIGURES) body = window.BOOK_FIGURES.render(body, ch.id);
      html += '<div class="body">' + body + "</div>";
    } else {
      html += '<div class="notice">' +
        "<h3>" + esc(T.untranslatedTitle) + "</h3>" +
        "<p>" + esc(T.untranslatedBody) + "</p>" +
        '<a href="' + viUrl(ch.id) + '">' + esc(T.untranslatedCta) + "</a>" +
        "</div>";
    }
    html += "</div>";

    $("#page").innerHTML = html;
    document.title = ch.title + " — The Brewing Bible";
    if (window.BOOK_FIGURES) window.BOOK_FIGURES.enhance($("#page"));
    decorateTemplates(ch);

    /* pager */
    var idx = flat.indexOf(entry);
    var prev = flat[idx - 1];
    var next = flat[idx + 1];
    var pager = "";
    if (prev) {
      pager += '<a class="pager-link prev" href="#/' + prev.ch.id + '"><span class="dir">' + esc(T.prev) + "</span>" +
               '<span class="t">' + esc(prev.ch.title) + "</span></a>";
    }
    if (next) {
      pager += '<a class="pager-link next" href="#/' + next.ch.id + '"><span class="dir">' + esc(T.next) + "</span>" +
               '<span class="t">' + esc(next.ch.title) + "</span></a>";
    }
    $("#pager").innerHTML = pager;
    $("#pager").style.display = pager ? "" : "none";

    /* mark active + read */
    document.querySelectorAll(".toc-link").forEach(function (a) {
      a.classList.toggle("active", a.dataset.ch === id);
      a.classList.toggle("done", !!readSet[a.dataset.ch]);
    });

    markRead(id);
    updateReadStat();
    window.scrollTo({ top: 0, behavior: "instant" in document.body.style ? "instant" : "auto" });
    closeDrawer();
  }

  /* ---------- mẫu để điền tay, in được ---------- */

  /* Vài khối trong sách là mẫu điền tay: nhật ký pha, phiếu cupping, tóm tắt
     bao cà. Trong sách giấy chỉ có một bản — không ai photo cả cuốn sách để
     lấy một trang. Khối nào có data-tpl thì trên web có thêm nút mở một
     trang in riêng: mỗi bản một tờ A5, in bao nhiêu tuỳ ý rồi đóng lại. */
  /* Nút nằm *trong* khung mẫu, góc trên phải — không phải một hàng riêng
     bên dưới. Khối mẫu là thứ người đọc muốn mang đi in; nút thuộc về nó,
     và ở trong khung thì không ai phải đoán nút đó thuộc khối nào. */
  var TPL_ICON =
    '<svg viewBox="0 0 16 16" aria-hidden="true" focusable="false">' +
      '<path d="M4.6 5.9V3.1h6.8v2.8M4.6 11.4H3.1A1.1 1.1 0 0 1 2 10.3V7.1A1.1 1.1 0 0 1 3.1 6h9.8A1.1 1.1 0 0 1 14 7.1v3.2a1.1 1.1 0 0 1-1.1 1.1h-1.5M4.6 9.1h6.8v4.2H4.6z"/>' +
      '<circle cx="11.6" cy="8.2" r=".65" fill="currentColor" stroke="none"/>' +
    "</svg>";

  function decorateTemplates(ch) {
    document.querySelectorAll(".body [data-tpl]").forEach(function (el, i) {
      var btn = document.createElement("button");
      btn.type = "button";
      btn.className = "tpl-btn";
      btn.title = T.tplHint;
      btn.innerHTML = TPL_ICON + "<span>" + esc(T.tplPrint) + "</span>";
      btn.addEventListener("click", function () { openTemplatePrint(ch, i, btn); });

      el.classList.add("tpl-host");
      el.appendChild(btn);
    });
  }

  /* Trang in là một trang riêng (tpl.html), không phải cửa sổ dựng bằng
     document.write: mở được bằng link, tải lại được, và không phụ thuộc
     popup của trang đang đọc. Ở đây chỉ cần mở nó kèm mã chương và thứ tự
     của khối mẫu trong chương. */
  function openTemplatePrint(ch, index, btn) {
    var url = "tpl.html?ch=" + encodeURIComponent(ch.id) +
              "&i=" + index + "&lang=" + LANG;
    var w = window.open(url, "_blank");
    if (w) return;

    /* Popup bị chặn: đổi chính nút đó thành link, giữ nguyên chỗ trong góc
       khung — thay vì hộp thoại báo lỗi hay một hàng chữ mới bên dưới. */
    var a = document.createElement("a");
    a.className = "tpl-btn tpl-fallback";
    a.href = url;
    a.target = "_blank";
    a.rel = "noopener";
    a.title = T.tplBlocked;
    a.innerHTML = btn.innerHTML + '<i aria-hidden="true">↗</i>';
    btn.replaceWith(a);
  }

  function markRead(id) {
    if (readSet[id]) return;
    readSet[id] = true;
    var list = Object.keys(readSet);
    LS.set("read", list);
    var a = document.querySelector('.toc-link[data-ch="' + id + '"]');
    if (a) a.classList.add("done");
  }

  function updateReadStat() {
    var done = Object.keys(readSet).filter(function (k) {
      return byId[k] && !isAppendix(byId[k].part);
    }).length;
    var pct = TOTAL ? Math.round((done / TOTAL) * 100) : 0;
    $("#readStat").innerHTML =
      T.readStat(done, TOTAL) +
      '<span class="read-meter"><i style="width:' + pct + '%"></i></span>';
  }

  /* ---------- routing ---------- */
  function route() {
    var h = location.hash.replace(/^#\/?/, "");
    if (!h || h === "") {
      renderCover();
      $("#pager").style.display = "none";
      document.querySelectorAll(".toc-link").forEach(function (a) { a.classList.remove("active"); });
      return;
    }
    /* support deep links like #/ch-04#section */
    var id = h.split("#")[0];
    renderChapter(id);
    if (h.indexOf("#") > -1) {
      var anchor = h.split("#")[1];
      var el = document.getElementById(anchor);
      if (el) el.scrollIntoView();
    }
  }

  window.addEventListener("hashchange", route);

  /* ---------- search ---------- */
  var searchInput = $("#searchInput");
  var searchResults = $("#searchResults");

  function runSearch(query) {
    /* Người Việt gõ không dấu trên điện thoại là mặc định — "chiet xuat"
       phải ra "chiết xuất". Nhờ fold giữ nguyên độ dài, vị trí tìm được
       trong bản bỏ dấu vẫn cắt đúng chỗ trong bản có dấu. */
    var q = S.normFold(query.trim());
    if (q.length < 2) { searchResults.hidden = true; return; }

    var hits = [];
    index.forEach(function (rec) {
      var m = S.hit(rec, q);
      if (!m) return;
      hits.push({ entry: rec.entry, score: m.score, snippet: S.snippet(rec.text, m.pos, q.length) });
    });

    hits.sort(function (a, b) { return b.score - a.score; });
    hits = hits.slice(0, 8);

    if (!hits.length) {
      searchResults.innerHTML = '<p class="sr-empty">' + esc(T.noResults) + "</p>";
      searchResults.hidden = false;
      return;
    }

    searchResults.innerHTML = hits.map(function (h) {
      return '<button class="sr-item" data-go="' + h.entry.ch.id + '">' +
        '<span class="sr-kicker">' + esc(T.searchKicker(numLabel(h.entry), h.entry.part.title)) + "</span>" +
        '<span class="sr-title">' + esc(h.entry.ch.title) + "</span>" +
        '<span class="sr-snippet">' + esc(h.snippet) + "</span></button>";
    }).join("");
    searchResults.hidden = false;
  }

  if (searchInput) {
    searchInput.addEventListener("input", function () { runSearch(searchInput.value); });
    searchInput.addEventListener("focus", function () {
      if (searchInput.value.trim().length >= 2) runSearch(searchInput.value);
    });
    searchInput.addEventListener("keydown", function (e) {
      if (e.key === "Escape") {
        searchInput.value = "";
        searchResults.hidden = true;
        searchInput.blur();
      }
      if (e.key === "Enter") {
        var first = searchResults.querySelector(".sr-item");
        if (first) first.click();
      }
    });
    searchResults.addEventListener("click", function (e) {
      var btn = e.target.closest("[data-go]");
      if (!btn) return;
      location.hash = "#/" + btn.dataset.go;
      searchResults.hidden = true;
      searchInput.value = "";
    });
    document.addEventListener("click", function (e) {
      if (!e.target.closest(".search-wrap")) searchResults.hidden = true;
    });
  }

  /* ---------- theme ---------- */
  var themeBtn = $("#themeToggle");
  function applyTheme(t) {
    document.documentElement.setAttribute("data-theme", t);
    LS.set("theme", t);
  }
  applyTheme(LS.get("theme", "light"));
  if (themeBtn) {
    themeBtn.addEventListener("click", function () {
      var cur = document.documentElement.getAttribute("data-theme");
      applyTheme(cur === "dark" ? "light" : "dark");
    });
  }

  /* ---------- font size ---------- */
  var scale = LS.get("fontScale", 1);
  function applyScale(s) {
    scale = Math.min(1.25, Math.max(0.85, s));
    document.documentElement.style.setProperty("--fs-scale", scale);
    LS.set("fontScale", scale);
  }
  applyScale(scale);
  var fd = $("#fontDown"), fu = $("#fontUp");
  if (fd) fd.addEventListener("click", function () { applyScale(scale - 0.07); });
  if (fu) fu.addEventListener("click", function () { applyScale(scale + 0.07); });

  /* ---------- drawer ---------- */
  function openDrawer() { document.body.classList.add("drawer-open"); }
  function closeDrawer() { document.body.classList.remove("drawer-open"); }
  var drawerToggle = $("#drawerToggle");
  if (drawerToggle) {
    drawerToggle.addEventListener("click", function () {
      document.body.classList.contains("drawer-open") ? closeDrawer() : openDrawer();
    });
  }
  var scrim = $("#scrim");
  if (scrim) scrim.addEventListener("click", closeDrawer);

  /* ---------- reading progress ---------- */
  var progressBar = $("#progressBar");
  function updateProgress() {
    var doc = document.documentElement;
    var max = doc.scrollHeight - window.innerHeight;
    var pct = max > 40 ? Math.min(100, (window.scrollY / max) * 100) : 0;
    progressBar.style.width = pct + "%";
  }
  window.addEventListener("scroll", updateProgress, { passive: true });
  window.addEventListener("resize", updateProgress);

  /* ---------- keyboard ---------- */
  document.addEventListener("keydown", function (e) {
    if (e.target.matches("input, textarea, select")) return;
    if (e.metaKey || e.ctrlKey || e.altKey) return;

    var h = location.hash.replace(/^#\/?/, "");
    var entry = byId[h];
    if (!entry) return;

    if (e.key === "ArrowRight") {
      var idx = flat.indexOf(entry);
      var next = flat[idx + 1];
      if (next) location.hash = "#/" + next.ch.id;
    } else if (e.key === "ArrowLeft") {
      var idx2 = flat.indexOf(entry);
      var prev = flat[idx2 - 1];
      if (prev) location.hash = "#/" + prev.ch.id;
    } else if (e.key === "/") {
      e.preventDefault();
      searchInput && searchInput.focus();
    }
  });

  /* Ở màn hình hẹp, ô chọn ngôn ngữ hiện mã ngắn (VI / EN / 日本語) để
     chừa chỗ cho ô tìm kiếm. Nhãn đầy đủ vẫn nằm trong aria-label. */
  function syncLangLabels(sel) {
    var narrow = window.matchMedia("(max-width: 32rem)").matches;
    Array.prototype.forEach.call(sel.options, function (o) {
      if (!o.dataset.full) o.dataset.full = o.textContent;
      var next = narrow ? (o.dataset.short || o.dataset.full) : o.dataset.full;
      if (o.textContent !== next) o.textContent = next;
    });
  }

  /* ---------- khung giao diện theo ngôn ngữ ---------- */
  function setupChrome() {
    document.documentElement.lang = LANG;
    document.title = T.title;

    var sel = $("#langSelect");
    if (sel) {
      sel.value = LANG;
      sel.addEventListener("change", function () { switchLang(sel.value); });
      syncLangLabels(sel);
      window.addEventListener("resize", function () { syncLangLabels(sel); });
    }

    var si = $("#searchInput");
    if (si) {
      si.placeholder = T.searchPlaceholder;
      si.setAttribute("aria-label", T.searchAria);
    }

    var skip = $("#skipLink");
    if (skip) {
      skip.textContent = T.skip;
      /* Hash ở đây là router của sách: nhảy tới "#main" sẽ bị hiểu là một
         chương không tồn tại và đá người đọc về bìa. Chuyển focus thẳng
         vào nội dung, không đụng tới hash. */
      skip.addEventListener("click", function (e) {
        var main = $("#main");
        if (!main) return;
        e.preventDefault();
        main.focus();
        main.scrollIntoView({ block: "start" });
      });
    }

    var toc = $("#toc");
    if (toc) toc.setAttribute("aria-label", T.tocAria);

    var dt = $("#drawerToggle");
    if (dt) dt.setAttribute("aria-label", T.drawerAria);

    var fd2 = $("#fontDown");
    if (fd2) fd2.setAttribute("aria-label", T.fontSmaller);
    var fu2 = $("#fontUp");
    if (fu2) fu2.setAttribute("aria-label", T.fontLarger);

    var th = $("#themeToggle");
    if (th) th.setAttribute("aria-label", T.themeToggle);
  }

  /* ---------- init ---------- */
  function boot() {
    buildIndex();
    buildToc();
    updateReadStat();
    route();
    updateProgress();
  }

  setupChrome();

  if (LANG === "vi") {
    applyTranslation(null);
    boot();
  } else {
    loadOverlay(LANG).then(function (text) {
      applyTranslation(text);
      boot();
    });
  }
})();
