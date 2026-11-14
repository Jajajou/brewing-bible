/* ============================================================
   The Brewing Bible — brew-core.js

   Phần logic thuần của trang Đồng hồ pha & máy tính: quy đổi tỉ lệ,
   EY ⇄ TDS, và lịch từng bước của hai công thức có mốc thời gian
   trong sách. Không đụng DOM, không đụng âm thanh, không gọi mạng —
   nên test được bằng `node --test` như search.js, còn brew.js chỉ còn
   việc vẽ, đếm giây và kêu.

   Mọi con số ở đây chép từ content/, không lấy từ nguồn ngoài:
   - "Công thức sửa — khớp tỉ lệ cupping", Phần VI (ch-case-study)
   - "Cupping chuẩn tại nhà", Phần IV (ch-quy-trinh-cupping)

   Đơn vị: gam, °C, giây. Tỉ lệ luôn viết dạng "1:x".
   ============================================================ */
(function (root) {
  "use strict";

  var CORE = {};

  /* ---------- nhỏ ---------- */

  function str(v) {
    return v === null || v === undefined ? "" : String(v).trim();
  }

  /* Nhận cả "16,7" (bàn phím tiếng Việt) lẫn "16.7". */
  function num(v) {
    if (v === null || v === undefined || v === "") return null;
    var n = typeof v === "number" ? v : parseFloat(String(v).trim().replace(",", "."));
    return isFinite(n) ? n : null;
  }

  function round(n, dec) {
    var p = Math.pow(10, dec || 0);
    return Math.round(n * p) / p;
  }

  /* Dấu thập phân: bản web tiếng Việt dùng dấu phẩy. */
  CORE.fmt = function (n, dec, sep) {
    var v = num(n);
    if (v === null) return "—";
    return round(v, dec == null ? 1 : dec)
      .toFixed(dec == null ? 1 : dec)
      .replace(".", sep || ",");
  };

  /* ---------- tỉ lệ ----------
     Tỉ lệ là phép chia, không phải phép màu: 1:16 nghĩa là 1 g cà
     với 16 g nước. Ba hàm dưới là ba cách hỏi cùng một câu. */

  CORE.ratio = function (dose, water) {
    var d = num(dose);
    var w = num(water);
    if (!(d > 0) || !(w > 0)) return null;
    return w / d;
  };

  CORE.waterFor = function (dose, ratio) {
    var d = num(dose);
    var r = num(ratio);
    if (!(d > 0) || !(r > 0)) return null;
    return d * r;
  };

  CORE.doseFor = function (water, ratio) {
    var w = num(water);
    var r = num(ratio);
    if (!(w > 0) || !(r > 0)) return null;
    return w / r;
  };

  /* Sách viết 1:17, không viết 1:17,0 — nên bỏ số 0 thừa ở cuối. */
  CORE.ratioText = function (dose, water, sep) {
    var r = CORE.ratio(dose, water);
    if (r === null) return "—";
    return "1:" + CORE.fmt(r, 1, sep).replace(/[.,]0$/, "");
  };

  /* ---------- chiết xuất ----------
     EY = TDS × khối lượng nước trong ly ÷ khối lượng cà.
     Đây là số học của chương "Ba con số", không phải phép đo: nước
     còn lại trong bã làm EY thật thấp hơn một chút, nên trang nói rõ
     điều đó thay vì in một con số không kèm giả định. */

  CORE.eyFromTds = function (tds, dose, yieldG) {
    var t = num(tds);
    var d = num(dose);
    var y = num(yieldG);
    if (!(t > 0) || !(d > 0) || !(y > 0)) return null;
    return (t * y) / d;
  };

  CORE.tdsFromEy = function (ey, dose, yieldG) {
    var e = num(ey);
    var d = num(dose);
    var y = num(yieldG);
    if (!(e > 0) || !(d > 0) || !(y > 0)) return null;
    return (e * d) / y;
  };

  CORE.EY_ZONE = [18, 22];
  CORE.TDS_ZONE = [1.15, 1.35];

  /* Ba cửa sổ của chương: dưới 18 là chiết thiếu, 18–22 là vùng tốt,
     trên 22 là chiết dư. Vùng tốt là một vùng rộng, không phải một
     điểm — nên nhãn nói "vùng", không nói "đúng". */
  CORE.eyZone = function (ey) {
    var e = num(ey);
    if (e === null) return { key: "", label: "", note: "" };
    if (e < CORE.EY_ZONE[0]) {
      return {
        key: "thieu",
        label: "Chiết thiếu",
        note: "Ly mỏng, chua, hậu vị ngắn. Xay mịn hơn hoặc rót chậm hơn — đừng đổi tỉ lệ trước."
      };
    }
    if (e > CORE.EY_ZONE[1]) {
      return {
        key: "du",
        label: "Chiết dư",
        note: "Đắng, khô, mất nốt. Xay thô hơn hoặc rút ngắn thời gian."
      };
    }
    return {
      key: "tot",
      label: "Trong vùng 18–22%",
      note: "Đây là vùng, không phải điểm. Bên trong nó vẫn có bốn ly rất khác nhau."
    };
  };

  CORE.tdsZone = function (tds) {
    var t = num(tds);
    if (t === null) return { key: "", label: "" };
    if (t < CORE.TDS_ZONE[0]) return { key: "thap", label: "Loãng hơn vùng pour over" };
    if (t > CORE.TDS_ZONE[1]) return { key: "cao", label: "Đậm hơn vùng pour over" };
    return { key: "tot", label: "Trong vùng pour over 1,15–1,35%" };
  };

  /* ---------- thời gian ---------- */

  CORE.mmss = function (sec) {
    var s = num(sec);
    if (s === null || s < 0) s = 0;
    s = Math.round(s);
    var m = Math.floor(s / 60);
    var r = s % 60;
    return m + ":" + String(r).padStart(2, "0");
  };

  CORE.parseMmss = function (text) {
    var m = /^(\d+):([0-5]\d)$/.exec(str(text));
    return m ? Number(m[1]) * 60 + Number(m[2]) : null;
  };

  /* ---------- hai công thức có mốc thời gian trong sách ----------
     `water` là mốc luỹ kế trên cân, không phải lượng rót thêm: bước
     "nghỉ" giữ nguyên 150 g vì lúc đó không rót. Đồng hồ chỉ nhắc
     đúng những mốc sách đã ghi; phần rút là biến, không hứa. */

  CORE.RECIPES = [
    {
      id: "v60-cupping-ratio",
      name: "V60 — khớp tỉ lệ cupping",
      short: "V60 · 1:17",
      chapter: "ch-case-study",
      chapterName: "Nghiên cứu tình huống",
      note:
        "Công thức sửa trong chương case study: 15 g với 255 g, tức 1:17, " +
        "để phép so sánh với cupping có nghĩa. Đây là khung, không phải công thức vô địch.",
      dose: 15,
      water: 255,
      ratio: 17,
      temp: "92–93 °C",
      grind: "trung bình–mịn",
      total: 165,
      steps: [
        {
          from: 0,
          to: 40,
          water: 45,
          title: "Bloom — 3× liều",
          detail: "45 g nước với 15 g cà. Xoay nhẹ cả phễu, không khuấy bằng thìa."
        },
        {
          from: 40,
          to: 60,
          water: 150,
          title: "Rót 2 — lên khoảng 60% tổng",
          detail: "Xoáy ốc từ giữa ra rìa rồi vào lại; vòi cách mặt bã 3–5 cm, 5–7 g/s."
        },
        {
          from: 60,
          to: 75,
          water: 150,
          title: "Nghỉ ngắn",
          detail: "Để mực nước xuống gần mặt bã. Không để khô."
        },
        {
          from: 75,
          to: 95,
          water: 255,
          title: "Rót 3 — lên tổng",
          detail: "Cùng pattern, cùng tốc độ, đến 255 g."
        },
        {
          from: 95,
          to: 165,
          water: 255,
          title: "Xoay và rút",
          detail: "Xoay nhẹ phễu một lần để làm phẳng bã, rồi để rút hết."
        }
      ]
    },
    {
      id: "cupping",
      name: "Cupping chuẩn tại nhà",
      short: "Cupping · 1:18",
      chapter: "ch-quy-trinh-cupping",
      chapterName: "Quy trình cupping tại nhà",
      note:
        "Mốc thời gian lấy đúng các bước trong sách. Từ 8:00 trở đi: nếm khi còn nóng " +
        "khoảng 70 °C, khi ấm khoảng 55 °C, khi nguội khoảng 40 °C — ba nhiệt độ, ba thông tin.",
      dose: 8.25,
      water: 150,
      ratio: 18,
      temp: "93 °C",
      grind: "trung bình–thô",
      total: 480,
      steps: [
        {
          from: 0,
          to: 10,
          water: 0,
          title: "Ngửi bã khô",
          detail: "Xay cà, cho vào cốc, ngửi ngay. Đây là mùi mạnh nhất trong cả quy trình."
        },
        {
          from: 10,
          to: 30,
          water: 150,
          title: "Rót nước (0:10)",
          detail: "Rót 150 ml nước 93 °C, đổ nhanh và đều cho toàn bộ bã ướt. Bắt đầu tính giờ."
        },
        {
          from: 30,
          to: 90,
          water: 150,
          title: "Ngửi bã ướt (0:30–1:30)",
          detail: "Lớp hương quan trọng nhất — gần với những gì sẽ vào ly. Ngửi sát mặt nước."
        },
        {
          from: 90,
          to: 240,
          water: 150,
          title: "Đợi (1:30–4:00)",
          detail: "Không làm gì. Bã lắng xuống; ngửi lại ở phút thứ 3, hương đã dịu hơn."
        },
        {
          from: 240,
          to: 270,
          water: 150,
          title: "Phá bã (4:00)",
          detail: "Đẩy lớp bã nổi sang một bên, ba lần. Ngửi ngay — hương mạnh nhất."
        },
        {
          from: 270,
          to: 420,
          water: 150,
          title: "Hớt bọt và bã nổi",
          detail: "Hai thìa hớt sạch phần còn nổi trên mặt. Được một ly nước cà trong."
        },
        {
          from: 420,
          to: 480,
          water: 150,
          title: "Đợi nguội (7:00–8:00)",
          detail: "Đến khoảng 70 °C rồi mới nếm — nóng quá thì không cảm nhận được gì."
        }
      ]
    }
  ];

  CORE.recipeById = function (id) {
    var k = str(id);
    for (var i = 0; i < CORE.RECIPES.length; i++) {
      if (CORE.RECIPES[i].id === k) return CORE.RECIPES[i];
    }
    return null;
  };

  /* Bước đang diễn ra tại giây thứ `sec`. Quá bước cuối thì vẫn là
     bước cuối: đồng hồ dừng ở tổng, không nhảy về bước một. */
  CORE.stepAt = function (recipe, sec) {
    var s = num(sec);
    if (!recipe || !recipe.steps || !recipe.steps.length) return -1;
    if (s === null || s < 0) return 0;
    for (var i = 0; i < recipe.steps.length; i++) {
      if (s < recipe.steps[i].to) return i;
    }
    return recipe.steps.length - 1;
  };

  /* Đổi tổng nước thì đổi mọi mốc theo cùng một hệ số. Hệ số giữ
     nguyên tỉ lệ của công thức, nên bloom vẫn đúng 3× liều: 45/255
     nhân với 300/255 chính là 3 × (300/17). Làm tròn không được kéo
     lùi mốc — cân không nhảy về sau. */
  CORE.scale = function (recipe, water) {
    var w = num(water);
    if (!recipe || !(w > 0)) return null;
    var f = w / recipe.water;
    var prev = 0;
    var steps = recipe.steps.map(function (s, i) {
      var target = i === 0 && s.water === 0 ? 0 : Math.round(s.water * f);
      if (target < prev) target = prev;
      prev = target;
      return { from: s.from, to: s.to, water: target, title: s.title, detail: s.detail };
    });
    return {
      water: Math.round(w),
      ratio: recipe.ratio,
      dose: round(w / recipe.ratio, 1),
      steps: steps
    };
  };

  root.BREW_CORE = CORE;
  if (typeof module === "object" && module.exports) module.exports = CORE;
})(typeof window !== "undefined" ? window : globalThis);
