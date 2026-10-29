/**
 * Kiểm trích dẫn của sách: liên kết nội bộ, thư mục, và đối chiếu Crossref.
 *
 *   node tools/check-refs.mjs             → kiểm tất cả
 *   node tools/check-refs.mjs --offline   → bỏ qua Crossref (chỉ kiểm nội bộ)
 *   node tools/check-refs.mjs --refresh   → bỏ cache, gọi lại Crossref
 *
 * Ba thứ được kiểm, theo thứ tự từ rẻ tới đắt:
 *
 *   1. LIÊN KẾT NỘI BỘ (offline). Mỗi `[n]` trong thân bài phải trỏ tới một
 *      mục có thật trong A2, và mỗi mục trong A2 phải được dẫn ít nhất một
 *      lần. Số hiệu chết là lỗi người đọc thấy ngay mà người viết không thấy.
 *
 *   2. THƯ MỤC (offline). Số hiệu trong bản EN phải trùng bản VI — nếu lệch,
 *      một bản dịch đã bỏ hoặc thêm nguồn.
 *
 *   3. CROSSREF (online). Với mỗi DOI: tựa bài, năm, tập, trang phải khớp
 *      những gì sách in. Đây là lớp bắt được lỗi con người không bắt: một
 *      chữ số trong năm, một trang bị đánh nhầm, một DOI chết.
 *
 * Giới hạn phải nói rõ: lớp 3 kiểm THƯ MỤC, không kiểm việc bài báo có nói
 * đúng câu sách nói. Muốn kiểm điều đó thì phải đọc nguồn, và không có script
 * nào làm hộ được.
 *
 * Kết quả cache ở .refs-cache.json (không commit) để lần chạy sau không phải
 * gọi lại 31 lượt khi mạng chậm. Cache 30 ngày.
 */
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, resolve } from "node:path";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const CACHE = join(ROOT, ".refs-cache.json");
const CACHE_DAYS = 30;
const TITLE_MIN = 0.55;

const args = new Set(process.argv.slice(2));
const OFFLINE = args.has("--offline");
const REFRESH = args.has("--refresh");

let failed = 0;
const fail = (m) => {
  console.log(`  ✗ ${m}`);
  failed++;
};
const ok = (m) => console.log(`  ✓ ${m}`);
const info = (m) => console.log(`  · ${m}`);

/* ---------- nạp nội dung ---------- */

function loadParts() {
  const win = {};
  for (let i = 1; i <= 20; i++) {
    const f = join(ROOT, "content", `part-${i}.js`);
    if (!existsSync(f)) break;
    new Function("window", readFileSync(f, "utf8"))(win);
  }
  return win.BOOK_PARTS || [];
}

function loadOverlay(lang) {
  const f = join(ROOT, "content", lang, "text.js");
  if (!existsSync(f)) return {};
  const win = {};
  new Function("window", readFileSync(f, "utf8"))(win);
  return win.BOOK_TEXT || {};
}

function chapters(parts) {
  const out = {};
  for (const p of parts) for (const ch of p.chapters || []) out[ch.id] = ch;
  return out;
}

const PARTS = loadParts();
if (!PARTS.length) {
  console.error("Không đọc được content/part-*.js");
  process.exit(1);
}
const SRC = chapters(PARTS);
/* bản dịch là một object chương, không phải mảng part */
const EN = loadOverlay("en").chapters || {};
const JA = loadOverlay("ja").chapters || {};

/* A2 = chương thư mục; tên id cố định để tool không phụ thuộc số chương */
const A2 = SRC["ch-nguon-danh-muc"];
if (!A2) {
  console.error("Không tìm thấy chương thư mục (ch-nguon-danh-muc).");
  process.exit(1);
}

/* ---------- đọc mục thư mục ---------- */

const strip = (h) =>
  String(h || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();

/** @returns {{n:number, raw:string, text:string, doi:string|null, year:string, vol:string, page:string}[]} */
function parseRefs(body) {
  const out = [];
  const re = /<p><strong>\[(\d+)\]<\/strong>([\s\S]*?)<\/p>/g;
  let m;
  while ((m = re.exec(body))) {
    const raw = m[2];
    const text = strip(raw);
    const year = (raw.match(/\((\d{4})\)/) || [])[1] || "";
    const doiMatch = raw.match(/10\.\d{4,9}\/[^\s<>"]+/);
    const doi = doiMatch ? doiMatch[0].replace(/[.,;]+$/, "") : null;

    /* phần sau tên bài: "Journal, 62(21), 4947–4950" */
    const tail = raw.split("</em>").length > 1 ? raw.split("</em>").pop() : "";
    const vp = strip(tail).match(
      /[.,]\s*(\d+)\s*(?:\(([^)]*)\))?\s*,\s*([A-Za-z]{0,2}\d+(?:\s*[–-]\s*[A-Za-z]{0,2}\d+)?)/
    );

    out.push({
      n: Number(m[1]),
      raw,
      text,
      doi,
      year,
      vol: vp ? vp[1] : "",
      page: vp ? vp[3] : "",
    });
  }
  return out;
}

const REFS = parseRefs(A2.body);
const BY_N = new Map(REFS.map((r) => [r.n, r]));

/* ---------- 1. liên kết nội bộ ---------- */

console.log("\nKiểm trích dẫn — The Brewing Bible\n");
console.log("1. Liên kết nội bộ");

const cited = new Set();
for (const [id, ch] of Object.entries(SRC)) {
  if (id === "ch-nguon-danh-muc") continue;
  for (const m of String(ch.body || "").matchAll(/\[(\d+)\]/g)) cited.add(Number(m[1]));
}

const dangling = [...cited].filter((n) => !BY_N.has(n)).sort((a, b) => a - b);
if (dangling.length) {
  fail(`[n] dẫn tới nguồn không có trong A2: ${dangling.map((n) => `[${n}]`).join(" ")}`);
} else {
  ok(`không có số hiệu chết — ${cited.size} nguồn được dẫn trong thân bài`);
}

const orphans = REFS.filter((r) => !cited.has(r.n));
if (orphans.length) {
  fail(`nguồn có trong A2 nhưng không nơi nào dẫn: ${orphans.map((r) => `[${r.n}]`).join(" ")}`);
} else {
  ok(`${REFS.length} mục trong A2, mục nào cũng được dẫn ít nhất một lần`);
}

/* ---------- 2. bản dịch ---------- */

console.log("\n2. Bản dịch");

function refNumbers(langChapters) {
  const ch = langChapters["ch-nguon-danh-muc"];
  if (!ch) return null;
  return new Set(parseRefs(ch.body).map((r) => r.n));
}

for (const [lang, set] of [
  ["en", refNumbers(EN)],
  ["ja", refNumbers(JA)],
]) {
  if (!set || !set.size) {
    info(`${lang}: chưa có chương thư mục — bỏ qua`);
    continue;
  }
  const missing = [...BY_N.keys()].filter((n) => !set.has(n));
  const extra = [...set].filter((n) => !BY_N.has(n));
  if (missing.length || extra.length) {
    fail(
      `${lang}: thiếu ${missing.map((n) => `[${n}]`).join(" ") || "—"}; thừa ${extra
        .map((n) => `[${n}]`)
        .join(" ") || "—"}`
    );
  } else {
    ok(`${lang}: cùng ${set.size} số hiệu như bản gốc`);
  }
}

/* ---------- 3. Crossref ---------- */

console.log("\n3. Đối chiếu Crossref");

const withDoi = REFS.filter((r) => r.doi);
if (!withDoi.length) {
  info("không có DOI nào để kiểm");
} else if (OFFLINE) {
  info(`bỏ qua ${withDoi.length} DOI (--offline)`);
} else {
  let cache = {};
  if (existsSync(CACHE) && !REFRESH) {
    try {
      cache = JSON.parse(readFileSync(CACHE, "utf8"));
    } catch {
      cache = {};
    }
  }

  const norm = (s) =>
    String(s || "")
      .toLowerCase()
      .replace(/<[^>]+>/g, " ")
      .replace(/&[a-z]+;/g, " ")
      .replace(/[^a-z0-9à-ỹ ]/gi, " ")
      .replace(/\s+/g, " ")
      .trim();

  const overlap = (a, b) => {
    const A = new Set(norm(a).split(" ").filter((w) => w.length > 3));
    const B = new Set(norm(b).split(" ").filter((w) => w.length > 3));
    if (!A.size || !B.size) return 0;
    let hit = 0;
    for (const w of A) if (B.has(w)) hit++;
    return hit / A.size;
  };

  const dash = (s) => String(s || "").replace(/[‐‑‒–—−]/g, "-").replace(/\s+/g, "");
  const isOld = (entry) =>
    !entry || !entry.at || Date.now() - entry.at > CACHE_DAYS * 864e5;

  const fetchMeta = async (doi) => {
    for (let attempt = 0; attempt < 3; attempt++) {
      try {
        const res = await fetch(`https://api.crossref.org/works/${encodeURIComponent(doi)}`, {
          headers: {
            "User-Agent": "brewing-bible-check-refs/1.0 (https://github.com/jajajou/brewing-bible)",
            Accept: "application/json",
          },
          signal: AbortSignal.timeout(20000),
        });
        if (res.status === 404) return { error: "DOI không tồn tại (404)" };
        if (!res.ok) {
          if ([429, 500, 502, 503, 504].includes(res.status) && attempt < 2) {
            await new Promise((r) => setTimeout(r, 1200 * (attempt + 1)));
            continue;
          }
          return { error: `Crossref trả HTTP ${res.status}` };
        }
        const m = (await res.json()).message;
        const issued = m.issued?.["date-parts"]?.[0]?.[0];
        const printed = m["published-print"]?.["date-parts"]?.[0]?.[0];
        return {
          title: (m.title && m.title[0]) || "",
          years: [issued, printed].filter(Boolean).map(String),
          journal: (m["container-title"] && m["container-title"][0]) || "",
          volume: m.volume ? String(m.volume) : "",
          page: m.page ? String(m.page) : "",
          at: Date.now(),
        };
      } catch (err) {
        if (attempt < 2) {
          await new Promise((r) => setTimeout(r, 1200 * (attempt + 1)));
          continue;
        }
        return { error: `không gọi được Crossref (${err.name || err.message})` };
      }
    }
    return { error: "không gọi được Crossref" };
  };

  let same = 0;
  let cached = 0;
  for (const ref of withDoi) {
    let meta = cache[ref.doi];
    if (isOld(meta)) {
      meta = await fetchMeta(ref.doi);
      cache[ref.doi] = meta;
      await new Promise((r) => setTimeout(r, 120));
    } else {
      cached++;
    }

    const tag = `[${String(ref.n).padStart(2)}]`;

    if (meta.error) {
      fail(`${tag} ${ref.doi} — ${meta.error}`);
      continue;
    }

    const problems = [];
    const ov = overlap(meta.title, ref.text);
    if (ov < TITLE_MIN) {
      problems.push(`tựa khớp ${Math.round(ov * 100)}% (“${meta.title.slice(0, 60)}”)`);
    }
    if (ref.year && meta.years.length && !meta.years.includes(ref.year)) {
      problems.push(`năm ${ref.year} → ${meta.years.join("/")}`);
    }
    if (ref.vol && meta.volume && ref.vol !== meta.volume) {
      problems.push(`tập ${ref.vol} → ${meta.volume}`);
    }
    if (ref.page && meta.page && dash(ref.page) !== dash(meta.page)) {
      problems.push(`trang ${ref.page} → ${meta.page}`);
    }

    if (problems.length) fail(`${tag} ${problems.join("; ")}`);
    else same++;
  }

  if (same === withDoi.length) {
    ok(`${same}/${withDoi.length} DOI khớp tựa, năm, tập, trang`);
  } else if (same) {
    info(`${same}/${withDoi.length} khớp`);
  }
  if (cached) info(`${cached} mục lấy từ cache (${CACHE_DAYS} ngày)`);

  try {
    writeFileSync(CACHE, JSON.stringify(cache, null, 1) + "\n");
  } catch {
    /* cache hỏng không phải lỗi của sách */
  }
}

/* ---------- kết luận ---------- */

const undated = REFS.filter((r) => r.doi && !r.page);
if (undated.length) {
  info(
    `không kiểm được trang ở ${undated.map((r) => `[${r.n}]`).join(" ")} — sách không in số trang cho mục đó`
  );
}

console.log("");
if (failed) {
  console.log(`${failed} chỗ cần sửa.`);
  process.exit(1);
}
console.log("Không có lỗi trích dẫn.");
