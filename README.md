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
- **Đồng hồ pha & máy tính**: [brew.html](brew.html) đếm giây theo đúng mốc thời gian của hai công thức trong sách (V60 khớp tỉ lệ cupping, và cupping 8 phút), bíp ở mỗi bước, đổi tổng nước thì mọi mốc gam đổi theo; kèm máy tính tỉ lệ và mức chiết EY từ TDS
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

journal.html          nhật ký pha trên điện thoại: form, ảnh bã, xuất/nhập bản sao
guide.html            hướng dẫn dựng đồng bộ + câu hỏi hay gặp cho nhật ký pha
journal.js            trang nhật ký: DOM + IndexedDB + nén ảnh
journal-core.js       logic thuần của nhật ký: tỉ lệ, thời gian, CSV, đóng gói bản sao

brew.html             đồng hồ pha theo bước + máy tính tỉ lệ và mức chiết
brew.js               trang đồng hồ: đếm giây, bíp theo bước, giữ màn hình sáng
brew-core.js          logic thuần: tỉ lệ, EY ⇄ TDS, lịch từng bước của hai công thức
tests/brew-core.test.mjs  test cho brew-core.js (chạy bằng node --test)

manifest.webmanifest  thêm trang nhật ký vào màn hình chính điện thoại
icon.svg              biểu tượng của manifest và favicon
tests/journal-core.test.mjs  test cho journal-core.js (chạy bằng node --test)

print.html            khung bản in A5 (dùng chung content/)
print.css             dàn trang A5: khổ, lề, chạy đầu trang, số trang, mục lục có số trang
print.js              dựng bìa → mục lục → phần → chương cho bản in
print-output.css      luật chỉ áp lúc in (lề 0) — nạp sau khi phân trang xong
epub.css              giao diện bản EPUB (e-ink)
build-pdf.sh          một lệnh xuất ra PDF
tools/print-pdf.mjs   xuất PDF qua Chrome DevTools (chờ Paged.js xong mới in)
tools/serve.mjs       static server cho bước in và bản nghe (giữ kết nối, Content-Length, Range)
tools/check-pdf.mjs   kiểm bản in: trang trắng lạc chỗ, đoạn bị cắt, font chưa nhúng
tools/build-epub.mjs  dựng EPUB 3 (nav, ncx, từng chương một file)
tools/check-i18n.mjs  so cấu trúc bản dịch với bản gốc (bảng, danh sách, đoạn)
tools/check-refs.mjs  kiểm trích dẫn: số hiệu chết, nguồn mồ côi, và đối chiếu DOI với Crossref
tools/bump-assets.mjs đặt mọi ?v= về short SHA của commit (--check cho CI)
tools/audio-text.mjs  rút text đọc được từ HTML và chuẩn hoá ký hiệu cho TTS
tools/book-content.mjs nạp content/part-*.js cho hai script audio
tools/build-audio.mjs sinh bản nghe: cổng hash, Opus 24 kbps, hai giọng
tools/check-audio.mjs nghe lại chính file vừa sinh bằng ASR, so từng từ
tools/tts-worker.py   tiến trình Python sinh một chương (VieNeu-TTS)
tools/asr-worker.py   tiến trình Python nghe lại một file (faster-whisper)
audio/manifest.json   hash + số byte + số giây của từng file audio
audio/vi/<giọng>/<ch-id>.opus  một file mỗi chương mỗi giọng
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

## Nhật ký pha trên điện thoại

[journal.html](journal.html) là sổ ghi lần pha mở bằng điện thoại: bảy dòng của mẫu trong chương “Nhật ký pha”, bốn trục vị, và một ô chụp bã. Trang tĩnh, không tài khoản, không gọi mạng — không có server nào nhận dữ liệu.

**Lưu ở đâu.** IndexedDB của chính trình duyệt đang mở. Đó là bộ nhớ của *một* trình duyệt trên *một* máy: xoá dữ liệu trình duyệt là mất, và iOS xoá IndexedDB sau khoảng bảy ngày không mở nếu trang chưa được thêm vào màn hình chính (`manifest.webmanifest` có sẵn cho việc đó). Vì vậy **Xuất bản sao** không phải tính năng phụ — đó là bản sao duy nhất. Trang tự nói điều này với người dùng ngay trên đầu, và gọi `navigator.storage.persist()` sau lần lưu đầu.

**Ảnh bã.** Chụp bằng `<input type="file" capture="environment">` — mở thẳng camera, không cần app. Ảnh nén tại máy bằng canvas: cạnh dài 1200 px, JPEG 0,75 (khoảng 150–250 KB), cộng bản thu nhỏ 320 px cho danh sách. Ảnh gốc 4–8 MB không bao giờ vào cơ sở dữ liệu. `createImageBitmap` với `imageOrientation: "from-image"` để ảnh chụp dọc không nằm ngang.

**Xuất và nhập.** Bản sao `.html` tự chứa: dữ liệu JSON trong một thẻ `script` cùng ảnh dạng data URL — mở được bằng trình duyệt hai mươi năm nữa, đọc được bằng mắt, và nhập lại được bằng chính trang này. Không dùng ZIP vì repo không có thư viện nào và tự viết ZIP là thêm một chỗ để sai. CSV để mở bằng bảng tính, một hàng một lần pha; số thập phân dùng dấu chấm (máy đặt dấu phẩy làm phân cách thập phân sẽ đọc “16,7” thành hai cột). Nhập lại thì bản ghi trùng `id` bị bỏ qua, nên nhập hai lần không nhân đôi.

**Hai file.** `journal-core.js` là logic thuần — tỉ lệ, thời gian, kiểm dữ liệu, CSV, đóng gói bản sao — và được test bằng `node --test` trong CI như `search.js`. `journal.js` chỉ còn DOM, IndexedDB và nén ảnh; phần đó vẫn chỉ kiểm bằng mắt, cùng lý do đã ghi ở `tests/logic.test.mjs`.

**Giọng chữ.** Font hệ thống, không tải Google Fonts: trang này phải mở được khi mạng trong bếp chập chờn. Giao diện tiếng Việt; nút sáng/tối dùng chung khoá `nuocba.theme` với trang sách.

**Đồng bộ (tuỳ chọn).** Trang đẩy được mỗi lần pha lên một Google Sheet của người dùng, ảnh bã lên Drive, qua một Apps Script tự dựng — không có server trung gian. Cách dựng có [guide.html](guide.html) — bản đọc trên web, kèm câu hỏi hay gặp; thứ tự cột, mô hình bảo mật và giới hạn ở [SYNC.md](SYNC.md); máy nhận ở [tools/apps-script/Code.gs](tools/apps-script/Code.gs), và `node tools/mock-sync.mjs` dựng máy nhận giả để kiểm phần này mà không cần tài khoản Google.

Thêm trang mới có asset thì nhớ thêm tên vào `FILES` của [tools/bump-assets.mjs](tools/bump-assets.mjs) và gắn `?v=` — `journal.html` đã được thêm.

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

## Bản nghe (audio)

Mỗi chương có một file Opus 24 kbps mono, hai giọng đọc. Trang vẫn tĩnh: chỉ một thẻ `<audio>` trỏ vào file, không SDK, không API key, không gọi dịch vụ ngoài. Thanh nghe nằm dưới hàng nhãn chương và chỉ hiện khi manifest có file cho chương đó.

```bash
node tools/build-audio.mjs --dry                 # xem sẽ đọc gì, không sinh
node tools/build-audio.mjs --only ch-chiet-xuat  # một chương, hai giọng
node tools/build-audio.mjs --voice female        # một giọng, cả sách
node tools/check-audio.mjs --only ch-chiet-xuat  # nghe lại bằng ASR
```

**Cổng hash.** Mỗi file được ghi kèm hash của text đã chuẩn hoá + giọng + định dạng trong `audio/manifest.json`. Chạy lại chỉ sinh chương có chữ đổi — sửa một lỗi chính tả không ghi lại 34 file. `--force` để bỏ qua cổng.

**Text đọc được** không phải thân bài HTML. `tools/audio-text.mjs` rút từ HTML rồi chuẩn hoá: `1:16` thành "1 trên 16" (tỉ lệ) nhưng `1:30` thành "1 phút 30" (thời gian), `HCO₃⁻` thành "bi-cac-bô-nát", `EY` thành "i-oai". Bảng, công thức, recipe chỉ đọc câu trong `data-audio` của chính khối — 71 câu đã viết cho 52 bảng, 6 recipe, 10 formula, 3 stat-grid. Badge mức bằng chứng, trích dẫn `[n]` và `(xem chương …)` bị bỏ. Câu đúc kết (`div.pull`, 13 khối) đọc bằng giọng khác, 1,1 s lặng hai bên.

Test cho lớp này: `node --test tools/audio-text.test.mjs`.

**Máy sinh.** VieNeu-TTS v3 Turbo (Apache 2.0, © pnnbao-ump), chạy CPU, không cần GPU, không cần torch. Dựng môi trường một lần:

```bash
mkdir -p ~/vieneu && cd ~/vieneu
uv venv --python 3.12 .venv      # phải là 3.12; transformers 4.57.6 không chạy trên 3.14
uv pip install --python .venv/bin/python vieneu "transformers==4.57.6"
# rồi trỏ build-audio vào môi trường đó
VIENEU_PYTHON=~/vieneu/.venv/bin/python node tools/build-audio.mjs
```

Lần chạy đầu tải ~500 MB weights về `~/.cache/huggingface/`. Đo trên MacBook Pro M1 16 GB: nạp model ~10–35 s, RTF 0,35–0,45; cả sách ~168.000 ký tự ≈ 4 giờ audio mỗi giọng, ~1,5 giờ máy. Giọng đã chọn: **Thiền Tâm Đức** (nam) và **Mai Anh** (nữ) cho thân bài, **Thiện Minh** cho câu đúc kết.

**Vòng kiểm** không tin log của bước sinh: `tools/check-audio.mjs` giải mã file vừa ra, cho faster-whisper nghe lại, rồi so từng từ với text đã đưa vào TTS. **Lệch ~10% là bình thường** — phần lớn là ASR viết lại khác (`hoà`/`hòa`, `bốn`/`4`, `ti-đi-ét`/`TDS`). Lỗi thật là khi ASR nghe ra từ khác nghĩa. Ngưỡng mặc định 80%; dưới ngưỡng thì script thoát mã 1 kèm các chỗ lệch. ASR cũng sai, nên nghi ngờ thì phải nghe bằng tai.

Riêng một loại lỗi **không** bị tỉ lệ khớp bắt: máy tự thêm chữ. Một câu 9 từ thêm vào chỉ làm tỉ lệ rớt chưa đến 1 %, nhưng tai nghe ra ngay — bản đầu của chương 7 mắc cả hai kiểu: giọng nữ lặp “18 đến hai mươi hai mươi hai”, giọng nam đọc thêm “hãy đăng ký kênh…”. Vì vậy một đoạn không khớp nguồn từ nào mà dài từ 5 từ là lỗi cứng (`⚠ máy TỰ THÊM`), thoát mã 1 kể cả khi tỉ lệ chung trên ngưỡng. Sửa bằng cách sinh lại đúng file đó.

**Giới hạn đã biết.**

- **Chỉ có tiếng Việt.** Bản EN/JA chưa có audio, và thanh nghe không hiện ở hai bản đó.
- **A2 "Thư mục" không đọc nguyên văn.** 24.000 ký tự toàn tên tác giả và DOI — nghe mười lăm phút không ai theo được. Bản nghe thay bằng một câu nói đúng chỗ, khai trong `tools/book-content.mjs`.
- **Chưa ai nghe bằng tai.** Vòng ASR bắt được lỗi phát âm như `1:16` → "một giờ mười sáu phút", nhưng nó không biết giọng có dễ chịu hay không. Nghe một chương trước khi phát hành.
- **Ngoặc tròn trong thân bài đọc nguyên vị trí.** "(nóng)", "(washed)" được đọc cả cặp ngoặc; quy tắc phân loại 370 cụm trong [VOICE.md](VOICE.md) mục 1.2 mới làm phần chỉ đường, năm và trích dẫn.

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

- **Nội dung** (chương, hình, PDF, EPUB, bản nghe): [CC BY-NC-SA 4.0](https://creativecommons.org/licenses/by-nc-sa/4.0/). Được đọc, chép, dịch, tặng — miễn là ghi nguồn, không bán, và bản phái sinh mang cùng giấy phép.
- **Mã nguồn** (`book.js`, `search.js`, `tools/`, CSS): MIT. Dùng thoải mái, kể cả trong dự án thương mại.

Bản nghe sinh bằng **VieNeu-TTS v3 Turbo** (Apache 2.0, © pnnbao-ump). Giọng preset cũng Apache 2.0 — dùng thương mại được, người nói đã đồng ý. Giấy phép của model không ràng buộc gì thêm lên audio sinh ra, nhưng ghi nguồn cho đúng là việc nên làm.

Muốn dịch hoặc in tặng: được, không cần xin phép, chỉ cần ghi nguồn và giữ nguyên điều kiện phi thương mại.

**Hình vay từ bên ngoài.** Hai hình mới trong `figures.js` dựa vào tài liệu của người khác:

- **Bánh xe hương vị** (`flavor-wheel`, chương “Ngôn ngữ nốt hương”) vẽ lại *cấu trúc* bánh xe của SCA và World Coffee Research (bản 2016). **Không** chép tác phẩm gốc: bánh xe của SCA là CC BY-NC-ND 4.0, cấm bản phái sinh và cấm dùng thương mại — đúng như phụ lục A5 đã ghi. Dòng nguồn nằm ngay dưới hình, không chỉ ở đây.
- **Bản đồ chiết xuất** (`brew-map`, chương “Chiết xuất”) là hình của sách. Hai khoảng 18–22% và 1,15–1,35% là chuẩn Golden Cup mà SCA dẫn lại từ Lockhart (1957); biểu đồ kiểm soát pha của SCA không có giấy phép tái bản nên không dùng ảnh của họ.

Nếu sau này muốn in bánh xe **gốc** của SCA thì phải xin phép SCA: bán là dùng thương mại.
