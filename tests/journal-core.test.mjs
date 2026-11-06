/**
 * Test cho phần logic thuần của nhật ký pha.
 *
 *   node --test
 *
 * Cùng lý do với tests/logic.test.mjs: phần vẽ và IndexedDB vẫn chỉ được
 * kiểm bằng mắt — dựng harness trình duyệt trong CI đắt hơn thứ nó bảo vệ.
 * Nhưng mọi thứ quyết định dữ liệu có đúng hay không (tỉ lệ, thời gian,
 * CSV, đóng gói bản sao) đều nằm ở đây và đều test được.
 */
import test from "node:test";
import assert from "node:assert/strict";
import C from "../journal-core.js";

test("ratio: nước chia cà, một chữ số thập phân", () => {
  assert.equal(C.ratio(15, 240), 16);
  assert.equal(C.ratio(15, 250), 16.7);
  assert.equal(C.ratio(18, 300), 16.7);
  assert.equal(C.ratio(0, 240), null);
  assert.equal(C.ratio(15, 0), null);
  assert.equal(C.ratio("", 240), null);
});

test("ratioText: bỏ .0, và dấu phẩy cho bản hiển thị", () => {
  assert.equal(C.ratioText(15, 240, ","), "1:16");
  assert.equal(C.ratioText(15, 250, ","), "1:16,7");
  assert.equal(C.ratioText(15, 250, "."), "1:16.7");
  assert.equal(C.ratioText(null, null, ","), "");
});

test("parseTime: m:ss, giây trần, và từ chối số giây vô lý", () => {
  assert.equal(C.parseTime("2:45"), 165);
  assert.equal(C.parseTime("02:45"), 165);
  assert.equal(C.parseTime("0:40"), 40);
  assert.equal(C.parseTime("165"), 165);
  assert.equal(C.parseTime("2:75"), null);
  assert.equal(C.parseTime(""), null);
  assert.equal(C.parseTime("abc"), null);
});

test("timeText: giây về m:ss, luôn hai chữ số", () => {
  assert.equal(C.timeText(165), "2:45");
  assert.equal(C.timeText(45), "0:45");
  assert.equal(C.timeText(600), "10:00");
  assert.equal(C.timeText(null), "");
});

test("dateText: ngày theo giờ máy, không qua UTC", () => {
  /* 23:50 giờ máy vẫn phải là ngày hôm đó — ghi muộn không được thành
     ngày mai chỉ vì máy chủ ở múi giờ khác. */
  assert.equal(C.dateText(new Date(2026, 10, 3, 23, 50)), "2026-11-03");
  assert.equal(C.dateText("2026-11-03"), "2026-11-03");
  assert.equal(C.dateText("2026-11-03T23:50:00Z"), "2026-11-03");
  assert.equal(C.dateText("3/11/2026"), "");
  assert.equal(C.dateText(""), "");
});

test("dateShort: bỏ năm nếu là năm nay", () => {
  const today = new Date(2026, 10, 3);
  assert.equal(C.dateShort("2026-11-03", today), "3/11");
  assert.equal(C.dateShort("2025-12-31", today), "31/12/2025");
  assert.equal(C.dateShort("", today), "");
});

test("bedLabel: bốn hình dạng bã của sách, lạ thì bỏ", () => {
  assert.equal(C.bedLabel("deu"), "Đều");
  assert.equal(C.bedLabel("ho"), "Có hố");
  assert.equal(C.bedLabel("mang-kho"), "Mảng khô");
  assert.equal(C.bedLabel("lan"), "Lẫn");
  assert.equal(C.bedLabel("khong-co"), "");
  assert.equal(C.bedLabel(null), "");
});

test("normalize: chuỗi từ form thành số, và cắt trục vị về 1–5", () => {
  const r = C.normalize({
    date: "2026-11-03",
    coffee: "  Ethiopia Guji  ",
    dose: "15",
    water: "250",
    temp: "93",
    daysOffRoast: "12",
    totalSec: "2:45",
    bed: "ho",
    axes: { sang: "4", day: 9, huong: 0, hau: "" },
    note: "  mơ, hoa nhài  ",
    khong_biet: "bỏ đi"
  });
  assert.equal(r.coffee, "Ethiopia Guji");
  assert.equal(r.dose, 15);
  assert.equal(r.water, 250);
  assert.equal(r.temp, 93);
  assert.equal(r.daysOffRoast, 12);
  assert.equal(r.totalSec, 165);
  assert.equal(r.bed, "ho");
  assert.deepEqual(r.axes, { sang: 4, day: 5, huong: 1, hau: null });
  assert.equal(r.note, "mơ, hoa nhài");
  assert.equal("khong_biet" in r, false, "trường lạ không được vào cơ sở dữ liệu");
});

test("normalize: bã lạ thì về rỗng, không đoán", () => {
  assert.equal(C.normalize({ bed: "gi-do" }).bed, "");
});

test("validate: chỉ chặn khi thiếu thứ không thể thiếu", () => {
  const ok = C.normalize({ date: "2026-11-03", dose: 15, water: 240 });
  assert.deepEqual(C.validate(ok), []);

  const missing = C.validate(C.normalize({ coffee: "chỉ có tên" }));
  assert.equal(missing.length, 3); /* ngày, cà, nước */

  const weird = C.validate(C.normalize({ date: "2026-11-03", dose: 15, water: 900 }));
  assert.match(weird[0], /Tỉ lệ/);

  const hot = C.validate(C.normalize({ date: "2026-11-03", dose: 15, water: 240, temp: 140 }));
  assert.match(hot[0], /Nhiệt độ/);
});

test("sortRecords: mới nhất trước, cùng ngày thì bản tạo sau trước", () => {
  const list = C.sortRecords([
    { date: "2026-11-01", createdAt: 10 },
    { date: "2026-11-03", createdAt: 20 },
    { date: "2026-11-03", createdAt: 30 }
  ]);
  assert.deepEqual(list.map((r) => r.createdAt), [30, 20, 10]);
  assert.deepEqual(C.sortRecords(null), []);
});

test("toCsv: một hàng một lần pha, thập phân dùng dấu chấm", () => {
  const csv = C.toCsv([
    C.normalize({
      date: "2026-11-03", coffee: "Guji", dose: 15, water: 250, temp: 93,
      bed: "deu", axes: { sang: 4, day: 3, huong: 5, hau: 2 }, note: "mơ"
    })
  ]);
  const lines = csv.trim().split("\r\n");
  assert.equal(lines.length, 2);
  assert.match(lines[0], /^Ngày,Cà,Ngày sau rang,Cà \(g\),Nước \(g\),Tỉ lệ/);
  assert.match(lines[1], /^2026-11-03,Guji,,15,250,16.7,93,/);
  assert.match(lines[1], /,Đều,4,3,5,2,mơ,,$/);
});

test("toCsv: ô có dấu phẩy, dấu nháy, xuống dòng đều được bọc", () => {
  assert.equal(C.csvCell('a,b'), '"a,b"');
  assert.equal(C.csvCell('nói "ngon"'), '"nói ""ngon"""');
  assert.equal(C.csvCell("dòng 1\ndòng 2"), '"dòng 1\ndòng 2"');
});

test("toCsv: ô bắt đầu bằng = không được thành công thức", () => {
  /* Mở CSV bằng Excel/LibreOffice: "=SUM(A1)" trong một ô ghi chú mà
     không chặn thì bảng tính chạy nó. */
  assert.equal(C.csvCell("=1+1"), "'=1+1");
  assert.equal(C.csvCell("@x"), "'@x");
  assert.equal(C.csvCell("-3"), "'-3");
  assert.equal(C.csvCell(15), "15");
  assert.equal(C.csvCell(null), "");
});

test("bản sao: đóng gói rồi đọc lại thì y nguyên", () => {
  const rec = C.normalize({
    id: "abc", date: "2026-11-03", coffee: "Guji", dose: 15, water: 250,
    bed: "ho", axes: { sang: 5 }, note: "hố ở giữa, fines ở đáy"
  });
  const html = C.buildBackup([rec], { exportedAt: "2026-11-03T10:00:00.000Z" });
  const back = C.readBackup(html);

  assert.equal(back.brews.length, 1);
  assert.equal(back.brews[0].coffee, "Guji");
  assert.equal(back.brews[0].dose, 15);
  assert.equal(back.brews[0].note, "hố ở giữa, fines ở đáy");
  assert.equal(back.brews[0].bed, "ho");
});

test("bản sao: ghi chú chứa </script> không làm vỡ tệp", () => {
  const rec = C.normalize({ date: "2026-11-03", dose: 15, water: 240, note: "thử </script> trong ghi chú" });
  const html = C.buildBackup([rec]);
  assert.equal(html.match(/<\/script>/g).length, 1, "chỉ được có đúng một thẻ đóng script");
  assert.equal(C.readBackup(html).brews[0].note, "thử </script> trong ghi chú");
});

test("readBackup: nhận cả mảng JSON trần, và từ chối tệp lạ", () => {
  const arr = C.readBackup(JSON.stringify([{ date: "2026-11-03", dose: 15, water: 240 }]));
  assert.equal(arr.brews.length, 1);

  assert.throws(() => C.readBackup("không phải json"), /JSON/);
  assert.throws(() => C.readBackup('{"a":1}'), /Không thấy danh sách/);
});

test("bản sao: ảnh data URL đi qua và về đúng kiểu chuỗi", () => {
  const rec = C.normalize({
    date: "2026-11-03", dose: 15, water: 240,
    photo: "data:image/jpeg;base64,AAAA"
  });
  const back = C.readBackup(C.buildBackup([rec]));
  assert.equal(typeof back.brews[0].photo, "string");
  assert.match(back.brews[0].photo, /^data:image\/jpeg;base64,/);
});

test("đồng bộ: syncedAt và photoUrl sống sót qua normalize", () => {
  /* Hai trường này quyết định bản ghi có được đẩy lại không, nên
     normalize không được nuốt chúng như trường lạ. */
  const r = C.normalize({
    date: "2026-11-03", dose: 15, water: 240,
    syncedAt: "1751600000000",
    photoUrl: "  https://drive.example/a.jpg  "
  });
  assert.equal(r.syncedAt, 1751600000000);
  assert.equal(r.photoUrl, "https://drive.example/a.jpg");

  assert.equal(C.normalize({}).syncedAt, 0, "bản ghi mới phải ở trạng thái chờ đẩy");
  assert.equal(C.normalize({ photoUrl: null }).photoUrl, "");
});

test("bước rót: normalize bỏ dòng dở, sắp theo thời gian, bỏ số vô lý", () => {
  const r = C.normalize({
    pours: [
      { t: "1:30", w: "250" },
      { t: "0:00", w: "30" },
      { t: "0:45" },            /* thiếu nước */
      { t: "0:50", w: 0 },      /* nước bằng 0 */
      { t: "", w: "90" },      /* thiếu giờ */
      { t: "0:45", w: "120" },
      "rác"
    ]
  });
  assert.deepEqual(r.pours, [{ t: 0, w: 30 }, { t: 45, w: 120 }, { t: 90, w: 250 }]);
});

test("bước rót: không bắt buộc, mặc định rỗng", () => {
  assert.deepEqual(C.normalize({ date: "2026-11-03", dose: 15, water: 240 }).pours, []);
  assert.deepEqual(C.normalize({ pours: "không phải mảng" }).pours, []);
  assert.deepEqual(C.normalize({ pours: [] }).pours, []);
});

test("bước rót: poursText gói thành một ô cho bảng tính", () => {
  assert.equal(C.poursText([{ t: 0, w: 30 }, { t: 45, w: 120 }]), "0:00/30 · 0:45/120");
  assert.equal(C.poursText([]), "");
  assert.equal(C.poursText(null), "");
});

test("bước rót: gõ phím số trên điện thoại cũng ra m:ss", () => {
  /* Bàn phím số không có phím ":", nên ô thời gian nhận toàn chữ số và tự
     chèn dấu hai chấm khi đã có phần phút. Hai chữ số trở xuống để nguyên,
     vì đệm "0:45" ngay giữa lúc gõ làm phím xoá nhảy số. */
  assert.equal(C.pourTimeDigits("4"), "4");
  assert.equal(C.pourTimeDigits("45"), "45");
  assert.equal(C.pourTimeDigits("100"), "1:00");
  assert.equal(C.pourTimeDigits("105"), "1:05");
  assert.equal(C.pourTimeDigits("130"), "1:30");
  assert.equal(C.pourTimeDigits("1300"), "13:00");
  assert.equal(C.pourTimeDigits("1:30"), "1:30");
  assert.equal(C.pourTimeDigits("0:45"), "0:45");
  assert.equal(C.pourTimeDigits(""), "");
  assert.equal(C.pourTimeDigits("abc"), "");

  /* Giây vượt 59 dồn lên phút — người dùng thấy số đã sửa, không thấy dòng
     biến mất khi lưu. */
  assert.equal(C.pourTimeDigits("199"), "2:39");
  assert.equal(C.parseTime(C.pourTimeDigits("199")), 159);

  /* Chặn ở mức mà parseTime còn đọc được (999:59). */
  assert.equal(C.pourTimeDigits("123456"), "123:45");

  /* Rời ô thì chuẩn hoá thành m:ss đầy đủ, và parseTime đọc đúng. */
  for (const typed of ["45", "130", "1300"]) {
    assert.equal(C.parseTime(C.timeText(C.parseTime(typed))), C.parseTime(typed));
  }
});

test("bước rót: pourIssues nhắc, không chặn", () => {
  assert.deepEqual(
    C.pourIssues(C.normalize({ water: 250, pours: [{ t: 0, w: 60 }, { t: 45, w: 150 }] })),
    []
  );
  const bad = C.pourIssues({ water: 250, pours: [{ t: 30, w: 300 }, { t: 30, w: 300 }] })
    .map(function (e) { return e.code; });
  assert.deepEqual(bad.sort(), ["pour.over", "pour.time", "pour.water"]);

  /* Bước sai vẫn được lưu: dòng gõ nhầm lúc tay ướt không được làm mất
     cả lần pha. */
  assert.equal(C.normalize({ water: 250, pours: [{ t: 30, w: 300 }] }).pours.length, 1);
});

test("bước rót: CSV có cột riêng ở cuối, một hàng một lần pha", () => {
  const csv = C.toCsv([
    C.normalize({
      date: "2026-11-03", dose: 15, water: 250,
      pours: [{ t: 0, w: 30 }, { t: 45, w: 120 }]
    })
  ]);
  const lines = csv.trim().split("\r\n");
  assert.match(lines[0], /,Các bước$/);
  assert.match(lines[1], /,0:00\/30 · 0:45\/120$/);
});

test("bước rót: bản sao giữ nguyên từng bước", () => {
  const rec = C.normalize({ date: "2026-11-03", dose: 15, water: 250, pours: [{ t: "0:45", w: "120" }] });
  const back = C.readBackup(C.buildBackup([rec]));
  assert.deepEqual(back.brews[0].pours, [{ t: 45, w: 120 }]);
});

test("validate: câu tiếng Việt khớp bộ mã, không lệch chữ", () => {
  const rec = C.normalize({ coffee: "chỉ tên" });
  const fromCodes = C.validateCodes(rec).map(function (e) {
    return C.VALIDATE_VI[e.code].replace("{ratio}", e.ratio || "");
  });
  assert.deepEqual(C.validate(rec), fromCodes);
  assert.equal(fromCodes.length, 3);
});

test("readBackup: lỗi có mã để dịch, câu vẫn là tiếng Việt", () => {
  assert.throws(() => C.readBackup("không phải json"), function (e) {
    return e.code === "backupJson" && /JSON/.test(e.message);
  });
  assert.throws(() => C.readBackup('{"a":1}'), function (e) {
    return e.code === "backupNoBrews";
  });
});

test("định danh: mã và tên người ghi đi qua normalize", () => {
  /* Hai trường này quyết định Sheet biết dòng nào của ai, nên không được
     bị coi là trường lạ mà bỏ. */
  const r = C.normalize({ date: "2026-11-03", ownerId: " bd13413f-ebef ", ownerName: " Nam " });
  assert.equal(r.ownerId, "bd13413f-ebef");
  assert.equal(r.ownerName, "Nam");

  /* Bản ghi cũ (trước khi có định danh) vẫn hợp lệ. */
  assert.equal(C.normalize({}).ownerId, "");
  assert.equal(C.normalize({}).ownerName, "");
});

test("định danh: ownerCode đủ ngắn để đọc, đủ khác để phân biệt", () => {
  assert.equal(C.ownerCode("bd13413f-ebef-4ae3-9d7d-194228fb0013"), "BD1341");
  assert.equal(C.ownerCode("a1b2c3"), "A1B2C3");
  assert.equal(C.ownerCode(""), "");
  assert.equal(C.ownerCode(null), "");
});
