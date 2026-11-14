#!/usr/bin/env python3
"""Generate The Brewing Bible figures as standalone SVG files (vi + en).

Usage: python3 make_figures.py [out_dir]
Every string a reader sees lives in STR[lang]; add a "ja" block to get Japanese.
"""
import math
import os
import sys
from html import escape

OUT = sys.argv[1] if len(sys.argv) > 1 else "svg"

# ---------- palette (fixed hex: renders the same in print and on any page) ----------
INK = "#2B2622"
MUTED = "#6B625A"
AXIS = "#B8AFA6"
GRID = "#ECE7E1"
COFFEE = "#7A4E33"
AMBER = "#C9853A"
AMBER_L = "#F4E2C8"
TEAL = "#2F8573"
TEAL_L = "#DDEFEA"
CORAL = "#C0563A"
CORAL_L = "#F7E1D9"
WATER = "#4F86B7"
WATER_L = "#DCE8F4"
STONE = "#CFC7BE"
STONE_D = "#8C847C"

FONT = "'Be Vietnam Pro','Inter','Noto Sans','Helvetica Neue',Arial,sans-serif"

STR = {
    "vi": {
        "dec": ",",
        "illus": "Minh họa dạng, không phải số đo",
        "src": "Nguồn",
        # fig 7.1
        "ey_axis": "Mức chiết — EY (%)",
        "tds_axis": "Độ đậm — TDS (%)",
        "zone": "Vùng tham khảo của sách: EY 18–22%, TDS 1,15–1,45%",
        "ratio_note": "TDS ≈ EY ÷ (tỉ lệ − 2), bã giữ ~2 g nước/g cà",
        # fig 7.2
        "hi_tds": "TDS cao", "hi_sub": "ly đậm hơn",
        "hi_items": ["Đắng tăng", "Chua tăng", "Khói tăng"],
        "lo_tds": "TDS thấp hơn", "lo_sub": "ly loãng hơn",
        "lo_items": ["Ngọt rõ hơn", "Trái cây rõ hơn", "Hoa rõ hơn"],
        "src72": "Frost và cs. 2020; Batali và cs. 2020 (UC Davis)",
        # fig 7.3
        "a1": ("Rót thêm nước qua bã", "ví dụ 1:16 → 1:18"),
        "a2": ("TDS giảm, EY tăng", "bã bị chiết sâu hơn"),
        "a3": ("Lấy thêm phần chiết cuối", "có thể kéo vị khô, chát"),
        "b1": ("Dừng sớm, thêm nước vào cốc", "pha cốt rồi pha loãng"),
        "b2": ("TDS giảm, EY giữ nguyên", "chỉ đổi độ đậm"),
        "b3": ("Không lấy thêm gì từ bã", "giữ nguyên phần đầu"),
        # fig 8.1
        "time_axis": "Thời gian (giây)",
        "extracted": "Lượng đã chiết",
        "surface": "Rửa bề mặt: vài giây",
        "core": "Khuếch tán từ lõi: vài phút",
        # fig 8.2
        "ph1": "Làm ướt, thoát CO₂",
        "ph2": "Rửa bề mặt: chất dễ tan",
        "ph3": "Khuếch tán chậm: hạt nhỏ và vừa",
        "ph4": "Lõi hạt to: nhiều phút",
        "approx": "Thang thời gian gần đúng",
        "src82": "Maille 2024 (ĐH Sheffield); Rao 2017",
        # fig 9.1
        "grounds": "Bã cà",
        "easy": "Dễ tan · 75–100% vào ly", "easy_sub": "nhóm phân cực",
        "easy_rows": [("Furaneol", "caramel"), ("2,3-Butanedione", "bơ"), ("Guaiacol", "khói, cay")],
        "hard": "Khó tan · dưới 25% vào ly", "hard_sub": "nhóm kém phân cực",
        "hard_rows": [("β-Damascenone", "mật ong, trái cây"), ("2-Furfurylthiol", "mùi rang"), ("Methoxypyrazine", "đất")],
        "src91": "Semmelroch & Grosch 1996; Mayer và cs. 2000",
        # fig 9.2
        "vol": "Tỉ lệ thể tích",
        "size_axis": "Kích thước hạt (thang log)",
        "fines": "Bột mịn ~40 µm",
        "main_peak": "Đỉnh chính, theo cỡ xay",
        "boulders": "Mảnh lớn",
        # fig 9.3
        "p_fines": ("Bột mịn", "chiết quá đà"),
        "p_med": ("Hạt vừa", "chiết vừa"),
        "p_big": ("Mảnh lớn", "lõi chưa tới"),
        "done": "Đã chiết", "notdone": "Chưa chiết",
        "same_time": "Cùng một thời gian pha",
        # fig 9.4
        "ey_short": "Mức chiết (EY)",
        "fine": "Mịn", "coarse": "Thô", "grind": "Cỡ xay",
        "peak": "Đỉnh",
        "left_zone": ("Nghẹt, kênh nước", "một phần bã bị bỏ qua"),
        "right_zone": ("Lõi hạt chưa chiết", "đường khuếch tán quá dài"),
        "src94": "Dạng theo Cameron và cs. 2020 (espresso)",
        # fig 15.1
        "same_vol": "Cùng thể tích bã",
        "v60": "V60 · góc 60°", "v60_sub": "bã nông, rộng",
        "d27": "Deep 27 · góc 27°", "d27_sub": "bã sâu khoảng 1,8 lần",
        "geom_note": "Tính theo hình nón lý tưởng, bỏ qua lỗ thoát và gân",
        # fig 16.1
        "pour": ("Rót thấp", "3–5 cm trên bã"),
        "water_above": ("Nước trên bã", "luôn giữ ngập"),
        "bypass": ("Bypass dọc giấy", "ít được chiết"),
        "through": ("Nước qua bã", "được chiết"),
        "fines_bottom": ("Bột mịn dồn đáy", "dễ bít giấy"),
    },
    "en": {
        "dec": ".",
        "illus": "Illustrative shape, not measured data",
        "src": "Source",
        "ey_axis": "Extraction yield — EY (%)",
        "tds_axis": "Strength — TDS (%)",
        "zone": "Book's reference zone: EY 18–22%, TDS 1.15–1.45%",
        "ratio_note": "TDS ≈ EY ÷ (ratio − 2); grounds hold ~2 g water per g",
        "hi_tds": "Higher TDS", "hi_sub": "stronger cup",
        "hi_items": ["More bitter", "More sour", "More smoky"],
        "lo_tds": "Lower TDS", "lo_sub": "lighter cup",
        "lo_items": ["Sweeter", "More fruity", "More floral"],
        "src72": "Frost et al. 2020; Batali et al. 2020 (UC Davis)",
        "a1": ("Pour more water through", "e.g. 1:16 → 1:18"),
        "a2": ("TDS down, EY up", "bed extracted further"),
        "a3": ("Adds the late fraction", "may bring dryness"),
        "b1": ("Stop early, dilute in cup", "brew strong, then bypass"),
        "b2": ("TDS down, EY unchanged", "only strength changes"),
        "b3": ("Nothing more from the bed", "keeps the early fraction"),
        "time_axis": "Time (s)",
        "extracted": "Amount extracted",
        "surface": "Surface wash-off: seconds",
        "core": "Diffusion from the core: minutes",
        "ph1": "Wetting, CO₂ release",
        "ph2": "Surface wash-off: easy solubles",
        "ph3": "Slow diffusion: small and medium particles",
        "ph4": "Cores of large particles: minutes",
        "approx": "Approximate timescales",
        "src82": "Maille 2024 (Univ. of Sheffield); Rao 2017",
        "grounds": "Grounds",
        "easy": "Readily extracted · 75–100%", "easy_sub": "polar compounds",
        "easy_rows": [("Furaneol", "caramel"), ("2,3-Butanedione", "buttery"), ("Guaiacol", "smoky, spicy")],
        "hard": "Poorly extracted · under 25%", "hard_sub": "less polar compounds",
        "hard_rows": [("β-Damascenone", "honey, fruity"), ("2-Furfurylthiol", "roasty"), ("Methoxypyrazine", "earthy")],
        "src91": "Semmelroch & Grosch 1996; Mayer et al. 2000",
        "vol": "Volume fraction",
        "size_axis": "Particle size (log scale)",
        "fines": "Fines ~40 µm",
        "main_peak": "Main peak, set by the grinder",
        "boulders": "Boulders",
        "p_fines": ("Fines", "over-extracted"),
        "p_med": ("Medium", "well extracted"),
        "p_big": ("Boulder", "core untouched"),
        "done": "Extracted", "notdone": "Not extracted",
        "same_time": "Same brew time",
        "ey_short": "Extraction (EY)",
        "fine": "Fine", "coarse": "Coarse", "grind": "Grind size",
        "peak": "Peak",
        "left_zone": ("Clogging, channels", "part of the bed is skipped"),
        "right_zone": ("Cores not extracted", "diffusion path too long"),
        "src94": "Shape after Cameron et al. 2020 (espresso)",
        "same_vol": "Same bed volume",
        "v60": "V60 · 60° cone", "v60_sub": "shallow, wide bed",
        "d27": "Deep 27 · 27° cone", "d27_sub": "bed about 1.8× deeper",
        "geom_note": "Ideal cones; outlet and ribs ignored",
        "pour": ("Pour low", "3–5 cm above the bed"),
        "water_above": ("Water above the bed", "keep it covered"),
        "bypass": ("Bypass along paper", "barely extracted"),
        "through": ("Through the bed", "extracts coffee"),
        "fines_bottom": ("Fines settle low", "can clog the paper"),
    },
}


def num(x, lang, nd=1):
    s = f"{x:.{nd}f}"
    return s.replace(".", STR[lang]["dec"])


def t(x, y, s, size=14, fill=INK, anchor="start", weight=400, italic=False, baseline=None):
    st = ' font-style="italic"' if italic else ""
    bl = f' dominant-baseline="{baseline}"' if baseline else ""
    return (f'<text x="{x:.1f}" y="{y:.1f}" font-size="{size}" fill="{fill}" '
            f'text-anchor="{anchor}" font-weight="{weight}"{st}{bl}>{escape(s)}</text>')


def line(x1, y1, x2, y2, stroke=AXIS, w=1, dash=None, arrow=False):
    d = f' stroke-dasharray="{dash}"' if dash else ""
    m = ' marker-end="url(#arr)"' if arrow else ""
    return (f'<line x1="{x1:.1f}" y1="{y1:.1f}" x2="{x2:.1f}" y2="{y2:.1f}" stroke="{stroke}" '
            f'stroke-width="{w}" stroke-linecap="round"{d}{m}/>')


def rect(x, y, w, h, fill, stroke="none", rx=10, sw=1):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="{rx}" fill="{fill}" stroke="{stroke}" stroke-width="{sw}"/>'


def svg(w, h, title, desc, body):
    return f'''<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {w} {h}" width="{w}" height="{h}" role="img">
<title>{escape(title)}</title>
<desc>{escape(desc)}</desc>
<defs>
<marker id="arr" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
<path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
</marker>
</defs>
<g font-family="{FONT}">
{body}
</g>
</svg>
'''


def illus_tag(S, x, y):
    return t(x, y, S["illus"], 12, MUTED, "end", italic=True)


def source(S, x, y, text, anchor="start"):
    return t(x, y, f'{S["src"]}: {text}', 12, MUTED, anchor, italic=True)


def poly(points):
    return " ".join(f"{x:.1f},{y:.1f}" for x, y in points)


# ---------------------------------------------------------------- 7.1 ratio lines
def fig_ratio(lang):
    S = STR[lang]
    X = lambda ey: 80 + (ey - 16) * 60
    Y = lambda tds: 360 - (tds - 1.0) * (300 / 0.7)
    b = []
    for ey in range(16, 25, 2):
        b.append(line(X(ey), 60, X(ey), 360, GRID))
        b.append(t(X(ey), 382, str(ey), 13, MUTED, "middle"))
    for i in range(8):
        v = 1.0 + i * 0.1
        b.append(line(80, Y(v), 560, Y(v), GRID))
        b.append(t(70, Y(v) + 4, num(v, lang), 13, MUTED, "end"))
    b.append(rect(X(18), Y(1.45), X(22) - X(18), Y(1.15) - Y(1.45), TEAL_L, TEAL, 6, 1))
    b.append(line(80, 360, 560, 360, AXIS, 1.2))
    b.append(line(80, 60, 80, 360, AXIS, 1.2))
    styles = {15: (COFFEE, None), 16: (AMBER, None), 17: (TEAL, "7 5"), 18: (STONE_D, "2 5")}
    for r, (col, dash) in styles.items():
        k = r - 2
        ey_end = min(24.0, 1.7 * k)
        b.append(line(X(16), Y(16 / k), X(ey_end), Y(ey_end / k), col, 2.4, dash))
        lab = f"1:{r}"
        if ey_end < 24:
            b.append(t(X(ey_end), Y(ey_end / k) - 9, lab, 14, col, "middle", 600))
        else:
            b.append(t(X(24) + 8, Y(24 / k) + 5, lab, 14, col, "start", 600))
    b.append(t(80, 42, S["tds_axis"], 14, INK, "start", 600))
    b.append(t(320, 410, S["ey_axis"], 14, INK, "middle", 600))
    b.append(rect(80, 428, 16, 16, TEAL_L, TEAL, 3))
    b.append(t(104, 441, S["zone"], 13, INK))
    b.append(t(80, 466, S["ratio_note"], 12, MUTED, italic=True))
    return svg(600, 480, "TDS–EY ratio lines", S["zone"], "\n".join(b))


# ---------------------------------------------------------------- 7.2 TDS & sensory
def fig_tds_sensory(lang):
    S = STR[lang]
    b = []
    for x, fill, stroke, head, sub, items, sym in [
        (30, CORAL_L, CORAL, S["hi_tds"], S["hi_sub"], S["hi_items"], "↑"),
        (320, TEAL_L, TEAL, S["lo_tds"], S["lo_sub"], S["lo_items"], "↑"),
    ]:
        b.append(rect(x, 30, 250, 200, fill, stroke, 14, 1))
        b.append(t(x + 125, 66, head, 18, stroke, "middle", 700))
        b.append(t(x + 125, 88, sub, 13, MUTED, "middle"))
        b.append(line(x + 30, 104, x + 220, 104, stroke, 0.8))
        for i, it in enumerate(items):
            b.append(t(x + 125, 136 + i * 30, it, 16, INK, "middle", 500))
    b.append(line(285, 130, 315, 130, MUTED, 1.4, arrow=True))
    b.append(source(S, 300, 258, S["src72"], "middle"))
    return svg(600, 272, "TDS and flavour", S["src72"], "\n".join(b))


# ---------------------------------------------------------------- 7.3 two ways to dilute
def fig_two_ways(lang):
    S = STR[lang]
    b = []
    cols = [(25, CORAL_L, CORAL, ["a1", "a2", "a3"]), (315, TEAL_L, TEAL, ["b1", "b2", "b3"])]
    for x, fill, stroke, keys in cols:
        for i, k in enumerate(keys):
            y = 24 + i * 104
            head, sub = S[k]
            b.append(rect(x, y, 260, 66, fill, stroke, 12, 1))
            b.append(t(x + 130, y + 28, head, 15, stroke, "middle", 700))
            b.append(t(x + 130, y + 50, sub, 13, MUTED, "middle"))
            if i < 2:
                b.append(line(x + 130, y + 70, x + 130, y + 98, stroke, 1.4, arrow=True))
    return svg(600, 304, "Two ways to lower TDS", S["b2"][0], "\n".join(b))


# ---------------------------------------------------------------- 8.1 extraction vs time
def fig_time_curve(lang):
    S = STR[lang]
    X = lambda s: 80 + s * 2
    E = lambda s: 0.55 * (1 - math.exp(-s / 8)) + 0.45 * (1 - math.exp(-s / 90))
    Y = lambda e: 300 - e * 230
    pts = [(X(s), Y(E(s))) for s in [i * 0.5 for i in range(0, 481)]]
    b = [line(80, 300, 560, 300, AXIS, 1.2), line(80, 50, 80, 300, AXIS, 1.2)]
    for s in range(0, 241, 60):
        b.append(line(X(s), 300, X(s), 305, AXIS))
        b.append(t(X(s), 322, str(s), 13, MUTED, "middle"))
    area = [(80, 300)] + pts + [(560, 300)]
    b.append(f'<polygon points="{poly(area)}" fill="{AMBER_L}" opacity="0.7"/>')
    b.append(f'<polyline points="{poly(pts)}" fill="none" stroke="{COFFEE}" stroke-width="2.6" stroke-linejoin="round"/>')
    b.append(line(100, 82, 100, Y(E(10)) - 6, MUTED, 0.8, "3 3"))
    b.append(t(90, 74, S["surface"], 14, INK, "start", 600))
    b.append(line(500, 128, 500, Y(E(210)) + 6, MUTED, 0.8, "3 3"))
    b.append(t(560, 144, S["core"], 14, INK, "end", 600))
    b.append(t(80, 38, S["extracted"], 14, INK, "start", 600))
    b.append(t(320, 348, S["time_axis"], 14, INK, "middle", 600))
    b.append(illus_tag(S, 560, 38))
    return svg(600, 362, "Extraction over time", S["illus"], "\n".join(b))


# ---------------------------------------------------------------- 8.2 phases
def fig_phases(lang):
    S = STR[lang]
    X = lambda s: 80 + s * 2
    rows = [(S["ph1"], 0, 45, STONE, STONE_D), (S["ph2"], 0, 15, CORAL_L, CORAL),
            (S["ph3"], 20, 150, TEAL_L, TEAL), (S["ph4"], 60, 240, TEAL_L, TEAL)]
    b = []
    for i, (lab, a, z, fill, stroke) in enumerate(rows):
        y = 60 + i * 58
        b.append(t(X(a), y - 9, lab, 14, INK, "start", 600))
        b.append(rect(X(a), y, X(z) - X(a), 22, fill, stroke, 5, 1))
    b.append(line(X(240), 60 + 3 * 58 + 11, X(240) + 22, 60 + 3 * 58 + 11, TEAL, 1.4, arrow=True))
    b.append(line(80, 290, 560, 290, AXIS, 1.2))
    for s in range(0, 241, 60):
        b.append(line(X(s), 290, X(s), 295, AXIS))
        b.append(t(X(s), 312, str(s), 13, MUTED, "middle"))
    b.append(t(320, 336, S["time_axis"], 14, INK, "middle", 600))
    b.append(t(560, 26, S["approx"], 12, MUTED, "end", italic=True))
    b.append(source(S, 80, 360, S["src82"]))
    return svg(600, 372, "Phases of extraction over time", S["approx"], "\n".join(b))


# ---------------------------------------------------------------- 9.1 aroma groups
def fig_aroma(lang):
    S = STR[lang]
    b = []
    cx, cy = 95, 190
    ang = [i * math.pi / 5 for i in range(10)]
    rad = [52, 46, 55, 48, 53, 45, 54, 47, 51, 49]
    pts = [(cx + r * math.cos(a), cy + r * math.sin(a)) for a, r in zip(ang, rad)]
    b.append(f'<polygon points="{poly(pts)}" fill="{COFFEE}" stroke="{INK}" stroke-width="1" stroke-linejoin="round"/>')
    b.append(t(cx, cy + 5, S["grounds"], 15, "#FFFFFF", "middle", 700))
    b.append(line(150, 168, 196, 112, MUTED, 1.4, arrow=True))
    b.append(line(150, 212, 196, 268, MUTED, 1.4, arrow=True))
    for y0, fill, stroke, head, sub, rows in [
        (28, TEAL_L, TEAL, S["easy"], S["easy_sub"], S["easy_rows"]),
        (204, CORAL_L, CORAL, S["hard"], S["hard_sub"], S["hard_rows"]),
    ]:
        b.append(rect(200, y0, 375, 150, fill, stroke, 14, 1))
        b.append(t(220, y0 + 30, head, 16, stroke, "start", 700))
        b.append(t(220, y0 + 50, sub, 12, MUTED, italic=True))
        for i, (c, note) in enumerate(rows):
            yy = y0 + 82 + i * 24
            b.append(t(220, yy, c, 14, INK, "start", 600))
            b.append(t(400, yy, note, 14, INK))
    b.append(source(S, 200, 376, S["src91"]))
    return svg(600, 388, "Coffee aroma compounds: extraction into the cup", S["src91"], "\n".join(b))


# ---------------------------------------------------------------- 9.2 particle size distribution
def fig_psd(lang):
    S = STR[lang]
    lo, hi = math.log10(10), math.log10(3000)
    X = lambda d: 80 + (math.log10(d) - lo) / (hi - lo) * 480

    def f(d):
        L = math.log10(d)
        return 0.26 * math.exp(-((L - math.log10(40)) / 0.17) ** 2 / 2) + \
            1.0 * math.exp(-((L - math.log10(700)) / 0.2) ** 2 / 2)

    Y = lambda v: 290 - v * 210
    ds = [10 ** (lo + i * (hi - lo) / 400) for i in range(401)]
    pts = [(X(d), Y(f(d))) for d in ds]
    b = [line(80, 290, 560, 290, AXIS, 1.2), line(80, 50, 80, 290, AXIS, 1.2)]
    for d in (10, 100, 1000):
        b.append(line(X(d), 290, X(d), 295, AXIS))
        b.append(t(X(d), 312, f"{d} µm", 13, MUTED, "middle"))
    area = [(80, 290)] + pts + [(560, 290)]
    b.append(f'<polygon points="{poly(area)}" fill="{AMBER_L}"/>')
    b.append(f'<polyline points="{poly(pts)}" fill="none" stroke="{COFFEE}" stroke-width="2.6" stroke-linejoin="round"/>')
    fx = X(40)
    b.append(line(fx, 222, fx, 202, MUTED, 0.8, "3 3"))
    b.append(t(fx, 194, S["fines"], 14, INK, "middle", 600))
    mx = X(700)
    b.append(t(mx, 68, S["main_peak"], 14, INK, "middle", 600))
    bx = X(2000)
    b.append(line(bx, Y(f(2000)) - 6, bx, 170, MUTED, 0.8, "3 3"))
    b.append(t(bx, 162, S["boulders"], 14, INK, "middle", 600))
    b.append(t(80, 38, S["vol"], 14, INK, "start", 600))
    b.append(t(320, 338, S["size_axis"], 14, INK, "middle", 600))
    b.append(illus_tag(S, 560, 38))
    return svg(600, 352, "Bimodal particle size distribution", S["illus"], "\n".join(b))


# ---------------------------------------------------------------- 9.3 particle cross-sections
def fig_particles(lang):
    S = STR[lang]
    b = []
    cy = 140
    shell = 20
    b.append(f'<circle cx="80" cy="{cy}" r="11" fill="{AMBER}" stroke="{COFFEE}" stroke-width="1"/>')
    b.append(f'<circle cx="215" cy="{cy}" r="50" fill="{AMBER}" stroke="{COFFEE}" stroke-width="1"/>')
    b.append(f'<circle cx="215" cy="{cy}" r="{50 - shell}" fill="{STONE_D}"/>')
    b.append(f'<circle cx="440" cy="{cy}" r="96" fill="{AMBER}" stroke="{COFFEE}" stroke-width="1"/>')
    b.append(f'<circle cx="440" cy="{cy}" r="{96 - shell}" fill="{STONE_D}"/>')
    for x, key in [(80, "p_fines"), (215, "p_med"), (440, "p_big")]:
        head, sub = S[key]
        b.append(t(x, 270, head, 16, INK, "middle", 700))
        b.append(t(x, 291, sub, 13, MUTED, "middle"))
    b.append(rect(80, 316, 16, 16, AMBER, COFFEE, 3))
    b.append(t(104, 329, S["done"], 13, INK))
    b.append(rect(220, 316, 16, 16, STONE_D, "none", 3))
    b.append(t(244, 329, S["notdone"], 13, INK))
    b.append(t(560, 26, S["same_time"] + " · " + S["illus"], 12, MUTED, "end", italic=True))
    return svg(600, 346, "Extraction depth by particle size", S["same_time"], "\n".join(b))


# ---------------------------------------------------------------- 9.4 EY vs grind
def fig_grind_peak(lang):
    S = STR[lang]
    X = lambda g: 80 + g * 480      # g in 0..1, fine -> coarse
    Y = lambda e: 290 - e * 210

    def E(g):
        return math.exp(-((g - 0.38) / 0.25) ** 2) * 0.85 + 0.08 + 0.05 * g

    pts = [(X(i / 300), Y(E(i / 300))) for i in range(301)]
    b = [rect(80, 50, 110, 240, CORAL_L, "none", 0), rect(440, 50, 120, 240, STONE, "none", 0)]
    b.append(f'<rect x="440" y="50" width="120" height="240" fill="#FFFFFF" opacity="0.45"/>')
    b.append(line(80, 290, 560, 290, AXIS, 1.2))
    b.append(line(80, 50, 80, 290, AXIS, 1.2))
    b.append(f'<polyline points="{poly(pts)}" fill="none" stroke="{COFFEE}" stroke-width="2.6" stroke-linejoin="round"/>')
    gp = max(range(301), key=lambda i: E(i / 300)) / 300
    b.append(f'<circle cx="{X(gp):.1f}" cy="{Y(E(gp)):.1f}" r="5" fill="{COFFEE}"/>')
    b.append(t(X(gp), Y(E(gp)) - 14, S["peak"], 14, INK, "middle", 700))
    b.append(t(90, 74, S["left_zone"][0], 13, CORAL, "start", 700))
    b.append(t(90, 92, S["left_zone"][1], 12, MUTED))
    b.append(t(552, 74, S["right_zone"][0], 13, INK, "end", 700))
    b.append(t(552, 92, S["right_zone"][1], 12, MUTED, "end"))
    b.append(t(80, 312, S["fine"], 13, MUTED))
    b.append(t(320, 312, S["grind"], 14, INK, "middle", 600))
    b.append(t(560, 312, S["coarse"], 13, MUTED, "end"))
    b.append(t(80, 38, S["ey_short"], 14, INK, "start", 600))
    b.append(illus_tag(S, 560, 38))
    b.append(source(S, 80, 340, S["src94"]))
    return svg(600, 352, "Extraction yield versus grind size", S["illus"], "\n".join(b))


# ---------------------------------------------------------------- 15.1 V60 vs Deep 27
def fig_cones(lang):
    S = STR[lang]
    b = [t(300, 34, S["same_vol"], 15, INK, "middle", 700)]
    H = 220
    hv = 80
    t30, t135 = math.tan(math.radians(30)), math.tan(math.radians(13.5))
    hd = hv * (t30 ** 2 / t135 ** 2) ** (1 / 3)
    for ax, half, hb, head, sub, deg in [(165, t30, hv, S["v60"], S["v60_sub"], "60°"),
                                         (440, t135, hd, S["d27"], S["d27_sub"], "27°")]:
        ay = 300
        top = ay - H
        bed = [(ax, ay), (ax - hb * half, ay - hb), (ax + hb * half, ay - hb)]
        b.append(f'<polygon points="{poly(bed)}" fill="{AMBER}" opacity="0.85"/>')
        wall = [(ax - H * half, top), (ax, ay), (ax + H * half, top)]
        b.append(f'<polyline points="{poly(wall)}" fill="none" stroke="{INK}" stroke-width="2" stroke-linejoin="round"/>')
        b.append(t(ax, top + 26, deg, 14, MUTED, "middle", 600))
        b.append(t(ax, 334, head, 16, INK, "middle", 700))
        b.append(t(ax, 355, sub, 13, MUTED, "middle"))
    b.append(t(300, 386, S["geom_note"], 12, MUTED, "middle", italic=True))
    return svg(600, 398, "Bed depth: V60 versus Deep 27", S["geom_note"], "\n".join(b))


# ---------------------------------------------------------------- 16.1 V60 water paths
def fig_v60_paths(lang):
    S = STR[lang]
    ax, ay, top = 250, 380, 60
    k = math.tan(math.radians(30))
    wx = lambda y: (ay - y) * k
    b = []
    water = [(ax - wx(206), 206), (ax + wx(206), 206), (ax + wx(250), 250), (ax - wx(250), 250)]
    b.append(f'<polygon points="{poly(water)}" fill="{WATER_L}"/>')
    bed = [(ax - wx(250), 250), (ax + wx(250), 250), (ax, ay)]
    b.append(f'<polygon points="{poly(bed)}" fill="{AMBER_L}" stroke="{AMBER}" stroke-width="1"/>')
    for i in range(26):
        fy = 344 + (i * 7 % 30)
        fx = ax - wx(fy) + 4 + (i * 11 % 17) / 17 * (2 * wx(fy) - 8)
        b.append(f'<circle cx="{fx:.1f}" cy="{fy}" r="2.4" fill="{COFFEE}"/>')
    paper = [(ax - wx(top) + 7, top), (ax, ay - 8), (ax + wx(top) - 7, top)]
    b.append(f'<polyline points="{poly(paper)}" fill="none" stroke="{STONE_D}" stroke-width="1" stroke-dasharray="1 0"/>')
    wall = [(ax - wx(top), top), (ax, ay), (ax + wx(top), top)]
    b.append(f'<polyline points="{poly(wall)}" fill="none" stroke="{INK}" stroke-width="2" stroke-linejoin="round"/>')
    b.append(line(ax, ay + 4, ax, ay + 30, WATER, 2, "2 5"))
    b.append(line(ax - 62, 22, ax - 8, 52, STONE_D, 5))
    b.append(line(ax - 4, 58, ax, 200, WATER, 2.4))
    b.append(line(ax, 214, ax, ay - 42, TEAL, 2.4, arrow=True))
    y1, y2 = 214, ay - 46
    b.append(line(ax + wx(y1) - 13, y1, ax + wx(y2) - 5, y2, CORAL, 2.2, "6 4", arrow=True))
    # right labels
    lx = 440
    for (head, sub), (y, px, py) in [(S["pour"], (40, ax + 2, 62)),
                                     (S["water_above"], (198, ax + wx(228) - 18, 228)),
                                     (S["bypass"], (282, ax + wx(290) - 12, 290))]:
        b.append(line(lx - 6, y - 4, px + 4, py, MUTED, 0.8, "3 3"))
        b.append(t(lx, y, head, 14, INK, "start", 700))
        b.append(t(lx, y + 18, sub, 12, MUTED))
    # left labels
    for (head, sub), (y, px, py) in [(S["through"], (292, ax - 4, 300)),
                                     (S["fines_bottom"], (356, ax - 6, 362))]:
        b.append(line(160, y - 4, px, py, MUTED, 0.8, "3 3"))
        b.append(t(24, y, head, 14, INK, "start", 700))
        b.append(t(24, y + 18, sub, 12, MUTED))
    return svg(600, 430, "Water paths in a V60", S["bypass"][0], "\n".join(b))


FIGS = [
    ("fig07-1_ratio-lines", fig_ratio),
    ("fig07-2_tds-sensory", fig_tds_sensory),
    ("fig07-3_two-ways-to-dilute", fig_two_ways),
    ("fig08-1_extraction-vs-time", fig_time_curve),
    ("fig08-2_extraction-phases", fig_phases),
    ("fig09-1_aroma-compounds", fig_aroma),
    ("fig09-2_particle-size-distribution", fig_psd),
    ("fig09-3_particle-extraction-depth", fig_particles),
    ("fig09-4_ey-vs-grind", fig_grind_peak),
    ("fig15-1_v60-vs-deep27", fig_cones),
    ("fig16-1_v60-water-paths", fig_v60_paths),
]

if __name__ == "__main__":
    os.makedirs(OUT, exist_ok=True)
    for name, fn in FIGS:
        for lang in STR:
            with open(os.path.join(OUT, f"{name}.{lang}.svg"), "w", encoding="utf-8") as fh:
                fh.write(fn(lang))
    print(f"{len(FIGS) * len(STR)} files -> {OUT}")
