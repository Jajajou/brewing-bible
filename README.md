# The Brewing Bible

Một cuốn sách thực hành về **pour over** và **cupping** — 8 phần, 30 chương, và một phụ lục nguồn tham chiếu.

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
| III — Chiết xuất | Ba con số; huyền thoại "acid trước, đắng sau"; mô hình ba chiều; cỡ xay | 4 |
| IV — Cupping | Nó đo gì; quy trình tại nhà; đọc ly; giới hạn | 4 |
| V — Pour over | Ngâm vs chảy; dụng cụ; kỹ thuật rót; công thức; công thức vô địch; đọc bã; chẩn đoán | 7 |
| VI — Cầu nối | Quy trình 20 phút; bốn luật của công thức nền; case study | 3 |
| VII — Cảm nhận | Giải phẫu một ngụm; ngôn ngữ nốt hương; xây khẩu vị | 3 |
| VIII — Sổ tay | Nhật ký pha; dụng cụ; checklist khi thất bại | 3 |
| A — Nguồn tham chiếu | Cách lập danh mục; thư mục 54 nguồn; đối chiếu từng chương; chỗ cần sửa | 4 |

## Tính năng

- Mục lục cố định, theo dõi chương đang đọc và đánh dấu chương đã đọc (lưu trong máy)
- Tìm kiếm toàn văn, xếp hạng theo tiêu đề → lede → số lần lặp
- Chế độ tối, chỉnh cỡ chữ
- Thanh tiến độ đọc
- Điều hướng bằng phím ← → ; nhấn `/` để tìm
- **Bản in**: Ctrl/Cmd + P cho ra bản in nhanh; hoặc tải bản dàn trang A5 sẵn ở [the-brewing-bible.pdf](the-brewing-bible.pdf)
- **In các mẫu điền tay**: mỗi mẫu (nhật ký pha, phiếu cupping, tóm tắt bao cà) có nút *In mẫu này* ngay dưới khối — mở trang in riêng, mỗi bản một tờ A5
- **Ba ngôn ngữ trên web**: tiếng Việt, tiếng Anh, tiếng Nhật — chọn ở góc phải thanh trên, lựa chọn được nhớ trong máy
- **Hình minh hoạ**: biểu đồ SVG vẽ bằng nét, in ra sắc nét và đổi màu theo giao diện sáng/tối. Vài hình có thanh trượt trên web (phân bố kích thước hạt, máy tính tỉ lệ); bản PDF và EPUB nhận bản tĩnh cùng nội dung

## Cấu trúc

```
index.html            khung trang web
styles.css            toàn bộ giao diện web
book.js               router, mục lục, tìm kiếm, tiến độ
content/part-*.js     nội dung 8 phần + phụ lục (dữ liệu JS)
REFERENCES.md         danh mục nguồn dạng đọc ngoài trình duyệt (nguồn gốc của phụ lục)
content/en/text.js    bản dịch tiếng Anh (chỉ dùng cho bản web)
content/ja/text.js    bản dịch tiếng Nhật (chỉ dùng cho bản web)
i18n.js               chuỗi giao diện ba thứ tiếng
figures.js            hình minh hoạ: SVG + thanh trượt trên web (dùng chung cho web, PDF, EPUB)

tpl.html / tpl.js     trang in một mẫu điền tay: mỗi bản một tờ A5, chọn số bản

print.html            khung bản in A5 (dùng chung content/)
print.css             dàn trang A5: khổ, lề, chạy đầu trang, số trang, mục lục có số trang
print.js              dựng bìa → mục lục → phần → chương cho bản in
print-output.css      luật chỉ áp lúc in (lề 0) — nạp sau khi phân trang xong
epub.css              giao diện bản EPUB (e-ink)
build-pdf.sh          một lệnh xuất ra PDF
tools/print-pdf.mjs   xuất PDF qua Chrome DevTools (chờ Paged.js xong mới in)
tools/serve.mjs       static server cho bước in (giữ kết nối, có Content-Length)
tools/check-pdf.mjs   kiểm bản in: trang trắng lạc chỗ, đoạn bị cắt, font chưa nhúng
tools/build-epub.mjs  dựng EPUB 3 (nav, ncx, từng chương một file)
tools/check-i18n.mjs  so cấu trúc bản dịch với bản gốc (bảng, danh sách, đoạn)
tools/check-refs.mjs  kiểm trích dẫn: số hiệu chết, nguồn mồ côi, và đối chiếu DOI với Crossref
tools/bump-assets.mjs đặt mọi ?v= về short SHA của commit (--check cho CI)
search.js             bỏ dấu, chấm điểm, xếp hạng, cắt snippet (không đụng DOM)
tests/logic.test.mjs  test cho fold, xếp hạng và numLabel — chạy bằng node --test
vendor/paged.polyfill.js  Paged.js 0.4.3 (phân trang trong trình duyệt)
CHANGELOG.md          lịch sử thay đổi, quy ước số bản
LICENSE               CC BY-NC-SA 4.0 cho nội dung, MIT cho mã
og.png                ảnh chia sẻ 1200×630
```

Nội dung nằm trong các file `content/part-N.js` dưới dạng dữ liệu — thêm chương chỉ cần thêm một object vào mảng `chapters`.

## Bản dịch

Bản gốc là tiếng Việt. Bản dịch nằm trong `content/en/text.js` và `content/ja/text.js`, **chỉ dùng cho bản web** — PDF và EPUB vẫn là tiếng Việt.

Mỗi file dịch có cùng cấu trúc: `parts` (tiêu đề phần) và `chapters` (tiêu đề, lede, phút đọc, tag, thân bài). Chương chưa có `body` sẽ hiện thông báo "chưa dịch" kèm link sang bản tiếng Việt, nên có thể đẩy lên web từng phần một mà không sợ trang vỡ.

**Trạng thái:** tiếng Anh đủ **34/34** (30 chương + 4 chương phụ lục); tiếng Nhật **3/34** có thân bài (Phần I — Hạt), 34/34 có tiêu đề.

Quy ước thuật ngữ và ba nhãn bằng chứng nằm ở [TRANSLATION.md](TRANSLATION.md). Trước khi commit một phần đã dịch:

```bash
node tools/check-i18n.mjs        # cả en và ja
node tools/check-i18n.mjs en     # chỉ một ngôn ngữ
```

Script so từng chương với bản gốc: số bảng, số hàng, số `<li>`, số `<strong>`, số đoạn, và độ dài trong khoảng cho phép. Lệch là báo lỗi — dấu hiệu bị bỏ sót một hàng bảng hoặc một đoạn văn.

## Trích dẫn

```bash
node tools/check-refs.mjs             # kiểm tất cả
node tools/check-refs.mjs --offline   # chỉ kiểm nội bộ, không gọi mạng
node tools/check-refs.mjs --refresh   # bỏ cache, gọi lại Crossref
```

Ba lớp, từ rẻ tới đắt:

1. **Liên kết nội bộ.** Mỗi `[n]` trong thân bài phải trỏ tới một mục có thật trong phụ lục A2, và mỗi mục trong A2 phải được ít nhất một dòng khẳng định dẫn tới. Số hiệu chết thì người đọc thấy ngay; nguồn mồ côi thì không ai thấy cho tới khi có người tra ngược và không biết nó đỡ câu nào.
2. **Bản dịch.** Số hiệu thư mục của bản EN phải trùng bản VI.
3. **Crossref.** Với mỗi DOI: tựa, năm, tập, trang phải khớp những gì sách in. Đây là lớp bắt lỗi con người không bắt — một chữ số trong năm, một trang đánh nhầm, một DOI chết hoặc đã đổi chủ.

Kết quả cache ở `.refs-cache.json` (đã gitignore) trong 30 ngày; lượt chạy đầu gọi khoảng 31 request, các lượt sau gần như tức thì.

**Giới hạn phải nói rõ:** lớp 3 kiểm *thư mục*, không kiểm việc bài báo có nói đúng câu sách nói. Muốn kiểm điều đó thì phải đọc nguồn — xem mục "Lượt kiểm" trong [REFERENCES.md](REFERENCES.md).

### Quy ước version asset

Các thẻ `<link>` và `<script>` trong `index.html`, `print.html`, `tpl.html` và trong `book.js`, `tpl.js` có hậu tố `?v=`. GitHub Pages cache asset 10 phút, nên sau khi sửa `styles.css`, `book.js` hoặc file nội dung, đặt lại hậu tố rồi push — người đọc nhận bản mới ngay thay vì chờ cache hết hạn.

```bash
node tools/bump-assets.mjs          # mọi ?v= → short SHA của commit hiện tại
node tools/bump-assets.mjs --check  # không ghi, chỉ báo nếu các giá trị lệch nhau
```

Một số duy nhất cho tất cả 30 thẻ, thay cho 10 số khác nhau như trước. CI chạy `--check` trên mỗi push: lệch nhau là đỏ.

Số được ghi là commit tại **thời điểm bump**, không phải commit chứa nó — bump xong thì commit mới lại có SHA khác. Điều duy nhất cần đúng là mọi thẻ mang cùng một số.

## Bản in A5 (PDF)

```bash
./build-pdf.sh                  # → the-brewing-bible.pdf
./build-pdf.sh out/ban-in.pdf    # đường dẫn khác
SHOT_PAGE=6 ./build-pdf.sh       # kèm ảnh trang 6 ra /tmp/shot-6.png để soi lỗi
SKIP_CHECK=1 ./build-pdf.sh      # bỏ bước tự kiểm (khi máy chưa có poppler)
BOOK_VER=1.0.0 ./build-pdf.sh    # in "1.0.0" thay cho commit
```

Bìa và chân mỗi trang mang số bản đang dựng: mặc định là `git describe --tags --always --dirty`, nên một bản dựng từ cây làm việc chưa commit tự khai là `-dirty` thay vì giả làm bản phát hành. Khi phát hành, tag commit trước rồi dựng (`git tag v1.0.0 && ./build-pdf.sh`) để bản trong tay người đọc mang số `v1.0.0` chứ không phải một chuỗi commit đã bị squash mất.

Mở `print.html` bằng tay thì bìa ghi "Bản nháp (chưa dựng PDF)" và không có số ở chân trang — không bịa số cho một bản chưa tồn tại.

Script tự bật một static server tạm ([tools/serve.mjs](tools/serve.mjs) — Paged.js không chạy được với `file://`), dựng trang, **chờ Paged.js phân trang xong** rồi mới in. Cần Chrome/Chromium, Node 18+ và poppler-utils (`pdftotext`, `pdfinfo`, `pdffonts`) cho bước tự kiểm.

Bản dàn trang: khổ A5 148×210 mm, lề 17/16/18 mm, chạy đầu trang theo tên phần, số trang chân, mục lục có số trang thật (dùng `target-counter`), bìa và trang phần riêng. Hiện **174 trang**, trong đó 7 trang trắng chèn để mỗi phần mở ở trang lẻ.

### Quy trình chống hỏng

Bản in từng hỏng theo kiểu âm thầm: Paged.js không chạy, hoặc một file nội dung không nạp kịp, và script vẫn in ra một file PDF thiếu nguyên một phần. Bốn lớp chặn, theo thứ tự chạy:

1. **Kiểm file trước khi dựng** — `build-pdf.sh` đọc `print.html`, xác nhận mọi file `.js`/`.css` nó trỏ tới đều có thật. Thiếu file thì dừng ngay trong một giây, không mất 40 giây dựng rồi mới biết.
2. **Server giữ kết nối** — `python3 -m http.server` trả lời HTTP/1.0 và đóng kết nối sau mỗi request; với 12 file nạp song song, Chrome thỉnh thoảng nhận `ERR_CONNECTION_RESET` và một script không chạy. `tools/serve.mjs` khai `Content-Length` và giữ kết nối. Đây là nguyên nhân gốc của phần lớn lần hỏng trước đây (3/5 lần đo được); sau khi đổi, 12 lần dựng liên tiếp đều sạch và đều ra đúng số trang của bản đó.
3. **Nạp lại tại chỗ** — `print-pdf.mjs` đo lại số trang và số phần sau mỗi lần nạp; chưa đạt thì nạp lại ngay trong cùng phiên Chrome (tối đa `PDF_ATTEMPTS`, mặc định 3), không in ra bản thiếu. `build-pdf.sh` kiểm lại lần nữa và chỉ in `✓` khi đủ trang và đủ phần.
4. **Kiểm sau khi dựng** — `tools/check-pdf.mjs` đọc lại chính file PDF vừa ra (không tin log) và kiểm ba thứ: trang trắng có nằm đúng chỗ chèn không, có đoạn văn nào bị cắt mất không (so từng đoạn trong `content/` với văn bản rút ra từ PDF), font đã nhúng chưa. Chạy riêng cũng được: `node tools/check-pdf.mjs out/ban-in.pdf`.

### Giới hạn đã biết

- **Chữ tiêu đề nhỏ không tìm kiếm được.** Các nhãn như `CHƯƠNG 1–9 · HẠT, NƯỚC…` dùng `letter-spacing`; khi rút chữ, trình đọc chen khoảng trắng giữa từng ký tự nên tìm `CHƯƠNG` không ra. Chữ trong thân bài tìm và copy bình thường. Muốn hết hẳn thì bỏ `letter-spacing` ở `.eyebrow`/`.tbl-cap` trong `print.css` — đánh đổi bằng mất kiểu chữ giãn hiện tại.
- **Font trong PDF là Type 3.** Chrome không nhúng được font biến thiên (Google Fonts phục vụ Fraunces/Newsreader/Inter dạng variable), nên nó vẽ từng glyph thành Type 3. Chữ vẫn vector, vẫn tìm được, in vẫn nét; nhưng nhà in khó tính đôi khi đòi Type 1/TrueType. Muốn đổi phải tự host font tĩnh rồi bỏ Google Fonts.

Muốn xem bản dàn trang ngay trong trình duyệt: mở `print.html`. Thêm `?pdf=1` để thấy đúng những gì PDF nhận.

Vài điều dễ vấp nếu sửa `print.css`:

- **Đừng** để `@page{ margin: 0 }` chung với `print.css`. Paged.js đọc cả `@page` nằm trong `@media print`, nên luật đó ghi đè mẫu trang và cả sách dồn lại còn ~18 trang. Nó nằm riêng trong `print-output.css`, chỉ nạp sau khi phân trang xong.
- **Đừng** ẩn `#book`: Paged.js giữ nguyên `id="book"` trong bản sao của trang đầu, nên `#book{display:none}` xoá luôn trang bìa.
- Đầu chương nằm trong `<header class="ch-head">` với `break-inside/break-after: avoid` — nếu tách rời, số chương có thể bị bỏ lại cuối trang trước.

## Mẫu in được

Sách có bốn mẫu điền tay: phiếu ghi cupping, nhật ký một lần pha, bản nhật ký đầy đủ, và tóm tắt mỗi bao cà. Bản giấy chỉ có một bản mỗi mẫu — muốn dùng thì phải photo cả trang sách. Trên web, mỗi mẫu có nút **In mẫu này** ngay dưới khối.

Nút mở [tpl.html](tpl.html) với ba tham số:

```
tpl.html?ch=<id chương>&i=<thứ tự khối trong chương>&n=<số bản>
```

`n` để trống thì mặc định 1 bản; `&n=100` mở sẵn 100 tờ, in một lần là có cả cuốn sổ. Trang này tự chứa (không phụ thuộc trang đang đọc), nên link gửi thẳng cho người in cũng chạy.

Mỗi tờ là khổ A5, có dòng nhận dạng trên đầu (tên sách + tên chương) để lẫn giấy vẫn biết tờ nào của mẫu nào, và lề/giãn dòng đã tính để mẫu dài nhất vừa đúng một trang — tràn sang trang hai thì mỗi bản in ra hai tờ, không dùng được.

**Thêm một mẫu mới:** đặt khối trong `content/part-N.js` (và bản dịch tương ứng) với thuộc tính `data-tpl`, ví dụ `<div class="formula" data-tpl="1">`. `book.js` tự thêm nút cho mọi khối có thuộc tính này, `tpl.js` lấy đúng khối theo thứ tự trong chương. Không cần sửa gì khác.

## Bản EPUB (máy đọc sách)

```bash
node tools/build-epub.mjs                  # → the-brewing-bible.epub
node tools/build-epub.mjs out/ban-doc.epub
```

EPUB 3 dựng thẳng từ `content/part-*.js`, không cần gói npm — chỉ cần `zip` trong PATH. Sinh ra một file cho mỗi chương (33, gồm 4 chương phụ lục đánh số A1–A4), một file cho mỗi phần (9), bìa, `nav.xhtml` (mục lục EPUB 3) và `toc.ncx` (cho máy đọc cũ và Kindle). Giao diện cho e-ink nằm trong [epub.css](epub.css) — dùng số thứ tự của máy đọc thay vì `counter` của CSS, tránh `flex` vì nhiều máy đọc bỏ qua.

Kiểm định bằng epubcheck 5.1.0: 0 lỗi, 0 cảnh báo (EPUB 3.3).

**Đưa vào máy đọc:**

- **Kindle** — gửi file tới địa chỉ `@kindle.com` của máy (Send to Kindle), hoặc dùng `Send to Kindle` trên macOS/Windows. Kindle không đọc EPUB trực tiếp nhưng dịch vụ gửi sẽ tự chuyển sang AZW3.
- **Kobo** — cắm cáp, chép vào thư mục chính của máy, hoặc dùng Calibre.
- **Apple Books** — mở file bằng Books, hoặc AirDrop sang iPhone/iPad.
- **Boox / PocketBook / máy Android** — chép file vào máy rồi mở bằng ứng dụng đọc.

Nếu muốn bản `.azw3` hoặc `.kepub` riêng, chuyển bằng Calibre từ chính file EPUB này — không cần dựng lại từ đầu.

## Kiểm tự động (CI)

Mỗi push và mỗi pull request chạy [.github/workflows/checks.yml](.github/workflows/checks.yml):

```bash
node --test                         # logic tìm kiếm: bỏ dấu, xếp hạng, nhãn số
node tools/check-i18n.mjs           # cấu trúc bản dịch so với bản gốc
node tools/check-refs.mjs --offline # số hiệu chết, nguồn mồ côi, số hiệu EN
node tools/bump-assets.mjs --check  # mọi ?v= phải cùng một số
```

Ba script và bộ test chạy không cần mạng, không cần `npm install`, không cần trình duyệt. Lượt đối chiếu DOI với Crossref không nằm trong CI — nó gọi 31 request ra ngoài và là việc chạy tay.

## Chạy tại máy

Không cần build. Chỉ cần một static server:

```bash
python3 -m http.server 8137
```

Rồi mở http://127.0.0.1:8137/

## Thay đổi

Lịch sử và quy ước số bản ở [CHANGELOG.md](CHANGELOG.md). Số bản in trên bìa PDF chính là số ở đó — cầm bản giấy thì đối chiếu được.

## Giấy phép

Hai phần, hai giấy phép — chi tiết và ranh giới ở [LICENSE](LICENSE):

- **Nội dung** (chương, hình, PDF, EPUB): [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/). Được đọc, chép, dịch, tặng — miễn là ghi nguồn, không bán, và bản phái sinh mang cùng giấy phép.
- **Mã nguồn** (`book.js`, `search.js`, `tools/`, CSS): MIT. Dùng thoải mái, kể cả trong dự án thương mại.

Muốn dịch hoặc in tặng: được, không cần xin phép, chỉ cần ghi nguồn và giữ nguyên điều kiện phi thương mại.
