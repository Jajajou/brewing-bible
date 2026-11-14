/**
 * Server tĩnh tối giản cho bộ dựng PDF.
 *
 * Vì sao không dùng `python3 -m http.server`: nó trả lời HTTP/1.0 và đóng
 * kết nối sau mỗi request. Với 12 file script/CSS nạp song song, Chrome
 * thỉnh thoảng nhận ERR_CONNECTION_RESET — file nào rơi vào lượt đó thì
 * không chạy, và nếu nạn nhân là print.js thì cả trang in ra 0 trang dù
 * không có lỗi nào trong nội dung. Server này giữ kết nối, khai Content-Length
 * và không tự đóng giữa chừng.
 *
 *   node tools/serve.mjs <thư mục gốc> <cổng>
 */
import http from "node:http";
import { createReadStream, statSync } from "node:fs";
import { extname, join, normalize, resolve, sep } from "node:path";

const ROOT = resolve(process.argv[2] || ".");
const PORT = Number(process.argv[3] || 8138);

const TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".woff2": "font/woff2",
  ".pdf": "application/pdf",
  ".epub": "application/epub+zip",
  /* Opus trong Ogg. Không khai thì Chrome vẫn thường phát được, nhưng
     Safari thì không — và "thường" không đủ để kiểm bản nghe. */
  ".opus": "audio/ogg",
  ".txt": "text/plain; charset=utf-8",
};

function fail(res, code, msg) {
  const body = Buffer.from(msg, "utf8");
  res.writeHead(code, {
    "content-type": "text/plain; charset=utf-8",
    "content-length": body.length,
    "cache-control": "no-store",
  });
  res.end(body);
}

const server = http.createServer((req, res) => {
  if (req.method !== "GET" && req.method !== "HEAD") {
    return fail(res, 405, "chỉ GET/HEAD");
  }

  let path;
  try {
    path = decodeURIComponent((req.url || "/").split("?")[0]);
  } catch {
    return fail(res, 400, "URL hỏng");
  }

  let file = normalize(join(ROOT, path));
  if (file !== ROOT && !file.startsWith(ROOT + sep)) return fail(res, 403, "ngoài thư mục");

  let st;
  try {
    st = statSync(file);
    if (st.isDirectory()) {
      file = join(file, "index.html");
      st = statSync(file);
    }
  } catch {
    return fail(res, 404, "không thấy " + path);
  }

  const type = TYPES[extname(file).toLowerCase()] || "application/octet-stream";

  /* Range: cần cho thẻ <audio>. Không có 206 thì Chrome không đọc được
     trang cuối của file Ogg nên báo duration = Infinity, và thanh nghe
     hiện "0:00 / Infinity:NaN". GitHub Pages có sẵn Range — server dev
     phải giống nó, nếu không thì kiểm tra ở đây chẳng nói gì về bản thật. */
  const range = /^bytes=(\d*)-(\d*)$/.exec((req.headers.range || "").trim());
  let start = 0;
  let end = st.size - 1;
  let code = 200;
  const headers = {
    "content-type": type,
    "cache-control": "no-store",
    "connection": "keep-alive",
    "accept-ranges": "bytes",
  };

  if (range && (range[1] || range[2])) {
    start = range[1] ? Number(range[1]) : st.size - Number(range[2]);
    end = range[1] && range[2] ? Math.min(Number(range[2]), st.size - 1) : end;
    if (!Number.isFinite(start) || !Number.isFinite(end) || start > end || start < 0) {
      res.writeHead(416, { "content-range": `bytes */${st.size}` });
      return res.end();
    }
    code = 206;
    headers["content-range"] = `bytes ${start}-${end}/${st.size}`;
  }

  headers["content-length"] = end - start + 1;
  res.writeHead(code, headers);

  if (req.method === "HEAD") return res.end();

  const stream = createReadStream(file, { start, end });
  stream.on("error", () => res.destroy());
  res.on("close", () => stream.destroy());
  stream.pipe(res);
});

/* Mặc định của Node là 5 s và 60 s; nới ra để Chrome không bị cắt giữa
   lúc Paged.js còn đang đọc file. */
server.keepAliveTimeout = 30000;
server.headersTimeout = 35000;
server.requestTimeout = 0;

server.on("error", (e) => {
  console.error("server:", e.message);
  process.exit(1);
});

for (const sig of ["SIGTERM", "SIGINT"]) {
  process.on(sig, () => {
    server.close(() => process.exit(0));
    setTimeout(() => process.exit(0), 500).unref();
  });
}

server.listen(PORT, "127.0.0.1", () => {
  console.log(`serving ${ROOT} on http://127.0.0.1:${PORT}`);
});
