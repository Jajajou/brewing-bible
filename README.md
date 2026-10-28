# The Brewing Bible

Một cuốn sách thực hành về **pour over** và **cupping** — 8 phần, 28 chương.

Đọc trực tuyến: **https://jajajou.github.io/brewing-bible/**

## Về cuốn sách

Phần lớn lời khuyên pha cà phê specialty là giả thuyết thủ công được lặp lại đủ lâu để thành niềm tin. Cuốn sách này tách rõ ba loại:

- **Bằng chứng** — có nghiên cứu công bố hoặc lý thuyết vật lý/hóa học chắc chắn
- **Hợp lý** — cơ chế đúng, nhưng chưa có nghiên cứu kiểm soát
- **Truyền miệng** — được lặp lại nhiều nhưng không ai kiểm chứng

Mỗi khẳng định trong sách đều được dán nhãn theo ba mức này.

## Mục lục

| Phần | Nội dung | Chương |
|---|---|---|
| I — Hạt | Bốn biến số có sẵn trước khi pha; mức rang; độ tươi | 3 |
| II — Nước | Alkalinity; cách đo; xử lý nước ở Việt Nam | 3 |
| III — Chiết xuất | Ba con số; huyền thoại "acid trước, đắng sau"; mô hình ba chiều | 3 |
| IV — Cupping | Nó đo gì; quy trình tại nhà; đọc ly; giới hạn | 4 |
| V — Pour over | Ngâm vs chảy; dụng cụ; kỹ thuật rót; công thức; đọc bã; chẩn đoán | 6 |
| VI — Cầu nối | Quy trình 20 phút; bốn luật của công thức nền; case study | 3 |
| VII — Cảm nhận | Giải phẫu một ngụm; ngôn ngữ nốt hương; xây khẩu vị | 3 |
| VIII — Sổ tay | Nhật ký pha; dụng cụ; checklist khi thất bại | 3 |

## Tính năng

- Mục lục cố định, theo dõi chương đang đọc và đánh dấu chương đã đọc (lưu trong máy)
- Tìm kiếm toàn văn, xếp hạng theo tiêu đề → lede → số lần lặp
- Chế độ tối, chỉnh cỡ chữ
- Thanh tiến độ đọc
- Điều hướng bằng phím ← → ; nhấn `/` để tìm
- **Bản in**: Ctrl/Cmd + P cho ra bản in nhanh; hoặc tải bản dàn trang A5 sẵn ở [the-brewing-bible.pdf](the-brewing-bible.pdf)
- **Ba ngôn ngữ trên web**: tiếng Việt, tiếng Anh, tiếng Nhật — chọn ở góc phải thanh trên, lựa chọn được nhớ trong máy

## Cấu trúc

```
index.html            khung trang web
styles.css            toàn bộ giao diện web
book.js               router, mục lục, tìm kiếm, tiến độ
content/part-*.js     nội dung 8 phần (dữ liệu JS)
content/en/text.js    bản dịch tiếng Anh (chỉ dùng cho bản web)
content/ja/text.js    bản dịch tiếng Nhật (chỉ dùng cho bản web)
i18n.js               chuỗi giao diện ba thứ tiếng

print.html            khung bản in A5 (dùng chung content/)
print.css             dàn trang A5: khổ, lề, chạy đầu trang, số trang, mục lục có số trang
print.js              dựng bìa → mục lục → phần → chương cho bản in
print-output.css      luật chỉ áp lúc in (lề 0) — nạp sau khi phân trang xong
epub.css              giao diện bản EPUB (e-ink)
build-pdf.sh          một lệnh xuất ra PDF
tools/print-pdf.mjs   xuất PDF qua Chrome DevTools (chờ Paged.js xong mới in)
tools/build-epub.mjs  dựng EPUB 3 (nav, ncx, từng chương một file)
tools/check-i18n.mjs  so cấu trúc bản dịch với bản gốc (bảng, danh sách, đoạn)
vendor/paged.polyfill.js  Paged.js 0.4.3 (phân trang trong trình duyệt)
```

Nội dung nằm trong các file `content/part-N.js` dưới dạng dữ liệu — thêm chương chỉ cần thêm một object vào mảng `chapters`.

## Bản dịch

Bản gốc là tiếng Việt. Bản dịch nằm trong `content/en/text.js` và `content/ja/text.js`, **chỉ dùng cho bản web** — PDF và EPUB vẫn là tiếng Việt.

Mỗi file dịch có cùng cấu trúc: `parts` (tiêu đề phần) và `chapters` (tiêu đề, lede, phút đọc, tag, thân bài). Chương chưa có `body` sẽ hiện thông báo "chưa dịch" kèm link sang bản tiếng Việt, nên có thể đẩy lên web từng phần một mà không sợ trang vỡ.

**Trạng thái:** tiếng Anh đủ **28/28 chương** (toàn bộ 8 phần); tiếng Nhật **3/28** (Phần I — Hạt).

Quy ước thuật ngữ và ba nhãn bằng chứng nằm ở [TRANSLATION.md](TRANSLATION.md). Trước khi commit một phần đã dịch:

```bash
node tools/check-i18n.mjs        # cả en và ja
node tools/check-i18n.mjs en     # chỉ một ngôn ngữ
```

Script so từng chương với bản gốc: số bảng, số hàng, số `<li>`, số `<strong>`, số đoạn, và độ dài trong khoảng cho phép. Lệch là báo lỗi — dấu hiệu bị bỏ sót một hàng bảng hoặc một đoạn văn.

### Quy ước version asset

Các thẻ `<link>` và `<script>` trong `index.html` **và** `print.html` có hậu tố `?v=N`. GitHub Pages cache asset 10 phút, nên sau khi sửa `styles.css`, `book.js` hoặc file nội dung, **tăng `N`** ở tất cả các thẻ rồi push — người đọc nhận bản mới ngay thay vì chờ cache hết hạn.

```bash
sed -i '' 's/?v=3/?v=4/g' index.html print.html   # macOS
sed -i 's/?v=3/?v=4/g' index.html print.html      # Linux
```

## Bản in A5 (PDF)

```bash
./build-pdf.sh                  # → the-brewing-bible.pdf
./build-pdf.sh out/ban-in.pdf    # đường dẫn khác
SHOT_PAGE=6 ./build-pdf.sh       # kèm ảnh trang 6 ra /tmp/shot-6.png để soi lỗi
```

Script tự bật một static server tạm (Paged.js không chạy được với `file://`), dựng trang, **chờ Paged.js phân trang xong** rồi mới in. Cần Chrome/Chromium và Node 18+.

Bản dàn trang: khổ A5 148×210 mm, lề 17/16/18 mm, chạy đầu trang theo tên phần, số trang chân, mục lục có số trang thật (dùng `target-counter`), bìa và trang phần riêng. Hiện khoảng **129 trang**.

Muốn xem bản dàn trang ngay trong trình duyệt: mở `print.html`. Thêm `?pdf=1` để thấy đúng những gì PDF nhận.

Vài điều dễ vấp nếu sửa `print.css`:

- **Đừng** để `@page{ margin: 0 }` chung với `print.css`. Paged.js đọc cả `@page` nằm trong `@media print`, nên luật đó ghi đè mẫu trang và cả sách dồn lại còn ~18 trang. Nó nằm riêng trong `print-output.css`, chỉ nạp sau khi phân trang xong.
- **Đừng** ẩn `#book`: Paged.js giữ nguyên `id="book"` trong bản sao của trang đầu, nên `#book{display:none}` xoá luôn trang bìa.
- Đầu chương nằm trong `<header class="ch-head">` với `break-inside/break-after: avoid` — nếu tách rời, số chương có thể bị bỏ lại cuối trang trước.

## Bản EPUB (máy đọc sách)

```bash
node tools/build-epub.mjs                  # → the-brewing-bible.epub
node tools/build-epub.mjs out/ban-doc.epub
```

EPUB 3 dựng thẳng từ `content/part-*.js`, không cần gói npm — chỉ cần `zip` trong PATH. Sinh ra một file cho mỗi chương (28), một file cho mỗi phần (8), bìa, `nav.xhtml` (mục lục EPUB 3) và `toc.ncx` (cho máy đọc cũ và Kindle). Giao diện cho e-ink nằm trong [epub.css](epub.css) — dùng số thứ tự của máy đọc thay vì `counter` của CSS, tránh `flex` vì nhiều máy đọc bỏ qua.

Kiểm định bằng epubcheck 5.1.0: 0 lỗi, 0 cảnh báo (EPUB 3.3).

**Đưa vào máy đọc:**

- **Kindle** — gửi file tới địa chỉ `@kindle.com` của máy (Send to Kindle), hoặc dùng `Send to Kindle` trên macOS/Windows. Kindle không đọc EPUB trực tiếp nhưng dịch vụ gửi sẽ tự chuyển sang AZW3.
- **Kobo** — cắm cáp, chép vào thư mục chính của máy, hoặc dùng Calibre.
- **Apple Books** — mở file bằng Books, hoặc AirDrop sang iPhone/iPad.
- **Boox / PocketBook / máy Android** — chép file vào máy rồi mở bằng ứng dụng đọc.

Nếu muốn bản `.azw3` hoặc `.kepub` riêng, chuyển bằng Calibre từ chính file EPUB này — không cần dựng lại từ đầu.

## Chạy tại máy

Không cần build. Chỉ cần một static server:

```bash
python3 -m http.server 8137
```

Rồi mở http://127.0.0.1:8137/

## Giấy phép

Nội dung và mã nguồn: dùng tự do cho mục đích cá nhân và phi thương mại.
