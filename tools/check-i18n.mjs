/**
 * Kiểm tra bản dịch so với bản gốc tiếng Việt.
 *
 *   node tools/check-i18n.mjs            → kiểm cả en và ja
 *   node tools/check-i18n.mjs en         → chỉ một ngôn ngữ
 *
 * Bắt đúng loại lỗi nguy hiểm nhất của việc dịch: âm thầm bỏ mất một hàng
 * bảng, một gạch đầu dòng, hay một đoạn văn. Không đánh giá văn phong.
 */
import { readFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

function loadParts() {
  const win = {};
  for (let i = 1; i <= 20; i++) {
    const f = join(ROOT, "content", `part-${i}.js`);
    if (!existsSync(f)) break;
    new Function("window", readFileSync(f, "utf8"))(win);
  }
  return win.BOOK_PARTS || [];
}

function loadOverlay(lang) {
  const f = join(ROOT, "content", lang, "text.js");
  if (!existsSync(f)) return null;
  const win = {};
  new Function("window", readFileSync(f, "utf8"))(win);
  return win.BOOK_TEXT || null;
}

/* đếm cấu trúc trong một khối HTML */
function shape(html) {
  const h = String(html || "");
  const count = (re) => (h.match(re) || []).length;
  const text = h
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return {
    tables: count(/<table/g),
    rows: count(/<tr/g),
    listItems: count(/<li/g),
    bold: count(/<strong/g),
    paras: count(/<p[\s>]/g),
    callouts: count(/class="callout/g),
    headings: count(/<h3/g),
    chars: text.length,
  };
}

const PARTS = loadParts();
if (!PARTS.length) {
  console.error("Không đọc được content/part-*.js");
  process.exit(1);
}

const src = {};
for (const part of PARTS) {
  for (const ch of part.chapters || []) src[ch.id] = ch;
}
const TOTAL = Object.keys(src).length;

const langs = process.argv[2] ? [process.argv[2]] : ["en", "ja"];
let failed = false;

for (const lang of langs) {
  const t = loadOverlay(lang);
  if (!t) {
    console.log(`\n${lang}: chưa có content/${lang}/text.js`);
    continue;
  }

  const chs = t.chapters || {};
  const missingTitle = [];
  const withBody = [];
  const problems = [];

  for (const id of Object.keys(src)) {
    const tr = chs[id];
    if (!tr || !tr.title) { missingTitle.push(id); continue; }
    if (!tr.body || !tr.body.trim()) continue;
    withBody.push(id);

    const a = shape(src[id].body);
    const b = shape(tr.body);

    for (const key of ["tables", "rows", "listItems", "bold", "paras", "callouts", "headings"]) {
      if (a[key] !== b[key]) {
        problems.push(`${id}: ${key} ${a[key]} → ${b[key]}`);
      }
    }

    /* Tiếng Nhật dùng ít ký tự hơn hẳn tiếng Việt cho cùng một nội dung
       (khoảng 40–50%), nên biên độ phải rộng và thấp hơn. */
    const lo = lang === "ja" ? 0.35 : 0.75;
    const hi = lang === "ja" ? 1.10 : 1.35;
    const ratio = b.chars / a.chars;
    if (ratio < lo || ratio > hi) {
      problems.push(
        `${id}: độ dài ${Math.round(ratio * 100)}% (ngoài ${Math.round(lo * 100)}–${Math.round(hi * 100)}%)`
      );
    }
  }

  console.log(`\n${lang.toUpperCase()}: ${withBody.length}/${TOTAL} chương có thân bài, ` +
              `${TOTAL - missingTitle.length}/${TOTAL} chương có tiêu đề`);

  if (missingTitle.length) {
    console.log(`  thiếu tiêu đề: ${missingTitle.join(", ")}`);
    failed = true;
  }
  if (problems.length) {
    console.log("  lệch cấu trúc:");
    problems.forEach((p) => console.log("   - " + p));
    failed = true;
  }
  if (!problems.length && !missingTitle.length) {
    console.log("  cấu trúc khớp bản gốc");
  }
}

if (failed) process.exit(1);
