#!/usr/bin/env node
/* tools/build-audio.mjs — sinh bản nghe cho The Brewing Bible.

   node tools/build-audio.mjs                     cả sách, cả hai giọng
   node tools/build-audio.mjs --only ch-chiet-xuat hai giọng, một chương
   node tools/build-audio.mjs --voice female      một giọng
   node tools/build-audio.mjs --dry               chỉ in ra sẽ đọc gì
   node tools/build-audio.mjs --force             bỏ qua cổng hash

   Đầu ra:
     audio/vi/<male|female>/<ch-id>.opus    một file mỗi chương mỗi giọng
     audio/manifest.json                    hash + số byte + số giây từng file

   Cổng hash là phần quan trọng nhất. Audio cả sách là ~43 MB mỗi giọng;
   sửa một lỗi chính tả trong một chương không được phép ghi lại 34 file.
   Hash tính trên *text đã chuẩn hoá* + giọng + định dạng, nên chạy lại chỉ
   sinh đúng chương có chữ đổi. Cùng khuôn với .refs-cache.json của
   tools/check-refs.mjs.

   Vì sao Opus 24 kbps: mono, giọng nói, ~1,3 MB một chương (VOICE.md dùng
   con số này để tính 43 MB một giọng). WAV 48 kHz của TTS là ~23 MB/phút —
   không thể đưa lên web. */

import fs from "node:fs";
import path from "node:path";
import crypto from "node:crypto";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

import { ROOT, loadChapters, chapterAudio } from "./book-content.mjs";

const root = fileURLToPath(ROOT);
const AUDIO = path.join(root, "audio");
const MANIFEST = path.join(AUDIO, "manifest.json");
const TMP = path.join(AUDIO, ".tmp");

/* Giọng đã chốt sau khi nghe thử 8 giọng (HANDOFF-AUDIO.md 1). Tên phải
   đúng nguyên văn tiếng Việt có dấu — đó là khoá tra trong preset. */
const VOICES = { male: "Thiền Tâm Đức", female: "Mai Anh" };
const QUOTE_VOICE = "Thiện Minh";

/* Câu đúc kết cần 1,1 s hai bên; model chỉ có ba mức cố định và mức dài
   nhất là 0,70 s cho ngắt đoạn. Chèn tay (HANDOFF-AUDIO.md 3.3). */
const GAP_QUOTE = 1.1;
const GAP_PARA = 0.7;

const BITRATE = "24k";
const WORKER = path.join(root, "tools", "tts-worker.py");
const PYTHON = process.env.VIENEU_PYTHON || process.env.HOME + "/vieneu/.venv/bin/python";

/* ---------- tham số ---------- */

const args = process.argv.slice(2);
const flag = (name) => args.includes("--" + name);
const opt = (name) => {
  const i = args.indexOf("--" + name);
  return i < 0 ? null : args[i + 1];
};

const dry = flag("dry");
const force = flag("force");
const only = (opt("only") || "")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);
const wanted = (opt("voice") || "male,female")
  .split(",")
  .map((s) => s.trim())
  .filter(Boolean);

for (const v of wanted) {
  if (!VOICES[v]) throw new Error(`Giọng không có: ${v}. Chọn male hoặc female.`);
}

/* ---------- chuẩn bị ---------- */

function segmentsFor(ch, voiceId) {
  const { segments } = chapterAudio(ch);
  return segments.map((s, i, all) => {
    const next = all[i + 1];
    const gapAfter = !next ? 0 : s.kind === "pull" || next.kind === "pull" ? GAP_QUOTE : GAP_PARA;
    return {
      voice: s.kind === "pull" ? QUOTE_VOICE : VOICES[voiceId],
      text: s.text,
      gapAfter,
    };
  });
}

/* Hash phủ đúng những thứ làm audio khác đi: chữ, giọng, khoảng lặng,
   định dạng. Đổi voice list hay bitrate cũng phải sinh lại — nếu không,
   manifest cũ nói dối về file đang có. */
function jobHash(voiceId, segments) {
  return crypto
    .createHash("sha256")
    .update(JSON.stringify({ voiceId, body: VOICES[voiceId], quote: QUOTE_VOICE, gapQuote: GAP_QUOTE, bitrate: BITRATE, segments }))
    .digest("hex")
    .slice(0, 16);
}

function readManifest() {
  try {
    return JSON.parse(fs.readFileSync(MANIFEST, "utf8"));
  } catch (e) {
    return { voices: { ...VOICES, quote: QUOTE_VOICE }, format: { codec: "opus", bitrate: BITRATE, sampleRate: 48000 }, chapters: {} };
  }
}

function writeManifest(m) {
  m.updated = new Date().toISOString();
  fs.mkdirSync(AUDIO, { recursive: true });
  fs.writeFileSync(MANIFEST, JSON.stringify(m, null, 2) + "\n");
}

function need(bin, hint) {
  const r = spawnSync(bin, ["-version"], { encoding: "utf8" });
  if (r.error) throw new Error(`Không chạy được ${bin}.\n${hint}`);
}

function mmss(sec) {
  const s = Math.round(sec);
  return Math.floor(s / 60) + ":" + String(s % 60).padStart(2, "0");
}

/* ---------- chạy ---------- */

const chapters = loadChapters();
const picked = only.length ? chapters.filter((c) => only.includes(c.id)) : chapters;

if (only.length) {
  const missing = only.filter((id) => !chapters.some((c) => c.id === id));
  if (missing.length) throw new Error("Không có chương: " + missing.join(", "));
}

if (dry) {
  let chars = 0;
  for (const ch of picked) {
    const { segments, skipped } = chapterAudio(ch);
    const n = segments.reduce((a, s) => a + s.text.length, 0);
    chars += n;
    const pulls = segments.filter((s) => s.kind === "pull").length;
    console.log(
      `${ch.id.padEnd(26)} ${String(n).padStart(6)} ký tự · ${segments.length} segment` +
        (pulls ? ` · ${pulls} đúc kết` : "") +
        (skipped.length ? ` · bỏ ${skipped.join(",")}` : "")
    );
  }
  /* 191.000 ký tự → ~4,5 giờ audio, RTF 0,35–0,45 (HANDOFF-AUDIO.md 1) */
  console.log(`\nTổng: ${chars} ký tự · ~${(chars / 42000).toFixed(1)} giờ audio mỗi giọng · ~${(chars / 42000 / 3).toFixed(1)} giờ máy`);
  process.exit(0);
}

need("ffmpeg", "Cài ffmpeg: brew install ffmpeg");
if (!fs.existsSync(PYTHON)) {
  throw new Error(
    `Không thấy Python của VieNeu: ${PYTHON}\n` +
      "Dựng lại môi trường (HANDOFF-AUDIO.md 3.1):\n" +
      "  uv venv --python 3.12 .venv\n" +
      "  uv pip install --python .venv/bin/python vieneu 'transformers==4.57.6'\n" +
      "rồi trỏ VIENEU_PYTHON vào .venv/bin/python của môi trường đó."
  );
}

fs.mkdirSync(TMP, { recursive: true });
const manifest = readManifest();
const t0 = Date.now();
let made = 0;
let skipped = 0;

for (const ch of picked) {
  for (const voiceId of wanted) {
    const segments = segmentsFor(ch, voiceId);
    if (!segments.length) {
      console.log(`${ch.id} · ${voiceId} · không có text, bỏ qua`);
      continue;
    }

    const hash = jobHash(voiceId, segments);
    const rel = `audio/vi/${voiceId}/${ch.id}.opus`;
    const out = path.join(root, rel);
    const entry = (manifest.chapters[ch.id] = manifest.chapters[ch.id] || {});

    if (!force && entry[voiceId] && entry[voiceId].hash === hash && fs.existsSync(out)) {
      skipped++;
      continue;
    }

    const jobPath = path.join(TMP, `${ch.id}-${voiceId}.json`);
    const wavPath = path.join(TMP, `${ch.id}-${voiceId}.wav`);
    fs.writeFileSync(jobPath, JSON.stringify({ segments }));

    const chars = segments.reduce((a, s) => a + s.text.length, 0);
    process.stdout.write(`${ch.id} · ${voiceId} · ${chars} ký tự … `);

    const jobs = Date.now();
    const run = spawnSync(PYTHON, [WORKER, jobPath, wavPath], { encoding: "utf8", maxBuffer: 32 * 1024 * 1024 });
    if (run.status !== 0) {
      console.error("\n" + (run.stderr || run.stdout || "TTS lỗi, không rõ nguyên nhân"));
      process.exit(1);
    }
    const info = JSON.parse(run.stdout.trim().split("\n").pop());

    fs.mkdirSync(path.dirname(out), { recursive: true });
    const enc = spawnSync(
      "ffmpeg",
      ["-nostdin", "-y", "-loglevel", "error", "-i", wavPath, "-ac", "1", "-c:a", "libopus", "-b:a", BITRATE, "-application", "voip", out],
      { encoding: "utf8" }
    );
    if (enc.status !== 0) {
      console.error("\nffmpeg lỗi:\n" + enc.stderr);
      process.exit(1);
    }

    entry[voiceId] = {
      hash,
      file: rel,
      bytes: fs.statSync(out).size,
      seconds: info.seconds,
      chars,
    };
    writeManifest(manifest);

    fs.rmSync(wavPath, { force: true });
    fs.rmSync(jobPath, { force: true });
    made++;

    const secs = (Date.now() - jobs) / 1000;
    console.log(`→ ${mmss(info.seconds)} audio, ${Math.round(entry[voiceId].bytes / 1024)} KB, sinh ${mmss(secs)}`);
  }
}

try {
  fs.rmdirSync(TMP);
} catch (e) {
  /* còn file của lần chạy hỏng — để lại để soi */
}

const total = Object.values(manifest.chapters).reduce((a, c) => a + Object.values(c).filter((v) => v.file).length, 0);
console.log(
  `\nXong: ${made} file mới, ${skipped} không đổi · ${total} file trong manifest · ${mmss((Date.now() - t0) / 1000)}`
);
