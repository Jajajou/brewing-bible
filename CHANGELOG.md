# Thay đổi

Ghi theo [Keep a Changelog](https://keepachangelog.com/vi/1.1.0/). Số bản in trên bìa và chân trang PDF chính là số ở đây — người cầm bản giấy đối chiếu được mình đang đọc bản nào.

## Quy ước số bản

| Số | Khi nào |
|---|---|
| `1.x` | Sửa nội dung, sửa lỗi, thêm bản dịch. Người đọc không phải đọc lại từ đầu. |
| `2.0` | Thêm hoặc bớt một phần, đổi cấu trúc sách. |

Dựng bản phát hành: tag commit rồi dựng, để PDF in số bản chứ không in chuỗi commit đã bị squash mất.

```bash
git tag v1.0.0 && ./build-pdf.sh
```

## Chưa phát hành

**Đồng hồ pha & máy tính**

- `brew.html` — trang thứ hai dùng được ngoài bản sách: đồng hồ pha đếm theo đúng mốc thời gian của hai công thức có sẵn trong sách (V60 khớp tỉ lệ cupping 1:17, và cupping chuẩn tại nhà 8 phút). Bước hiện tại hiện bằng chữ, con số gam là mốc luỹ kế trên cân, và bíp ở mỗi ranh giới bước.
- Đổi tổng nước thì mọi mốc gam đổi theo cùng hệ số, nên bloom vẫn đúng 3× liều; mốc thời gian thì giữ nguyên — phần rút là biến, trang nói rõ điều đó thay vì hứa.
- Máy tính tỉ lệ (sửa ô nào cũng được) và EY từ TDS, kèm nhãn ba cửa sổ của chương “Ba con số” (dưới 18% chiết thiếu, 18–22% là vùng, trên 22% chiết dư).
- `brew-core.js` là logic thuần, `tests/brew-core.test.mjs` chạy bằng `node --test` như `journal-core.js`; một test kiểm luôn link về chương trong sách không chết.
- Đồng hồ đếm bằng đồng hồ hệ thống (không đếm tick): ẩn tab trên điện thoại thì requestAnimationFrame dừng, tick sẽ chậm dần mà không ai biết. Giữ màn hình sáng bằng Screen Wake Lock khi đang pha.

**Hình minh hoạ**

- Hai hình mới trong `figures.js`: **bánh xe hương vị** (chương “Ngôn ngữ nốt hương”, ngay trước Bẫy 3) và **bản đồ chiết xuất** (chương “Chiết xuất”, hết mục “Ba con số”). Cả hai là SVG vẽ bằng nét như năm hình cũ nên in ở 300 dpi vẫn sắc, EPUB không phải mang thêm file ảnh, và tự đổi màu theo giao diện sáng/tối.
- Bánh xe **vẽ lại cấu trúc** của SCA & World Coffee Research (2016), không chép tác phẩm gốc: bản của SCA là CC BY-NC-ND 4.0, cấm bản phái sinh và cấm dùng thương mại. Dòng nguồn nằm ngay dưới hình (`.fig-credit`), đúng như phụ lục A5 đã ghi.
- `figures.js` nhận thêm mốc `h4:N` (một số hình phải chen vào giữa các mục con) và một dòng `credit` trong chú thích.

**Bản nghe**

- Lớp text cho TTS (`tools/audio-text.mjs`): badge mức bằng chứng, trích dẫn `[n]` và `(xem chương …)` không còn bị đọc ra; ký hiệu toán (`=`, `×`, `≈`, `±`, `→`, `−`, `·`, `#`) đọc thành lời; tiêu đề khung nối với thân bằng "thì" hoặc dấu hai chấm thay vì ngắt đoạn; 13 câu đúc kết tách thành khối riêng để đọc bằng giọng khác. 40 test.
- `tools/build-audio.mjs`: sinh Opus 24 kbps mono, hai giọng, cổng hash trong `audio/manifest.json` để chạy lại chỉ sinh chương có chữ đổi.
- `tools/check-audio.mjs`: nghe lại file vừa sinh bằng ASR rồi so từng từ với text nguồn.
- Thanh nghe trong `book.js`: phát, tua, đổi giọng nam/nữ, nhớ vị trí nghe; chỉ hiện ở chương đã có file.
- `tools/serve.mjs` trả `206 Partial Content` — không có Range thì trình duyệt báo duration của file Opus là `Infinity`.
- `tools/check-audio.mjs` chặn thêm một loại lỗi: **máy tự thêm chữ**. Một đoạn không có từ nào khớp nguồn mà dài từ 5 từ là lỗi cứng, thoát mã 1 — loại này tỉ lệ khớp không bắt được (câu thêm 9 từ chỉ làm rớt chưa đến 1 %). Bắt được hai lỗi thật ở chương 7: nữ đọc “18 đến hai mươi hai mươi hai”, nam đọc thêm “hãy đăng ký kênh…”; sinh lại đúng hai file đó thì sạch.
- Nhịp đọc giữ 1,00: đã cho nghe 1,00 / 0,94 / 0,88 trên cùng một bản sinh, mức gốc là mức được chọn.
- Từ tiếng Anh để nguyên cho bộ G2P của VieNeu: bỏ sáu luật phiên âm tay (`pour over` → `po ô-vơ`, `fines` → `phai-nờ`, …). Đo bằng ASR trên hai giọng đã chốt: để nguyên khớp 0,74/0,76, phiên âm tay chỉ 0,57/0,59. Chữ viết tắt (`EY`, `TDS`, `pH`) vẫn giữ luật vì model hay nuốt âm cuối.

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
