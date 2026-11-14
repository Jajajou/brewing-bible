# Hình minh hoạ — chú thích / Figure captions

Mỗi hình có hai file: `.vi.svg` và `.en.svg`. Muốn thêm tiếng Nhật: thêm khối `"ja"` vào `STR` trong `make_figures.py` rồi chạy lại `python3 make_figures.py svg`.
Each figure has `.vi.svg` and `.en.svg`. For Japanese, add a `"ja"` block to `STR` in `make_figures.py` and re-run.

Loại hình / Type: **Tính toán** = computed from a formula · **Vẽ lại** = redrawn from published findings · **Minh hoạ** = illustrative shape, not measured data.

---

**Hình 7.1 / Figure 7.1** — `fig07-1_ratio-lines` · Tính toán / Computed
- VI: Mỗi tỉ lệ là một đường trên biểu đồ TDS–EY. Chỉnh cỡ xay, nhiệt hoặc thời gian là trượt dọc theo đường; đổi tỉ lệ là nhảy sang đường khác.
- EN: Each brew ratio is a line on the TDS–EY chart. Grind, temperature and time move you along a line; changing the ratio moves you to another line.
- Công thức / Formula: TDS ≈ EY ÷ (ratio − 2), assuming ~2 g water retained per g of coffee.

**Hình 7.2 / Figure 7.2** — `fig07-2_tds-sensory` · Vẽ lại / Redrawn
- VI: Ly đậm hơn (TDS cao) được cảm nhận đắng, chua, khói hơn; ly loãng hơn cho cảm giác ngọt, trái cây và hoa rõ hơn.
- EN: Stronger cups read as more bitter, sour and smoky; lighter cups read as sweeter, fruitier and more floral.
- Nguồn / Source: Frost et al. 2020, J Food Sci 85:2530–2543; Batali et al. 2020, J Sci Food Agric 100:2953–2962.

**Hình 7.3 / Figure 7.3** — `fig07-3_two-ways-to-dilute` · Minh hoạ / Illustrative
- VI: Hai cách làm ly loãng hơn. Rót thêm nước qua bã làm tăng cả mức chiết; dừng sớm rồi thêm nước vào cốc chỉ đổi độ đậm.
- EN: Two ways to lower TDS. Pushing more water through the bed also raises extraction; stopping early and diluting changes strength only.

**Hình 8.1 / Figure 8.1** — `fig08-1_extraction-vs-time` · Minh hoạ / Illustrative
- VI: Chiết rất nhanh trong vài giây đầu (rửa bề mặt), rồi chậm dần trong vài phút (khuếch tán từ lõi hạt).
- EN: Extraction is very fast in the first seconds (surface wash-off), then slows over minutes (diffusion from particle cores).

**Hình 8.2 / Figure 8.2** — `fig08-2_extraction-phases` · Vẽ lại (thang gần đúng) / Redrawn (approximate)
- VI: Bốn quá trình chồng lên nhau theo thời gian. Mốc của hai thanh giữa lấy từ đo đạc trong bình khuấy kín, không phải pour over.
- EN: Four overlapping processes. Timescales of the middle bars come from stirred-batch measurements, not pour over.
- Nguồn / Source: Maille 2024, PhD thesis, University of Sheffield; Rao 2017.

**Hình 9.1 / Figure 9.1** — `fig09-1_aroma-compounds` · Vẽ lại / Redrawn
- VI: Hợp chất hương phân cực vào ly 75–100%; nhóm kém phân cực (gồm nốt mật ong, trái cây) chỉ ra dưới 25%.
- EN: Polar aroma compounds reach the cup at 75–100%; less polar ones (including honey and fruit notes) at under 25%.
- Nguồn / Source: Semmelroch & Grosch 1996, J Agric Food Chem; Mayer, Czerny & Grosch 2000, Eur Food Res Technol 211:272–276.

**Hình 9.2 / Figure 9.2** — `fig09-2_particle-size-distribution` · Minh hoạ / Illustrative
- VI: Bột xay luôn có hai đỉnh: bột mịn khoảng 40 µm và đỉnh chính theo cài đặt của cối.
- EN: Ground coffee is always bimodal: fines around 40 µm and a main peak set by the grinder.
- Cơ sở / Basis: laser diffraction measurements (Titan Grinder Project; EK43 calibration data).

**Hình 9.3 / Figure 9.3** — `fig09-3_particle-extraction-depth` · Minh hoạ / Illustrative
- VI: Trong cùng một thời gian pha, bột mịn bị chiết quá đà còn lõi mảnh lớn chưa được chạm tới.
- EN: In the same brew time, fines are over-extracted while boulder cores remain untouched.

**Hình 9.4 / Figure 9.4** — `fig09-4_ey-vs-grind` · Minh hoạ theo nghiên cứu / Illustrative after research
- VI: Mức chiết có một đỉnh theo cỡ xay: quá mịn gây nghẹt và kênh nước, quá thô để lõi hạt chưa được chiết.
- EN: Extraction peaks at an intermediate grind: too fine clogs and channels, too coarse leaves cores unextracted.
- Nguồn / Source: Cameron et al. 2020, Matter 2:631–648 (espresso).

**Hình 15.1 / Figure 15.1** — `fig15-1_v60-vs-deep27` · Tính toán / Computed
- VI: Cùng thể tích bã, phễu nón 27° cho lớp bã sâu khoảng 1,8 lần phễu 60°. Tính theo hình nón lý tưởng.
- EN: For the same bed volume, a 27° cone gives a bed about 1.8× deeper than a 60° cone. Ideal-cone calculation.

**Hình 16.1 / Figure 16.1** — `fig16-1_v60-water-paths` · Minh hoạ / Illustrative
- VI: Đường đi của nước trong V60: qua bã (được chiết), dọc giấy (bypass, ít được chiết), và bột mịn dồn xuống đáy.
- EN: Water paths in a V60: through the bed (extracts), along the paper (bypass, barely extracts), with fines settling at the bottom.
- Cơ sở / Basis: Gagné, Coffee ad Astra (bypass).

---

Ghi chú kỹ thuật / Technical notes
- Màu cố định (không phụ thuộc chế độ sáng/tối), nền trong suốt, viewBox rộng 600.
- Font: `'Be Vietnam Pro','Inter','Noto Sans',…`. Nếu bản in A5 dùng font khác, đổi biến `FONT` trong script cho khớp sách, hoặc chuyển chữ thành path khi xuất PDF.
- Không chép hình gốc từ các bài báo; các hình "vẽ lại" chỉ thể hiện kết luận, có dẫn nguồn.
