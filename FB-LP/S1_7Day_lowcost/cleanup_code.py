
import re

file_path = 'index.html'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Define patterns to remove
patterns = [
    # Yoast SEO
    r'<!-- This site is optimized with the Yoast SEO plugin.*?<!-- / Yoast SEO plugin\. -->',
    # Google Tag Manager / PYS
    r'<!-- Google Tag Manager by PYS -->.*?<!-- End Google Tag Manager by PYS -->',
    r'<script type=\'application/javascript\' id=\'pys-version-script\'>.*?</script>',
    # MonsterInsights
    r'<!-- This site uses the Google Analytics by MonsterInsights plugin.*?<!-- / Google Analytics by MonsterInsights -->',
    # RSS Feeds & oEmbed
    r'<link rel="alternate" type="application/rss\+xml".*?>',
    r'<link rel="alternate" title="oEmbed .*?>',
    # Hreflang links
    r'<link rel="alternate" hreflang=".*?" href=".*?" />',
    # WP Emoji
    r'<style id=\'wp-emoji-styles-inline-css\'>.*?</style>',
    # WP Block Library (Gutenberg)
    r'<link rel=\'stylesheet\' id=\'wp-block-library-css\' .*? />',
    r'<style id=\'global-styles-inline-css\'>.*?</style>',
    r'<style id=\'classic-theme-styles-inline-css\'>.*?</style>',
    r'<link rel=\'stylesheet\' id=\'storefront-gutenberg-blocks-css\' .*? />',
    r'<style id=\'storefront-gutenberg-blocks-inline-css\'>.*?</style>',
    # WooCommerce Unused Styles
    r'<style id=\'woocommerce-inline-inline-css\'>.*?</style>',
    r'<link rel=\'stylesheet\' id=\'wc-avatax-frontend-css\' .*? />',
    r'<link rel=\'stylesheet\' id=\'wc-pb-checkout-blocks-css\' .*? />',
    r'<link rel=\'stylesheet\' id=\'style_login_widget-css\' .*? />',
    r'<link rel=\'stylesheet\' id=\'storefront-woocommerce-style-css\' .*? />',
    r'<style id=\'storefront-woocommerce-style-inline-css\'>.*?</style>',
    r'<link rel=\'stylesheet\' id=\'wc-blocks-style-css\' .*? />',
    # Meta tags cleanup
    r'<meta name="generator" content="WordPress.*?" />',
    r'<link rel=\'https://api.w.org/\' href=\'.*?\' />',
    r'<link rel="EditURI" .*? />',
    r'<link rel="wlwmanifest" .*? />',
    r'<link rel=\'shortlink\' .*? />',
    # Scripts at the bottom (if any remain)
    r'<script src="static/js/jquery.matchheight-min.js".*?></script>', # Maybe keep this if layout depends on it? User said remove tunerpad code. MatchHeight is generic.
    r'<script type="text/javascript">.*?function HandlePopupResult.*?</script>', # OAuth/Login stuff
    r'<div id="hpt-oauth-footer".*?</div><script>.*?</script>', # OAuth footer
    r'<div class="gtranslate_wrapper".*?</div>', # Translate wrapper
]

# Apply regex replacements
for pattern in patterns:
    content = re.sub(pattern, '', content, flags=re.DOTALL)

# Clean up empty lines created by removal
content = re.sub(r'\n\s*\n', '\n', content)

# Write back
with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Cleanup complete.")
