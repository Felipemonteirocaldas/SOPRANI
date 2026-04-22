$path = 'c:\SITE SOPRANI\SOPRANI\src\i18n\locales\pt\translation.json'
# Read the file as bytes to handle encoding properly
$bytes = [System.IO.File]::ReadAllBytes($path)
# Check for BOM (EF BB BF)
if ($bytes[0] -eq 0xEF -and $bytes[1] -eq 0xBB -and $bytes[2] -eq 0xBF) {
    $bytes = $bytes[3..($bytes.Length - 1)]
}
$content = [System.Text.Encoding]::UTF8.GetString($bytes)

# Fix broken characters (they might be in UTF-8 now but broken)
# We need to replace the UTF-8 sequences that represent the broken characters.
# But since I don't know them exactly, I'll just use the strings from the previous turn's mess.

$content = $content -replace "precisǜo", "precisão"
$content = $content -replace "mudanas", "mudanças"
$content = $content -replace "rǭpidas", "rápidas"
$content = $content -replace "metǭlico", "metálico"
$content = $content -replace "cabeotes", "cabeçotes"
$content = $content -replace "Inovaǜo", "Inovação"
$content = $content -replace "Itǭlia", "Itália"
$content = $content -replace "pressǜo", "pressão"
$content = $content -replace "Peas", "Peças"

# Final cleanup of the structure
# I'll make sure the end of the file is clean.
$lastBrace = $content.LastIndexOf('}')
if ($lastBrace -gt 0) {
    $content = $content.Substring(0, $lastBrace + 1)
}

# Write back without BOM
$utf8NoBOM = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($path, $content, $utf8NoBOM)
