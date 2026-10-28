window.BOOK_PARTS = window.BOOK_PARTS || [];

window.BOOK_PARTS.push({
  id: "phan-4",
  roman: "IV",
  title: "Cupping",
  blurb: "Công cụ chẩn đoán, không phải cuộc thi",
  chapters: [

  {
    id: "ch-cupping-la-gi",
    title: "Cupping đo cái gì — và không đo cái gì",
    lede: "Cupping được thiết kế để loại bỏ biến số, không phải để tạo ra ly ngon nhất. Hiểu điều đó thay đổi cách bạn dùng nó.",
    minutes: 9,
    tags: ["cupping", "phương pháp"],
    body: `
<p>Cupping là phương pháp nếm cà phê chuẩn hoá nhất trong ngành. Nó có một quy trình rất cụ thể, được Hiệp hội Cà phê Specialty (SCA) định nghĩa, và trong gần hai mươi năm hầu như mọi chuyên gia trong ngành đều dùng cùng một quy trình đó. Từ 2024, SCA đã thay bộ 2004 bằng <em>Coffee Value Assessment</em>, nên câu “mọi người dùng cùng một quy trình” không còn đúng tuyệt đối — nhưng cách nếm trong chương này vẫn là nền của cả hệ mới.</p>

<p>Nhưng có một điều quan trọng mà ít người nói rõ: <strong>cupping không được thiết kế để pha ra ly cà ngon nhất.</strong> Nó được thiết kế để loại bỏ ảnh hưởng của người pha.</p>

<h3>Logic thiết kế</h3>

<p>Hãy tưởng tượng bạn muốn biết một con cà phê <em>thật sự</em> là gì. Nếu bạn pha nó bằng pour-over, kết quả phụ thuộc vào kỹ thuật của bạn — cỡ xay, nhiệt, tốc độ rót, tay nghề. Nếu bạn pha nó bằng espresso, kết quả phụ thuộc vào máy, áp suất, tay nghề barista.</p>

<p>Nếu bạn cho mười người pha cùng một bao cà bằng pour-over, bạn sẽ nhận được mười ly khác nhau. Bạn không biết ly nào đại diện cho con cà, và ly nào đại diện cho tay nghề người pha.</p>

<p>Cupping giải quyết vấn đề đó bằng cách làm cho quy trình gần như không thể sai:</p>

<ul>
<li><strong>Không có dòng chảy.</strong> Bã ngâm hoàn toàn trong nước. Không có percolation, không có channeling, không có bã khô cục bộ.</li>
<li><strong>Tỉ lệ cố định.</strong> 8,25 g cà với 150 ml nước — tức 5,5 g/100 ml, tương đương khoảng 1:18. Mọi người dùng cùng một tỉ lệ.</li>
<li><strong>Nhiệt độ cố định.</strong> Nước ở 93 °C khi rót, và khối nước lớn giữ nhiệt ổn định hơn nhiều so với một phễu nhỏ.</li>
<li><strong>Không khuấy trong lúc chiết.</strong> Bã chỉ được khuấy một lần, ở phút thứ 4, để phá lớp bã nổi.</li>
<li><strong>Ly giống nhau.</strong> Cốc thuỷ tinh cùng loại, cùng kích thước.</li>
<li><strong>Thời gian cố định.</strong> 4 phút ngâm, không hơn không kém.</li>
</ul>

<p>Kết quả là một ly cà phê <em>có thể lặp lại giữa những người khác nhau</em>. Đó là mục đích. Không phải để ngon nhất — mà để <strong>so sánh được</strong>.</p>

<div class="callout ok">
<p class="callout-title">Ẩn dụ</p>
<p>Cupping giống như chụp ảnh bằng đèn studio: ánh sáng cố định, phông nền cố định, tư thế cố định. Bức ảnh không đẹp nhất có thể, nhưng nó cho bạn thấy khuôn mặt thật. Pour-over giống như chụp ảnh đường phố: có thể đẹp hơn nhiều, nhưng bạn không biết bao nhiêu là do chủ thể và bao nhiêu là do ánh sáng.</p>
</div>

<h3>Cupping đo những gì</h3>

<p>Thang điểm dưới đây là bộ <strong>Cupping Protocol and Form 2004</strong> của SCA — bộ đã định hình cách cả ngành nếm trong gần hai mươi năm. Nó chia đánh giá thành mười mục: sáu mục đầu là chất lượng cảm quan, bốn mục sau là kiểm tra lỗi. Từ 2024, SCA chuyển sang <strong>Coffee Value Assessment</strong> và không còn dùng một điểm tổng duy nhất; mười mục này vẫn là thứ bạn cần biết, vì mọi bảng điểm cũ và mọi lời quảng cáo “85 điểm” đều dựa trên nó:</p>

<div class="table-wrap">
<table>
<thead><tr><th>Mục</th><th>Đo cái gì</th></tr></thead>
<tbody>
<tr><td>Fragrance / Aroma</td><td>Mùi của bã khô (fragrance) và của bã ướt (aroma)</td></tr>
<tr><td>Flavor</td><td>Vị tổng hợp — sự kết hợp của vị giác và khứu giác ngược</td></tr>
<tr><td>Aftertaste</td><td>Hậu vị: độ dài, chất lượng, có sạch không</td></tr>
<tr><td>Acidity</td><td>Độ sáng, chất lượng của vị chua (không phải số lượng)</td></tr>
<tr><td>Body</td><td>Cảm giác trong miệng: độ dày, độ nhớt, kết cấu</td></tr>
<tr><td>Balance</td><td>Các yếu tố có hài hoà hay một yếu tố lấn át</td></tr>
<tr><td>Uniformity</td><td>Năm ly giống nhau đến đâu (kiểm tra lỗi)</td></tr>
<tr><td>Clean cup</td><td>Không có vị lạ nào (kiểm tra lỗi)</td></tr>
<tr><td>Sweetness</td><td>Có ngọt tự nhiên không (kiểm tra lỗi)</td></tr>
<tr><td>Overall</td><td>Đánh giá tổng thể của người chấm</td></tr>
</tbody>
</table>
</div>

<p>Thang điểm là 6–10 cho mỗi mục, cộng lại thành điểm cuối. Trên 80 là "specialty". Trên 85 là rất tốt. Trên 90 là xuất sắc và hiếm.</p>

<h3>Ba điểm quan trọng về thang điểm</h3>

<h4>1. Điểm số không phải chất lượng tuyệt đối</h4>

<p>Một con cà 84 điểm không "kém hơn" một con cà 86 điểm theo nghĩa bạn sẽ thích nó ít hơn. Điểm số đo <strong>sự đồng thuận của những người được huấn luyện theo cùng một hệ tiêu chuẩn</strong>. Đó là một phép đo rất hẹp.</p>

<p>Nếu bạn thích một con 83 điểm hơn một con 88 điểm, bạn không sai. Bạn chỉ khác biệt so với nhóm người chấm.</p>

<h4>2. Người chấm không hoàn toàn đồng ý với nhau</h4>

<p>Q Grader là chứng chỉ chuyên nghiệp cho người chấm cupping, và nó đòi hỏi huấn luyện nghiêm túc cùng các bài kiểm tra hiệu chuẩn. Nhưng ngay cả những người đã qua hiệu chuẩn vẫn có độ lệch nhất định khi chấm cùng một con cà <span class="tier tier-b">Hợp lý</span>. Đó là bản chất của đánh giá cảm quan — không phải lỗi của họ.</p>

<p>Hệ quả: khi bạn đọc một bảng điểm, hãy đọc nó như một <em>dải</em>, không phải một con số. Chênh lệch 1–2 điểm là nhiễu, không phải tín hiệu.</p>

<h4>3. Điểm cao không dự đoán bạn sẽ thích</h4>

<p>Đây là điểm quan trọng nhất với người uống tại nhà. Cupping đo chất lượng theo tiêu chuẩn ngành — độ sạch, độ phức tạp, độ cân bằng, tính đặc trưng của origin. Nó <strong>không</strong> đo sở thích cá nhân. Và không có nghiên cứu nào cho thấy điểm cupping dự đoán được mức độ ưa thích của người tiêu dùng thông thường.</p>

<div class="pull">Cupping trả lời: <em>“con cà này là gì?”</em><br>Nó không trả lời: <em>“bạn có thích nó không?”</em></div>

<h3>Vì sao bạn nên dùng cupping dù không phải giám khảo</h3>

<p>Vì nó cho bạn thứ mà không phương pháp nào khác cho được: <strong>một điểm tham chiếu không phụ thuộc vào tay bạn</strong>.</p>

<p>Khi bạn pha pour-over và ly cà không ngon, bạn không biết đó là lỗi pha hay bản chất con cà. Cupping trả lời câu hỏi đó. Nếu cupping ngon mà pour-over dở → lỗi pha. Nếu cupping cũng dở → bản chất con cà, hoặc cà đã cũ, hoặc bạn pha sai ở mức cơ bản.</p>

<p>Đó là giá trị thật của nó. Không phải để chấm điểm — mà để <strong>chia đôi vấn đề</strong>.</p>

<div class="callout act">
<p class="callout-title">Nguyên tắc sử dụng</p>
<p>Dùng cupping như một <em>công cụ chẩn đoán</em>, không phải như một <em>mục tiêu</em>. Bạn không cần cố làm cho ly pour-over giống cupping. Bạn chỉ cần biết cupping cho bạn thấy gì để biết mình có thể đi xa đến đâu.</p>
</div>
`
  },

  {
    id: "ch-quy-trinh-cupping",
    title: "Quy trình cupping tại nhà",
    lede: "Bạn không cần mười hai chiếc cốc và một bảng điểm. Bạn cần hai chiếc cốc, một ấm nước, và bốn phút.",
    minutes: 7,
    tags: ["cupping", "thực hành"],
    body: `
<p>Quy trình chuẩn của SCA dùng năm chiếc cốc cho mỗi mẫu, để kiểm tra độ đồng nhất. Ở nhà, bạn không cần điều đó. Bạn cần một quy trình đủ chuẩn để kết quả có nghĩa, và đủ đơn giản để bạn thật sự làm.</p>

<h3>Dụng cụ tối thiểu</h3>

<ul>
<li>Hai chiếc cốc thuỷ tinh cùng loại (khoảng 200 ml). Cùng loại là quan trọng — bạn đang so sánh.</li>
<li>Cân điện tử (0,1 g).</li>
<li>Ấm đun có nhiệt kế, hoặc ấm + nhiệt kế.</li>
<li>Thìa súp.</li>
<li>Máy xay.</li>
<li>Nước đã xử lý (xem Phần II — đây là lúc nó quan trọng nhất).</li>
</ul>

<h3>Thông số</h3>

<div class="recipe">
<div class="recipe-head">Cupping chuẩn tại nhà<small>Một mẫu</small></div>
<div class="recipe-body">
<div class="recipe-params">
<span><b>Cà:</b> 8,25 g</span>
<span><b>Nước:</b> 150 ml</span>
<span><b>Tỉ lệ:</b> 1:18</span>
<span><b>Nhiệt:</b> 93 °C</span>
<span><b>Xay:</b> trung bình–thô</span>
<span><b>Ngâm:</b> 4 phút</span>
</div>
<p>Nếu muốn dùng số tròn: <strong>10 g cà với 180 ml nước</strong> ở 93 °C. Tỉ lệ gần như giống hệt và dễ nhớ hơn.</p>
</div>
</div>

<h3>Các bước</h3>

<ol class="steps">
<li><strong>Ngửi bã khô (0:00)</strong><p>Xay cà, cho vào cốc, và ngửi ngay. Đây là mùi mạnh nhất và dễ nhận nhất trong toàn bộ quy trình. Ghi lại — không cần đặt tên chính xác, chỉ cần "quen/lạ, dễ chịu/khó chịu" và một hoặc hai từ mô tả.</p></li>
<li><strong>Rót nước (0:10)</strong><p>Rót 150 ml nước 93 °C, đổ nhanh và đều để toàn bộ bã ướt. Bắt đầu tính giờ.</p></li>
<li><strong>Ngửi bã ướt (0:30–1:30)</strong><p>Đây là lớp hương quan trọng nhất, vì nó gần với những gì sẽ vào ly. Bã sẽ phồng lên thành một lớp dày trên mặt. Ngửi sát mặt nước.</p></li>
<li><strong>Đợi (1:30–4:00)</strong><p>Không làm gì. Đây là lúc bã lắng xuống. Bạn có thể ngửi lại ở phút thứ 3 — hương đã thay đổi, thường dịu hơn và có thêm nốt nặng.</p></li>
<li><strong>Phá bã (4:00)</strong><p>Dùng thìa đẩy lớp bã nổi sang một bên, ba lần. Động tác này giải phóng một đợt hương mạnh — ngửi ngay. Đây là khoảnh khắc nhiều người thấy hương rõ nhất trong toàn bộ quy trình.</p></li>
<li><strong>Hớt bọt và bã nổi</strong><p>Dùng hai thìa hớt sạch phần bã và bọt còn nổi trên mặt. Bây giờ bạn có một ly nước cà phê trong.</p></li>
<li><strong>Đợi nguội một chút (7:00–8:00)</strong><p>Đừng nếm khi còn quá nóng — bạn sẽ bỏng và không cảm nhận được gì. Đợi đến khoảng 70 °C.</p></li>
<li><strong>Nếm ở ba nhiệt độ</strong><p>Nếm khi còn nóng (~70 °C), khi ấm (~55 °C) và khi nguội (~40 °C). Mỗi nhiệt độ cho bạn một thông tin khác nhau. Đây là bước bị bỏ qua nhiều nhất, và nó là bước hữu ích nhất.</p></li>
</ol>

<h3>Kỹ thuật nếm: slurp</h3>

<p>Đây là phần quan trọng nhất của chương, và nó là thứ hầu hết người uống tại nhà không làm.</p>

<p>Khi cupping, bạn không nhấp một ngụm nhỏ. Bạn <strong>hút mạnh</strong> một lượng cà phê vào miệng, tạo tiếng động — giống như húp mì nóng. Động tác này gọi là <em>slurp</em>, và nó không phải là mất lịch sự: nó là một kỹ thuật.</p>

<p>Lý do: hương bạn cảm nhận phần lớn là <strong>retro-nasal</strong> — đi từ khoang miệng ngược lên mũi qua vòm họng. Không khí cuốn theo cà phê chính là phương tiện vận chuyển các hợp chất bay hơi lên cơ quan khứu giác. Slurp phun sương cà phê thành những hạt rất nhỏ, làm tăng diện tích bề mặt bay hơi lên nhiều lần.</p>

<p>Nếu bạn nhấp một ngụm nhỏ và nuốt, bạn nhận được một phần nhỏ hương so với khi slurp. Đây là lý do cơ học, không phải triết lý.</p>

<div class="callout act">
<p class="callout-title">Bài tập</p>
<p>Pha hai ly từ cùng một bình cà phê. Uống ly thứ nhất bằng cách nhấp bình thường. Ly thứ hai bằng cách slurp mạnh. Bạn sẽ thấy khác biệt rõ rệt ngay lần đầu — và bạn sẽ không bao giờ quay lại cách uống cũ.</p>
</div>

<h3>Cupping so sánh: hai mẫu cùng lúc</h3>

<p>Nếu bạn muốn dùng cupping để so sánh hai con cà, hoặc cùng một con cà ở hai mức rang, có ba nguyên tắc:</p>

<ul>
<li><strong>Mọi thứ giống hệt nhau</strong> trừ biến bạn đang kiểm tra: cùng khối lượng, cùng cỡ xay, cùng nhiệt độ nước, cùng thời gian.</li>
<li><strong>Đánh dấu cốc ở đáy</strong>, không ở miệng cốc. Bạn phải nếm mà không biết mình đang nếm cái nào.</li>
<li><strong>Nếm xen kẽ</strong>, không nếm hết mẫu A rồi mới sang B. Vị giác của bạn thay đổi trong quá trình — nếm xen kẽ giúp so sánh công bằng hơn.</li>
</ul>

<div class="callout warn">
<p class="callout-title">Về việc nếm mù</p>
<p>Nếm mù (không biết mình đang nếm gì) là cách duy nhất để biết sở thích thật của bạn, vì thông tin trên bao bì ảnh hưởng đến những gì bạn nếm <span class="tier tier-a">Bằng chứng</span>. Nhưng nếm mù cũng khó hơn — bạn mất điểm neo. Cách thực dụng: nếm mù trước, ghi lại, rồi mới mở thông tin và so với dự đoán.</p>
</div>

<h3>Một lưu ý về tỉ lệ</h3>

<p>Cupping dùng tỉ lệ 1:18, loãng hơn pour-over thông thường (1:15–1:17). Điều này có chủ ý: nồng độ thấp hơn giúp các nốt hương tách bạch hơn và không bị lấn át bởi vị đắng. Bạn đang tìm hiểu cấu trúc của con cà, không phải thưởng thức một ly cà phê hoàn chỉnh.</p>

<p>Nhưng nó cũng có nghĩa: <strong>cupping và pour-over không cùng nồng độ</strong>. Khi bạn so sánh hai phương pháp, hãy giữ cùng tỉ lệ — nếu không, bạn đang so sánh hai thứ khác nhau ở hai biến, không phải một.</p>
`
  },

  {
    id: "ch-doc-cupping",
    title: "Đọc một ly cupping: ngửi, nếm, và ba lớp thời gian",
    lede: "Hương không phải một khối. Nó thay đổi theo thời gian, và mỗi giai đoạn cho bạn một thông tin khác nhau.",
    minutes: 10,
    tags: ["cupping", "cảm quan"],
    body: `
<p>Người mới thường cố tìm những nốt hương cụ thể — "mơ", "trà đen", "caramel" — và cảm thấy thất bại khi không tìm được. Nhưng đó không phải kỹ năng cần thiết. Kỹ năng cần thiết là <strong>nhận ra cấu trúc</strong>.</p>

<h3>Ba lớp hương trong một lần cupping</h3>

<div class="table-wrap">
<table>
<thead><tr><th>Thời điểm</th><th>Bạn đang ngửi gì</th><th>Nó nói gì</th></tr></thead>
<tbody>
<tr><td>Bã khô (0:00)</td><td>Hợp chất dễ bay hơi nhất</td><td>Trần hương lý thuyết. <strong>Không phải</strong> những gì sẽ có trong ly.</td></tr>
<tr><td>Bã ướt (0:30–1:30)</td><td>Hợp chất tan trong hơi nước nóng</td><td>Lớp gần nhất với những gì sẽ vào ly. Đây là lớp quan trọng nhất.</td></tr>
<tr><td>Phá bã (4:00)</td><td>Một đợt giải phóng đột ngột</td><td>Hương đậm nhất, nhưng cũng dễ gây ấn tượng quá mức.</td></tr>
</tbody>
</table>
</div>

<div class="callout bad">
<p class="callout-title">Một hiểu nhầm cần sửa ngay</p>
<p>Bã khô <em>không</em> phải "trần hương của con cà" theo nghĩa những gì bạn ngửi được ở đó sẽ có trong ly. Nhóm hợp chất tạo mùi khô là nhóm dễ bay hơi nhất — chúng là thứ thoát ra không khí trước tiên. Khi nước nóng chạm vào bã, phần lớn trong số chúng bay lên hoặc đi vào không khí phòng, và rất ít còn lại trong ly.</p>
<p>Quy tắc đúng: <strong>nếu bã khô không có gì, trong ly chắc chắn không có. Nhưng nếu bã khô có nhiều, trong ly có thể vẫn không có.</strong></p>
</div>

<h3>Đọc bằng cấu trúc, không bằng từ vựng</h3>

<p>Bốn câu hỏi, theo thứ tự. Bạn không cần biết tên của bất kỳ nốt hương nào để trả lời chúng.</p>

<h4>1. Hương ở phía nào?</h4>

<ul>
<li><strong>Phía rang:</strong> caramel, chocolate, hạt rang, bánh mì, đường cháy. Đây là lớp ổn định, bền, khó mất.</li>
<li><strong>Phía origin:</strong> trái cây, hoa, trà, gia vị, thảo mộc. Đây là lớp mỏng hơn, dễ mất hơn.</li>
</ul>

<p>Một con cà tốt thường có cả hai, với một lớp làm nền và lớp kia làm điểm nhấn. Một con cà chỉ có lớp rang thường là rang quá đậm, hoặc origin bị mất.</p>

<h4>2. Hương ở phía trước hay phía sau?</h4>

<ul>
<li><strong>Phía trước</strong> (mũi, đầu lưỡi): những gì bạn nhận ra ngay.</li>
<li><strong>Phía sau</strong> (sau lưỡi, họng, retro-nasal): những gì xuất hiện sau khi bạn nuốt hoặc thở ra.</li>
</ul>

<p>Nhiều con cà có hương phía trước rất đẹp nhưng phía sau trống rỗng. Đó là dấu hiệu của một con cà "mỏng" — hoặc của một ly bị chiết thiếu.</p>

<h4>3. Hậu vị kéo dài bao lâu?</h4>

<p>Nuốt, đợi 30 giây, rồi chú ý. Còn gì? Bao lâu?</p>

<ul>
<li><strong>Ngắn, sạch, biến mất</strong> → con cà nhẹ, hoặc chiết thiếu.</li>
<li><strong>Dài, dễ chịu</strong> → tốt. Đây là dấu hiệu của hạt chất lượng và chiết đủ.</li>
<li><strong>Dài, đắng, khô</strong> → có thể là bản chất hạt (Catimor, Robusta), có thể là chiết dư, và chắc chắn sẽ tệ hơn khi ly nguội.</li>
</ul>

<h4>4. Có gì không nên có?</h4>

<p>Đây là câu hỏi mà người mới hay bỏ qua, và nó quan trọng hơn cả ba câu trên. Vị lạ — giấy, các-tông, kim loại, mốc, thuốc, cao su, mùi đất — là thông tin mạnh hơn bất kỳ nốt hương đẹp nào.</p>

<div class="table-wrap">
<table>
<thead><tr><th>Vị lạ</th><th>Thường là</th></tr></thead>
<tbody>
<tr><td>Giấy, các-tông</td><td>Cà đã cũ, oxy hoá</td></tr>
<tr><td>Kim loại, the</td><td>Chiết thiếu, hoặc nước có nhiều sắt</td></tr>
<tr><td>Mốc, đất</td><td>Bảo quản ẩm, hoặc lỗi sơ chế</td></tr>
<tr><td>Thuốc, cao su</td><td>Rang lỗi (baked), hoặc hạt bị lỗi</td></tr>
<tr><td>Rau sống, ngũ cốc</td><td>Chiết thiếu rõ rệt — hoặc rang quá sáng</td></tr>
</tbody>
</table>
</div>

<h3>Ba nhiệt độ, ba thông tin</h3>

<p>Đây là kỹ thuật bị bỏ qua nhiều nhất, và nó gần như miễn phí.</p>

<div class="table-wrap">
<table>
<thead><tr><th>Nhiệt độ</th><th>Bạn cảm nhận tốt nhất</th></tr></thead>
<tbody>
<tr><td><strong>~70 °C (nóng)</strong></td><td>Hương. Hợp chất bay hơi mạnh nhất. Vị đắng bị che một phần.</td></tr>
<tr><td><strong>~55 °C (ấm)</strong></td><td>Cân bằng. Đây là lúc ly cà "đúng" nhất — và cũng là nhiệt độ bạn nên uống.</td></tr>
<tr><td><strong>~40 °C (nguội)</strong></td><td>Cấu trúc và lỗi. Đắng, chát, khô, và các vị lạ hiện rõ nhất. Đây là lúc ly cà thú nhận.</td></tr>
</tbody>
</table>
</div>

<p>Nếu ly cà ngon ở 70 °C mà tệ ở 40 °C, bạn có một con cà có vấn đề về hậu vị — thường là chiết dư hoặc bản chất hạt. Nếu nó ngon ở cả ba, bạn có một con cà tốt và một ly pha đúng.</p>

<div class="callout act">
<p class="callout-title">Quy tắc vàng khi uống</p>
<p>Uống khi còn 55–65 °C. Đây là khoảng cân bằng: đủ nóng để hương bay, đủ nguội để không bỏng. Cà phê để ở 45 °C mất gần một nửa hương — không phải vì nó "nguội đi", mà vì hợp chất bay hơi đã thoát hết.</p>
</div>

<h3>Xúc giác: phần bị bỏ quên</h3>

<p>Khi nếm, chú ý đến <strong>cảm giác</strong> chứ không chỉ mùi vị:</p>

<ul>
<li><strong>Độ dày:</strong> loãng như nước trà, hay đầy như sữa?</li>
<li><strong>Độ nhớt:</strong> trơn hay se?</li>
<li><strong>Nhiệt:</strong> có cảm giác nóng rát nhẹ ở cuống họng không? (Đó là dấu hiệu của chiết dư hoặc nồng độ cao.)</li>
<li><strong>Khô miệng:</strong> sau khi nuốt, miệng bạn khô hay ẩm? Khô là dấu hiệu của tannin và hợp chất se — thường gặp ở chiết dư.</li>
</ul>

<p>Body (độ dày) là một trong sáu mục của thang SCA, và nó là mục mà người mới bỏ qua nhiều nhất. Nó cũng là mục khó cải thiện nhất bằng kỹ thuật — chủ yếu do hạt và cách sơ chế quyết định.</p>

<h3>Ghi chép: ngắn hơn bạn nghĩ</h3>

<p>Đừng viết một đoạn văn. Viết năm dòng:</p>

<div class="formula" data-tpl="1">
<span class="fx-label">Mẫu ghi chép cupping</span>
Mẫu: _______________  Ngày: _______<br>
Khô:  _______________<br>
Ướt:  _______________<br>
Vị:   _______________<br>
Sau:  _______________  (dài/ngắn, sạch/bẩn)<br>
Lạ:   _______________<br>
</div>

<p>Năm dòng này, sau mười con cà, sẽ cho bạn một thứ mà không cuốn sách nào cho được: <strong>bản đồ khẩu vị của chính bạn</strong>. Và nó là nền tảng cho chương 26.</p>
`
  },

  {
    id: "ch-gioi-han-cupping",
    title: "Giới hạn của cupping: vì sao nó không dự đoán pour-over",
    lede: "Cupping và pour-over khác nhau ở đúng một chỗ — và chỗ đó là chỗ khó nhất.",
    minutes: 8,
    tags: ["cupping", "pour over"],
    body: `
<p>Có một trải nghiệm rất phổ biến và rất gây thất vọng: bạn cupping một con cà, nó tuyệt vời — ngọt, có trái cây, cân bằng. Bạn pha nó bằng pour-over, và nó trở nên nhạt nhẽo. Bạn kết luận mình pha dở. Đôi khi đúng, nhưng không phải lúc nào cũng vậy.</p>

<h3>Khác biệt cấu trúc</h3>

<div class="table-wrap">
<table>
<thead><tr><th></th><th>Cupping</th><th>Pour over</th></tr></thead>
<tbody>
<tr><td>Nước chảy qua bã</td><td>Không</td><td>Có</td></tr>
<tr><td>Channeling</td><td><strong>Không thể xảy ra</strong></td><td>Có thể</td></tr>
<tr><td>Bã khô cục bộ</td><td><strong>Không thể</strong></td><td>Có thể</td></tr>
<tr><td>Nhiệt độ</td><td>Ổn định (khối nước lớn)</td><td>Tụt dần</td></tr>
<tr><td>Fines</td><td>Nổi lên, hớt bỏ</td><td>Chìm xuống đáy, có thể cháy</td></tr>
<tr><td>Cỡ xay</td><td>Hơi thô hơn</td><td>Mịn hơn</td></tr>
<tr><td>Tỉ lệ</td><td>1:18</td><td>1:15–1:17</td></tr>
<tr><td>Số biến số bạn kiểm soát</td><td>Gần như không</td><td>Rất nhiều</td></tr>
</tbody>
</table>
</div>

<p>Cupping là <strong>ngâm hoàn toàn, không dòng chảy</strong>. Điều đó có nghĩa là nó loại bỏ đúng cái khó nhất của pour-over. Nó không phải một phiên bản dễ hơn của pour-over — nó là một phương pháp khác, với một cơ chế khác.</p>

<p>Vì vậy: <strong>cupping không có chế độ thất bại. Pour-over có đúng một.</strong> Và đó là chỗ khác biệt nằm.</p>

<h3>Ba nguyên nhân khiến pour-over kém hơn cupping</h3>

<h4>1. Lỗi kỹ thuật (channeling, bã khô, nghẹt)</h4>

<p>Đây là nguyên nhân phổ biến nhất, và cũng là nguyên nhân dễ sửa nhất. Dấu hiệu: ly cà vừa chua vừa đắng, không có nốt rõ, hậu vị lộn xộn. Và bạn nhìn thấy nó trong bã — một hố ở giữa, hoặc mảng khô ở rìa.</p>

<h4>2. Chênh lệch nồng độ</h4>

<p>Cupping 1:18, pour-over 1:15. Đó không phải cùng một ly cà với hai phương pháp — đó là hai ly cà khác nhau. Nếu bạn muốn so sánh có nghĩa, phải giữ cùng tỉ lệ.</p>

<p>Nhưng có một điểm ngược đời: pour-over ở 1:15 thường <em>đậm hơn</em> cupping ở 1:18. Vậy tại sao nó lại cảm thấy kém hơn? Vì độ đậm không phải độ rõ. Một ly đậm hơn nhưng chiết không đều sẽ cảm thấy "nhiều mà không có gì".</p>

<h4>3. Cách bạn uống</h4>

<p>Đây là nguyên nhân bị bỏ qua nhiều nhất, và nó có thể chiếm một nửa khoảng cách.</p>

<p>Khi cupping, bạn <strong>slurp mạnh</strong> từ một chiếc cốc mở, ở nồng độ thấp, với một lượng lớn trong miệng. Khi uống pour-over ở nhà, bạn nhấp một ngụm nhỏ từ một chiếc cốc, có thể còn đang nóng, có thể đang để nguội trên bàn.</p>

<p>Ba khác biệt đó — động tác, lượng, nhiệt độ — làm giảm lượng hương bạn nhận được rất nhiều. Đây là lý do cơ học, không phải tâm lý.</p>

<div class="callout ok">
<p class="callout-title">Thử nghiệm 2 phút</p>
<p>Pha một ly pour-over. Rót một nửa ra cốc thứ hai. Uống cốc thứ nhất bằng cách nhấp bình thường. Cốc thứ hai bằng cách slurp mạnh, đúng kiểu cupping. Cùng cà phê, cùng nhiệt độ. Bạn sẽ ngạc nhiên về khoảng cách.</p>
</div>

<h3>Vậy cupping dự đoán được gì</h3>

<div class="table-wrap">
<table>
<thead><tr><th>Cupping cho bạn biết</th><th>Cupping không cho bạn biết</th></tr></thead>
<tbody>
<tr><td>Con cà có tiềm năng gì (trần hương)</td><td>Bạn có chạm được trần đó bằng pour-over không</td></tr>
<tr><td>Có lỗi hạt hay không (mốc, lên men lỗi)</td><td>Lỗi pha của bạn sẽ ảnh hưởng bao nhiêu</td></tr>
<tr><td>Cấu trúc: chua/ngọt/đắng, body, hậu vị</td><td>Bạn có thích nó không</td></tr>
<tr><td>Nên kỳ vọng gì ở ly pour-over</td><td>Nên đặt tham số nào</td></tr>
<tr><td>Cà có bị cũ không</td><td>Nước của bạn có phù hợp không</td></tr>
</tbody>
</table>
</div>

<h3>Một kỳ vọng đúng đắn</h3>

<p>Khi cupping ngon và pour-over kém hơn một chút, đó là <strong>bình thường</strong>. Không phải lỗi. Hai phương pháp khác nhau ở cấu trúc, và pour-over luôn mất một phần — đó là cái giá của việc có dòng chảy.</p>

<p>Mục tiêu thực tế là: <strong>pour-over nên giữ được lớp nền (ngọt, caramel, body) và mất một phần lớp mỏng (trái cây, hoa) — nhưng không thêm vị xấu nào.</strong></p>

<div class="pull">Cupping là <em>trần</em>.<br>Pour-over là <em>con đường</em>.<br>Chúng không bao giờ gặp nhau hoàn toàn.</div>

<h3>Quy tắc đọc kết quả</h3>

<p>Sau khi bạn pha pour-over một con cà đã cupping, đặt câu hỏi theo thứ tự này:</p>

<ol class="steps">
<li><strong>Có thêm vị xấu mà cupping không có không?</strong><p>Đắng, chát, khô, kim loại. Nếu có → <strong>lỗi kỹ thuật</strong>. Đọc bã. Sửa kỹ thuật.</p></li>
<li><strong>Chỉ yếu đi, không thêm gì?</strong><p>Hương nhạt hơn nhưng sạch. → <strong>Không phải lỗi kỹ thuật.</strong> Đây là cường độ, hoặc cách uống, hoặc chênh lệch tỉ lệ.</p></li>
<li><strong>Có nốt mới mà cupping không có?</strong><p>Đôi khi pour-over làm nổi bật một khía cạnh (thường là acid, vì percolation chiết acid nhanh hơn ở giai đoạn đầu). Đây không phải lỗi — đây là tính cách của phương pháp.</p></li>
<li><strong>Không có gì cả — hoàn toàn phẳng?</strong><p>Kiểm tra nước trước tiên. Sau đó kiểm tra độ tươi của cà. Rồi mới đến kỹ thuật.</p></li>
</ol>

<p>Bốn câu hỏi này tiết kiệm cho bạn rất nhiều thời gian chỉnh sai hướng. Chúng cũng là cầu nối sang Phần V — nơi chúng ta đi vào cơ chế của pour-over.</p>
`
  }

  ]
});
