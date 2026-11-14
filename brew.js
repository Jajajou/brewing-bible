/* ============================================================
   The Brewing Bible — brew.js

   Phần DOM của trang Đồng hồ pha & máy tính: vẽ, đếm giây, kêu.
   Mọi phép tính nằm trong brew-core.js để test được bằng node --test.

   Ba thứ cố ý làm khác một app đồng hồ thông thường:

   1. Đồng hồ đếm bằng đồng hồ hệ thống, không bằng số lần tick. Tab bị
      ẩn thì requestAnimationFrame dừng hẳn, còn setInterval bị bóp
      xuống một giây — nên mỗi lần vẽ đều tính lại từ mốc thật, không
      cộng dồn. Đếm tick là đồng hồ chậm dần mà không ai biết.
   2. Không tự chuyển bước khi bã chưa sẵn sàng: mốc thời gian chỉ là
      khung, nên bước hiện tại được đọc to bằng chữ, không phải bằng
      một tiếng bíp bắt buộc phải theo.
   3. Màn hình không tắt khi đang pha (Screen Wake Lock), vì điện thoại
      đặt trên bàn cân sẽ tự khoá đúng lúc cần nhìn.
   ============================================================ */
(function () {
  "use strict";

  var C = window.BREW_CORE;
  if (!C) return;

  /* ---------- giao diện sáng/tối, dùng chung khoá với trang sách ---------- */
  var THEME_KEY = "nuocba.theme";
  var rootHtml = document.documentElement;

  function applyTheme(t) {
    rootHtml.setAttribute("data-theme", t === "dark" ? "dark" : "light");
    var btn = document.getElementById("themeToggle");
    if (btn) {
      btn.textContent = t === "dark" ? "☀" : "☾";
      btn.setAttribute("aria-label", t === "dark" ? "Chuyển sang giao diện sáng" : "Chuyển sang giao diện tối");
    }
  }

  (function initTheme() {
    var saved = null;
    try {
      saved = localStorage.getItem(THEME_KEY);
    } catch (e) {}
    var dark = saved ? saved === "dark" : window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    applyTheme(dark ? "dark" : "light");
  })();

  document.getElementById("themeToggle").addEventListener("click", function () {
    var next = rootHtml.getAttribute("data-theme") === "dark" ? "light" : "dark";
    applyTheme(next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch (e) {}
  });

  /* ---------- tab ---------- */
  var tabs = Array.prototype.slice.call(document.querySelectorAll("[data-tab]"));
  var panels = {
    timer: document.getElementById("panel-timer"),
    calc: document.getElementById("panel-calc")
  };

  function showTab(name) {
    tabs.forEach(function (b) {
      var on = b.getAttribute("data-tab") === name;
      b.setAttribute("aria-selected", on ? "true" : "false");
      b.tabIndex = on ? 0 : -1;
    });
    Object.keys(panels).forEach(function (k) {
      if (panels[k]) panels[k].hidden = k !== name;
    });
    if (name !== "timer") stopTicking();
  }

  tabs.forEach(function (b) {
    b.addEventListener("click", function () {
      showTab(b.getAttribute("data-tab"));
    });
  });

  /* ---------- âm thanh ----------
     Một tiếng bíp ngắn ở mỗi mốc. AudioContext chỉ được tạo sau cú
     chạm đầu tiên (Safari chặn nếu tạo trước), và im lặng nếu máy
     không cho — đồng hồ vẫn chạy. */
  var actx = null;

  function beep(times) {
    try {
      if (!actx) {
        var AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) return;
        actx = new AC();
      }
      if (actx.state === "suspended") actx.resume();
      var n = times || 1;
      for (var i = 0; i < n; i++) {
        var t0 = actx.currentTime + i * 0.22;
        var osc = actx.createOscillator();
        var gain = actx.createGain();
        osc.type = "sine";
        osc.frequency.value = i === n - 1 && n > 1 ? 660 : 880;
        gain.gain.setValueAtTime(0.0001, t0);
        gain.gain.exponentialRampToValueAtTime(0.22, t0 + 0.02);
        gain.gain.exponentialRampToValueAtTime(0.0001, t0 + 0.18);
        osc.connect(gain).connect(actx.destination);
        osc.start(t0);
        osc.stop(t0 + 0.2);
      }
    } catch (e) {}
  }

  /* ---------- đồng hồ ---------- */

  var state = {
    recipe: C.RECIPES[0],
    water: C.RECIPES[0].water,
    elapsed: 0,
    running: false,
    base: 0,
    startedAt: 0,
    step: -1,
    done: false
  };

  var loopId = 0;
  var wakeLock = null;
  var clockEl = document.getElementById("clock");
  var barEl = document.getElementById("bar");
  var nowEl = document.getElementById("now");
  var startBtn = document.getElementById("startBtn");
  var resetBtn = document.getElementById("resetBtn");
  var waterIn = document.getElementById("waterIn");
  var stepList = document.getElementById("stepList");
  var pickEl = document.getElementById("recipePick");
  var noteEl = document.getElementById("recipeNote");

  function schedule() {
    return C.scale(state.recipe, state.water) || { water: state.recipe.water, dose: state.recipe.dose, steps: state.recipe.steps };
  }

  function renderPicker() {
    pickEl.innerHTML = "";
    C.RECIPES.forEach(function (r) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "pick" + (r.id === state.recipe.id ? " on" : "");
      b.innerHTML = "<b>" + r.name + "</b><span>" + r.short + " · " + C.mmss(r.total) + "</span>";
      b.addEventListener("click", function () {
        state.recipe = r;
        state.water = r.water;
        waterIn.value = String(r.water);
        reset();
        renderPicker();
        renderSteps();
        renderNote();
      });
      pickEl.appendChild(b);
    });
  }

  function renderNote() {
    var r = state.recipe;
    noteEl.innerHTML =
      r.note +
      ' <a href="index.html#/' + r.chapter + '">Đọc chương “' + r.chapterName + '”</a>' +
      "<br><span class=\"muted\">" + r.temp + " · xay " + r.grind + " · tổng " + C.mmss(r.total) + "</span>";
  }

  function renderSteps() {
    var sc = schedule();
    stepList.innerHTML = "";
    sc.steps.forEach(function (s, i) {
      var li = document.createElement("li");
      var b = document.createElement("button");
      b.type = "button";
      b.className = "step" + (i === state.step ? " on" : "");
      b.innerHTML =
        '<span class="t">' + C.mmss(s.from) + "</span>" +
        '<span class="body"><b>' + s.title + "</b><i>" + s.detail + "</i></span>" +
        '<span class="w">' + (s.water ? s.water + " g" : "—") + "</span>";
      b.addEventListener("click", function () {
        state.elapsed = s.from;
        state.base = s.from;
        state.startedAt = performance.now();
        state.done = false;
        paint(true);
      });
      li.appendChild(b);
      stepList.appendChild(li);
    });
  }

  function paint(force) {
    var sc = schedule();
    var total = state.recipe.total;
    var el = Math.min(state.elapsed, total);
    var idx = C.stepAt(state.recipe, el);
    var sc2 = sc.steps[idx] || sc.steps[sc.steps.length - 1];

    clockEl.textContent = C.mmss(el);
    barEl.style.width = Math.min(100, (el / total) * 100).toFixed(2) + "%";

    if (idx !== state.step || force) {
      state.step = idx;
      Array.prototype.forEach.call(stepList.children, function (li, i) {
        var b = li.firstChild;
        if (b) b.className = "step" + (i === idx ? " on" : "");
      });
      nowEl.innerHTML =
        "<b>" + sc2.title + "</b>" +
        '<span>mốc trên cân: ' + (sc2.water ? sc2.water + " g" : "chưa rót") + "</span>";
    }

    startBtn.textContent = state.running ? "Tạm dừng" : state.elapsed > 0 && !state.done ? "Tiếp tục" : "Bắt đầu";
    startBtn.disabled = state.done;
    document.body.classList.toggle("is-running", state.running);
  }

  function stepToIndex(prev, next) {
    if (prev < 0) prev = 0;
    if (next > prev) beep(next - prev > 1 ? 2 : 1);
  }

  function loop() {
    if (!state.running) return;
    state.elapsed = state.base + (performance.now() - state.startedAt) / 1000;
    var idx = C.stepAt(state.recipe, Math.min(state.elapsed, state.recipe.total));
    if (idx !== state.step) stepToIndex(state.step, idx);
    if (state.elapsed >= state.recipe.total) {
      state.elapsed = state.recipe.total;
      state.running = false;
      state.done = true;
      beep(2);
      paint(true);
      stopTicking();
      stopWakeLock();
      return;
    }
    paint();
  }

  /* 200 ms là đủ mượt cho một con số đổi mỗi giây, và vẫn chạy khi tab
     bị ẩn (chậm hơn, nhưng mốc thời gian thì đúng). */
  function startTicking() {
    stopTicking();
    loopId = setInterval(loop, 200);
  }

  function stopTicking() {
    if (loopId) clearInterval(loopId);
    loopId = 0;
  }

  function start() {
    if (state.done) return;
    state.running = true;
    state.base = state.elapsed;
    state.startedAt = performance.now();
    beep(1);
    requestWakeLock();
    startTicking();
    paint();
  }

  function pause() {
    state.running = false;
    stopTicking();
    stopWakeLock();
    paint();
  }

  function reset() {
    pause();
    state.elapsed = 0;
    state.base = 0;
    state.done = false;
    state.step = -1;
    paint(true);
  }

  startBtn.addEventListener("click", function () {
    if (state.running) pause();
    else start();
  });

  resetBtn.addEventListener("click", reset);

  waterIn.addEventListener("input", function () {
    var v = parseFloat(String(waterIn.value).replace(",", "."));
    if (!(v > 0)) return;
    state.water = v;
    var wasRunning = state.running;
    if (wasRunning) pause();
    state.done = false;
    renderSteps();
    paint(true);
  });

  /* Màn hình tắt giữa lúc pha là lỗi thật, không phải chi tiết. */
  function requestWakeLock() {
    try {
      if ("wakeLock" in navigator && !wakeLock) {
        navigator.wakeLock.request("screen").then(function (l) {
          wakeLock = l;
          l.addEventListener("release", function () {
            wakeLock = null;
          });
        }).catch(function () {});
      }
    } catch (e) {}
  }

  function stopWakeLock() {
    try {
      if (wakeLock) {
        wakeLock.release();
        wakeLock = null;
      }
    } catch (e) {}
  }

  /* Quay lại tab thì vẽ lại ngay: trong lúc ẩn, setInterval bị bóp nhịp
     nên màn hình có thể đang trễ vài giây so với mốc thật. */
  document.addEventListener("visibilitychange", function () {
    if (document.visibilityState !== "visible") return;
    if (state.running) {
      requestWakeLock();
      loop();
    }
  });

  /* ---------- máy tính ---------- */
  var cDose = document.getElementById("cDose");
  var cWater = document.getElementById("cWater");
  var cRatio = document.getElementById("cRatio");
  var cOut = document.getElementById("cOut");
  var eTds = document.getElementById("eTds");
  var eYield = document.getElementById("eYield");
  var eOut = document.getElementById("eOut");
  var eZone = document.getElementById("eZone");
  var tZoneEl = document.getElementById("tZone");

  /* Ô nhập kiểu number chỉ nhận dấu chấm — hiển thị trong câu thì dùng
     dấu phẩy, nhưng value của input phải là "16.7" nếu không trình duyệt
     coi là rỗng và ô tự trắng ra. */
  function setVal(input, v, dec) {
    input.value = v === null || v === undefined ? "" : C.fmt(v, dec == null ? 1 : dec, ".");
  }

  function fromDose() {
    var d = parseFloat(String(cDose.value).replace(",", "."));
    var r = parseFloat(String(cRatio.value).replace(",", "."));
    if (!(d > 0) || !(r > 0)) return;
    setVal(cWater, C.waterFor(d, r), 0);
    calcOut();
  }

  function fromWater() {
    var w = parseFloat(String(cWater.value).replace(",", "."));
    var d = parseFloat(String(cDose.value).replace(",", "."));
    if (!(w > 0) || !(d > 0)) return;
    setVal(cRatio, C.ratio(d, w), 1);
    calcOut();
  }

  function fromRatio() {
    var d = parseFloat(String(cDose.value).replace(",", "."));
    var r = parseFloat(String(cRatio.value).replace(",", "."));
    if (!(d > 0) || !(r > 0)) return;
    setVal(cWater, C.waterFor(d, r), 0);
    calcOut();
  }

  function calcOut() {
    var d = parseFloat(String(cDose.value).replace(",", "."));
    var w = parseFloat(String(cWater.value).replace(",", "."));
    cOut.innerHTML =
      "<b>" + C.fmt(d, 1) + " g</b> cà · <b>" + C.fmt(w, 0) + " g</b> nước · <b>" +
      C.ratioText(d, w) + "</b>";
    /* mặc định khối lượng trong ly = nước đã rót, trừ khi người dùng sửa */
    if (!eYield.dataset.touched) setVal(eYield, w, 0);
    calcEy();
  }

  function calcEy() {
    var t = parseFloat(String(eTds.value).replace(",", "."));
    var y = parseFloat(String(eYield.value).replace(",", "."));
    var d = parseFloat(String(cDose.value).replace(",", "."));
    var ey = C.eyFromTds(t, d, y);

    if (ey === null) {
      eOut.textContent = "—";
      eZone.textContent = "Nhập TDS, liều và khối lượng trong ly để tính.";
      eZone.className = "zone";
      return;
    }

    eOut.textContent = C.fmt(ey, 1) + "%";
    var z = C.eyZone(ey);
    eZone.className = "zone " + z.key;
    eZone.innerHTML = "<b>" + z.label + "</b> " + z.note;

    var tz = C.tdsZone(t);
    tZoneEl.className = "zone " + tz.key;
    tZoneEl.textContent = tz.label + " — EY và TDS là hai chuyện khác nhau: TDS nói ly cà đậm đến đâu, EY nói bạn đã lấy được bao nhiêu từ hạt.";
  }

  cDose.addEventListener("input", fromDose);
  cWater.addEventListener("input", fromWater);
  cRatio.addEventListener("input", fromRatio);
  eTds.addEventListener("input", calcEy);
  eYield.addEventListener("input", function () {
    eYield.dataset.touched = "1";
    calcEy();
  });

  /* ---------- dựng lần đầu ---------- */
  waterIn.value = String(state.recipe.water);
  renderPicker();
  renderSteps();
  renderNote();
  paint(true);
  showTab("timer");
  calcOut();
})();
