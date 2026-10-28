/**
 * Dựng bản EPUB 3 của The Brewing Bible từ cùng nguồn content/part-*.js.
 *
 *   node tools/build-epub.mjs                    → the-brewing-bible.epub
 *   node tools/build-epub.mjs out/ban-doc.epub
 *
 * Không phụ thuộc gói npm nào. Cần `zip` trong PATH (macOS/Linux có sẵn).
 *
 * Cấu trúc sinh ra:
 *   mimetype                     (phải là entry đầu tiên, không nén)
 *   META-INF/container.xml
 *   OEBPS/content.opf            gói EPUB 3
 *   OEBPS/nav.xhtml              mục lục điều hướng (EPUB 3)
 *   OEBPS/toc.ncx                mục lục EPUB 2 cho máy đọc cũ / Kindle
 *   OEBPS/style.css              chép từ epub.css
 *   OEBPS/cover.xhtml
 *   OEBPS/part-01.xhtml …        trang mở đầu mỗi phần
 *   OEBPS/ch-01.xhtml …          một file cho mỗi chương
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync, cpSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

/* ---------- thông tin ấn bản ---------- */
const TITLE = "The Brewing Bible";
const SUBTITLE = "Pour Over & Cupping";
const CREATOR = "Jajajou"; // đổi ở đây nếu muốn tên khác
const LANG = "vi";
const BOOK_ID = "urn:uuid:6f1d3c2a-1c2b-4c3d-9a7e-7b8f1d2e3a4c";
const MODIFIED = "2026-10-28T00:00:00Z";
const DESCRIPTION =
  "Sách thực hành về pour over và cupping: hạt, nước, chiết xuất, kỹ thuật rót, " +
  "đọc bã và chẩn đoán. Mỗi khẳng định được đánh dấu theo ba mức bằng chứng.";

const OUT = resolve(ROOT, process.argv[2] || "the-brewing-bible.epub");
const STAGE = join(ROOT, ".epub-build");
const OEBPS = join(STAGE, "OEBPS");

/* ---------- đọc nội dung ---------- */
function loadParts() {
  const win = {};
  for (let i = 1; i <= 20; i++) {
    const file = join(ROOT, "content", `part-${i}.js`);
    let src;
    try {
      src = readFileSync(file, "utf8");
    } catch {
      break; // hết phần
    }
    new Function("window", src)(win);
  }
  /* hình minh hoạ: cùng một file với bản web, để EPUB không lệch hình */
  try {
    new Function("window", readFileSync(join(ROOT, "figures.js"), "utf8"))(win);
  } catch (err) {
    console.error("Không nạp được figures.js: " + err.message);
  }
  return win;
}

const BOOK = loadParts();
const PARTS = BOOK.BOOK_PARTS || [];
if (!PARTS.length) {
  console.error("Không đọc được content/part-*.js");
  process.exit(1);
}

/* ---------- tiện ích ---------- */
function esc(s) {
  return String(s == null ? "" : s)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

/* Thân bài viết bằng HTML; XML khắt khe hơn HTML ở ba chỗ:
   thẻ rỗng phải tự đóng, và chỉ có 5 entity có sẵn tên. */
function toXhtml(html) {
  return String(html || "")
    .replace(/\u00a0/g, "&#160;")
    /* XML chỉ có 5 entity có sẵn tên; `&nbsp;` là entity HTML, dùng trong
       XHTML là lỗi cú pháp và máy đọc sách có quyền từ chối cả chương. */
    .replace(/&nbsp;/g, "&#160;")
    .replace(/<br\s*\/?>/gi, "<br/>")
    .replace(/<(hr|img|input|col)\b([^>]*?)\s*\/?>/gi, (_, tag, rest) => `<${tag}${rest}/>`);
}

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];
const pad = (n) => String(n).padStart(2, "0");

function page(title, body, cls) {
  return `<?xml version="1.0" encoding="utf-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" xml:lang="${LANG}" lang="${LANG}">
<head>
<meta charset="utf-8"/>
<title>${esc(title)}</title>
<link rel="stylesheet" type="text/css" href="style.css"/>
</head>
<body${cls ? ` class="${cls}"` : ""}>
${body}
</body>
</html>
`;
}

/* ---------- dựng ---------- */
rmSync(STAGE, { recursive: true, force: true });
mkdirSync(join(STAGE, "META-INF"), { recursive: true });
mkdirSync(OEBPS, { recursive: true });

writeFileSync(join(STAGE, "mimetype"), "application/epub+zip");

writeFileSync(
  join(STAGE, "META-INF", "container.xml"),
  `<?xml version="1.0" encoding="utf-8"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
  <rootfiles>
    <rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/>
  </rootfiles>
</container>
`
);

cpSync(join(ROOT, "epub.css"), join(OEBPS, "style.css"));

/* bìa */
writeFileSync(
  join(OEBPS, "cover.xhtml"),
  page(
    TITLE,
    `<section epub:type="cover" class="cover">
  <p class="kicker">Sách thực hành · Pour Over &amp; Cupping</p>
  <h1>The Brewing<br/><em>Bible</em></h1>
  <p class="dek">Những gì thật sự xảy ra khi nước chạm vào bã cà — và cách biến một ly cupping ngon thành một ly pour-over ngon.</p>
  <p class="imprint"><b>${PARTS.filter((p) => !p.appendix).length} phần · ${PARTS.filter((p) => !p.appendix).reduce((n, p) => n + (p.chapters || []).length, 0)} chương</b><br/>
  Mỗi khẳng định được đánh dấu theo ba mức bằng chứng: có nghiên cứu · hợp lý nhưng chưa kiểm chứng · truyền miệng.</p>
</section>`,
    "coverpage"
  )
);

const manifest = [];
const spine = [];
const navParts = [];
const ncxPoints = [];
let counter = 0;
let acounter = 0;

PARTS.forEach((part, pi) => {
  const chs = part.chapters || [];
  if (!chs.length) return;

  const roman = part.roman || ROMAN[pi];
  const partFile = `part-${pad(pi + 1)}.xhtml`;

  writeFileSync(
    join(OEBPS, partFile),
    page(
      part.title,
      `<section epub:type="part" class="part">
  <p class="num">${part.appendix ? "Phụ lục" : "Phần " + esc(roman)}</p>
  <h1>${esc(part.title)}</h1>
  ${part.blurb ? `<p class="blurb">${esc(part.blurb)}</p>` : ""}
</section>`
    )
  );
  manifest.push(`<item id="part-${pi + 1}" href="${partFile}" media-type="application/xhtml+xml"/>`);
  spine.push(`<itemref idref="part-${pi + 1}"/>`);

  /* nav và ncx dùng CHUNG mảng children — chỉ đẩy mỗi chương một lần vào đó,
     nếu đẩy riêng cho từng bên thì mục lục bị nhân đôi. */
  const partLabel = `${part.appendix ? "Phụ lục" : "Phần " + roman} · ${part.title}`;
  const partNav = { label: partLabel, href: partFile, children: [] };
  navParts.push(partNav);
  ncxPoints.push({
    label: partLabel,
    src: partFile,
    children: partNav.children,
  });

  chs.forEach((ch) => {
    const n = ++counter;
    const file = `ch-${pad(n)}.xhtml`;
    /* phụ lục đánh riêng A1, A2… — n không bị dùng làm số chương */
    const chNum = part.appendix ? `A${++acounter}` : pad(n);

    const body = `<section epub:type="chapter" class="chapter">
<p class="chnum">${part.appendix ? "Phụ lục " : "Chương "}${chNum}</p>
<h1>${esc(ch.title)}</h1>
${ch.lede ? `<p class="lede">${esc(ch.lede)}</p>` : ""}
${toXhtml(BOOK.BOOK_FIGURES ? BOOK.BOOK_FIGURES.render(ch.body, ch.id) : ch.body)}
</section>`;

    writeFileSync(join(OEBPS, file), page(`${ch.title} — ${TITLE}`, body));
    manifest.push(`<item id="ch-${n}" href="${file}" media-type="application/xhtml+xml"/>`);
    spine.push(`<itemref idref="ch-${n}"/>`);

    const label = `${chNum}. ${ch.title}`;
    partNav.children.push({ label, href: file });
  });
});

/* mục lục điều hướng */
const navList = navParts
  .map(
    (p) => `      <li><a href="${p.href}">${esc(p.label)}</a>
        <ol>
${p.children.map((c) => `          <li><a href="${c.href}">${esc(c.label)}</a></li>`).join("\n")}
        </ol>
      </li>`
  )
  .join("\n");

writeFileSync(
  join(OEBPS, "nav.xhtml"),
  page(
    "Mục lục",
    `<nav epub:type="toc" id="toc">
    <h1>Mục lục</h1>
    <ol>
${navList}
    </ol>
  </nav>
  <nav epub:type="landmarks" id="landmarks" hidden="">
    <ol>
      <li><a epub:type="cover" href="cover.xhtml">Bìa</a></li>
      <li><a epub:type="bodymatter" href="part-${pad(1)}.xhtml">Bắt đầu</a></li>
    </ol>
  </nav>`
  )
);

/* mục lục EPUB 2 (Kindle và máy đọc cũ dùng file này) */
let playOrder = 0;
function ncxTree(nodes, depth) {
  return nodes
    .map((node) => {
      /* Giữ số của nút cha TRƯỚC khi đệ quy: nếu đọc playOrder sau khi
         dựng con thì cha bị đánh số sau con, id trùng và navMap sai thứ tự. */
      const self = ++playOrder;
      const kids =
        node.children && node.children.length
          ? "\n" + ncxTree(node.children, depth + 1)
          : "";
      return `    <navPoint id="np-${self}" playOrder="${self}">
      <navLabel><text>${esc(node.label)}</text></navLabel>
      <content src="${node.src || node.href}"/>${kids}
    </navPoint>`;
    })
    .join("\n");
}

writeFileSync(
  join(OEBPS, "toc.ncx"),
  `<?xml version="1.0" encoding="utf-8"?>
<ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1" xml:lang="${LANG}">
  <head>
    <meta name="dtb:uid" content="${BOOK_ID}"/>
    <meta name="dtb:depth" content="2"/>
    <meta name="dtb:totalPageCount" content="0"/>
    <meta name="dtb:maxPageNumber" content="0"/>
  </head>
  <docTitle><text>${esc(TITLE)}</text></docTitle>
  <docAuthor><text>${esc(CREATOR)}</text></docAuthor>
  <navMap>
${ncxTree(ncxPoints, 0)}
  </navMap>
</ncx>
`
);

/* gói */
writeFileSync(
  join(OEBPS, "content.opf"),
  `<?xml version="1.0" encoding="utf-8"?>
<package xmlns="http://www.idpf.org/2007/opf" version="3.0" unique-identifier="pub-id" xml:lang="${LANG}">
  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
    <dc:identifier id="pub-id">${BOOK_ID}</dc:identifier>
    <dc:title id="title">${esc(TITLE)}</dc:title>
    <dc:title id="subtitle">${esc(SUBTITLE)}</dc:title>
    <dc:creator>${esc(CREATOR)}</dc:creator>
    <dc:language>${LANG}</dc:language>
    <dc:date>2026-10-28</dc:date>
    <dc:description>${esc(DESCRIPTION)}</dc:description>
    <meta property="dcterms:modified">${MODIFIED}</meta>
    <meta refines="#title" property="title-type">main</meta>
    <meta refines="#subtitle" property="title-type">subtitle</meta>
  </metadata>
  <manifest>
    <item id="nav" href="nav.xhtml" media-type="application/xhtml+xml" properties="nav"/>
    <item id="ncx" href="toc.ncx" media-type="application/x-dtbncx+xml"/>
    <item id="css" href="style.css" media-type="text/css"/>
    <item id="cover" href="cover.xhtml" media-type="application/xhtml+xml"/>
${manifest.map((m) => "    " + m).join("\n")}
  </manifest>
  <spine toc="ncx">
    <itemref idref="cover"/>
${spine.map((s) => "    " + s).join("\n")}
  </spine>
</package>
`
);

/* zip: mimetype phải đứng đầu và không nén */
const zipArgs = { stdio: ["ignore", "pipe", "pipe"], cwd: STAGE };
try {
  execFileSync("zip", ["-X0", OUT, "mimetype"], zipArgs);
  execFileSync("zip", ["-Xr9D", OUT, "META-INF", "OEBPS"], zipArgs);
} catch (err) {
  console.error("zip lỗi:", err.message);
  process.exit(1);
}

rmSync(STAGE, { recursive: true, force: true });
const mainParts = PARTS.filter((p) => !p.appendix);
console.log(
  `✓ ${OUT}  ·  ${mainParts.length} phần + phụ lục  ·  ${mainParts.reduce((n, p) => n + (p.chapters || []).length, 0)} chương`
);
