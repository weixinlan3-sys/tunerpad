import re

def minify_css(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        css = f.read()
    
    # Remove comments
    css = re.sub(r'/\*[\s\S]*?\*/', '', css)
    
    # Remove whitespace around delimiters
    css = re.sub(r'\s*([\{\}:;,])\s*', r'\1', css)
    
    # Remove trailing semicolons before closing brace
    css = re.sub(r';\}', '}', css)
    
    # Collapse remaining whitespace
    css = re.sub(r'\s+', ' ', css)
    
    return css.strip()

print(minify_css('static/css/style.css'))
