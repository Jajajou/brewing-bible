/* ============================================================
   Nước, Bã và Ánh Sáng — book.js
   Router, mục lục, tìm kiếm, tiến độ đọc, giao diện.
   ============================================================ */
(function () {
  "use strict";

  var PARTS = window.BOOK_PARTS || [];

  /* ---------- flatten ---------- */
  var flat = [];
  PARTS.forEach(function (part) {
    (part.chapters || []).forEach(function (ch) {
      flat.push({ ch: ch, part: part, n: flat.length + 1 });
    });
  });

  var byId = {};
  flat.forEach(function (entry) {
    if (entry.ch.id) byId[entry.ch.id] = entry;
  });

  var TOTAL = flat.length;

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

  /* ---------- plain text index for search ---------- */
  var index = flat.map(function (entry) {
    var tmp = document.createElement("div");
    tmp.innerHTML = entry.ch.body || "";
    var norm = function (s) { return String(s || "").replace(/\s+/g, " ").toLowerCase(); };
    return {
      entry: entry,
      title: norm(entry.ch.title),
      lede: norm(entry.ch.lede),
      text: norm(entry.ch.title + " " + (entry.ch.lede || "") + " " + (tmp.textContent || ""))
    };
  });

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
                '<span class="n">' + String(entry.n).padStart(2, "0") + "</span>" +
                "<span>" + esc(ch.title) + "</span></a></li>";
      });
      html += "</ul></div>";
    });
    toc.innerHTML = html;
  }

  /* ---------- cover ---------- */
  function renderCover() {
    var html = "";
    html += '<div class="cover">';
    html += '<p class="cover-kicker">Sách thực hành · Pour Over &amp; Cupping</p>';
    html += "<h1>The Brewing<br><em>Bible</em></h1>";
    html += '<p class="cover-dek">Một cuốn sách về những gì thật sự xảy ra khi nước chạm vào bã cà — ' +
            "và cách biến một ly cupping ngon thành một ly pour-over ngon, mà không cần biến việc uống cà phê thành một dự án kỹ thuật.</p>";

    html += '<div class="cover-meta">';
    html += "<div><b>" + TOTAL + "</b>chương</div>";
    html += "<div><b>" + PARTS.length + "</b>phần</div>";
    html += "<div><b>~5 giờ</b>đọc</div>";
    html += "<div><b>3 mức</b>độ bằng chứng</div>";
    html += "</div>";

    html += "<p>Cuốn sách này được viết từ một nguyên tắc: <strong>nói rõ chỗ nào có bằng chứng, " +
            "chỗ nào chỉ là suy luận hợp lý, và chỗ nào là truyền miệng</strong>. Nghề pha cà phê specialty " +
            "đầy những lời khuyên được lặp lại đủ lâu để thành niềm tin. Bạn sẽ thấy chúng được đánh dấu, " +
            "và bạn sẽ biết mình đang đứng trên nền đất gì.</p>";

    html += '<div class="tier-legend">' +
      '<div><span class="tier tier-a">Bằng chứng</span><span>Có nghiên cứu công bố hoặc lý thuyết vật lý/hóa học chắc chắn.</span></div>' +
      '<div><span class="tier tier-b">Hợp lý</span><span>Cơ chế đúng nhưng chưa có nghiên cứu kiểm soát.</span></div>' +
      '<div><span class="tier tier-c">Truyền miệng</span><span>Được lặp lại nhiều nhưng không ai kiểm chứng.</span></div>' +
      '<p class="tier-legend-foot">Cái đầu là nền đất. Cái giữa là giả thuyết tốt. Cái cuối là niềm tin — biết để hiểu vì sao người ta nói vậy.</p>' +
      "</div>";

    /* table of contents on the cover */
    html += '<div class="cover-toc">';
    PARTS.forEach(function (part, pi) {
      var chs = part.chapters || [];
      if (!chs.length) return;
      html += '<div class="ctoc-part">';
      html += '<p class="ctoc-head">' + esc(part.title) +
              '<span>Phần ' + (part.roman || ROMAN[pi]) + (part.blurb ? " · " + esc(part.blurb) : "") + "</span></p>";
      chs.forEach(function (ch) {
        var entry = byId[ch.id];
        if (!entry) return;
        html += '<a class="ctoc-item" href="#/' + ch.id + '">' +
                '<span class="n">' + String(entry.n).padStart(2, "0") + "</span>" +
                "<span>" + esc(ch.title) + "</span></a>";
      });
      html += "</div>";
    });
    html += "</div>";

    html += '<div class="cta-row">';
    html += '<a class="btn btn-primary" href="#/' + (flat[0] ? flat[0].ch.id : "") + '">Bắt đầu đọc →</a>';
    html += '<button class="btn btn-ghost" id="randomCh">Mở một chương ngẫu nhiên</button>';
    html += '<a class="btn btn-ghost" href="the-brewing-bible.pdf" download>Bản in A5 (PDF) ↓</a>';
    html += '<a class="btn btn-ghost" href="the-brewing-bible.epub" download>EPUB cho máy đọc sách ↓</a>';
    html += "</div>";

    html += "</div>";

    $("#page").innerHTML = html;
    document.title = "The Brewing Bible — Pour Over & Cupping";

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
    html += '<p class="chapter-kicker"><span>Chương ' + String(entry.n).padStart(2, "0") + "</span>" +
            '<span class="dot"></span>' +
            '<span class="part-name">' + esc(part.title) + "</span></p>";
    html += "<h2>" + esc(ch.title) + "</h2>";
    if (ch.lede) html += '<p class="chapter-lede">' + esc(ch.lede) + "</p>";

    html += '<div class="chapter-meta">';
    if (ch.minutes) html += "<span>~" + ch.minutes + " phút đọc</span>";
    (ch.tags || []).forEach(function (t) {
      html += '<span class="tag">' + esc(t) + "</span>";
    });
    html += "</div></header>";

    html += '<div class="body">' + (ch.body || "") + "</div>";
    html += "</div>";

    $("#page").innerHTML = html;
    document.title = ch.title + " — The Brewing Bible";

    /* pager */
    var idx = flat.indexOf(entry);
    var prev = flat[idx - 1];
    var next = flat[idx + 1];
    var pager = "";
    if (prev) {
      pager += '<a class="pager-link prev" href="#/' + prev.ch.id + '"><span class="dir">← Chương trước</span>' +
               '<span class="t">' + esc(prev.ch.title) + "</span></a>";
    }
    if (next) {
      pager += '<a class="pager-link next" href="#/' + next.ch.id + '"><span class="dir">Chương sau →</span>' +
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

  function markRead(id) {
    if (readSet[id]) return;
    readSet[id] = true;
    var list = Object.keys(readSet);
    LS.set("read", list);
    var a = document.querySelector('.toc-link[data-ch="' + id + '"]');
    if (a) a.classList.add("done");
  }

  function updateReadStat() {
    var done = Object.keys(readSet).filter(function (k) { return byId[k]; }).length;
    var pct = TOTAL ? Math.round((done / TOTAL) * 100) : 0;
    $("#readStat").innerHTML =
      "<strong>" + done + "</strong> / " + TOTAL + " chương đã đọc" +
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

  function runSearch(q) {
    q = q.trim().toLowerCase();
    if (q.length < 2) { searchResults.hidden = true; return; }

    var hits = [];
    index.forEach(function (rec) {
      var pos = rec.text.indexOf(q);
      if (pos === -1) return;

      var start = Math.max(0, pos - 55);
      var snippet = rec.text.slice(start, pos + q.length + 95);

      /* ranking: title > lede > repetition > early position */
      var count = 0, from = 0, at;
      while ((at = rec.text.indexOf(q, from)) !== -1) { count++; from = at + q.length; }

      var score = 0;
      if (rec.title.indexOf(q) > -1) score += 400;
      if (rec.lede.indexOf(q) > -1) score += 160;
      score += Math.min(count, 20) * 8;
      if (pos < 120) score += 40;

      hits.push({ entry: rec.entry, score: score, snippet: (start > 0 ? "…" : "") + snippet + "…" });
    });

    hits.sort(function (a, b) { return b.score - a.score; });
    hits = hits.slice(0, 8);

    if (!hits.length) {
      searchResults.innerHTML = '<p class="sr-empty">Không tìm thấy. Thử một từ khác.</p>';
      searchResults.hidden = false;
      return;
    }

    searchResults.innerHTML = hits.map(function (h) {
      return '<button class="sr-item" data-go="' + h.entry.ch.id + '">' +
        '<span class="sr-kicker">Chương ' + String(h.entry.n).padStart(2, "0") + " · " + esc(h.entry.part.title) + "</span>" +
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

  /* ---------- init ---------- */
  buildToc();
  updateReadStat();
  route();
  updateProgress();
})();
