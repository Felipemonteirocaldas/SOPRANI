$path = 'c:\SITE SOPRANI\SOPRANI\src\i18n\locales\pt\translation.json'
# Read with Windows-1252 to get correct characters
$content = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::GetEncoding(1252))

# Fix the broken parts if they exist, but now they should be correct in memory
# Actually, if I read it correctly, I can just replace the strings I want.

# Fix "Explore the sistemas" typo which was in line 557 approx
$content = $content -replace "Explore the sistemas", "Explore os sistemas"

# Add the new translations
# I'll rebuild the productDescriptions part to be clean

$testerDesc = "Testadores de queda de pressão e luz para todos os tamanhos e formatos — redondos, quadrados, irregulares, latas, tambores, baldes. Unidades de teste carrossel ou lineares ajustam-se facilmente ao tamanho e formato do recipiente metálico."
$slitterDesc = "Slitters guilhotina de alta precisão ou slitters rotativos com cabeçotes de corte totalmente automatizados que permitem mudanças rápidas de formato. Fabricados sob medida pela Ocsam Cepak e Switzerland Can Man AG — extremamente robustos com ajuste simples e rápido para diferentes formatos de blanks."

# Find the start of productDescriptions
$startToken = '"productDescriptions": {'
$startIndex = $content.IndexOf($startToken)
if ($startIndex -ge 0) {
	$endIndex = $content.IndexOf('}', $startIndex)
	$newDescPart = @"
"productDescriptions": {
		"spn-soudronic-slitter": "$slitterDesc",
		"tester": "$testerDesc"
	}
"@
	$content = $content.Substring(0, $startIndex) + $newDescPart + $content.Substring($endIndex + 1)
}

# Add productValues if not present
if ($content.IndexOf('"productValues":') -lt 0) {
	$lastBraceIndex = $content.LastIndexOf('}')
	$productValues = @"

	,
	"productValues": {
		"Pressure decay and light testing": "Teste de queda de pressão e luz",
		"Round, square, irregular, cans, drums, pails": "Redondos, quadrados, irregulares, latas, tambores, baldes",
		"Carousel or linear": "Carrossel ou linear"
	}
"@
	$content = $content.Substring(0, $lastBraceIndex) + $productValues + "`n}"
}

# Write as UTF-8 WITHOUT BOM (or with BOM, standard for i18n usually)
[System.IO.File]::WriteAllText($path, $content, [System.Text.Encoding]::UTF8)
