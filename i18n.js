/* ============================================================
   The Brewing Bible — i18n.js
   Chuỗi giao diện cho ba ngôn ngữ. Nội dung chương nằm ở
   content/<lang>/text.js, nội dung gốc tiếng Việt ở content/part-*.js.
   ============================================================ */
(function () {
  "use strict";

  var UI = {
    vi: {
      lang: "vi",
      name: "Tiếng Việt",
      short: "VI",
      title: "The Brewing Bible — Pour Over & Cupping",
      searchPlaceholder: "Tìm trong sách…",
      searchAria: "Tìm trong sách",
      tocAria: "Mục lục",
      drawerAria: "Mục lục",
      fontSmaller: "Chữ nhỏ hơn",
      fontLarger: "Chữ lớn hơn",
      themeToggle: "Đổi giao diện sáng/tối",
      langAria: "Đổi ngôn ngữ",
      chapter: "Chương",
      part: "Phần",
      appendix: "Phụ lục",
      minutes: (n) => "~" + n + " phút đọc",
      readStat: (d, t) => "<strong>" + d + "</strong> / " + t + " chương đã đọc",
      prev: "← Chương trước",
      next: "Chương sau →",
      noResults: "Không tìm thấy. Thử một từ khác.",
      searchKicker: (n, part) => "Chương " + n + " · " + part,
      coverKicker: "Sách thực hành · Pour Over & Cupping",
      coverDek: "Một cuốn sách về những gì thật sự xảy ra khi nước chạm vào bã cà — và cách biến một ly cupping ngon thành một ly pour-over ngon, mà không cần biến việc uống cà phê thành một dự án kỹ thuật.",
      metaChapters: "chương",
      metaParts: "phần",
      metaHours: "đọc",
      metaTiers: "độ bằng chứng",
      metaHoursValue: "~5 giờ",
      metaTiersValue: "3 mức",
      coverBody: "Cuốn sách này được viết từ một nguyên tắc: <strong>nói rõ chỗ nào có bằng chứng, chỗ nào chỉ là suy luận hợp lý, và chỗ nào là truyền miệng</strong>. Nghề pha cà phê specialty đầy những lời khuyên được lặp lại đủ lâu để thành niềm tin. Bạn sẽ thấy chúng được đánh dấu, và bạn sẽ biết mình đang đứng trên nền đất gì.",
      tierA: ["Bằng chứng", "Có nghiên cứu công bố hoặc lý thuyết vật lý/hóa học chắc chắn."],
      tierB: ["Hợp lý", "Cơ chế đúng nhưng chưa có nghiên cứu kiểm soát."],
      tierC: ["Truyền miệng", "Được lặp lại nhiều nhưng không ai kiểm chứng."],
      tierFoot: "Cái đầu là nền đất. Cái giữa là giả thuyết tốt. Cái cuối là niềm tin — biết để hiểu vì sao người ta nói vậy.",
      start: "Bắt đầu đọc →",
      random: "Mở một chương ngẫu nhiên",
      pdf: "Bản in A5 (PDF) ↓",
      epub: "EPUB cho máy đọc sách ↓",
      untranslatedTitle: "Chương này chưa có bản dịch",
      untranslatedBody: "Nội dung tiếng Việt đã có đủ. Bản dịch đang được làm dần từng phần.",
      untranslatedCta: "Đọc chương này bằng tiếng Việt",
      untranslatedBadge: "Chưa dịch"
    },

    en: {
      lang: "en",
      name: "English",
      short: "EN",
      title: "The Brewing Bible — Pour Over & Cupping",
      searchPlaceholder: "Search the book…",
      searchAria: "Search the book",
      tocAria: "Contents",
      drawerAria: "Contents",
      fontSmaller: "Smaller text",
      fontLarger: "Larger text",
      themeToggle: "Toggle light and dark",
      langAria: "Change language",
      chapter: "Chapter",
      part: "Part",
      appendix: "Appendix",
      minutes: (n) => "~" + n + " min read",
      readStat: (d, t) => "<strong>" + d + "</strong> / " + t + " chapters read",
      prev: "← Previous chapter",
      next: "Next chapter →",
      noResults: "Nothing found. Try another word.",
      searchKicker: (n, part) => "Chapter " + n + " · " + part,
      coverKicker: "A practice book · Pour Over & Cupping",
      coverDek: "A book about what actually happens when water meets coffee grounds — and how to turn a good cupping bowl into a good pour-over, without turning your morning coffee into an engineering project.",
      metaChapters: "chapters",
      metaParts: "parts",
      metaHours: "read",
      metaTiers: "evidence levels",
      metaHoursValue: "~5 h",
      metaTiersValue: "3 levels",
      coverBody: "This book is built on one rule: <strong>say plainly where there is evidence, where there is only a reasonable mechanism, and where the advice is folklore</strong>. Specialty coffee is full of claims repeated often enough to feel like facts. Here they are labelled, so you always know what ground you are standing on.",
      tierA: ["Evidence", "Supported by published research or solid physics and chemistry."],
      tierB: ["Plausible", "The mechanism is right, but no controlled study exists."],
      tierC: ["Folklore", "Repeated widely, verified by nobody."],
      tierFoot: "The first is ground under your feet. The second is a good hypothesis. The third is belief — worth knowing so you understand why people say it.",
      start: "Start reading →",
      random: "Open a random chapter",
      pdf: "Print edition A5 (PDF) ↓",
      epub: "EPUB for e-readers ↓",
      untranslatedTitle: "This chapter is not translated yet",
      untranslatedBody: "The Vietnamese text is complete. Translations are being added one part at a time.",
      untranslatedCta: "Read this chapter in Vietnamese",
      untranslatedBadge: "Untranslated"
    },

    ja: {
      lang: "ja",
      name: "日本語",
      short: "JA",
      title: "The Brewing Bible — ペーパードリップとカッピング",
      searchPlaceholder: "本文を検索…",
      searchAria: "本文を検索",
      tocAria: "目次",
      drawerAria: "目次",
      fontSmaller: "文字を小さく",
      fontLarger: "文字を大きく",
      themeToggle: "ライト／ダークを切り替え",
      langAria: "言語を変更",
      chapter: "第",
      part: "第",
      appendix: "付録",
      minutes: (n) => "約" + n + "分",
      readStat: (d, t) => "<strong>" + d + "</strong> / " + t + " 章 読了",
      prev: "← 前の章",
      next: "次の章 →",
      noResults: "見つかりませんでした。別の言葉でお試しください。",
      searchKicker: (n, part) => "第" + n + "章 · " + part,
      coverKicker: "実践のための一冊 · ペーパードリップとカッピング",
      coverDek: "お湯が粉に触れたとき、実際に何が起きているのか。良いカッピングから良いペーパードリップへ移る方法を、コーヒーを工学の課題にしないまま扱う本です。",
      metaChapters: "章",
      metaParts: "部",
      metaHours: "読書",
      metaTiers: "根拠の段階",
      metaHoursValue: "約5時間",
      metaTiersValue: "3段階",
      coverBody: "この本はひとつの原則で書かれています。<strong>どこに研究の裏づけがあり、どこが筋の通った推論にすぎず、どこが伝聞なのかを、はっきり書く</strong>。スペシャルティコーヒーには、長く繰り返されるうちに事実のようになった助言が溢れています。本書ではそれをすべて印で示すので、自分がどんな地面に立っているのかが分かります。",
      tierA: ["根拠あり", "公表された研究、または確かな物理・化学の理論がある。"],
      tierB: ["理にかなう", "仕組みは正しいが、対照研究はまだない。"],
      tierC: ["伝聞", "広く繰り返されているが、誰も検証していない。"],
      tierFoot: "最初は足元の地面。二番目は良い仮説。三番目は信念 — なぜそう言われるのかを知るために残しています。",
      start: "読み始める →",
      random: "ランダムに一章を開く",
      pdf: "A5 印刷版（PDF）↓",
      epub: "電子書籍リーダー用 EPUB ↓",
      untranslatedTitle: "この章はまだ翻訳されていません",
      untranslatedBody: "ベトナム語版は完成しています。翻訳は部ごとに順次追加しています。",
      untranslatedCta: "この章をベトナム語で読む",
      untranslatedBadge: "未翻訳"
    }
  };

  var order = ["vi", "en", "ja"];

  function pick() {
    var q = new URLSearchParams(location.search).get("lang");
    if (q && UI[q]) return q;
    try {
      var saved = localStorage.getItem("nuocba.lang");
      if (saved && UI[saved]) return saved;
    } catch (e) {}
    /* đoán theo trình duyệt, nhưng chỉ khi đã có bản dịch */
    var nav = (navigator.language || "").slice(0, 2).toLowerCase();
    if (nav === "ja") return "ja";
    if (nav === "en") return "en";
    return "vi";
  }

  window.BOOK_I18N = {
    langs: order,
    ui: UI,
    lang: pick(),
    /* "07" cho tiếng Việt/Anh, "第7章" cho tiếng Nhật */
    chapterLabel: function (lang, n) {
      var pad = String(n).padStart(2, "0");
      if (lang === "ja") return "第" + n + "章";
      return (lang === "en" ? "Chapter " : "Chương ") + pad;
    },
    partLabel: function (lang, roman) {
      return lang === "ja" ? "第" + roman + "部" : (lang === "en" ? "Part " : "Phần ") + roman;
    }
  };
})();
