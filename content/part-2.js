window.BOOK_PARTS = window.BOOK_PARTS || [];

window.BOOK_PARTS.push({
  id: "phan-2",
  roman: "II",
  title: "Nước",
  blurb: "98% ly cà phê của bạn là nước",
  chapters: [

  {
    id: "ch-nuoc",
    title: "Nước: biến số bị xem nhẹ nhất",
    lede: "Một ly cà phê pha theo tỉ lệ 1:16 chứa khoảng 94% nước. Người ta dành hàng giờ để chọn cà phê và vài giây để chọn nước.",
    minutes: 9,
    tags: ["nước", "hóa học"],
    body: `
<p>Hãy đếm số thứ bạn đã mua để pha cà phê: cân, ấm, phễu, giấy lọc, máy xay, có thể là một chiếc nhiệt kế. Rồi đếm số thứ bạn đã mua để cải thiện <em>nước</em>. Với hầu hết người uống, con số thứ hai là không.</p>

<p>Đó là một sự mất cân đối kỳ lạ, vì nước là thành phần lớn nhất trong ly. Và nước không trơ — nó là một dung môi hoạt động, mang theo khoáng chất tương tác trực tiếp với các hợp chất trong cà phê.</p>

<h3>Ba thứ trong nước ảnh hưởng đến cà phê</h3>

<p>Nước máy hoặc nước đóng chai chứa hàng chục chất hoà tan. Nhưng chỉ ba nhóm thật sự quan trọng:</p>

<div class="table-wrap">
<table>
<thead><tr><th>Thành phần</th><th>Ảnh hưởng</th><th>Mức quan trọng</th></tr></thead>
<tbody>
<tr><td><strong>Bicarbonate (HCO₃⁻)</strong><br>đo bằng <em>alkalinity</em></td><td>Trung hoà acid hữu cơ. Cao → mất vị trái cây, tăng cảm giác đắng và "phẳng".</td><td><strong>Quan trọng nhất</strong></td></tr>
<tr><td><strong>Canxi, Magiê (Ca²⁺, Mg²⁺)</strong><br>đo bằng <em>độ cứng</em></td><td>Mg bám vào hợp chất hương và kéo chúng vào nước. Nhưng ảnh hưởng cảm quan nhỏ hơn người ta tưởng.</td><td>Trung bình</td></tr>
<tr><td><strong>Clo, cloramin</strong></td><td>Mùi hoá chất, phá huỷ hương thơm.</td><td>Dễ xử lý</td></tr>
</tbody>
</table>
</div>

<p>Ngoài ra pH có ảnh hưởng, nhưng nhỏ và <em>bị chi phối bởi alkalinity</em>. Nếu alkalinity thấp, pH sẽ tự ổn. Đuổi theo pH trước là đuổi theo triệu chứng thay vì nguyên nhân.</p>

<h3>Alkalinity: thứ thật sự quan trọng</h3>

<p><strong>Alkalinity</strong> (độ kiềm) là khả năng trung hoà acid của nước — chủ yếu nhờ ion bicarbonate. Đây là một phép đo <em>khả năng đệm</em>, không phải nồng độ một chất cụ thể. Đơn vị thường dùng trong ngành cà phê là <strong>ppm as CaCO₃</strong>.</p>

<p>Cơ chế rất trực tiếp: acid hữu cơ trong cà phê — citric, malic, acetic, lactic, chlorogenic — chính là những hợp chất tạo cảm giác tươi sáng, trái cây, và "sống". Bicarbonate trung hoà chúng theo phản ứng:</p>

<div class="formula">
<span class="fx-label">Phản ứng trung hoà</span>
HCO₃⁻ + H⁺ → H₂CO₃ → CO₂ + H₂O
</div>

<p>Nói cách khác: <strong>alkalinity cao biến acid của bạn thành khí CO₂ và nước.</strong> Bạn mất vị trái cây, và phần còn lại là vị rang, vị đắng, và một cảm giác "đầy nhưng không có gì".</p>

<div class="callout ok">
<p class="callout-title">Bằng chứng ở mức nào?</p>
<p>Đây là một trong số ít những khẳng định trong cuốn sách có nền tảng vững. Nghiên cứu cảm quan có kiểm soát của Christina Rune và cộng sự, Đại học Copenhagen (2026), cho thấy <strong>bicarbonate là yếu tố chi phối cảm nhận hương vị</strong>, trong khi việc thêm canxi ở mức cao — cao hơn cả nước uống thông thường — <em>không</em> tạo ra khác biệt cảm quan đáng kể <span class="tier tier-a">Bằng chứng</span>. Đây cũng là nghiên cứu đầu tiên kiểm chứng bằng cảm quan có kiểm soát đúng cái vùng nước mà ngành vẫn gọi là “lý tưởng”. Đây là lý do cuốn sách này đặt alkalinity lên đầu và độ cứng xuống sau.</p>
</div>

<h3>Chỉ tiêu tham chiếu</h3>

<p>Ngành cà phê specialty dùng chỉ tiêu của SCAA/SCA làm điểm khởi đầu <span class="tier tier-b">Hợp lý</span>:</p>

<div class="table-wrap">
<table>
<thead><tr><th>Chỉ số</th><th>Mục tiêu</th><th>Khoảng chấp nhận</th></tr></thead>
<tbody>
<tr><td>Alkalinity (as CaCO₃)</td><td><strong>~40 ppm</strong></td><td>40–75 ppm*</td></tr>
<tr><td>Độ cứng tổng (as CaCO₃)</td><td>~68 ppm</td><td>51–175 ppm</td></tr>
<tr><td>pH</td><td>~7,0</td><td>6–8</td></tr>
<tr><td>Na⁺</td><td>—</td><td>&lt; 10 ppm</td></tr>
</tbody>
</table>
</div>

<p><strong>* Ba dòng trên không lấy từ cùng một trang.</strong> Sổ tay chất lượng nước SCA 2018 cho 40–75 ppm alkalinity và 51–175 ppm độ cứng — nhưng mốc 75 ppm <em>chỉ áp dụng khi độ cứng nằm trong khoảng 150–175 ppm</em>; ngoài khoảng đó, mốc trên là 40 ppm. Dải pH 6–8 với mục tiêu 7,0 lấy từ bảng tiêu chuẩn cà phê SCA 2018, không phải từ sổ tay — sổ tay chỉ nói nên đo pH khi nước có alkalinity rất cao hoặc độ cứng rất thấp. Con số “pH 6,5–7,5” vẫn được trích cho SCA ở nhiều nơi, nhưng tôi không tìm được tài liệu SCA 2018 nào nêu nó, nên bản này đã thay.</p>

<p>Mục tiêu 40 ppm là điểm giữa. Ở mức 20 ppm, acid rất sáng, có khi gắt hoặc "mỏng". Ở mức 75 ppm, vị cân bằng nhưng trái cây bắt đầu mờ. Trên 100 ppm, hầu hết cà phê rang sáng sẽ mất tính cách. Trên 200 ppm, bạn gần như chỉ còn nếm vị rang.</p>

<div class="pull">Nước không phải là nền.<br>Nước là <em>một phần của công thức</em>.</div>

<h3>Vì sao điều này quan trọng hơn bạn nghĩ</h3>

<p>Có một hiện tượng rất phổ biến: người ta mua một bao cà phê specialty đắt tiền, pha ở nhà, và thấy nó "không đặc biệt". Họ cho rằng mình pha sai, hoặc nhà rang thổi phồng. Phần lớn trường hợp, nguyên nhân nằm ở cái vòi nước.</p>

<p>Hãy nghĩ về nó theo cách này: bạn trả 300.000 đồng cho 250 g cà phê để có vị mơ và hương hoa. Rồi bạn pha nó bằng nước có alkalinity 250 ppm — nước này trung hoà phần lớn acid tạo ra chính cái vị mơ đó. Bạn đang trả tiền cho một thứ mà nước của bạn xoá bỏ.</p>

<p>Đây không phải là một chi tiết nhỏ trong quy trình. Đây là biến số có ảnh hưởng lớn nhất mà hầu như không ai kiểm tra.</p>

<h3>Một minh hoạ cụ thể từ Việt Nam</h3>

<p>Nước khoáng đóng chai phổ biến ở Việt Nam thường có hàm lượng bicarbonate rất cao — vì đó là bản chất của nước khoáng tự nhiên. Lấy ví dụ La Vie, theo bản tự công bố sản phẩm: <strong>HCO₃⁻ 280–330 mg/L</strong>, TDS 310–590 mg/L, pH 8,0 ± 0,5.</p>

<p>Quy đổi sang đơn vị của ngành cà phê:</p>

<div class="formula">
<span class="fx-label">Quy đổi HCO₃⁻ → alkalinity as CaCO₃</span>
Alkalinity = HCO₃⁻ × <b>50/61</b> ≈ HCO₃⁻ × <b>0,82</b><br>
305 mg/L × 0,82 ≈ <b>250 ppm as CaCO₃</b>
</div>

<p>So với mục tiêu 40 ppm, đó là <strong>gấp hơn sáu lần</strong>. Ở mức này, bạn không còn nếm con cà — bạn đang nếm nước khoáng có pha cà phê.</p>

<div class="callout warn">
<p class="callout-title">Đừng suy rộng</p>
<p>Con số trên áp dụng cho La Vie. Các nhãn khác có thành phần khác — có loại thấp hơn đáng kể, có loại còn cao hơn. Hãy đọc nhãn của đúng chai bạn dùng, và áp dụng công thức quy đổi ở trên. Chương sau hướng dẫn cách đọc nhãn và cách đo nếu nhãn không ghi.</p>
</div>

<h3>Nước tinh khiết cũng không phải câu trả lời</h3>

<p>Nếu nước khoáng quá kiềm, phản ứng tự nhiên là chuyển sang nước tinh khiết (RO). Nhưng nước RO có alkalinity gần 0 — và ở mức đó, acid không bị đệm chút nào. Kết quả là ly cà có thể chua gắt, "sắc", thiếu tròn. Vị chua không được kiểm soát nghe the và kim loại hơn là tươi sáng.</p>

<p>Nước hoàn hảo cho cà phê không phải là nước sạch nhất. Nó là nước <strong>có đúng một lượng khoáng nhất định</strong> — đủ để đệm acid ở mức vừa phải, không đủ để xoá chúng.</p>

<p>Ba chương tiếp theo nói về cách đạt được điều đó: đo, pha loãng, và — nếu bạn muốn kiểm soát hoàn toàn — tự làm nước từ nước RO.</p>
`
  },

  {
    id: "ch-do-nuoc",
    title: "Đo nước mà không cần máy móc",
    lede: "Chiếc bút TDS — thứ gần như ai cũng mua đầu tiên — không đo được thứ quan trọng nhất. Đây là ba cách đo đúng, xếp theo chi phí.",
    minutes: 8,
    tags: ["nước", "dụng cụ"],
    body: `
<p>Có một sự nhầm lẫn rất phổ biến và rất tốn kém: mua một chiếc bút đo TDS, thấy nước nhà mình "100 ppm, ổn", rồi yên tâm. Vấn đề là <strong>bút TDS không đo alkalinity</strong>.</p>

<h3>Bút TDS đo gì</h3>

<p>Bút TDS (Total Dissolved Solids) thật ra không đếm chất rắn hoà tan. Nó đo <strong>độ dẫn điện</strong> của nước, rồi nhân với một hệ số để hiển thị ra một con số mg/L. Độ dẫn điện phụ thuộc vào tổng ion — canxi, magiê, natri, clorua, sulfate, bicarbonate, tất cả cộng lại.</p>

<p>Nghĩa là: hai mẫu nước có thể cùng TDS 100 ppm nhưng có alkalinity hoàn toàn khác nhau.</p>

<div class="table-wrap">
<table>
<thead><tr><th>Mẫu</th><th>TDS</th><th>Alkalinity</th><th>Pha ra</th></tr></thead>
<tbody>
<tr><td>Nước có 100 ppm CaCO₃ dạng bicarbonate</td><td>~100</td><td><strong>~100</strong></td><td>Mất trái cây</td></tr>
<tr><td>Nước có 100 ppm canxi clorua</td><td>~100</td><td><strong>~0</strong></td><td>Chua sắc, không đệm</td></tr>
</tbody>
</table>
</div>

<p>Cùng một con số trên màn hình. Hai ly cà phê hoàn toàn khác nhau. Đó là lý do bút TDS không trả lời được câu hỏi bạn đang hỏi.</p>

<div class="callout bad">
<p class="callout-title">Đừng mua bút TDS cho mục đích này</p>
<p>Nó hữu ích cho đúng một việc: kiểm tra xem màng lọc RO còn tốt không (nước ra phải gần 0). Ngoài ra nó không giúp gì cho việc hiểu nước pha cà phê.</p>
</div>

<h3>Cách 1 — Đọc nhãn chai (miễn phí, và nên làm trước)</h3>

<p>Nước đóng chai ở Việt Nam thường in đầy đủ thành phần trên nhãn — đó là một báo cáo phòng thí nghiệm miễn phí. Bạn cần tìm dòng <strong>Bicarbonate (HCO₃⁻)</strong>, đơn vị mg/L.</p>

<p>Nếu có, quy đổi:</p>

<div class="formula">
<span class="fx-label">Công thức</span>
Alkalinity (ppm as CaCO₃) = HCO₃⁻ (mg/L) × 50/61<br>
≈ HCO₃⁻ × <b>0,82</b>
</div>

<p>Ví dụ: nhãn ghi HCO₃⁻ 120 mg/L → alkalinity ≈ 98 ppm. Vẫn hơi cao cho cà phê rang sáng, nhưng dùng được cho rang đậm. Nhãn ghi 200 mg/L → 164 ppm, quá cao.</p>

<div class="callout warn">
<p class="callout-title">Nếu nhãn chỉ ghi “độ kiềm” hoặc “độ cứng”</p>
<p>Một số nhãn ghi trực tiếp "độ kiềm" theo mg/L CaCO₃ — khi đó bạn có con số cần tìm, không cần quy đổi. Nhưng cẩn thận: "độ cứng" (hardness) là canxi + magiê, không phải alkalinity. Hai thứ khác nhau và hay bị in cạnh nhau gây nhầm.</p>
</div>

<h3>Cách 2 — Bộ test KH hồ cá (thứ duy nhất đáng mua)</h3>

<p>Đây là cách đo trực tiếp, và nó rẻ đến mức đáng ngạc nhiên. Bộ test KH dùng cho hồ cá thuỷ sinh dùng phương pháp <strong>chuẩn độ nhỏ giọt</strong>: bạn thêm từng giọt thuốc thử vào mẫu nước, đếm số giọt đến khi dung dịch đổi màu. Số giọt chính là alkalinity.</p>

<p>Nó đo đúng thứ cần đo — khả năng đệm — chứ không phải độ dẫn điện. Và nó cho kết quả trực tiếp, không cần quy đổi phức tạp.</p>

<ul>
<li>Bán ở tiệm cá cảnh, giá khoảng 150.000–300.000 đồng, dùng được hàng trăm lần.</li>
<li>Đơn vị thường là <strong>dKH</strong> (độ cứng carbonate của Đức).</li>
<li>Quy đổi: <strong>1 dKH = 17,86 ppm as CaCO₃</strong>.</li>
</ul>

<div class="table-wrap">
<table>
<thead><tr><th>dKH</th><th>ppm as CaCO₃</th><th>Đánh giá cho cà phê</th></tr></thead>
<tbody>
<tr><td>1</td><td>~18</td><td>Rất thấp — chua sắc, thiếu tròn</td></tr>
<tr><td>2</td><td>~36</td><td><strong>Gần lý tưởng</strong></td></tr>
<tr><td>3</td><td>~54</td><td><strong>Tốt</strong></td></tr>
<tr><td>4</td><td>~71</td><td>Chấp nhận được</td></tr>
<tr><td>5</td><td>~89</td><td>Bắt đầu mất trái cây</td></tr>
<tr><td>8</td><td>~143</td><td>Quá cao</td></tr>
<tr><td>14</td><td>~250</td><td>Như nước khoáng mạnh</td></tr>
</tbody>
</table>
</div>

<div class="callout act">
<p class="callout-title">Mẹo tăng độ phân giải</p>
<p>Bộ test thường có độ phân giải 1 dKH ≈ 18 ppm — hơi thô nếu bạn muốn nhắm chính xác 40 ppm. Cách khắc phục: <strong>dùng gấp đôi lượng mẫu nước</strong> (ví dụ 10 ml thay vì 5 ml) rồi chia đôi kết quả. Độ phân giải xuống còn khoảng 9 ppm, đủ để điều chỉnh.</p>
</div>

<h3>Cách 3 — Tự làm nước từ nước RO (kiểm soát hoàn toàn)</h3>

<p>Nếu bạn muốn biết chính xác mình đang uống gì, cách duy nhất là bắt đầu từ nước có alkalinity bằng 0 rồi thêm khoáng chất đã biết. Đây là phương pháp mà nhiều quán specialty dùng, và nó không phức tạp như nghe.</p>

<p>Nguyên tắc: bạn cần hai dung dịch mẹ (concentrate), pha loãng vào nước RO.</p>

<div class="recipe">
<div class="recipe-head">Nước cà phê tự pha — công thức cơ bản<small>Pha 2 lít nước thành phẩm</small></div>
<div class="recipe-body">
<div class="recipe-params">
<span><b>Nền:</b> 2 L nước RO</span>
<span><b>Mg:</b> ~40 ppm</span>
<span><b>HCO₃:</b> ~40 ppm</span>
</div>
<p><strong>Dung dịch A (khoáng):</strong> hoà 2,46 g magiê sulfate (MgSO₄·7H₂O) vào 100 ml nước RO.</p>
<p><strong>Dung dịch B (đệm):</strong> hoà 1,68 g natri bicarbonate (NaHCO₃ — baking soda) vào 100 ml nước RO.</p>
<p><strong>Thành phẩm:</strong> thêm <strong>4 ml A</strong> và <strong>3,2 ml B</strong> vào 2 lít nước RO.</p>
<p>Chỉnh theo khẩu vị: tăng B để giảm độ chua (đệm nhiều hơn), giảm B để tăng độ sáng.</p>
</div>
</div>

<p>Lưu ý: công thức này dùng natri thay vì canxi, và đó là lựa chọn có chủ ý — natri bicarbonate đệm acid mà không thêm vị, trong khi canxi có thể tạo cặn và ảnh hưởng đến thiết bị. Nếu bạn muốn dùng canxi, thay bằng canxi carbonate nhưng phải hoà tan bằng CO₂, phức tạp hơn nhiều.</p>

<h3>Kiểm tra nước máy</h3>

<p>Nếu bạn dùng nước máy, bạn có ba lựa chọn, xếp theo độ chính xác:</p>

<ol class="steps">
<li><strong>Hỏi công ty cấp nước</strong><p>Ở nhiều tỉnh thành Việt Nam, báo cáo chất lượng nước được công bố định kỳ trên website công ty cấp nước. Tìm chỉ số "độ kiềm" hoặc "HCo3". Đây là cách nhanh nhất và miễn phí.</p></li>
<li><strong>Đo bằng test KH</strong><p>Chính xác cho mẫu của bạn tại thời điểm đo. Nước máy thay đổi theo mùa và theo nguồn, nên nên đo lại vài tháng một lần.</p></li>
<li><strong>Đo gián tiếp qua vị</strong><p>Pha hai ly giống hệt nhau, một bằng nước máy, một bằng nước pha loãng 50% với RO. Nếu ly pha loãng sáng hơn rõ rệt, nước máy của bạn có alkalinity cao.</p></li>
</ol>

<div class="callout warn">
<p class="callout-title">Đừng quên clo</p>
<p>Nước máy Việt Nam thường dùng clo để khử trùng. Clo tạo mùi hoá chất và phá huỷ hương thơm. Nó bay hơi nếu bạn để nước trong bình hở vài giờ, hoặc bị loại bởi bất kỳ bộ lọc carbon nào. Đây là vấn đề dễ xử lý nhất trong tất cả.</p>
</div>

<h3>Còn pH thì sao?</h3>

<p>Đừng mua giấy quỳ hay bút đo pH. Lý do: pH của nước pha cà phê <em>bị chi phối bởi alkalinity</em>, và bản thân pH gần như không phải biến bạn điều khiển được một cách độc lập. Một mẫu nước pH 7,0 với alkalinity 150 sẽ pha ra ly phẳng hơn một mẫu pH 6,5 với alkalinity 30.</p>

<p>Nếu bạn biết alkalinity, bạn đã biết gần như tất cả những gì cần biết về nước.</p>
`
  },

  {
    id: "ch-xu-ly-nuoc",
    title: "Xử lý nước ở Việt Nam: những gì có tác dụng và những gì không",
    lede: "Máy làm mềm nước không làm mềm độ kiềm. Bộ lọc Brita không lọc được bicarbonate. Đây là bốn cách thật sự hoạt động.",
    minutes: 9,
    tags: ["nước", "thực hành"],
    body: `
<p>Phần này mang tính thực dụng cao nhất trong cuốn sách. Nếu bạn chỉ đọc một chương về nước, đọc chương này.</p>

<h3>Trước tiên: hai hiểu nhầm tốn tiền</h3>

<div class="table-wrap">
<table>
<thead><tr><th>Cách</th><th>Có giảm alkalinity?</th><th>Thật ra nó làm gì</th></tr></thead>
<tbody>
<tr><td><strong>Bộ lọc carbon (Brita, phễu lọc gia đình)</strong></td><td><strong>Không</strong></td><td>Loại clo, một số hợp chất hữu cơ, vài kim loại nặng. Bicarbonate đi qua nguyên vẹn.</td></tr>
<tr><td><strong>Máy làm mềm nước (trao đổi ion Na)</strong></td><td><strong>Không</strong></td><td>Đổi Ca²⁺ và Mg²⁺ thành Na⁺. Bicarbonate vẫn còn đó. Nước "mềm" nhưng vẫn kiềm.</td></tr>
</tbody>
</table>
</div>

<p>Đây là hai sự nhầm lẫn phổ biến nhất. <strong>Độ cứng và độ kiềm là hai thứ khác nhau.</strong> Máy làm mềm xử lý độ cứng. Bạn có thể có nước đã làm mềm hoàn hảo mà alkalinity vẫn 250 ppm — và ly cà phê vẫn phẳng.</p>

<h3>Bốn cách thật sự hoạt động</h3>

<h4>Cách 1 — Pha loãng với nước RO (khởi đầu ở đây)</h4>

<p>Đây là cách rẻ nhất, chính xác nhất, và không cần thiết bị gì. Nguyên tắc: alkalinity pha loãng tuyến tính theo tỉ lệ thể tích.</p>

<div class="formula">
<span class="fx-label">Công thức pha loãng</span>
% nước khoáng cần dùng = <b>Mục tiêu</b> ÷ <b>Alkalinity đo được</b><br><br>
Ví dụ: mục tiêu 50 ppm, nước khoáng 250 ppm<br>
50 ÷ 250 = <b>20%</b> → 400 ml khoáng + 1600 ml RO = 2 lít
</div>

<div class="table-wrap">
<table>
<thead><tr><th>Nước bạn có</th><th>Alkalinity</th><th>% pha để đạt ~50 ppm</th><th>Cho 2 lít</th></tr></thead>
<tbody>
<tr><td>La Vie (khoáng)</td><td>~250</td><td><strong>20%</strong></td><td>400 ml + 1600 ml RO</td></tr>
<tr><td>Nước khoáng mạnh</td><td>~300</td><td>17%</td><td>340 ml + 1660 ml RO</td></tr>
<tr><td>Nước khoáng nhẹ</td><td>~120</td><td>42%</td><td>840 ml + 1160 ml RO</td></tr>
<tr><td>Nước máy (nếu ~100)</td><td>~100</td><td>50%</td><td>1000 ml + 1000 ml RO</td></tr>
<tr><td>Nước máy (nếu ~150)</td><td>~150</td><td>33%</td><td>660 ml + 1340 ml RO</td></tr>
</tbody>
</table>
</div>

<p>Nước RO mua ở các cửa hàng nước tinh khiết rất rẻ — vài nghìn đồng một lít, hoặc 10.000–20.000 đồng cho bình 20 lít. Đây là khoản đầu tư có tỉ lệ lợi ích/chi phí cao nhất trong toàn bộ việc pha cà phê tại nhà.</p>

<div class="callout act">
<p class="callout-title">Thực hành: pha cả bình, không pha từng ly</p>
<p>Pha 2 lít một lần, đậy nắp, dùng trong 2–3 ngày. Hai lý do: (1) mỗi lần pha riêng có sai số khác nhau, nên bạn không bao giờ biết thay đổi nào là do nước và thay đổi nào là do tay mình; (2) nước RO không có clo nên nó không tự bảo vệ — nhưng 2–3 ngày trong bình kín là an toàn.</p>
</div>

<h4>Cách 2 — Lọc RO tại nhà (đầu tư dài hạn tốt nhất)</h4>

<p>Một hệ thống RO gia đình (1,5–3 triệu đồng) cho bạn nguồn nước alkalinity ~0 ổn định. Kết hợp với cách 1 hoặc cách 3, bạn kiểm soát được nước hoàn toàn, mọi lúc.</p>

<p>Điều cần kiểm tra: màng lọc có còn tốt không. Đây là lúc chiếc bút TDS phát huy tác dụng — nước ra phải gần 0. Nếu nó leo lên 30–50, màng đã yếu và bạn đang uống nước máy đã lọc một phần.</p>

<p>Lưu ý: RO loại bỏ <em>gần như mọi thứ</em>, kể cả khoáng có lợi. Vì vậy nước RO nguyên chất không phải nước pha cà phê lý tưởng — nó là <strong>nguyên liệu nền</strong>, và bạn phải thêm khoáng trở lại (cách 3) hoặc pha với nước khoáng (cách 1).</p>

<h4>Cách 3 — Tự pha nước từ RO (kiểm soát hoàn toàn)</h4>

<p>Đã trình bày công thức ở chương trước. Đây là cách duy nhất cho bạn biết chính xác mình đang uống gì, và là cách duy nhất để thay đổi alkalinity mà không thay đổi độ cứng (hoặc ngược lại) — vì bạn kiểm soát từng thành phần riêng.</p>

<h4>Cách 4 — Đun sôi (có tác dụng, nhưng không kiểm soát được)</h4>

<p>Đun sôi thật sự làm giảm alkalinity, vì canxi bicarbonate phân huỷ khi đun:</p>

<div class="formula">
<span class="fx-label">Phản ứng khi đun sôi</span>
Ca(HCO₃)₂ → CaCO₃↓ + CO₂↑ + H₂O
</div>

<p>Canxi carbonate kết tủa (đó là cặn trắng trong ấm), và bicarbonate biến mất khỏi dung dịch. Vậy là alkalinity giảm — thật.</p>

<p>Nhưng có ba vấn đề:</p>

<ul>
<li><strong>Bạn không biết đã giảm bao nhiêu.</strong> Phụ thuộc vào nồng độ ban đầu, thời gian đun, và lượng CO₂ thoát ra. Không có đích.</li>
<li><strong>Mất 15–20 phút</strong> cho mỗi bình, và bạn cần làm lại mỗi lần.</li>
<li><strong>Nước sau khi đun bị khử oxy</strong> — vị "chết", hơi phẳng. Điều này ảnh hưởng đến cảm nhận.</li>
</ul>

<p>Dùng khi bạn không có lựa chọn nào khác. Không phải phương pháp chính.</p>

<h3>Bảng quyết định</h3>

<div class="table-wrap">
<table>
<thead><tr><th>Tình huống của bạn</th><th>Làm gì</th></tr></thead>
<tbody>
<tr><td>Không biết nước mình thế nào</td><td>Đọc nhãn chai. Nếu là nước máy, pha một ly với 50% nước tinh khiết và so sánh.</td></tr>
<tr><td>Dùng nước khoáng đóng chai</td><td>Đọc HCO₃⁻ trên nhãn. Nếu &gt; 120 mg/L, pha loãng 20–30% với nước tinh khiết.</td></tr>
<tr><td>Dùng nước máy</td><td>Để hở vài giờ cho bay clo. Đo alkalinity bằng test KH, rồi pha loãng nếu cần.</td></tr>
<tr><td>Muốn ổn định lâu dài</td><td>Lắp RO + tự pha khoáng. Đây là điểm kết thúc của toàn bộ vấn đề nước.</td></tr>
<tr><td>Đang dùng máy làm mềm</td><td>Không giải quyết được gì. Vẫn cần pha loãng hoặc RO.</td></tr>
</tbody>
</table>
</div>

<h3>Một thí nghiệm 10 phút, chi phí gần bằng không</h3>

<p>Trước khi mua bất cứ thứ gì, làm thí nghiệm này. Nó cho bạn câu trả lời nhanh hơn mọi phép đo.</p>

<ol class="steps">
<li><strong>Chuẩn bị ba loại nước</strong><p>Nước bạn đang dùng (A). Nước tinh khiết/RO (B). Hỗn hợp 25% A + 75% B (C).</p></li>
<li><strong>Pha ba ly, mọi thứ khác giữ nguyên</strong><p>Cùng 15 g cà, cùng cỡ xay, cùng nhiệt độ, cùng công thức rót. Chỉ nước khác.</p></li>
<li><strong>Nếm và trả lời một câu</strong><p>Ly nào có nhiều vị trái cây nhất? Ly nào cân bằng nhất?</p></li>
</ol>

<div class="table-wrap">
<table>
<thead><tr><th>Kết quả</th><th>Nghĩa là</th></tr></thead>
<tbody>
<tr><td>Ly C thắng rõ</td><td>Nước bạn có alkalinity cao. Dùng tỉ lệ C từ nay.</td></tr>
<tr><td>Ly B (RO) thắng</td><td>Nước bạn rất kiềm, hoặc con cà này cần độ sáng tối đa.</td></tr>
<tr><td>Ly A thắng</td><td>Nước bạn đã ổn. Đừng sửa gì. Vấn đề nằm ở chỗ khác.</td></tr>
<tr><td>Ly B dẹt, ly C cũng dẹt</td><td>Nước không phải vấn đề. Quay lại cỡ xay và kỹ thuật.</td></tr>
</tbody>
</table>
</div>

<div class="callout ok">
<p class="callout-title">Tổng chi phí của toàn bộ chương này</p>
<p>Một chai nước tinh khiết 1,5 L: khoảng 10.000 đồng. Một bộ test KH: 150.000–300.000 đồng. Một hệ RO: 1,5–3 triệu. Bạn có thể bắt đầu với mục đầu tiên và dừng ở đó nếu nó đủ.</p>
</div>
`
  }

  ]
});
