# Sinh một chương thành WAV, nhiều segment, nhiều giọng.
#
#   python tools/tts-worker.py job.json ra.wav
#
# job.json: { "segments": [ { "voice": "Thiền Tâm Đức", "text": "…",
#                             "gapAfter": 1.1 }, … ] }
#
# Vì sao là một tiến trình riêng chứ không phải Node gọi API: VieNeu là thư
# viện Python, và nạp model mất ~10–33 s. Nạp một lần rồi sinh cả chương
# trong cùng tiến trình — build-audio spawn đúng một lần cho mỗi file.
#
# Khoảng lặng giữa các segment là do script này chèn, không phải do model:
# model chỉ biết ba mức cố định (đoạn 0,70 s / câu 0,50 s / cụm 0,30 s) và
# không đổi được qua API. Câu đúc kết cần 1,1 s hai bên nên phải ghép tay.

import json
import sys

import numpy as np
from vieneu import Vieneu

# Model card ghi 0,8 là ổn định nhất; mặc định 1.0 cho giọng máy móc hẳn.
# Đây là lỗi đã mắc một lần trong quá trình thử (HANDOFF-AUDIO.md 3.2).
TEMPERATURE = 0.8


def main() -> None:
    job_path, out_path = sys.argv[1], sys.argv[2]
    with open(job_path, encoding="utf-8") as f:
        job = json.load(f)

    tts = Vieneu()
    sr = tts.sample_rate

    pieces = []
    chars = 0
    for seg in job["segments"]:
        text = (seg.get("text") or "").strip()
        if not text:
            continue
        pieces.append(tts.infer(text, voice=seg["voice"], temperature=TEMPERATURE))
        chars += len(text)
        gap = float(seg.get("gapAfter") or 0)
        if gap > 0:
            pieces.append(np.zeros(int(gap * sr), dtype=np.float32))

    wav = np.concatenate(pieces) if pieces else np.zeros(0, dtype=np.float32)
    tts.save(wav, out_path)
    print(json.dumps({"seconds": round(len(wav) / sr, 2), "sampleRate": sr, "chars": chars}))


if __name__ == "__main__":
    main()
