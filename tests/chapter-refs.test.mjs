// Tham chiếu chương: câu "xem chương N" phải trỏ tới chương có thật, và tới
// đúng chương đang nói về việc đó.
//
// Ba lớp kiểm:
//   1. Mọi số N nằm trong khoảng 1..số chương. Bắt lỗi gõ số hoặc trỏ tới
//      chương đã bị xoá. Áp cho cả bản Việt và bản Anh.
//   2. Tham chiếu "có neo": câu nêu một thứ cụ thể (bảng thời gian rút, bốn
//      trục, nhóm phễu không bypass, công thức nhiều lần rót nhỏ…) thì chương
//      được trỏ tới phải thật sự chứa thứ đó. Đây là lớp bắt drift khi đánh
//      số lại: thêm một chương thì mọi số sau nó dịch đi một, neo rơi sang
//      chương khác, test đỏ. Đúng lỗi đã xảy ra khi sách từ 30 lên 31 chương.
//   3. Bản Anh và bản Việt phải trỏ cùng một số chương cho cùng một câu. Lỗi
//      hay gặp là sửa một bên, quên bên kia.

import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync, readdirSync } from "node:fs";

const PART_FILES = [1, 2, 3, 4, 5, 6, 7, 8].map((n) => `content/part-${n}.js`);
const EN_FILE = "content/en/text.js";

// Chương có số nằm ở các tệp phần; tiêu đề chương thụt 4 dấu cách, tiêu đề
// phần thụt 2 dấu cách nên không lọt vào đây.
function loadChapters(files) {
  const rows = [];
  const cache = new Map();
  const linesOf = (f) => {
    if (!cache.has(f)) cache.set(f, readFileSync(f, "utf8").split("\n"));
    return cache.get(f);
  };
  for (const file of files) {
    linesOf(file).forEach((line, i) => {
      const m = line.match(/^ {4}title: "(.+)",?$/);
      if (m) rows.push({ file, start: i, title: m[1] });
    });
  }
  rows.forEach((row, i) => {
    const lines = linesOf(row.file);
    const next = rows[i + 1];
    const end = next && next.file === row.file ? next.start : lines.length;
    row.num = i + 1;
    row.body = lines.slice(row.start + 1, end).join("\n");
  });
  return rows;
}

// Bình luận trong tệp nội dung không phải chữ in; đừng bắt nó làm tham chiếu.
function stripComments(text) {
  return text.replace(/\/\*[\s\S]*?\*\//g, (m) => m.replace(/[^\n]/g, ""));
}

const chapters = loadChapters(PART_FILES);
const byNum = new Map(chapters.map((c) => [c.num, c]));

function refIn(text) {
  const m = text.match(/(?:chương|chapter)\s+(\d+)/i);
  return m ? Number(m[1]) : null;
}

test("sách có 31 chương có số", () => {
  assert.equal(chapters.length, 31);
});

test("mọi tham chiếu chương trỏ tới chương có thật", () => {
  const files = [
    ...readdirSync("content")
      .filter((f) => /^part-\d+\.js$/.test(f))
      .map((f) => `content/${f}`),
    EN_FILE,
  ];
  const bad = [];
  for (const file of files) {
    stripComments(readFileSync(file, "utf8"))
      .split("\n")
      .forEach((line, i) => {
        const re = /(?:chương|chapter)\s+(\d+)/gi;
        let m;
        while ((m = re.exec(line))) {
          const n = Number(m[1]);
          if (n < 1 || n > chapters.length) {
            bad.push(`${file}:${i + 1} → chương ${n} (chỉ có 1..${chapters.length})`);
          }
        }
      });
  }
  assert.deepEqual(bad, [], `tham chiếu ngoài khoảng:\n  ${bad.join("\n  ")}`);
});

// Mỗi neo: câu chứa tham chiếu (phải có đúng một lần trong tệp), số chương câu
// đó nêu, và mẫu chữ phải thật sự có trong thân chương được trỏ tới.
const ANCHORS = [
  // thời gian rút: bảng nằm ở chương Đọc bã, không phải chương Bảng chẩn đoán
  {
    file: "content/part-5.js",
    phrase: "Chương 20 có bảng đọc con số đó",
    ref: 20,
    anchor: /Thời gian rút \(sau lần rót cuối\)/,
    why: "bảng thời gian rút",
  },
  // nhóm phễu không bypass được xếp ở chương Chọn dụng cụ
  {
    file: "content/part-5.js",
    phrase: "Ở chương 16 mình đã xếp nó",
    ref: 16,
    anchor: /Pulsar/,
    why: "nhóm phễu không bypass",
  },
  // bốn trục khẩu vị được định nghĩa ở chương Ngôn ngữ nốt hương
  {
    file: "content/part-7.js",
    phrase: "theo bốn trục (từ chương 27)",
    ref: 27,
    anchor: /bốn trục/,
    why: "bốn trục khẩu vị",
  },
  {
    file: "content/part-8.js",
    phrase: "bốn trục từ chương 27",
    ref: 27,
    anchor: /bốn trục/,
    why: "bốn trục khẩu vị",
  },
  // công thức nhiều lần rót nhỏ nằm ở chương Giải phẫu công thức
  {
    file: "content/part-10.js",
    phrase: "phân tích ở chương 18",
    ref: 18,
    anchor: /nhiều lần rót nhỏ/,
    why: "công thức nhiều lần rót nhỏ",
  },
  // ba công thức nổi tiếng nằm chung một chương: Hoffmann, Hedrick, Kasuya.
  // Lời cảm ơn từng trỏ hai trong ba sang chương 17 (Kỹ thuật rót).
  {
    file: "content/part-10.js",
    phrase: "cũng ở chương 18",
    ref: 18,
    anchor: /Kasuya/,
    why: "phương pháp 4:6 của Kasuya",
  },
  {
    file: "content/part-10.js",
    phrase: "Các công thức ít lần rót của anh được bàn ở chương 18",
    ref: 18,
    anchor: /Hedrick/,
    why: "công thức ít lần rót của Hedrick",
  },
  // bản đồ khẩu vị dẫn sang chương Xây khẩu vị
  {
    file: "content/part-4.js",
    phrase: "nền tảng cho chương 28",
    ref: 28,
    anchor: /sở thích/i,
    why: "bản đồ khẩu vị",
  },
  {
    file: "content/part-1.js",
    phrase: "Chương 28 sẽ nói về việc này",
    ref: 28,
    anchor: /sở thích/i,
    why: "bản đồ khẩu vị",
  },
  // bốn câu hỏi dùng khi so với cupping
  {
    file: "content/part-6.js",
    phrase: "bốn câu hỏi ở chương 14",
    ref: 14,
    anchor: /Bốn câu hỏi/,
    why: "bốn câu hỏi",
  },
  // chuyện đắng tăng khi ly nguội
  {
    file: "content/part-3.js",
    phrase: "Chương 26 nói về điều này",
    ref: 26,
    anchor: /nguội/,
    why: "vị đổi khi nguội",
  },
  // bảng thuật ngữ dẫn nguồn cho từng mục
  {
    file: "content/part-0.js",
    phrase: "Sinh ra trong lò rang, không phải trong phễu. Chương 9.",
    ref: 9,
    anchor: /lò rang/,
    why: "đắng sinh ra trong lò rang",
  },
  {
    file: "content/part-0.js",
    phrase: "Cách đo alkalinity rẻ nhất. Chương 5.",
    ref: 5,
    anchor: /dKH/,
    why: "đo alkalinity bằng bộ test KH",
  },
  // phụ lục A2/A4 dẫn ngược về chương
  {
    file: "content/part-9.js",
    phrase: "Chương 3 nay đã hạ nhãn",
    ref: 3,
    anchor: /đông/,
    why: "trữ đông cà phê",
  },
  {
    file: "content/part-9.js",
    phrase: "Chương 19 dùng 248 g",
    ref: 19,
    anchor: /248/,
    why: "công thức 248 g",
  },
];

test("tham chiếu có neo trỏ đúng chương chứa nội dung đó", () => {
  const problems = [];
  for (const { file, phrase, ref, anchor, why } of ANCHORS) {
    const text = readFileSync(file, "utf8");
    const hits = text.split(phrase).length - 1;
    if (hits !== 1) {
      problems.push(`${file}: câu neo "${phrase}" xuất hiện ${hits} lần, cần đúng 1`);
      continue;
    }
    if (refIn(phrase) !== ref) {
      problems.push(`${file}: câu "${phrase}" phải nêu chương ${ref}`);
      continue;
    }
    const chapter = byNum.get(ref);
    if (!chapter) {
      problems.push(`${file}: chương ${ref} không tồn tại`);
      continue;
    }
    if (!anchor.test(chapter.body)) {
      problems.push(
        `${file}: ${why} được trỏ tới chương ${ref} (${chapter.title}) nhưng chương đó không chứa ${anchor}`,
      );
    }
  }
  assert.deepEqual(problems, [], problems.join("\n"));
});

// Cùng một câu ở hai bản phải trỏ cùng một chương. Sửa một bên mà quên bên
// kia là lỗi đã xảy ra ở bản Anh: nó giữ số chương cũ sau khi đánh số lại.
const PARITY = [
  { vi: "Chương 20 có bảng đọc con số đó", en: "Chapter 20 has the table for reading that number" },
  { vi: "Ở chương 16 mình đã xếp nó", en: "In chapter 16 I placed it in the same family" },
  { vi: "phân tích ở chương 18", en: "the many-small-pours approach is analysed in chapter 18" },
  { vi: "theo bốn trục (từ chương 27)", en: "(from chapter 27)" },
  { vi: "bốn trục từ chương 27", en: "Use the four axes from chapter 27" },
  { vi: "nền tảng cho chương 28", en: "foundation for chapter 28" },
  { vi: "Chương 26 nói về điều này", en: "Chapter 26 is about this" },
  { vi: "Chương 15 đã ghi khoảng tụt", en: "Chapter 15 puts that drop at" },
  { vi: "chương 2 nói rang đậm", en: "chapter 2 says dark roast" },
  { vi: "ở chương 3 có cơ sở", en: "in chapter 3, has a basis" },
  { vi: "theo luật 4 ở chương 24", en: "by rule 4 in chapter 24" },
];

test("bản Anh và bản Việt trỏ cùng chương", () => {
  const viText = readdirSync("content")
    .filter((f) => /^part-\d+\.js$/.test(f))
    .map((f) => readFileSync(`content/${f}`, "utf8"))
    .join("\n");
  const enText = readFileSync(EN_FILE, "utf8");
  const problems = [];
  for (const { vi, en } of PARITY) {
    const viHits = viText.split(vi).length - 1;
    const enHits = enText.split(en).length - 1;
    if (viHits !== 1) problems.push(`bản Việt: "${vi}" xuất hiện ${viHits} lần`);
    if (enHits !== 1) problems.push(`bản Anh: "${en}" xuất hiện ${enHits} lần`);
    if (viHits === 1 && enHits === 1 && refIn(vi) !== refIn(en)) {
      problems.push(`lệch chương: Việt "${vi}" → ${refIn(vi)}, Anh "${en}" → ${refIn(en)}`);
    }
  }
  assert.deepEqual(problems, [], problems.join("\n"));
});
