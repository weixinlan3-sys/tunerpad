from __future__ import annotations

import os
from dataclasses import dataclass
from pathlib import Path

from PIL import Image


@dataclass(frozen=True)
class ConvertResult:
    source: Path
    target: Path
    converted: bool
    error: str | None = None


def _is_image_file(path: Path) -> bool:
    return path.suffix.lower() in {".png", ".jpg", ".jpeg"}


def _should_skip_dir(path: Path) -> bool:
    name = path.name.lower()
    return name in {"node_modules", ".git", ".next", "dist", "build", ".cache"}


def convert_to_webp(source: Path) -> ConvertResult:
    target = source.with_suffix(".webp")
    if target.exists() and target.stat().st_mtime >= source.stat().st_mtime:
        return ConvertResult(source=source, target=target, converted=False)

    quality = 85 if source.suffix.lower() == ".png" else 82

    try:
        with Image.open(source) as img:
            if img.mode in {"P", "LA"}:
                img = img.convert("RGBA")
            elif img.mode not in {"RGB", "RGBA"}:
                img = img.convert("RGB")

            target.parent.mkdir(parents=True, exist_ok=True)
            img.save(
                target,
                "WEBP",
                quality=quality,
                method=6,
                optimize=True,
            )
        return ConvertResult(source=source, target=target, converted=True)
    except Exception as e:  # noqa: BLE001
        return ConvertResult(source=source, target=target, converted=False, error=str(e))


def replace_references(root: Path, mapping: dict[str, str]) -> dict[Path, int]:
    changed: dict[Path, int] = {}
    for path in root.rglob("*"):
        if path.is_dir():
            continue
        if path.suffix.lower() not in {".html", ".css"}:
            continue

        try:
            original = path.read_text(encoding="utf-8")
        except UnicodeDecodeError:
            original = path.read_text(encoding="utf-8-sig")

        updated = original
        for old, new in mapping.items():
            updated = updated.replace(old, new)

        if updated != original:
            path.write_text(updated, encoding="utf-8", newline="\n")
            changed[path] = sum(1 for old in mapping.keys() if old in original)

    return changed


def main() -> int:
    root = Path(__file__).resolve().parent

    results: list[ConvertResult] = []
    for path in root.rglob("*"):
        if path.is_dir() and _should_skip_dir(path):
            continue
        if not path.is_file():
            continue
        if not _is_image_file(path):
            continue
        results.append(convert_to_webp(path))

    mapping: dict[str, str] = {}
    for r in results:
        if r.error is not None:
            continue
        if not r.target.exists():
            continue
        old_rel = r.source.relative_to(root).as_posix()
        new_rel = r.target.relative_to(root).as_posix()
        mapping[old_rel] = new_rel

    changed = replace_references(root, mapping) if mapping else {}

    converted_count = sum(1 for r in results if r.converted)
    skipped_count = sum(1 for r in results if (not r.converted and r.error is None))
    error_count = sum(1 for r in results if r.error is not None)

    print("=== WebP Conversion Report ===")
    print(f"Root: {root}")
    print(f"Found images: {len(results)}")
    print(f"Converted: {converted_count}")
    print(f"Skipped (up-to-date): {skipped_count}")
    print(f"Errors: {error_count}")

    if error_count:
        print("\nErrors:")
        for r in results:
            if r.error is not None:
                print(f"- {r.source}: {r.error}")

    print("\n=== Reference Replacement ===")
    print(f"Mappings: {len(mapping)}")
    if changed:
        for p, cnt in sorted(changed.items(), key=lambda x: str(x[0])):
            print(f"- Updated {p.relative_to(root).as_posix()} (matched {cnt} image path(s))")
    else:
        print("- No HTML/CSS references updated")

    return 0 if error_count == 0 else 1


if __name__ == "__main__":
    raise SystemExit(main())
