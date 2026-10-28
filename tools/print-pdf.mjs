/**
 * Dựng PDF bản in bằng Chrome DevTools Protocol.
 *
 * Khác với `chrome --print-to-pdf`: script này mở trang, CHỜ Paged.js
 * phân trang xong (data-paged="done") rồi mới in. Không dùng
 * --virtual-time-budget vì Paged.js chạy requestAnimationFrame nên cờ đó
 * làm Chrome treo vô hạn.
 *
 *   node tools/print-pdf.mjs <url> <file.pdf> <chrome-path>
 */
import { spawn } from "node:child_process";
import { writeFileSync, mkdtempSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const [url, out, chromePath] = process.argv.slice(2);
if (!url || !out || !chromePath) {
  console.error("usage: print-pdf.mjs <url> <out.pdf> <chrome>");
  process.exit(2);
}

const PORT = 9333 + Math.floor(Math.random() * 200);
const userDataDir = mkdtempSync(join(tmpdir(), "brewing-bible-"));

const chrome = spawn(
  chromePath,
  [
    "--headless=new",
    "--disable-gpu",
    "--no-first-run",
    "--no-default-browser-check",
    "--disable-extensions",
    "--hide-scrollbars",
    `--user-data-dir=${userDataDir}`,
    `--remote-debugging-port=${PORT}`,
    "about:blank",
  ],
  { stdio: "ignore" }
);

let ws = null;

function cleanup(code) {
  try { ws && ws.close(); } catch {}
  try { chrome.kill("SIGKILL"); } catch {}
  try { rmSync(userDataDir, { recursive: true, force: true }); } catch {}
  process.exit(code);
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function getPageTarget() {
  for (let i = 0; i < 120; i++) {
    try {
      const res = await fetch(`http://127.0.0.1:${PORT}/json/list`);
      if (res.ok) {
        const list = await res.json();
        const page = list.find((t) => t.type === "page");
        if (page && page.webSocketDebuggerUrl) return page.webSocketDebuggerUrl;
      }
    } catch {}
    await sleep(150);
  }
  throw new Error("Chrome DevTools không sẵn sàng");
}

function connect(wsUrl) {
  return new Promise((resolve, reject) => {
    const socket = new WebSocket(wsUrl);
    let seq = 0;
    const pending = new Map();

    socket.onopen = () =>
      resolve({
        send(method, params = {}) {
          const id = ++seq;
          return new Promise((res, rej) => {
            pending.set(id, { res, rej });
            socket.send(JSON.stringify({ id, method, params }));
          });
        },
        close() { try { socket.close(); } catch {} },
      });

    socket.onerror = () => reject(new Error("không kết nối được DevTools"));

    socket.onmessage = (ev) => {
      let msg;
      try { msg = JSON.parse(ev.data); } catch { return; }
      if (msg.id && pending.has(msg.id)) {
        const { res, rej } = pending.get(msg.id);
        pending.delete(msg.id);
        msg.error ? rej(new Error(msg.error.message)) : res(msg.result);
      }
    };
  });
}

async function waitForPaged(client, timeoutMs = 90000) {
  const started = Date.now();
  while (Date.now() - started < timeoutMs) {
    try {
      const { result } = await client.send("Runtime.evaluate", {
        expression: 'document.documentElement.getAttribute("data-paged")',
        returnByValue: true,
      });
      const state = result && result.value;
      if (state === "done" || state === "error" || state === "none") return state;
    } catch {}
    await sleep(300);
  }
  return "timeout";
}

(async () => {
  try {
    const wsUrl = await getPageTarget();
    const client = await connect(wsUrl);
    ws = client;

    await client.send("Page.enable");
    await client.send("Runtime.enable");

    /* Một lần nạp có thể hỏng vì lý do ngoài nội dung: mạng reset giữa lúc
       nạp script, font chậm, Paged.js không chạy. Thay vì in một bản PDF
       thiếu rồi để người dùng phát hiện, nạp lại ngay trong cùng phiên
       Chrome — rẻ hơn nhiều so với chạy lại cả script từ đầu. */
    const MAX_ATTEMPTS = Number(process.env.PDF_ATTEMPTS || 3);
    const MIN_PAGES = Number(process.env.PDF_MIN_PAGES || 100);

    async function loadAndMeasure(attempt) {
      /* thêm tham số để Chrome không dùng lại bản đã cache */
      const bust = url + (url.includes("?") ? "&" : "?") + "build=" + Date.now() + "-" + attempt;
      await client.send("Page.navigate", { url: bust });
      await sleep(700);

      const state = await waitForPaged(client);

      await client.send("Runtime.evaluate", {
        expression: "document.fonts ? document.fonts.ready.then(()=>true) : true",
        awaitPromise: true,
      });
      await sleep(500);

      const diagnostic = await client.send("Runtime.evaluate", {
        expression: `JSON.stringify({
          href: location.href,
          ready: document.readyState,
          parts: typeof window.BOOK_PARTS === 'object' ? window.BOOK_PARTS.length : -1,
          partsExpected: Number(document.documentElement.getAttribute('data-parts-expected')) || -1,
          pagedLib: typeof window.PagedPolyfill,
          pagedAttr: document.documentElement.getAttribute('data-paged'),
          pageBoxes: document.querySelectorAll('.pagedjs_page').length,
          bookChildren: document.getElementById('book') ? document.getElementById('book').children.length : -1
        })`,
        returnByValue: true,
      });
      const info = JSON.parse(diagnostic.result.value);
      if (process.env.DEBUG) console.error(`DEBUG lần ${attempt}`, info);
      return { state, info };
    }

    let good = null;
    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
      const r = await loadAndMeasure(attempt);
      const expected = r.info.partsExpected > 0 ? r.info.partsExpected : r.info.parts;
      const ok = r.state === "done" && r.info.pageBoxes >= MIN_PAGES && r.info.parts === expected;
      if (ok) { good = r; break; }
      console.error(
        `Lần ${attempt}/${MAX_ATTEMPTS}: ${r.state || "?"}, ${r.info.pageBoxes} trang, ` +
        `${r.info.parts}/${expected} phần — nạp lại.`
      );
    }

    if (!good) {
      console.error(`Không ra bản in ổn định sau ${MAX_ATTEMPTS} lần. Chạy lại ./build-pdf.sh.`);
      cleanup(1);
    }

    const info = good.info;
    const pages = info.pageBoxes;

    /* DEBUG_PAGE=n → in HTML của trang n ra stderr */
    if (process.env.DEBUG_PAGE) {
      const dump = await client.send("Runtime.evaluate", {
        expression: `(() => {
          const p = document.querySelector('.pagedjs_page[data-page-number="${process.env.DEBUG_PAGE}"]');
          if (!p) return 'PAGE NOT FOUND';
          const c = p.querySelector('.pagedjs_page_content');
          const r = c ? c.getBoundingClientRect() : null;
          return JSON.stringify({
            page: p.getBoundingClientRect().toJSON(),
            content: r && r.toJSON(),
            contentStyle: c && (getComputedStyle(c).overflow + '/' + getComputedStyle(c).height),
            html: (c ? c.innerHTML : p.innerHTML).replace(/\\s+/g, ' ').slice(0, 600)
          });
        })()`,
        returnByValue: true,
      });
      console.error("PAGE", dump.result.value);
    }

    /* tuỳ chọn: chụp một trang ra PNG để kiểm tra bằng mắt
       SHOT_PAGE=2 SHOT_OUT=/tmp/p2.png */
    for (const n of (process.env.SHOT_PAGE || "").split(",").filter(Boolean)) {
      /* Cuộn trang vào khung nhìn (ép Chrome vẽ nó) rồi chụp bằng toạ độ
         tài liệu. Không dùng Emulation.setDeviceMetricsOverride: đổi khung
         nhìn giữa chừng làm Chrome không vẽ lại kịp, ảnh ra trắng. */
      const rect = await client.send("Runtime.evaluate", {
        expression: `(() => {
          const p = document.querySelector('.pagedjs_page[data-page-number="${n}"]');
          if (!p) return null;
          p.scrollIntoView({ block: 'start' });
          const r = p.getBoundingClientRect();
          return JSON.stringify({
            x: Math.round(r.x + scrollX), y: Math.round(r.y + scrollY),
            w: Math.round(r.width), h: Math.round(r.height)
          });
        })()`,
        returnByValue: true,
      });
      if (rect.result.value) {
        const b = JSON.parse(rect.result.value);
        await sleep(350);
        const shot = await client.send("Page.captureScreenshot", {
          format: "png",
          captureBeyondViewport: true,
          clip: { x: b.x, y: b.y, width: b.w, height: b.h, scale: 1.6 },
        });
        const dest = (process.env.SHOT_OUT || "page.png").replace(/\.[a-z]+$/i, `-${n}.png`);
        writeFileSync(dest, Buffer.from(shot.data, "base64"));
        console.log(`SHOT p${n} -> ${dest}`);
      } else {
        console.error(`Không tìm thấy trang ${n}`);
      }
    }

    const pdf = await client.send("Page.printToPDF", {
      printBackground: true,
      preferCSSPageSize: true,
      paperWidth: 5.8268,
      paperHeight: 8.2677,
      marginTop: 0,
      marginBottom: 0,
      marginLeft: 0,
      marginRight: 0,
      scale: 1,
      displayHeaderFooter: false,
    });

    writeFileSync(out, Buffer.from(pdf.data, "base64"));
    console.log(`PAGED=${pages}  PARTS=${info.parts}  STATE=${info.pagedAttr}`);
    cleanup(0);
  } catch (err) {
    console.error("Lỗi:", err.message);
    cleanup(1);
  }
})();
