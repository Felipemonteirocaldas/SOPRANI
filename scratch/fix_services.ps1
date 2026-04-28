$path = "c:\SITE SOPRANI\SOPRANI\src\components\pages\ServicesPage.tsx"
$content = Get-Content $path -Raw
# Replace missing imports
if ($content -notmatch "import React") {
    $content = $content -replace "import { Wrench", "import React, { useState, useEffect, useRef } from 'react';`nimport { Wrench"
}
# Fix the specific syntax error
$garbage = "    </div>`r?`n  \);`r?`n};`r?`n</span>`r?`n          </div>`r?`n        </div>`r?`n      </div>`r?`n    </div>`r?`n  \);`r?`n};"
$replacement = "    </div>`r`n  );`r`n};"

# Use regex to find the garbage block. It's between the first occurrence of progress footer end and desktop row start.
# Actually, I'll just look for the </span> block.
$content = $content -replace "(?s)    </div>\s+\);\s+};\s+</span>.*?    </div>\s+\);\s+};", "    </div>`r`n  );`r`n};"

[System.IO.File]::WriteAllText($path, $content, [System.Text.Encoding]::UTF8)
