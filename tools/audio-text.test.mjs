/* node --test tools/audio-text.test.mjs
   Phủ hai lỗi đo được qua ASR (tỉ lệ pha, EY) và luật phân biệt
   tỉ lệ / thời gian — chỗ duy nhất trong file có thể sai âm thầm. */

import { test } from "node:test";
import assert from "node:assert/strict";
import { normalize, speakable, prepare } from "./audio-text.mjs";

test("tỉ lệ pha không đọc thành giờ phút", () => {
  /* lỗi gốc: sea-g2p đọc "1:16" thành "một giờ mười sáu phút" */
  assert.equal(normalize("tỉ lệ 1:16"), "tỉ lệ 1 trên 16");
  assert.equal(normalize("1:15"), "1 trên 15");
  assert.equal(normalize("1:13,3"), "1 trên 13,3");
  assert.doesNotMatch(normalize("tỉ lệ 1:16"), /giờ|phút/);
});

test("mọi tỉ lệ có thật trong sách", () => {
  /* grep ra: 1:13 1:14 1:15 1:16 1:17 1:18 và 1:13,3 */
  for (const n of [13, 14, 15, 16, 17, 18]) {
    assert.equal(normalize(`1:${n}`), `1 trên ${n}`);
  }
});

test("thời gian rót vẫn là thời gian", () => {
  /* cùng cú pháp với tỉ lệ, phân biệt bằng khoảng giá trị */
  assert.equal(normalize("đến 1:30"), "đến 1 phút 30");
  assert.equal(normalize("tổng 3:00"), "tổng 3 phút");
  assert.equal(normalize("0:00"), "0 phút");
  assert.equal(normalize("1:45"), "1 phút 45");
  assert.equal(normalize("8:00"), "8 phút");
  assert.equal(normalize("0:10"), "0 phút 10");
});

test("1:30 là phút, 1:15 là tỉ lệ — ranh giới sát nhau", () => {
  /* chỗ dễ sai nhất của cả file: 1:18 tỉ lệ, 1:30 thời gian */
  assert.match(normalize("1:18"), /trên/);
  assert.match(normalize("1:30"), /phút/);
  assert.doesNotMatch(normalize("1:18"), /phút/);
  assert.doesNotMatch(normalize("1:30"), /trên/);
});

test("dải thời gian 2:30–3:00 không thành tỉ lệ", () => {
  assert.equal(normalize("2:30–3:00"), "2 phút 30 đến 3 phút");
});

test("dải thời gian 7:00–8:00: dấu – bị chữ 'phút' chen vào giữa", () => {
  /* bước thời gian chạy trước bước dải số, nên "7:00–8:00" thành
     "7 phút–8 phút" và dấu – không còn cạnh chữ số */
  assert.equal(normalize("(7:00–8:00)"), "(7 phút đến 8 phút)");
  assert.equal(normalize("2:30–3:15"), "2 phút 30 đến 3 phút 15");
});

test("dải tỉ lệ 1:15–1:17", () => {
  assert.equal(normalize("(1:15–1:17)"), "(1 trên 15 đến 1 trên 17)");
});

test("EY tách chữ cái — 3/4 giọng đọc sai dạng gốc", () => {
  assert.match(normalize("EY thấp"), /i-oai/);
  assert.doesNotMatch(normalize("EY thấp"), /\bEY\b/);
  /* \b phải giữ từ khác nguyên vẹn */
  assert.equal(normalize("THEY KEY"), "THEY KEY");
});

test("từ tiếng Anh để nguyên cho G2P — không phiên âm tay", () => {
  /* Đo bằng ASR trên hai giọng đã chốt: để nguyên khớp 0,74/0,76, phiên
     âm tay chỉ 0,57/0,59. G2P đọc thẳng "pour over" thành pˈɔːɹ ˈoʊvɚ. */
  for (const term of ["pour over", "fines", "channeling", "channelling", "bloom", "bypass", "cupping"]) {
    assert.equal(normalize(`Một chút ${term} trong ly.`), `Một chút ${term} trong ly.`);
  }
});

test("dải số đọc là đến, không lướt qua", () => {
  assert.equal(normalize("18–22%"), "18 đến 22 phần trăm");
  assert.equal(normalize("1,15–1,35%"), "1,15 đến 1,35 phần trăm");
  assert.equal(normalize("800–1000 µm"), "800 đến 1000 mi-crô-mét");
});

test("đơn vị đo", () => {
  assert.equal(normalize("800 µm"), "800 mi-crô-mét");
  assert.equal(normalize("93 °C"), "93 độ C");
  assert.equal(normalize("40 ppm"), "40 pi-pi-em");
  assert.equal(normalize("5,5 g/100 ml"), "5,5 gam trên 100 mi-li-lít");
});

test("en dash giữa câu thành dấu phẩy, không thành 'đến'", () => {
  const out = normalize("tuyến tính — đây là đòn bẩy");
  assert.equal(out, "tuyến tính, đây là đòn bẩy");
});

test("dash dính liền hai chữ: không có khoảng trắng để bắt", () => {
  assert.equal(normalize("rang trung–đậm"), "rang trung, đậm");
  assert.equal(normalize("duo–trio"), "duo, trio");
});

test("4:6 là tên phương pháp, không phải thời gian hay tỉ lệ", () => {
  const out = normalize("Phương pháp 4:6");
  assert.equal(out, "Phương pháp bốn sáu");
  assert.doesNotMatch(out, /phút|trên/);
});

test("ký hiệu hoá học trong phần nước", () => {
  assert.equal(normalize("HCO₃⁻ 280"), "bi-cac-bô-nát 280");
  assert.equal(normalize("17 mg/L CaCO₃"), "17 mi-li-gam trên lít can-xi cac-bô-nát");
  assert.equal(normalize("Ca²⁺ và Mg²⁺"), "can-xi và ma-giê");
});

test("ca lẻ trong phụ lục", () => {
  assert.equal(normalize("201 °F"), "201 độ F");
  assert.equal(normalize("[41]–[54]"), "41 đến 54");
  assert.match(normalize("10⁻¹³ m²"), /10 lũy thừa trừ 13/);
});

test("bảng không có data-audio thì bỏ, và báo lại", () => {
  const body = '<p>Trước.</p><div class="table-wrap"><table><tr><td>x</td></tr></table></div><p>Sau.</p>';
  const { text, skipped } = speakable(body);
  assert.doesNotMatch(text, /x/);
  assert.match(text, /Trước/);
  assert.match(text, /Sau/);
  assert.deepEqual(skipped, ["table-wrap"]);
});

test("bảng có data-audio thì đọc câu đã khai", () => {
  const body = '<div class="table-wrap" data-audio="Có bốn nguyên nhân."><table><tr><td>x</td></tr></table></div>';
  const { text, skipped } = speakable(body);
  assert.match(text, /Có bốn nguyên nhân/);
  assert.doesNotMatch(text, /x/);
  assert.deepEqual(skipped, []);
});

test("table trần (không .table-wrap) cũng phải bỏ", () => {
  /* 3 bảng phụ lục part-9 không có .table-wrap; để sót thì đọc tuột
     từng ô: "Ch. Khẳng định cần nguồn Nhãn trong sách [15] [16]…" */
  const body = '<p>Trước.</p><table><tr><td>Ch.</td><td>[15]</td></tr></table><p>Sau.</p>';
  const { text, skipped } = speakable(body);
  assert.doesNotMatch(text, /\[15\]/);
  assert.match(text, /Trước/);
  assert.match(text, /Sau/);
  assert.deepEqual(skipped, ["table"]);
});

test("div lồng nhau: cắt đúng thẻ đóng, không ăn mất phần sau", () => {
  /* stat-grid chứa div.stat bên trong — đếm tay, regex không làm được */
  const body = '<div class="stat-grid"><div class="stat"><b>18</b></div></div><p>Giữ lại.</p>';
  const { text } = speakable(body);
  assert.match(text, /Giữ lại/);
  assert.doesNotMatch(text, /18/);
});

test("callout-title thành câu có dấu hai chấm", () => {
  const { text } = speakable('<div class="callout warn"><p class="callout-title">Chú ý</p><p>Nội dung.</p></div>');
  assert.match(text, /Chú ý:/);
});

test("bảng trần không có .table-wrap: bỏ, và báo lại", () => {
  /* ba bảng phụ lục nguồn ở part-9 không có .table-wrap. Trước đây chúng bị
     stripTags đọc thành "Ch. Nguồn 1 [15] [16]". */
  const body = '<p class="tbl-cap">Chương 1–9</p><table><tr><td>[15]</td></tr></table><p>Sau.</p>';
  const { text, skipped } = speakable(body);
  assert.doesNotMatch(text, /\[15\]/);
  assert.match(text, /Sau/);
  assert.deepEqual(skipped, ["table"]);
});

test("bảng trần có data-audio thì đọc câu đã khai", () => {
  const { text, skipped } = speakable(
    '<table data-audio="Bảng nguồn, để tra bằng mắt."><tr><td>[15]</td></tr></table>'
  );
  assert.match(text, /để tra bằng mắt/);
  assert.doesNotMatch(text, /\[15\]/);
  assert.deepEqual(skipped, []);
});

test("prepare: HTML tới text đọc được, một bước", () => {
  const { text } = prepare('<p>Tỉ lệ 1:16 và 18–22%.</p>');
  assert.equal(text, "Tỉ lệ 1 trên 16 và 18 đến 22 phần trăm.");
});

/* ---------- bốn mục VOICE.md từng đánh dấu "chưa" ---------- */

test("badge mức bằng chứng không chen vào cuối câu", () => {
  /* đo thật trước khi sửa: "…đáng kể Bằng chứng ." — chữ chen vào ngay
     trước dấu chấm, câu bị chặt làm đôi đúng lúc sắp hết */
  const { text } = prepare(
    '<p>Không tạo ra khác biệt cảm quan đáng kể <span class="tier tier-a">Bằng chứng</span>.</p>'
  );
  assert.equal(text, "Không tạo ra khác biệt cảm quan đáng kể.");
  assert.doesNotMatch(text, /Bằng chứng/);
  assert.doesNotMatch(text, / \./);
});

test("badge ba mức đều bỏ, kể cả loại không màu", () => {
  for (const cls of ["tier-a", "tier-b", "tier-c"]) {
    const { text } = speakable('<p>Một câu <span class="tier ' + cls + '">Hợp lý</span>.</p>');
    assert.equal(text, "Một câu ."); /* dấu cách đi, normalize dọn nốt */
  }
});

test("trích dẫn [n] bị bỏ, không đọc cả ngoặc", () => {
  /* trước: "([24])" → đọc nguyên "mở ngoặc hai mươi tư" */
  assert.equal(
    normalize("Nghiên cứu gần nhất ([24]) bảo quản ở 5 °C."),
    "Nghiên cứu gần nhất bảo quản ở 5 độ C."
  );
  assert.equal(normalize("như [24] nói"), "như nói");
  assert.doesNotMatch(normalize("như [24] nói"), /\[|\]/);
});

test("dải nguồn [41]–[54] vẫn đọc thành số, không bị luật bỏ trích dẫn ăn", () => {
  /* đây là câu nói thật về khoảng nguồn, không phải nhãn — nên luật dải số
     phải chạy trước luật bỏ */
  assert.equal(normalize("mục Thi đấu, [41]–[54]."), "mục Thi đấu, 41 đến 54.");
});

test("(xem chương …) bị bỏ — bản nghe tuần tự không lùi được", () => {
  assert.equal(
    normalize("Hãy đọc lại phần đó (xem chương 17 và 19)."),
    "Hãy đọc lại phần đó."
  );
  assert.equal(
    normalize("Dòng này (xem Phần II, đây là lúc nó quan trọng nhất) nói tiếp."),
    "Dòng này nói tiếp."
  );
  assert.doesNotMatch(normalize("a (xem chương 5) b"), /xem|\(|\)/);
});

test("ký hiệu toán đọc thành lời", () => {
  /* đo trên bản chuẩn hoá 30.10.2026: đây là những ký hiệu còn sót */
  assert.equal(normalize("Năng lượng = nhiệt + độ mịn"), "Năng lượng bằng nhiệt và độ mịn");
  assert.equal(normalize("15 g × 17 = 255 g"), "15 g nhân 17 bằng 255 g");
  assert.equal(normalize("pH 8,0 ± 0,5"), "pê-hát 8,0 cộng trừ 0,5");
  assert.equal(normalize("alkalinity ≈ 98 ppm"), "alkalinity khoảng 98 pi-pi-em");
  assert.equal(normalize("nóng (~70 °C)"), "nóng (khoảng 70 độ C)");
  assert.equal(normalize("nước → cỡ xay → độ tươi"), "nước rồi cỡ xay rồi độ tươi");
});

test("D90 − D10: trừ, và vế phải có chữ D", () => {
  assert.equal(normalize("D90 − D10 là bề rộng"), "D90 trừ D10 là bề rộng");
});

test("dấu · giữa hai cụm thành dấu phẩy", () => {
  assert.equal(normalize("Chương 1–9 · hạt, nước"), "Chương 1 đến 9, hạt, nước");
});

test("dấu * đầu dòng bị bỏ, không đọc thành 'sao'", () => {
  assert.equal(normalize("* Ba dòng trên không lấy"), "Ba dòng trên không lấy");
});

/* ---------- ngắt đoạn: đó là 0,7 s lặng của TTS ---------- */

test("ngắt đoạn được giữ nguyên qua stripTags", () => {
  /* đây là lỗi đã mắc một lần: gộp \n\n khi cắt segment làm cả chương
     thành một đoạn, mất toàn bộ khoảng lặng giữa các đoạn */
  const { text } = speakable("<p>Một.</p><p>Hai.</p><p>Ba.</p>");
  assert.equal(text, "Một.\n\nHai.\n\nBa.");
});

/* ---------- câu đúc kết (div.pull) ---------- */

test("div.pull tách thành segment riêng, đúng thứ tự", () => {
  /* 13 khối pull phải đọc bằng giọng khác và có 1,1 s lặng hai bên —
     nên chúng phải là mốc, không thể chỉ là một đoạn trong text */
  const { segments, text } = speakable('<p>A.</p><div class="pull">Một.<br>Hai.</div><p>B.</p>');
  assert.deepEqual(segments.map((s) => s.kind), ["body", "pull", "body"]);
  assert.equal(segments[1].text, "Một. Hai.");
  assert.equal(text, "A.\n\nMột. Hai.\n\nB.");
});

test("segment pull cũng được chuẩn hoá như thân bài", () => {
  const { segments } = prepare('<div class="pull">Tỉ lệ 1:16.</div>');
  assert.equal(segments[0].kind, "pull");
  assert.equal(segments[0].text, "Tỉ lệ 1 trên 16.");
});

test("hai pull liền nhau không sinh segment rỗng", () => {
  const { segments } = speakable('<div class="pull">Một.</div><div class="pull">Hai.</div>');
  assert.deepEqual(segments.map((s) => s.kind), ["pull", "pull"]);
  assert.equal(segments.length, 2);
});

/* ---------- khung: nối tiêu đề với thân ---------- */

test("callout mệnh đề điều kiện nối bằng 'thì', hạ chữ đầu vế sau", () => {
  /* ca khó nhất trong sách (VOICE.md mục 4): tiêu đề là điều kiện bị bỏ
     lửng, thân là vế sau. Ngắt đoạn là câu bị treo. */
  const { text } = speakable(
    '<div class="callout act"><p class="callout-title">Nếu bạn chỉ có một thứ</p><p>Mua cân. Bỏ qua mọi thứ khác.</p></div>'
  );
  assert.equal(text, "Nếu bạn chỉ có một thứ thì mua cân. Bỏ qua mọi thứ khác.");
});

test("callout câu hỏi giữ tiêu đề thành câu riêng", () => {
  /* câu hỏi thì phải nghe như câu hỏi, rồi mới tới câu trả lời */
  const { text } = speakable(
    '<div class="callout"><p class="callout-title">Bằng chứng ở mức nào?</p><p>Nội dung.</p></div>'
  );
  assert.equal(text, "Bằng chứng ở mức nào?\n\nNội dung.");
});

test("callout thẻ nối bằng dấu hai chấm, cùng một đoạn", () => {
  const { text } = speakable(
    '<div class="callout ok"><p class="callout-title">Một câu để nhớ</p><p>Nội dung.</p></div>'
  );
  assert.equal(text, "Một câu để nhớ: Nội dung.");
});

test("callout không có tiêu đề vẫn thoát vòng lặp", () => {
  /* trả nguyên khối không tiêu đề thì vòng lặp ở speakable gặp lại đúng nó
     và chạy mãi — treo build chứ không báo lỗi */
  const { text } = speakable('<div class="callout"><p>Chỉ có thân.</p></div>');
  assert.equal(text, "Chỉ có thân.");
});

test("callout nhiều đoạn: chỉ nối tiêu đề với đoạn đầu", () => {
  const { text } = speakable(
    '<div class="callout warn"><p class="callout-title">Chú ý</p><p>Một.</p><p>Hai.</p></div>'
  );
  assert.equal(text, "Chú ý: Một.\n\nHai.");
});
