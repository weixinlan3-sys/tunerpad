from __future__ import annotations

from pathlib import Path
import argparse
import math
from typing import Tuple

from PIL import Image, ImageDraw, ImageFont


SIZE = (1080, 1350)
BG = (12, 21, 62)
WHITE = (255, 255, 255)
BRAND_BLUE = (0, 123, 252)
SAFE_GREEN = (0, 200, 83)
BLACK = (0, 0, 0)


def load_font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    candidates = [
        ("C:\\Windows\\Fonts\\arialbd.ttf", True),
        ("C:\\Windows\\Fonts\\arial.ttf", False),
        ("C:\\Windows\\Fonts\\segoeuib.ttf", True),
        ("C:\\Windows\\Fonts\\segoeui.ttf", False),
    ]
    for path, is_bold in candidates:
        try:
            if bold and not is_bold:
                continue
            return ImageFont.truetype(path, size=size)
        except Exception:
            continue
    return ImageFont.load_default()


def text_size(draw: ImageDraw.ImageDraw, text: str, font: ImageFont.ImageFont) -> Tuple[int, int]:
    bbox = draw.textbbox((0, 0), text, font=font)
    return bbox[2] - bbox[0], bbox[3] - bbox[1]


def draw_centered(draw: ImageDraw.ImageDraw, y: int, text: str, font: ImageFont.ImageFont, color: Tuple[int, int, int]) -> int:
    w, h = text_size(draw, text, font)
    x = (SIZE[0] - w) // 2
    draw.text((x, y), text, fill=color, font=font)
    return x, y, w, h


def rounded_sticker(
    draw: ImageDraw.ImageDraw,
    xy: Tuple[int, int, int, int],
    radius: int,
    fill: Tuple[int, int, int],
    shadow: bool = True,
):
    if shadow:
        sx, sy = 6, 6
        shadow_xy = (xy[0] + sx, xy[1] + sy, xy[2] + sx, xy[3] + sy)
        draw.rounded_rectangle(shadow_xy, radius=radius, fill=(0, 0, 0, 96))
    draw.rounded_rectangle(xy, radius=radius, fill=fill, outline=WHITE, width=2)


def draw_style(draw: ImageDraw.ImageDraw, style: str):
    if style == "chip":
        cx, cy = SIZE[0] // 2, 160
        w, h = 300, 180
        x1, y1, x2, y2 = cx - w // 2, cy - h // 2, cx + w // 2, cy + h // 2
        draw.rounded_rectangle((x1, y1, x2, y2), radius=16, fill=(20, 32, 80))
        for i in range(12):
            px = x1 - 20 + i * (w // 12)
            draw.rectangle((px, y1 + 10, px + 10, y1 + 30), fill=(120, 180, 255))
            px2 = x1 - 20 + i * (w // 12)
            draw.rectangle((px2, y2 - 30, px2 + 10, y2 - 10), fill=(120, 180, 255))
        draw.ellipse((cx - 24, cy - 24, cx + 24, cy + 24), fill=(0, 180, 120))
    elif style == "shield":
        cx, cy = SIZE[0] // 2, 200
        w, h = 340, 240
        x1, y1, x2, y2 = cx - w // 2, cy - h // 2, cx + w // 2, cy + h // 2
        draw.rounded_rectangle((x1, y1, x2, y2), radius=24, fill=(18, 28, 76))
        draw.polygon([(cx, y2 + 40), (x1 + 40, y2 - 20), (x2 - 40, y2 - 20)], fill=(18, 28, 76))
        draw.ellipse((cx - 28, cy - 16, cx + 28, cy + 16), fill=(0, 200, 83))
    elif style == "warning":
        draw.rectangle((80, 120, 300, 280), fill=(180, 40, 40))
        draw.line((100, 140, 280, 260), fill=WHITE, width=10)
        draw.line((100, 260, 280, 140), fill=WHITE, width=10)
        draw.ellipse((780, 140, 980, 260), outline=(0, 200, 83), width=16)
        draw.line((820, 200, 880, 240), fill=(0, 200, 83), width=14)
        draw.line((880, 240, 960, 160), fill=(0, 200, 83), width=14)
    elif style == "mechanic":
        bx, by = SIZE[0] // 2 - 220, 140
        draw.ellipse((bx + 180, by, bx + 240, by + 60), fill=(200, 210, 220))
        draw.rectangle((bx + 160, by + 60, bx + 260, by + 180), fill=(40, 60, 120))
        draw.rectangle((bx + 140, by + 80, bx + 170, by + 140), fill=(40, 60, 120))
        draw.rectangle((bx + 250, by + 80, bx + 280, by + 140), fill=(40, 60, 120))
        draw.rectangle((bx + 260, by + 100, bx + 340, by + 130), fill=(120, 180, 255))
    elif style == "sale":
        draw.rectangle((0, 0, SIZE[0], 80), fill=(220, 40, 40))
        cx, cy, r = SIZE[0] // 2, 260, 220
        pts = []
        spikes = 16
        for i in range(spikes * 2):
            ang = i * math.pi / spikes
            rr = r if i % 2 == 0 else int(r * 0.68)
            px = cx + int(rr * math.cos(ang))
            py = cy + int(rr * math.sin(ang))
            pts.append((px, py))
        draw.polygon(pts, fill=(255, 214, 0))
        bar_h = 100
        y1 = SIZE[1] - bar_h
        draw.rectangle((0, y1, SIZE[0], SIZE[1]), fill=(255, 214, 0))
        step = 40
        for x in range(-SIZE[1], SIZE[0], step):
            draw.line((x, y1, x + 120, SIZE[1]), fill=BLACK, width=14)
    else:
        pass


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--style", default="sale", choices=["sale", "shield", "chip", "warning", "mechanic"])
    parser.add_argument("--currency", default="$")
    parser.add_argument("--square", action="store_true")
    args = parser.parse_args()
    root = Path(__file__).resolve().parent
    out_dir = root / "image"
    out_dir.mkdir(parents=True, exist_ok=True)

    size = (1080, 1080) if args.square else SIZE
    img = Image.new("RGB", size, BG)
    draw = ImageDraw.Draw(img, "RGBA")
    draw_style(draw, args.style)

    # Fonts
    h_font = load_font(96, bold=True)
    sub_font = load_font(44, bold=False)
    info_font = load_font(36, bold=False)
    sticker_font = load_font(40, bold=True)

    # Headline: "SAFE ECU TUNING" with "SAFE" green
    safe_text = "SAFE "
    rest_text = "ECU TUNING"
    safe_w, safe_h = text_size(draw, safe_text, h_font)
    rest_w, rest_h = text_size(draw, rest_text, h_font)
    total_w = safe_w + rest_w
    x_start = (SIZE[0] - total_w) // 2
    y = 240 if size[1] >= 1300 else 180
    draw.text((x_start, y), safe_text, fill=SAFE_GREEN, font=h_font)
    draw.text((x_start + safe_w, y), rest_text, fill=WHITE, font=h_font)

    # Subheadline: "Professional ECU Tuning Software"
    show_sub = args.style != "shield"
    sub_y = y + safe_h + 40
    if show_sub:
        _, _, _, h = draw_centered(draw, sub_y, "Professional ECU Tuning Software", sub_font, WHITE)
    else:
        h = 0

    # Feature lines (short, readable)
    # One-Click OFF & DAMOS
    if args.style == "shield":
        labels = ["DTC OFF", "DPF OFF", "EGR OFF"]
        gaps = 24
        sizes = [text_size(draw, t, info_font) for t in labels]
        widths = [w + 40 for w, _ in sizes]
        total = sum(widths) + gaps * (len(labels) - 1)
        start_x = (size[0] - total) // 2
        row_y1 = y + safe_h + (20 if show_sub else 40)
        for i, t in enumerate(labels):
            w, h_txt = sizes[i]
            x1 = start_x + sum(widths[:i]) + gaps * i
            y1 = row_y1
            x2 = x1 + widths[i]
            y2 = y1 + 64
            rounded_sticker(draw, (x1, y1, x2, y2), 16, BRAND_BLUE, shadow=True)
            draw.text((x1 + (widths[i] - w) // 2, y1 + (64 - h_txt) // 2 - 2), t, fill=WHITE, font=info_font)
    else:
        _, _, _, _ = draw_centered(draw, y + safe_h + 40 + h + 32, "One-Click OFF: DTC / DPF / EGR", info_font, WHITE)
        _, _, _, _ = draw_centered(draw, y + safe_h + 40 + h + 32 + 48, "Massive DAMOS Library", info_font, WHITE)

    # Stickers at bottom: left = 30-DAY FREE TRIAL, right = FIRST MONTH $0 and CLAIM LIMITED-TIME OFFER
    padding_x = 60
    sticker_h = 88
    radius = 18
    # left sticker
    left_text = "30-DAY FREE TRIAL"
    lw, lh = text_size(draw, left_text, sticker_font)
    left_w = lw + 48
    left_x1 = padding_x
    left_y1 = size[1] - sticker_h - 80
    left_x2 = left_x1 + left_w
    left_y2 = left_y1 + sticker_h
    rounded_sticker(draw, (left_x1, left_y1, left_x2, left_y2), radius, BRAND_BLUE, shadow=True)
    draw.text((left_x1 + (left_w - lw) // 2, left_y1 + (sticker_h - lh) // 2 - 4), left_text, fill=WHITE, font=sticker_font)

    # right sticker (two-line emphasis)
    right_text_top = f"FIRST MONTH {args.currency}0"
    right_text_bottom = "CLAIM LIMITED-TIME OFFER"
    tw, th = text_size(draw, right_text_top, sticker_font)
    bw, bh = text_size(draw, right_text_bottom, sticker_font)
    right_w = max(tw, bw) + 64
    right_x2 = size[0] - padding_x
    right_x1 = right_x2 - right_w
    right_y1 = size[1] - sticker_h - 80
    right_y2 = right_y1 + sticker_h
    rounded_sticker(draw, (right_x1, right_y1, right_x2, right_y2), radius, BRAND_BLUE, shadow=True)
    draw.text(
        (right_x1 + (right_w - tw) // 2, right_y1 + 12),
        right_text_top,
        fill=WHITE,
        font=sticker_font,
    )
    draw.text(
        (right_x1 + (right_w - bw) // 2, right_y1 + sticker_h - bh - 12),
        right_text_bottom,
        fill=WHITE,
        font=sticker_font,
    )

    # Save
    suffix = f"{args.style}_{'sq' if args.square else '45'}"
    png_path = out_dir / f"ad_poster_safe_{suffix}.png"
    webp_path = out_dir / f"ad_poster_safe_{suffix}.webp"
    img.save(png_path, "PNG")
    img.save(webp_path, "WEBP", quality=90, method=6)
    print(f"Generated: {png_path}")
    print(f"Generated: {webp_path}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
