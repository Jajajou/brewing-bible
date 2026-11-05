/**
 * Test cho bảng chuỗi của trang nhật ký.
 *
 *   node --test tests/*.test.mjs
 *
 * Ba việc được giữ bằng test, vì cả ba đều hỏng lặng lẽ: thiếu một khoá thì
 * chỗ đó hiện rỗng, thiếu một {x} thì câu hiện "undefined", và một khoá dùng
 * trong HTML/JS mà không có trong bảng thì không ai thấy cho tới khi đổi
 * ngôn ngữ. Không có bước build nào bắt được mấy thứ đó — chỉ có tệp này.
 */
import test from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import I from "../journal-i18n.js";
import C from "../journal-core.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const VI = I.strings.vi;
const EN = I.strings.en;

function placeholders(s) {
  return (String(s).match(/\{(\w+)\}/g) || []).sort().join(",");
}

test("hai bảng có đúng cùng tập khoá", () => {
  assert.deepEqual(Object.keys(EN).sort(), Object.keys(VI).sort());
});

test("không khoá nào rỗng", () => {
  const all = Object.assign({}, VI, EN);
  for (const key of Object.keys(all)) {
    assert.equal(typeof all[key], "string", key);
    assert.ok(all[key].trim().length > 0, key + " đang rỗng");
  }
});

test("khoá có {x} thì hai bên cùng có đúng những {x} đó", () => {
  for (const key of Object.keys(VI)) {
    assert.equal(placeholders(EN[key]), placeholders(VI[key]), key);
  }
});

test("t: thay biến, và không bao giờ trả undefined", () => {
  assert.equal(I.t("vi", "form.pourRow", { n: 2 }), "Lần 2");
  assert.equal(I.t("en", "form.pourRow", { n: 2 }), "Pour 2");
  assert.equal(I.t("en", "khong.co.khoa"), "");
});

test("pickLang: ?lang= thắng, rồi lựa chọn đã nhớ, rồi trình duyệt", () => {
  assert.equal(I.pickLang("en", "vi", "vi-VN"), "en");
  assert.equal(I.pickLang("xx", "vi", "en-US"), "vi");
  assert.equal(I.pickLang("", "en", "vi-VN"), "en");
  assert.equal(I.pickLang("", "", "en-GB"), "en");
  /* Trang chỉ có hai thứ tiếng: tiếng Nhật rơi về tiếng Việt, không về EN. */
  assert.equal(I.pickLang("", "", "ja-JP"), "vi");
  assert.equal(I.pickLang("", "", undefined), "vi");
});

test("mọi khoá dùng trong trang và trong script đều có câu", () => {
  const used = new Set();
  for (const file of ["journal.html", "journal.js"]) {
    const src = readFileSync(join(ROOT, file), "utf8");
    for (const m of src.matchAll(/data-i18n(?:-html|-ph|-aria|-alt)?="([^"]+)"/g)) used.add(m[1]);
    for (const m of src.matchAll(/\bt\("([^"]+)"/g)) used.add(m[1]);
  }
  assert.ok(used.size > 60, "chỉ tìm thấy " + used.size + " khoá — regex hỏng?");
  /* Khoá động kiểu t("bed." + rec.bed) để lại tiền tố "bed." — họ khoá đó
     được kiểm riêng ở hai test dưới. */
  const missing = Array.from(used).filter((k) => !k.endsWith(".") && (!(k in VI) || !(k in EN)));
  assert.deepEqual(missing, []);
});

test("bốn hình dạng bã trong lõi đều có nhãn ở cả hai thứ tiếng", () => {
  for (const bed of C.BEDS) {
    assert.ok("bed." + bed.key in VI, bed.key);
    assert.ok("bed." + bed.key in EN, bed.key);
  }
});

test("mã lỗi và mã nhắc của lõi đều có câu", () => {
  const codes = []
    .concat(C.validateCodes({}))
    .concat(C.validateCodes(C.normalize({ date: "2026-11-03", dose: 15, water: 900 })))
    .concat(C.pourIssues({ water: 250, pours: [{ t: 30, w: 300 }, { t: 30, w: 300 }] }))
    .map((e) => e.code);

  for (const code of new Set(codes)) {
    assert.ok(code in VI, code);
    assert.ok(code in EN, code);
  }
});
