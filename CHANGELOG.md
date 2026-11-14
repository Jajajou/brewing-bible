# Thay đổi

Ghi theo [Keep a Changelog](https://keepachangelog.com/vi/1.1.0/). Số bản ghi trong metadata PDF (ô `Title`) chính là số ở đây — người cầm file đối chiếu được mình đang đọc bản nào.

## Quy ước số bản

| Số | Khi nào |
|---|---|
| `1.x` | Sửa nội dung, sửa lỗi, thêm bản dịch. Người đọc không phải đọc lại từ đầu. |
| `2.0` | Thêm hoặc bớt một phần, đổi cấu trúc sách. |

Dựng bản phát hành: tag commit rồi dựng, để PDF mang số bản chứ không mang chuỗi commit đã bị squash mất.

```bash
git tag v1.0.0 && ./build-pdf.sh
```

## Chưa phát hành

Cấu trúc: thêm hai phần không đánh số — **mở đầu** (lời mở đầu, cách đọc, bảng thuật ngữ)
và **cuối sách** (lời cảm ơn) — cùng chương 22 mới về **phin**. Số chương chính từ 30
lên 31; các chương cũ 22–30 dời thành 23–31, mọi tham chiếu "xem chương N" đã sửa theo.

Nhãn bằng chứng: số hiệu nguồn nằm trong tem (`Hợp lý · 68`) thay vì đứng riêng
bên cạnh (`[Hợp lý] [68]`), và mục Cách đọc nói rõ số sau dấu `·` tra ở phụ lục A2.

Bản in: số bản dựng **rời khỏi trang giấy** — không còn ở bìa và chân mỗi trang,
mà nằm trong metadata PDF (ô `Title`). Hash commit ở chân mọi trang là dấu của
log dựng, không phải của một cuốn sách.

Bản in: không còn **trang trắng giữa các phần**. Bìa phần vẫn đứng riêng một
trang, nhưng không bị ép mở ở trang lẻ nữa, nên bỏ được 6 trang trắng chèn và
bản in còn 203 trang.

## 1.0.0 — 30.10.2026

Bản đầu tiên có số bản in trên bìa và chân trang.

**Sách**

- 8 phần, 30 chương, phụ lục A1–A4; bản in A5 174 trang; EPUB 3.3 (0 lỗi `epubcheck`).
- Ba thứ tiếng trên web: tiếng Việt đủ 34/34 chương, tiếng Anh đủ 34/34, tiếng Nhật 3/34 có thân bài (chương chưa dịch hiện thông báo và link sang bản Việt, không vỡ trang).
- Mỗi khẳng định được đánh dấu theo ba mức bằng chứng; phụ lục A2 có 54 nguồn, mỗi `[n]` trong thân bài trỏ tới một mục có thật.

**Thêm**

- Tìm kiếm không dấu: gõ `chiet xuat`, `ty le`, `do xay` đều ra kết quả như bản có dấu. `fold` giữ nguyên độ dài từng ký tự nên ô kết quả vẫn cắt đúng chỗ trong bản có dấu.
- Skip link ở đầu trang: Tab một lần là vào được nội dung, không phải đi qua cả mục lục.
- Thẻ chia sẻ OG/Twitter và ảnh 1200×630 dựng bằng chính bảng màu của sách.
- `hreflang` cho ba bản ngôn ngữ và `canonical` trỏ bản tiếng Việt.
- Số bản trên bìa và chân mỗi trang PDF; `BOOK_VER` để in số phát hành thay cho commit.
- CI chạy mỗi push và mỗi pull request: test logic tìm kiếm, cấu trúc bản dịch, số hiệu trích dẫn, và tính đồng nhất của hậu tố `?v=`.
- `tests/logic.test.mjs` — 12 test cho `fold`, xếp hạng tìm kiếm và nhãn số chương, chạy bằng `node --test`.
- `tools/bump-assets.mjs`: một lệnh đặt mọi `?v=` về short SHA, thay cho việc bump tay 10 số khác nhau.
- `LICENSE`: nội dung theo CC BY-NC-SA 4.0, mã theo MIT.

**Sửa**

- Trang không còn cắt snippet lệch ký tự khi từ khoá rơi vào chỗ có dấu.
- Bấm skip link không còn đá người đọc về trang bìa (hash là router của sách).

**Ghi chú**

- Lượt đối chiếu DOI với Crossref không nằm trong CI: nó gọi 31 request ra ngoài, vẫn là việc chạy tay.
- PDF và EPUB vẫn nằm trong repo để Pages phục vụ trực tiếp; lịch sử không bị viết lại, nên `.git` còn nặng (xem issue #12).
