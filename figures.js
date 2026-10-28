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
  function eyCurve(k) {
    /* k: 1 = mịn nhất, 10 = thô nhất. Đỉnh ở 5. */
    return k < 5 ? 22 - 1.5 * Math.pow(5 - k, 0.85) : 22 - 0.78 * Math.pow(k - 5, 1.15);
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

    var s = '<svg class="fig-svg" viewBox="0 0 ' + W + " " + H + '" role="img" aria-label="' + T().curveTitle + '">';
    s += '<rect class="f-band" x="' + L + '" y="' + yOf(22).toFixed(1) + '" width="' + (W - L - PAD_R) +
         '" height="' + (yOf(18) - yOf(22)).toFixed(1) + '"/>';
    /* hai mép vùng tốt, ghi số ngay trên mép để đọc được độ cao */
    s += '<text class="f-lab" x="' + (L - 3) + '" y="' + (yOf(22) + 2.2).toFixed(1) + '" text-anchor="end">22%</text>';
    s += '<text class="f-lab" x="' + (L - 3) + '" y="' + (yOf(18) + 2.2).toFixed(1) + '" text-anchor="end">18%</text>';
    s += '<text class="f-lab" x="' + L + '" y="' + (yOf(22) - 3).toFixed(1) + '">' + T().curveBand + '</text>';

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
        var recipe = body.indexOf('<div class="recipe">');
        idx = recipe >= 0 ? body.indexOf("<h3>", recipe) : -1;
      } else {
        var m = /^h3:(\d+)$/.exec(fig.at);
        if (!m) return;
        var want = Number(m[1]), seen = 0, re = /<h3>/g, hit;
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
