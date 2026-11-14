/* Nạp nội dung sách từ content/part-*.js cho các script Node.

   Vì sao nạp bằng Function chứ không import: content là script trình duyệt
   (`window.BOOK_PARTS = …`), không phải module. Đổi nó thành module là đổi
   cả trang web đang chạy — không đáng, chỉ để hai script build đọc được.
   Cách này giữ nguyên định dạng, không cần build step, không cần package. */

import fs from "node:fs";
import * as audioText from "./audio-text.mjs";

export const ROOT = new URL("../", import.meta.url);
const CONTENT = new URL("content/", ROOT);

/* Hai chương nguồn không đọc nguyên văn.

   A2 "Thư mục" là 24.000 ký tự toàn tên tác giả, tên bài, DOI — nghe mười
   lăm phút và không ai theo được. Nhưng im lặng bỏ hẳn thì người nghe thấy
   nhảy cóc giữa A1 và A3, nên thay bằng một câu nói đúng chỗ.

   A3 "Đối chiếu từng chương" thì đọc được: phần thân là văn, ba bảng đã có
   data-audio riêng và tự bỏ. Chương A4 cũng vậy. */
export const SPOKEN_INSTEAD = {
  "ch-nguon-danh-muc":
    "Thư mục: năm mươi bốn nguồn, xếp theo chủ đề và theo chương. " +
    "Bản nghe không đọc danh mục — bảng đầy đủ ở cuối sách.",
};

export function loadChapters() {
  const files = fs
    .readdirSync(CONTENT)
    .filter((f) => /^part-\d+\.js$/.test(f))
    .sort((a, b) => Number(a.match(/\d+/)[0]) - Number(b.match(/\d+/)[0]));

  const win = {};
  win.window = win;
  for (const f of files) {
    new Function("window", fs.readFileSync(new URL(f, CONTENT), "utf8"))(win);
  }

  const chapters = [];
  for (const part of win.BOOK_PARTS || []) {
    for (const ch of part.chapters || []) chapters.push(ch);
  }
  return chapters;
}

/* Text đưa vào TTS cho một chương: tiêu đề, lede, rồi thân bài.

   Tiêu đề đứng trước lede vì đó là cách người đọc giới thiệu chương khi đọc
   to. `tags` và `minutes` bỏ: đọc liên tục thì chúng là nhãn cho mắt
   (VOICE.md mục 6). */
export function chapterText(ch) {
  if (SPOKEN_INSTEAD[ch.id]) return SPOKEN_INSTEAD[ch.id];
  return (ch.title || "") + ". " + (ch.lede || "") + "\n\n" + (ch.body || "");
}

/* Text đã chuẩn hoá cho một chương, kèm ranh giới segment.
   check-audio dùng đúng hàm này — so audio với một text khác với text đã
   đưa vào TTS thì phép so vô nghĩa. */
export function chapterAudio(ch) {
  return audioText.prepare(chapterText(ch));
}
