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
        title: "Ghi chú về nguồn",
        lede: "Mỗi nhãn bằng chứng trong sách dựa trên tài liệu nào — và chỗ nào không dựa trên gì.",
        minutes: 3,
        tags: ["phụ lục", "nguồn"],
        body: `
<p>Sách dùng ba nhãn bằng chứng. Phụ lục này nói rõ mỗi nhãn dựa trên tài liệu nào, và chỗ nào không dựa trên gì.</p>

<p>Nguyên tắc lập rất đơn giản: chỉ câu có thể kiểm chứng bằng tài liệu bên ngoài mới cần nguồn. Câu về kinh nghiệm, quy trình và lời khuyên thì không — và không được gán cho chúng một nguồn nghe có vẻ khoa học. Ưu tiên bài bình duyệt có DOI; khi không có, dùng tiêu chuẩn ngành hoặc nguồn sơ cấp của chính người đề xuất phương pháp.</p>

<p>Năm mươi bốn nguồn được xếp theo chủ đề ở A2 và theo chương ở A3. Trong 30 chương, mười chương dựa trực tiếp vào tài liệu, sáu chương dựa một phần, mười hai chương là quy trình nên không cần nguồn ngoài, và hai chương — 17 và 20 — không có nguồn nào cho khẳng định trung tâm.</p>

<div class="callout">
<p class="callout-title">Có nguồn không có nghĩa là đúng</p>
<p>Một bài báo nhỏ, một thử nghiệm trên hai mươi người, một mô hình chưa ai kiểm chứng — tất cả đều là nguồn. Cái quyết định vẫn là thiết kế của nghiên cứu, và phụ lục này ghi rõ thiết kế mỗi khi nó quan trọng.</p>
</div>
`
      },

      {
        id: "ch-nguon-danh-muc",
        title: "Thư mục",
        lede: "Năm mươi bốn nguồn, xếp theo chủ đề. Mỗi mục có DOI hoặc đường dẫn đã mở và đọc, kèm một câu nói nguồn đó đóng góp gì.",
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

<p>CVA không dùng một điểm tổng duy nhất; nó tách thành đánh giá mô tả, đánh giá cảm xúc và phần ngoại cảnh. Đây là thay đổi lớn nhất của ngành cupping trong hai mươi năm, và là lý do chương 11 giờ mở bằng một ghi chú về bộ 2004.</p>

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

<p>Bài bình duyệt cùng nhóm Hendon. Nếu cần một nguồn học thuật cho mô hình espresso, dùng bài này, không dùng blog. Chương 10 dùng lại bài này cho đường cong có đỉnh.</p>

<h3>Cỡ xay</h3>

<p><strong>[34]</strong> Mo, C., Johnston, R., Navarini, L., Suggi Liverani, F., &amp; Ellero, M. (2023). <em>Exploring the link between coffee matrix microstructure and flow properties using combined X-ray microtomography and smoothed particle hydrodynamics simulations.</em> Scientific Reports, 13, 16374. doi:10.1038/s41598-023-42380-y</p>

<p>Chụp cắt lớp vi mô bã espresso và mô phỏng dòng chảy. Phân bố kích thước hạt có một đỉnh fines khoảng 30–40 µm, quy về các mảnh vách tế bào; đỉnh hạt thô do máy xay quyết định. Độ rỗng của bã giảm dần theo hướng từ đáy lên miệng.</p>

<p><strong>[35]</strong> Smrke, S., Eiermann, A., &amp; Yeretzian, C. (2024). <em>The role of fines in espresso extraction dynamics.</em> Scientific Reports, 14, 5612. doi:10.1038/s41598-024-55831-x</p>

<p>Định nghĩa fines là phần dưới 100 µm. Tăng tỉ lệ fines làm giảm độ thấm của bã, giảm lưu lượng và kéo dài thời gian chiết. Cùng một trung vị có thể đi kèm tỉ lệ fines khác nhau nếu công nghệ xay khác nhau.</p>

<p><strong>[36]</strong> Eiermann, A., và cộng sự (2020). <em>Extraction of single serve coffee capsules: linking properties of ground coffee to extraction dynamics and cup quality.</em> Scientific Reports, 10, 17079. doi:10.1038/s41598-020-74138-1</p>

<p>43 loại capsule thương mại. Trung vị 255–549 µm, mức chiết 15,7–26%, TDS 2,15–3,64%, thời gian 11,3–41 giây. Tỉ lệ fines từ 10% lên 15% đi kèm thời gian chiết dài thêm khoảng 10 giây.</p>

<p><strong>[37]</strong> Córdoba, N., Pataquiva, L., Osorio, C., Moreno, F. L., &amp; Ruiz, R. Y. (2019). <em>Effect of grinding, extraction time and type of coffee on the physicochemical and flavour characteristics of cold brew coffee.</em> Scientific Reports, 9, 8440. doi:10.1038/s41598-019-44886-w</p>

<p>Cold brew ngâm túi lọc, hai con cà Colombia. Ở 14 giờ, Huila: medium 7,06% chiết, coarse 15,21%. Tác giả giải thích bột medium đóng bánh trong túi nên khuếch tán bị chặn. Đây là nguồn cho câu "phương pháp quyết định dấu của hiệu ứng".</p>

<p><strong>[38]</strong> Frost, S. C., Ristenpart, W. D., &amp; Guinard, J.-X. (2019). <em>Effect of basket geometry on the sensory quality and consumer acceptance of drip brewed coffee.</em> Journal of Food Science, 84(8), 2297–2312. doi:10.1111/1750-3841.14696</p>

<p>45 người thử phân biệt, cộng với phân tích mô tả. Khác biệt nhỏ về trung vị kích thước hạt không được phân biệt; khác biệt giữa hai kiểu giỏ lọc thì có. Trong bảng mô tả, sáu thuộc tính đổi theo cỡ xay, và có tương tác cỡ xay × hình học giỏ với vị đắng và hương hoa.</p>

<p><strong>[39]</strong> Uman, E., và cộng sự (2016). <em>The effect of bean origin and temperature on grinding roasted coffee.</em> Scientific Reports, 6, 24483. doi:10.1038/srep24483</p>

<p>Bốn loại cà: phân bố kích thước hạt không phụ thuộc nguồn gốc hay cách sơ chế. Hạt lạnh cho phân bố hẹp hơn và trung bình nhỏ hơn — cơ sở cho kỹ thuật xay hạt còn đông lạnh ở chương 3.</p>

<p><strong>[40]</strong> Corrochano, B. R., Melrose, J. R., Bentley, A. C., Fryer, P. J., &amp; Bakalis, S. (2015). <em>A new methodology to estimate the steady-state permeability of roast and ground coffee in packed beds.</em> Journal of Food Engineering, 150, 106–116. doi:10.1016/j.jfoodeng.2014.11.006</p>

<p>Độ thấm của bã đo được trong khoảng 10⁻¹³–10⁻¹⁴ m². Ước lượng bằng phương trình Kozeny–Carman với phân bố hạt khô không khớp với phép đo, vì bã bị nén làm đổi cấu trúc đóng gói.</p>

<h3>Thi đấu</h3>

<p><strong>[41]</strong> World Coffee Championships. <em>World Brewers Cup</em> — thể thức thi, hai phần thi, trần TDS 2%; và trang kết quả công bố ngày 28/6/2026. wcc.coffee/world-brewers-cup · wcc.coffee/latest-news/wbrc-winners</p>

<p>Nguồn cho phần thể thức mở đầu chương 19, và cho tên, quốc gia, thứ hạng của sáu nhà vô địch. Trang kết quả xác nhận Nas Jaafar (Malaysia) vô địch 2026 tại Brussels.</p>

<p><strong>[42]</strong> Barista Hustle (2021). <em>No Stir: An Interview with World Brewers Cup Champion Matt Winton.</em> baristahustle.com/lesson/p-1-07-1-no-stir-an-interview-with-world-brewers-cup-champion-matt-winton/</p>

<p>20 g trên 300 g; năm lần rót nhưng <strong>không đều</strong>: 50 g bloom trong 35 giây, rồi 70 g, rồi ba lần 60 g. Cỡ xay thô (Kinu 3.6, khoảng 30 click trên Comandante) vì “để rót được năm lần mà không đắng”. Hai ấm ở hai nhiệt độ, ấm phụ thấp hơn vài độ. Ông nói rõ <strong>không để bã khô lần nào trừ lúc bloom</strong>, và rót gần như nhanh hết mức — nên câu “chờ bã rút rồi mới rót” là ngược với nguồn. Dụng cụ là nón kim loại: ông thử Kono, Origami và V60 thuỷ tinh, nhưng phần kim loại cho độ rõ mà ba cái kia không cho.</p>

<p>Winton cũng nói bốn lần rót không cho cùng biểu hiện với năm lần, và đội của ông đã thử sáu công thức nước. Đây là bản ghi chi tiết nhất cho hàng 2021 — nhưng lưu ý: bản tóm tắt “20 g / 300 g, 5 × 60 g, 93 °C” lưu hành trên mạng là bản đơn giản hoá, không phải điều ông kể trong bài phỏng vấn.</p>

<p><strong>[43]</strong> European Coffee Trip (2024). <em>Winning pour over recipe — Martin Wölfl.</em> europeancoffeetrip.com/winning-pour-over-recipe-martin-woelfl/</p>

<p>17 g trên 270 g, 93 °C, khoảng 490 µm, OREA V4 với giấy Sibarist FAST. Lưu ý: trang này chặn trình đọc khi tra, nên số liệu lấy từ bản tóm tắt được lập chỉ mục, chưa đối chiếu toàn văn. Chương 19 ghi đúng mức độ đó.</p>

<p><strong>Nguồn lệch:</strong> Wildkaffee ghi <strong>630 µm</strong> cho cùng ly đó, và chia rót 60/60/50/100 g thay vì bốn lần đều — chênh gần 30% về cỡ xay giữa hai trang công thức. Chương 19 dùng con số này làm ví dụ cho việc đừng chép micron.</p>

<p><strong>[44]</strong> Barista Magazine (2024). <em>10 Minutes with Martin Wölfl, Part One.</em> baristamagazine.com/10-minutes-with-martin-wolfl-part-one/</p>

<p>Xác nhận OREA V4, giấy Sibarist FAST, và con cà: Gesha của Finca Maya, sơ chế hai giai đoạn, sấy 33 ngày. Bài không đưa số gam; phần đó thuộc [43].</p>

<p><strong>[45]</strong> European Coffee Trip (2025). <em>Winning pour over recipe — SOLO Dripper.</em> europeancoffeetrip.com/winning-pourover-recipe-solo-dripper/</p>

<p>15 g trên 210 g; 30 g ở 96 °C, 90 g ở 96 °C, 90 g ở 80 °C qua Melodrip; khoảng 800 µm; tổng 1:45; nước 40 ppm. Đây là công thức đầy đủ nhất trong sáu hàng của bảng.</p>

<p><strong>[46]</strong> Barista Magazine (2025). <em>George Jinyang Peng Discusses World Brewers Cup Win.</em> baristamagazine.com/george-jinyang-peng-discusses-world-brewers-cup-win/</p>

<p>Cà Gesha Mount Totumas, Panama. Bài không cho thông số pha; phần đó thuộc [45].</p>

<p><strong>[47]</strong> gota.cafe (2026). <em>Nas Jaafar — UFO V3, World Brewers Cup.</em> gota.cafe/en/recipes/ufo/ufo-jaafar-wbrc</p>

<p>15 g trên 200 g, 92 °C, khoảng 700 µm; 100 g đầu xả qua van mở, 100 g sau ngâm với van đóng 35 giây. Bản ghi, không phải biên bản.</p>

<p><strong>[48]</strong> Mikava Coffee. <em>Thẻ công thức</em> (2022). mikava.coffee/pages/mikava-recipes</p>

<p>14 g trên 200 g; 50 g ở 70 °C mở đầu, rồi 95 °C; bốn lần 50 g; 800–1000 µm; 2:30–3:00. Thẻ không nêu dụng cụ, và không xác nhận được con cà trên thẻ có phải con cà dùng trong lượt thi.</p>

<p>Dụng cụ thì có nguồn khác bổ sung: C³ Coffee phỏng vấn Hsu sau giải, cô nêu <strong>OREA V3 đen</strong> (bộ lọc đáy phẳng bằng nhựa, không hút nhiệt, thoát nhanh) với <strong>giấy Kalita 185</strong>; Wildkaffee ghi cùng bộ đôi đó. Cũng theo C³, “800–1000 µm” là <strong>hỗn hợp hai cỡ xay</strong> chứ không phải một cỡ: 75% ở khoảng 1000 µm (1Zpresso) trộn với 25% ở khoảng 800 µm (Comandante C40 MK4), và nước có TDS 75 ppm cho lần rót đầu, 90 ppm cho ba lần sau. Ba dụng cụ pha dựng song song trong video chung kết là ba tách cho ba giảm khảo cảm quan, không phải ba biến thể thử nghiệm.</p>

<p><strong>[49]</strong> Kaffelogic. <em>Carlos Medina, World Brewers Cup</em> (2023). kaffelogic.com/blogs/competitors/carlos-medina-wbrc</p>

<p>Origami Air, giấy Brewista X, cà Sidra của Granja La Esperanza. Số gam lấy từ bản dựng lại, và các bản không khớp nhau — một bản ghi 248 g, bản khác ghi năm lần 50 g, tức 250 g. Chương 19 dùng 248 g và nói rõ đó là bản dựng lại.</p>

<p><strong>[50]</strong> Barista Magazine (2020). <em>Brewers Cup Runner-Up Lance Hedrick on the “Nifty Coffee Grinds Trick” from His Routine.</em> baristamagazine.com/brewers-cup-runner-up-lance-hedrick-on-the-nifty-coffee-grinds-trick-from-his-routine/</p>

<p>Bài đăng tháng 3/2020, sau vòng chung kết U.S. Brewers Cup 2020 ở Costa Mesa; Hedrick về nhì sau Elika Liftee. Cách làm: bã pha trong phễu kim loại đặt trên một tờ giấy lọc, rồi ở phút 1:30 nhấc phễu kim loại cùng bã sang phễu thứ hai đã lót giấy ướt — không phải lật tờ giấy đang ướt. Công thức: 15 g / 220 g, nước 201 °F (khoảng 94 °C), EK43s số 7.5; 40 g ở 0:00, 90 g ở 0:45, chuyển phễu ở 1:30, 90 g còn lại, kết thúc 3:15 (Able Brewing, phỏng vấn cùng kỳ).</p>

<p>Nguồn thứ hai cho cùng routine: Able Brewing, <em>Five Questions with Lance Hedrick</em> — bài này có nguyên công thức. Video do chính anh ấy giải thích: <em>MY 2020 USBrC ROUTINE</em> trên YouTube.</p>

<p>Hedrick ước lượng khoảng 2,5 g fines ban đầu, 1,7–2 g bị giấy giữ lại, còn dưới 0,4 g trong ly; và nói vấn đề lớn nhất của routine là độ lặp lại. Đây là nguồn cho câu “routine thi đấu đánh đổi độ lặp lại lấy độ rõ”. Các con số fines là anh ấy tự đo và tự kể, không phải phép đo độc lập.</p>

<p><strong>[51]</strong> <em>Pour-over coffee: Mixing by a water jet impinging on a granular bed.</em> Physics of Fluids 37(4), 043332 (2025). pubs.aip.org/aip/pof/article/37/4/043332/3342795</p>

<p>Dùng hạt trong suốt và chụp ảnh bằng laser để xem tia nước xáo trộn bã thế nào: tia tầng ổn định làm lở bã mạnh hơn tia rơi thành giọt. Toàn văn bị nhà xuất bản chặn khi tra; phần đọc được là bản tóm tắt của AIP.</p>

<p><strong>[52]</strong> Batali, M. E., Ristenpart, W. D., &amp; Guinard, J.-X. (2020). Bài thực nghiệm về nhiệt độ pha, TDS và mức chiết trong cà phê nhỏ giọt. Toàn văn: PMC7536440.</p>

<p>Giữ TDS và mức chiết như nhau, đổi nhiệt trong khoảng 87–93 °C: khác biệt cảm quan không đáng kể. Đây là nguồn cho cảnh báo ở phần “hạ nhiệt cuối” của chương 19.</p>

<p><strong>[53]</strong> Rao, S. (2025). <em>Bed depth: why it matters.</em> scottrao.com/blog/2025/11/11/bed-depth-why-it-matters</p>

<p>Lập luận thực hành về liều và độ sâu bã theo dụng cụ: V60 khoảng 20–25 g, Kalita 155 khoảng 15–18 g. Không phải nghiên cứu có kiểm soát; là kinh nghiệm của một người hành nghề lâu năm.</p>

<p><strong>[54]</strong> Gagné, J. (2025). <em>The Pulsar Mini and the Importance of Bed Depth.</em> coffeeadastra.com/2025/11/28/the-pulsar-mini-and-the-importance-of-bed-depth/</p>

<p>Cùng một liều cho độ sâu bã khác nhau ở dụng cụ có đường kính khác nhau; 15 g trên dụng cụ nhỏ không tương đương 15 g trên dụng cụ lớn. Tác giả tự ghi rõ phần nào là giả thuyết.</p>

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
<p>Bảng dưới đây ghi khẳng định nào dựa vào nguồn nào. "Dẫn được" nghĩa là tìm thấy tài liệu nói đúng điều sách nói, không có nghĩa là tài liệu đó hoàn hảo.</p>

<p class="tbl-cap">Chương 1–9 · hạt, nước, chiết xuất</p>

<table class="tbl-a3">
<thead>
<tr><th>Ch.</th><th>Khẳng định cần nguồn</th><th>Nhãn trong sách</th><th>Nguồn</th><th>Kết luận</th></tr>
</thead>
<tbody>
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
</tbody>
</table>

<p class="tbl-cap tbl-cap-break">Chương 10–18 · cỡ xay, cupping, pha</p>

<table class="tbl-a3">
<thead>
<tr><th>Ch.</th><th>Khẳng định cần nguồn</th><th>Nhãn trong sách</th><th>Nguồn</th><th>Kết luận</th></tr>
</thead>
<tbody>
<tr><td>10</td><td>Phân bố hạt có đỉnh fines 30–40 µm; cùng trung vị vẫn có thể khác lượng fines</td><td>Bằng chứng</td><td>[34] [35] [39]</td><td>Dẫn được</td></tr>
<tr><td>10</td><td>Đường cong chiết–cỡ xay có đỉnh, không đơn điệu</td><td>Bằng chứng</td><td>[33] [11]</td><td>Dẫn được</td></tr>
<tr><td>10</td><td>Ngâm tới cân bằng: EY 19–23% trên dải trung vị 579–1311 µm</td><td>Bằng chứng</td><td>[31] [37]</td><td>Dẫn được</td></tr>
<tr><td>10</td><td>Thứ tự nước → cỡ xay → kỹ thuật là thứ tự chẩn đoán, không phải xếp hạng đo được</td><td>Hợp lý</td><td>không có nghiên cứu trực tiếp</td><td>Đã hạ nhãn, xem A4</td></tr>
<tr><td>11</td><td>Thang SCA mười mục, 100 điểm (bộ 2004)</td><td>—</td><td>[12] [13]</td><td>Đã ghi chú, xem A4</td></tr>
<tr><td>12</td><td>8,25 g trên 150 ml; năm cốc mỗi mẫu; quy trình bốn phút</td><td>—</td><td>[12]</td><td>Dẫn được</td></tr>
<tr><td>13</td><td>Ba lớp thời gian; bánh xe hương vị</td><td>—</td><td>[14]</td><td>Dẫn được</td></tr>
<tr><td>14</td><td>Cupping không dự đoán pour over</td><td>—</td><td>[30] [31]</td><td>Một phần</td></tr>
<tr><td>15</td><td>Immersion không có cùng cơ chế channeling</td><td>—</td><td>[10] [11] [31]</td><td>Một phần</td></tr>
<tr><td>16</td><td>Giấy và kim loại cho hồ sơ bay hơi khác nhau</td><td>Hợp lý</td><td>[30]</td><td>Dẫn được, một con cà</td></tr>
<tr><td>17</td><td>Vòi cách bã 3–5 cm; giữ mực nước trên mặt bã; 5–8 g/s</td><td>—</td><td>không có</td><td>Không có nguồn</td></tr>
<tr><td>18</td><td>Ba trường phái công thức</td><td>—</td><td>[27] [28] [29]</td><td>Dẫn được</td></tr>
</tbody>
</table>

<p class="tbl-cap tbl-cap-break">Chương 19–30 · công thức, đọc bã, chẩn đoán, cảm nhận</p>

<table class="tbl-a3">
<thead>
<tr><th>Ch.</th><th>Khẳng định cần nguồn</th><th>Nhãn trong sách</th><th>Nguồn</th><th>Kết luận</th></tr>
</thead>
<tbody>
<tr><td>19</td><td>Sáu công thức vô địch 2021–2026 dùng liều 14–20 g, tỉ lệ 1:13,3–1:16</td><td>—</td><td>[41] [42] [43] [45] [47] [48] [49]</td><td>Dẫn được, nhưng là bản dựng lại</td></tr>
<tr><td>19</td><td>Cỡ xay công bố trải 490–1000 µm; số click trên máy không chuyển được</td><td>Hợp lý</td><td>[43] [45] [47], và [34] [35] ở chương 10</td><td>Một phần — hai nguồn cho Wölfl lệch 490/630 µm</td></tr>
<tr><td>19</td><td>Tia nước quyết định cách bã bị xáo trộn</td><td>Bằng chứng</td><td>[51]</td><td>Dẫn được</td></tr>
<tr><td>19</td><td>Routine thi đấu đánh đổi độ lặp lại để lấy độ rõ của một ngụm</td><td>Hợp lý</td><td>[50]</td><td>Một phần, người trong cuộc kể</td></tr>
<tr><td>19</td><td>Nhiệt 87–93 °C không đổi cảm quan khi TDS và mức chiết đã cố định</td><td>Bằng chứng</td><td>[52]</td><td>Dẫn được</td></tr>
<tr><td>19</td><td>Độ sâu bã phải khớp đường kính dụng cụ</td><td>Hợp lý</td><td>[53] [54]</td><td>Suy luận từ thực hành</td></tr>
<tr><td>20</td><td>Nhìn bã để chẩn đoán</td><td>—</td><td>không có</td><td>Không có nguồn</td></tr>
<tr><td>21</td><td>Bảng chẩn đoán</td><td>—</td><td>suy ra từ [10] [11]</td><td>Một phần</td></tr>
<tr><td>22–24</td><td>Quy trình, bốn luật, case study</td><td>—</td><td>phương pháp</td><td>Không cần nguồn</td></tr>
<tr><td>25</td><td>Giải phẫu một ngụm; đường mũi ngược</td><td>—</td><td>sinh lý khứu giác</td><td>Không cần nguồn</td></tr>
<tr><td>26</td><td>Ngôn ngữ nốt hương và cái bẫy của nó</td><td>—</td><td>[14] [19]</td><td>Một phần</td></tr>
<tr><td>27–30</td><td>Luyện khẩu vị, nhật ký, dụng cụ, checklist</td><td>—</td><td>phương pháp</td><td>Không cần nguồn</td></tr>
</tbody>
</table>

<p>Hai chương cuối cột — 17 và 20 — đứng trên kinh nghiệm của người viết. Điều đó không làm chúng sai; chỉ có nghĩa chúng không phải chỗ để viện dẫn khoa học.</p>
`
      },

      {
        id: "ch-nguon-khoang-trong",
        title: "Nguồn không khớp, và chỗ trống",
        lede: "Năm chỗ sách nói chắc hơn tài liệu cho phép, bảy khẳng định không có nguồn, và một ghi chú về bản quyền hình ảnh.",
        minutes: 8,
        tags: ["phụ lục", "sửa lỗi"],
        body: `
<p>Năm chỗ dưới đây là chỗ sách nói chắc hơn tài liệu cho phép. Cả năm đã được chỉnh trong bản này; chúng còn ghi ở đây để người đọc biết lỗi nằm ở đâu.</p>

<h3>Một: thang cupping</h3>

<p>Chương 11 đến 13 dùng thang mười mục, 100 điểm. Đó là bộ <em>Cupping Protocol and Form</em> năm 2004. Từ 2024, SCA thay bằng <em>Coffee Value Assessment</em> (SCA-102, 103 và 104-2024), và CVA không dùng một điểm tổng duy nhất: nó tách thành đánh giá mô tả, đánh giá cảm xúc và phần ngoại cảnh.</p>

<p>Lập luận của chương vẫn đứng, vì điểm số đo sự đồng thuận của những người được huấn luyện theo cùng một hệ tiêu chuẩn — điều đó còn đúng hơn với CVA. Chỉ câu “hầu như mọi chuyên gia trong ngành đều dùng cùng một quy trình” là không còn chính xác từ 2024. Chương 11 nay nói rõ điều này ngay câu đầu.</p>

<h3>Hai: vùng TDS</h3>

<p>Chuẩn Golden Cup của SCA là 1,15–1,35% TDS, tương đương 11,5–13,5 g/L, với 18–22% EY và tỉ lệ 55 g/L.</p>

<p>Con số 1,15–1,45 lưu hành rộng hơn con số của chuẩn, và bản in trước đã dùng nó. Nay là 1,15–1,35% ở cả ô ba con số lẫn phần giải thích TDS.</p>

<h3>Ba: nguồn của chương 4</h3>

<p>Chương 4 dẫn Christopher Hendon và cộng sự cho một phát hiện cảm quan. Bài năm 2014 của nhóm này là bài hoá học về cation và hiệu suất chiết; nó không đo cảm quan.</p>

<p>Phát hiện đó có nguồn trực tiếp hơn: Rune và cộng sự (2026), Đại học Copenhagen — nghiên cứu đầu tiên kiểm chứng vùng nước “lý tưởng” của ngành bằng cảm quan có kiểm soát. Chương 4 nay dẫn bài này.</p>

<h3>Bốn: thứ hạng các đòn bẩy</h3>

<p>Sách nói thứ tự ưu tiên là nước → cỡ xay → độ tươi → kỹ thuật, và ở một chỗ nói thẳng kỹ thuật rót “đứng thứ ba, sau nước và sau cỡ xay”. Câu đó không có nguồn nào đỡ.</p>

<p>Không có nghiên cứu nào so trực tiếp các đòn bẩy này trong pour-over nóng, đo đồng thời TDS, mức chiết, thời gian rút và cảm quan. Cái đo được thì hẹp hơn: nước có bằng chứng cảm quan trực tiếp; cỡ xay là đòn bẩy thuỷ lực mạnh nhất; kỹ thuật là đòn bẩy duy nhất tác động chủ yếu lên độ đều, và cỡ xay tương tác với hình học phễu thay vì đứng riêng.</p>

<p>Nên sách sửa hai chỗ. Một: thêm chương 10, chương riêng về cỡ xay, để đòn bẩy được xếp thứ hai có chỗ đứng thật — bảy nguồn mới, từ [34] đến [40]. Hai: đổi câu khẳng định thứ hạng thành câu mô tả chức năng. Kỹ thuật không yếu hơn cỡ xay; nó sửa một thứ khác. Phần còn lại của thứ tự được gọi đúng tên: thứ tự chẩn đoán, không phải bảng xếp hạng.</p>

<h3>Năm: cấu trúc rót của Winton</h3>

<p>Bảng chương 19 từng ghi hàng 2021 là “5 × 60 g, chờ bã rút”, và mục “bốn thứ thật sự chung” nói Winton chờ bã ráo rồi mới rót lần tiếp. Bài phỏng vấn của chính anh ấy nói ngược: 50 g bloom trong 35 giây, rồi 70 g, rồi ba lần 60 g — năm lần nhưng không đều — và anh ấy rót gần như nhanh hết mức để <em>bã không bao giờ khô</em>, trừ lúc bloom. Dụng cụ cũng không phải “V60” chung chung: anh ấy thử Kono, Origami và V60 thuỷ tinh, rồi chọn nón kim loại.</p>

<p>Lỗi này không đến từ việc đọc ấu mà từ việc dẫn lại một bản tóm tắt lưu hành trên mạng: bản đó đúng tổng 300 g và đúng số năm lần rót, nên nghe rất giống. Nó chỉ sai hai chỗ — chia đều năm phần, và đảo chiều việc canh bã. Bài học chung: khi hai nguồn cùng nói “năm lần rót”, chúng vẫn có thể nói hai chuyện khác nhau.</p>

<h3>Bảy khẳng định không có nguồn</h3>

<p>Đây là chỗ hệ thống nhãn mất giá trị nếu để nguyên.</p>

<ul>
<li><strong>“Rang đậm dễ pha hơn”</strong> (chương 2) — đúng phần dễ, sai phần nên bắt đầu bằng. Không có nghiên cứu so sánh độ khó pha theo mức rang. Nên là Truyền miệng, không phải để trống.</li>
<li><strong>Độ tươi so với nước</strong> (chương 3) — câu so sánh cụ thể không có nghiên cứu nào. Cơ chế đúng, nên hạ xuống Hợp lý.</li>
<li><strong>Vòi cách bã 3–5 cm, giữ mực nước trên mặt bã, 5–8 g/s</strong> (chương 17) — suy luận từ cơ chế, chưa ai đo. Hợp lý, không hơn.</li>
<li><strong>Nhìn bã để chẩn đoán</strong> (chương 20) — chỗ sách tự tin nhất mà bằng chứng mỏng nhất. Không có nghiên cứu nào nối hình dạng bã với bản đồ chiết xuất. Nên là Truyền miệng.</li>
<li><strong>Bloom là bước xử lý khí</strong> (chương 3) — cơ chế đúng, tác dụng cảm quan chưa được chứng minh. Nên là Hợp lý.</li>
<li><strong>Tỉ lệ đổi TDS tuyến tính, 1:16 sang 1:15 đậm hơn 6–7%</strong> (chương 7) — số học đúng, nhưng con số 6–7% là ngoại suy chưa được kiểm riêng.</li>
<li><strong>“Không có nghiên cứu nào cho thấy điểm cupping dự đoán được mức ưa thích”</strong> (chương 11) — đúng tính đến nay, nhưng nên nói “chưa có” thay vì “không có”, vì đó là khẳng định phủ định toàn cầu.</li>
</ul>

<h3>Bản quyền hình ảnh</h3>

<p>Bánh xe hương vị của SCA và World Coffee Research phát hành theo CC BY-NC-ND 4.0: dùng phi thương mại, phải ghi công, không được tạo bản phái sinh. Sách bán ra là dùng thương mại, nên muốn in phải xin phép. Sensory Lexicon của WCR cho tải và in miễn phí cho mục đích cá nhân, không kèm quyền tái bản.</p>

<h3>Giới hạn</h3>

<p>Phụ lục chưa tra từng khẳng định đến mức trích số trang và câu gốc, chưa kiểm lại ngày đăng hai video ở [28] và [29], và chưa tra Phần VII, VIII — nơi phần lớn nội dung là phương pháp chứ không phải cơ chế. Ba bài [17], [22] và trang DOI của [5] bị chặn toàn văn khi tra; chi tiết lấy từ tóm tắt và bài tổng quan của SCA.</p>

<div class="callout ok">
<p class="callout-title">Điều đáng giữ lại</p>
<p>Khẳng định trung tâm của sách — nước quan trọng hơn người ta tưởng, và alkalinity quan trọng hơn độ cứng — không chỉ đứng vững mà còn mạnh hơn sau khi tra. Ba chỗ phải sửa đều là chi tiết: một thang điểm đã cũ, một chữ số, một cái tên.</p>
</div>
`
      }

    ]
  });
})(window);
