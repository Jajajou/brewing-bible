#!/usr/bin/env node
// Tự kiểm bản in A5 sau khi dựng.
//
//   node tools/check-pdf.mjs                 → kiểm the-brewing-bible.pdf
//   node tools/check-pdf.mjs out/ban-in.pdf
//
// Ba thứ mà mắt thường bỏ qua nhưng làm hỏng một cuốn sách:
//
//   1. Trang trắng ngoài dự kiến. Sách có 9 phần, mỗi phần mở ở trang lẻ
//      (break-before: right), nên luôn có vài trang trắng chèn vào. Trang
//      trắng ở chỗ khác nghĩa là một khối nội dung bị đẩy đi hoặc bị nuốt.
//   2. Đoạn văn mất chữ. Paged.js cắt phần tràn khi một khối không chia
//      trang được — không báo lỗi, chỉ lặng lẽ thiếu. Ta so từng đoạn trong
//      content/part-*.js với văn bản rút ra từ PDF.
//   3. Font chưa nhúng. Máy khác mở sẽ thay font, dàn trang lệch hết.
//
// Cần poppler-utils (pdftotext, pdfinfo, pdffonts) — có sẵn trên macOS khi
// cài poppler, hoặc apt install poppler-utils.

import { readFileSync, readdirSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const pdf = resolve(ROOT, process.argv[2] || "the-brewing-bible.pdf");

const run = (cmd, args, opts = {}) =>
  execFileSync(cmd, args, { encoding: "utf8", maxBuffer: 1 << 28, ...opts });

let failed = 0;
const fail = (msg) => { console.log(`  ✗ ${msg}`); failed++; };
const ok = (msg) => console.log(`  ✓ ${msg}`);

/* ---------- đọc PDF ---------- */

const pages = Number(run("pdfinfo", [pdf]).match(/^Pages:\s+(\d+)/m)?.[1] || 0);
if (!pages) {
  console.error("Không đọc được số trang. Có phải file PDF?");
  process.exit(1);
}

/* KHÔNG dùng -layout: chế độ đó giữ cột nên chữ của ô bên cạnh bị chèn vào
   giữa câu của ô này, làm phép so báo thiếu dù chữ vẫn đủ. Chế độ mặc định
   đọc theo thứ tự đọc, đúng thứ tự một người đọc. */
const raw = run("pdftotext", [pdf, "-"]);
// \f ngăn cách các trang
const pageText = raw.split("\f");
const charCount = pageText.map((p) => p.replace(/\s+/g, "").length);

/* ---------- 1. trang trắng ---------- */

console.log(`\n1. Trang trắng — ${pages} trang`);

const blank = [];
charCount.forEach((n, i) => {
  if (i < pages && n === 0) blank.push(i + 1);
});

// trang mở phần: trang lẻ có rất ít chữ (số phần + tên phần)
const opener = [];
charCount.forEach((n, i) => {
  if (i < pages && n > 0 && n < 200) opener.push(i + 1);
});

const strayBlank = blank.filter((p) => !opener.includes(p + 1));
if (strayBlank.length) {
  fail(`${strayBlank.length} trang trắng không nằm ngay trước trang mở phần: ${strayBlank.join(", ")}`);
} else {
  ok(`${blank.length} trang trắng, tất cả là trang chèn để phần mới mở ở trang lẻ`);
}
if (opener.length) ok(`${opener.length} trang mở phần (${opener.join(", ")})`);

/* ---------- 2. mất chữ ---------- */

console.log("\n2. Đoạn văn bị cắt");

const norm = (s) => s.replace(/[\s\u00a0]+/g, " ").trim();
const fromHtml = (s) =>
  norm(
    s
      .replace(/<[^>]{1,400}>/g, " ")
      .replace(/&nbsp;/g, " ")
      .replace(/&amp;/g, "&")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .replace(/&quot;/g, '"')
      .replace(/&#8217;|&rsquo;/g, "\u2019")
  );
/* So theo chuỗi ký tự đã bỏ hết khoảng trắng và dấu câu, không so theo từ.
   Lý do: Chrome giãn chữ ở nhãn nhỏ (letter-spacing) làm pdftotext chèn dấu
   cách giữa từng ký tự, và ký hiệu trên (²⁺, ⁻) bị tách thành run riêng — so
   theo từ sẽ báo động giả cho mọi ô bảng có hoá học. Bỏ khoảng trắng ở cả
   hai phía thì cả hai nhiễu đó biến mất, còn đoạn bị cắt mất vẫn ra 0%. */
const squash = (s) => s.toLowerCase().normalize("NFC").replace(/[^\p{L}\p{N}]/gu, "");

/* N = 20: đo được là câu vắng mặt cho 0% còn đoạn có mặt cho 100%, nên
   ngưỡng 90% tách sạch hai trường hợp. Ngắn hơn (12) thì câu vắng mặt vẫn
   được 14–23% nhờ trùng ngẫu nhiên, không dùng được. */
const N = 20;
const pdfChunks = new Set();
{
  const s = squash(raw);
  for (let i = 0; i + N <= s.length; i++) pdfChunks.add(s.slice(i, i + N));
}const files = readdirSync(resolve(ROOT, "content")).filter((f) => /^part-\d+\.js$/.test(f)).sort();
const lost = [];
const weak = [];
let checked = 0;

for (const f of files) {
  const src = readFileSync(resolve(ROOT, "content", f), "utf8");
  const blocks = [...src.matchAll(/<(p|li|blockquote|figcaption|td|th)\b[^>]*>([\s\S]*?)<\/\1>/g)];
  for (const m of blocks) {
    const s = squash(fromHtml(m[2]));
    if (s.length < 60) continue;
    checked++;
    let hit = 0;
    let total = 0;
    for (let i = 0; i + N <= s.length; i++) {
      total++;
      if (pdfChunks.has(s.slice(i, i + N))) hit++;
    }
    const cov = hit / total;
    /* Dưới 60% là mất thật: một nửa đoạn trở lên không còn trong PDF.
       60–90% là nhiễu đã biết, không phải mất chữ:
         · số trang bị chèn vào giữa đoạn khi đoạn vắt qua trang;
         · chữ giãn ở nhãn nhỏ làm pdftotext chèn dấu cách;
         · ký hiệu trên (²⁺, ⁻) và µm bị đổi glyph khi Chrome vẽ.
       Vẫn in ra để mắt người xem, nhưng không chặn bản in. */
    const row = { f, cov, head: norm(fromHtml(m[2])).slice(0, 70) };
    if (cov < 0.6) lost.push(row);
    else if (cov < 0.9) weak.push(row);
  }
}

if (lost.length) {
  fail(`${lost.length}/${checked} đoạn mất hơn 40% chữ:`);
  for (const l of lost.slice(0, 10)) console.log(`      ${(l.cov * 100).toFixed(0)}% ${l.f}: ${l.head}`);
} else {
  ok(`${checked} đoạn, không đoạn nào mất quá 40% chữ`);
}
if (weak.length) {
  console.log(`  · ${weak.length} đoạn phủ 60–90%: nhiễu đã biết, xem qua nếu muốn:`);
  for (const w of weak.slice(0, 6)) console.log(`      ${(w.cov * 100).toFixed(0)}% ${w.f}: ${w.head}`);
}

/* ---------- 3. font ---------- */

console.log("\n3. Font nhúng");

let fonts = "";
try {
  fonts = run("pdffonts", [pdf]);
} catch {
  console.log("  – bỏ qua (không có pdffonts)");
}
if (fonts) {
  const lines = fonts.split("\n").slice(2).filter(Boolean);
  const notEmb = lines.filter((l) => /\sno\s+\w+\s+\w+\s+\d+\s+\d+\s*$/.test(l));
  if (notEmb.length) fail(`${notEmb.length} font chưa nhúng`);
  else ok(`${lines.length} font, tất cả đã nhúng`);
}

/* ---------- kết ---------- */

console.log("");
if (failed) {
  console.log(`Kiểm tra thất bại (${failed} mục). Xem chi tiết ở trên.`);
  process.exit(1);
}
console.log("Bản in đạt cả ba mục kiểm.");
