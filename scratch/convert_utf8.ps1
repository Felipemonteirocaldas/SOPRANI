$path = 'c:\SITE SOPRANI\SOPRANI\src\i18n\locales\pt\translation.json'
$content = Get-Content $path -Encoding Default
$content | Set-Content -Path $path -Encoding utf8
