window.BOOK_PARTS = window.BOOK_PARTS || [];

window.BOOK_PARTS.push({
  id: "phan-3",
  roman: "III",
  title: "Chiết xuất",
  blurb: "Sự thật và truyền thuyết về những gì nước lấy đi",
  chapters: [

  {
    id: "ch-chiet-xuat",
    title: "Chiết xuất là gì: ba con số và một cái bẫy",
    lede: "Bạn không thể nếm “chiết xuất”. Bạn chỉ có thể nếm ly cà phê. Nhưng ba con số này giải thích phần lớn những gì bạn nếm.",
    minutes: 9,
    tags: ["chiết xuất", "đo lường"],
    body: `
<p>Hãy bắt đầu bằng một câu hỏi tưởng như đơn giản: khi bạn pha cà phê, cái gì thật sự đi từ bã vào ly?</p>

<p>Câu trả lời chính xác là: <strong>khoảng 18–22% khối lượng bã khô</strong>. Phần còn lại — cellulose, một phần protein, khoáng chất không tan, và các hợp chất chưa kịp hoà tan — ở lại trong bã và bị bỏ đi. Ngay cả một ly cà phê "đậm" cũng chỉ lấy được một phần năm những gì có trong hạt.</p>

<p>Con số đó, và những gì nó kéo theo, là nền tảng của mọi kỹ thuật trong cuốn sách này.</p>

<h3>Ba con số</h3>

<div class="stat-grid">
<div class="stat"><b>18–22%</b><span>Extraction yield</span></div>
<div class="stat"><b>1,15–1,35%</b><span>TDS trong ly</span></div>
<div class="stat"><b>1:15–1:17</b><span>Tỉ lệ pha</span></div>
</div>

<h4>Extraction yield (EY)</h4>

<p>Phần trăm khối lượng bã khô đã đi vào ly. Đo bằng cách sấy khô bã đã pha, cân, và so với khối lượng bã ban đầu — hoặc bằng máy đo quang phổ kết hợp TDS và khối lượng.</p>

<p>Dưới 18%: <em>chiết thiếu</em> (under-extracted). Ly cà mỏng, chua, có vị rau hoặc ngũ cốc sống, hậu vị ngắn và sắc.</p>

<p>Trên 22%: <em>chiết dư</em> (over-extracted). Ly cà đắng, khô miệng, chát, hậu vị dài và nặng, mất phân biệt giữa các nốt hương.</p>

<p>18–22%: <em>vùng tốt</em>. Nhưng đây là một vùng rộng, không phải một điểm. Bên trong nó, từ 18 đến 22, có thể là bốn ly cà rất khác nhau — và bạn sẽ thích một góc của vùng này hơn những góc khác. Đó là khẩu vị, không phải sai số.</p>

<h4>TDS (Total Dissolved Solids)</h4>

<p>Nồng độ chất hoà tan trong ly, tính bằng phần trăm. Với pour over, 1,15–1,35% là vùng của chuẩn Golden Cup. Espresso là 8–12%.</p>

<div class="callout warn">
<p class="callout-title">EY và TDS là hai chuyện khác nhau</p>
<p>Đây là chỗ nhiều người nhầm. <strong>EY</strong> nói bạn đã lấy được <em>bao nhiêu</em> từ hạt. <strong>TDS</strong> nói ly cà <em>đậm đến đâu</em>. Bạn có thể có TDS cao với EY thấp (ít nước, chiết nông — cà đậm nhưng chưa lấy hết hương) hoặc TDS thấp với EY cao (nhiều nước, chiết sâu — cà loãng nhưng đã lấy hết).</p>
<p>Bạn điều chỉnh chúng bằng hai đòn bẩy khác nhau: <strong>TDS bằng tỉ lệ</strong>, <strong>EY bằng cỡ xay/thời gian/nhiệt</strong>. Nhầm lẫn giữa hai thứ này là nguồn gốc của phần lớn việc chỉnh sai hướng.</p>
</div>

<h4>Tỉ lệ pha</h4>

<p>Khối lượng cà so với khối lượng nước. 1:16 nghĩa là 1 g cà với 16 g nước. Với 15 g cà thì 240 g nước.</p>

<p>Tỉ lệ quyết định <strong>TDS gần như tuyến tính</strong> — đây là đòn bẩy dễ dự đoán nhất trong toàn bộ quá trình. Nếu bạn đổi từ 1:16 sang 1:15, ly cà sẽ đậm hơn khoảng 6–7%, gần như chắc chắn. Không có đòn bẩy nào khác dự đoán được tốt đến vậy.</p>

<h3>Vì sao bạn không thể nếm “chiết xuất”</h3>

<p>Đây là điểm quan trọng nhất của chương, và nó giải thích vì sao rất nhiều người chỉnh sai hướng trong nhiều năm.</p>

<p>Chiết xuất không phải một chất. Nó là một <em>tập hợp</em> hàng trăm hợp chất, mỗi thứ có tốc độ hoà tan khác nhau, và mỗi thứ đóng góp một phần khác nhau vào cảm giác bạn có. Khi bạn nói "ly này chiết dư", bạn đang suy luận từ một triệu chứng — không phải đọc một con số.</p>

<p>Và suy luận đó có thể sai. Có ít nhất bốn nguyên nhân khác nhau tạo ra cùng một triệu chứng "đắng":</p>

<div class="table-wrap">
<table>
<thead><tr><th>Nguyên nhân</th><th>Cách phân biệt</th></tr></thead>
<tbody>
<tr><td>Chiết dư toàn phần</td><td>Đắng đều, hậu vị dài, không có đỉnh hương nào</td></tr>
<tr><td>Channeling (chiết không đều)</td><td>Vừa chua vừa đắng, có điểm sáng rồi điểm tối, ly "lộn xộn"</td></tr>
<tr><td>Bã cháy cục bộ</td><td>Đắng ở cuối ly, hậu vị khét, thường do fines ở đáy</td></tr>
<tr><td>Bản chất hạt</td><td>Đắng từ đầu đến cuối, không đổi khi bạn giảm chiết</td></tr>
</tbody>
</table>
</div>

<p>Bốn nguyên nhân, bốn cách xử lý khác nhau — và nếu bạn điều trị nguyên nhân số 2 bằng cách xay thô hơn (phương pháp cho nguyên nhân số 1), bạn sẽ làm nó tệ hơn.</p>

<h3>Cái bẫy của “chiết đều”</h3>

<p>Có một khái niệm mà ngành cà phê dùng rất nhiều nhưng ít khi định nghĩa: <strong>chiết đều</strong> (even extraction). Ý nói mọi hạt bột đều được tiếp xúc với nước như nhau, trong cùng thời gian, ở cùng nhiệt độ.</p>

<p>Trong thực tế, điều này không bao giờ đúng hoàn toàn. Bã cà là một khối hạt có kích thước không đồng nhất — từ bụi mịn (fines) đến mảnh lớn (boulders). Nước sẽ chảy qua đường ít trở lực nhất. Một số hạt sẽ chiết 25%, một số 12%. Ly cà của bạn là <em>trung bình</em> của một phân bố rộng.</p>

<p>Đây là lý do kỹ thuật quan trọng: không phải vì nó làm hương vị xuất hiện, mà vì nó <strong>thu hẹp phân bố đó</strong>. Khi phân bố hẹp, ly cà rõ ràng hơn, sạch hơn, và các nốt hương tách bạch hơn. Khi phân bố rộng, bạn có một ly "vừa chua vừa đắng" mà không có gì nổi bật.</p>

<div class="pull">Kỹ thuật không tạo ra hương.<br>Kỹ thuật <em>thu hẹp phân bố</em>.</div>

<h3>Đo hay không đo</h3>

<p>Có một câu hỏi thực dụng: bạn có cần mua máy đo TDS (refractometer) và cân không?</p>

<p><strong>Cân: có.</strong> Đây là dụng cụ quan trọng nhất trong toàn bộ việc pha cà phê, sau ấm đun. Không có cân, bạn không thể lặp lại bất cứ điều gì. Cân 0,1 g giá khoảng 200.000–400.000 đồng, và nó biến việc pha cà từ nghệ thuật thành thứ có thể học được.</p>

<p><strong>Refractometer: không, trừ khi bạn thích dữ liệu.</strong> Nó cho bạn con số EY và TDS chính xác. Nhưng: (1) nó đắt (2–5 triệu); (2) nó cần hiệu chuẩn và kỹ thuật lấy mẫu đúng, sai một chút là số vô nghĩa; (3) nó không cho bạn biết ly cà có ngon không — nó chỉ cho bạn biết ly cà có nằm trong vùng thông thường không.</p>

<p>Với hầu hết người uống tại nhà, vị giác của bạn cộng với một cuốn sổ ghi chép hiệu quả hơn một cái máy 3 triệu đồng. Refractometer hữu ích khi bạn cần so sánh nhiều phương pháp một cách khách quan — như khi bạn đang phát triển công thức cho một quán.</p>

<div class="callout act">
<p class="callout-title">Nếu bạn chỉ có một thứ</p>
<p>Mua cân. Bỏ qua mọi thứ khác. Cân + một cuốn sổ là đủ để học được 90% những gì cuốn sách này nói.</p>
</div>
`
  },

  {
    id: "ch-huyen-thoai-thu-tu",
    title: "Huyền thoại “acid ra trước, đắng ra sau”",
    lede: "Đây là ý tưởng phổ biến nhất trong giới pha cà phê hiện đại. Nó cũng là ý tưởng được kiểm chứng ít nhất.",
    minutes: 11,
    tags: ["chiết xuất", "bằng chứng", "phản biện"],
    body: `
<p>Nếu bạn đã xem bất kỳ video nào về pha cà phê trong mười năm qua, bạn đã nghe phiên bản này hoặc phiên bản tương tự:</p>

<blockquote>
<p>Acid chiết ra trước. Đường chiết ra sau. Đắng chiết ra cuối cùng. Vì vậy nếu bạn muốn giữ vị trái cây, hãy chiết ít — dừng sớm trước khi đắng xuất hiện.</p>
</blockquote>

<p>Nghe rất hợp lý. Nó khớp với kinh nghiệm: ly chiết thiếu thì chua, ly chiết dư thì đắng. Nó giải thích được nhiều hiện tượng. Và nó được lặp lại trong hầu hết tài liệu đào tạo.</p>

<p>Nhưng khi bạn hỏi <em>bằng chứng đâu</em>, câu trả lời rất mỏng.</p>

<h3>Mô hình này đến từ đâu</h3>

<p>Nó không đến từ nghiên cứu thực phẩm. Nó đến từ một bài viết của Jonathan Gagné trên blog <em>Coffee ad Astra</em> năm 2019, trong đó ông xây dựng một mô hình động học về chiết xuất espresso. Bài viết đó rất hay, rất chi tiết, và có ảnh hưởng lớn.</p>

<p>Nhưng Gagné tự ghi rõ trong chính bài viết đó rằng: việc gắn tốc độ chiết với các thuộc tính cảm quan cụ thể là <strong>suy đoán</strong>, và mô hình <strong>chưa được kiểm chứng với dữ liệu thật</strong>.</p>

<p>Nghĩa là: người tạo ra mô hình đã nói rõ nó là giả thuyết. Rồi mười năm sau, giả thuyết đó được dạy như định luật.</p>

<div class="callout bad">
<p class="callout-title">Mức bằng chứng</p>
<p>Khẳng định "acid chiết trước, đắng chiết sau" không có nghiên cứu thực phẩm nào so sánh trực tiếp tốc độ chiết của acid citric/malic với caffeine và lactone acid chlorogenic trong một mẻ pha 2–4 phút <span class="tier tier-c">Truyền miệng</span>. Nó là một giả thuyết được lặp lại, không phải một phát hiện.</p>
</div>

<h3>Dữ liệu thật cho thấy gì</h3>

<p>Khi người ta chia một mẻ espresso thành nhiều phần và phân tích từng phần, kết quả rất rõ ràng — nhưng không theo hướng mô hình dự đoán <span class="tier tier-a">Bằng chứng</span>:</p>

<ul>
<li><strong>Mọi hợp chất đều đậm nhất ở phần đầu và giảm dần.</strong> Không có hợp chất nào "xuất hiện sau".</li>
<li><strong>Tốc độ giảm khác nhau.</strong> Trigonelline và TDS giảm nhanh nhất, tiếp theo là acid chlorogenic (5-CQA), rồi caffeine giảm chậm nhất.</li>
</ul>

<p>Đây là bằng chứng về <strong>tốc độ chiết khác nhau</strong> — điều đó đúng và đã được chứng minh. Nhưng nó <em>không</em> phải bằng chứng cho việc acid đi trước và đắng đi sau. Caffeine, ví dụ, gần như không đổi theo thời gian chiết trong một mẻ — nghĩa là nó không "đến muộn". Nó ở đó từ đầu.</p>

<h3>Một phát hiện phá trực giác hơn</h3>

<p>Trong một nghiên cứu trên French press, các nhà nghiên cứu đo nồng độ acid malic, acetic và lactic trong ly cà phê <span class="tier tier-a">Bằng chứng</span>. Hai kết quả đáng chú ý:</p>

<ol>
<li><strong>Cả ba acid đều nằm dưới ngưỡng cảm nhận riêng lẻ của chúng.</strong> Nghĩa là về mặt hóa học, chúng có trong ly — nhưng ở nồng độ mà một mình chúng không đủ gây cảm giác chua.</li>
<li><strong>Khi các nhà nghiên cứu thêm acid vào cà phê và mời chuyên gia nếm, họ không nhận ra đúng loại acid nào.</strong> Chuyên gia nếm được "có thêm acid", nhưng không phân biệt được citric với malic với acetic.</li>
</ol>

<p>Hệ quả rất lớn: <strong>"vị chua" bạn nếm không phải là "acid X vừa được chiết ra".</strong> Nó là một cảm giác tổng hợp, sinh ra từ sự tương tác giữa nhiều hợp chất, pH, nhiệt độ, và cả kỳ vọng của bạn. Việc gán nó cho một hợp chất cụ thể là một suy luận, và suy luận đó không đứng vững khi kiểm tra.</p>

<div class="callout ok">
<p class="callout-title">Vậy phần đúng là gì</p>
<p>Điều <em>đúng</em> và hữu ích: ly chiết thiếu thì chua và mỏng; ly chiết dư thì đắng và khô. Mối quan hệ giữa <strong>mức chiết tổng</strong> và <strong>cảm giác cân bằng</strong> là có thật. Điều <em>không đúng</em>: rằng có một thứ tự thời gian mà bạn có thể khai thác để "giữ trái cây, bỏ đắng".</p>
</div>

<h3>Vì sao huyền thoại này lại hấp dẫn đến vậy</h3>

<p>Vì nó trao cho bạn quyền kiểm soát. Nếu acid ra trước và đắng ra sau, thì bạn chỉ cần dừng đúng lúc — và bạn sẽ có mọi thứ tốt, không có gì xấu. Đó là một lời hứa rất hấp dẫn với người đang tìm cách pha ngon hơn.</p>

<p>Thực tế khó chịu hơn: bạn không thể tách rời. Mọi thứ đi cùng nhau, chỉ khác tốc độ. Nếu bạn chiết ít để giữ acid, bạn cũng chiết ít đường, ít hợp chất hương, và ly cà mỏng đi. Nếu bạn chiết nhiều để lấy đường, bạn cũng lấy thêm hợp chất đắng. Đây không phải một cái van, nó là một cái núm xoay.</p>

<h3>Điều này thay đổi cách bạn pha thế nào</h3>

<p>Nếu bạn tin vào mô hình thứ tự, bạn sẽ dành rất nhiều thời gian để tối ưu <em>thời điểm dừng</em> — và bạn sẽ bị ám ảnh bởi những thay đổi nhỏ ở cuối quá trình.</p>

<p>Nếu bạn hiểu rằng mọi thứ đi cùng nhau, bạn sẽ tập trung vào ba thứ thật sự có tác dụng lớn:</p>

<ol>
<li><strong>Nồng độ</strong> — tỉ lệ. Tuyến tính, dễ dự đoán, ảnh hưởng lớn nhất.</li>
<li><strong>Độ đều</strong> — kỹ thuật. Thu hẹp phân bố chiết xuất. Ảnh hưởng đến độ "rõ" của ly cà.</li>
<li><strong>Mức chiết tổng</strong> — cỡ xay, nhiệt, thời gian. Một núm xoay duy nhất.</li>
</ol>

<p>Ba thứ đó. Không có thứ thứ tư. Và không có kỹ thuật nào "giữ lại" một nốt hương cụ thể — vì nốt hương không phải là một chất có thể giữ, nó là một cảm giác sinh ra từ một hỗn hợp.</p>

<div class="pull">Bạn không thể chọn nốt hương.<br>Bạn chỉ có thể chọn <em>độ đậm, độ đều, và mức chiết</em>.</div>

<h3>Một ngoại lệ có thật, và nó nhỏ</h3>

<p>Có một chỗ mà thời gian thật sự quan trọng, nhưng không phải vì thứ tự hợp chất: <strong>giai đoạn cuối của quá trình rút</strong>. Khi bã gần khô, nước còn lại chảy qua một lớp mỏng bã đã bị nén, ở nhiệt độ thấp hơn, và có thể kéo theo các hợp chất có vị khô và chát. Đây là lý do một số người cắt bỏ vài giọt cuối.</p>

<p>Nhưng hiệu ứng này nhỏ hơn nhiều so với những gì nó được gán cho, và nó bị lẫn với một hiệu ứng khác lớn hơn: khi ly cà nguội, cảm giác đắng tăng lên <em>mà không có thêm gì được chiết ra</em>. Đó là sinh lý học, không phải hóa học. Chương 24 nói về điều này.</p>
`
  },

  {
    id: "ch-ba-thu-kiem-soat",
    title: "Ba thứ bạn thật sự kiểm soát được",
    lede: "Sau khi loại bỏ những gì là truyền miệng, còn lại một mô hình rất gọn — và nó đủ để làm gần hết công việc.",
    minutes: 8,
    tags: ["chiết xuất", "mô hình"],
    body: `
<p>Chương trước phá một huyền thoại. Chương này xây một mô hình thay thế. Nó nhỏ hơn, ít hấp dẫn hơn, nhưng nó đứng vững.</p>

<h3>Mô hình</h3>

<p>Mọi ly cà phê pour over có thể được mô tả bằng ba chiều:</p>

<div class="table-wrap">
<table>
<thead><tr><th>Chiều</th><th>Câu hỏi nó trả lời</th><th>Đòn bẩy</th><th>Mức ảnh hưởng</th></tr></thead>
<tbody>
<tr><td><strong>Nồng độ</strong></td><td>Đậm hay loãng?</td><td>Tỉ lệ cà/nước</td><td><strong>Rất lớn, tuyến tính</strong></td></tr>
<tr><td><strong>Mức chiết</strong></td><td>Đã lấy ra nhiều hay ít?</td><td>Cỡ xay, nhiệt, thời gian</td><td><strong>Lớn</strong></td></tr>
<tr><td><strong>Độ đều</strong></td><td>Mọi phần bã có được chiết như nhau?</td><td>Kỹ thuật rót, chống channeling</td><td>Trung bình, nhưng quyết định độ "rõ"</td></tr>
</tbody>
</table>
</div>

<p>Ba chiều này gần như độc lập. Đó là điều làm chúng hữu ích: bạn có thể thay đổi một mà không phá hai cái kia.</p>

<h3>Chuyện gì xảy ra khi bạn thay đổi từng thứ</h3>

<h4>Tỉ lệ — đòn bẩy sạch nhất</h4>

<p>Đổi từ 1:16 sang 1:15 và giữ mọi thứ khác nguyên: ly cà đậm hơn khoảng 6%. Mức chiết (EY) gần như không đổi. Độ đều gần như không đổi. Bạn vừa thay đổi đúng một biến.</p>

<p>Đây là lý do tỉ lệ phải là <strong>bước đầu tiên</strong> khi bạn chỉnh bất cứ thứ gì. Nó không gây tác dụng phụ.</p>

<h4>Cỡ xay — đòn bẩy mạnh nhưng có tác dụng phụ</h4>

<p>Xay mịn hơn: mức chiết tăng (nhiều bề mặt hơn, nước ở lại lâu hơn). Nhưng đồng thời: nhiều fines hơn → dễ nghẹt giấy hơn → dễ channeling hơn → độ đều giảm.</p>

<p>Đây là lý do "xay mịn hơn" là lời khuyên nguy hiểm khi ly cà nhạt. Nó tăng chiết, nhưng nó cũng làm giảm đều. Kết quả có thể là ly cà vừa đậm hơn vừa lộn xộn hơn.</p>

<p>Hai chiều này không phải hai lời khuyên mà là hai cơ chế vật lý chạy song song, và chúng kéo ngược nhau. Chương sau mổ riêng đòn bẩy này — vì nó là chỗ có nhiều dữ liệu nhất, và cũng là chỗ dễ hiểu sai nhất.</p>

<h4>Nhiệt độ — đòn bẩy tinh tế</h4>

<p>Tăng nhiệt: tăng tốc độ chiết và tăng khả năng hoà tan của các hợp chất khó tan. Hiệu ứng khoảng 2–4% mức chiết cho mỗi 5 °C trong vùng 88–96 °C.</p>

<p>Nhưng nhiệt độ còn ảnh hưởng đến thứ bạn <em>cảm nhận</em>: ly cà nóng hơn làm hương bay mạnh hơn (tốt), và che bớt vị đắng (cũng tốt). Nên nhiệt độ tác động lên hai chiều cùng lúc, và đây là lý do nó khó đánh giá.</p>

<h4>Kỹ thuật rót — đòn bẩy duy nhất chống channeling</h4>

<p>Đây là chỗ kỹ thuật thật sự có tác dụng, và cũng là chỗ duy nhất.</p>

<p>Rót đều, giữ mực nước ổn định, không rót quá cao, không để bã khô, xoay cả phễu để nước đi qua toàn bộ bề mặt — những thứ này không tăng mức chiết nhiều. Chúng làm cho mức chiết <em>đồng nhất hơn giữa các phần bã</em>.</p>

<p>Và đó là lý do kỹ thuật quan trọng: một ly cà chiết 20% đồng đều ngon hơn nhiều một ly cà chiết trung bình 20% nhưng dao động từ 12% đến 30%.</p>

<div class="callout ok">
<p class="callout-title">Một câu để nhớ</p>
<p><strong>Tỉ lệ quyết định độ đậm. Cỡ xay quyết định mức chiết. Kỹ thuật quyết định độ đều.</strong> Ba câu hỏi khác nhau, ba đòn bẩy khác nhau, không thay thế nhau.</p>
</div>

<h3>Thứ tự chẩn đoán</h3>

<p>Khi một ly cà không ngon, đừng bắt đầu bằng "tôi nên đổi gì". Bắt đầu bằng "vấn đề là chiều nào".</p>

<ol class="steps">
<li><strong>Ly cà đậm hay loãng so với bạn muốn?</strong><p>Nếu sai → đổi tỉ lệ. Đây là câu hỏi dễ nhất và nên trả lời trước. Đừng chỉnh cỡ xay cho một vấn đề về nồng độ.</p></li>
<li><strong>Có vị chua xanh/rau/gỗ, hay có vị đắng/khô/chát?</strong><p>Chua xanh → chiết thiếu. Đắng khô → chiết dư. Đây là chiều thứ hai.</p></li>
<li><strong>Ly cà có "rõ" không, hay lộn xộn?</strong><p>Nếu không có nốt nào nổi bật, và vừa chua vừa đắng → vấn đề là độ đều, không phải mức chiết. Đổi kỹ thuật, đừng đổi cỡ xay.</p></li>
</ol>

<div class="table-wrap">
<table>
<thead><tr><th>Triệu chứng</th><th>Chiều bị lệch</th><th>Đòn bẩy</th></tr></thead>
<tbody>
<tr><td>Mỏng, loãng, "không có gì"</td><td>Nồng độ</td><td>Tỉ lệ</td></tr>
<tr><td>Chua xanh, rau cỏ, hậu vị ngắn</td><td>Mức chiết (thấp)</td><td>Cỡ xay mịn hơn / nóng hơn / lâu hơn</td></tr>
<tr><td>Đắng, khô, chát, hậu vị dài</td><td>Mức chiết (cao)</td><td>Cỡ xay thô hơn / nguội hơn / ngắn hơn</td></tr>
<tr><td>Vừa chua vừa đắng, không có nốt rõ</td><td>Độ đều</td><td>Kỹ thuật rót</td></tr>
<tr><td>Đắng chỉ ở cuối ly</td><td>Độ đều (fines)</td><td>Giảm khuấy, xay đều hơn, đừng để bã khô</td></tr>
</tbody>
</table>
</div>

<h3>Điều mô hình này không giải thích được</h3>

<p>Trung thực mà nói, có những thứ nằm ngoài mô hình ba chiều:</p>

<ul>
<li><strong>Sự tương tác giữa các hợp chất.</strong> Một ly có thể có đủ đường và đủ acid nhưng vẫn không ngon, vì tỉ lệ giữa chúng sai. Mô hình không nắm được điều này.</li>
<li><strong>Ảnh hưởng của kỳ vọng.</strong> Như đã nói ở chương 1, thông tin trên bao bì thay đổi những gì bạn nếm. Đây không phải biến trong mô hình.</li>
<li><strong>Khác biệt giữa các hạt trong cùng một mẻ.</strong> Không phải mọi hạt cà trong bao đều giống nhau — chúng khác về kích thước, độ ẩm, mức rang cục bộ. Mô hình giả định một mức trung bình.</li>
</ul>

<p>Nhưng ba chiều đó vẫn là công cụ tốt nhất bạn có, vì chúng <strong>đúng trong phần lớn trường hợp</strong> và chúng <strong>cho bạn biết nên làm gì tiếp theo</strong>. Một mô hình đơn giản mà dùng được tốt hơn một mô hình hoàn chỉnh mà không dùng được.</p>
`
  },

  {
    id: "ch-co-xay",
    title: "Cỡ xay: một con số, hai cơ chế",
    lede: "Sách xếp cỡ xay ở vị trí thứ hai. Chương này nói vì sao nó mạnh đến vậy, và vì sao nó không phải một núm xoay duy nhất.",
    minutes: 11,
    tags: ["chiết xuất", "cỡ xay", "vật lý"],
    body: `
<p>Trong ba đòn bẩy của chương trước, cỡ xay là cái bị hiểu sai nhiều nhất. Nó được nói đến như một con số: mịn hơn, thô hơn, một nấc. Nhưng thứ máy xay nhả ra không phải một con số. Nó là một hỗn hợp hạt với nhiều kích thước, và chính hỗn hợp đó — không phải đường kính trung bình — quyết định nước đi qua bã nhanh hay chậm, và lấy được gì trên đường đi.</p>

<h3>Chuyện xảy ra trong máy xay</h3>

<p>Hạt rang giòn. Lưỡi nghiền bẻ nó gãy theo những vết nứt có sẵn, và những vết nứt đó chạy dọc vách tế bào — chỗ yếu nhất của hạt. Vì vậy một lần xay không tạo ra hạt đều cỡ. Nó tạo ra hai nhóm.</p>

<p><strong>Nhóm lớn</strong> là những mảnh vỡ của phần ruột hạt. Kích thước nhóm này do khe nghiền quyết định: bạn vặn mịn, nhóm này nhỏ đi.</p>

<p><strong>Nhóm nhỏ</strong> là mảnh vách tế bào vỡ vụn. Chúng có mặt ở mọi cỡ cài đặt, và đường kính của chúng thường rơi vào khoảng <strong>30–40 µm</strong> <span class="tier tier-a">Bằng chứng</span>. Người ta gọi chúng là <em>fines</em>, với ngưỡng vận hành thường lấy là dưới 100 µm.</p>

<p>Điều này có hai hệ quả không hiển nhiên. Thứ nhất: phân bố kích thước hạt của cà phê xay thường có hai đỉnh, và cái đỉnh nhỏ không biến mất khi bạn vặn thô — nó chỉ chiếm tỉ lệ khác đi. Thứ hai: nhiệt độ của hạt trước khi xay thay đổi phân bố. Hạt lạnh cho phân bố hẹp hơn và trung bình nhỏ hơn; còn nguồn gốc hạt và cách sơ chế thì gần như không ảnh hưởng đến phân bố <span class="tier tier-a">Bằng chứng</span>. Đây là lý do kỹ thuật xay hạt còn đông lạnh ở chương 3 có cơ sở: hạt lạnh vỡ giòn hơn, nên ít mảnh vụn hơn.</p>

<h3>Trung vị không phải cỡ xay</h3>

<p>Khi bạn nói "tôi xay ở 18 nấc", bạn đang nói một con số của máy, không phải một tính chất của bột. Ba con số mới mô tả được bột:</p>

<div class="table-wrap">
<table>
<thead><tr><th>Con số</th><th>Nó nói gì</th><th>Ảnh hưởng đến ly cà</th></tr></thead>
<tbody>
<tr><td><strong>Trung vị</strong> (D50)</td><td>Một nửa khối lượng hạt nhỏ hơn mức này</td><td>Tốc độ chiết trung bình</td></tr>
<tr><td><strong>Độ rộng</strong> (D90 − D10)</td><td>Hỗn hợp trải rộng đến đâu</td><td>Mức độ đều; bã có chỗ chiết quá, chỗ chưa tới</td></tr>
<tr><td><strong>Tỉ lệ fines</strong> (&lt; 100 µm)</td><td>Bao nhiêu phần trăm là mảnh vụn</td><td>Độ thấm của bã, và do đó thời gian rút</td></tr>
</tbody>
</table>
</div>

<p>Ba con số này không đi cùng nhau. Hai máy xay có thể cho cùng trung vị và khác hẳn lượng fines — và vì thế, cùng một "cỡ xay" trên giấy, hai kết quả khác nhau trong ly <span class="tier tier-a">Bằng chứng</span>.</p>

<p>Fines là con số quan trọng nhất trong ba, vì nó tác động lên dòng chảy chứ không chỉ lên diện tích bề mặt. Trong một nghiên cứu trên 43 loại capsule thương mại, khi tỉ lệ fines tăng từ 10% lên 15%, thời gian chiết dài thêm khoảng <strong>10 giây</strong> — dù trung vị kích thước chỉ dao động trong khoảng 255–549 µm <span class="tier tier-a">Bằng chứng</span>. Năm phần trăm hạt vụn, mười giây.</p>

<p>Một cảnh báo ngược lại, cũng cần thiết: trên một máy xay espresso, dải cài đặt từ 1.4 đến 2.0 chỉ đổi đường kính trung bình theo thể tích trong khoảng 273–295 µm, và trong thí nghiệm đó <strong>lưu lượng nước mạnh hơn cỡ xay</strong> <span class="tier tier-a">Bằng chứng</span>. Nghĩa là: có những lần bạn vặn ba nấc, đo, thấy không khác gì, rồi kết luận cỡ xay không quan trọng. Kết luận đó sai — bạn chỉ vừa chứng minh rằng ba nấc trên máy của bạn đổi rất ít.</p>

<h3>Hai cơ chế kéo ngược chiều</h3>

<p>Đây là phần cốt lõi, và là phần mọi lời khuyên về cỡ xay bỏ qua. Xay mịn hơn tác động lên hai thứ cùng lúc, theo hai hướng ngược nhau:</p>

<div class="table-wrap">
<table>
<thead><tr><th></th><th>Xay mịn hơn được gì</th><th>Xay mịn hơn mất gì</th></tr></thead>
<tbody>
<tr><td><strong>Cơ chế</strong></td><td>Diện tích bề mặt tăng; đường khuếch tán từ trong hạt ra ngoài ngắn lại</td><td>Khoảng rỗng giữa các hạt hẹp lại; bã dẫn nước kém hơn</td></tr>
<tr><td><strong>Kết quả</strong></td><td>Chất hoà tan ra nhanh hơn</td><td>Nước chảy chậm hơn, dễ nghẹt, dễ đi lệch chỗ</td></tr>
<tr><td><strong>Bạn thấy</strong></td><td>Ly đậm và rõ hơn</td><td>Thời gian rút dài; ly vừa đắng vừa chua, không có nốt</td></tr>
</tbody>
</table>
</div>

<p>Vì hai cơ chế này chạy cùng lúc, quan hệ giữa cỡ xay và mức chiết <strong>không đơn điệu</strong>. Nó không phải một đường thẳng đi lên. Nó là một đường cong có đỉnh.</p>

<h3>Đường cong có đỉnh</h3>

<p>Một mô hình giả định nước chảy đều qua bã sẽ dự đoán: xay càng thô, chiết càng ít, và ngược lại. Nhưng khi nhóm của Christopher Hendon đo thật trên espresso, mức chiết đạt đỉnh ở cỡ xay trung gian rồi <em>giảm</em> ở cả hai đầu — kể cả đầu mịn <span class="tier tier-a">Bằng chứng</span>. Ở đầu mịn, bã tắc và dòng chảy tách thành nhiều đường, nên phần lớn bã không được chiết đều.</p>

<p>Một mô hình hai đường dòng giải thích cùng hiện tượng: dưới một ngưỡng nào đó, xay mịn thêm chỉ làm nước đi lệch, và mức chiết tổng giảm <span class="tier tier-a">Bằng chứng</span>.</p>

<p>Đây không phải chi tiết học thuật. Nó giải thích một tình huống bạn sẽ gặp: ly cà nhạt, bạn xay mịn hơn, và nó nhạt hơn hoặc đắng hơn. Không phải bạn làm sai. Bạn đã đi qua đỉnh.</p>

<div class="callout">
<p class="callout-title">Dấu hiệu bạn đã qua đỉnh</p>
<p>Thời gian rút dài ra, nhưng vị <strong>không</strong> đậm lên — hoặc đậm lên kèm đắng và chát. Lúc đó xay thô lại một hai nấc, đừng xay mịn thêm.</p>
</div>

<h3>Ngâm khác chảy</h3>

<p>Mọi thứ trên đây nói về hệ có dòng chảy: nước đi qua bã và ra khỏi đó. Trong hệ ngâm kín, vật lý đổi khác — và đổi theo hướng ít người ngờ.</p>

<p>Khi cà phê ngâm đủ lâu để tới cân bằng, lượng chất lấy ra gần như do độ hoà tan và tỉ lệ cà/nước quyết định, không do kích thước hạt. Một nghiên cứu quét trung vị từ 579 đến 1311 µm — hơn gấp đôi — và mức chiết cân bằng chỉ dao động trong khoảng <strong>19–23%</strong>, trung bình 20,7% <span class="tier tier-a">Bằng chứng</span>. Cỡ xay đổi <em>tốc độ</em> tới cân bằng; nó không đổi <em>đích</em>.</p>

<p>Và trong một hệ kín, dấu của hiệu ứng có thể lật. Trong cold brew ngâm túi lọc, cùng một con cà Huila, cùng 14 giờ: cỡ medium cho 7,06% chiết, cỡ coarse cho 15,21% <span class="tier tier-a">Bằng chứng</span>. Xay thô hơn mà chiết nhiều hơn gấp đôi. Tác giả giải thích: bột medium đóng bánh trong túi, làm nước khó tiếp xúc đều, nên khuếch tán bị chặn. Bột thô giữ được cấu trúc rỗng, nước đi qua được.</p>

<p>Bài học không phải "cold brew nên xay thô". Bài học là: <strong>phương pháp quyết định dấu của hiệu ứng.</strong> Câu "xay mịn hơn thì chiết nhiều hơn" không phải một định luật vật lý. Nó là một xu hướng đúng trong một số hệ, và sai trong những hệ khác.</p>

<h3>Khi nào bạn không nếm ra</h3>

<p>Có một kết quả khó chịu hơn: đôi khi cỡ xay đổi mà không ai nhận ra. Trong một thử nghiệm với 45 người trên cà phê drip, những khác biệt nhỏ về trung vị kích thước hạt <strong>không được phân biệt</strong> — trong khi khác biệt giữa hai kiểu giỏ lọc thì có <span class="tier tier-a">Bằng chứng</span>.</n
<p>Nhưng cùng nghiên cứu đó cho một kết quả quan trọng hơn: bảng mô tả cảm quan tìm thấy sáu thuộc tính đổi theo cỡ xay, và có <strong>tương tác</strong> giữa cỡ xay và hình học giỏ lọc với vị đắng và hương hoa <span class="tier tier-a">Bằng chứng</span>. Nghĩa là: cỡ xay không tách khỏi cái phễu. Cùng một nấc xay, đổi phễu, cho kết quả khác.</p>

<p>Đây là lý do "cỡ xay chuẩn cho pour over" không tồn tại, và cũng là lý do bạn không nên sao chép số nấc của người khác — kể cả khi hai người dùng cùng một loại máy xay.</p>

<h3>Vậy cỡ xay đứng thứ mấy</h3>

<p>Sách này nói thứ tự ưu tiên là nước → cỡ xay → độ tươi → kỹ thuật. Cần nói rõ: đó là <strong>thứ tự chẩn đoán</strong>, không phải một bảng xếp hạng đã được đo. Không có nghiên cứu nào so trực tiếp ba đòn bẩy này trong pour-over nóng, đo đồng thời TDS, mức chiết, thời gian rút và cảm quan <span class="tier tier-b">Hợp lý</span>.</p>

<p>Cái đo được thì hẹp hơn, nhưng vẫn đủ để xếp thứ tự thực dụng:</p>

<ul>
<li><strong>Nước</strong> có bằng chứng cảm quan trực tiếp: đổi bicarbonate là đổi vị, đo được bằng panel (chương 4).</li>
<li><strong>Cỡ xay</strong> là đòn bẩy thuỷ lực mạnh nhất. Nó đổi cả tốc độ chiết lẫn đường đi của nước — hai thứ mà không đòn bẩy nào khác đổi cùng lúc.</li>
<li><strong>Kỹ thuật rót</strong> là đòn bẩy duy nhất tác động chủ yếu lên <em>độ đều</em>, và nó tương tác với cỡ xay thay vì thay thế cỡ xay.</li>
</ul>

<p>Nên câu đúng không phải "kỹ thuật yếu hơn cỡ xay". Câu đúng là: <strong>kỹ thuật sửa một thứ khác.</strong> Nếu bã đều mà vị sai, đổi cỡ xay hoặc nhiệt. Nếu bã không đều, đổi kỹ thuật — và đổi cỡ xay lúc đó chỉ là che lỗi bằng một biến khác.</p>

<h3>Cách xay trong thực tế</h3>

<ol class="steps">
<li><strong>Bắt đầu từ một mốc và ghi lại hai con số</strong><p>Số nấc, tổng thời gian rút, và thời gian của 30 giây cuối. Không có hai con số này, bạn không có gì để so.</p></li>
<li><strong>Đổi hai nấc, đừng đổi một</strong><p>Trên nhiều máy xay, một nấc đổi quá ít để nếm ra. Nếu bạn đổi một nấc, thấy không khác, rồi bỏ cuộc, bạn đang đo nhiễu chứ không đo cỡ xay.</p></li>
<li><strong>Đọc vị và thời gian rút cùng lúc</strong><p>Rút dài hơn + đắng/khô hơn → quá mịn. Rút dài hơn + vẫn chua xanh → nhiều khả năng là không đều, không phải chiết thiếu. Rút ngắn hơn + nhạt → quá thô.</p></li>
<li><strong>Dừng khi hai tín hiệu đồng ý</strong><p>Vị đúng và thời gian rút nằm trong khoảng bạn chấp nhận. Đừng tìm "cỡ xay chuẩn" — không có, và cái phễu của bạn sẽ từ chối nó.</p></li>
</ol>

<div class="callout ok">
<p class="callout-title">Một câu để nhớ</p>
<p><strong>Cỡ xay không phải một núm, mà là hai: kích thước và độ rộng.</strong> Bạn chỉnh được cái thứ nhất. Cái thứ hai do máy xay quyết định, và đó là lý do nâng cấp máy xay có tác dụng lớn hơn học thêm ba công thức.</p>
</div>

<p>Và đây là chỗ chương này dừng, đúng như nó phải dừng: chưa có nghiên cứu nào cô lập riêng cỡ xay trong pour-over nóng, với cùng một con cà, cùng liều, cùng tỉ lệ, cùng nhiệt, cùng kỹ thuật rót, mà đo đủ bốn thứ. Những gì chương này nói là tổng hợp từ espresso, từ ngâm, từ mô hình và từ một thử nghiệm cảm quan trên drip. Đó là nền tốt hơn truyền miệng, và vẫn là nền mỏng hơn ta muốn.</p>
`
  }

  ]
});
