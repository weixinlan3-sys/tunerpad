import os
import sys
import re

try:
    from PIL import Image
except ImportError:
    print("Pillow not installed. Please run: pip install pillow")
    sys.exit(1)


def convert_to_webp(root_dir: str, quality: int = 85):
    converted = []
    for base, _, files in os.walk(root_dir):
        for fname in files:
            lower = fname.lower()
            if lower.endswith(".png") or lower.endswith(".jpg") or lower.endswith(".jpeg"):
                src_path = os.path.join(base, fname)
                name_wo_ext, _ = os.path.splitext(fname)
                dst_path = os.path.join(base, f"{name_wo_ext}.webp")

                try:
                    with Image.open(src_path) as im:
                        if im.mode in ("P", "RGBA"):
                            im = im.convert("RGBA")
                        else:
                            im = im.convert("RGB")
                        im.save(dst_path, format="WEBP", quality=quality, method=6)
                    converted.append((src_path, dst_path))
                    # print(f"Converted: {src_path} -> {dst_path}")
                except Exception as e:
                    print(f"Failed: {src_path} -> {e}")
    return converted


def replace_paths_in_files(project_root: str, files: list):
    replaced_stats = []
    for file_rel in files:
        path = os.path.join(project_root, file_rel)
        if not os.path.isfile(path):
            continue
        with open(path, "r", encoding="utf-8") as f:
            content = f.read()

        # Replace .png/.jpg to .webp for image references only
        # Avoid changing video or non-image references; we target src/href/url occurrences
        def repl_ext(m):
            prefix = m.group(1)
            path_part = m.group(2)
            suffix = m.group(3)
            # Ensure only .png/.jpg replaced
            path_part = re.sub(r"\.(png|jpg|jpeg)\b", ".webp", path_part, flags=re.IGNORECASE)
            return f"{prefix}{path_part}{suffix}"

        new_content = re.sub(
            r"(src=|href=|url\()([\"'][^\"')]+?\.(?:png|jpg|jpeg)[^\"')]*[\"'])(\))?",
            repl_ext,
            content,
            flags=re.IGNORECASE,
        )

        if new_content != content:
            with open(path, "w", encoding="utf-8") as f:
                f.write(new_content)
            replaced_stats.append(file_rel)
    return replaced_stats


def main():
    project_root = os.path.dirname(os.path.abspath(__file__))
    images_root = os.path.join(project_root, "image")

    print(f"Converting images under: {images_root}")
    converted = convert_to_webp(images_root, quality=85)
    print(f"Converted count: {len(converted)}")

    files_to_update = ["index.html", "style.css"]
    updated_files = replace_paths_in_files(project_root, files_to_update)
    print(f"Updated refs in: {', '.join(updated_files) if updated_files else 'None'}")


if __name__ == "__main__":
    main()
