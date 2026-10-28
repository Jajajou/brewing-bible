#!/usr/bin/env bash
# Dựng bản in A5 (PDF) của The Brewing Bible.
#
#   ./build-pdf.sh                     → the-brewing-bible.pdf
#   ./build-pdf.sh out/ban-in.pdf      → đường dẫn tuỳ chọn
#   SHOT_PAGE=6 ./build-pdf.sh         → kèm ảnh trang 6 ra /tmp/page6.png
#
# Cần: Google Chrome (hoặc Chromium), Node 18+ (có fetch/WebSocket),
# và Python 3 để bật server tạm (Paged.js không chạy được với file://).

set -euo pipefail

OUT="${1:-the-brewing-bible.pdf}"
BOOK_PORT="${BOOK_PORT:-8138}"
ROOT="$(cd "$(dirname "$0")" && pwd)"

CHROME=""
for c in \
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome" \
  "/Applications/Chromium.app/Contents/MacOS/Chromium" \
  "$(command -v google-chrome || true)" \
  "$(command -v chromium || true)"
do
  if [ -n "$c" ] && [ -x "$c" ]; then CHROME="$c"; break; fi
done
if [ -z "$CHROME" ]; then
  echo "Không tìm thấy Chrome/Chromium. Cài Chrome rồi chạy lại." >&2
  exit 1
fi

SERVER_PID=""
cleanup() { [ -n "$SERVER_PID" ] && kill "$SERVER_PID" 2>/dev/null || true; }
trap cleanup EXIT

URL="http://127.0.0.1:$BOOK_PORT/print.html?pdf=1"

if ! curl -sf -o /dev/null "http://127.0.0.1:$BOOK_PORT/print.html"; then
  ( cd "$ROOT" && python3 -m http.server "$BOOK_PORT" --bind 127.0.0.1 >/dev/null 2>&1 ) &
  SERVER_PID=$!
  for _ in $(seq 1 30); do
    curl -sf -o /dev/null "http://127.0.0.1:$BOOK_PORT/print.html" && break
    sleep 0.3
  done
fi

curl -sf -o /dev/null "http://127.0.0.1:$BOOK_PORT/print.html" || {
  echo "Không mở được server tại cổng $BOOK_PORT." >&2; exit 1; }

case "$OUT" in /*) OUT_ABS="$OUT" ;; *) OUT_ABS="$ROOT/$OUT" ;; esac

echo "→ Dựng PDF từ $URL"
mkdir -p "$(dirname "$OUT_ABS")"

LOG="$(node "$ROOT/tools/print-pdf.mjs" "$URL" "$OUT_ABS" "$CHROME")"
echo "$LOG"

if [ ! -s "$OUT" ]; then
  echo "Dựng PDF thất bại." >&2
  exit 1
fi

PAGES="$(printf '%s' "$LOG" | sed -n 's/.*PAGED=\([0-9]*\).*/\1/p')"
PARTS_LOADED="$(printf '%s' "$LOG" | sed -n 's/.*PARTS=\([0-9]*\).*/\1/p')"
EXPECTED_PARTS="$(ls "$ROOT"/content/part-*.js | wc -l | tr -d ' ')"
SIZE="$(du -h "$OUT" | cut -f1)"

# Paged.js thin thoảng timeout hoặc một file nội dung không nạp kịp, cho ra PDF
# thiếu hẳn một phần. Không in "✓" cho những lần đó.
if [ "${PAGES:-0}" -lt 100 ] || [ "${PARTS_LOADED:-0}" -ne "$EXPECTED_PARTS" ]; then
  echo "Dựng hỏng: ${PAGES:-0} trang, nạp ${PARTS_LOADED:-0}/$EXPECTED_PARTS phần. Chạy lại ./build-pdf.sh." >&2
  exit 1
fi

echo "✓ $OUT  ·  $PAGES trang  ·  $SIZE  ·  $PARTS_LOADED phần"
