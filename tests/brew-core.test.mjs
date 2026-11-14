/* Test cho brew-core.js — logic thuần của trang đồng hồ pha & máy tính.
   Cùng kiểu với journal-core: phần DOM vẫn chỉ kiểm bằng mắt.

   `node --test` tự tìm file *.test.mjs trong repo. */
import test from "node:test";
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";

const require = createRequire(import.meta.url);
const C = require("../brew-core.js");
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");

/* ---------- tỉ lệ ---------- */

test("tỉ lệ: ba cách hỏi cùng một câu", () => {
  assert.equal(C.ratio(15, 255), 17);
  assert.equal(C.waterFor(15, 17), 255);
  assert.equal(C.doseFor(255, 17), 15);
  assert.equal(C.ratio(15, 250), 16.666666666666668);
});

test("tỉ lệ: số 0 và chữ rỗng trả về null, không trả Infinity", () => {
  assert.equal(C.ratio(0, 255), null);
  assert.equal(C.ratio(15, 0), null);
  assert.equal(C.ratio("", 255), null);
  assert.equal(C.waterFor(null, 17), null);
  assert.equal(C.doseFor(255, 0), null);
});

test("tỉ lệ: nhận dấu phẩy thập phân", () => {
  assert.ok(Math.abs(C.waterFor("15,5", "17") - 263.5) < 1e-9);
});

test("ratioText: 1:17 chứ không phải 1:17,0", () => {
  assert.equal(C.ratioText(15, 255, ","), "1:17");
  assert.equal(C.ratioText(15, 250, ","), "1:16,7");
  assert.equal(C.ratioText(15, 255, "."), "1:17");
  assert.equal(C.ratioText(0, 255), "—");
});

/* ---------- chiết xuất ---------- */

test("EY từ TDS: 1,3% với 255 g nước và 15 g cà", () => {
  assert.ok(Math.abs(C.eyFromTds(1.3, 15, 255) - 22.1) < 1e-9);
});

test("EY và TDS đi vòng về đúng chỗ", () => {
  const ey = C.eyFromTds(1.25, 18, 300);
  assert.ok(Math.abs(C.tdsFromEy(ey, 18, 300) - 1.25) < 1e-9);
});

test("EY: thiếu dữ liệu thì null, không ra NaN", () => {
  assert.equal(C.eyFromTds(null, 15, 255), null);
  assert.equal(C.eyFromTds(1.3, 0, 255), null);
  assert.equal(C.tdsFromEy(21, 15, 0), null);
});

test("ba cửa sổ của chương: dưới 18 thiếu, 18–22 tốt, trên 22 dư", () => {
  assert.equal(C.eyZone(17.9).key, "thieu");
  assert.equal(C.eyZone(18).key, "tot");
  assert.equal(C.eyZone(21.9).key, "tot");
  assert.equal(C.eyZone(22).key, "tot");
  assert.equal(C.eyZone(22.1).key, "du");
  assert.equal(C.eyZone(null).key, "");
});

test("vùng TDS pour over 1,15–1,35%", () => {
  assert.equal(C.tdsZone(1.0).key, "thap");
  assert.equal(C.tdsZone(1.2).key, "tot");
  assert.equal(C.tdsZone(1.4).key, "cao");
});

/* ---------- thời gian ---------- */

test("mmss: mốc của hai công thức", () => {
  assert.equal(C.mmss(0), "0:00");
  assert.equal(C.mmss(40), "0:40");
  assert.equal(C.mmss(165), "2:45");
  assert.equal(C.mmss(480), "8:00");
  assert.equal(C.mmss(-5), "0:00");
  assert.equal(C.mmss(59.6), "1:00");
});

test("parseMmss: chặt, không đoán", () => {
  assert.equal(C.parseMmss("2:45"), 165);
  assert.equal(C.parseMmss("8:00"), 480);
  assert.equal(C.parseMmss("2:7"), null);
  assert.equal(C.parseMmss("2:75"), null);
  assert.equal(C.parseMmss(""), null);
});

/* ---------- lịch từng bước ---------- */

test("mỗi công thức: bước tăng dần, bước cuối bằng tổng, nước không giảm", () => {
  C.RECIPES.forEach((r) => {
    assert.ok(r.steps.length > 1, r.id);
    assert.equal(r.steps[0].from, 0, r.id);
    assert.equal(r.steps[r.steps.length - 1].to, r.total, r.id);
    let prev = 0;
    r.steps.forEach((s) => {
      assert.ok(s.from < s.to, r.id + " " + s.title);
      assert.ok(s.from >= prev, r.id + " " + s.title);
      assert.ok(s.water >= 0, r.id);
      prev = s.to;
    });
  });
});

test("bước hiện tại đổi đúng ở ranh giới", () => {
  const v60 = C.recipeById("v60-cupping-ratio");
  assert.equal(C.stepAt(v60, 0), 0);
  assert.equal(C.stepAt(v60, 39.9), 0);
  assert.equal(C.stepAt(v60, 40), 1);
  assert.equal(C.stepAt(v60, 59.9), 1);
  assert.equal(C.stepAt(v60, 60), 2);
  assert.equal(C.stepAt(v60, 75), 3);
  assert.equal(C.stepAt(v60, 95), 4);
  assert.equal(C.stepAt(v60, 9999), 4);
});

test("bước hiện tại: giây âm hoặc rỗng vẫn là bước đầu", () => {
  const cup = C.recipeById("cupping");
  assert.equal(C.stepAt(cup, -3), 0);
  assert.equal(C.stepAt(cup, null), 0);
  assert.equal(C.stepAt(null, 10), -1);
});

test("đổi tổng nước: mốc gam đổi theo cùng hệ số, không kéo lùi", () => {
  const v60 = C.recipeById("v60-cupping-ratio");
  const sc = C.scale(v60, 300);
  assert.equal(sc.water, 300);
  assert.ok(Math.abs(sc.dose - 17.6) < 1e-9);
  assert.equal(sc.steps[0].water, 53);
  assert.equal(sc.steps[sc.steps.length - 1].water, 300);
  for (let i = 1; i < sc.steps.length; i++) {
    assert.ok(sc.steps[i].water >= sc.steps[i - 1].water);
  }
  /* bloom vẫn đúng 3× liều, vì tỉ lệ của công thức không đổi */
  assert.ok(Math.abs(sc.steps[0].water - 3 * (300 / 17)) < 0.6);
});

test("đổi tổng nước: giữ nguyên mốc thời gian", () => {
  const cup = C.recipeById("cupping");
  const sc = C.scale(cup, 180);
  assert.deepEqual(
    sc.steps.map((s) => [s.from, s.to]),
    cup.steps.map((s) => [s.from, s.to])
  );
  assert.equal(sc.steps[0].water, 0, "bước ngửi bã khô không có nước");
});

test("scale: nước không hợp lệ trả về null", () => {
  const r = C.RECIPES[0];
  assert.equal(C.scale(r, 0), null);
  assert.equal(C.scale(r, -10), null);
  assert.equal(C.scale(r, "abc"), null);
  assert.equal(C.scale(null, 250), null);
});

/* ---------- link về sách không được chết ---------- */

test("mỗi công thức trỏ tới một chương có thật trong content/", () => {
  const files = ["part-1", "part-2", "part-3", "part-4", "part-5", "part-6", "part-7", "part-8", "part-9"];
  const all = files
    .map((f) => {
      try {
        return readFileSync(join(ROOT, "content", f + ".js"), "utf8");
      } catch {
        return "";
      }
    })
    .join("\n");

  C.RECIPES.forEach((r) => {
    assert.ok(all.includes('id: "' + r.chapter + '"'), "không thấy chương " + r.chapter);
  });
});
