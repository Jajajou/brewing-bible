#!/usr/bin/env bash
# Dựng bản in A5 (PDF) của The Brewing Bible.
#
#   ./build-pdf.sh                     → the-brewing-bible.pdf
#   ./build-pdf.sh out/ban-in.pdf      → đường dẫn tuỳ chọn
#   SHOT_PAGE=6 ./build-pdf.sh         → kèm ảnh trang 6 ra /tmp/page6.png
#   BOOK_VER=1.0.0 ./build-pdf.sh      → in "1.0.0" lên bìa và chân trang
#
# Cần: Google Chrome (hoặc Chromium), Node 18+ (có fetch/WebSocket),
# và poppler-utils (pdftotext, pdfinfo, pdffonts) cho bước tự kiểm.
#
# Sau khi dựng, tools/check-pdf.mjs đọc lại file PDF và kiểm ba thứ:
# trang trắng lạc chỗ, đoạn văn bị cắt mất, font chưa nhúng. SKIP_CHECK=1 bỏ qua.

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

# Kiểm trước khi dựng: mọi file mà print.html trỏ tới phải có thật. Thiếu một
# file thì Paged.js vẫn dựng ra PDF, chỉ là mất nguyên một phần — đúng kiểu hỏng
# âm thầm mà các guard bên dưới khó bắt.
MISSING=""
REFS="$(grep -oE '(src|href)="[^"]+\.(js|css)(\?[^"]*)?"' "$ROOT/print.html" \
        | sed -E 's/^(src|href)="//; s/"$//; s/\?.*$//' \
        | grep -vE '^https?://' || true)"
while IFS= read -r ref; do
  [ -z "$ref" ] && continue
  [ -f "$ROOT/$ref" ] || MISSING="$MISSING $ref"
done <<< "$REFS"
if [ -n "$MISSING" ]; then
  echo "Thiếu file mà print.html cần:$MISSING" >&2
  exit 1
fi

SERVER_PID=""
cleanup() { [ -n "$SERVER_PID" ] && kill "$SERVER_PID" 2>/dev/null || true; }
trap cleanup EXIT

# Số phiên bản in lên bìa và chân trang: commit đang dựng, kèm ngày dựng.
# --dirty để bản dựng từ cây làm việc chưa commit không mang số của một
# bản phát hành mà nó không phải.
# BOOK_VER=1.0.0 ./build-pdf.sh để in số phát hành thay cho commit — bản dựng
# từ một tag vẫn in ra "v1.0.0" (git describe lấy tag gần nhất), nhưng khi tag
# chưa có thì một bản phát hành không nên mang số của commit sẽ bị squash mất.
VER="${BOOK_VER:-$(git -C "$ROOT" describe --tags --always --dirty 2>/dev/null || echo "không rõ")}"
VER_ENC="${VER// /%20}"
BUILD_DATE="$(date +%d.%m.%Y)"

URL="http://127.0.0.1:$BOOK_PORT/print.html?pdf=1&ver=$VER_ENC&date=$BUILD_DATE"

# python3 -m http.server trả lời HTTP/1.0 và đóng kết nối sau mỗi request;
# với 12 file nạp song song, Chrome thỉnh thoảng nhận ERR_CONNECTION_RESET và
# một script không chạy. tools/serve.mjs giữ kết nối và khai Content-Length.
if ! curl -sf -o /dev/null "http://127.0.0.1:$BOOK_PORT/print.html"; then
  ( cd "$ROOT" && node "$ROOT/tools/serve.mjs" "$ROOT" "$BOOK_PORT" >/dev/null 2>&1 ) &
  SERVER_PID=$!
  for _ in $(seq 1 40); do
    curl -sf -o /dev/null "http://127.0.0.1:$BOOK_PORT/print.html" && break
    sleep 0.25
  done
fi

curl -sf -o /dev/null "http://127.0.0.1:$BOOK_PORT/print.html" || {
  echo "Không mở được server tại cổng $BOOK_PORT." >&2; exit 1; }

case "$OUT" in /*) OUT_ABS="$OUT" ;; *) OUT_ABS="$ROOT/$OUT" ;; esac

echo "→ Dựng PDF từ $URL  (bản $VER · $BUILD_DATE)"
mkdir -p "$(dirname "$OUT_ABS")"

LOG="$(node "$ROOT/tools/print-pdf.mjs" "$URL" "$OUT_ABS" "$CHROME")"
echo "$LOG"

if [ ! -s "$OUT" ]; then
  echo "Dựng PDF thất bại." >&2
  exit 1
fi

PAGES="$(printf '%s' "$LOG" | sed -n 's/.*PAGED=\([0-9]*\).*/\1/p')"
PARTS_LOADED="$(printf '%s' "$LOG" | sed -n 's/.*PARTS=\([0-9]*\).*/\1/p')"
# Số phần mong đợi lấy từ print.html (danh sách <script> thật sự được nạp),
# không lấy từ `ls content/part-*.js` — nếu một file nội dung biến mất thì
# ls cũng ít đi và guard sẽ im lặng cho qua một cuốn sách thiếu chương.
EXPECTED_PARTS="$(grep -o 'content/part-[0-9]\+\.js' "$ROOT/print.html" | sort -u | wc -l | tr -d ' ')"
SIZE="$(du -h "$OUT" | cut -f1)"

# Paged.js thin thoảng timeout hoặc một file nội dung không nạp kịp, cho ra PDF
# thiếu hẳn một phần. Không in "✓" cho những lần đó.
if [ "${PAGES:-0}" -lt 100 ] || [ "${PARTS_LOADED:-0}" -ne "$EXPECTED_PARTS" ]; then
  echo "Dựng hỏng: ${PAGES:-0} trang, nạp ${PARTS_LOADED:-0}/$EXPECTED_PARTS phần. Chạy lại ./build-pdf.sh." >&2
  exit 1
fi

echo "✓ $OUT  ·  $PAGES trang  ·  $SIZE  ·  $PARTS_LOADED phần"

# Bước kiểm độc lập: đọc lại chính file PDF vừa ra, không tin vào log dựng.
# Bắt ba kiểu hỏng mà dựng thành công vẫn có: trang trắng lạc chỗ, đoạn văn
# bị Paged.js cắt mất, font chưa nhúng. SKIP_CHECK=1 để bỏ qua.
if [ "${SKIP_CHECK:-0}" != "1" ]; then
  node "$ROOT/tools/check-pdf.mjs" "$OUT_ABS" || {
    echo "Bản in không đạt kiểm tra — xem chi tiết ở trên." >&2
    exit 1
  }
fi
