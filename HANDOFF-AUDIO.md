# Handoff — bản nghe cho The Brewing Bible

Viết cho: một trợ lý lập trình tiếp nhận công việc này (ChatGPT hoặc tương đương), chưa từng chạy TTS trong dự án.

Mục tiêu: sinh audio cho 34 chương, hai giọng, chạy tại máy, không tốn tiền.
Trạng thái: lớp văn bản **xong**; đường ống sinh audio **xong và đã chạy thật**
trên 5 chương (một chương hai giọng, bốn chương một giọng); phía web **xong**;
cả sách **chưa sinh**. Việc còn lại: nghe bằng tai, rồi sinh đủ 34 chương.

---

## 0. Đọc gì trước

| File | Là gì |
|---|---|
| [VOICE.md](VOICE.md) | Spec bản nghe — 430 dòng, nguồn chân lý cho MỌI quyết định "đọc cái gì, đọc thế nào". Đọc hết trước khi sửa bất cứ gì. |
| [tools/audio-text.mjs](tools/audio-text.mjs) | Đã viết xong. Rút text đọc được từ HTML + chuẩn hoá ký hiệu. |
| [tools/audio-text.test.mjs](tools/audio-text.test.mjs) | 23 test, chạy `node --test tools/audio-text.test.mjs`. **Phải xanh trước và sau mọi thay đổi.** |
| [README.md](README.md) | Kiến trúc dự án. Phần "Quy ước version asset" và "Quy trình chống hỏng" là khuôn mẫu cần theo. |

Quy ước dự án, giữ nguyên: không build step, không dependency npm, vanilla JS, nội dung là dữ liệu trong `content/part-*.js`. **Đừng thêm framework, đừng thêm package.json.**

---

## 1. Việc đã xong, đừng làm lại

**Chọn model.** VieNeu-TTS v3 Turbo (`pnnbao-ump/VieNeu-TTS-v3-Turbo`), Apache 2.0, 249 MB, 25 giọng preset tiếng Việt, hỗ trợ code-switching Việt–Anh. Đã so với Fish Audio Drama-3 (36 GB, cần 48 GB VRAM, license hạn chế doanh thu) — VieNeu thắng tuyệt đối cho việc này.

**Đo trên máy thật** (MacBook Pro M1, 16 GB, CPU, không GPU, không torch):

| Chỉ số | Giá trị |
|---|---|
| Nạp model | 33 s |
| RTF | 0,35–0,45 (nhanh hơn thời gian thực) |
| Cả chương 7 (4.981 ký tự) | sinh 2,4 phút → audio 6,3 phút |
| Ước tính cả sách VI | ~191.000 ký tự → ~4,5 giờ audio, ~2 giờ máy chạy |

**Giọng đã chốt** (sau khi nghe thử 8 giọng):

- Thân bài bản nam: **Thiền Tâm Đức** (Bắc, kể chuyện) — đọc chậm hơn ~30%, rành rọt, hợp sách kỹ thuật
- Thân bài bản nữ: **Mai Anh** (Bắc, tin tức) — giọng duy nhất đọc đúng "EY" không cần sửa
- Câu đúc kết (`div.pull`, 13 khối): **Thiện Minh** (Bắc, kể chuyện) cho cả hai bản, kèm khoảng lặng 1,1 s hai bên

**`tools/audio-text.mjs` đã xử lý:**

- `1:16` → `1 trên 16` (tỉ lệ) vs `1:30` → `1 phút 30` (thời gian) — cùng cú pháp, phân biệt bằng khoảng giá trị
- `4:6` → `bốn sáu` (tên phương pháp Kasuya)
- Đơn vị: `µm`, `°C`, `°F`, `ppm`, `mg/L`, `%`, `m²`
- Ký hiệu hoá học: `HCO₃⁻`, `CaCO₃`, `Ca²⁺`, `Mg²⁺`, `10⁻¹³`
- Chữ viết tắt đọc theo tên chữ cái tiếng Việt: `EY` → `i-oai`, `TDS` → `ti-đi-ét`, `EBF`, `SCA`, `WBrC`, `TWW`, `pH` → `pê-hát`
- Từ tiếng Anh **để nguyên**, không phiên âm tay — xem mục 6.2 (đo lại 30.10.2026: phiên âm tay làm tệ đi)
- Dải số `18–22%` → `18 đến 22 phần trăm`; dash dính chữ `trung–đậm` → `trung, đậm`
- Bỏ khối không đọc được (`table-wrap`, `stat-grid`, `formula`, `recipe`, `<table>` trần) trừ khi có `data-audio`

**71 khối đã có `data-audio`** — phủ 100%, không còn khối nào bị bỏ im lặng.

---

## 2. Việc còn lại

### 2.1 Bốn chỗ VOICE.md đánh dấu "chưa" — **xong**

Sửa trong `audio-text.mjs`, mỗi mục một test riêng trong `audio-text.test.mjs`
(40 test, xanh):

| Việc | Cách làm | Kết quả |
|---|---|---|
| Badge mức bằng chứng | bỏ `<span class="tier …">` trước khi rút chữ | không còn `"…đáng kể Bằng chứng ."` |
| Trích dẫn `[n]` | bỏ `[n]` và `([n])` | `([24])` biến mất, câu vẫn liền |
| `(xem chương …)` | bỏ cả cụm | 4 chỗ, không còn chỉ đường |
| Ký hiệu sót | `= × ≈ ± → − · * +` đọc thành lời | còn lại đúng hai chỗ `C³` (tên quán) — cố ý để nguyên |

Hai chỗ cần biết khi sửa tiếp:

- **`[41]–[54]` không bị bỏ.** Luật dải số chạy trước luật bỏ trích dẫn, vì đó
  là câu nói thật về khoảng nguồn. Đảo thứ tự là mất câu.
- **Dọn dấu câu mồ côi là bắt buộc.** Bỏ badge xong còn `" ."`; không dọn thì
  TTS đọc một nhịp nghỉ sai chỗ ngay trước dấu chấm.

Số đo sau khi sửa (chạy `prepare()` trên cả 34 chương): 0 trích dẫn, 0 chỉ
đường, 0 badge, 2 ký hiệu `C³`.

### 2.2 Ngoặc tròn — 276 cụm, **vẫn còn**

VOICE.md mục 1.2 có cây quyết định 6 bước. Đã làm phần máy làm được (đơn vị,
chỉ đường, năm, trích dẫn); phần còn lại là 173 cụm diễn giải tiếng Việt và 61
thuật ngữ gốc tiếng Anh — mỗi cụm cần một quyết định đọc/bỏ, và "thuật ngữ
tiếng Anh đọc lần xuất hiện đầu" cần trạng thái xuyên cả sách. Hiện chúng được
đọc nguyên cả cặp ngoặc, nghe được nhưng không hay.

Bẫy đã biết: 51/52 cụm năm phải bỏ nhưng `Đại học Copenhagen (2026)` ở part-2
phải giữ.

### 2.3 Khung (callout) — **xong**

`calloutBlock()` trong `audio-text.mjs` nối theo ba loại tiêu đề:

- **mệnh đề điều kiện** (`Nếu / Khi / Muốn / Hễ`) → `"… thì …"`, hạ chữ đầu vế sau
- **câu hỏi** (kết thúc `?`) → giữ thành câu riêng, rồi mới tới câu trả lời
- **thẻ** (danh từ) → `"Tiêu đề: thân"` trong **cùng một đoạn**, không ngắt

### 2.4 `tools/build-audio.mjs` — **xong**

```
node tools/build-audio.mjs --dry                 # xem sẽ đọc gì
node tools/build-audio.mjs --only ch-chiet-xuat  # một chương, hai giọng
node tools/build-audio.mjs --voice female        # một giọng
node tools/build-audio.mjs --force               # bỏ qua cổng hash
VIENEU_PYTHON=… node tools/build-audio.mjs       # môi trường Python khác
```

Đầu ra đúng như spec, chỉ khác một chỗ: `manifest.json` lồng theo giọng, vì
một chương có hai file.

```json
{ "chapters": { "ch-chiet-xuat": {
    "male":   { "hash": "b72acc06ee4c30a9", "file": "audio/vi/male/ch-chiet-xuat.opus",
                "bytes": 1235273, "seconds": 422.52, "chars": 5500 },
    "female": { … } } } }
```

Cổng hash tính trên **text đã chuẩn hoá + giọng + khoảng lặng + bitrate**, nên
đổi từ điển, đổi giọng hay đổi bitrate đều tự sinh lại — manifest cũ không
bao giờ nói dối về file đang có. Chạy lại một chương không đổi: `0 file mới,
2 không đổi`, 0 giây.

**Câu đúc kết**: `speakable()`/`prepare()` trả thêm `segments`
(`[{ kind: "body" | "pull", text }]`). `build-audio` đọc `body` bằng giọng
chính, `pull` bằng Thiện Minh, chèn 1,1 s hai bên. Model không đổi được khoảng
lặng qua API nên việc ghép nằm trong `tools/tts-worker.py` (numpy concat).

**Đo trên máy thật** (M1, 16 GB, CPU): chương 7 (5.500 ký tự) → nam 7:03 audio
/ 3:26 máy; nữ 5:53 audio / 1:56 máy. Cả sách 168.263 ký tự → ~4 giờ audio mỗi
giọng, ~1,5 giờ máy.

### 2.5 `tools/check-audio.mjs` — **xong**

```
node tools/check-audio.mjs                       # mọi file trong manifest
node tools/check-audio.mjs --only ch-chiet-xuat --voice male
node tools/check-audio.mjs --min 0.85            # ngưỡng khớp
```

Giải mã Opus → 16 kHz mono bằng `ffmpeg`, cho `faster-whisper` (medium, int8,
CPU) nghe lại, rồi so **từng từ** với text đã đưa vào TTS bằng LCS. In ra các
chỗ *mất* chữ kèm ngữ cảnh; dưới ngưỡng thì thoát mã 1.

Đo được trên chương 7 giọng nam: **khớp 87,7 %** (1058/1206 từ). Các chỗ lệch
đều là ASR viết lại: `chiết`→`triết`, `18 đến 22 phần trăm`→`18-22%`,
`i-oai`→`EY`. Đúng như dự đoán trong VOICE.md — nghĩa là bản chuẩn hoá đã tới
được audio.

### 2.6 Phía web — **xong**

`book.js` có thanh nghe dưới hàng nhãn chương: phát/tạm dừng, tua (chuột và
phím ←/→), chọn giọng nam/nữ, nhớ vị trí nghe theo `LS` (`nuocba.audio.pos`,
`nuocba.audio.voice`). Nạp `audio/manifest.json` một lần; chương không có
trong manifest thì **không hiện gì**. Đổi chương thì dừng audio cũ. File lỗi
404 thì thanh tự gỡ.

Hai điều dễ vấp, đã sửa và đáng nhớ:

- **`duration` của Opus là `Infinity` nếu server không trả `206`.** Trình duyệt
  không đọc được trang cuối của file Ogg nên không biết độ dài; thanh hiện
  `0:00 / Infinity:NaN`. `tools/serve.mjs` giờ có Range, và `book.js` lấy số
  giây trong manifest khi `duration` không hữu hạn.
- **`<audio>` phải được `appendChild` vào thanh**, không thì nó là thẻ mồ côi:
  vẫn phát, nhưng không thuộc chương và không ai kiểm được bằng DOM.

Nhớ `node tools/bump-assets.mjs` sau khi commit (CI kiểm `--check`).

### 2.7 Nghĩa vụ license — **xong**

README mục "Giấy phép" ghi: bản nghe sinh bằng VieNeu-TTS v3 Turbo (Apache
2.0, © pnnbao-ump), giọng preset Apache 2.0, dùng thương mại được.

## 3. Hướng dẫn chạy TTS

### 3.1 Cài đặt

Môi trường nằm ở `~/vieneu/.venv`. **Đừng đặt trong `/tmp`** — macOS dọn thư mục đó dần, và venv hỏng nửa chừng (numpy biến mất trong khi 173 gói khác còn nguyên) làm ASR gãy giữa lượt kiểm với `AttributeError: module 'numpy.fft' has no attribute 'rfftfreq'`. Đã mắc một lần, mất một lượt kiểm 35 file.

Dựng lại khi cần:

```bash
mkdir -p ~/vieneu && cd ~/vieneu
uv venv --python 3.12 .venv
uv pip install --python .venv/bin/python vieneu "transformers==4.57.6"
```

**Hai điều bắt buộc, sai là hỏng:**

1. **Python 3.12**, không phải 3.14. Gói `transformers==4.57.6` được pin và không chạy trên 3.14.
2. **`transformers==4.57.6`** đúng phiên bản đó. Model card nói rõ là bản ổn định nhất.

Không cần GPU. Không cần cài torch — đường CPU chạy qua ONNX Runtime. Lần chạy đầu tải ~500 MB weights về `~/.cache/huggingface/`.

### 3.2 Gọi cơ bản

```python
from vieneu import Vieneu

tts = Vieneu()                    # nạp mất ~33 s, làm một lần rồi tái dùng
audio = tts.infer(text, voice="Thiền Tâm Đức", temperature=0.8)
tts.save(audio, "ra.wav")         # WAV 48 kHz mono, float32
```

**`temperature=0.8` là bắt buộc.** Mặc định là 1.0 và cho giọng máy móc hẳn — đây là lỗi đã mắc một lần trong quá trình thử. Model card ghi 0.8 ổn định nhất.

`tts.list_preset_voices()` trả 25 giọng. Tên giọng truyền nguyên văn tiếng Việt có dấu: `"Thiền Tâm Đức"`, `"Mai Anh"`, `"Thiện Minh"`.

### 3.3 Khoảng lặng và cách chia đoạn

Model tự chia chunk theo ranh giới câu/đoạn, và tự chèn lặng:

| Ranh giới | Lặng |
|---|---|
| `para` — ngắt đoạn (`\n\n` trong text) | 0,70 s |
| `sentence` — hết câu | 0,50 s |
| `minor` — dấu phẩy, cụm | 0,30 s |

Ba giá trị này **cố định trong thư viện**, không đổi qua API. Muốn lặng dài hơn (như 1,1 s cho pull quote) thì sinh từng phần riêng rồi ghép tay:

```python
import numpy as np
SR = 48000
a = tts.infer(truoc, voice=V, temperature=0.8)
q = tts.infer(quote, voice="Thiện Minh", temperature=0.8)
b = tts.infer(sau,   voice=V, temperature=0.8)
gap = np.zeros(int(1.1 * SR), dtype=np.float32)
whole = np.concatenate([a, gap, q, gap, b])
tts.save(whole, "chuong.wav")
```

Vì `\n\n` cho 0,70 s nên `speakable()` cố ý xuất mỗi khối thành một đoạn riêng. Đừng gộp lại thành một dòng dài.

### 3.4 Vòng kiểm bằng ASR — cách bắt lỗi phát âm

Đây là cách tìm ra lỗi `1:16` và `EY`. Dùng lại cho mọi thay đổi từ điển.

```bash
uv pip install --python .venv/bin/python faster-whisper
```

```python
# ffmpeg -i vao.wav -ar 16000 -ac 1 ra16k.wav   (whisper cần 16 kHz)
from faster_whisper import WhisperModel
import soundfile as sf
m = WhisperModel("medium", device="cpu", compute_type="int8")
a, _ = sf.read("ra16k.wav", dtype="float32")
segs, _ = m.transcribe(a, language="vi", beam_size=5)
nghe = " ".join(s.text.strip() for s in segs)
```

Rồi so `nghe` với text nguồn bằng `difflib.SequenceMatcher` ở mức **từ**, không mức ký tự.

**Đọc kết quả thế nào — quan trọng:**

- Mức lệch ~10% ở chương 7 là **bình thường**, không phải lỗi TTS. Phần lớn là ASR chuẩn hoá khác (`hoà`/`hòa`, `bốn`/`4`, `ti-đi-ét`/`TDS` — tức TTS đọc đúng, ASR chỉ viết lại thành dạng gốc).
- Lỗi **thật** là khi ASR nghe ra từ khác nghĩa: `1:16` → "một giờ mười sáu phút", `EY` → "AI".
- **Không tin ASR tuyệt đối.** Nó cũng sai. `fines` → "Finch" có thể là ASR không biết từ, không phải TTS đọc sai. Nghi ngờ thì phải nghe bằng tai.

Lưu ý kỹ thuật: `faster-whisper` bản mới gãy với `av` mới (`TypeError: open() got an unexpected keyword argument 'metadata_errors'`). Cách vòng: resample bằng `ffmpeg` rồi nạp mảng qua `soundfile`, truyền thẳng mảng cho `transcribe()`, đừng truyền đường dẫn file.

### 3.5 Đo trước khi sinh cả sách

Luôn chạy thử một chương trước. Chương 7 (`ch-chiet-xuat` trong `content/part-3.js`) là mẫu tốt nhất: dày thuật ngữ Anh, có đủ `table-wrap`, `stat-grid`, `callout`, `pull`.

```bash
node -e 'import("./tools/audio-text.mjs").then(async A => {
  const fs = await import("node:fs"); const win={}; win.window=win;
  new Function("window", fs.readFileSync("content/part-3.js","utf8"))(win);
  const c = win.BOOK_PARTS[0].chapters.find(x => x.id === "ch-chiet-xuat");
  const { text, skipped } = A.prepare(c.title+". "+c.lede+"\n\n"+c.body);
  console.log(text); console.error("bỏ:", skipped);
})' > /tmp/ch7.txt
```

---

## 4. Nguyên tắc làm việc trong dự án này

Lấy từ cách dự án đã được xây, không phải ý thích:

1. **Không tin log, đọc lại đầu ra.** `check-pdf.mjs` đọc lại chính file PDF. `check-refs.mjs` gọi Crossref thật. Vòng ASR ở mục 3.4 là cùng một tinh thần.
2. **Mỗi logic không tầm thường để lại một bài kiểm chạy được.** `node --test`, không framework.
3. **Đo rồi hãy nói.** Mọi con số trong tài liệu này đều từ lệnh chạy thật, không từ trí nhớ. Giữ thói quen đó.
4. **Ghi lại giới hạn.** README có mục "Giới hạn đã biết" và "Vài điều dễ vấp". Tìm ra cái gì thì ghi vào đó.
5. **Shortest diff.** Không abstraction cho một trường hợp dùng, không config cho giá trị không đổi.

---

## 5. Thứ tự đề xuất — còn bốn bước

1. **Nghe bằng tai một chương.** Mở `audio/vi/male/ch-chiet-xuat.opus` (7:03)
   và bản nữ (5:53). Vòng ASR chỉ nói máy có đọc đúng chữ; nó không nói giọng
   có dễ chịu, nhịp có đều, câu đúc kết có bị hụt hơi. Đây là bước duy nhất
   không thể thay bằng script.
2. **Sửa từ điển nếu cần** — `TERMS` và các luật ký hiệu trong
   `audio-text.mjs`. Sửa xong thì chạy lại đúng một chương (`--only`) rồi
   `check-audio.mjs` lại. Cổng hash đảm bảo chỉ chương đổi chữ mới sinh lại.
3. **Sinh cả sách VI.**

   ```bash
   node tools/build-audio.mjs                              # cả hai giọng, ~3 giờ máy
   node tools/check-audio.mjs                              # nghe lại, ~2 giờ
   node tools/check-audio.mjs --only <id> --voice male      # khi chỉ muốn soi một chương
   ```

   Chạy dài nên chia đôi: `--voice male` rồi `--voice female`, và có thể chạy
   song song hai tiến trình — mỗi tiến trình nạp model riêng (~500 MB RAM).
4. **Ngoặc tròn (2.2)** — việc còn lại duy nhất của lớp text. Làm trước khi
   sinh cả sách thì rẻ hơn nhiều: sửa xong là mọi chương đổi hash và sinh lại
   từ đầu. Làm sau thì cũng được, cổng hash lo phần chương không đổi.

Bản EN là việc riêng, sau khi VI đã nghe ổn.

---

## 6. Đã thử và không có tác dụng — đừng thử lại

Ghi lại sau khi nghe chương 7 bằng tai (30.10.2026) và thấy còn “hơi máy”.
Mọi con số dưới đây từ lần chạy thật, trên đúng ba giọng đã chốt.

### 6.1 Tham số model không làm giọng bớt máy

Cùng một đoạn 900 ký tự của chương 7, giọng Mai Anh, đo độ lệch cao độ
(F0, độ lệch chuẩn theo bán cung — càng cao càng “có hồn”):

| temperature | top_k | max_chars | F0 sd | khớp ASR |
|---|---|---|---|---|
| 0,80 | 25 | 256 (hiện tại) | 4,16 | 86,9 % |
| 0,85 | 40 | 400 | 4,00 | 85,4 % |
| 0,95 | 50 | 400 | 4,10 | 86,7 % |

Không khác biệt. Ngược lại, tổ hợp `max_chars=400` + `temperature=0,85` sinh ra
một lỗi thật: model **tự nói thêm một câu kết không có trong sách** — “Cảm ơn
các bạn đã theo dõi, hãy subscribe cho kênh lalaschool”. Đó là lý do giữ nguyên
256/0,8. Hai công tắc khác cũng chỉ nhích ~8 % F0 sd, không đáng đổi:
`use_ref_codes=False` → 4,04; `denoise=False` → 4,11 (so với 3,71).

### 6.2 Từ tiếng Anh: để nguyên, đừng phiên âm tay

Bộ G2P của VieNeu (SEA-G2P) đọc thẳng sang IPA tiếng Anh:
`extraction yield` → `ɛkstɹˈækʃən jˈiːld`, `pour over` → `pˈɔːɹ ˈoʊvɚ`.
Viết theo âm Việt thì IPA thành hai tiếng Việt rời (`pˈɔ ˈo vˈəː`) — tệ hơn hẳn.

Đo trên đúng ba giọng, cùng một câu, so bằng ASR (tỉ lệ từ khớp):

| | Mai Anh | Thiền Tâm Đức |
|---|---|---|
| nguyên bản | **0,737** | **0,757** |
| phiên âm tay (`po ô-vơ`, `phai-nờ`, …) | 0,571 | 0,591 |

ASR nghe “pour over” nguyên bản ra “por over”, bản phiên âm ra “to over” /
“for over”. Sau khi bỏ sáu luật phiên âm tay: chương 7 nam **88,9 %**
(1072/1206 từ, trước 87,7 %), nữ **89,4 %** (1078/1206).

Chữ viết tắt thì vẫn phải giữ luật: G2P đọc `EY` thành `ˈaɪ`, model hay nhả
thành “ai” mất âm cuối; `i-oai` (`ˈi wˈaːj`) thì ASR nghe lại đúng là “EY”.

### 6.3 Nén Opus không phải thủ phạm

Nghi `-application voip` ở 24 kbps cắt dải cao. Đo trên chính file chương 7:
năng lượng trên 4 kHz là 0,38 ở **cả** voip 24 kbps, audio 32 kbps và audio
48 kbps (bản gốc 0,59; trọng tâm phổ 416 / 417 / 419 Hz). Opus cắt dải ở mọi
mức bitrate như nhau, nên đổi bitrate chỉ tốn dung lượng mà không đổi âm sắc.

### 6.4 Lỗi thật: model tự lặp số và tự thêm câu

Nghe bằng tai chương 7 (30.10.2026) bắt được hai lỗi mà **tỉ lệ khớp ASR
không bắt**:

| Chỗ | Máy đọc | Đúng ra |
|---|---|---|
| nữ, 1:23 | “từ 18 đến hai mươi hai mươi hai” (ASR: `18-20-22`) | “từ 18 đến 22” |
| nam, 1:54 | “Hãy đăng ký kênh để xem những video tiếp theo” | không có câu này |

Cả hai xảy ra trên file đã qua cổng 80 %: câu thêm 9 từ chỉ làm tỉ lệ rớt chưa
đến 1 %. Đây là lỗi **ngẫu nhiên của model**, không phải của text: sinh lại
từng file (`--force --only ch-chiet-xuat --voice female`) thì cả hai chỗ đều
đúng, và `repetition_penalty` 1,3 hay 1,4 không sửa được gì khi chạy câu đó
riêng lẻ — nên đừng đi tìm tham số, hãy sinh lại rồi nghe lại.

`check-audio.mjs` giờ chặn đúng loại lỗi này: một đoạn **đứng một mình**
(không từ nào khớp nguồn) dài từ 5 từ trở lên là lỗi cứng, in `⚠ máy TỰ THÊM`
và thoát mã 1 — kể cả khi tỉ lệ chung vẫn trên ngưỡng.

**Có một ca sinh lại không cứu được.** Chương “Mức rang” câu đầu có ba lần
“nửa sau” trong một câu (“đúng ở nửa đầu và sai ở nửa sau, và nửa sau mới là
nửa quan trọng”). Model đọc thành “và nửa sau, và nửa sau, và nửa sau, và nửa
sau…” — bốn lần — và **sinh lại vẫn lặp**, vì cái bẫy nằm trong chính câu văn.
Sửa bằng cách viết lại câu cho còn hai lần: “…sai ở nửa sau, mà phần sai mới là
phần quyết định” (đã sửa cả ba bản dịch), rồi sinh lại — sạch.

Bài học: **sửa câu, đừng săn tham số**. `repetition_penalty` 1,3 và 1,4 không
sửa được vòng lặp; câu lặp ba lần thì model cũng lặp theo.

### 6.5 Nhịp đọc — đòn còn lại

Cùng 250 ký tự: nam đọc 15,28 s, nữ 11,84 s — nữ nhanh hơn **29 %**. Cả chương
7: nam 13,0 ký tự/giây, nữ 15,4. Nhịp nhanh là thứ tai nghe ra là “máy” hơn cả.
Đã cho nghe ba mức 1,00 / 0,94 / 0,88 trên cùng một bản sinh: **chọn 1,00**
(30.10.2026). Giữ nguyên ffmpeg, không thêm `atempo`, không đổi hash.
