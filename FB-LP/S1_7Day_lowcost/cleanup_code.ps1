$filePath = ".\index.html"
$content = Get-Content -Path $filePath -Raw -Encoding UTF8

$patterns = @()

# MonsterInsights Scroll Tracking
$patterns += "(?s)<script[^>]*?>\s*/\* MonsterInsights Scroll Tracking \*/.*?</script>"
# MonsterInsights Conversion Event
$patterns += "(?s)<script[^>]*?>\s*/\* MonsterInsights Conversion Event \*/.*?</script>"
# Klaviyo
$patterns += "(?s)<script async src=[\x27\x22]static/js/klaviyo\.js[\x27\x22]></script>"
# Password Strength
$patterns += "(?s)<script[^>]*?id=[\x27\x22]password-strength_-js[\x27\x22][^>]*?></script>"
# WC AvaTax
$patterns += "(?s)<script[^>]*?id=[\x27\x22]wc-avatax-frontend-js-extra[\x27\x22][^>]*?>.*?</script>"
$patterns += "(?s)<script[^>]*?id=[\x27\x22]wc-avatax-frontend-js[\x27\x22][^>]*?></script>"
# C4WP Captcha
$patterns += "(?s)<script[^>]*?id=[\x27\x22]c4wp-method-provider-js[\x27\x22][^>]*?></script>"
$patterns += "(?s)<script[^>]*?id=[\x27\x22]c4wp-method-js-extra[\x27\x22][^>]*?>.*?</script>"
$patterns += "(?s)<script[^>]*?id=[\x27\x22]c4wp-method-js[\x27\x22][^>]*?></script>"
# KL Identify
$patterns += "(?s)<script[^>]*?id=[\x27\x22]kl-identify-browser-js-extra[\x27\x22][^>]*?>.*?</script>"
$patterns += "(?s)<script[^>]*?id=[\x27\x22]kl-identify-browser-js[\x27\x22][^>]*?></script>"
# Header Cart
$patterns += "(?s)<script[^>]*?id=[\x27\x22]storefront-header-cart-js[\x27\x22][^>]*?></script>"
# Brands
$patterns += "(?s)<script[^>]*?id=[\x27\x22]storefront-woocommerce-brands-js[\x27\x22][^>]*?></script>"
# GTranslate
$patterns += "(?s)<script[^>]*?id=[\x27\x22]gt_widget_script_[\x27\x22]?.*?[\x27\x22]?[^>]*?>.*?</script>"
$patterns += "(?s)<script[^>]*?src=[\x27\x22]static/js/popup\.js[\x27\x22][^>]*?></script>"
# WP Emoji
$patterns += "(?s)<script[^>]*?id=[\x27\x22]wp-emoji-settings[\x27\x22][^>]*?>.*?</script>"
$patterns += "(?s)<script[^>]*?>\s*/\*! This file is auto-generated \*/.*?</script>"
# Cloudflare Beacon
$patterns += "(?s)<script[^>]*?data-cf-beacon=[\x27\x22][^>]*?[\x27\x22][^>]*?></script>"

# CSS Links - WooCommerce
$patterns += "(?s)<link rel=[\x27\x22]stylesheet[\x27\x22] id=[\x27\x22]storefront-woocommerce-brands-style-css[\x27\x22][^>]*?/>"
$patterns += "(?s)<link rel=[\x27\x22]stylesheet[\x27\x22] id=[\x27\x22]storefront-woocommerce-bundles-style-css[\x27\x22][^>]*?/>"
$patterns += "(?s)<link rel=[\x27\x22]stylesheet[\x27\x22] id=[\x27\x22]wc-bundle-style-css[\x27\x22][^>]*?/>"

# HPT Vehicle
$patterns += "(?s)<script[^>]*?id=[\x27\x22]hpt-vehicle-js-extra[\x27\x22][^>]*?>.*?</script>"
$patterns += "(?s)<script[^>]*?id=[\x27\x22]hpt-vehicle-js[\x27\x22][^>]*?></script>"

# Extra empty lines cleanup (optional, but good)
# $patterns += "(?m)^\s*$"

foreach ($pattern in $patterns) {
    if ($content -match $pattern) {
        Write-Host "Removing pattern: $pattern"
        $content = $content -replace $pattern, ""
    }
}

$content | Set-Content -Path $filePath -Encoding UTF8
Write-Host "Cleanup V2 complete."
