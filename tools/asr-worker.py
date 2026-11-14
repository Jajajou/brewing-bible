# Đọc lại chính audio vừa sinh, bằng ASR.
#
#   python tools/asr-worker.py ra16k.wav
#   → {"text": "…", "seconds": 423.1}
#
# Vì sao cần: TTS không báo lỗi khi đọc sai. "1:16" thành "một giờ mười sáu
# phút" vẫn ra file WAV hợp lệ, vẫn đúng độ dài. Chỉ có nghe lại mới biết —
# và cách nghe lại rẻ nhất là cho máy nghe (HANDOFF-AUDIO.md 3.4).
#
# faster-whisper bản mới gãy với av mới (TypeError: open() got an unexpected
# keyword argument 'metadata_errors'), nên ở đây đọc mảng bằng soundfile rồi
# truyền thẳng mảng cho transcribe() — không truyền đường dẫn file.
#
# Vì sao large-v3-turbo chứ không phải medium: đo trên chính ch-chiet-xuat
# (7,0 phút audio, M1 CPU int8), 30.10.2026 —
#
#   medium          RTF 0,71   khớp 88,7 %
#   small           RTF 0,20   khớp 87,8 %
#   large-v3-turbo  RTF 0,30   khớp 89,8 %
#
# turbo vừa nhanh hơn medium 2,4 lần vừa khớp cao hơn: cả sách 6,6 giờ audio
# xuống ~2 giờ thay vì 4,6 giờ. small nhanh nhất nhưng khớp thấp nhất, mà
# khớp thấp làm báo cáo nhiễu — chỗ lệch thật lẫn vào chỗ ASR nghe kém.
#
# Phonon-2 / Phonon-2.5 (FermionResearch) nhanh hơn hẳn nhưng KHÔNG có tiếng
# Việt: bản 2 chỉ tiếng Anh, bản 2.5 có 25 thứ tiếng châu Âu. Đã tra, không
# dùng được cho sách này.

import json
import sys

import soundfile as sf
from faster_whisper import WhisperModel

MODEL = "large-v3-turbo"


def main() -> None:
    audio, sr = sf.read(sys.argv[1], dtype="float32")
    model = WhisperModel(MODEL, device="cpu", compute_type="int8")
    segments, _ = model.transcribe(audio, language="vi", beam_size=5)
    text = " ".join(s.text.strip() for s in segments)
    print(json.dumps({"text": text, "seconds": round(len(audio) / sr, 1)}, ensure_ascii=False))


if __name__ == "__main__":
    main()
