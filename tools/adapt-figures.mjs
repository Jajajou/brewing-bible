/*
 * Chuyển SVG do docs/brewing-bible-figures/make_figures.py sinh ra thành
 * dạng mà sách dùng được.
 *
 * Vì sao cần bước này. Script gốc vẽ bằng mã màu cứng (#2B2622, #F7E1D9…)
 * và font riêng (Be Vietnam Pro). Trong sách thì:
 *
 *   1. Giao diện tối đổi nền sang #14120e. Một khối tô #F7E1D9 giữ nguyên
 *      sẽ thành tấm sáng chói, và chữ #2B2622 trên nền đó không đọc được.
 *      Mọi hình sẵn có trong figures.js đều lấy màu từ CSS nên chúng tự
 *      đổi theo giao diện; hình mới phải theo cùng luật đó.
 *   2. Font của sách là Newsreader (thân) và Inter (nhãn). Hình mang font
 *      khác sẽ lạc, và nếu máy người đọc không có font đó thì dấu tiếng
 *      Việt rơi về font thay thế, chữ xô lệch.
 *
 * Cách làm: thay mã màu bằng **class**, không phải var(). Lý do là EPUB:
 * epub.css cố tình viết màu cứng vì máy đọc cũ không hiểu var(), nên nếu
 * SVG mang var() thì hình mất màu trên những máy đó. Class thì ba bản
 * CSS (styles / print / epub) mỗi bản tự định nghĩa theo cách của mình.
 *
 * Một việc nữa: SVG gốc đều khai báo <marker id="arr">. Nhiều hình trên
 * cùng một trang thì id trùng, và trình duyệt chỉ giữ cái đầu — các hình
 * sau mất mũi tên. Nên mỗi hình được thêm tiền tố id riêng.
 *
 * Chạy:  node tools/adapt-figures.mjs
 * Đọc:   docs/brewing-bible-figures/svg/*.svg
 * Ghi:   figures-svg/*.svg   (bản đã chuyển, là bản sách dùng)
 */

import { readFileSync, writeFileSync, readdirSync, mkdirSync, existsSync } from "node:fs";
import { join, basename, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const SRC = join(ROOT, "docs", "brewing-bible-figures", "svg");
const OUT = join(ROOT, "figures-svg");

/* Bảng màu của make_figures.py → class, theo vai trò chứ không theo sắc.
   Màu nhấn gốc có năm sắc (nâu, hổ phách, xanh lục, san hô, xanh nước)
   nhưng sách chỉ có một màu nhấn. Gộp lại được vì các hình này phân biệt
   khối bằng vị trí và nhãn chữ, không chỉ bằng màu — và gộp lại thì hình
   vẫn đọc được cho người mù màu. */
const FILL = {
  "#2B2622": "p-ink",      // INK    — chữ chính
  "#6B625A": "p-muted",    // MUTED  — chữ phụ
  "#8C847C": "p-ink2",     // STONE_D
  "#CFC7BE": "p-soft",     // STONE  — khối trung tính
  "#7A4E33": "p-accent",   // COFFEE
  "#C9853A": "p-accent",   // AMBER
  "#2F8573": "p-accent",   // TEAL
  "#C0563A": "p-accent",   // CORAL
  "#4F86B7": "p-accent",   // WATER
  /* Bốn màu nhạt là nền khối. Thành "wash": màu nhấn pha trong suốt, nên
     trên nền tối nó tối theo thay vì sáng lên. */
  "#F4E2C8": "p-wash",
  "#DDEFEA": "p-wash",
  "#F7E1D9": "p-wash",
  "#DCE8F4": "p-wash",
  /* Chữ trắng vốn nằm trên khối đặc. Khối thành wash trong suốt thì chữ
     trắng biến mất ở giao diện sáng, nên đổi sang mực. */
  "#FFFFFF": "p-ink",
};

const STROKE = {
  "#2B2622": "s-ink",
  "#6B625A": "s-muted",
  "#8C847C": "s-ink2",
  "#B8AFA6": "s-axis",     // AXIS — trục
  "#ECE7E1": "s-grid",     // GRID — lưới
  "#CFC7BE": "s-axis",
  "#7A4E33": "s-accent",
  "#C9853A": "s-accent",
  "#2F8573": "s-accent",
  "#C0563A": "s-accent",
  "#4F86B7": "s-accent",
};

function addClass(attrs, cls) {
  const m = attrs.match(/class="([^"]*)"/);
  if (m) return attrs.replace(/class="[^"]*"/, `class="${m[1]} ${cls}"`);
  return ` class="${cls}"` + attrs;
}

function adapt(svg, slug) {
  let s = svg;

  /* fill/stroke bằng mã màu → class tương ứng, bỏ thuộc tính màu đi. */
  s = s.replace(
    /<(rect|text|line|path|circle|polyline|polygon|g)\b([^>]*)>/g,
    (full, tag, attrs) => {
      let out = attrs;
      const fill = out.match(/fill="(#[0-9A-Fa-f]{6})"/);
      if (fill) {
        const cls = FILL[fill[1].toUpperCase()];
        if (cls) {
          out = out.replace(/\s*fill="#[0-9A-Fa-f]{6}"/, "");
          out = addClass(out, cls);
        }
      }
      const stroke = out.match(/stroke="(#[0-9A-Fa-f]{6})"/);
      if (stroke) {
        const cls = STROKE[stroke[1].toUpperCase()];
        if (cls) {
          out = out.replace(/\s*stroke="#[0-9A-Fa-f]{6}"/, "");
          out = addClass(out, cls);
        }
      }
      return `<${tag}${out}>`;
    }
  );

  /* Font: bỏ khai báo của script gốc, để CSS của sách quyết định. */
  s = s.replace(/\s*font-family="[^"]*"/g, "");

  /* id của marker phải là duy nhất trên trang. */
  s = s.replace(/id="([^"]+)"/g, (m, id) => `id="${slug}-${id}"`);
  s = s.replace(/url\(#([^)]+)\)/g, (m, id) => `url(#${slug}-${id})`);

  /* Bỏ width/height cố định để hình co theo bề ngang cột chữ thay vì
     tràn ra ngoài trên điện thoại. */
  s = s.replace(/<svg([^>]*?)>/, (m, attrs) => {
    const cleaned = attrs
      .replace(/\s*width="[^"]*"/, "")
      .replace(/\s*height="[^"]*"/, "");
    return `<svg${cleaned} class="fig-svg fig-plate">`;
  });

  return s.trim();
}

if (!existsSync(SRC)) {
  console.error(`Không thấy ${SRC}`);
  process.exit(1);
}
mkdirSync(OUT, { recursive: true });

const files = readdirSync(SRC).filter((f) => f.endsWith(".svg")).sort();
let n = 0;
for (const f of files) {
  /* slug: fig07-2_tds-sensory.vi.svg → fig07-2-vi */
  const slug = basename(f).replace(/\.svg$/, "").replace(/_[^.]*/, "").replace(/\./g, "-");
  writeFileSync(join(OUT, basename(f)), adapt(readFileSync(join(SRC, f), "utf8"), slug));
  n++;
}
console.log(`✓ ${n} hình → figures-svg/`);
