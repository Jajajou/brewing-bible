# Kế hoạch sửa *The Brewing Bible* — bàn giao từ phiên trao đổi với Claude

> File này tóm tắt một buổi đánh giá sách và nghiên cứu sâu từng biến số pour over.
> Người đọc chính: Claude Code làm việc trong repo của sách. Tác giả: Teddy.

## 0. Cách làm việc với file này (dành cho Claude Code)

1. Đọc hết file trước khi sửa gì.
2. Làm theo thứ tự ưu tiên: mục 2 (sửa) → mục 3 (bổ sung vào chương có sẵn) → mục 4 (phần mới).
3. Mỗi nhóm thay đổi một commit riêng, ghi rõ chương nào.
4. **Không bịa nguồn.** Mọi khẳng định gắn nhãn BẰNG CHỨNG phải có nguồn trong mục 7. Mục nào ghi "CẦN KIỂM CHỨNG" thì xác minh trước khi viết, nếu không xác minh được thì hạ nhãn hoặc bỏ.
5. Giữ giọng văn hiện tại của sách (tiếng Việt, câu ngắn, thẳng, có bảng). Không tự đổi tên sách, cấu trúc phần, hay giọng văn — hỏi tác giả trước (xem mục 6).
6. Khi thêm hoặc đổi số chương: cập nhật mục lục, số trang, và mọi tham chiếu chéo kiểu "xem chương 8".

## 1. Kết luận chung

Nội dung lõi tốt, **chủ yếu cần bổ sung**, kèm một số chỗ **phải sửa**:
- Sửa: vài khẳng định thiếu nguồn hoặc có thể sai, lời hứa trên trang bìa về nhãn bằng chứng, một số câu quá tuyệt đối.
- Bổ sung: tài liệu tham khảo, nghiên cứu 2016–2025 cho từng biến số, chương về phin, phần đầu sách (lời mở đầu, cách đọc, thuật ngữ) và phần cuối (lời cảm ơn, tham khảo).

Điểm mạnh cần giữ nguyên: luận điểm "ly cà có một trần / bạn không tạo ra hương, chỉ có thể đánh rơi nó"; hệ nhãn bằng chứng; chương nước cho Việt Nam; bảng chẩn đoán, đọc bã, nếm ở ba nhiệt độ; luật "một thay đổi mỗi lần" và "giới hạn ba lần"; chương 8 phá huyền thoại.

## 2. Sửa (ưu tiên cao)

### 2.1 Chương 8 — nguồn gốc mô hình "acid ra trước, đắng ra sau"
- Hiện sách nói mô hình bắt nguồn từ bài blog Coffee ad Astra năm 2019 của Gagné, rồi "mười năm sau" được dạy như định luật.
- Vấn đề: (a) mốc thời gian không khớp (2019 → nay chưa đến mười năm); (b) ý tưởng này có vẻ đã phổ biến trong đào tạo barista trước 2019. **CẦN KIỂM CHỨNG** nguồn gốc thật. Nếu không xác định được, viết lại thành "mô hình phổ biến trong đào tạo barista; một trong những bài phân tích chi tiết nhất là của Gagné (2019), và chính ông ghi rõ phần gắn với cảm quan là suy đoán".
- Bổ sung bằng chứng mới cho chương này: nghiên cứu phân đoạn theo thời gian của UC Davis (Batali 2020) — các phần đầu đắng và chua hơn phần sau; không có chất nào "đến muộn". Nghiên cứu động học sớm (Maille 2024) — 50% acid citric/malic tan trong 10 giây đầu; caffeine và 3-CQA chậm 3–4 giây; mỗi hợp chất có thời gian đặc trưng riêng (20–150 s ở pha chậm). Lưu ý Maille đo trong bình khuấy kín (giống ngâm), không phải pour over.

### 2.2 Chương 9 — "khoảng 2–4% mức chiết cho mỗi 5 °C"
- Chưa có nguồn. Tìm nguồn hoặc gắn nhãn "hợp lý nhưng chưa kiểm chứng".

### 2.3 Trang bìa — lời hứa về nhãn
- Hiện: "Mỗi khẳng định được đánh dấu theo ba mức bằng chứng". Thực tế cả sách có ~10 nhãn BẰNG CHỨNG, ~3 nhãn TRUYỀN MIỆNG, gần như không có nhãn mức giữa.
- Chọn một: (a) gắn nhãn đều cho mọi khẳng định quan trọng (khuyên dùng), hoặc (b) sửa thành "các khẳng định quan trọng được đánh dấu".
- Định nghĩa nhãn rõ ràng trong phần "Cách đọc sách": BẰNG CHỨNG = nghiên cứu có bình duyệt hoặc đo đạc có kiểm soát; HỢP LÝ NHƯNG CHƯA KIỂM CHỨNG = suy ra từ cơ chế vật lý/hoá học hoặc chuyên gia nhưng chưa có thử nghiệm cảm quan; TRUYỀN MIỆNG = kinh nghiệm cộng đồng.

### 2.4 Câu quá tuyệt đối
- Rà các câu như "Không có ngoại lệ", "Không có thứ thứ tư", "chỉ có thể". Giữ nơi có cơ sở mạnh, làm mềm nơi bằng chứng yếu. Không làm mất giọng văn dứt khoát.

## 3. Bổ sung vào chương có sẵn

### 3.1 Chương 7 & 9 — TDS, EY và tỉ lệ (cảm quan)
- Độ ngọt tỉ lệ nghịch với TDS ở mọi mức rang; nốt sô-cô-la đen và việt quất giảm khi TDS tăng (Frost 2020).
- Đắng, chua, khói tăng theo TDS; ngọt, trái cây, hoa giảm khi TDS tăng (Batali 2020 phân đoạn; tóm tắt trong Batali 2020 Sci Rep).
- Người uống phổ thông: TDS ảnh hưởng mức thích nhiều nhất, EY thứ hai; chia thành hai nhóm sở thích theo TDS (Cotter 2021) → "điểm lý tưởng" là khẩu vị, không phải một ô cố định.
- Phân biệt rõ hai cách làm ly loãng: (a) rót thêm nước qua bã → TDS giảm, EY tăng; (b) dừng sớm rồi thêm nước vào cốc → TDS giảm, EY giữ nguyên. Thêm thí nghiệm "pha cốt, chia ba cốc, pha loãng thành 1:15/1:16/1:17" để tìm độ đậm ưa thích mà không đổi EY.
- Công thức gần đúng: TDS ≈ EY × liều ÷ (nước − ~2 × liều). Ghi rõ "2 g nước/gam cà" là con số kinh nghiệm.

### 3.2 Chương 9 — nhiệt độ
- UC Davis (Batali 2020, Sci Rep): ở 87/90/93 °C, khi giữ cùng TDS và EY, người nếm không phân biệt được. Nhiệt độ quan trọng vì nó đổi tốc độ chiết. Giới hạn: một con cà sơ chế ướt, dải hẹp, chưa thử >93 °C; Ristenpart nói cà sơ chế natural có thể khác.
- Nhiệt trong phễu (slurry) thấp hơn nước rót: rót 96 °C vẫn không vượt 90 °C trong phễu (Barista Hustle). Sách đã có ý "thấp hơn 5–8 °C" ở chương 14 — nối hai chỗ.
- Hợp chất hương: phân cực (furanone, 2,3-butanedione, guaiacol, vanillin) vào ly 75–100%; kém phân cực (β-damascenone, 2-furfurylthiol, methoxypyrazine) <25% (Semmelroch & Grosch 1996; Mayer 2000). Nhiệt cao tăng chiết VOC, mạnh hơn với chất kém phân cực (Sánchez López 2016 — espresso, ghi rõ).
- Đắng hình thành khi rang, không phải khi pha: lactone acid chlorogenic (đắng dịu, rang sáng–vừa) và phenylindane (đắng gắt, đọng lâu, rang đậm) (Hofmann, ACS 2007).
- Nhiệt độ giảm dần trong pha (rót nóng ở bloom, nguội ở rót chính): chưa có bằng chứng giảm chọn lọc vị xấu; pour over vốn có nhiệt slurry tăng dần từ bloom.

### 3.3 Chương 9 (hoặc mục mới) — cỡ xay
- Bột xay luôn có phân bố hai đỉnh: đỉnh bột mịn ~40 µm và đỉnh chính theo cài đặt (đo laser).
- Hai giai đoạn chiết trong một hạt: xói mòn bề mặt (nhanh) và khuếch tán trong hạt (chậm); hạt lớn chậm hơn vì đường khuếch tán dài (Rao). Theo vật lý khuếch tán, thời gian tới lõi tăng theo bình phương kích thước — ghi là quy luật chung.
- Bột mịn làm giảm độ thấm của lớp bã (PMC10920694); di chuyển và bít giấy (Gagné). Nhưng bột mịn cũng lấp khe giữa hạt lớn, hạn chế kênh nước; lượng tối ưu là lượng làm vị chát thấp nhất (Ineffable/Rao).
- Xay mịn hơn không luôn chiết nhiều hơn: mức chiết có đỉnh theo cỡ xay (Cameron 2020 — espresso; mô hình cho thấy xu hướng tương tự ở phương pháp khác).
- Người nếm phổ thông không phân biệt được hai cỡ xay chênh 25% (799 vs 1.065 µm) khi cùng phễu (UC Davis 2019).
- Thêm "phép thử rây" bằng rây trà để kiểm tra vai trò của bột mịn.
- Ghi chú cho cối tay: số click là khe cối, không phải cỡ hạt.

### 3.4 Thời gian tiếp xúc (chương 14 hoặc 16)
- Bốn quá trình chồng lên nhau: làm ướt/thoát CO₂; rửa bề mặt (vài giây); khuếch tán chậm (20–150 s); lõi hạt to (vài phút) — số liệu hai giai đoạn đầu từ Maille 2024.
- Chênh lệch nồng độ: percolation luôn có nước mới nên chiết nhanh hơn ngâm cùng thời gian (sách đã có, bổ sung giải thích).
- Thời gian là kết quả của cỡ xay, cách rót, giấy và hình dạng phễu, không phải núm vặn độc lập; dùng thời gian rút cuối làm chỉ báo (bảng sẵn có ở chương 18).

### 3.5 Chương 15 — hình dạng phễu
- UC Davis 2019: người nếm phổ thông phân biệt được phễu phẳng và phễu nón (nhưng không phân biệt được cỡ xay chênh 25%). Rang sáng: phẳng → trái cây khô, ngọt, hoa; nón → cam chanh, quả mọng, chua. Rang đậm: nón đắng hơn rõ. Lưu ý: máy pha nhỏ giọt, không phải pha tay.
- Độ dày lớp bã: bã nông → nhiều kênh xuyên tới đáy → chát (Rao 2025).
- Phễu không bypass (Pulsar, Tricolate, Orea Z1): trần chiết cao hơn (Rao); nối với chương phin mới (mục 4).
- Ví dụ phễu nón sâu (Deep 27, góc 27° so với 60° của V60): cùng thể tích, bã sâu ~1,8 lần (tính hình học lý tưởng). Thực tế: phễu được thiết kế để vào = ra nên không tự chảy chậm; cùng cỡ xay thô có thể rút rất nhanh → cần xay mịn hơn V60. (Quan sát của tác giả.)

### 3.6 Chương 16 — kỹ thuật rót
- Bypass làm đáy lớp bã được chiết ít hơn (Gagné, Coffee ad Astra 2020).
- Tốc độ rót ~5 g/s; dòng bị đứt thành giọt khuấy ít hơn và giảm chiết (Gagné, qua nguồn thứ cấp — gắn nhãn HỢP LÝ).
- Rót cao tăng khuấy và chiết, nhưng quá cao gây nghẹt và chát (Barista Hustle, qua nguồn thứ cấp).
- Chưa có thử nếm công khai so sánh rót ngắt quãng và rót liên tục → các khẳng định "ngắt quãng trong hơn / liên tục tròn hơn" là TRUYỀN MIỆNG.

### 3.7 Chương 12 / 23 — nhiệt độ nếm
- Ristenpart 2022: người uống phổ thông thích nhất ở 58–66 °C → củng cố khuyến nghị 55–65 °C của sách.

## 4. Phần mới

### 4.1 Phần đầu sách
- **Lời mở đầu** (1–2 trang, sau mục lục): vì sao viết (câu chuyện thật của tác giả — ví dụ ly V60 sạch nhưng chỉ "80% con cà"; thí nghiệm phin đôi vẫn còn đắng đọng); sách dành cho ai và không dành cho ai; một lời hứa trung thực.
- **Cách đọc cuốn sách này**: định nghĩa ba nhãn bằng chứng; lộ trình đọc:
  - Người mới: 1 → 7 → 9 → 16 → 20 → 26 → 28.
  - Người đã biết pha: 4–6 → 8 → 14–19 → 21.
  - Nếu chỉ có 10 phút: một trang tóm tắt.
- **Bảng thuật ngữ**: EY, TDS, tỉ lệ, alkalinity, dKH, bloom, bypass, bột mịn (fines), mảnh lớn (boulders), percolation, immersion, channeling, slurry, drawdown.

### 4.2 Chương mới: Phin
- Đặt trong Phần V (sau chương 17) hoặc thành phụ lục — hỏi tác giả.
- Nội dung: phin là phễu không bypass; vì sao phin nổi tiếng (cốt đậm 1:4–1:5, robusta rang đậm, sữa đặc, body dày do lưới kim loại cho dầu và bột mịn qua); giới hạn khi pha cà rang sáng (buồng nhỏ, lỗ cố định, bột mịn dồn giấy); lót giấy AeroPress giữa đĩa và buồng; phin đôi (phin trên chia nước) — kết quả thử nghiệm của tác giả: hương mạnh, bã hết mùi, nhưng chát và đắng đọng; hướng "pha cốt rồi pha loãng" (~1:8 qua bã, bù nước vào cốc); PHINƠI của Vũ Đình Tú như một hướng hiện đại hoá.

### 4.3 Phần cuối sách
- **Lời cảm ơn**: CHỜ tác giả cung cấp danh sách người và mỗi người ảnh hưởng thế nào. Nguyên tắc: cụ thể từng người, một câu mỗi người; cảm ơn công trình của nhà nghiên cứu mà không ngụ ý họ ủng hộ sách.
- **Tài liệu tham khảo**: đánh số, dẫn từ các nhãn BẰNG CHỨNG trong thân sách.

## 5. Câu hỏi mở cho tác giả (hỏi trước khi làm phần liên quan)
1. Giữ tên "Bible" hay đổi? (Có độ vênh với tinh thần hoài nghi của sách.)
2. Sách hướng tới ai và phát hành thế nào (bạn bè, tự xuất bản, bán)?
3. Danh sách người cần cảm ơn và ảnh hưởng của từng người.
4. Chương phin đặt ở đâu; có chấp nhận đánh số lại chương không?
5. Cách dẫn nguồn ưa thích (số trong ngoặc vuông, chú thích cuối trang, hay cuối chương)?

## 6. Những điều đã được kiểm chứng là SAI trong phiên trao đổi (để không lặp lại)
- "Phễu bã sâu (Deep 27) chảy chậm nên xay thô hơn" — sai theo quan sát thực tế; Deep 27 cần xay mịn hơn V60.
- "Phần đuôi mẻ pha là phần đắng" — không có bằng chứng; ở máy pha nhỏ giọt các phần sau ít đắng hơn (Batali 2020). Cắt đuôi là công cụ hợp lệ nhưng phải nếm để quyết định.

## 7. Nguồn

**Nghiên cứu (BẰNG CHỨNG)**
- Batali, Ristenpart, Guinard (2020). Brew temperature, at fixed brew strength and extraction, has little impact on the sensory profile of drip brew coffee. *Scientific Reports* 10. https://doi.org/10.1038/s41598-020-73341-4
- Batali et al. (2020). Sensory and monosaccharide analysis of drip brew coffee fractions versus brewing time. *J Sci Food Agric* 100(7):2953–2962. https://doi.org/10.1002/jsfa.10323
- Frost, Ristenpart, Guinard (2020). Effects of brew strength, brew yield, and roast on the sensory quality of drip brewed coffee. *J Food Sci* 85(8):2530–2543. https://doi.org/10.1111/1750-3841.15326
- Frost, Ristenpart, Guinard (2019). Effect of basket geometry on the sensory quality and consumer acceptance of drip brewed coffee. *J Food Sci* 84(8):2297–2312. Tóm tắt: https://sca.coffee/sca-news/25-magazine/issue-8/english/flat-vs-cone-basket-shape-is-as-important-as-grind-size-in-drip-brew-coffee-25-magazine-issue-8
- Cotter, Batali, Ristenpart, Guinard (2021). Consumer preferences for black coffee are spread over a wide range of brew strengths and extraction yields. *J Food Sci* 86:194–205. https://doi.org/10.1111/1750-3841.15561
- Ristenpart, Cotter, Guinard (2022). Impact of beverage temperature on consumer preferences for black coffee. *Scientific Reports* 12:20621. https://doi.org/10.1038/s41598-022-23904-4
- Cameron et al. (2020). Systematically improving espresso: insights from mathematical modeling and experiment. *Matter* 2(3):631–648. https://doi.org/10.1016/j.matt.2019.12.019
- Maille (2024). Measuring Coffee Extraction Kinetics at Early Time Scales. PhD thesis, University of Sheffield. https://etheses.whiterose.ac.uk/id/eprint/36281/
- Semmelroch & Grosch (1996). Studies on character impact odorants of coffee brews. *J Agric Food Chem*. https://doi.org/10.1021/jf9505988
- Mayer, Czerny, Grosch (2000). Sensory study of the character impact aroma compounds of a coffee beverage. *Eur Food Res Technol* 211:272–276. https://doi.org/10.1007/s002170000169
- Sánchez López et al. (2016). Extraction kinetics of coffee aroma compounds using a semi-automatic machine: on-line analysis by PTR-ToF-MS. *Int J Mass Spectrom* 401:22–30. https://doi.org/10.21256/zhaw-4221
- Lee et al. (2025). Untargeted metabolomic analysis... hot and cold brew coffee. *Beverages*. https://doaj.org/article/9178622d5a9e4891b298498def301771
- The role of fines in espresso extraction dynamics (PMC10920694). https://www.ncbi.nlm.nih.gov/pmc/articles/PMC10920694/
- Hofmann et al. — chlorogenic acid lactones & phenylindanes (ACS, 2007). Tin tóm tắt: https://www.eurekalert.org/news-releases/877914

**Chuyên gia / blog (HỢP LÝ, dẫn có ghi chú)**
- Scott Rao — Fines: fine for espresso, not so fine for filter. https://www.scottrao.com/blog/2017/8/27/fines-fine-for-espresso-not-so-fine-for-filter
- Scott Rao — Bed depth: why it matters (2025). https://www.scottrao.com/blog/2025/11/11/bed-depth-why-it-matters
- Scott Rao — What I've learned from no-bypass brewing. https://www.scottrao.com/blog/no-bypass-lessons
- Jonathan Gagné — fines migration (Barista Hustle). https://www.baristahustle.com/?p=287269
- Bypass, tổng quan và trích Gagné (Daily Coffee News 2023). https://dailycoffeenews.com/2023/06/08/the-dcn-guide-to-bypass-in-coffee-brewing
- Barista Hustle — slurry temperature. https://www.baristahustle.com/?p=333089
- Ineffable Coffee × Scott Rao — The ideal average amount of fines. https://ineffablecoffee.com/en/blogs/news/la-cantidad-media-ideal-de-finos
- Titan Grinder Project — particle size distributions. https://www.home-barista.com/blog/titan-grinder-project-particle-size-distributions-ground-coffee-t4203.html

**Phin & dụng cụ**
- Barista Magazine — Test Drive: The Phinoi Dripper. https://www.baristamagazine.com/test-drive-the-phinoi-dripper/
- Barista Magazine — 10 Minutes with Vu Dình Tú. https://www.baristamagazine.com/10-minutes-with-vu-dinh-tu-a-champion-of-modern-vietnamese-coffee-culture/
- CAFEC Deep 27 (mô tả của hãng qua nhà bán). https://samplecoffee.com.au/shop/cafec-deep-27-black-flower-dripper
- Orea Z1. https://www.orea.uk/z1-brewer
