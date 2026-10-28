(function (window) {
  "use strict";

  window.BOOK_PARTS = window.BOOK_PARTS || [];

  window.BOOK_PARTS.push({
    id: "phu-luc",
    roman: "A",
    appendix: true,
    title: "Nguồn tham chiếu",
    blurb: "Sách dùng ba nhãn bằng chứng. Phụ lục này cho bạn thấy cái nhãn đó dựa trên cái gì — và chỗ nào nó không dựa trên gì cả.",
    chapters: [

      {
        id: "ch-nguon-cach-doc",
        title: "Cách lập danh mục này",
        lede: "Sách không có ghi chú nguồn khi viết. Đây là danh mục dựng lại từ sau, và mình nói rõ nó được dựng bằng cách nào, để bạn biết chỗ nào tin được và chỗ nào là suy luận.",
        minutes: 4,
        tags: ["phụ lục", "phương pháp"],
        body: `
<p>Cuốn sách này được viết từ một nguyên tắc: nói rõ chỗ nào có bằng chứng, chỗ nào chỉ là suy luận hợp lý, chỗ nào là truyền miệng. Nhưng khi viết, mình không ghi lại nguồn. Không có chú thích cuối trang, không có thư mục tham khảo, chỉ có ba cái nhãn. Đó là một lỗ hổng thật: một cái nhãn mà không dẫn được nguồn thì chỉ là một lời khẳng định có trang trí.</p>

<p>Phụ lục này sửa lỗ hổng đó. Nó không phải một thư mục có sẵn được chép vào — nó được dựng ngược, từ những gì sách thật sự nói.</p>

<h3>Ba bước</h3>

<ol class="steps">
<li><strong>Rút khẳng định ra khỏi văn xuôi.</strong><p>Mỗi chương được đọc lại và tách thành hai loại câu: câu có thể kiểm chứng bằng tài liệu bên ngoài, và câu là kinh nghiệm, quy trình, hoặc lời khuyên. Chỉ loại thứ nhất cần nguồn.</p></li>
<li><strong>Tra tài liệu gốc cho từng khẳng định.</strong><p>Ưu tiên bài bình duyệt có DOI. Khi không có, dùng tài liệu tiêu chuẩn của ngành hoặc nguồn sơ cấp của chính tác giả phương pháp đó.</p></li>
<li><strong>Đối chiếu lại, và ghi chỗ không khớp.</strong><p>Nếu tài liệu tìm được không nói đúng điều sách nói, chỗ đó được ghi vào chương A4 thay vì được gán đại một nguồn cho đủ.</p></li>
</ol>

<p>Bước thứ ba là bước quan trọng nhất, và cũng là bước dễ bỏ qua nhất. Một danh mục trông đầy đủ mà gán sai nguồn thì tệ hơn không có danh mục, vì nó làm người đọc tin vào một thứ không đứng vững.</p>

<div class="callout">
<p class="callout-title">Nguồn không phải là bằng chứng</p>
<p>Có nguồn không có nghĩa là khẳng định đúng. Một bài báo nhỏ, một thử nghiệm trên hai mươi người, một mô hình chưa kiểm chứng — tất cả đều là nguồn. Cái quyết định vẫn là thiết kế của nghiên cứu đó, và phụ lục này ghi rõ thiết kế mỗi khi nó quan trọng.</p>
</div>

<h3>Sách đứng ở đâu, sau khi tra</h3>

<table>
<tr><th>Trạng thái</th><th>Số chương</th><th>Nghĩa là gì</th></tr>
<tr><td>Dẫn được trực tiếp</td><td>9</td><td>Có tài liệu nói đúng điều sách nói. Nhãn Bằng chứng đứng vững.</td></tr>
<tr><td>Dẫn được một phần</td><td>5</td><td>Có tài liệu cho phần lõi, nhưng sách nói rộng hơn tài liệu.</td></tr>
<tr><td>Không có nguồn ngoài</td><td>2</td><td>Chương 16 và 18. Không có nghiên cứu nào cho khẳng định trung tâm.</td></tr>
<tr><td>Quy trình, không cần nguồn</td><td>10</td><td>Nhật ký, dụng cụ, checklist. Không đặt khẳng định thực nghiệm.</td></tr>
<tr><td>Đã sửa</td><td>2</td><td>Chương 7 và 10. Đã chỉnh ngay trong sách; chi tiết ở A4.</td></tr>
</table>

<p>Cộng lại là 28. Cách đếm này không làm sách yếu đi; nó làm sách đọc được đúng cách. Bạn biết chương nào là chỗ dựa và chương nào là chỗ mình đang nghĩ thành tiếng.</p>
`
      },

      {
        id: "ch-nguon-danh-muc",
        title: "Thư mục",
        lede: "Ba mươi ba nguồn, xếp theo chủ đề. Mỗi mục có DOI hoặc đường dẫn đã mở và đọc, kèm một câu nói nguồn đó đóng góp gì.",
        minutes: 12,
        tags: ["phụ lục", "nguồn"],
        body: `
<p>Đánh số theo thứ tự xuất hiện trong chương A3. Những mục có ghi chú dài là những mục mà cách đọc kết quả quan trọng hơn cái kết quả.</p>

<h3>Nước</h3>

<p><strong>[1]</strong> Rune, C. J. B., Steen, I., Kjærgaard, E. R., Maroun, Z., Bredie, W. L. P., &amp; Kjaergaard, H. G. (2026). <em>Impact of Water Composition on Coffee Sensory Properties: A Comprehensive Analysis.</em> Journal of Food Science, 91(9), e71434. doi:10.1111/1750-3841.71434</p>

<p>Dùng nước siêu tinh khiết làm mốc, thêm canxi, magiê và bicarbonate, đánh giá bằng duo–trio và phân tích mô tả. Độ cứng <strong>không</strong> tạo khác biệt hương vị, kể cả khi thêm canxi cao hơn nước uống thông thường. Bicarbonate tác động mạnh: tăng bicarbonate làm giảm chua, giảm trái cây, giảm phức tạp, tăng rang và đắng. Bài cũng nêu rõ vùng nước "lý tưởng" của ngành <strong>chưa từng được kiểm chứng bằng cảm quan có kiểm soát</strong> trước nghiên cứu này.</p>

<p><strong>[2]</strong> Rune, C. J. B., và cộng sự (2023). <em>Acids in brewed coffees: Chemical composition and sensory threshold.</em> Current Research in Food Science, 6, 100485. doi:10.1016/j.crfs.2023.100485</p>

<p>Axit malic, acetic và lactic trong cà phê pha French press đều nằm dưới ngưỡng phát hiện riêng lẻ. Citric là ngoại lệ về ngưỡng, nhưng khi thêm axit vào và mời chuyên gia nếm, họ không gọi đúng tên axit nào.</p>

<p><strong>[3]</strong> Hendon, C. H., Colonna-Dashwood, L., &amp; Colonna-Dashwood, M. (2014). <em>The Role of Dissolved Cations in Coffee Extraction.</em> Journal of Agricultural and Food Chemistry, 62(21), 4947–4950. doi:10.1021/jf501687c</p>

<p>Bài hoá học về cation và hiệu suất chiết, không đo cảm quan. Chương 4 từng dẫn bài này cho một phát hiện cảm quan; nguồn đã đổi sang [1] — xem A4.</p>

<p><strong>[4]</strong> Specialty Coffee Association (2018). <em>The 2018 SCA Water Quality Handbook.</em> Tài liệu trả phí, không có bản PDF công khai. Đây là nguồn của vùng 40–75 ppm alkalinity, 50–175 ppm độ cứng, pH 6,5–7,5.</p>

<p><strong>[5]</strong> Lockhart, E. E. (1957). <em>The Soluble Solids in Beverage Coffee as an Index to Cup Quality.</em> Coffee Brewing Institute, Publication No. 27. Nền tảng của biểu đồ kiểm soát pha. Lưu ý: tài liệu 1957 không mang tên "Brewing Control Chart" — cái tên đó là sản phẩm sau này.</p>

<h3>Chiết xuất và nhiệt độ</h3>

<p><strong>[6]</strong> Batali, M. E., Ristenpart, W. D., &amp; Guinard, J.-X. (2020). <em>Brew temperature, at fixed brew strength and extraction, has little impact on the sensory profile of drip brew coffee.</em> Scientific Reports, 10, 16450. doi:10.1038/s41598-020-73341-4</p>

<p>Thử 87, 90, 93 °C nhưng chỉnh cỡ xay và thời gian để giữ TDS và EY như nhau. Khi hai thứ đó đã cố định, nhiệt độ trong khoảng này gần như không tạo khác biệt cảm quan. Đây là lý do chương 9 nói nhiệt độ là đòn bẩy yếu.</p>

<p><strong>[7]</strong> Klotz, J. A., Winkler, G., &amp; Lachenmeier, D. W. (2020). <em>Influence of the Brewing Temperature on the Taste of Espresso.</em> Foods, 9(1), 36. doi:10.3390/foods9010036</p>

<p>Espresso 80 so với 93 °C: 11/24 người phân biệt đúng, không có ý nghĩa thống kê. 80 so với 128 °C: 15/24, có ý nghĩa. Nghiên cứu nhỏ, nên đọc như một dấu hiệu chứ không phải một định luật.</p>

<p><strong>[8]</strong> Schmieder, B. K. L., Pannusch, V. B., Vannieuwenhuyse, L., Briesen, H., &amp; Minceva, M. (2023). <em>Influence of Flow Rate, Particle Size, and Temperature on Espresso Extraction Kinetics.</em> Foods, 12(15), 2871. doi:10.3390/foods12152871</p>

<p>Thu mười phần liên tiếp của một mẻ espresso. Trigonelline giảm nhanh nhất, rồi TDS, rồi 5-CQA, caffeine giảm chậm nhất. Đây là nguồn của bảng trong chương 8.</p>

<p><strong>[9]</strong> Guinard, J.-X., và cộng sự (2023). <em>A new Coffee Brewing Control Chart relating sensory properties and consumer liking to brew strength, extraction yield, and brew ratio.</em> Journal of Food Science, 88(5), 2168–2177. doi:10.1111/1750-3841.16531</p>

<p><strong>[10]</strong> Moroney, K. M., O’Connell, K., Meikle-Janney, P., O’Brien, S. B. G., Walker, G. M., &amp; Lee, W. T. (2019). <em>Analysing extraction uniformity from porous coffee beds using mathematical modelling and computational fluid dynamics approaches.</em> PLOS ONE, 14(7), e0219906. doi:10.1371/journal.pone.0219906</p>

<p><strong>[11]</strong> Lee, W. T., Smith, A., &amp; Arshad, A. (2023). <em>Uneven extraction in coffee brewing.</em> Physics of Fluids, 35(5), 054110. doi:10.1063/5.0138998</p>

<p>Mô hình hai đường dẫn dòng chảy, giải thích tại sao dưới một ngưỡng nhất định, xay mịn hơn lại có thể đi kèm chiết xuất giảm.</p>

<h3>Cảm nhận và cupping</h3>

<p><strong>[12]</strong> Specialty Coffee Association. <em>Cupping Protocol and Form</em> (bộ 2004) — đã được thay thế, xem mục [13].</p>

<p><strong>[13]</strong> Specialty Coffee Association (2024). <em>Coffee Value Assessment</em> — SCA Standard 102-2024 (Sample Preparation and Tasting Mechanics), 103-2024 (Descriptive Assessment), 104-2024 (Affective Assessment).</p>

<p>CVA không dùng một điểm tổng duy nhất; nó tách thành đánh giá mô tả, đánh giá cảm xúc và phần ngoại cảnh. Đây là thay đổi lớn nhất của ngành cupping trong hai mươi năm, và là lý do chương 10 giờ mở bằng một ghi chú về bộ 2004.</p>

<p><strong>[14]</strong> Chambers, E., IV, và cộng sự (2016). <em>Development of a "living" lexicon for descriptive sensory analysis of brewed coffee.</em> Journal of Sensory Studies, 31(6), 465–480. doi:10.1111/joss.12237</p>

<p>Lexicon 110 thuộc tính, nền của bánh xe hương vị 2016. Bản 2.0 công bố tháng 10/2017.</p>

<p><strong>[15]</strong> Bressani, A. P. P., Martinez, S. J., Batista, N. N., Simão, J. B. P., &amp; Schwan, R. F. (2021). <em>Into the minds of coffee consumers: perception, preference, and impact of information in the sensory analysis of specialty coffee.</em> Food Science and Technology, 41(Suppl. 2), 667–675. doi:10.1590/fst.30720</p>

<p>Cùng một mẫu, nửa có thông tin "specialty, 85 điểm, lên men tự nhiên". Có thông tin thì mô tả nghiêng về citrus và trái cây; điểm thích tổng thể không đổi. Đây là nguồn tốt nhất cho câu "thông tin đổi cách bạn mô tả, không đổi mức bạn thích".</p>

<p><strong>[16]</strong> Sörqvist, P., Hedblom, D., Holmgren, M., Haga, A., Langeborg, L., Nöstl, A., &amp; Kågström, J. (2013). <em>Who Needs Cream and Sugar When There Is Eco-Labeling? Taste and Willingness to Pay for "Eco-Friendly" Coffee.</em> PLOS ONE, 8(12), e80719. doi:10.1371/journal.pone.0080719</p>

<p><strong>[17]</strong> Artêncio, M. M., và cộng sự (2023). <em>The impact of coffee origin information on sensory and hedonic judgment of fine Amazonian robusta coffee.</em> Journal of Sensory Studies, 38(3), e12827. doi:10.1111/joss.12827</p>

<p>Thông tin xuất xứ thay đổi đánh giá cảm quan nhưng không thay đổi mức ưa thích.</p>

<p><strong>[18]</strong> Carvalho, F. M., de Sousa, M. M. M., &amp; Nadaleti, D. H. S. (2026). <em>Label Information About Fermentation Processing Affects Consumers’ Sensory and Hedonic Judgements of Specialty Coffee.</em> Foods, 15(8), 1287. doi:10.3390/foods15081287</p>

<p>180 người, cùng một cà, ba nhãn khác nhau. Nhãn "fermentation" khiến người thử kỳ vọng chua hơn và thích ít hơn — kỳ vọng đó đi vào cả điểm nếm.</p>

<p><strong>[19]</strong> Yeager, S. E., và cộng sự (2023). <em>Acids in coffee: A review of sensory measurements and meta-analysis of chemical composition.</em> Critical Reviews in Food Science and Nutrition, 63(8), 1010–1036. doi:10.1080/10408398.2021.1957767</p>

<h3>Độ tươi và bảo quản</h3>

<p><strong>[20]</strong> Smrke, S., và cộng sự (2018). <em>Time-Resolved Gravimetric Method To Assess Degassing of Roasted Coffee.</em> Journal of Agricultural and Food Chemistry, 66(21), 5293–5300. doi:10.1021/acs.jafc.7b03310</p>

<p><strong>[21]</strong> Anderson, B. A., và cộng sự (2003). <em>The diffusion kinetics of carbon dioxide in fresh roasted and ground coffee.</em> Journal of Food Engineering, 59(1), 71–78. doi:10.1016/S0260-8774(02)00432-6</p>

<p><strong>[22]</strong> Ross, C. F., Pecka, K., &amp; Weller, K. (2006). <em>Effect of storage conditions on the sensory quality of ground Arabica coffee.</em> Journal of Food Quality, 29(6), 596–606. doi:10.1111/j.1745-4557.2006.00093.x</p>

<p><strong>[23]</strong> Kreuml, A. M. L., và cộng sự (2013). <em>Changes in sensory quality characteristics of coffee during storage.</em> Food Science &amp; Nutrition, 1(4), 267–272. doi:10.1002/fsn3.35</p>

<p><strong>[24]</strong> Gantner, M., và cộng sự (2024). <em>Effect of Temperature and Storage on Coffee’s Volatile Compound Profile and Sensory Characteristics.</em> Foods, 13(24), 3995. doi:10.3390/foods13243995</p>

<p>Bảo quản 5 °C so với 20 °C trong một tháng: nhiệt độ thấp làm chậm thay đổi. Đây là nguồn gần nhất cho khẳng định "trữ đông giữ chất lượng" ở chương 3 — lưu ý, gần nhất, không phải trùng khớp.</p>

<p><strong>[25]</strong> Smrke, S., và cộng sự (2022). <em>Effects of different coffee storage methods on coffee freshness after opening of packages.</em> Food Packaging and Shelf Life, 33, 100893. doi:10.1016/j.fpsl.2022.100893</p>

<p><strong>[26]</strong> Specialty Coffee Association (2012). <em>What is the shelf life of roasted coffee? A literature review on coffee staling.</em></p>

<h3>Phương pháp pha</h3>

<p><strong>[27]</strong> Kasuya, T. (2016). Phương pháp 4:6, trình bày tại World Brewers Cup, Dublin, ngày 23–24 tháng 6 năm 2016. Bản chép lời và công thức do Kurasu đăng ngày 7 tháng 10 năm 2016.</p>

<p>Lưu ý về độ chặt: đây là nguồn gần nhất còn truy cập được, không phải ấn phẩm chính thức của World Coffee Events. Khi dẫn, nên nói "trình bày tại WBrC 2016", không nói "công bố lần đầu".</p>

<p><strong>[28]</strong> Hoffmann, J. <em>The Ultimate V60 Technique</em> (video). Năm đăng chưa xác minh được — thường được ghi là 2019, nhưng trang video không hiển thị ngày trong lần kiểm tra. Đừng in năm nếu chưa kiểm lại.</p>

<p><strong>[29]</strong> Hedrick, L. <em>EASY V60 (CONICAL) RECIPE FOR VIBRANT CUPS!</em> (video, phương pháp "121"). Chỉ xác minh được mốc muộn nhất: đã được nhắc trong một bài ngày 24 tháng 9 năm 2022.</p>

<p><strong>[30]</strong> Santanatoglia, A., và cộng sự (2023). <em>Discrimination of Filter Coffee Extraction Methods of a Medium Roasted Specialty Coffee Based on Volatile Profiles and Sensorial Traits.</em> Foods, 12(17), 3199. doi:10.3390/foods12173199</p>

<p>So V60, AeroPress, French press và Pure Brew trên cùng một Kenya Arabica. Giấy cho nhiều hợp chất caramel và hoa hơn; kim loại cho nhiều hợp chất trái cây và rang hơn. Một con cà, bốn phương pháp — nên đọc là xu hướng, không phải luật.</p>

<p><strong>[31]</strong> Liang, J., Chan, K. C., &amp; Ristenpart, W. D. (2021). <em>An equilibrium desorption model for the strength and extraction yield of full immersion brewed coffee.</em> Scientific Reports, 11, 6904. doi:10.1038/s41598-021-85787-1</p>

<p>Ở cân bằng, EY xấp xỉ 21% trên nhiều tỉ lệ; tỉ lệ đổi TDS mạnh nhưng đổi EY rất ít.</p>

<p><strong>[32]</strong> Gagné, J. (2019). <em>The Dynamics of Coffee Extraction</em> (29 tháng 1) và <em>Testing a Model of Extraction Dynamics</em> (23 tháng 2).</p>

<p>Bài blog, không bình duyệt, và chính tác giả ghi rằng mô hình chưa được kiểm chứng với dữ liệu thực nghiệm khi đăng. Sách dẫn đúng điểm này ở chương 8 — đây là chỗ sách nghiêm khắc với nguồn của chính nó.</p>

<p><strong>[33]</strong> Cameron, M. I., và cộng sự (2020). <em>Systematically improving espresso: insights from mathematical modeling and experiment.</em> Matter. doi:10.1016/j.matt.2019.12.019</p>

<p>Bài bình duyệt cùng nhóm Hendon. Nếu cần một nguồn học thuật cho mô hình espresso, dùng bài này, không dùng blog.</p>

<div class="callout">
<p class="callout-title">Ba bài không mở được toàn văn</p>
<p>[17], [22] và trang DOI của [5] bị nhà xuất bản chặn trong lúc tra. Chi tiết trong các mục đó lấy từ tóm tắt và từ bài tổng quan của SCA. Nếu bạn cần trích dẫn chính xác đến từng câu, phải mở bản đầy đủ.</p>
</div>
`
      },

      {
        id: "ch-nguon-doi-chieu",
        title: "Đối chiếu từng chương",
        lede: "Khẳng định nào, được gắn nhãn gì, và nguồn nào đứng sau. Đây là bảng để tra, không phải để đọc liền mạch.",
        minutes: 9,
        tags: ["phụ lục", "bảng"],
        body: `
<p>Cột cuối là phán quyết của lần tra này, không phải của tác giả sách. "Dẫn được" nghĩa là tìm thấy tài liệu nói đúng điều sách nói, không có nghĩa là tài liệu đó hoàn hảo.</p>

<table>
<tr><th>Ch.</th><th>Khẳng định cần nguồn</th><th>Nhãn trong sách</th><th>Nguồn</th><th>Kết luận</th></tr>
<tr><td>1</td><td>Thông tin trên bao bì làm thay đổi vị bạn nếm</td><td>Bằng chứng</td><td>[15] [16] [17] [18]</td><td>Dẫn được</td></tr>
<tr><td>2</td><td>Không có định nghĩa chung cho "medium roast"; Agtron có hai biến thể</td><td>—</td><td>[12]–[14] cho phần đo màu</td><td>Một phần</td></tr>
<tr><td>3</td><td>Trữ đông giữ chất lượng dài hạn</td><td>Bằng chứng</td><td>[22] [23] [24] [25]</td><td>Dẫn được</td></tr>
<tr><td>3</td><td>20 ngày tuổi pha nước đúng ngon hơn 5 ngày tuổi pha nước kiềm 250 ppm</td><td>"không phải ý kiến"</td><td>không có</td><td>Không có nguồn</td></tr>
<tr><td>4</td><td>Bicarbonate chi phối cảm nhận, canxi thì không</td><td>Bằng chứng</td><td>[1] trực tiếp, [3] hoá học</td><td>Dẫn được, nguồn đã đổi</td></tr>
<tr><td>4</td><td>Vùng nước 40–75 ppm alkalinity, 50–175 ppm độ cứng, pH 6,5–7,5</td><td>Hợp lý</td><td>[4]</td><td>Dẫn được</td></tr>
<tr><td>5</td><td>Bút TDS không đo alkalinity; HCO₃ × 0,82; 1 dKH = 17,86 ppm</td><td>—</td><td>hoá học phổ thông</td><td>Không cần nguồn</td></tr>
<tr><td>6</td><td>Pha loãng tuyến tính; số liệu nước khoáng đóng chai</td><td>—</td><td>nhãn sản phẩm</td><td>Không cần nguồn</td></tr>
<tr><td>7</td><td>18–22% EY và 1,15–1,35% TDS</td><td>—</td><td>[5] và chuẩn Golden Cup</td><td>Đã sửa, xem A4</td></tr>
<tr><td>8</td><td>"Acid trước, đắng sau" là giả thuyết chưa kiểm chứng</td><td>Truyền miệng</td><td>[32]</td><td>Dẫn được, chính xác</td></tr>
<tr><td>8</td><td>Thứ tự giảm: trigonelline, TDS, 5-CQA, caffeine</td><td>Bằng chứng</td><td>[8]</td><td>Dẫn được</td></tr>
<tr><td>8</td><td>Axit malic, acetic, lactic dưới ngưỡng; chuyên gia không gọi được tên</td><td>Bằng chứng</td><td>[2]</td><td>Dẫn được</td></tr>
<tr><td>9</td><td>Nhiệt độ là đòn bẩy yếu khi TDS và EY đã cố định</td><td>—</td><td>[6] [7]</td><td>Dẫn được</td></tr>
<tr><td>10</td><td>Thang SCA mười mục, 100 điểm (bộ 2004)</td><td>—</td><td>[12] [13]</td><td>Đã ghi chú, xem A4</td></tr>
<tr><td>11</td><td>8,25 g trên 150 ml; năm cốc mỗi mẫu; quy trình bốn phút</td><td>—</td><td>[12]</td><td>Dẫn được</td></tr>
<tr><td>12</td><td>Ba lớp thời gian; bánh xe hương vị</td><td>—</td><td>[14]</td><td>Dẫn được</td></tr>
<tr><td>13</td><td>Cupping không dự đoán pour over</td><td>—</td><td>[30] [31]</td><td>Một phần</td></tr>
<tr><td>14</td><td>Immersion không có cùng cơ chế channeling</td><td>—</td><td>[10] [11] [31]</td><td>Một phần</td></tr>
<tr><td>15</td><td>Giấy và kim loại cho hồ sơ bay hơi khác nhau</td><td>Hợp lý</td><td>[30]</td><td>Dẫn được, một con cà</td></tr>
<tr><td>16</td><td>Vòi cách bã 3–5 cm; giữ mực nước trên mặt bã; 5–8 g/s</td><td>—</td><td>không có</td><td>Không có nguồn</td></tr>
<tr><td>17</td><td>Ba trường phái công thức</td><td>—</td><td>[27] [28] [29]</td><td>Dẫn được</td></tr>
<tr><td>18</td><td>Nhìn bã để chẩn đoán</td><td>—</td><td>không có</td><td>Không có nguồn</td></tr>
<tr><td>19</td><td>Bảng chẩn đoán</td><td>—</td><td>suy ra từ [10] [11]</td><td>Một phần</td></tr>
<tr><td>20–22</td><td>Quy trình, bốn luật, case study</td><td>—</td><td>phương pháp</td><td>Không cần nguồn</td></tr>
<tr><td>23</td><td>Giải phẫu một ngụm; đường mũi ngược</td><td>—</td><td>sinh lý khứu giác</td><td>Không cần nguồn</td></tr>
<tr><td>24</td><td>Ngôn ngữ nốt hương và cái bẫy của nó</td><td>—</td><td>[14] [19]</td><td>Một phần</td></tr>
<tr><td>25–28</td><td>Luyện khẩu vị, nhật ký, dụng cụ, checklist</td><td>—</td><td>phương pháp</td><td>Không cần nguồn</td></tr>
</table>

<p>Đọc theo chiều dọc, bảng này nói một điều: chín chương đứng trên tài liệu, năm chương đứng trên tài liệu một nửa, và hai chương — 16 và 18 — đứng trên kinh nghiệm của người viết. Hai chương đó không vì thế mà sai. Chúng chỉ không phải là chỗ để viện dẫn khoa học.</p>
`
      },

      {
        id: "ch-nguon-khoang-trong",
        title: "Ba chỗ đã sửa, và chỗ trống",
        lede: "Ba chỗ tài liệu gốc không khớp với sách — đã chỉnh xong; bảy khẳng định vẫn không có nguồn nào; và một ghi chú về bản quyền hình ảnh.",
        minutes: 8,
        tags: ["phụ lục", "sửa lỗi"],
        body: `
<p>Đây là chương mà mình muốn bạn đọc kỹ nhất trong cả phụ lục. Một cuốn sách dạy người ta phân biệt ba mức bằng chứng thì phải chịu cùng tiêu chuẩn đó với chính nó — và phải sửa, không chỉ ghi lại. Ba chỗ dưới đây đã được chỉnh ngay trong sách; mình giữ lại cách phát hiện vì phần đáng học nằm ở đó.</p>

<h3>Một: thang cupping 2004 đã được ghi chú</h3>

<p>Chương 10 đến 12 trình bày thang mười mục, 100 điểm của SCA. Đó là bộ <em>Cupping Protocol and Form</em> năm 2004, không phải tiêu chuẩn hiện hành.</p>

<p>Từ 2024, SCA đã thay bằng <em>Coffee Value Assessment</em> (SCA-102, 103 và 104-2024), và CVA <strong>không dùng một điểm tổng duy nhất</strong> — nó tách thành đánh giá mô tả, đánh giá cảm xúc và phần ngoại cảnh. Nói cách khác, thứ mà SCA công bố bây giờ là một hệ nhiều loại đánh giá, không phải một con số.</p>

<p>Điều này không làm sai nội dung chương. Câu "điểm số đo sự đồng thuận của những người được huấn luyện theo cùng một hệ tiêu chuẩn" vẫn đúng, và còn đúng hơn với CVA. Nhưng câu "hầu như mọi chuyên gia trong ngành đều dùng cùng một quy trình đó" thì từ 2024 không còn chính xác.</p>

<p>Đã sửa: chương 10 giờ nói rõ ngay từ câu đầu rằng đây là bộ 2004 và SCA đã chuyển sang CVA từ 2024, kèm lý do mười mục cũ vẫn đáng biết. Không phải viết lại chương — chỉ thêm một câu dẫn.</p>

<h3>Hai: vùng TDS đã chỉnh</h3>

<p>Chuẩn Golden Cup của SCA là <strong>1,15–1,35% TDS</strong>, tương đương 11,5–13,5 g/L, với 18–22% EY và tỉ lệ 55 g/L.</p>

<p>Con số 1,15–<strong>1,45</strong> lưu hành rất rộng — đủ rộng để mình đã viết nó vào sách mà không kiểm lại. Nó không phải con số của chuẩn. Đã sửa: nay là 1,15–1,35% ở cả ô ba con số lẫn phần giải thích TDS.</p>

<h3>Ba: nguồn chương 4 đã đổi</h3>

<p>Chương 4 viết: "nghiên cứu cảm quan có kiểm soát của Christopher Hendon và cộng sự cho thấy bicarbonate là yếu tố chi phối cảm nhận hương vị, trong khi thêm canxi ở mức cao không tạo ra khác biệt cảm quan đáng kể."</p>

<p>Bài của Hendon và cộng sự năm 2014 là bài <strong>hoá học về cation và hiệu suất chiết</strong>. Nó không đo cảm quan. Mình đã gán một phát hiện cảm quan cho một bài hoá học vì hai thứ nằm cùng một nhóm tác giả.</p>

<p>Khẳng định trong sách thì đúng — và đúng hơn mình tưởng. Rune và cộng sự (2026) nói gần như nguyên văn điều đó, kể cả chi tiết "canxi cao hơn mức nước uống thông thường vẫn không tạo khác biệt". Đã sửa: tên người được dẫn giờ là Rune và cộng sự, nhãn Bằng chứng giữ nguyên — và còn vững hơn trước.</p>

<h3>Bảy khẳng định không có nguồn</h3>

<p>Đây là chỗ hệ thống nhãn có thể mất giá trị, nếu để nguyên.</p>

<ul>
<li><strong>"Rang đậm dễ pha hơn"</strong> (chương 2) — đúng phần dễ, sai phần nên bắt đầu bằng. Không có nghiên cứu so sánh độ khó pha theo mức rang. Nên là Truyền miệng, không phải để trống.</li>
<li><strong>Độ tươi so với nước</strong> (chương 3) — câu so sánh cụ thể không có nghiên cứu nào. Cơ chế đúng, nên hạ xuống Hợp lý.</li>
<li><strong>Vòi cách bã 3–5 cm, giữ mực nước trên mặt bã, 5–8 g/s</strong> (chương 16) — suy luận từ cơ chế, chưa ai đo. Hợp lý, không hơn.</li>
<li><strong>Nhìn bã để chẩn đoán</strong> (chương 18) — chỗ sách tự tin nhất mà bằng chứng mỏng nhất. Không có nghiên cứu nào nối hình dạng bã với bản đồ chiết xuất. Nên là Truyền miệng.</li>
<li><strong>Bloom là bước xử lý khí</strong> (chương 3) — cơ chế đúng, tác dụng cảm quan chưa được chứng minh. Nên là Hợp lý.</li>
<li><strong>Tỉ lệ đổi TDS tuyến tính, 1:16 sang 1:15 đậm hơn 6–7%</strong> (chương 7) — số học đúng, nhưng con số 6–7% là ngoại suy chưa được kiểm riêng.</li>
<li><strong>"Không có nghiên cứu nào cho thấy điểm cupping dự đoán được mức ưa thích"</strong> (chương 10) — đúng tính đến nay, nhưng nên nói "chưa có" thay vì "không có", vì đó là khẳng định phủ định toàn cầu.</li>
</ul>

<h3>Một ghi chú về bản quyền</h3>

<p>Nếu sau này muốn in bánh xe hương vị vào sách: bánh xe của SCA và World Coffee Research phát hành theo giấy phép CC BY-NC-ND 4.0 — được dùng phi thương mại, phải ghi công, <strong>không được tạo bản phái sinh</strong>. Sách bán ra là dùng thương mại, nên phải xin phép. Sensory Lexicon của WCR cho tải và in miễn phí cho mục đích cá nhân, không kèm quyền tái bản.</p>

<h3>Điều phụ lục này chưa làm</h3>

<ul>
<li>Chưa tra từng khẳng định đến mức trích được số trang và câu gốc.</li>
<li>Chưa kiểm lại ngày đăng hai video ở [28] và [29].</li>
<li>Chưa có bản tiếng Anh của phụ lục khi chương này được viết — nếu bạn đang đọc bản tiếng Anh, nó đã có.</li>
<li>Chưa tra các khẳng định ở Phần VII và VIII, nơi phần lớn nội dung là phương pháp chứ không phải cơ chế.</li>
</ul>

<div class="callout ok">
<p class="callout-title">Điều đáng giữ lại</p>
<p>Sau khi tra, khẳng định trung tâm của cuốn sách — nước quan trọng hơn người ta tưởng, và alkalinity quan trọng hơn độ cứng — không chỉ đứng vững mà còn mạnh hơn. Ba chỗ phải sửa đều là chi tiết: một thang điểm đã cũ, một chữ số, một cái tên. Cả ba đã sửa xong. Không có chỗ nào phải rút lại.</p>
</div>
`
      }

    ]
  });
})(window);
