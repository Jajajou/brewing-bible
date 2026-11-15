/*
 * Gói figures-svg/*.svg thành figures-plates.js.
 *
 * Vì sao phải gói chứ không nạp file lúc chạy: bản EPUB dựng bằng cách
 * chạy figures.js qua new Function() trong Node, ở đó không có fetch và
 * không có đường dẫn tương đối của trang web. Bản in cũng phải có hình
 * sẵn trước khi Chrome chụp trang. Nên cách duy nhất dùng chung được cho
 * cả ba bản là nhúng thẳng chuỗi SVG vào một file JS.
 *
 * Chạy lại mỗi khi figures-svg/ đổi:
 *   node tools/adapt-figures.mjs && node tools/build-plates.mjs
 */

import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(ROOT, "figures-svg");
const OUT = join(ROOT, "figures-plates.js");

const files = readdirSync(SRC).filter((f) => f.endsWith(".svg")).sort();

/* fig07-2_tds-sensory.vi.svg → { id: "fig07-2", lang: "vi" } */
function parse(name) {
  const m = name.match(/^(fig[\d-]+)_[^.]*\.(\w+)\.svg$/);
  if (!m) throw new Error(`Tên file không theo mẫu fig00-0_ten.lang.svg: ${name}`);
  return { id: m[1], lang: m[2] };
}

const byId = {};
for (const f of files) {
  const { id, lang } = parse(f);
  (byId[id] = byId[id] || {})[lang] = readFileSync(join(SRC, f), "utf8").trim();
}

const entries = Object.keys(byId)
  .sort()
  .map((id) => {
    const langs = Object.keys(byId[id])
      .sort()
      .map((l) => `    ${l}: ${JSON.stringify(byId[id][l])}`)
      .join(",\n");
    return `  "${id}": {\n${langs}\n  }`;
  })
  .join(",\n");

const out = `/* ============================================================
   The Brewing Bible — figures-plates.js

   TỆP NÀY ĐƯỢC SINH TỰ ĐỘNG. Đừng sửa tay.

   Nguồn:  docs/brewing-bible-figures/svg/*.svg
   Dựng:   node tools/adapt-figures.mjs && node tools/build-plates.mjs

   Mỗi hình có một bản cho mỗi ngôn ngữ, vì chữ nằm trong hình. Màu đã
   được đổi thành class (.p-* cho fill, .s-* cho stroke) nên cùng một
   hình hiện đúng ở giao diện sáng, tối, bản in và EPUB.
   ============================================================ */
(function () {
  "use strict";
  window.BOOK_PLATES = {
${entries}
  };
})();
`;

writeFileSync(OUT, out);
console.log(`✓ ${Object.keys(byId).length} hình → figures-plates.js (${Math.round(out.length / 1024)} KB)`);
