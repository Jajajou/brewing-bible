/**
 * Đặt hậu tố ?v= cho mọi asset về cùng một số: short SHA của commit hiện tại.
 *
 *   node tools/bump-assets.mjs            → ghi: mọi ?v= thành SHA hiện tại
 *   node tools/bump-assets.mjs --check    → không ghi, chỉ báo nếu lệch nhau
 *
 * Vì sao là một số duy nhất: trước đây mỗi file một số riêng (part-1.js?v=10,
 * book.js?v=23…), sửa CSS mà quên bump đúng file thì người đọc nhận bản cũ
 * tới 10 phút. Một lệnh, một số, không còn chỗ để quên.
 *
 * --check chỉ kiểm các giá trị có BẰNG NHAU không, không so với HEAD: chạy
 * bump là đổi chính commit đang có, nên so với HEAD sẽ không bao giờ khớp
 * sau khi commit. Bằng nhau là đủ để biết không ai bump nửa vời.
 */
import { readFileSync, writeFileSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

/* Chỉ những file này chứa ?v=. Thêm file mới có asset thì thêm vào đây. */
const FILES = ["index.html", "print.html", "tpl.html", "tpl.js", "book.js"];

/* ?v=… cho tới dấu phân cách của chuỗi chứa nó. Bắt cả trong JS
   ("content/" + lang + "/text.js?v=22") lẫn trong HTML (src="x.js?v=10"). */
const RE = /\?v=[^"'\s)>&]+/g;

function read(file) {
  return readFileSync(join(ROOT, file), "utf8");
}

function values(text) {
  return (text.match(RE) || []).map((m) => m.slice(3));
}

const checkOnly = process.argv.includes("--check");
const override = process.argv.find((a) => a.startsWith("--sha="));
const sha = override
  ? override.slice(6)
  : execFileSync("git", ["rev-parse", "--short", "HEAD"], { cwd: ROOT, encoding: "utf8" }).trim();

/* Kiểm trước khi ghi: file nào không còn ?v= nào là dấu hiệu ai đó đã xoá
   hậu tố, và lúc đó script sẽ im lặng không làm gì. */
const missing = FILES.filter((f) => values(read(f)).length === 0);
if (missing.length) {
  console.error(`Không thấy ?v= trong: ${missing.join(", ")}`);
  console.error("Nếu đã bỏ hậu tố ở các file này, sửa danh sách FILES trong tools/bump-assets.mjs.");
  process.exit(1);
}

if (checkOnly) {
  const all = FILES.flatMap((f) => values(read(f)));
  const distinct = [...new Set(all)];
  if (distinct.length !== 1) {
    console.error(`?v= đang có ${distinct.length} giá trị khác nhau: ${distinct.join(", ")}`);
    console.error("Chạy `node tools/bump-assets.mjs` rồi commit lại.");
    process.exit(1);
  }
  console.log(`✓ ?v=${distinct[0]} · ${all.length} thẻ · ${FILES.length} file`);
  process.exit(0);
}

let changed = 0;
let total = 0;
for (const file of FILES) {
  const before = read(file);
  let n = 0;
  const after = before.replace(RE, () => {
    n++;
    return "?v=" + sha;
  });
  total += n;
  if (after !== before) {
    writeFileSync(join(ROOT, file), after);
    changed++;
  }
}

console.log(`✓ ?v=${sha} · ${total} thẻ · ${changed}/${FILES.length} file đã ghi`);
