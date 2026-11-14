/* ============================================================
   The Brewing Bible — figures.js

   Hình minh hoạ cho sách. Ba nguyên tắc:

   1. Hình là SVG viết tay, không ảnh bitmap. Nó in ra sắc nét ở 300 dpi,
      nhẹ hơn ảnh, và đổi màu theo giao diện sáng/tối vì mọi nét vẽ đều
      lấy màu từ CSS (.fig-* trong styles.css / print.css / epub.css).

   2. Chèn theo *vị trí tiêu đề* chứ không sửa thẳng vào content/*.js.
      Một chương có ba bản dịch; chèn vào từng bản là ba chỗ để lệch nhau.
      figures.js chèn trước <h3> thứ n của chương, và check-i18n đã bảo
      đảm ba bản dịch có cùng số tiêu đề.

   3. Bản tĩnh là bản thật: web, bản in PDF và EPUB đều dùng nó. Phần
      tương tác (kéo thanh trượt) chỉ được gắn thêm trên web, sau khi
      trang đã dựng — nên bản in không bao giờ chứa ô nhập liệu.
   ============================================================ */
(function () {
  "use strict";

  /* ---------- chuỗi ---------- */
  /* Cố ý để trong file này thay vì i18n.js: bản in và bản EPUB không nạp
     i18n.js, mà hình thì phải có chú thích ở cả hai. */
  var TEXT = {
    vi: {
      psdTitle: "Phân bố kích thước hạt có hai đỉnh",
      psdCap:
        "Sơ đồ minh hoạ, không phải số đo của một máy xay cụ thể. Đỉnh nhỏ quanh 30 µm là fines; đỉnh lớn là nhóm do khe nghiền quyết định. Vạch đứt ở 100 µm là ngưỡng vận hành của fines.",
      psdLive:
        "Kéo hai thanh để thấy điều cuốn sách nói: cùng một D50 vẫn có thể kèm 5% hay 20% bột mịn — và độ rộng đổi trong khi trung vị đứng yên.",
      psdD50: "Cỡ xay đặt (D50)",
      psdFines: "Lượng bột vụn",
      psdReadFines: "dưới 100 µm",
      psdReadWidth: "D90 − D10",
      psdReadMedian: "trung vị thật",
      curveBand: "mức chiết",
      curveTitle: "Mức chiết theo cỡ xay: một đường cong có đỉnh",
      curveCap:
        "Dạng minh hoạ theo kết quả đo trên espresso của nhóm Hendon: mức chiết đạt đỉnh ở cỡ trung gian rồi giảm ở cả hai đầu. Trục ngang là cỡ xay, từ mịn sang thô; trục dọc là mức chiết. Vùng tô là khoảng 18–22%.",
      curveChoke: "nghẹt, nước đi lệch",
      curvePeak: "đỉnh",
      curveCoarse: "thô, chiết nông",
      ratioTitle: "Máy tính tỉ lệ",
      ratioCap:
        "Tỉ lệ là phép chia, không phải phép màu: cùng lượng cà, gấp đôi nước thì nồng độ còn một nửa. Con số % ở đây chỉ là số học của tỉ lệ, giả định mức chiết không đổi theo.",
      ratioDose: "Cà",
      ratioRatio: "Tỉ lệ 1:",
      ratioWater: "Nước",
      ratioStrength: "Nồng độ so với 1:16",
      dilutionTitle: "Pha loãng nước: mục tiêu và tỉ lệ",
      dilutionCap:
        "Công thức của chương, chạy bằng tay: phần trăm nước khoáng bằng mục tiêu chia alkalinity đo được. Giả định nước RO có alkalinity bằng 0; nếu nước RO của bạn không phải 0, tỉ lệ thật thấp hơn con số này.",
      dilutionLive:
        "Kéo hai thanh theo số đo của bạn. Đây là cùng một phép chia mà bạn vẫn làm bằng giấy — chỉ khác là không phải tự chia.",
      dilutionTap: "Alkalinity đo được",
      dilutionTarget: "Mục tiêu",
      dilutionTapShare: "nước máy",
      dilutionRoShare: "nước RO",
      dilutionBottle: "cho 2 lít",
      timelineTitle: "Nước vào lúc nào, và bao nhiêu",
      timelineCap:
        "Công thức sửa lại ở trên, vẽ theo trục thời gian: ba đợt rót chiếm chưa đến một nửa thời gian, phần còn lại là chờ rút. Đường bậc là tổng nước đã rót; vùng nhạt là giai đoạn rút.",
      tlBloom: "bloom",
      tlPour: "rót 2",
      tlPour3: "rót 3",
      tlDraw: "rút",

      /* Hình vẽ lại, không sao chép tác phẩm gốc: bánh xe SCA phát hành
         CC BY-NC-ND 4.0, mà CC BY-NC-ND cấm tạo bản phái sinh và cấm dùng
         thương mại — đúng điều phụ lục A5 đã ghi. Nên sách vẽ lại cấu trúc
         bằng nét của mình, và ghi công ở dưới. */
      wheelTitle: "Bánh xe hương vị: ba tầng, không phải danh sách",
      wheelCap:
        "Vẽ lại theo cấu trúc bánh xe của SCA và World Coffee Research (bản 2016): tầng trong là nhóm chung, ra ngoài thì cụ thể dần, vành ngoài là hàng trăm từ riêng lẻ. Đi từ trong ra và dừng ở đâu cũng được — đó là công dụng của nó, không phải bảng điểm.",
      wheelCredit:
        "Cấu trúc theo SCA &amp; World Coffee Research, Coffee Taster's Flavor Wheel © 2016 (CC BY-NC-ND 4.0). Hình này do sách vẽ lại, không sao chép tác phẩm gốc.",
      wheelRing1: "nhóm",
      wheelRing2: "nhánh",
      wheelRing3: "từ cụ thể",

      mapTitle: "Bản đồ chiết xuất: mọi ly cà nằm trong một ô",
      mapCap:
        "Trục ngang là mức chiết, trục dọc là nồng độ. Ô giữa là vùng chuẩn Golden Cup mà SCA dùng từ thời Lockhart. Bốn góc là bốn kiểu sai: đậm mà chưa lấy hết, đậm và đã lấy hết, loãng mà chưa lấy hết, loãng nhưng đã lấy hết — mỗi góc cần một động tác khác nhau.",
      mapEy: "mức chiết (%)",
      mapTds: "nồng độ (%)",
      mapZone: "Golden Cup",
      mapQ1: "đậm, chưa lấy hết",
      mapQ2: "đậm và đã lấy hết",
      mapQ3: "loãng, chưa lấy hết",
      mapQ4: "loãng nhưng đã lấy hết",

      unitG: "g",
      unitUm: "µm"
    },
    en: {
      psdTitle: "The grind distribution has two peaks",
      psdCap:
        "An illustration, not a measurement of any particular grinder. The small peak near 30 µm is fines; the large one is set by the burr gap. The dashed line at 100 µm is the working threshold for fines.",
      psdLive:
        "Drag the two sliders to see the book's point: the same D50 can carry 5% or 20% fines — and the width moves while the median stays put.",
      psdD50: "Grind setting (D50)",
      psdFines: "Fines share",
      psdReadFines: "under 100 µm",
      psdReadWidth: "D90 − D10",
      psdReadMedian: "actual median",
      curveBand: "extraction",
      curveTitle: "Extraction against grind: a curve with a peak",
      curveCap:
        "Shape after Hendon's espresso measurements: extraction peaks at a middle setting and falls at both ends. Horizontal axis is grind, fine to coarse; vertical axis is extraction. The shaded band is 18–22%.",
      curveChoke: "choked, flow splits",
      curvePeak: "peak",
      curveCoarse: "coarse, under-extracted",
      ratioTitle: "Ratio calculator",
      ratioCap:
        "A ratio is division, not magic: double the water at the same dose and the strength halves. The % here is the arithmetic of the ratio alone, assuming extraction stays put.",
      ratioDose: "Coffee",
      ratioRatio: "Ratio 1:",
      ratioWater: "Water",
      ratioStrength: "Strength vs 1:16",
      dilutionTitle: "Diluting water: target and ratio",
      dilutionCap:
        "The chapter's formula, worked by hand: the share of mineral water is the target divided by the measured alkalinity. It assumes RO water at zero alkalinity; if yours is not zero, the real share is lower than this number.",
      dilutionLive:
        "Drag the two sliders to your own readings. It is the same division you would do on paper — only you do not have to divide.",
      dilutionTap: "Measured alkalinity",
      dilutionTarget: "Target",
      dilutionTapShare: "tap water",
      dilutionRoShare: "RO water",
      dilutionBottle: "for 2 litres",
      timelineTitle: "When the water goes in, and how much",
      timelineCap:
        "The corrected recipe above, drawn against time: three pours take less than half the brew, the rest is waiting to drain. The step line is total water poured; the pale band is the drawdown.",
      tlBloom: "bloom",
      tlPour: "pour 2",
      tlPour3: "pour 3",
      tlDraw: "drawdown",

      wheelTitle: "The flavour wheel: three rings, not a checklist",
      wheelCap:
        "Drawn after the structure of the SCA and World Coffee Research wheel (2016 revision): the inner ring is the general family, each ring outward gets more specific, and the outer rim is hundreds of individual words. Work from the centre out and stop wherever you like — that is what it is for, not a scorecard.",
      wheelCredit:
        "Structure after SCA &amp; World Coffee Research, Coffee Taster's Flavor Wheel © 2016 (CC BY-NC-ND 4.0). This drawing is the book's own, not a copy of the original artwork.",
      wheelRing1: "family",
      wheelRing2: "branch",
      wheelRing3: "specific word",

      mapTitle: "The brew map: every cup lands in one box",
      mapCap:
        "Extraction on the horizontal axis, strength on the vertical. The middle box is the Golden Cup range SCA has used since Lockhart. The four corners are four different failures — strong and under-extracted, strong and fully extracted, weak and under-extracted, weak but fully extracted — and each one calls for a different correction.",
      mapEy: "extraction yield (%)",
      mapTds: "strength (%)",
      mapZone: "Golden Cup",
      mapQ1: "strong, not fully extracted",
      mapQ2: "strong and fully extracted",
      mapQ3: "weak, not fully extracted",
      mapQ4: "weak but fully extracted",

      unitG: "g",
      unitUm: "µm"
    }
  };

  function lang() {
    var l = (window.BOOK_I18N && window.BOOK_I18N.lang) || "vi";
    return TEXT[l] ? l : "vi";
  }
  function T() { return TEXT[lang()]; }

  /* Nhãn số: tiếng Việt dùng dấu phẩy thập phân. */
  function num(v, digits) {
    var s = Number(v).toFixed(digits == null ? 0 : digits);
    if (lang() === "vi") s = s.replace(".", ",");
    return s;
  }

  /* ---------- mô hình phân bố hạt ---------- */
  /* Hai đỉnh = hỗn hợp hai phân bố loga chuẩn: một cho mảnh vách tế bào
     (fines, cố định quanh 30 µm), một cho phần ruột hạt (do khe nghiền
     quyết định). Với mỗi cặp (D50, % fines) ta vẽ đường mật độ và tính
     ba bách phân vị. Đây là mô hình để *nhìn*, không phải để dự đoán. */
  var X_MIN = 8, X_MAX = 2600;

  function lognorm(x, mu, sigma) {
    var t = Math.log(x) - mu;
    return Math.exp(-(t * t) / (2 * sigma * sigma)) / (x * sigma * Math.sqrt(2 * Math.PI));
  }

  function psdModel(d50, finesPct) {
    var w = Math.min(0.4, Math.max(0.01, finesPct / 100));
    var muFine = Math.log(30), sigFine = 0.42;
    var sigCoarse = 0.52;
    var muCoarse = Math.log(d50);
    var N = 220;

    function weights(muC) {
      var out = [], i, x, wgt, sum = 0;
      for (i = 0; i < N; i++) {
        /* điểm chia đều theo thang log — đúng cách đọc dữ liệu sàng */
        x = X_MIN * Math.pow(X_MAX / X_MIN, i / (N - 1));
        wgt = w * lognorm(x, muFine, sigFine) + (1 - w) * lognorm(x, muC, sigCoarse);
        wgt *= x; /* khối lượng trong một ô log */
        out.push({ x: x, w: wgt });
        sum += wgt;
      }
      return { pts: out, sum: sum };
    }

    /* Dịch đỉnh lớn để trung vị của *hỗn hợp* rơi đúng vào D50 đã đặt:
       nếu không, kéo thanh D50 sẽ kéo theo một con số khác, và hình sẽ
       nói dối về chính tham số của nó. Hai vòng là đủ hội tụ. */
    var muC = muCoarse, m = weights(muC);
    for (var k = 0; k < 4; k++) {
      var med = percentile(m, 0.5);
      muC += Math.log(d50 / Math.max(1, med));
      m = weights(muC);
    }

    var maxW = 0;
    for (var i = 0; i < m.pts.length; i++) maxW = Math.max(maxW, m.pts[i].w);

    return {
      pts: m.pts,
      max: maxW,
      d10: percentile(m, 0.1),
      d50: percentile(m, 0.5),
      d90: percentile(m, 0.9),
      fines: m.pts.reduce(function (acc, p) {
        return p.x < 100 ? acc + p.w : acc;
      }, 0) / m.sum
    };
  }

  function percentile(m, q) {
    var target = m.sum * q, acc = 0;
    for (var i = 0; i < m.pts.length; i++) {
      acc += m.pts[i].w;
      if (acc >= target) return m.pts[i].x;
    }
    return m.pts[m.pts.length - 1].x;
  }

  /* ---------- khung vẽ ---------- */
  var W = 320, H = 150, PAD_L = 8, PAD_R = 8, PAD_T = 8, PAD_B = 24;

  function xLog(x) {
    return PAD_L + ((Math.log(x) - Math.log(X_MIN)) / (Math.log(X_MAX) - Math.log(X_MIN))) * (W - PAD_L - PAD_R);
  }

  function ticks() {
    return [10, 30, 100, 300, 1000];
  }

  function axis() {
    var y = H - PAD_B;
    var s = '<line class="f-axis" x1="' + PAD_L + '" y1="' + y + '" x2="' + (W - PAD_R) + '" y2="' + y + '"/>';
    ticks().forEach(function (t) {
      var x = xLog(t).toFixed(1);
      s += '<line class="f-tick" x1="' + x + '" y1="' + y + '" x2="' + x + '" y2="' + (y + 3) + '"/>';
      s += '<text class="f-lab" x="' + x + '" y="' + (y + 12) + '" text-anchor="middle">' + t + "</text>";
    });
    s += '<text class="f-lab f-lab-unit" x="' + (W - PAD_R) + '" y="' + (y + 12) + '">' + T().unitUm + "</text>";
    return s;
  }

  function psdSvg(state) {
    var m = psdModel(state.d50, state.fines);
    var base = H - PAD_B, top = PAD_T, i;
    var d = "";
    for (i = 0; i < m.pts.length; i++) {
      var p = m.pts[i];
      d += (i ? "L" : "M") + xLog(p.x).toFixed(1) + " " + (base - (p.w / m.max) * (base - top)).toFixed(1);
    }

    var s = '<svg class="fig-svg" viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="' + T().psdTitle + '">';

    /* ngưỡng fines: một vạch, không tô nền — một khối màu lớn ở đây
       nặng hơn thông tin nó mang. */
    var x100 = xLog(100).toFixed(1);
    s += '<path class="f-area" d="' + d + "L" + (W - PAD_R) + " " + base + "L" + PAD_L + " " + base + 'Z"/>';
    s += '<path class="f-curve" d="' + d + '"/>';

    s += '<line class="f-guide" x1="' + x100 + '" y1="' + top + '" x2="' + x100 + '" y2="' + base + '"/>';
    s += '<text class="f-lab" x="' + (Number(x100) + 4) + '" y="' + (top + 9) + '">fines &lt; 100</text>';

    /* ba bách phân vị: chỉ đánh dấu, số nằm ở chú thích để khỏi rối */
    [m.d10, m.d50, m.d90].forEach(function (v, k) {
      var x = xLog(v).toFixed(1);
      s += '<line class="f-mark' + (k === 1 ? " f-mark-mid" : "") + '" x1="' + x + '" y1="' + (base - 4) +
           '" x2="' + x + '" y2="' + (base + 4) + '"/>';
    });

    s += axis();
    s += "</svg>";
    return { svg: s, model: m };
  }

  /* ---------- đường cong chiết xuất ---------- */
  /* k: 1 = mịn nhất, 10 = thô nhất. Đỉnh ở 5.
     Hai sườn là hai hàm mũ ngược nhau, không phải hai đoạn thẳng: chiết
     xuất không đổi hướng ở một góc nhọn. Sườn trái thoải (mịn lên nghẹt,
     mức chiết tụt chậm), sườn phải dốc hơn (thô thì chiết nông nhanh). */
  function eyCurve(k) {
    var d = k - 5;
    var s = d < 0 ? 2.55 : 1.95;
    /* biên độ 7,4 để hai đầu không chạm đáy khung — chạm đáy thì đuôi
       đường cong dính vào trục ngang và trông như nó bị cắt cụt */
    return 22 - 7.4 * (1 - Math.exp(-(d / s) * (d / s)));
  }

  function curveSvg() {
    var base = H - PAD_B, top = PAD_T, i;
    var L = 26; /* chừa chỗ cho nhãn trục dọc */
    function yOf(ey) {
      return base - ((ey - 14) / (26 - 14)) * (base - top);
    }
    function xOf(k) {
      return L + ((k - 1) / 9) * (W - L - PAD_R);
    }

    var y22 = yOf(22), y18 = yOf(18), x2 = W - PAD_R;
    var s = '<svg class="fig-svg" viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="' + T().curveTitle + '">';

    /* Vùng tốt 18–22%: một dải rất nhạt giữa hai đường mảnh — không phải
       một khối màu đặc. Khối đặc đọc tốt trên giấy trắng nhưng thành một
       tấm sáng chói trong trình đọc nền tối, và nó lấn át chính đường cong.
       Màu tô vì thế là màu nhấn trong suốt, hợp với cả nền sáng lẫn nền tối. */
    s += '<rect class="f-band" x="' + L + '" y="' + y22.toFixed(1) + '" width="' + (x2 - L) +
         '" height="' + (y18 - y22).toFixed(1) + '"/>';
    s += '<line class="f-band-edge" x1="' + L + '" y1="' + y22.toFixed(1) + '" x2="' + x2 + '" y2="' + y22.toFixed(1) + '"/>';
    s += '<line class="f-band-edge" x1="' + L + '" y1="' + y18.toFixed(1) + '" x2="' + x2 + '" y2="' + y18.toFixed(1) + '"/>';

    /* hai mép vùng tốt, ghi số ngay trên mép để đọc được độ cao */
    s += '<text class="f-lab" x="' + (L - 3) + '" y="' + (y22 + 2.2).toFixed(1) + '" text-anchor="end">22%</text>';
    s += '<text class="f-lab" x="' + (L - 3) + '" y="' + (y18 + 2.2).toFixed(1) + '" text-anchor="end">18%</text>';
    s += '<text class="f-lab" x="' + L + '" y="' + (y22 - 4).toFixed(1) + '">' + T().curveBand + '</text>';

    var d = "";
    for (i = 1; i <= 10; i += 0.25) {
      d += (d ? "L" : "M") + xOf(i).toFixed(1) + " " + yOf(eyCurve(i)).toFixed(1);
    }
    s += '<path class="f-curve" d="' + d + '"/>';
    s += '<circle class="f-dot" cx="' + xOf(5).toFixed(1) + '" cy="' + yOf(eyCurve(5)).toFixed(1) + '" r="2.4"/>';

    s += '<line class="f-axis" x1="' + L + '" y1="' + base + '" x2="' + (W - PAD_R) + '" y2="' + base + '"/>';
    s += '<text class="f-lab" x="' + (L + 2) + '" y="' + (base + 12) + '">' + T().curveChoke + "</text>";
    s += '<text class="f-lab" x="' + xOf(5).toFixed(1) + '" y="' + (base + 12) + '" text-anchor="middle">' + T().curvePeak + "</text>";
    s += '<text class="f-lab" x="' + (W - PAD_R) + '" y="' + (base + 12) + '" text-anchor="end">' + T().curveCoarse + "</text>";
    s += "</svg>";
    return s;
  }

  /* ---------- máy tính tỉ lệ ---------- */
  function ratioBody(state) {
    var water = state.dose * state.ratio;
    var delta = (16 / state.ratio - 1) * 100;
    var sign = delta > 0.05 ? "+" : delta < -0.05 ? "−" : "±";
    var pct = num(Math.abs(delta), 0) + "%";
    var coffeeShare = 100 / (state.ratio + 1);

    return (
      '<div class="fig-calc">' +
        '<div><b>' + num(state.dose, state.dose % 1 ? 1 : 0) + " " + T().unitG + "</b><span>" + T().ratioDose + "</span></div>" +
        '<i class="fig-op">×</i>' +
        "<div><b>1:" + num(state.ratio, state.ratio % 1 ? 1 : 0) + "</b><span>" + T().ratioRatio.replace(/1:$/, "").trim() + "</span></div>" +
        '<i class="fig-op">=</i>' +
        "<div><b>" + num(water, 0) + " " + T().unitG + "</b><span>" + T().ratioWater + "</span></div>" +
      "</div>" +
      '<div class="fig-bar"><i style="width:' + coffeeShare.toFixed(2) + '%"></i></div>' +
      '<p class="fig-note">' + T().ratioStrength + ": <b>" + sign + pct + "</b></p>"
    );
  }

  function ratioSvg(state) {
    return '<div class="fig-canvas">' + ratioBody(state) + "</div>";
  }

  /* ---------- pha loãng nước ---------- */
  /* Alkalinity pha loãng tuyến tính theo thể tích: tỉ lệ = mục tiêu / đo
     được. Không có mô hình nào ở đây, chỉ là phép chia của chương. */
  function dilutionBody(state) {
    var share = state.measured > 0 ? (state.target / state.measured) * 100 : 100;
    share = Math.max(0, Math.min(100, share));
    var ml = Math.round(2000 * (share / 100) / 10) * 10; /* làm tròn 10 ml */
    var ro = 2000 - ml;

    return (
      '<div class="fig-calc">' +
        '<div><b>' + num(share, 0) + "%</b><span>" + T().dilutionTapShare + "</span></div>" +
        "<i class=" + '"fig-op"' + ">+</i>" +
        '<div><b>' + num(100 - share, 0) + "%</b><span>" + T().dilutionRoShare + "</span></div>" +
      "</div>" +
      '<div class="fig-bar"><i style="width:' + share.toFixed(1) + '%"></i></div>' +
      '<p class="fig-note">' + T().dilutionBottle + ": <b>" + ml + " ml</b> " + T().dilutionTapShare +
        " + <b>" + ro + " ml</b> " + T().dilutionRoShare + "</p>"
    );
  }

  function dilutionSvg(state) {
    return '<div class="fig-canvas">' + dilutionBody(state) + "</div>";
  }

  /* ---------- dòng thời gian rót ---------- */
  /* Bậc thang tổng nước đã rót theo thời gian, đúng các mốc của công thức
     ở chương nghiên cứu tình huống (15 g : 255 g, 1:17). */
  var TL = {
    total: 165,                                            /* 2:45 */
    points: [[0, 0], [10, 45], [40, 45], [60, 150], [75, 150], [95, 255], [165, 255]],
    marks: [[40, "0:40"], [60, "1:00"], [95, "1:35"], [165, "2:45"]],
    grams: [45, 150, 255],
    draw: [95, 165]
  };

  function timelineSvg() {
    var base = H - PAD_B, top = PAD_T, L = 26;
    var gMax = 270;
    function xOf(t) { return L + (t / TL.total) * (W - L - PAD_R); }
    function yOf(g) { return base - (g / gMax) * (base - top); }

    var s = '<svg class="fig-svg" viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="' + T().timelineTitle + '">';

    /* giai đoạn rút: nền nhạt, không có nước mới đi vào */
    s += '<rect class="f-band" x="' + xOf(TL.draw[0]).toFixed(1) + '" y="' + top + '" width="' +
         (xOf(TL.draw[1]) - xOf(TL.draw[0])).toFixed(1) + '" height="' + (base - top) + '"/>';
    s += '<text class="f-lab" x="' + (xOf(130)).toFixed(1) + '" y="' + (base - 6) + '" text-anchor="middle">' + T().tlDraw + "</text>";

    /* đường bậc */
    var d = "";
    TL.points.forEach(function (p, i) {
      d += (i ? "L" : "M") + xOf(p[0]).toFixed(1) + " " + yOf(p[1]).toFixed(1);
    });
    s += '<path class="f-area" d="' + d + "L" + xOf(TL.total).toFixed(1) + " " + base + "L" + L + " " + base + 'Z"/>';
    s += '<path class="f-curve" d="' + d + '"/>';

    /* mốc thời gian */
    TL.marks.forEach(function (mk) {
      var x = xOf(mk[0]).toFixed(1);
      s += '<line class="f-guide" x1="' + x + '" y1="' + top + '" x2="' + x + '" y2="' + base + '"/>';
      s += '<text class="f-lab" x="' + x + '" y="' + (base + 12) + '" text-anchor="' +
           (mk[0] === 0 ? "start" : mk[0] === TL.total ? "end" : "middle") + '">' + mk[1] + "</text>";
    });

    /* nhãn khối lượng ở trục dọc */
    TL.grams.forEach(function (g) {
      /* đơn vị gắn vào số trên cùng: một nhãn "g" riêng sẽ đè lên chính số đó */
      var label = g + (g === TL.grams[TL.grams.length - 1] ? " " + T().unitG : "");
      s += '<text class="f-lab" x="' + (L - 3) + '" y="' + (yOf(g) + 2.2).toFixed(1) + '" text-anchor="end">' + label + "</text>";
    });

    /* nhãn ba đợt rót */
    s += '<text class="f-lab" x="' + (xOf(25).toFixed(1)) + '" y="' + (yOf(45) - 4).toFixed(1) + '" text-anchor="middle">' + T().tlBloom + "</text>";
    s += '<text class="f-lab" x="' + (xOf(50).toFixed(1)) + '" y="' + (yOf(150) - 4).toFixed(1) + '" text-anchor="middle">' + T().tlPour + "</text>";
    s += '<text class="f-lab" x="' + (xOf(85).toFixed(1)) + '" y="' + (yOf(255) - 4).toFixed(1) + '" text-anchor="middle">' + T().tlPour3 + "</text>";

    s += '<line class="f-axis" x1="' + L + '" y1="' + base + '" x2="' + (W - PAD_R) + '" y2="' + base + '"/>';
    s += "</svg>";
    return s;
  }

  /* ---------- bánh xe hương vị ---------- */
  /* Vẽ lại cấu trúc, không sao chép tác phẩm của SCA: ba tầng, vành ngoài
     là vệt mảnh dày đặc (hàng trăm từ) để thấy ngay vì sao nó không phải
     một danh sách cần hoàn thành. Nhãn tầng một để tiếng Anh vì đó là tên
     chuẩn trong nghề, và cả sách đều dùng kèm bản gốc. */
  function wheelSvg() {
    var cx = 360, cy = 344, rHub = 66, r1 = 158, r2 = 246, r3 = 300;
    var fam = ["fruity", "floral", "sweet", "nutty / cocoa", "spices", "roasted", "green / veg.", "sour / ferm.", "other"];
    var n = fam.length, STEP = (Math.PI * 2) / n, GAP = 0.05;

    function pt(r, a) {
      return (cx + Math.cos(a) * r).toFixed(1) + " " + (cy + Math.sin(a) * r).toFixed(1);
    }
    function wedge(rIn, rOut, a0, a1) {
      var large = a1 - a0 > Math.PI ? 1 : 0;
      return (
        "M" + pt(rOut, a0) +
        "A" + rOut + " " + rOut + " 0 " + large + " 1 " + pt(rOut, a1) +
        "L" + pt(rIn, a1) +
        "A" + rIn + " " + rIn + " 0 " + large + " 0 " + pt(rIn, a0) + "Z"
      );
    }

    var s = '<svg class="fig-svg" viewBox="0 0 720 700" role="img" aria-label="' + T().wheelTitle + '">';

    /* vành ngoài: vệt mảnh dày đặt — mật độ, không phải dữ liệu */
    for (var i = 0; i < 420; i++) {
      var a = (i / 420) * Math.PI * 2;
      var out = r3 - (i % 9 === 0 ? 14 : i % 4 === 0 ? 6 : 0);
      s += '<line class="f-leaf" x1="' + pt(r2 + 4, a).replace(" ", '" y1="') + '" x2="' +
        pt(out, a).replace(" ", '" y2="') + '"/>';
    }

    for (var k = 0; k < n; k++) {
      var a0 = -Math.PI / 2 + k * STEP + GAP,
        a1 = -Math.PI / 2 + (k + 1) * STEP - GAP;

      /* tầng một: nhóm chung — màu đi qua class, không phải biến CSS nội
         tuyến: bản EPUB không biết var(--accent) và sẽ tô đen hết. */
      s += '<path class="' + (k % 2 ? "f-wedge-b" : "f-wedge-a") + '" d="' + wedge(rHub, r1, a0, a1) + '"/>';
      /* tầng hai: mỗi nhóm chẻ ba nhánh, có khe — để thấy nó là tầng khác
         chứ không phải một vành trơn. Số nhánh thật của mỗi nhóm khác nhau
         (fruity nhiều hơn spices), nhưng ba là đủ để nói "có chia tiếp". */
      var sub = 3, subStep = (a1 - a0) / sub;
      for (var b = 0; b < sub; b++) {
        s += '<path class="' + ((k + b) % 2 ? "f-wedge-d" : "f-wedge-c") + '" d="' +
          wedge(r1 + 3, r2, a0 + b * subStep + 0.012, a0 + (b + 1) * subStep - 0.012) + '"/>';
      }

      /* nhãn tầng một: để ngang. Chữ xoay theo bán kính thì đọc được ở hai
         cung bên nhưng phải vặn cổ ở cung dưới; chín nhãn ngắn thì ngang
         vẫn không chạm nhau. */
      var mid = (a0 + a1) / 2;
      var lx = (cx + Math.cos(mid) * ((rHub + r1) / 2)).toFixed(1);
      var ly = (cy + Math.sin(mid) * ((rHub + r1) / 2) + 2.3).toFixed(1);
      s += '<text class="f-lab f-cat" x="' + lx + '" y="' + ly + '" text-anchor="middle">' + fam[k] + "</text>";
    }

    /* lõi: chỗ bắt đầu */
    s += '<circle class="f-hub" cx="' + cx + '" cy="' + cy + '" r="' + rHub + '"/>';
    s += '<text class="f-lab f-hub-txt" x="' + cx + '" y="' + (cy + 2.5) + '" text-anchor="middle">coffee</text>';

    /* ba tầng, ghi chú bằng ba vòng tròn đứt */
    [r1, r2, r3].forEach(function (r) {
      s += '<circle class="f-ring" cx="' + cx + '" cy="' + cy + '" r="' + r + '"/>';
    });

    s += "</svg>";
    return s;
  }

  /* ---------- bản đồ chiết xuất ---------- */
  /* Trục là hai con số sách vẫn nói: mức chiết 14–26% và nồng độ 1,0–1,5%.
     Ô giữa lấy đúng hai khoảng Golden Cup mà SCA dùng (18–22%, 1,15–1,35%). */
  function brewMapSvg() {
    var L = 54, R = 596, T_ = 26, B = 316;
    var EY0 = 14, EY1 = 26, TD0 = 1.0, TD1 = 1.5;
    function x(ey) { return L + ((ey - EY0) / (EY1 - EY0)) * (R - L); }
    function y(td) { return B - ((td - TD0) / (TD1 - TD0)) * (B - T_); }

    var s = '<svg class="fig-svg" viewBox="0 0 640 368" role="img" aria-label="' + T().mapTitle + '">';

    /* ô chuẩn */
    s += '<rect class="f-band" x="' + x(18).toFixed(1) + '" y="' + y(1.35).toFixed(1) + '" width="' +
      (x(22) - x(18)).toFixed(1) + '" height="' + (y(1.15) - y(1.35)).toFixed(1) + '"/>';
    s += '<rect class="f-band-edge" fill="none" x="' + x(18).toFixed(1) + '" y="' + y(1.35).toFixed(1) + '" width="' +
      (x(22) - x(18)).toFixed(1) + '" height="' + (y(1.15) - y(1.35)).toFixed(1) + '"/>';

    /* lưới nhẹ ở hai mốc ngoài ô */
    [18, 22].forEach(function (e) {
      s += '<line class="f-guide" x1="' + x(e).toFixed(1) + '" y1="' + T_ + '" x2="' + x(e).toFixed(1) + '" y2="' + B + '"/>';
    });
    [1.15, 1.35].forEach(function (d) {
      s += '<line class="f-guide" x1="' + L + '" y1="' + y(d).toFixed(1) + '" x2="' + R + '" y2="' + y(d).toFixed(1) + '"/>';
    });

    s += '<line class="f-axis" x1="' + L + '" y1="' + B + '" x2="' + R + '" y2="' + B + '"/>';
    s += '<line class="f-axis" x1="' + L + '" y1="' + T_ + '" x2="' + L + '" y2="' + B + '"/>';

    [14, 18, 22, 26].forEach(function (v) {
      s += '<line class="f-tick" x1="' + x(v).toFixed(1) + '" y1="' + B + '" x2="' + x(v).toFixed(1) + '" y2="' + (B + 4) + '"/>';
      s += '<text class="f-lab" x="' + x(v).toFixed(1) + '" y="' + (B + 15) + '" text-anchor="middle">' + v + "</text>";
    });
    ["1,00", "1,15", "1,35", "1,50"].forEach(function (lab, i) {
      var v = [1.0, 1.15, 1.35, 1.5][i];
      s += '<line class="f-tick" x1="' + (L - 4) + '" y1="' + y(v).toFixed(1) + '" x2="' + L + '" y2="' + y(v).toFixed(1) + '"/>';
      s += '<text class="f-lab" x="' + (L - 8) + '" y="' + (y(v) + 2.4).toFixed(1) + '" text-anchor="end">' + lab + "</text>";
    });

    s += '<text class="f-lab f-axis-title" x="' + R + '" y="' + (B + 30) + '" text-anchor="end">' + T().mapEy + "</text>";
    /* tiêu đề trục dọc: xoay -90 rồi bắt đầu từ đáy trục, nếu không chữ
       chạy ngược lên khỏi khung và bị cắt. */
    s += '<text class="f-lab f-axis-title" transform="translate(16 ' + B + ') rotate(-90)">' + T().mapTds + "</text>";

    /* bốn góc */
    s += '<text class="f-lab f-q" x="' + x(15.1).toFixed(1) + '" y="' + y(1.46).toFixed(1) + '">' + T().mapQ1 + "</text>";
    s += '<text class="f-lab f-q" x="' + x(24.9).toFixed(1) + '" y="' + y(1.46).toFixed(1) + '" text-anchor="end">' + T().mapQ2 + "</text>";
    s += '<text class="f-lab f-q" x="' + x(15.1).toFixed(1) + '" y="' + y(1.03).toFixed(1) + '">' + T().mapQ3 + "</text>";
    s += '<text class="f-lab f-q" x="' + x(24.9).toFixed(1) + '" y="' + y(1.03).toFixed(1) + '" text-anchor="end">' + T().mapQ4 + "</text>";

    s += '<text class="f-lab f-zone" x="' + ((x(18) + x(22)) / 2).toFixed(1) + '" y="' + (y(1.35) - 6).toFixed(1) +
      '" text-anchor="middle">' + T().mapZone + "</text>";

    s += "</svg>";
    return s;
  }

  /* ---------- registry ---------- */
  /* at: "h3:2" = chèn ngay trước <h3> thứ 2 của chương. Đếm theo thứ tự
     xuất hiện; check-i18n so số tiêu đề giữa ba bản dịch nên một bản dịch
     không thể lệch vị trí mà không bị bắt. */
  var FIGS = [
    {
      id: "psd",
      ch: "ch-co-xay",
      at: "h3:2",
      live: true,
      state: { d50: 600, fines: 10 },
      title: "psdTitle",
      caption: "psdCap",
      body: function (st) {
        var r = psdSvg(st);
        return '<div class="fig-canvas">' + r.svg + "</div>" + readoutPsd(r.model);
      }
    },
    {
      id: "ey-curve",
      ch: "ch-co-xay",
      at: "h3:7",
      live: false,
      title: "curveTitle",
      caption: "curveCap",
      body: function () {
        return '<div class="fig-canvas">' + curveSvg() + "</div>";
      }
    },
    {
      id: "ratio",
      ch: "ch-ba-thu-kiem-soat",
      at: "h3:3",
      live: true,
      state: { dose: 15, ratio: 16 },
      title: "ratioTitle",
      caption: "ratioCap",
      body: function (st) {
        return ratioSvg(st);
      }
    },
    {
      id: "dilution",
      ch: "ch-xu-ly-nuoc",
      at: "h3:3",
      live: true,
      state: { measured: 250, target: 50 },
      title: "dilutionTitle",
      caption: "dilutionCap",
      liveNote: "dilutionLive",
      body: function (st) {
        return dilutionSvg(st);
      }
    },
    {
      id: "timeline",
      ch: "ch-case-study",
      at: "recipe",
      live: false,
      title: "timelineTitle",
      caption: "timelineCap",
      body: function () {
        return '<div class="fig-canvas">' + timelineSvg() + "</div>";
      }
    },
    {
      id: "flavor-wheel",
      ch: "ch-ngon-ngu-not-huong",
      at: "h4:3",
      live: false,
      title: "wheelTitle",
      caption: "wheelCap",
      credit: "wheelCredit",
      body: function () {
        return '<div class="fig-canvas">' + wheelSvg() + "</div>";
      }
    },
    {
      id: "brew-map",
      ch: "ch-chiet-xuat",
      at: "h3:2",
      live: false,
      title: "mapTitle",
      caption: "mapCap",
      body: function () {
        return '<div class="fig-canvas">' + brewMapSvg() + "</div>";
      }
    }
  ];

  function readoutPsd(m) {
    return (
      '<p class="fig-read">' +
        "<span><b>" + num(m.d50, 0) + " " + T().unitUm + "</b>" + T().psdReadMedian + "</span>" +
        "<span><b>" + num(m.fines * 100, 0) + "%</b>" + T().psdReadFines + "</span>" +
        "<span><b>" + num(m.d90 - m.d10, 0) + " " + T().unitUm + "</b>" + T().psdReadWidth + "</span>" +
      "</p>"
    );
  }

  function figureHtml(fig) {
    var t = T();
    var html = '<figure class="fig" data-fig="' + fig.id + '">';
    html += fig.body(fig.state || {});
    html += "<figcaption><b>" + t[fig.title] + "</b>" + t[fig.caption];
    /* dòng nguồn: ảnh và hình vay từ bên ngoài phải để lại dấu vết giấy phép,
       không chỉ một dòng chữ nhỏ trong README */
    if (fig.credit) html += '<span class="fig-credit">' + t[fig.credit] + "</span>";
    if (fig.live && typeof document !== "undefined") {
      html += '<span class="fig-live">' + t[fig.liveNote || "psdLive"] + "</span>";
    }
    html += "</figcaption></figure>";
    return html;
  }

  /* Chèn hình vào thân một chương, theo tiêu đề thứ n. */
  function render(body, chapterId) {
    if (!body || !chapterId) return body;
    FIGS.forEach(function (fig) {
      if (fig.ch !== chapterId) return;
      var idx = -1;

      if (fig.at === "recipe") {
        /* ngay sau khối công thức: chèn trước tiêu đề kế tiếp */
        /* Không khớp cả dấu đóng thẻ: khối công thức có thể mang thêm
           attribute (data-audio cho bản nghe). Thêm một attribute mà hình
           nhảy xuống cuối chương là kiểu hỏng im lặng. */
        var recipe = body.indexOf('<div class="recipe"');
        idx = recipe >= 0 ? body.indexOf("<h3>", recipe) : -1;
      } else {
        /* h3:N hoặc h4:N — bẫy và ghi chú nằm ở cấp h4 trong một số chương */
        var m = /^(h[34]):(\d+)$/.exec(fig.at);
        if (!m) return;
        var tag = "<" + m[1] + ">";
        var want = Number(m[2]), seen = 0, re = new RegExp(tag, "g"), hit;
        while ((hit = re.exec(body))) {
          seen++;
          if (seen === want) { idx = hit.index; break; }
        }
      }
      var html = figureHtml(fig);
      if (idx < 0) body += html;
      else body = body.slice(0, idx) + html + body.slice(idx);
    });
    return body;
  }

  /* ---------- phần tương tác (chỉ trên web) ---------- */
  function enhance(root) {
    if (typeof document === "undefined" || !root) return;
    if (document.documentElement.hasAttribute("data-print")) return;

    var nodes = root.querySelectorAll("figure.fig[data-fig]");
    for (var i = 0; i < nodes.length; i++) enhanceOne(nodes[i]);
  }

  function enhanceOne(figEl) {
    var id = figEl.getAttribute("data-fig");
    var fig = null;
    for (var i = 0; i < FIGS.length; i++) if (FIGS[i].id === id) fig = FIGS[i];
    if (!fig || !fig.live || figEl.getAttribute("data-live") === "1") return;
    figEl.setAttribute("data-live", "1");

    /* bản sao trạng thái: hình nào cũng mang sẵn tham số mặc định của nó,
       nên thêm hình mới không phải sửa lại dòng này */
    var state = {};
    for (var k in fig.state) if (Object.prototype.hasOwnProperty.call(fig.state, k)) state[k] = fig.state[k];
    var t = T();

    var ctl = document.createElement("div");
    ctl.className = "fig-ctl";

    var specs;
    if (id === "psd") {
      specs = [
        { key: "d50", label: t.psdD50, min: 250, max: 1100, step: 10, unit: " µm", digits: 0 },
        { key: "fines", label: t.psdFines, min: 3, max: 20, step: 0.5, unit: "%", digits: 1 }
      ];
    } else if (id === "dilution") {
      specs = [
        { key: "measured", label: t.dilutionTap, min: 50, max: 350, step: 5, unit: " ppm", digits: 0 },
        { key: "target", label: t.dilutionTarget, min: 30, max: 80, step: 5, unit: " ppm", digits: 0 }
      ];
    } else {
      specs = [
        { key: "dose", label: t.ratioDose, min: 10, max: 30, step: 0.5, unit: " " + t.unitG, digits: 1 },
        { key: "ratio", label: t.ratioRatio.replace(/:$/, "").trim(), min: 12, max: 20, step: 0.5, unit: "", digits: 1 }
      ];
    }

    function redraw() {
      var canvas = figEl.querySelector(".fig-canvas");
      if (!canvas) return;
      if (id === "psd") {
        var r = psdSvg(state);
        canvas.innerHTML = r.svg;
        var rd = figEl.querySelector(".fig-read");
        if (rd) rd.outerHTML = readoutPsd(r.model);
      } else if (id === "dilution") {
        canvas.innerHTML = dilutionBody(state);
      } else {
        canvas.innerHTML = ratioBody(state);
      }
    }

    specs.forEach(function (spec) {
      var row = document.createElement("label");
      row.className = "fig-row";
      var out = document.createElement("output");
      out.textContent = num(state[spec.key], spec.digits) + spec.unit;

      var input = document.createElement("input");
      input.type = "range";
      input.min = spec.min;
      input.max = spec.max;
      input.step = spec.step;
      input.value = state[spec.key];
      input.setAttribute("aria-label", spec.label);

      input.addEventListener("input", function () {
        state[spec.key] = Number(input.value);
        out.textContent = num(state[spec.key], spec.digits) + spec.unit;
        redraw();
      });

      row.innerHTML = '<span class="fig-row-label">' + spec.label + "</span>";
      row.appendChild(input);
      row.appendChild(out);
      ctl.appendChild(row);
    });

    figEl.insertBefore(ctl, figEl.querySelector("figcaption"));
  }

  window.BOOK_FIGURES = { render: render, enhance: enhance, list: FIGS };
})();
