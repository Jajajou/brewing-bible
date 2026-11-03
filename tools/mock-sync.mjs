/**
 * Máy nhận giả để kiểm phần đồng bộ mà không cần tài khoản Google.
 *
 *   node tools/mock-sync.mjs          # lắng nghe ở 127.0.0.1:8790
 *   node tools/mock-sync.mjs 9000     # cổng khác
 *
 * Trong journal.html, dán URL `http://127.0.0.1:8790/exec` và token
 * `test-token`. Nó trả lời đúng hình dạng của Code.gs: `ok`, `row`,
 * `photoUrl`, và `error` khi token sai — đủ để thấy đường thành công và
 * đường hỏng, kể cả lúc đẩy lại sau khi sửa (phải cùng một `row`).
 *
 * Không phải một phần của trang: chỉ dùng khi sửa phần đồng bộ.
 */
import http from "node:http";

const PORT = Number(process.argv[2] || 8790);
const TOKEN = "test-token";
const HEADER = ["id", "Ngày", "Cà", "…", "Ảnh", "Cập nhật", "Mã nhật ký", "Người ghi"];

/** id → số dòng, giống Sheet thật */
const rows = new Map();
const photos = new Map();

function send(res, obj, status) {
  const body = JSON.stringify(obj);
  res.writeHead(status || 200, {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Content-Length": Buffer.byteLength(body)
  });
  res.end(body);
}

const server = http.createServer((req, res) => {
  /* Preflight: Code.gs thật không trả lời OPTIONS, nên trang gửi
     text/plain để khỏi preflight. Nhưng vẫn đáp cho đúng. */
  if (req.method === "OPTIONS") {
    res.writeHead(204, {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Headers": "content-type",
      "Access-Control-Allow-Methods": "POST, GET, OPTIONS"
    });
    res.end();
    return;
  }
  if (req.method === "GET") {
    send(res, { ok: true, pong: true, sheet: "Nhật ký pha (giả)" });
    return;
  }

  let body = "";
  req.on("data", (c) => { body += c; });
  req.on("end", () => {
    let data;
    try {
      data = JSON.parse(body || "{}");
    } catch {
      send(res, { ok: false, error: "Body không phải JSON." });
      return;
    }
    if (data.token !== TOKEN) {
      console.log(`✗ sai token (${String(data.token).slice(0, 6)}…)`);
      send(res, { ok: false, error: "Sai token." });
      return;
    }
    if (data.kind === "ping") {
      console.log("✓ ping");
      send(res, { ok: true, pong: true, sheet: "Nhật ký pha (giả)" });
      return;
    }
    if (data.kind !== "brew" || !data.brew || !data.brew.id) {
      send(res, { ok: false, error: "Thiếu kind hoặc brew.id." });
      return;
    }

    const b = data.brew;
    const known = rows.get(b.id);
    const row = known || rows.size + 2;
    rows.set(b.id, row);

    let photoUrl = photos.get(b.id) || "";
    if (b.photoBase64) {
      photoUrl = `https://drive.example/nhat-ky/${b.id}.jpg`;
      photos.set(b.id, photoUrl);
    }

    console.log(
      `${known ? "~ cập nhật" : "+ thêm mới"} dòng ${row} · ${b.date} · ${b.coffee} · ` +
      `1:${b.ratio} · bã ${b.bed} · ${b.axes ? [b.axes.sang, b.axes.day, b.axes.huong, b.axes.hau].join("/") : "—"}` +
      ` · chủ ${b.ownerName || "(không tên)"}/${String(b.ownerId || "-").slice(0, 6)}` +
      (b.photoBase64 ? ` · ảnh ${Math.round(b.photoBase64.length / 1024)} KB` : " · (không gửi ảnh)")
    );

    send(res, { ok: true, row, photoUrl, header: HEADER.length });
  });
});

server.listen(PORT, "127.0.0.1", () => {
  console.log(`Máy nhận giả: http://127.0.0.1:${PORT}/exec · token "${TOKEN}"`);
});
