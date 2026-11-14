/* Rút "text đọc được" từ thân bài HTML, và chuẩn hoá cho TTS tiếng Việt.
   Dùng chung cho tools/build-audio.mjs và tools/check-audio.mjs.

   Vì sao cần lớp này: sea-g2p (bộ chuẩn hoá của VieNeu) đọc "1:16" thành
   "một giờ mười sáu phút" — đo được trên cả 3 giọng. Sách dùng tỉ lệ pha ở
   gần như mọi chương, nên lỗi đó sai đúng chỗ cốt lõi nhất.

   Chủ ý: KHÔNG đổi số thành chữ. sea-g2p đọc "18 đến 22 phần trăm" đúng
   (đã đo qua ASR). Nó chỉ sai ở ký hiệu — dấu hai chấm, µm, °C. Sửa ký
   hiệu thì đủ, và ít chỗ sai hơn hẳn so với tự viết bộ số-thành-chữ. */

/* ---------- 1. tách text đọc được ---------- */

/* Khối không đọc thành tiếng được. Mỗi khối phải tự khai câu đọc qua
   data-audio="…"; không khai thì bỏ hẳn, không đọc bừa nội dung bảng. */
const OPAQUE = ["table-wrap", "stat-grid", "formula", "recipe"];

function stripTags(s) {
  return s
    .replace(/<[^>]*>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#8217;|&rsquo;/g, "’")
    .replace(/&[a-z]+;|&#\d+;/g, " ");
}

/* Cắt một <div class="x …"> … </div> cân bằng thẻ, trả [trước, trong, sau].
   Regex không đếm được thẻ lồng nhau (stat-grid chứa div.stat), nên đếm tay. */
function cutBlock(html, cls) {
  const open = new RegExp('<div class="' + cls + '(?:[^"]*)"[^>]*>', "i");
  const m = open.exec(html);
  if (!m) return null;

  const start = m.index;
  let depth = 1;
  const re = /<\/?div\b[^>]*>/gi;
  re.lastIndex = m.index + m[0].length;
  let t;
  while ((t = re.exec(html))) {
    depth += t[0].startsWith("</") ? -1 : 1;
    if (depth === 0) {
      return [html.slice(0, start), html.slice(start, re.lastIndex), html.slice(re.lastIndex)];
    }
  }
  return [html.slice(0, start), html.slice(start), ""]; // thẻ không đóng
}

/* Bảng trần, không nằm trong .table-wrap — ba bảng phụ lục nguồn. Cùng một
   quy tắc với các khối trên: có data-audio thì đọc câu đã khai, không thì
   bỏ. Bỏ hẳn là đúng: mười lăm dòng toàn số hiệu nguồn, đọc lên không ai
   theo được, mà cũng không phải nội dung của sách.

   Trước khi có hàm này, ba bảng đó bị stripTags đọc thành
   "Ch. Nguồn 1 [15] [16]" — hỏng âm thầm, vì build không báo gì. */
function cutBareTables(html, skipped) {
  const OPEN = /<table\b[^>]*>/i;
  for (;;) {
    const m = OPEN.exec(html);
    if (!m) return html;
    const end = html.toLowerCase().indexOf("</table>", m.index);
    if (end < 0) return html;
    const block = html.slice(m.index, end + 8);
    const say = /data-audio="([^"]*)"/.exec(block);
    if (say && say[1].trim()) {
      html = html.slice(0, m.index) + " <p>" + say[1] + "</p> " + html.slice(end + 8);
    } else {
      skipped.push("table");
      html = html.slice(0, m.index) + " " + html.slice(end + 8);
    }
  }
}

/* Tách khối đúc kết (div.pull) ra khỏi dòng chảy. Mỗi khối được đọc bằng
   một giọng khác (Thiện Minh) và có 1,1 s lặng hai bên — mà thứ tự trong
   audio thì vẫn phải đúng chỗ. Nên nó không thể chỉ là một đoạn trong text:
   nó phải là một *mốc* để build-audio chen giọng khác vào.

   Cách làm: rút khối ra, để lại @@PULL0@@ ngay chỗ đó, rồi cắt text theo
   mốc ấy ở cuối. Khối pull chỉ chứa chữ và <em>/<br> nên stripTags là đủ. */
function extractPulls(html) {
  const pulls = [];
  for (;;) {
    const cut = cutBlock(html, "pull");
    if (!cut) return { html, pulls };
    const [before, block, after] = cut;
    const inner = block.slice(block.indexOf(">") + 1).replace(/<\/div>\s*$/, "");
    pulls.push(inner);
    html = before + "\n\n@@PULL" + (pulls.length - 1) + "@@\n\n" + after;
  }
}

/* Callout: tiêu đề là nửa đầu của một câu thì phải nối, không được ngắt
   đoạn. "Nếu bạn chỉ có một thứ." + xuống đoạn + "Mua cân." nghe như hai
   câu lệnh rời, và cái điều kiện treo lơ lửng. VOICE.md mục 3.1: mệnh đề
   điều kiện nối bằng "thì"; câu hỏi giữ nguyên rồi mới trả lời; còn lại
   là thẻ thì nối bằng dấu hai chấm, cùng một đoạn. */
const CONDITIONAL = /^(Nếu|Khi|Muốn|Hễ|Với)\b/i;

function lowerFirst(s) {
  /* bỏ qua thẻ mở đầu để hạ đúng chữ cái đầu tiên */
  return s.replace(/^(\s*(?:<[^>]+>\s*)*)(\p{L})/u,
    (_, pre, c) => pre + c.toLocaleLowerCase("vi"));
}

function calloutBlock(block) {
  const inner = block.slice(block.indexOf(">") + 1).replace(/<\/div>\s*$/, "");
  const m = /<p class="callout-title">([\s\S]*?)<\/p>\s*/.exec(inner);
  /* Không có tiêu đề (3 khung không màu thì vẫn có, nhưng đừng tin): bỏ
     luôn lớp div. Trả nguyên `block` thì vòng lặp ở speakable gặp lại đúng
     khối đó và chạy mãi — treo build, không báo lỗi. */
  if (!m) return inner;

  const title = stripTags(m[1]).replace(/\s+/g, " ").trim();
  const rest = inner.slice(0, m.index) + inner.slice(m.index + m[0].length);

  /* câu hỏi: giữ tiêu đề thành câu riêng, thân là câu trả lời */
  if (/\?$/.test(title)) return '<p>' + title + "</p>" + rest;

  /* mệnh đề điều kiện: nối bằng "thì", hạ chữ đầu vế sau */
  if (CONDITIONAL.test(title)) {
    const first = /^\s*<p[^>]*>([\s\S]*?)<\/p>\s*/.exec(rest);
    if (first) {
      return "<p>" + title + " thì " + lowerFirst(first[1]) + "</p>" +
        rest.slice(first[0].length);
    }
  }

  /* thẻ: nối bằng dấu hai chấm, cùng một đoạn — không ngắt giữa nhãn và thân */
  const p = /^\s*<p[^>]*>([\s\S]*?)<\/p>\s*/.exec(rest);
  if (p) return "<p>" + title + ": " + p[1] + "</p>" + rest.slice(p[0].length);
  return '<p>' + title + ":</p>" + rest;
}

/* Trả { text, skipped, segments } — skipped là các khối bị bỏ vì chưa có
   data-audio, để build-audio báo cho người viết biết chỗ nào còn thiếu.
   segments giữ ranh giới thân bài / câu đúc kết để build-audio đổi giọng;
   text là bản phẳng của chúng, dùng cho hash và cho check-audio. */
export function speakable(body) {
  let html = body;
  const skipped = [];

  /* Khối pull rút trước mọi bước khác: nó là mốc, không phải đoạn văn. */
  const extracted = extractPulls(html);
  html = extracted.html;
  const pulls = extracted.pulls;

  for (const cls of OPAQUE) {
    for (;;) {
      const cut = cutBlock(html, cls);
      if (!cut) break;
      const [before, block, after] = cut;
      const say = /data-audio="([^"]*)"/.exec(block);
      if (say && say[1].trim()) {
        html = before + " <p>" + say[1] + "</p> " + after;
      } else {
        skipped.push(cls);
        html = before + " " + after;
      }
    }
  }

  /* <table> trần còn sót, không bọc .table-wrap (3 bảng ở phụ lục part-9).
     Chạy SAU vòng OPAQUE để bảng trong .table-wrap không bị đếm hai lần.
     Không bỏ thì stripTags đọc tuột từng ô: "Ch. Nguồn 1 [15] [16]…" */
  html = html.replace(/<table[\s\S]*?<\/table>/gi, (t) => {
    const say = /data-audio="([^"]*)"/.exec(t);
    if (say && say[1].trim()) return " <p>" + say[1] + "</p> ";
    skipped.push("table");
    return " ";
  });

  html = cutBareTables(html, skipped);

  /* Callout: nối tiêu đề với thân theo loại tiêu đề (xem calloutBlock). */
  for (let guard = 0; ; guard++) {
    const cut = cutBlock(html, "callout");
    if (!cut) break;
    if (guard > 500) throw new Error("callout: vòng lặp không thoát");
    html = cut[0] + calloutBlock(cut[1]) + cut[2];
  }

  /* Badge mức bằng chứng: nhãn phân loại, chen giữa câu ngay trước dấu
     chấm. Đọc ra là "…đáng kể Bằng chứng ." — câu bị chặt làm đôi đúng
     lúc sắp hết. Bỏ (VOICE.md 3.4, lựa chọn 1). */
  html = html.replace(/<span class="tier[^"]*">[\s\S]*?<\/span>/g, "");

  /* Mỗi khối thành một đoạn riêng: TTS tự chia chunk theo đoạn, và chỗ
     ngắt đoạn cho khoảng lặng tự nhiên hơn chỗ ngắt giữa câu. */
  const flat = stripTags(
    html.replace(/<\/(p|h2|h3|h4|li|blockquote)>/g, "</$1>\n\n")
  )
    .replace(/[ \t ]+/g, " ")
    .split("\n")
    .map((l) => l.trim())
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();

  /* Cắt lại theo mốc pull. Đoạn thân giữa hai mốc là một segment; khối
     pull là segment khác, để build-audio đổi giọng đúng chỗ. */
  const segments = [];
  flat.split(/@@PULL(\d+)@@/).forEach((part, i) => {
    if (i % 2 === 0) {
      /* giữ \n\n bên trong: đó là chỗ TTS chèn 0,7 s lặng. Chỉ dọn
         khoảng trắng trong dòng và cắt hai đầu. */
      const t = part.replace(/[ \t]+/g, " ").replace(/\n{3,}/g, "\n\n").trim();
      /* nhiều khối pull liền nhau có thể để lại đoạn rỗng ở giữa */
      if (t) segments.push({ kind: "body", text: t });
      return;
    }
    const t = stripTags(pulls[Number(part)] || "").replace(/\s+/g, " ").trim();
    if (t) segments.push({ kind: "pull", text: t });
  });

  const text = segments.map((s) => s.text).join("\n\n");
  return { text, skipped, segments };
}

/* ---------- 2. chuẩn hoá cho TTS ---------- */

/* Thuật ngữ đọc sai, đo được qua ASR trên audio thật. Khoá có \b nên chỉ
   khớp trọn từ — "EY" không chạm vào "KEY". */
const TERMS = [
  /* "EY" ra "EA"/"EI"/"AI" ở 3/4 giọng; chỉ Mai Anh đọc đúng. Tách chữ
     cái thì mọi giọng đều đọc đúng. */
  [/\bEY\b/g, "i-oai"],
  [/\bTDS\b/g, "ti-đi-ét"],
  [/\bEBF\b/g, "i-bi-ép"],
  [/\bSCA\b/g, "ét-xi-ây"],
  [/\bWBrC\b/g, "vê-bi-a-xi"],
  [/\bTWW\b/g, "ti-vê-kép-vê-kép"],
  [/\bpH\b/g, "pê-hát"],
];

/* Không phiên âm tay từ tiếng Anh. Bộ G2P của VieNeu (SEA-G2P) đọc thẳng
   sang IPA tiếng Anh: "extraction yield" -> ɛkstɹˈækʃən jˈiːld, "pour over"
   -> pˈɔːɹ ˈoʊvɚ. Viết theo âm Việt ("po ô-vơ", "phai-nờ") thì IPA thành
   pˈɔ ˈo vˈəː — hai tiếng Việt rời, tệ hơn hẳn.

   Đo trên đúng ba giọng đã chốt, cùng một câu, so bằng ASR (tỉ lệ từ khớp):
     nguyên bản  Mai Anh 0,737 · Thiền Tâm Đức 0,757
     phiên âm tay Mai Anh 0,571 · Thiền Tâm Đức 0,591
   ASR nghe "pour over" nguyên bản ra "por over", còn bản phiên âm ra
   "to over"/"for over". Ngược hẳn với phỏng đoán ban đầu trong HANDOFF-AUDIO.

   Chữ viết tắt thì vẫn giữ: G2P đọc "EY" thành ˈaɪ và model hay nhả thành
   "ai" mất âm cuối; "i-oai" (ˈi wˈaːj) thì ASR nghe lại đúng là "EY". */

export function normalize(text) {
  let s = text;

  /* --- thứ tự quan trọng: luật hẹp chạy trước luật rộng --- */

  /* 1. Tỉ lệ pha "1:16" -> "1 trên 16".
     Lỗi gốc: sea-g2p đọc "1:16" thành "một giờ mười sáu phút".

     Phân biệt với mốc thời gian là chỗ khó: "1:15" là tỉ lệ nhưng "1:30"
     là phút — cùng cú pháp, cùng độ dài. Luật dùng khoảng giá trị, đúng
     với toàn bộ sách: tỉ lệ pha luôn là "1:" + số 10–20 (sách dùng 1:13
     tới 1:18), hoặc có phần thập phân (1:13,3). Mọi mẫu N:NN còn lại là
     thời gian rót (0:00 … 8:00, trong đó 1:30, 1:35, 1:45 phần sau > 20). */
  s = s.replace(/\b1\s*:\s*(1\d|20)(,\d+)?\b/g,
    (_, n, frac) => "1 trên " + n + (frac || ""));
  s = s.replace(/\b1\s*:\s*(\d+,\d+)\b/g, "1 trên $1");

  /* 2. Tên phương pháp "4:6" (Kasuya) — tỉ lệ chia nước, không phải thời
     gian. Đọc "bốn sáu" như người trong ngành gọi. */
  s = s.replace(/\b4\s*:\s*6\b/g, "bốn sáu");

  /* 3. Thời gian rót "2:30" -> "2 phút 30", "3:00" -> "3 phút" */
  s = s.replace(/\b(\d{1,2}):(\d{2})\b/g, (all, mm, ss) => {
    if (Number(ss) >= 60) return all;
    return mm + " phút" + (Number(ss) ? " " + Number(ss) : "");
  });

  /* 4. Đơn vị ký hiệu. Chạy TRƯỚC dải số: "18–22%" phải thành
     "18 đến 22 phần trăm", nên % cần là chữ khi còn thấy chữ số. */
  s = s.replace(/\s*[µμ]m\b/g, " mi-crô-mét");
  s = s.replace(/\s*°\s*C\b/g, " độ C");
  s = s.replace(/\s*°\s*F\b/g, " độ F");
  /* luỹ thừa âm: 10⁻¹³ -> "10 lũy thừa trừ 13" (chỉ có trong phụ lục) */
  s = s.replace(/10(⁻[⁰¹²³⁴⁵⁶⁷⁸⁹]+)/g, (_, sup) => {
    const map = { "⁰": 0, "¹": 1, "²": 2, "³": 3, "⁴": 4, "⁵": 5, "⁶": 6, "⁷": 7, "⁸": 8, "⁹": 9 };
    const n = sup.slice(1).split("").map((c) => map[c]).join("");
    return "10 lũy thừa trừ " + n;
  });
  s = s.replace(/\bmg\/L\b/g, "mi-li-gam trên lít");
  s = s.replace(/\bg\/100\s*ml\b/g, "gam trên 100 mi-li-lít");
  s = s.replace(/\bppm\b/g, "pi-pi-em");
  s = s.replace(/(\d)\s*%/g, "$1 phần trăm");

  /* 5. Dải số "18 đến 22": dấu – giữa hai số đọc là "đến". Để nguyên thì
     giọng lướt qua, nghe như một số duy nhất. */
  s = s.replace(/(\d(?:[\d,]*\d)?)\s*[–—-]\s*(\d)/g, "$1 đến $2");

  /* 5b. Dải thời gian "7 phút–8 phút" — bước 3 đã chèn chữ "phút" vào
     giữa, nên dấu – không còn nằm cạnh chữ số để luật trên bắt. */
  s = s.replace(/(\d+ phút(?: \d+)?)\s*[–—]\s*(\d)/g, "$1 đến $2");

  /* 6. Dải số hiệu nguồn "[41]–[54]" -> "41 đến 54" (chỉ ở phụ lục).
     Luật này đi TRƯỚC luật bỏ trích dẫn, vì nó là một câu nói thật về
     khoảng nguồn 41–54, không phải một nhãn để bỏ. */
  s = s.replace(/\[(\d+)\]\s*[–—-]\s*\[(\d+)\]/g, "$1 đến $2");

  /* 6b. Trích dẫn đơn "[24]", "([24])" — bỏ. Tai nghe không tra được
     nguồn số 24, đọc lên chỉ là tiếng động chen giữa câu. "(xem chương
     17)" cũng bỏ: bản nghe tuần tự không lùi được, chỉ đường là vô nghĩa. */
  s = s.replace(/\s*\(\s*\[\d+\]\s*\)/g, "");
  s = s.replace(/[ \t]*\[\d+\]/g, "");
  s = s.replace(/[ \t]*\((?:xem|Xem)\s[^)]*\)/g, "");

  /* 7. Công thức hoá học: chỉ số dưới và dấu điện tích không đọc ra tiếng.
     Sách chỉ dùng vài ion trong phần nước, nên tra bảng là đủ. */
  s = s.replace(/HCO₃⁻?/g, "bi-cac-bô-nát");
  s = s.replace(/CaCO₃/g, "can-xi cac-bô-nát");
  s = s.replace(/CO₃²⁻/g, "cac-bô-nát");
  s = s.replace(/Ca²⁺/g, "can-xi");
  s = s.replace(/Mg²⁺/g, "ma-giê");
  s = s.replace(/CO₂/g, "CO hai");
  s = s.replace(/\bm²/g, "mét vuông");
  s = s.replace(/\bm³/g, "mét khối");

  /* 8. Thuật ngữ */
  for (const [re, to] of TERMS) s = s.replace(re, to);

  /* 9. Ký hiệu toán còn sót. Đọc nguyên là máy đọc "bằng", "nhân"… sai
     hoặc bỏ qua. Đây là những chỗ đo được trong bản chuẩn hoá ngày
     30.10.2026; không phải suy đoán. */
  /* [ \t] chứ không \s: một ký hiệu đứng đầu dòng không được nuốt luôn
     dấu ngắt đoạn — mất \n\n là mất 0,7 s lặng giữa hai đoạn. */
  s = s.replace(/[ \t]*≈[ \t]*/g, " khoảng ");
  s = s.replace(/[ \t]*~[ \t]*(?=\d)/g, "khoảng ");
  s = s.replace(/[ \t]*×[ \t]*/g, " nhân ");
  s = s.replace(/[ \t]*±[ \t]*/g, " cộng trừ ");
  /* "+" trong sách luôn là "và": "Cân + một cuốn sổ", "canxi + magiê".
     Đọc "cộng" thì nghe như phép tính, đọc "và" thì nghe như một bộ đồ
     nghề (VOICE.md mục 4). */
  s = s.replace(/[ \t]*\+[ \t]*/g, " và ");
  s = s.replace(/[ \t]*=[ \t]*/g, " bằng ");
  s = s.replace(/[ \t]*→[ \t]*/g, " rồi ");
  /* "D90 − D10": vế phải là chữ D chứ không phải chữ số. */
  s = s.replace(/(\d)[ \t]*−[ \t]*(D?\d)/g, "$1 trừ $2");
  s = s.replace(/[ \t]*·[ \t]*/g, ", ");
  s = s.replace(/^[ \t]*\*[ \t]+/gm, "");

  /* 10. Dấu câu TTS đọc không ra tiếng. En dash giữa câu thành dấu phẩy
     (cho nhịp nghỉ). Dấu – dính liền hai chữ ("trung–đậm", "duo–trio")
     thành dấu phẩy nhẹ: không có khoảng trắng nên luật trên không bắt. */
  s = s.replace(/\s+[–—]\s+/g, ", ");
  s = s.replace(/(\p{L})[–—](\p{L})/gu, "$1, $2");
  s = s.replace(/[“”]/g, '"').replace(/[‘’]/g, "'");

  /* 11. Dọn dấu câu mồ côi do bỏ badge / trích dẫn / chỉ đường: không để
     lại " ." hay ", ," — TTS đọc khoảng trắng trước dấu chấm thành một
     nhịp nghỉ sai chỗ. */
  s = s.replace(/[ \t]+([.,;:!?])/g, "$1");
  s = s.replace(/,\s*(?=[.,;:!?])/g, "");
  s = s.replace(/[ \t]{2,}/g, " ").replace(/ ?\n ?/g, "\n").trim();

  return s;
}

/* Một bước, dùng cho build: HTML -> text đã chuẩn hoá.
   segments là text đã chuẩn hoá theo từng khối, giữ nguyên ranh giới
   thân bài / câu đúc kết — build-audio cần ranh giới đó để đổi giọng. */
export function prepare(body) {
  const { text, skipped, segments } = speakable(body);
  return {
    text: normalize(text),
    skipped,
    segments: segments.map((s) => ({ kind: s.kind, text: normalize(s.text) })),
  };
}
