/* ============================================================
   The Brewing Bible — dựng bản in một tài liệu duy nhất
   Đọc window.BOOK_PARTS từ content/part-*.js rồi dựng:
   bìa → mục lục → từng phần → từng chương.
   ============================================================ */
(function () {
  "use strict";

  var PARTS = window.BOOK_PARTS || [];
  var ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"];

  if (!PARTS.length) {
    document.getElementById("book").innerHTML =
      '<p style="padding:20mm;font-family:sans-serif">Không tải được nội dung.</p>';
    return;
  }

  /* đánh số chương liên tục; phụ lục đánh riêng A1, A2… để không thành chương 30 */
  var counter = 0;
  var acounter = 0;
  PARTS.forEach(function (part) {
    (part.chapters || []).forEach(function (ch) {
      if (part.appendix) ch.__a = ++acounter;
      else ch.__n = ++counter;
    });
  });

  function esc(s) {
    return String(s == null ? "" : s)
      .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  }

  var totalChapters = counter;
  var totalParts = PARTS.filter(function (p) { return !p.appendix; }).length;

  function partNum(part, pi) {
    return part.appendix ? "Phụ lục" : "Phần " + (part.roman || ROMAN[pi]);
  }

  var html = [];

  /* ---------- bìa ---------- */
  html.push(
    '<section class="book-cover">',
    '<p class="kicker">Sách thực hành · Pour Over &amp; Cupping</p>',
    "<h1>The Brewing<br><em>Bible</em></h1>",
    '<p class="dek">Những gì thật sự xảy ra khi nước chạm vào bã cà — và cách biến một ly cupping ngon thành một ly pour-over ngon.</p>',
    '<div class="rule"></div>',
    '<p class="imprint">',
    "<b>" + totalParts + " phần · " + totalChapters + " chương</b><br>",
    "Mỗi khẳng định được đánh dấu theo ba mức bằng chứng:<br>",
    "có nghiên cứu · hợp lý nhưng chưa kiểm chứng · truyền miệng.",
    "</p>",
    "</section>"
  );

  /* ---------- mục lục ---------- */
  html.push('<section class="book-toc">', "<h2>Mục lục</h2>");
  PARTS.forEach(function (part, pi) {
    var chs = part.chapters || [];
    if (!chs.length) return;
    html.push(
      '<p class="toc-part">' + partNum(part, pi) + " · " + esc(part.title) + "</p>"
    );
    chs.forEach(function (ch) {
      html.push(
        '<a class="toc-row" href="#' + ch.id + '">' +
          '<span class="n">' +
            (ch.__a ? "A" + ch.__a : String(ch.__n).padStart(2, "0")) +
          "</span>" +
          "<span>" + esc(ch.title) + "</span>" +
        "</a>"
      );
    });
  });
  html.push("</section>");

  /* ---------- các phần & chương ---------- */
  PARTS.forEach(function (part, pi) {
    var chs = part.chapters || [];
    if (!chs.length) return;

    html.push(
      '<section class="part-page">',
      '<p class="part-num">' + partNum(part, pi) + "</p>",
      "<h2>" + esc(part.title) + "</h2>",
      part.blurb ? '<p class="part-blurb">' + esc(part.blurb) + "</p>" : "",
      "</section>"
    );

    chs.forEach(function (ch) {
      html.push(
        '<section class="chapter" data-ch="' + ch.id + '">',
        /* id nằm trên .ch-head, không nằm trên <section>: Paged.js có thể tạo
           một mảnh rỗng của section ở cuối trang trước, và target-counter
           trong mục lục sẽ báo sai trang. Cũng vì thế phần đầu chương là một
           khối không tách. */
        '<header class="ch-head" id="' + ch.id + '">',
        '<p class="ch-num">' +
          (ch.__a ? "Phụ lục A" + ch.__a : "Chương " + String(ch.__n).padStart(2, "0")) +
          "</p>",
        '<h2 class="ch-title">' + esc(ch.title) + "</h2>",
        ch.lede ? '<p class="ch-lede">' + esc(ch.lede) + "</p>" : "",
        '<div class="ch-rule"></div>',
        "</header>",
        '<div class="body">' + (ch.body || "") + "</div>",
        "</section>"
      );
    });
  });

  document.getElementById("book").innerHTML = html.join("");

  /* ---------- Paged.js (nếu có) ---------- */
  /* Chỉ khi xuất PDF mới nạp luật in (lề trang = 0). Nạp SAU khi phân trang
     xong, vì Paged.js đọc mọi @page kể cả trong stylesheet media="print". */
  function loadPrintOverrides() {
    var link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = "print-output.css";
    link.id = "pdf-print-overrides";
    document.head.appendChild(link);
  }
  var wantsPdf = /[?&]pdf=1\b/.test(location.search);

  if (window.PagedPolyfill && typeof window.PagedPolyfill.preview === "function") {
    document.documentElement.setAttribute("data-paged", "pending");
    window.PagedPolyfill.preview()
      .then(function () {
        if (wantsPdf) loadPrintOverrides();
        document.documentElement.setAttribute("data-paged", "done");
      })
      .catch(function (err) {
        document.documentElement.setAttribute("data-paged", "error");
        if (window.console) console.error("Paged.js:", err);
      });
  } else {
    document.documentElement.setAttribute("data-paged", "none");
  }
})();
