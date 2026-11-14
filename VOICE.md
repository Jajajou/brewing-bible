# Đọc thành tiếng

Bản web hiện tại là để **đọc bằng mắt**. Tài liệu này là spec cho một bản **nghe** — cùng nội dung, nhưng qua loa, tai nghe, hoặc TTS. Nó không nói về công nghệ giọng đọc; nó nói về **cái gì được đọc ra và đọc theo thứ tự nào**, vì đó là phần quyết định bản nghe tự nhiên hay vô nghĩa.

Số đo lấy trực tiếp từ `content/part-*.js` (30.10.2026):

| Thứ | Số lượng | Vấn đề khi đọc thẳng |
|---|---|---|
| Bảng | 52 | Không đọc được theo hàng ngang như mắt quét |
| Khung (callout) | 59 | Đọc cả tiêu đề lẫn thân thành hai câu rời |
| Cụm trong ngoặc tròn | 370 | Chỉ 33 cụm đơn vị là chắc chắn phải đọc nguyên văn |
| Ký hiệu cần đổi thành lời | °C, µm, ppm, HCO₃⁻, 20 : 300, 90%, [24] | TTS đọc sai hoặc đọc từng ký tự |
| Badge mức bằng chứng | 35 | Chen giữa câu, cắt đôi mệnh đề |

## 0. Một nguyên tắc, ba hệ quả

> **Tai không có thanh cuộn.**

Mắt đọc bảng thì quét, so, quay lại. Tai nghe thì chỉ có một dòng chảy tuyến tính, không lùi được, không nhìn được, không bỏ qua được. Ba hệ quả:

1. **Không lùi được** → mỗi câu phải tự đứng một mình. "Như bảng trên" phải thành "như vừa nói".
2. **Không nhìn được** → thông tin chỉ có nghĩa khi nhìn thấy (màu hạt, vết dầu, độ sáng) phải được **nói thành lời** hoặc **bỏ hẳn**, không để lửng.
3. **Không im được** → cái gì cũng đọc là hỏng. Bản nghe hay hơn bản đọc không phải vì đọc nhiều hơn, mà vì **bỏ đúng chỗ**.

Nguyên tắc dẫn xuất cho mọi quyết định dưới đây: *nếu bỏ đi mà người nghe không mất thông tin nào khác có thể lấy lại được → bỏ.*

## 1. Ngoặc tròn: 370 cụm, phần lớn không đọc

Ngoặc tròn trong văn viết là **chú thích cho mắt**: nó nói "phần này phụ, đọc nhanh hoặc bỏ qua". Khi đọc thành tiếng, dấu ngoặc biến mất, nên cái "phụ" và cái "chính" nghe y hệt nhau. Đó là lý do phải phân loại trước.

### 1.1 Bảy loại và cách xử lý

| Loại | Số cụm | Ví dụ thật trong sách | Xử lý |
|---|---|---|---|
| **Diễn giải tiếng Việt** | 173 | `(ít hơn, chất lượng cao hơn)`, `(nhiệt đới, rượu, gia vị)`, `(nóng)` | **Tuỳ**: có vị ngữ → tách thành câu riêng; cụm danh từ ngắn → đọc liền, bỏ ngoặc; ví dụ nhắc lại → bỏ |
| **Thuật ngữ gốc tiếng Anh** | 61 | `(washed)`, `(immersion)`, `(roasted on)` | Đọc **lần xuất hiện đầu**, các lần sau bỏ, giữ từ Việt |
| **Năm** | 52 | `(2023)`, `(2026)` | **Bỏ 51, đọc 1** — xem ghi chú dưới bảng |
| **Đơn vị / số đo** | 33 | `(95–96 °C)`, `(60–90 s)`, `(0:30–1:30)` | **Luôn đọc**, đổi ký hiệu thành lời (mục 1.3) |
| **Số thứ tự liệt kê** | 21 | `(1)`, `(2)`, `(3)` | Đọc thành *"thứ nhất… thứ hai…"*, không đọc "mở ngoặc một" |
| **Chỉ đường** | 19 | `(xem chương 4)`, `(Phần IV)` | **Bỏ** ở bản nghe tuần tự |
| **Ký hiệu / công thức** | 11 | `(HCO₃⁻)`, `(Ca²⁺, Mg²⁺)`, `(D90 − D10)`, `(as CaCO₃)` | **Đổi thành tên**, không đọc ký tự (mục 1.3) |

Ba trường hợp riêng, dễ đọc sai nhất:

- **Số thứ tự trong câu** — `(1)`, `(2)`, `(3)`: đây không phải chú thích mà là **phép liệt kê**. `"Hai lý do: (1) mỗi lần pha riêng có sai số…; (2) nước RO không có clo…"` → đọc là *"Hai lý do. Thứ nhất, … Thứ hai, …"*. Tuyệt đối không đọc "mở ngoặc một".
- **Năm** — 51 trong 52 cụm nằm ở danh mục nguồn và phải bỏ, vì phụ lục đó không đọc (mục 2, kiểu E). **Nhưng đừng bỏ theo quy tắc**: cụm còn lại ở part-2, *"Đại học Copenhagen (2026)"*, định ngày cho bằng chứng — bỏ đi là mất thông tin người nghe cần để đánh giá. Đọc thành *"một nghiên cứu năm hai nghìn không trăm hai mươi sáu"*. Một ngoại lệ trong 52 là đúng kiểu bẫy mà một quy tắc viết vội sẽ mắc.
- **Cụm lặp nhiều lần** — `(kiểm tra lỗi)` xuất hiện 3 lần, `(chương 3)` 3 lần. Cái lặp lại thì lần thứ hai trở đi gần như luôn dư.

### 1.2 Quy tắc quyết định (dùng được cho script)

Với mỗi cụm trong ngoặc, theo đúng thứ tự này:

```
1. Là số đo / đơn vị?              → đọc, đổi ký hiệu thành lời
2. Là ký hiệu hoá học / công thức? → đọc thành tên
3. Là chỉ đường (xem/chương/phần)? → bỏ
4. Là năm trong danh mục nguồn?    → bỏ
5. Là thuật ngữ gốc tiếng Anh?
     - lần đầu trong sách          → đọc, nối bằng "tức là" / "hay còn gọi là"
     - lần sau                     → bỏ
6. Còn lại (diễn giải tiếng Việt):
     - cụm có động từ / mệnh đề   → tách khỏi ngoặc, thành câu riêng
     - cụm danh từ ngắn, bổ nghĩa → đọc liền, bỏ ngoặc, thêm dấu phẩy
     - là ví dụ đã có ở câu chính  → bỏ
```

Áp vào một câu thật (chương sơ chế, part-1):

> **Bản in:** Ướt (washed) — bóc vỏ và lớp nhầy trước khi phơi — sạch, acid rõ, hương "cao" và trong. Trái cây sáng nhưng không ngọt kiểu mứt.
>
> **Bản nghe:** Sơ chế ướt, hay còn gọi là washed: bóc vỏ và lớp nhầy trước khi phơi. Ly cà ra sạch, acid rõ, hương cao và trong, trái cây sáng nhưng không ngọt kiểu mứt.

Cùng một câu, bốn quyết định khác nhau: `(washed)` đọc vì là lần đầu; dấu gạch ngang thành dấu hai chấm; "cao" bỏ ngoặc kép; và câu thứ hai tách ra vì nó đã dài.

### 1.3 Bảng đổi ký hiệu thành lời

Đây là phần TTS hỏng nhiều nhất nếu để nguyên. Không đổi thì máy đọc "xằng" hoặc đọc từng ký tự.

| Trong sách | Đọc là |
|---|---|
| `95–96 °C` | chín mươi lăm đến chín mươi sáu độ C |
| `~70 °C` | khoảng bảy mươi độ C |
| `&lt; 100 µm` | dưới một trăm micromet |
| `60–90 s` | sáu mươi đến chín mươi giây |
| `~50 ppm` | khoảng năm mươi phần triệu |
| `120 mg/L` | một trăm hai mươi miligam trên lít |
| `90%` | chín mươi phần trăm |
| `20 : 300` | hai mươi gam trên ba trăm gam |
| `2:30` | hai phút ba mươi |
| `HCO₃⁻` | bicarbonate |
| `Ca²⁺, Mg²⁺` | canxi và magie |
| `MgSO₄·7H₂O` | magie sunfat ngậm bảy nước |
| `D90 − D10` | phân vị chín mươi trừ phân vị mười |
| `[24]` | bỏ; nếu cần thì "một nghiên cứu" |
| `Cân + một cuốn sổ` | cân, và một cuốn sổ |
| `14/03` | mười bốn tháng ba |

**Chỗ dễ sai nhất: tỉ lệ và thời gian viết giống hệt nhau.** Tỉ lệ pha là `1:16`, mốc thời gian rót là `1:30` — cùng cú pháp, cùng độ dài, **không có dấu cách để phân biệt**. Trong content có 86 cụm dạng `N:NN`; tỉ lệ luôn là `1:1x` (1:13 đến 1:18, có khi 1:13,3), còn lại là phút:giây. Vậy luật phải dựa vào **khoảng giá trị**, không vào hình thức. `tools/audio-text.mjs` làm đúng thế và có test riêng cho ranh giới: `1:18` là tỉ lệ, `1:30` là phút.

Kiểu thứ ba, chỉ có trong bảng công thức vô địch (part-5 #5): `20&nbsp;:&nbsp;300` — tỉ lệ liều:nước, **có** dấu cách. Ở đó khoảng trắng là tín hiệu thật, nhưng nó là ngoại lệ, không phải quy tắc chung.

## 2. Bảng: năm kiểu đọc, không phải 52 cách

Phân loại theo **cách người đọc dùng bảng**, không theo số cột. Cùng 3 cột nhưng "ướt / khô / honey" và "dKH 1 / 2 / 3" phải đọc khác hẳn nhau.

### 2.0 Mỗi bảng cần một câu dẫn

Không bao giờ đọc một bảng mà không nói trước nó là gì. Câu dẫn phải trả lời **hai** điều, gói trong một câu:

1. Bảng này để làm gì (so sánh? tra cứu? thang đo?)
2. Nghe theo hướng nào (theo từng mục, theo từng thuộc tính, theo thứ tự thời gian)

Ví dụ đúng: *"Bảng sau so ba kiểu sơ chế. Nghe lần lượt từng kiểu."*
Ví dụ sai: *"Bảng 1."* hoặc *"Dưới đây là bảng."*

Bảng dài (từ 6 hàng trở lên) nên có thêm **một câu chốt** ở cuối nói gộp lại thì thành cái gì — vì người nghe không tự gộp được như mắt.

### Kiểu A — Hồ sơ (19 bảng)

**Cột đầu là một *thứ*; các cột sau mô tả thứ đó.** Đọc trọn từng hàng, nêu tên hàng trước.

Cột tiêu đề **không đọc thành nhãn** mà biến thành mẫu câu:

| Cột | Thành lời |
|---|---|
| `Dụng cụ` | "V60: …" |
| `Cơ chế` | "…, cơ chế percolation hình nón, …" |
| `Hệ quả trong ly` | "… Ly cà ra …" |
| `Hợp với` | "… Hợp với …" |

Ví dụ thật — part-5 #1, dòng V60:

> **Bản in:** Hario V60 | Percolation, nón | Sáng, tách bạch, nhiều hương | Thấp | Người có kinh nghiệm, cà chất lượng cao
>
> **Bản nghe:** Hario V60 — chạy theo kiểu percolation, hình nón. Ly cà sáng, tách bạch, nhiều hương. Đây là dụng cụ ít tha thứ: hợp với người đã có kinh nghiệm và cà chất lượng cao.

Chú ý: "Tha thứ? — Thấp" phải thành **một câu** ("ít tha thứ"), không phải "Tha thứ: thấp". Ô chỉ có một từ thì phải được nhét vào câu, nếu không sẽ nghe như danh sách rời.

### Kiểu B — Ma trận và đối chiếu (8 bảng)

Hàng là **thuộc tính** (độ xốp, độ sáng, hậu vị), cột là **mức hoặc lựa chọn** (ba mức rang, hai kiểu pha, hai cực của một trục, ba mốc điểm 1/3/5).

Bốn trong tám bảng loại này có **ô góc trên trái để trống** (`<th></th>`) — `part-1 #1`, `part-3 #5`, `part-4 #4`, `part-5 #0`. Đó là dấu hiệu chắc chắn nhưng **chỉ bắt được một nửa**: bốn bảng còn lại (`part-7 #1`, `part-7 #2`, `part-8 #0`, và `part-4 #5`) ghi nhãn ở cột đầu ("Trục") hoặc không có cột nhãn. Script lọc theo `<th></th>` sẽ bỏ sót, nên phần còn lại phải do người xếp.

Đọc **theo hàng**, vì so sánh dọc không tồn tại trong âm thanh: người nghe không giữ được cột "rang đậm" trong đầu để so với cột "rang sáng" ở câu sau.

> **Bản in:** (∅) | Rang sáng | Trung bình | Rang đậm
> Độ xốp | Thấp, hạt nặng | Trung bình | Cao, hạt nhẹ
>
> **Bản nghe:** Bảng này so ba mức rang theo từng thuộc tính. Về độ xốp: rang sáng thì độ xốp thấp, hạt nặng; rang trung bình ở giữa; rang đậm thì hạt xốp, nhẹ. …

Với ma trận chỉ có **hai mức** — `part-3 #5`, `part-4 #4`, `part-5 #0` — không đọc kiểu "thuộc tính → A → B" mà đọc thành **cặp đối lập**, tự nhiên hơn nhiều:

> `Xay mịn hơn được gì | Xay mịn hơn mất gì` → "Xay mịn hơn thì lấy ra nhiều hơn, nhưng đổi lại dễ bị đắng và dễ tắc."

**Một bảng trong nhóm này đọc khác hẳn:** `part-4 #5` không có cột nhãn — mỗi hàng là một **cặp đối chiếu**, "Cupping cho bạn biết" ở cột trái, "không cho bạn biết" ở cột phải. Đọc thành một câu có "nhưng":

> "Cupping cho bạn biết con cà có tiềm năng gì — nhưng không cho biết liệu bạn có chạm được cái trần đó bằng pour-over hay không."

Bảng 6 hàng như part-1 #1 **phải có câu chốt**, vì sau sáu thuộc tính người nghe đã quên thuộc tính đầu:

> "Gộp lại: từ sáng đến đậm, hạt càng xốp, càng nhả nhanh, acid càng giảm, đắng nền càng tăng — và cửa sổ pha thành công hẹp lại."

### Kiểu C — Chẩn đoán (11 bảng)

**Độc giả đến với một triệu chứng và tìm đúng hàng của mình.** Cột đầu là cái họ đang thấy, cột sau là việc phải làm.

Đọc thành **nếu–thì**, không đọc thành danh sách:

> "Nếu ly cà loãng, như nước trà — nguyên nhân thường là nồng độ thấp. Việc đầu tiên: chỉnh tỉ lệ. Việc thứ hai: xay mịn hơn."

Hai bảng vượt ngưỡng và **phải cắt**: part-5 #9 (12 hàng) và part-8 #4 (10 hàng). Mười hai dòng "nếu–thì" liên tiếp là 90 giây không có điểm tựa. Cách xử lý:

1. Đọc **5 hàng phổ biến nhất** (loãng; chua xanh; đắng chát; vừa chua vừa đắng; đắng ở cuối ly).
2. Một câu chốt: *"Còn bảy trường hợp nữa — rút quá nhanh, rút quá chậm, hương đẹp nhưng hậu vị ngắn — nằm trong bảng đầy đủ trên trang này."*
3. Không đọc hết rồi mới nói "còn nữa", vì lúc đó người nghe đã bỏ đi.

### Kiểu D — Thang / trình tự (10 bảng)

**Thứ tự các hàng chính là nội dung**: các nấc nhiệt độ, các mốc thời gian sau rang, thang thời gian rút, ba mức ngân sách, các cỡ hạt từ mịn đến thô.

Đừng đọc từng hàng thành câu riêng — đọc **cả thang trong một hơi**, vì đó chính là điều bảng muốn nói:

> **Bản in:** Dưới 30 giây | 30–60 giây | 60–90 giây | Trên 90 giây
>
> **Bản nghe:** Đọc theo thang: dưới ba mươi giây là xay quá thô, hoặc channeling nặng; ba mươi đến sáu mươi là bình thường; sáu mươi đến chín mươi là hơi chậm; trên chín mươi giây là nghẹt.

### Kiểu E — Không đọc (4 bảng)

- **part-7 #3** — bảng nhật ký để trống (Ngày / Cà / Một câu). Nói đúng một câu: *"Tiếp theo là trang để bạn tự ghi — ngày, tên cà, và một câu về ly cà. Không có gì để đọc."*
- **part-9 #0, #1, #2** — ba bảng phụ lục nguồn (Ch. / Khẳng định / Nhãn / Nguồn / Kết luận). Đọc lên là 41 dòng toàn `[15] [16] [17]`. Thay bằng một câu: *"Phụ lục này đối chiếu từng khẳng định với nguồn. Bảng đầy đủ ở cuối sách."*

### 2.6 Giới hạn cứng

| Ngưỡng | Hành động |
|---|---|
| > 6 hàng | Bắt buộc câu chốt ở cuối |
| > 8 hàng | Phải nhóm hoặc cắt (kiểu C) |
| > 100 chữ số trong một bảng | Đọc chọn lọc, trỏ tới bản có màn hình |
| Ô rỗng / `—` | Bỏ qua, đừng đọc "không có" |
| Bảng 2 cột | Nhãn và giá trị phải nằm trong **cùng một câu**; đừng đọc nhãn, nghỉ, rồi đọc giá trị |

### 2.7 Bảng khó nhất trong sách

**part-5 #5** — sáu dòng vô địch pha chế, 6 cột, **136 chữ số**: `2021 · Matt Winton (Thuỵ Sĩ) | nón kim loại | 20 : 300 | hai ấm, ấm phụ thấp hơn vài °C | Kinu 3.6 · C40 ~30 click | 50 g bloom 35 s, rồi 70 g, rồi 3 × 60 g`.

Đọc cả sáu dòng là gần như không thể theo. Cách làm:

- Dẫn: *"Sáu công thức vô địch, từ 2021 đến 2026. Đây là loại bảng nên xem bằng mắt — nhưng có ba điểm đáng nghe."*
- Đọc **hai** dòng trọn vẹn (2021 và 2024 — hai trường phái khác nhau rõ nhất).
- Ba câu chốt về **xu hướng**, thứ mà mắt cũng phải tự rút ra: liều 14–20 g cho 200–300 g nước; nhiệt ngày càng cao; cấu trúc rót ngày càng chia nhỏ.

Nguyên tắc tổng quát cho bảng số dày: **đọc xu hướng, không đọc số.**

## 3. Khung: 59 cái, năm màu

Phân bố: `ok` 23, `warn` 15, `act` 13, `bad` 5, không màu 3. Tất cả đều có tiêu đề. Dài trung bình 257 ký tự, dài nhất 564.

Khung là chỗ bản nghe dễ hỏng nhất, vì tiêu đề khung được in **chữ hoa, giãn chữ** — mắt hiểu đó là "khung", nhưng TTS chỉ thấy một câu ngắn, và đọc nó thành câu riêng thì nghe như người nói bỗng hét lên rồi đổi giọng.

### 3.1 Thẻ hay mệnh đề — quyết định tất cả

Trước khi đọc bất kỳ khung nào, hỏi: tiêu đề là **cái thẻ** (nhãn dán lên khung) hay là **nửa đầu của một câu** (mà thân khung là nửa sau)?

| Loại tiêu đề | Dấu hiệu | Cách đọc |
|---|---|---|
| **Thẻ** | danh từ, không có vị ngữ: *Bài tập nhỏ, Vòng xoáy điển hình, Huyền thoại: để cà phê trong tủ lạnh* | Dẫn bằng một cụm nói, rồi đọc thân như câu độc lập |
| **Mệnh đề** | bắt đầu bằng *Nếu / Vì sao / Quy tắc / Đây là* | **Nối bằng dấu hai chấm thành một câu**, không ngắt |
| **Câu hỏi** | kết thúc bằng `?`: *Bằng chứng ở mức nào?* | Giữ nguyên câu hỏi, nghỉ một nhịp, rồi thân trả lời |

Đây là chỗ quyết định. Cùng một khung, đọc sai kiểu là hỏng:

> **Sai:** "Quy tắc một câu. Rang càng sáng, bạn càng cần nhiều năng lượng…"
> **Đúng:** "Có một quy tắc gói trong một câu: rang càng sáng, bạn càng cần nhiều năng lượng để lấy ra hương vị…"

### 3.2 Năm kiểu dẫn

Câu dẫn sinh ra từ **màu khung + tiêu đề**, không phải câu mẫu cố định. Mười lăm khung `warn` mà khung nào cũng mở bằng "Lưu ý:" thì đến cái thứ tư người nghe đã lọc mất.

| Loại | Vai trò | Cách dẫn (xoay vòng, đừng lặp) |
|---|---|---|
| `act` (13) | việc phải làm ngay | "Thử cái này:" · "Trước khi đi tiếp, làm một việc:" · "Bài tập:" |
| `ok` (23) | điều cốt lõi, câu chốt | "Nếu bạn chỉ nhớ một điều:" · "Đây là điểm chính:" · gộp thẳng vào câu: "Nói gọn:" |
| `warn` (15) | chỗ dễ hiểu nhầm | "Một chỗ dễ hiểu nhầm:" · "Cần nói rõ:" · "Nhưng có một ngoại lệ:" |
| `bad` (5) | hiểu nhầm, cái bẫy | "Một hiểu nhầm phổ biến:" · "Đây là cái bẫy:" · "Sai:" |
| không màu (3) | ghi chú bên lề | "Một điều đáng nói:" · "Ghi chú:" |

`ok` chiếm 23/59 — nhiều nhất, và cũng dễ sáo nhất. Với `ok`, cách tốt nhất thường là **không dẫn gì cả** mà nối luôn vào câu trước: thân khung vốn đã là câu chốt, thêm "Đây là điểm chính" chỉ làm loãng.

### 3.3 Khung dài: bốn cái vượt 400 ký tự

Bốn khung vượt 400 ký tự — **564** (part-2), **469** (part-3), **459** (part-4), **435** (part-6) — và mười bốn khung vượt 300.

Ca nặng nhất là 564 ký tự, khung "Bằng chứng ở mức nào?": khoảng 45 giây liên tục, và bên trong nó có **ba** ý — nội dung nghiên cứu, giới hạn của nó, và hệ quả cho cuốn sách. Đọc liền một hơi thì ý thứ ba rơi mất.

Quy tắc: khung > 400 ký tự thì **cắt theo ý, mỗi ý một câu, và câu cuối phải nêu hệ quả** — thứ mà bản in để người đọc tự rút ra.

### 3.4 Badge mức bằng chứng (35 cái)

`<span class="tier tier-a">Bằng chứng</span>` nằm **giữa câu**, ngay trước dấu chấm:

> "…cho thấy bicarbonate là yếu tố chi phối cảm nhận hương vị, trong khi việc thêm canxi ở mức cao không tạo ra khác biệt cảm quan đáng kể **[Bằng chứng]**."

Đọc nguyên vị trí thì câu bị chặt làm đôi ngay trước khi kết thúc. Hiện `prepare()` chưa xử lý badge — đo thật: `"…không tạo ra khác biệt cảm quan đáng kể Bằng chứng ."`, chữ "Bằng chứng" chen vào giữa và có khoảng trắng trước dấu chấm.

Ba lựa chọn, theo thứ tự ưu tiên:

1. **Bỏ** trong dòng chảy chính (mặc định). Độ tin cậy đã được nói bằng lời ở câu trước hoặc sau.
2. Chuyển xuống **cuối câu**, thành mệnh đề: "…không tạo ra khác biệt cảm quan đáng kể — đây là mức bằng chứng mạnh."
3. Chỉ đọc khi **cả đoạn** dựa vào nó để phản biện một niềm tin phổ biến.

Badge là nhãn phân loại, không phải nội dung. Mặc định: bỏ.

## 4. Cái khung bạn dán: đọc thế nào

Khung này là ca khó nhất trong cả sách, vì nó ngắn, nó là `act` (việc phải làm), và **tiêu đề của nó là một mệnh đề điều kiện bị bỏ lửng** — thân khung chính là vế sau.

> **Bản in:**
> `NẾU BẠN CHỈ CÓ MỘT THỨ`
> Mua cân. Bỏ qua mọi thứ khác. Cân + một cuốn sổ là đủ để học được 90% những gì cuốn sách này nói.

**Cách đọc dở** (máy đọc mặc định):

> "Nếu bạn chỉ có một thứ. Mua cân. Bỏ qua mọi thứ khác. Cân cộng một cuốn sổ là đủ để học được chín mươi phần trăm…"

Hai câu lệnh rời nhau, và cái điều kiện "nếu bạn chỉ có một thứ" treo lơ lửng — người nghe không biết nó gắn với "mua cân" hay với cả khung. Ba câu liên tiếp cùng một kiểu câu mệnh lệnh nghe như đang bị ra lệnh.

Bản cài đặt hiện tại đã đỡ hơn một nửa: `speakable()` đổi `callout-title` thành `"Nếu bạn chỉ có một thứ:"` và xuống đoạn. Dấu hai chấm đúng hướng, nhưng **vẫn còn chỗ ngắt đoạn**, nên câu vẫn bị treo. Muốn nối thật thì phải xử lý ở mức khối — xem mục 5.

**Cách tôi sẽ đọc:**

> "Nếu bạn chỉ định mua đúng một thứ — thì mua cân. Bỏ qua mọi thứ khác. Cân, và một cuốn sổ, là đủ để học được chín mươi phần trăm những gì cuốn sách này nói."

Bốn thay đổi, mỗi cái có lý do:

1. **Nối tiêu đề với thân bằng "thì"**, không ngắt. Điều kiện và hệ quả thành một câu, đúng như một người nói với bạn.
2. **"chỉ có" → "chỉ định mua"**. Bản in viết tắt vì tiêu đề phải ngắn; nói ra thì "chỉ có một thứ" mơ hồ — một thứ gì? Thêm hai chữ là rõ, và không sai ý.
3. **`+` → "và"**, đọc chậm hai bên bằng dấu phẩy. "Cân cộng một cuốn sổ" nghe như phép tính; "cân, và một cuốn sổ" nghe như một bộ đồ nghề.
4. **`90%` → "chín mươi phần trăm"**. Không đổi thì máy đọc "chín không phần trăm" hoặc "chín mươi phần trăm" tuỳ engine — không được để tuỳ engine.

Và **không cần câu dẫn riêng**, dù quy tắc ở mục 3.2 nói khung `act` nên có. Lý do: tiêu đề đã tự làm việc dẫn ("nếu bạn chỉ có một thứ" chính là câu giới thiệu), thêm một câu nữa thành hai lần mở đầu cho một khung bốn giây. Quy tắc dẫn áp cho khung **cần** được giới thiệu, không phải mọi khung — và đây là ví dụ cho thấy nên đọc quy tắc chứ không máy móc chạy nó.

## 5. Cài đặt: cái gì đã có, cái gì còn thiếu

Lớp text đã có sẵn: `tools/audio-text.mjs` (`speakable`, `normalize`, `prepare`) với 20 test trong `tools/audio-text.test.mjs` — chạy `node --test tools/audio-text.test.mjs`, 20/20 xanh. Nó lo đúng phần khó nhất là chuẩn hoá ký hiệu, và có sẵn cơ chế `data-audio` để khai câu đọc cho khối không đọc được bằng máy.

| Việc | Trạng thái | Đo được |
|---|---|---|
| Đơn vị: °C, µm, ppm, %, mg/L, m² | **xong** | `93 °C` → "93 độ C" |
| Tỉ lệ vs thời gian | **xong** | `1:16` → "1 trên 16"; `1:30` → "1 phút 30" |
| Tên đọc sai (EY, TDS, pour over, fines…) | **xong** | đo bằng ASR trên audio thật |
| Ký hiệu hoá học | **xong** | `HCO₃⁻` → "bi-cac-bô-nát" |
| **Bảng** | **xong** | 49/49 `table-wrap` có câu đọc; `speakable()` bỏ hết phần còn lại |
| **3 bảng trần part-9** | **đã vá** | trước đây `prepare()` đọc bừa `"Ch. Nguồn 1 [15] [16]"`; giờ có câu đọc riêng |
| **recipe / formula / stat-grid** | **xong** | 6 / 10 / 3 khối, mỗi khối một câu |
| **Khung** | **một nửa** | tiêu đề + dấu hai chấm + **xuống đoạn**, chưa nối bằng "thì" |
| **Badge `tier`** | **chưa** | `"…đáng kể Bằng chứng ."` |
| `[n]`, `(xem chương …)`, `+` giữa câu | **chưa** | `"([24])"` đọc nguyên cả ngoặc |

Đã viết **71 câu đọc**: 52 bảng, 6 recipe, 10 formula, 3 stat-grid. Mỗi câu nằm trong `data-audio` của chính khối đó, nên `speakable()` đọc câu ấy thay cho việc cắt từng ô. Cả 34 chương chạy `prepare()` cho `skipped` rỗng — không còn khối nào bị bỏ im lặng hay đọc bừa.

Một chỗ phải sửa ngoài content: `figures.js` so khớp nguyên văn `<div class="recipe">` để chèn hình sau khối công thức. Thêm `data-audio` là chuỗi đó không còn khớp, và hình tụt xuống cuối chương — im lặng, không lỗi. Đã đổi sang khớp thiếu dấu đóng thẻ, và kiểm lại: hình vẫn nằm giữa recipe và `h3` kế tiếp.

Còn lại, theo thứ tự nên làm:

1. **Khung** (59 cái) chưa có câu đọc riêng — hiện chỉ được thêm dấu hai chấm. Khung `act` có tiêu đề là mệnh đề (như khung ở mục 4) vẫn bị ngắt đoạn giữa điều kiện và hệ quả.
2. **Badge `tier`** — 35 chỗ, đọc ra `"…đáng kể Bằng chứng ."`. Sửa một luật trong `normalize()`.
3. **`[n]` và `(xem chương …)`** — 22 chỗ trong thân bài. Riêng hai chương phụ lục nguồn có 149 cụm `[n]` là nội dung thật của danh mục; cần quyết định đọc hay bỏ cả chương đó.

## 6. Những thứ chưa bàn (và một dòng quan điểm mỗi thứ)

Ngoài ba phạm vi trên, sách còn mấy thành phần mà bản nghe phải xử lý. Chưa làm, nhưng không nên để trống:

| Thành phần | Số lượng | Quan điểm |
|---|---|---|
| `class="recipe"` — quy trình pha có tham số | 6 | Đọc **tham số trước, các bước sau**, và đọc bước bằng "đầu tiên / sau đó / cuối cùng" thay vì số thứ tự |
| `class="formula"` | 10 | Phải viết lại thành lời; đọc nguyên công thức là vô nghĩa |
| Trích dẫn `[n]` trong thân bài | 3 | Bỏ; thay bằng "một nghiên cứu" |
| Tiêu đề chương, `lede`, `minutes`, `tags` | 34 chương | `lede` đọc thành lời dẫn; `tags` và `minutes` **bỏ** khi nghe liên tục |
| Mục lục, chuyển chương | — | Cần câu chuyển riêng; đọc "Phần III" rồi "chương 12" hai lần là thừa |

## 7. Bảng kiểm trước khi phát hành

Chạy qua danh sách này trên một chương bất kỳ trước khi tin bản nghe:

- [ ] Không còn `[n]`, `(2023)`, `(xem chương …)` nào được đọc ra
- [ ] Mọi `°C`, `µm`, `ppm`, `%`, `:` tỉ lệ đã đổi thành lời
- [ ] Mỗi bảng có **câu dẫn** nêu mục đích + hướng nghe
- [ ] Bảng từ 6 hàng trở lên có **câu chốt**
- [ ] Bảng > 8 hàng đã được cắt, không đọc trọn
- [ ] Không bảng nào đọc cột tiêu đề thành nhãn rời ("Cơ chế: percolation")
- [ ] Không tiêu đề khung nào bị đọc thành câu riêng khi nó là mệnh đề
- [ ] Không hai khung `warn` liên tiếp mở bằng cùng một câu dẫn
- [ ] Không badge `tier` nào chen giữa câu
- [ ] Không câu nào còn "như bảng trên", "như hình bên"
- [ ] Nghe thử một chương 8 phút liền: có chỗ nào phải tua lại vì không hiểu? Đó là chỗ cần sửa.

## Phụ lục A — 52 bảng, xếp loại

Số thứ tự là **thứ tự xuất hiện trong file**, đếm từ 0 — đúng thứ mà `document.querySelectorAll("table")[i]` trả về. Dùng cột "Kiểu" để tra cách đọc ở mục 2.

| Phần | # | Cột × hàng | Kiểu | Ghi chú |
|---|---|---|---|---|
| part-1 | 0 | 3 × 4 | A | Sơ chế — mỗi hàng một kiểu chế biến |
| part-1 | 1 | 4 × 6 | B | Ba mức rang; **cần câu chốt** |
| part-1 | 2 | 2 × 5 | C | Dấu hiệu bằng mắt — cân nhắc bỏ hẳn khi nghe |
| part-1 | 3 | 3 × 5 | D | Trục thời gian sau rang |
| part-2 | 0 | 3 × 3 | A | Thành phần nước; ký hiệu hoá học, xem 1.3 |
| part-2 | 1 | 3 × 4 | A | Chỉ số mục tiêu — số là nội dung, đọc hết |
| part-2 | 2 | 4 × 2 | A | So hai mẫu nước |
| part-2 | 3 | 3 × 7 | D | Thang dKH — đọc thành dải, không đọc 7 nấc |
| part-2 | 4 | 3 × 2 | A | Hai cách lọc nước |
| part-2 | 5 | 4 × 5 | A | Nước theo nhãn — nặng số, đọc kỹ phần "% pha" |
| part-2 | 6 | 2 × 5 | C | Tình huống → việc cần làm |
| part-2 | 7 | 2 × 4 | C | Kết quả thử mù → nghĩa là |
| part-3 | 0 | 2 × 4 | C | Nguyên nhân đắng |
| part-3 | 1 | 4 × 3 | A | Ba chiều của vị |
| part-3 | 2 | 3 × 5 | C | Triệu chứng → chiều lệch → đòn bẩy |
| part-3 | 3 | 3 × 3 | A | Ba con số của cỡ xay |
| part-3 | 4 | 3 × 6 | D | Thang cỡ hạt bằng vật quen thuộc — đọc rất tốt bằng lời |
| part-3 | 5 | 3 × 3 | B | Ma trận 2 cột → đọc thành cặp đối lập |
| part-4 | 0 | 2 × 10 | A | Thang cupping 10 mục — dài, cần chốt |
| part-4 | 1 | 3 × 3 | D | Trình tự ngửi trong lúc pha |
| part-4 | 2 | 2 × 5 | C | Vị lạ → nguyên nhân |
| part-4 | 3 | 2 × 3 | D | Thang nhiệt độ |
| part-4 | 4 | 3 × 8 | B | Cupping vs pour over; **cần câu chốt** |
| part-4 | 5 | 2 × 5 | B | Cupping cho biết / không cho biết — đọc thành cặp |
| part-5 | 0 | 3 × 5 | B | Immersion vs percolation |
| part-5 | 1 | 5 × 7 | A | Bảy dụng cụ — đọc trọn từng dụng cụ |
| part-5 | 2 | 3 × 4 | D | Thang độ cao rót |
| part-5 | 3 | 3 × 4 | A | Bốn kiểu rót |
| part-5 | 4 | 3 × 5 | A | Năm ý tưởng rót |
| part-5 | 5 | 6 × 6 | A⚠ | **Khó nhất sách** — 136 chữ số, đọc 2 dòng + xu hướng |
| part-5 | 6 | 3 × 7 | A | Cái gì chép được từ công thức vô địch |
| part-5 | 7 | 3 × 5 | C | Hình dạng bã → nghĩa → việc làm |
| part-5 | 8 | 2 × 4 | D | Thang thời gian rút — ví dụ mẫu ở kiểu D |
| part-5 | 9 | 4 × 12 | C⚠ | **12 hàng — phải cắt còn 5** |
| part-5 | 10 | 3 × 6 | A | Sự cố theo từng dụng cụ |
| part-6 | 0 | 2 × 5 | C | Quan sát bã → điều chỉnh |
| part-6 | 1 | 3 × 3 | A | Ba lớp thay đổi |
| part-6 | 2 | 3 × 3 | D | Trình tự trong một lần pha |
| part-6 | 3 | 4 × 3 | A | Đổi từ A sang B — đọc thành "từ … sang …" |
| part-6 | 4 | 2 × 3 | C | Bã → nghĩa là |
| part-7 | 0 | 4 × 3 | D | Nhiệt độ → hương / vị / dùng để |
| part-7 | 1 | 3 × 4 | B | Hai cực của bốn trục |
| part-7 | 2 | 3 × 4 | B | Cùng bốn trục, lời khuyên theo cực |
| part-7 | 3 | 3 × 3 | E | **Mẫu nhật ký để trống — không đọc** |
| part-8 | 0 | 4 × 4 | B | Bốn trục × ba mức neo 1/3/5 |
| part-8 | 1 | 3 × 4 | A | Bốn thứ nên mua trước |
| part-8 | 2 | 2 × 7 | A | Bảy thứ không cần mua |
| part-8 | 3 | 3 × 3 | D | Thang ngân sách |
| part-8 | 4 | 3 × 10 | C⚠ | **10 hàng — phải cắt** |
| part-9 | 0 | 5 × 15 | E | **Phụ lục nguồn — không đọc** |
| part-9 | 1 | 5 × 14 | E | Phụ lục nguồn |
| part-9 | 2 | 5 × 12 | E | Phụ lục nguồn |

Tổng: **A 19 · B 8 · C 11 · D 10 · E 4** = 52.

## Phụ lục B — Số đo

| Chỉ số | Giá trị |
|---|---|
| Bảng | 52 (2 cột: 12 · 3 cột: 27 · 4 cột: 8 · 5 cột: 4 · 6 cột: 1) |
| Bảng có ô góc trống (ma trận) | 4 — part-1 #1, part-3 #5, part-4 #4, part-5 #0 |
| Khung | 59 (`ok` 23 · `warn` 15 · `act` 13 · `bad` 5 · không màu 3) |
| Khung dài nhất / trung bình | 564 / 257 ký tự |
| Khung > 400 / > 300 ký tự | 4 / 14 |
| Cụm trong ngoặc | 370 (diễn giải 173 · tiếng Anh 61 · năm 52 · đơn vị 33 · số thứ tự 21 · chỉ đường 19 · ký hiệu 11) |
| Badge `tier` | 35 (a 22 · b 9 · c 4) |
| `recipe` / `formula` / `blockquote` | 6 / 10 / 2 |
| Trích dẫn `[n]` | 152 (149 ở phụ lục nguồn, 3 trong thân bài) |
| Khối đã có `data-audio` | **71** (52 bảng · 6 recipe · 10 formula · 3 stat-grid) |
| Chương | 34, trong 9 phần |
