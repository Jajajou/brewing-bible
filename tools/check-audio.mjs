#!/usr/bin/env node
/* tools/check-audio.mjs — đọc lại chính file audio, đối chiếu với text nguồn.

   node tools/check-audio.mjs                      mọi file trong manifest
   node tools/check-audio.mjs --only ch-chiet-xuat
   node tools/check-audio.mjs --voice male --min 0.85

   Triết lý lấy từ tools/check-pdf.mjs: không tin log của bước sinh. Bước
   sinh nói "xong" nghĩa là nó đã ghi file, không có nghĩa là file đọc đúng.
   Ở đây cho ASR (faster-whisper) nghe lại rồi so từng từ với text đã đưa
   vào TTS.

   Đọc kết quả thế nào — quan trọng, đừng đọc con số mà không đọc phần chú ý:

   - Lệch ~10% là bình thường. Phần lớn là ASR viết lại khác: hoà/hòa,
     bốn/4, "ti-đi-ét"/TDS. TTS đọc đúng, ASR chỉ chuẩn hoá về dạng gốc.
   - Lỗi thật là khi ASR nghe ra từ khác nghĩa: "1:16" → "một giờ mười sáu",
     "EY" → "AI".
   - ASR cũng sai. "fines" → "Finch" có thể là ASR không biết từ. Nghi ngờ
     thì phải nghe bằng tai.

   Vì vậy ngưỡng mặc định là 0.80 chứ không phải 1.0, và công cụ in ra các
   chỗ lệch để người đọc tự phán — nó không tự sửa gì. */

import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import { ROOT, loadChapters, chapterAudio } from "./book-content.mjs";

const root = fileURLToPath(ROOT);
const MANIFEST = path.join(root, "audio", "manifest.json");
const TMP = path.join(root, "audio", ".check");
const CACHE = path.join(root, "audio", ".check-cache.json");
const ASR = path.join(root, "tools", "asr-worker.py");
const PYTHON = process.env.VIENEU_PYTHON || process.env.HOME + "/vieneu/.venv/bin/python";

const args = process.argv.slice(2);
const flag = (name) => args.includes("--" + name);
const opt = (name) => {
  const i = args.indexOf("--" + name);
  return i < 0 ? null : args[i + 1];
};
const only = (opt("only") || "").split(",").map((s) => s.trim()).filter(Boolean);
const voices = (opt("voice") || "male,female").split(",").map((s) => s.trim()).filter(Boolean);
const min = Number(opt("min") || 0.8);
const recheck = flag("recheck");

/* ---------- cổng hash ---------- */

/* Nghe lại cả sách mất ~2 giờ (6,6 giờ audio, ASR RTF 0,30). Vòng sửa
   thường chỉ đụng vài file, nên nhớ kết quả theo hash của file audio: file
   nào chưa sinh lại thì dùng lại kết quả cũ. Cùng khuôn với cổng hash của
   build-audio.mjs và .refs-cache.json.

   Hash lấy từ manifest (hash của text + giọng + định dạng) cộng kích thước
   file: sinh lại cùng một text cho ra audio khác — model không tất định —
   nên phải phân biệt được hai lần sinh của cùng một chương. */
function readCache() {
  try {
    return JSON.parse(fs.readFileSync(CACHE, "utf8"));
  } catch (e) {
    return { asr: {} };
  }
}

function writeCache(c) {
  fs.writeFileSync(CACHE, JSON.stringify(c, null, 2) + "\n");
}

/* ---------- so từ ---------- */

/* Bỏ dấu để so: ASR hay viết "hoà" thành "hòa", "cà phê" thành "cafe" —
   khác dấu nhưng cùng một từ đọc ra. Giữ nguyên dấu thì mọi câu đều báo
   lệch và báo cáo thành vô dụng. */
function fold(s) {
  return s
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "d")
    .toLowerCase();
}

function words(s) {
  return s
    .replace(/[.,;:!?…"“”'‘’()\[\]–—]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

/* LCS ở mức từ. Chương dài nhất ~1.600 từ nên bảng DP 1.600² là 2,5 triệu ô
   — chạy trong vài chục ms, không cần thuật toán thông minh hơn. */
function diff(a, b) {
  const n = a.length;
  const m = b.length;
  const w = m + 1;
  const dp = new Uint32Array((n + 1) * w);
  for (let i = n - 1; i >= 0; i--) {
    for (let j = m - 1; j >= 0; j--) {
      dp[i * w + j] =
        a[i].f === b[j].f
          ? dp[(i + 1) * w + j + 1] + 1
          : Math.max(dp[(i + 1) * w + j], dp[i * w + j + 1]);
    }
  }

  const ops = [];
  let i = 0;
  let j = 0;
  while (i < n && j < m) {
    if (a[i].f === b[j].f) {
      ops.push({ op: "=", a: a[i].w, b: b[j].w });
      i++;
      j++;
    } else if (dp[(i + 1) * w + j] >= dp[i * w + j + 1]) {
      ops.push({ op: "-", a: a[i].w });
      i++;
    } else {
      ops.push({ op: "+", b: b[j].w });
      j++;
    }
  }
  while (i < n) ops.push({ op: "-", a: a[i++].w });
  while (j < m) ops.push({ op: "+", b: b[j++].w });
  return ops;
}

function hunks(ops, context = 5) {
  const out = [];
  for (let i = 0; i < ops.length; i++) {
    if (ops[i].op === "=") continue;
    let end = i;
    while (end < ops.length && ops[end].op !== "=") end++;
    const gapStart = Math.max(0, i - context);
    const gapEnd = Math.min(ops.length, end + context);
    out.push({
      before: ops.slice(gapStart, i).filter((o) => o.op === "=").map((o) => o.a).join(" "),
      lost: ops.slice(i, end).filter((o) => o.op === "-").map((o) => o.a).join(" "),
      heard: ops.slice(i, end).filter((o) => o.op === "+").map((o) => o.b).join(" "),
      after: ops.slice(end, gapEnd).filter((o) => o.op === "=").map((o) => o.a).join(" "),
    });
    i = end;
  }
  return out;
}

function truncate(s, n = 90) {
  return s.length <= n ? s : s.slice(0, n - 1) + "…";
}

/* Máy tự thêm chữ. Loại lỗi này KHÔNG bị tỉ lệ khớp bắt: một câu 9 từ
   thêm vào cuối chương chỉ làm tỉ lệ rớt chưa đến 1 %, trong khi tai người
   nghe ra ngay. Đo thật 30.10.2026: chương 7 giọng nam đọc thêm "Hãy đăng
   ký kênh để xem những video tiếp theo" ở phút 1:54, giọng nữ lặp "hai
   mươi hai" thành "18-20-22" ở phút 1:23 — cả hai đều trên ngưỡng 80 %.

   Vì vậy: một đoạn ĐỨNG MỘT MÌNH (không có từ nào khớp nguồn) mà dài từ
   MIN_INSERT từ trở lên là lỗi cứng. Ngưỡng 5 vì ASR hay chèn từ đệm
   ("à", "thì", "nhé") vài từ khi nghe câu dồn dập — chặn ở 3 là báo nhầm. */
const MIN_INSERT = 5;

function invented(ops) {
  const out = [];
  for (let i = 0; i < ops.length; i++) {
    if (ops[i].op === "=") continue;
    let end = i;
    while (end < ops.length && ops[end].op !== "=") end++;
    const run = ops.slice(i, end);
    const added = run.filter((o) => o.op === "+");
    const lost = run.filter((o) => o.op === "-");
    if (!lost.length && added.length >= MIN_INSERT) {
      const before = ops.slice(Math.max(0, i - 5), i).map((o) => o.a).join(" ");
      out.push({ before, added: added.map((o) => o.b).join(" ") });
    }
    i = end;
  }
  return out;
}

/* ---------- chạy ---------- */

if (!fs.existsSync(MANIFEST)) {
  console.error("Chưa có audio/manifest.json. Chạy tools/build-audio.mjs trước.");
  process.exit(1);
}
if (!fs.existsSync(PYTHON)) {
  console.error("Không thấy Python của VieNeu: " + PYTHON);
  process.exit(1);
}

const manifest = JSON.parse(fs.readFileSync(MANIFEST, "utf8"));
const chapters = loadChapters();
const byId = Object.fromEntries(chapters.map((c) => [c.id, c]));
const ids = Object.keys(manifest.chapters).filter((id) => !only.length || only.includes(id));

fs.mkdirSync(TMP, { recursive: true });
const cache = readCache();
let worst = 1;
let checked = 0;
let inventedRuns = 0;

for (const id of ids) {
  const ch = byId[id];
  if (!ch) continue;

  const expected = words(chapterAudio(ch).text);
  const expectFold = expected.map((w) => ({ w, f: fold(w) }));

  for (const voice of voices) {
    const entry = manifest.chapters[id][voice];
    if (!entry || !entry.file) continue;

    const opus = path.join(root, entry.file);
    if (!fs.existsSync(opus)) {
      console.error(`${id} · ${voice}: manifest có nhưng file không có (${entry.file})`);
      continue;
    }

    /* Khoá cache: hash của job sinh ra file này, cộng số byte thật. Model
       không tất định, nên hai lần sinh cùng một text cho hai file khác
       nhau — số byte tách được chúng. */
    const key = `${id}·${voice}·${entry.hash}·${entry.bytes}`;
    const cached = !recheck && cache.asr[key];

    let heard;
    if (cached) {
      heard = words(cached);
      process.stdout.write(`${id} · ${voice} · (đã nghe) … `);
    } else {
      const wav = path.join(TMP, `${id}-${voice}-16k.wav`);
      process.stdout.write(`${id} · ${voice} · nghe lại … `);

      const dec = spawnSync("ffmpeg", ["-nostdin", "-y", "-loglevel", "error", "-i", opus, "-ar", "16000", "-ac", "1", wav], {
        encoding: "utf8",
      });
      if (dec.status !== 0) {
        console.error("\nffmpeg lỗi:\n" + dec.stderr);
        process.exit(1);
      }

      const run = spawnSync(PYTHON, [ASR, wav], { encoding: "utf8", maxBuffer: 64 * 1024 * 1024 });
      fs.rmSync(wav, { force: true });
      if (run.status !== 0) {
        console.error("\nASR lỗi:\n" + (run.stderr || run.stdout));
        process.exit(1);
      }
      const text = JSON.parse(run.stdout.trim().split("\n").pop()).text;
      cache.asr[key] = text;
      writeCache(cache);
      heard = words(text);
    }

    const ops = diff(expectFold, heard.map((w) => ({ w, f: fold(w) })));
    const matched = ops.filter((o) => o.op === "=").length;
    const score = expected.length ? matched / expected.length : 1;
    worst = Math.min(worst, score);

    const pct = (score * 100).toFixed(1).replace(".", ",");
    console.log(`khớp ${pct} % (${matched}/${expected.length} từ)`);

    /* Chỉ in những chỗ *mất* chữ, tức là chỗ máy đọc sai hoặc bỏ — chỗ ASR
       thêm chữ vào thường là do nó nghe ra từ đệm, ít quan trọng hơn. */
    const extra = invented(ops);
    if (extra.length) {
      for (const e of extra) {
        console.log(`   ⚠ máy TỰ THÊM: …${truncate(e.before, 40)} [${truncate(e.added, 90)}]`);
      }
      inventedRuns += extra.length;
    }

    const bad = hunks(ops).filter((h) => h.lost);
    if (bad.length) {
      for (const h of bad.slice(0, 8)) {
        console.log(`   …${truncate(h.before, 45)} [${truncate(h.lost, 70)}] nghe thành [${truncate(h.heard, 70)}] ${truncate(h.after, 30)}…`);
      }
      if (bad.length > 8) console.log(`   … và ${bad.length - 8} chỗ nữa`);
    }
    checked++;
  }
}

try {
  fs.rmdirSync(TMP);
} catch (e) {}

if (!checked) {
  console.log("Không có file nào để kiểm.");
  process.exit(0);
}

const worstPct = (worst * 100).toFixed(1).replace(".", ",");
console.log(`\n${checked} file · khớp thấp nhất ${worstPct} % · ngưỡng ${Math.round(min * 100)} %`);
if (inventedRuns) {
  console.log(`${inventedRuns} chỗ máy tự thêm chữ — sinh lại đúng file đó, đừng nới ngưỡng.`);
  process.exit(1);
}
if (worst < min) {
  console.log("Dưới ngưỡng. Đọc các chỗ lệch ở trên: lỗi thật thì sửa từ điển trong audio-text.mjs.");
  process.exit(1);
}
console.log("Trên ngưỡng. Nhớ: trên ngưỡng không có nghĩa là đã nghe bằng tai.");
