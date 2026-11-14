window.BOOK_PARTS = window.BOOK_PARTS || [];

/* Phần mở đầu. Đặt trước Phần I nhưng KHÔNG đánh số chương: nếu nó thành
   chương 1 thì mọi tham chiếu "xem chương N" trong sách lệch đi một.
   book.js / print.js / build-epub.mjs đọc cờ front để xử lý riêng. */
window.BOOK_PARTS.push({
  id: "mo-dau",
  roman: "0",
  front: true,
  title: "Trước khi bắt đầu",
  blurb: "Vì sao có cuốn sách này, cách dùng nó, và những từ bạn sẽ gặp trong đó",
  chapters: [

  {
    id: "ch-loi-mo-dau",
    title: "Lời mở đầu: ba ly cà",
    lede: "Một ly mình tin là đỉnh, một ly sạch nhưng thiếu, một ly đủ hương nhưng bẩn. Cả ba đều chưa tới.",
    minutes: 5,
    tags: [],
    body: `
<p>Mình viết cuốn sách này vì một ly cà phê. Không phải ly ngon nhất mình từng pha mà là ly mình tin là ngon nhất, rồi bị một bát cupping pha vội đánh bại.</p>

<h3>Ba ly cà</h3>

<p><strong>Ly thứ nhất.</strong> Một buổi sáng tháng 11, cà Nuimin, chín ngày sau rang. V60 02, 15 g cà, 240 g nước, 80 °C, cối Q Air ở 2.5.0, rót ba lần: 45 g lúc 0:00, lên 80 g lúc 0:45, lên 240 g lúc 1:45. Tổng 2:45, rút 0:45, bã phẳng. Mình ngồi xuống và nghĩ: đây là ly đỉnh của mình.</p>

<p>Rồi mình cupping đúng con cà đó, theo cách lười nhất: cà vào bát, nước nóng rót lên, bốn phút, hớt bọt, đợi nguội bớt, hút một ngụm. Bát ngọt như dâu. Không chua, không chát, không đắng. Sạch đến mức mình pha lại ly V60 để chắc là mình không nhớ nhầm.</p>

<p>Đó là câu hỏi trên bìa cuốn sách: làm sao biến một ly cupping ngon thành một ly pour over ngon. Mình không biết đáp án đầy đủ khi bắt đầu viết, và cuốn sách này không giả vờ là mình đã biết.</p>

<p><strong>Ly thứ hai.</strong> Công thức nền của mình trên V60 là 1:16. Bloom hai lần, tổng nước bloom bằng ba lần khối lượng cà, để khí thoát hết, rồi đổ hết phần nước còn lại một lần. Lần nào cũng ra mặt bã phẳng, đẹp, ly sạch. Uống ngon.</p>

<p>Nhưng có gì đó chưa ưng. Với cà xịn, một SL28, một Sidra Geisha, pha xong, bã vẫn còn mùi thơm. Hương còn nằm trong bã, nghĩa là hương không vào ly. Công thức nền của mình cho ra khoảng 80% con cà đó, và không bao giờ là 100%.</p>

<p>Mình cũng không ngại đắng. Mình ngại vị đắng đọng: lúc uống không thấy gì, ba mươi giây sau nuốt nước miếng vẫn thấy đắng. Đó là thứ mình muốn bỏ khỏi ly.</p>

<p><strong>Ly thứ ba.</strong> Mình thấy chiếc Orea Z1, một phễu không bypass và nghĩ: có thể làm điều tương tự với hai cái phin chồng lên nhau. Phin dưới giữ cà, phin trên chia nước, nước nhỏ giọt xuống. Lý do không chỉ là kỹ thuật: phin là dụng cụ của Việt Nam, và mình muốn nó có một chỗ trong cuốn sách này.</p>

<p>Phép thử đặt song song với V60: cùng 10 g cà, 160 ml nước, cùng cỡ xay, cùng nhiệt, cùng nhịp rót 30–50–50–30. Ly phin thắng rõ ở hương: rất đẹp, không thiếu gì, chua tươi sáng, và bã sau khi pha hết mùi, lần đầu mình lấy được hết con cà.</p>

<p>Nhưng ly phin nặng miệng hơn, chát hơn, hậu vị không sạch. Lúc uống không thấy đắng; ba mươi giây sau nuốt nước miếng vẫn thấy đắng. Mình thử thêm nhiều cách nữa, vẫn vậy. Mình bỏ phin đôi, quay về V60 và Cafec Deep 27. Ly phải ngon thì uống mới vui. Phép thử này chỉ chạy một lần và không nếm mù. Mình ghi rõ ở đây vì điều đó quan trọng hơn kết quả.</p>

<p>Ba ly đó, cộng lại, dạy mình một điều: lấy được hết hương chưa đủ. Cách lấy ra mới quyết định hậu vị. Và một ly sạch mà thiếu hương thì cũng chưa phải ly mình muốn uống.</p>

<h3>Vì sao cuốn sách này tồn tại</h3>

<p>Mình đọc rất nhiều lời khuyên về pha cà phê, và phần lớn được lặp lại đủ lâu để không ai còn hỏi vì sao. Rót xoáy ốc. Bloom ba mươi giây. Chia nước làm hai lần. Mỗi câu có thể đúng, nhưng nếu không ai nói được cơ chế, bạn không có cách nào biết nó có áp dụng cho con cà của bạn hay không.</p>

<p>Cuốn sách này đặt một luật cho chính nó: mỗi lời khuyên phải trả lời được câu hỏi “vì sao”. Và khi câu trả lời là “vì mọi người vẫn làm thế”, sách phải nói đúng như vậy.</p>

<h3>Sách dành cho ai</h3>

<p>Dành cho người pha ở nhà, đã có cân và cối, đã pha V60 hoặc một phễu tương tự, và muốn hiểu vì sao ly hôm nay ngon còn ly hôm qua thì không. Dành cho người ngại vị đắng đọng, đang đi tìm hương và vị ngọt. Dành cho người chịu ghi sổ, mỗi lần chỉ đổi một thứ, và chịu nếm mù.</p>

<p>Không dành cho người muốn một công thức thần kỳ dùng cho mọi con cà, sách nói thẳng là số không chuyển được sang con cà khác. Không dành cho người cần quy trình thi đấu hay vận hành quán. Không dành cho người tìm hướng dẫn espresso, hoặc phin truyền thống pha robusta với sữa đặc.</p>

<h3>Một lời hứa</h3>

<p>Sách sẽ nói rõ chỗ nào có nghiên cứu, chỗ nào là kinh nghiệm, chỗ nào là truyền miệng. Kể cả với những điều chính mình đang tin. Chỗ nào mình không biết, mình sẽ ghi là không biết, thay vì viết một câu nghe chắc chắn.</p>

<p>Đó là toàn bộ lý do ba nhãn bằng chứng tồn tại và là lý do chúng có mặt ở trang tiếp theo, trước cả chương đầu tiên.</p>
`
  },

  {
    id: "ch-cach-doc",
    title: "Cách đọc cuốn sách này",
    lede: "Ba nhãn bằng chứng, ba lộ trình đọc, và cả cuốn sách gói trong một trang nếu bạn chỉ có mười phút.",
    minutes: 6,
    tags: ["cách dùng"],
    body: `
<p>Cuốn sách này có ba mươi mốt chương. Bạn không cần đọc hết, và chắc chắn không cần đọc theo thứ tự. Trang này nói cho bạn biết cách dùng nó.</p>

<h3>Ba nhãn bằng chứng</h3>

<p>Nghề pha cà phê specialty đầy những lời khuyên được lặp lại đủ lâu để thành niềm tin. Cuốn sách này không giả vờ rằng mọi câu trong nó đều chắc như nhau. Mọi khẳng định quan trọng, nghĩa là mọi câu có thể kiểm chứng bằng tài liệu bên ngoài, đều mang một trong ba nhãn:</p>

<div class="table-wrap">
<table>
<thead><tr><th>Nhãn</th><th>Nghĩa là</th><th>Bạn nên làm gì</th></tr></thead>
<tbody>
<tr><td><span class="tier tier-a">Bằng chứng</span></td><td>Có nghiên cứu bình duyệt, tiêu chuẩn ngành, hoặc đo đạc có kiểm soát. Nguồn nằm ở phụ lục A2.</td><td>Tin, nhưng đọc cả phần giới hạn, một nghiên cứu trên một con cà không nói về mọi con cà.</td></tr>
<tr><td><span class="tier tier-b">Hợp lý</span></td><td>Suy ra từ cơ chế vật lý hoặc hoá học, hoặc từ kinh nghiệm chuyên gia, nhưng chưa ai làm thử nghiệm cảm quan.</td><td>Dùng làm giả thuyết. Nó dự đoán đúng chiều, nhưng độ lớn thì chưa ai biết.</td></tr>
<tr><td><span class="tier tier-c">Truyền miệng</span></td><td>Kinh nghiệm cộng đồng. Được lặp lại rộng rãi, không ai kiểm chứng.</td><td>Biết để hiểu vì sao người ta nói vậy. Đừng xây công thức quanh nó.</td></tr>
</tbody>
</table>
</div>

<p>Số sau dấu <strong>·</strong> trong tem là số hiệu nguồn ở phụ lục A2: <em>Hợp lý · 68</em> nghĩa là khẳng định đó dựa vào nguồn [68] trong danh mục.</p>

<p>Câu về <em>quy trình</em> và <em>kinh nghiệm riêng</em> thì không mang nhãn, "rót theo xoáy ốc từ trong ra" không phải một khẳng định cần nguồn, nó là một chỉ dẫn. Gắn nhãn bằng chứng cho những câu như vậy là nói quá.</p>

<div class="callout">
<p class="callout-title">Có nguồn không có nghĩa là đúng</p>
<p>Một bài báo nhỏ, một thử nghiệm trên hai mươi người, một mô hình chưa ai kiểm chứng, tất cả đều là nguồn. Cái quyết định vẫn là thiết kế của nghiên cứu. Phụ lục A2 ghi rõ thiết kế mỗi khi nó quan trọng, kể cả khi điều đó làm yếu đi khẳng định trong thân sách.</p>
</div>

<h3>Ba lộ trình đọc</h3>

<h4>Nếu bạn mới pha</h4>

<p>Đọc bảy chương này, theo thứ tự. Chúng cho bạn một hệ thống đủ dùng, và bỏ qua mọi thứ bạn chưa cần.</p>

<div class="steps">
<ol>
<li><strong>Chương 1</strong><p>Vì sao phần lớn vị trong ly đã được quyết định trước khi bạn chạm vào ấm.</p></li>
<li><strong>Chương 7</strong><p>Ba con số: mức chiết, TDS, tỉ lệ. Đủ để hiểu mọi lời khuyên còn lại.</p></li>
<li><strong>Chương 9</strong><p>Ba thứ bạn thật sự kiểm soát được.</p></li>
<li><strong>Chương 15</strong><p>Ngâm và chảy xuyên qua, hai cơ chế, và vì sao chúng khác nhau.</p></li>
<li><strong>Chương 20</strong><p>Đọc bã: cách chẩn đoán bằng mắt, không bằng cảm giác.</p></li>
<li><strong>Chương 26</strong><p>Giải phẫu một ngụm. Vì sao "vị" phần lớn là mùi.</p></li>
<li><strong>Chương 29</strong><p>Nhật ký pha. Thứ rẻ nhất cho bạn tiến bộ nhanh nhất.</p></li>
</ol>
</div>

<p>Và nếu bạn chỉ làm được một việc sau khi đọc: <strong>sửa nước trước</strong>. Phần II nói cách làm, tốn vài nghìn đồng.</p>

<h4>Nếu bạn đã pha quen</h4>

<p>Bạn đã có công thức chạy được. Những chương này nhắm vào chỗ hay sai, không vào chỗ cơ bản.</p>

<ul>
<li><strong>Chương 4 đến 6</strong>: nước. Đây là chỗ có bằng chứng mạnh nhất và bị bỏ qua nhiều nhất, kể cả bởi người pha lâu năm.</li>
<li><strong>Chương 8</strong>: vì sao "acid ra trước, đắng ra sau" không đứng vững, và điều đó đổi cách bạn chỉnh.</li>
<li><strong>Chương 14 đến 19</strong>: cupping, dụng cụ, kỹ thuật rót, giải phẫu công thức, công thức nhà vô địch.</li>
<li><strong>Chương 21</strong>: bảng chẩn đoán. Dùng khi một ly hỏng mà bạn không biết bắt đầu từ đâu.</li>
<li><strong>Chương 22</strong>: phin, phễu không bypass của Việt Nam, thử như một dụng cụ pour over.</li>
</ul>

<h4>Nếu bạn chỉ có mười phút</h4>

<p>Đọc đúng những câu sau. Chúng là phần lõi của cả cuốn sách.</p>

<div class="callout ok">
<p class="callout-title">Cả cuốn sách trong một trang</p>
<ul>
<li><strong>Ly cà có một trần, và trần đó đặt trước khi bạn bắt đầu.</strong> Giống cà, cách sơ chế, mức rang, độ tươi. Bạn không tạo ra hương. Bạn chỉ có thể đánh rơi nó.</li>
<li><strong>Nước là thứ đáng sửa đầu tiên.</strong> Ly cà 98% là nước, và độ kiềm cao làm phẳng vị trái cây. Nước đóng chai ở Việt Nam thường cao gấp ba đến sáu lần mức nên dùng.</li>
<li><strong>Cỡ xay đứng thứ hai</strong>, nhưng không phải một núm vặn: xay mịn hơn vừa tăng chiết vừa giảm độ đều, và hai cái kéo ngược nhau.</li>
<li><strong>Chiết nhiều hay ít là một núm xoay, không phải một cái van.</strong> Không có kỹ thuật nào giữ lại vị ngọt mà bỏ vị đắng.</li>
<li><strong>Tỉ lệ đổi độ đậm; cỡ xay, nhiệt và thời gian đổi mức chiết; kỹ thuật rót đổi độ đều.</strong> Ba đòn bẩy, ba việc khác nhau.</li>
<li><strong>Một thay đổi mỗi lần.</strong> Đổi hai thứ thì bạn không học được gì, dù ly có ngon hơn.</li>
<li><strong>Nếm ở ba nhiệt độ</strong> và <strong>nhìn vào bã</strong>. Vị giác nói dối; cái bã thì không.</li>
</ul>
</div>

<h3>Về phần phụ lục</h3>

<p>Phụ lục A không phải phần trang trí. Nó liệt kê từng nguồn, nói rõ nguồn đó đo cái gì, và, quan trọng hơn, ghi lại những chỗ sách từng nói chắc hơn tài liệu cho phép rồi phải sửa. Nếu bạn muốn kiểm tra một khẳng định, bắt đầu từ đó.</p>
`
  },

  {
    id: "ch-thuat-ngu",
    title: "Bảng thuật ngữ",
    lede: "Hai mươi lăm từ bạn sẽ gặp lại suốt cuốn sách. Mỗi từ kèm lý do nó quan trọng với ly cà của bạn.",
    minutes: 7,
    tags: ["tra cứu"],
    body: `
<p>Những từ dưới đây xuất hiện xuyên suốt cuốn sách. Mỗi mục nói nghĩa, rồi nói vì sao nó quan trọng với ly cà của bạn.</p>

<h3>Đo lường</h3>

<div class="table-wrap">
<table>
<thead><tr><th>Từ</th><th>Nghĩa</th></tr></thead>
<tbody>
<tr><td><strong>EY</strong> (extraction yield, mức chiết)</td><td>Phần trăm khối lượng bã khô đã đi vào ly. Vùng thường dùng: 18–22%. Nói bạn lấy được <em>bao nhiêu</em> từ hạt. Chương 7.</td></tr>
<tr><td><strong>TDS</strong> (total dissolved solids)</td><td>Nồng độ chất hoà tan trong ly, tính bằng phần trăm. Pour over thường 1,15–1,35%. Nói ly <em>đậm đến đâu</em>. Khác hẳn EY, lẫn hai thứ này là nguồn gốc của phần lớn việc chỉnh sai hướng.</td></tr>
<tr><td><strong>Tỉ lệ</strong> (brew ratio)</td><td>Khối lượng cà so với khối lượng nước. 1:16 là 1 g cà với 16 g nước. Đòn bẩy dễ dự đoán nhất. Đổi tỉ lệ là đổi TDS gần như tuyến tính.</td></tr>
<tr><td><strong>Alkalinity</strong> (độ kiềm)</td><td>Khả năng đệm acid của nước, tính bằng ppm as CaCO₃. Mục tiêu khoảng 40 ppm. Thứ duy nhất trong nước thật sự quyết định vị. Cao quá thì mất trái cây. Chương 4.</td></tr>
<tr><td><strong>dKH</strong></td><td>Đơn vị độ cứng carbonate của Đức, dùng trên bộ test hồ cá. 1 dKH = 17,86 ppm as CaCO₃. Cách đo alkalinity rẻ nhất. Chương 5.</td></tr>
<tr><td><strong>Độ cứng</strong> (hardness)</td><td>Lượng canxi và magiê trong nước. <em>Không</em> phải alkalinity. Hai thứ hay bị in cạnh nhau trên nhãn và hay bị nhầm. Máy làm mềm xử lý độ cứng, không xử lý alkalinity.</td></tr>
</tbody>
</table>
</div>

<h3>Cơ chế pha</h3>

<div class="table-wrap">
<table>
<thead><tr><th>Từ</th><th>Nghĩa</th></tr></thead>
<tbody>
<tr><td><strong>Immersion</strong> (ngâm)</td><td>Bã nằm trong một khối nước suốt mẻ pha. French press, cupping. Chiết đều tự nhiên, không thể có channeling, và tự chậm lại khi nước bão hoà.</td></tr>
<tr><td><strong>Percolation</strong> (chảy xuyên qua)</td><td>Nước chảy qua lớp bã rồi thoát ra. V60, Kalita, phin, espresso. Nước luôn mới nên chiết sâu hơn ngâm cùng thời gian nhưng có thể không đều.</td></tr>
<tr><td><strong>Slurry</strong></td><td>Hỗn hợp bã và nước trong phễu lúc đang pha. Nhiệt độ slurry luôn thấp hơn nhiệt độ trong ấm. Đó mới là nhiệt độ bã thật sự thấy. Chương 9.</td></tr>
<tr><td><strong>Bloom</strong></td><td>Lần rót đầu, ít nước, để bã nhả CO₂ trước khi rót chính. CO₂ đẩy nước ra khỏi bã. Bỏ bloom với cà tươi thì chiết không đều.</td></tr>
<tr><td><strong>Channeling</strong></td><td>Nước tìm được đường ít trở lực và chảy tập trung qua đó, bỏ qua phần bã còn lại. Cho ly <em>vừa chua vừa đắng</em> cùng lúc, phần bị bỏ qua chiết thiếu, phần trên đường nước chiết dư.</td></tr>
<tr><td><strong>Bypass</strong></td><td>Nước đi men theo thành giấy mà không qua hết lớp bã. Làm đáy lớp bã chiết ít hơn phần trên. Nhóm phễu "không bypass" sinh ra để chặn chuyện này. Chương 15.</td></tr>
<tr><td><strong>Drawdown</strong> (thời gian rút)</td><td>Thời gian nước thoát hết khỏi bã, thường tính ở giai đoạn cuối. Là <em>kết quả</em>, không phải thứ bạn đặt. Dùng làm chỉ báo: rút dài bất thường nghĩa là bã đang cản nước.</td></tr>
</tbody>
</table>
</div>

<h3>Hạt và bột</h3>

<div class="table-wrap">
<table>
<thead><tr><th>Từ</th><th>Nghĩa</th></tr></thead>
<tbody>
<tr><td><strong>Fines</strong> (bột mịn)</td><td>Nhóm hạt nhỏ nhất trong mẻ xay, thường quanh 30–40 µm. Vừa có hại vừa cần thiết: nhiều quá thì nghẹt và chát, ít quá thì nước tạo kênh. Chương 10.</td></tr>
<tr><td><strong>Boulders</strong> (mảnh lớn)</td><td>Nhóm hạt lớn nhất trong mẻ xay. Chiết chậm hơn nhiều, thời gian để chất từ lõi ra tăng theo bình phương kích thước.</td></tr>
<tr><td><strong>Phân bố kích thước hạt</strong></td><td>Toàn bộ dải cỡ hạt trong một mẻ xay, không chỉ cỡ trung bình. Hai mẻ cùng trung vị vẫn có thể cho hai ly khác nhau, vì bề rộng của dải khác nhau.</td></tr>
<tr><td><strong>D50</strong> (trung vị)</td><td>Cỡ hạt mà một nửa khối lượng nằm dưới nó. Con số các bảng cỡ xay thường in. Nó không nói gì về bề rộng dải.</td></tr>
<tr><td><strong>Burr</strong> (lưỡi nghiền)</td><td>Hai đĩa nghiền cắt hạt theo khe đã đặt. Khác máy xay cánh quạt, vốn đập vỡ hạt. Máy cánh quạt không cho phân bố kiểm soát được. Đây là món đáng nâng cấp đầu tiên sau nước.</td></tr>
</tbody>
</table>
</div>

<h3>Rang và cảm quan</h3>

<div class="table-wrap">
<table>
<thead><tr><th>Từ</th><th>Nghĩa</th></tr></thead>
<tbody>
<tr><td><strong>First crack</strong></td><td>Tiếng nổ đầu khi rang, khoảng 196–205 °C, lúc hơi nước và CO₂ làm hạt nứt. Mốc chia rang sáng với rang vừa.</td></tr>
<tr><td><strong>Second crack</strong></td><td>Tiếng nổ thứ hai, khoảng 224–230 °C, lúc cấu trúc cellulose bắt đầu gãy. Qua mốc này là rang đậm. Vết dầu trên mặt hạt là dấu hiệu.</td></tr>
<tr><td><strong>Quinide</strong> (lactone acid chlorogenic)</td><td>Nhóm hợp chất đắng hình thành khi rang, nhiều nhất ở mức nhẹ đến vừa. Vị đắng "kiểu cà phê". Sinh ra trong lò rang, không phải trong phễu. Chương 9.</td></tr>
<tr><td><strong>Phenylindane</strong></td><td>Nhóm đắng sinh ra khi rang mạnh hơn làm quinide phân huỷ tiếp. Đắng gắt hơn và đọng lâu hơn. Đây là lý do rang đậm cho vị đắng khác <em>chất</em>, không chỉ khác lượng.</td></tr>
<tr><td><strong>Retronasal</strong></td><td>Đường mùi đi từ miệng ngược lên mũi khi bạn nuốt. Phần lớn thứ bạn gọi là "vị" đi qua đường này. Lưỡi chỉ nhận năm vị cơ bản. Chương 26.</td></tr>
<tr><td><strong>Astringency</strong> (vị chát)</td><td>Cảm giác khô, rít trong miệng, là <em>xúc giác</em>, không phải vị. Hay bị gọi nhầm là "đắng". Nguyên nhân thường khác nhau, nên cách sửa cũng khác.</td></tr>
<tr><td><strong>Cupping</strong></td><td>Quy trình nếm chuẩn hoá: tỉ lệ cố định, ngâm, không lọc. Cho bạn biết trần của con cà, tách khỏi kỹ thuật pha. Phần IV.</td></tr>
</tbody>
</table>
</div>

<div class="callout act">
<p class="callout-title">Nếu bạn chỉ nhớ ba từ</p>
<p><strong>Alkalinity</strong>: thứ trong nước quyết định vị, và thứ hầu hết mọi người chưa từng đo.</p>
<p><strong>Channeling</strong>: lý do một ly có thể vừa chua vừa đắng, và lý do kỹ thuật rót tồn tại.</p>
<p><strong>EY so với TDS</strong>: lấy được bao nhiêu, so với ly đậm đến đâu. Hai thứ, hai đòn bẩy.</p>
</div>
`
  }

  ]
});
