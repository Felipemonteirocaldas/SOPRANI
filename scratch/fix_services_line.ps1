$path = "c:\SITE SOPRANI\SOPRANI\src\components\pages\ServicesPage.tsx"
$content = Get-Content $path -Raw

# Fix the line where the component definition is commented out
$content = $content -replace "// .*?const ServiceScrollyPanel", "// 💎💎 SCROLLYTELLING PANEL (mobile + tablet < xl) 💎💎`r`nconst ServiceScrollyPanel"

[System.IO.File]::WriteAllText($path, $content, [System.Text.Encoding]::UTF8)
