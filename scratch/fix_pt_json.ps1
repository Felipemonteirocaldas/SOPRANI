$path = 'c:\SITE SOPRANI\SOPRANI\src\i18n\locales\pt\translation.json'
$content = Get-Content $path -Raw
# Fix the broken line
$oldLine = '"spn-soudronic-slitter": "Slitters guilhotina de alta precisǜo ou slitters rotativos com cabeotes de corte totalmente automatizados que permitem mudanas rǭpidas de formato. Fabricados sob medida pela Ocsam Cepak e Switzerland Can Man AG ?" extremamente robustos com ajuste simples e rǭpido para diferentes formatos de blanks."'
$newLine = '"spn-soudronic-slitter": "Slitters guilhotina de alta precisão ou slitters rotativos com cabeçotes de corte totalmente automatizados que permitem mudanças rápidas de formato. Fabricados sob medida pela Ocsam Cepak e Switzerland Can Man AG — extremamente robustos com ajuste simples e rápido para diferentes formatos de blanks."'
$content = $content.Replace($oldLine, $newLine)

# Add the new translations before the last closing brace
$insert = @"
,
		"tester": "Testadores de queda de pressão e luz para todos os tamanhos e formatos — redondos, quadrados, irregulares, latas, tambores, baldes. Unidades de teste carrossel ou lineares ajustam-se facilmente ao tamanho e formato do recipiente metálico."
	},
	"productValues": {
		"Pressure decay and light testing": "Teste de queda de pressão e luz",
		"Round, square, irregular, cans, drums, pails": "Redondos, quadrados, irregulares, latas, tambores, baldes",
		"Carousel or linear": "Carrossel ou linear"
	}
"@

$lastBraceIndex = $content.LastIndexOf('}')
$content = $content.Substring(0, $lastBraceIndex - 1) + $insert + "`n}"

$content | Set-Content -Path $path -Encoding utf8
