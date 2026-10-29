/**
 * Test cho phần logic thuần của tìm kiếm: bỏ dấu, xếp hạng, nhãn số chương.
 *
 *   node --test tests/
 *
 * Không framework, không DOM. Phần vẽ HTML và router vẫn chỉ được kiểm bằng
 * mắt và bằng các script check-* — dựng thêm harness trình duyệt cho chúng
 * thì phải thêm cả Chrome vào CI, đắt hơn thứ nó bảo vệ.
 */
import test from "node:test";
import assert from "node:assert/strict";
import S from "../search.js";

/* Một chương giả, đủ để rank() có chỗ gắn id. */
function rec(title, lede, body, id) {
  const r = S.makeRecord(title, lede, body);
  r.entry = { ch: { id: id || title, title: title } };
  return r;
}

test("fold bỏ dấu, kể cả đ và Đ", () => {
  assert.equal(S.fold("chiết xuất"), "chiet xuat");
  assert.equal(S.fold("Độ xay"), "Do xai");
  assert.equal(S.fold("đường"), "duong");
  assert.equal(S.fold("Bã cà"), "Ba ca");
});

test("fold coi i và y là một", () => {
  /* Sách viết "tỉ lệ"; người gõ "ty le" hoặc "ti le" đều phải khớp. */
  assert.equal(S.fold("tỉ lệ"), "ti le");
  assert.equal(S.fold("tỷ lệ"), "ti le");
  assert.equal(S.fold("Mỹ"), S.fold("Mĩ"));
});

test("fold giữ nguyên độ dài từng ký tự", () => {
  /* Bất biến này là thứ khiến snippet cắt đúng chỗ: vị trí tìm trong bản
     bỏ dấu dùng thẳng được cho bản có dấu. */
  const s = "Sách viết “chiết xuất” — ĐỘ XAY 15% · 8 phần";
  assert.equal(S.fold(s).length, s.length);

  /* Ký tự không phải chữ Latin phải đi qua nguyên vẹn, không bị nuốt. */
  assert.equal(S.fold("日本語"), "日本語");
  assert.equal(S.fold("15%"), "15%");
  assert.equal(S.fold(""), "");
  assert.equal(S.fold(null), "");
});

test("normText gộp khoảng trắng và hạ chữ thường", () => {
  assert.equal(S.normText("  Độ   Xay\n\t15%  "), " độ xay 15% ");
  assert.equal(S.fold(S.normText("CHIẾT XUẤT")), "chiet xuat");
});

test("makeRecord: bản hiển thị và bản tìm dài bằng nhau", () => {
  const r = rec("Độ xay", "Chiết xuất theo tỉ lệ", "Tỉ lệ 1:16 cho ra ly cân bằng.");
  assert.equal(r.text.length, r.fold.length);
  assert.match(r.text, /chiết xuất/); /* bản hiển thị giữ dấu */
  assert.match(r.fold, /chiet xuat/); /* bản tìm thì không */
});

test("rank: tiêu đề thắng lede, lede thắng thân bài", () => {
  const hits = S.rank(
    [rec("", "", "độ xay", "than-bai"), rec("", "độ xay", "", "lede"), rec("độ xay", "", "", "tieu-de")],
    "do xay"
  );
  assert.deepEqual(hits.map((h) => h.rec.entry.ch.id), ["tieu-de", "lede", "than-bai"]);
});

test("rank: lặp nhiều thắng lặp một", () => {
  const hits = S.rank(
    [rec("", "", "độ xay một lần thôi", "mot"), rec("", "", "độ xay " + "độ xay ".repeat(6), "nhieu")],
    "do xay"
  );
  assert.equal(hits[0].rec.entry.ch.id, "nhieu");
});

test("rank: cùng hạng thì vị trí sớm thắng", () => {
  const hits = S.rank(
    [rec("", "", "x".repeat(200) + " độ xay", "muon"), rec("", "", "độ xay " + "x".repeat(200), "som")],
    "do xay"
  );
  assert.equal(hits[0].rec.entry.ch.id, "som");
});

test("rank: không khớp thì rỗng, và cắt theo limit", () => {
  assert.deepEqual(S.rank([rec("Độ xay")], "xyz"), []);
  assert.deepEqual(S.rank([rec("Độ xay")], ""), []);
  const many = Array.from({ length: 12 }, (_, i) => rec("độ xay", "", "", "ch" + i));
  assert.equal(S.rank(many, "do xay").length, 12);
  assert.equal(S.rank(many, "do xay", 8).length, 8);
});

test("rank: gõ không dấu vẫn ra chương, snippet giữ dấu", () => {
  const r = rec(
    "Chiết xuất là gì: ba con số và một cái bẫy",
    "Bạn không thể nếm “chiết xuất”.",
    "Chiết xuất là phần chất tan đi qua giấy lọc."
  );
  const [hit] = S.rank([r], "chiet xuat");
  assert.ok(hit, "phải tìm thấy");
  assert.match(hit.snippet, /chiết xuất/i);
  assert.doesNotMatch(hit.snippet, /chiet xuat/i); /* snippet lấy từ bản gốc */
});

test("snippet: cắt quanh chỗ khớp, thêm dấu ba chấm ở hai đầu bị cắt", () => {
  const long = "a".repeat(100) + " độ xay " + "b".repeat(200);
  const s = S.snippet(long, 100, 7);
  assert.ok(s.startsWith("…"), "cắt đầu thì phải có …");
  assert.ok(s.endsWith("…"), "cắt cuối thì phải có …");
  assert.match(s, /độ xay/);
});

test("numLabel: chương hai chữ số, phụ lục một chữ A", () => {
  assert.equal(S.numLabel(false, 1, 1), "01");
  assert.equal(S.numLabel(false, 9, 9), "09");
  assert.equal(S.numLabel(false, 29, 29), "29");
  assert.equal(S.numLabel(true, 30, 1), "A1");
  assert.equal(S.numLabel(true, 33, 4), "A4");
});
