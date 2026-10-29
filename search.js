/* ============================================================
   The Brewing Bible — search.js
   Chuẩn hoá chữ để tìm kiếm, và chấm điểm kết quả.
   Dùng chung cho trang web (window.BOOK_SEARCH) và cho test
   (node --test import thẳng file này). Không đụng tới DOM.
   ============================================================ */
(function (root, factory) {
  "use strict";
  var api = factory();
  if (typeof module === "object" && module.exports) module.exports = api;
  if (root) root.BOOK_SEARCH = api;
})(typeof globalThis !== "undefined" ? globalThis : this, function () {
  "use strict";

  /* Bỏ dấu một ký tự, luôn trả về đúng một ký tự.

     Bất biến này là thứ cả file dựa vào: chuỗi đã bỏ dấu phải dài bằng
     chuỗi gốc, từng ký tự một. Nhờ vậy vị trí tìm được trong bản bỏ dấu
     dùng thẳng được để cắt snippet từ bản có dấu — người đọc thấy "chiết
     xuất" chứ không thấy "chiet xuat".

     Ký tự lạ (không phải chữ Latin) thì giữ nguyên, không ném lỗi. */
  function foldChar(c) {
    if (c === "đ") return "d";
    if (c === "Đ") return "D";
    var d = c.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    if (d.length !== 1) return c;
    /* Không dấu thì i và y là một: sách viết "tỉ lệ", người gõ "ty le",
       cả hai cùng về "ti le". Đổi một ký tự thành một ký tự nên offset
       vẫn khớp. */
    if (d === "y") return "i";
    if (d === "Y") return "I";
    return d;
  }

  /* Duyệt theo đơn vị mã (không phải code point) để offset khớp với
     String#indexOf và String#slice của JS. */
  function fold(s) {
    var str = String(s == null ? "" : s);
    var out = "";
    for (var i = 0; i < str.length; i++) out += foldChar(str[i]);
    return out;
  }

  /* Gộp khoảng trắng và hạ chữ thường. Bỏ dấu phải làm SAU bước này,
     trên cùng một chuỗi, để hai bản dài bằng nhau. */
  function normText(s) {
    return String(s == null ? "" : s).replace(/\s+/g, " ").toLowerCase();
  }

  function normFold(s) {
    return fold(normText(s));
  }

  /* Một chương đã chuẩn hoá, sẵn để tìm: text (hiển thị) và fold (tìm),
     cùng độ dài. */
  function makeRecord(title, lede, body) {
    var t = normText(title);
    var l = normText(lede);
    var text = normText(t + " " + l + " " + (body || ""));
    return {
      title: t,
      lede: l,
      text: text,
      fold: fold(text),
      titleFold: fold(t),
      ledeFold: fold(l)
    };
  }

  /* null nếu không có; ngược lại { pos, count, score }.
     Xếp hạng: tiêu đề > lede > số lần lặp > vị trí sớm. */
  function hit(rec, q) {
    if (!q) return null;
    var pos = rec.fold.indexOf(q);
    if (pos === -1) return null;

    var count = 0;
    var from = 0;
    var at;
    while ((at = rec.fold.indexOf(q, from)) !== -1) { count++; from = at + q.length; }

    var score = 0;
    if (rec.titleFold.indexOf(q) > -1) score += 400;
    if (rec.ledeFold.indexOf(q) > -1) score += 160;
    score += Math.min(count, 20) * 8;
    if (pos < 120) score += 40;

    return { pos: pos, count: count, score: score };
  }

  /* Cắt quanh vị trí tìm được, từ bản CÓ DẤU. */
  function snippet(text, pos, len) {
    var start = Math.max(0, pos - 55);
    var end = Math.min(text.length, pos + len + 95);
    return (start > 0 ? "…" : "") + text.slice(start, end) + (end < text.length ? "…" : "");
  }

  /* "01"–"29" cho chương, "A1"–"A4" cho phụ lục. */
  function numLabel(isAppendix, n, np) {
    return isAppendix ? "A" + np : String(n).padStart(2, "0");
  }

  return {
    fold: fold,
    normText: normText,
    normFold: normFold,
    makeRecord: makeRecord,
    hit: hit,
    snippet: snippet,
    numLabel: numLabel
  };
});
