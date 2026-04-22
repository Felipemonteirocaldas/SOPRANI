$path = 'c:\SITE SOPRANI\SOPRANI\src\i18n\locales\pt\translation.json'
$content = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)

# Find the start of the mess
$token = '"productDescriptions": {'
$index = $content.IndexOf($token)
if ($index -ge 0) {
	$content = $content.Substring(0, $index)
}
else {
	# If not found, find the last search results and truncate there
	$index = $content.IndexOf('"search": {')
	if ($index -ge 0) {
		$searchEnd = $content.IndexOf('}', $index)
		$searchEnd = $content.IndexOf('}', $searchEnd + 1) # Nested braces
		# This is getting complex, I'll just find the last "n1": "..." line
		$index = $content.IndexOf('"n1": "Soprani Engineering - Inovação na Itália"')
		if ($index -ge 0) {
			$content = $content.Substring(0, $index + 50) # Keep some buffer
			$content = $content.Substring(0, $content.LastIndexOf('}'))
			$content = $content.Substring(0, $content.LastIndexOf('}'))
			$content = $content.Substring(0, $content.LastIndexOf('}'))
		}
	}
}

# Rebuild the final parts
$finalPart = @"
"productDescriptions": {
		"spn-soudronic-slitter": "Slitters guilhotina de alta precisão ou slitters rotativos com cabeçotes de corte totalmente automatizados que permitem mudanças rápidas de formato. Fabricados sob medida pela Ocsam Cepak e Switzerland Can Man AG — extremamente robustos com ajuste simples e rápido para diferentes formatos de blanks.",
		"tester": "Testadores de queda de pressão e luz para todos os tamanhos e formatos — redondos, quadrados, irregulares, latas, tambores, baldes. Unidades de teste carrossel ou lineares ajustam-se facilmente ao tamanho e formato do recipiente metálico."
	},
	"productValues": {
		"Pressure decay and light testing": "Teste de queda de pressão e luz",
		"Round, square, irregular, cans, drums, pails": "Redondos, quadrados, irregulares, latas, tambores, baldes",
		"Carousel or linear": "Carrossel ou linear"
	}
}
"@

# I need to make sure there's a comma before "productDescriptions" if needed
# but I truncated right at it, so I'll just add it.

# Actually, I'll just use a safer approach: find the last occurrence of "results": { ... }
# and replace from there to the end.

$content = [System.IO.File]::ReadAllText($path, [System.Text.Encoding]::UTF8)
# Remove anything after the last "n1": ... }
$regex = '(?s)"n1":\s*"Soprani Engineering - Inovação na Itália"\s*\}\s*\}\s*\}.*'
$content = $content -replace $regex, '"n1": "Soprani Engineering - Inovação na Itália" } } }'

# Add the new parts
$content = $content.TrimEnd('}')
$content = $content.TrimEnd(' ')
$content = $content.TrimEnd('`t')
$content = $content.TrimEnd('`n')
$content = $content.TrimEnd('`r')
$content = $content.TrimEnd('}')

$newContent = $content + @"
,
	"productDescriptions": {
		"spn-soudronic-slitter": "Slitters guilhotina de alta precisão ou slitters rotativos com cabeçotes de corte totalmente automatizados que permitem mudanças rápidas de formato. Fabricados sob medida pela Ocsam Cepak e Switzerland Can Man AG — extremamente robustos com ajuste simples e rápido para diferentes formatos de blanks.",
		"tester": "Testadores de queda de pressão e luz para todos os tamanhos e formatos — redondos, quadrados, irregulares, latas, tambores, baldes. Unidades de teste carrossel ou lineares ajustam-se facilmente ao tamanho e formato do recipiente metálico."
	},
	"productValues": {
		"Pressure decay and light testing": "Teste de queda de pressão e luz",
		"Round, square, irregular, cans, drums, pails": "Redondos, quadrados, irregulares, latas, tambores, baldes",
		"Carousel or linear": "Carrossel ou linear"
	}
}
"@

$utf8NoBOM = New-Object System.Text.UTF8Encoding($false)
[System.IO.File]::WriteAllText($path, $newContent, $utf8NoBOM)
