const fs = require('fs');
const path = 'c:/SITE SOPRANI/SOPRANI/src/i18n/locales/pt/translation.json';
let buffer = fs.readFileSync(path);

// We need to find sequences of (C3 83) (C2 XX) and convert to (C3 XX)
// OR (C3 AD) (C2 XX) and convert to ... wait.
// Let's look at my hex: c3ad c281 -> í + \u0081.
// Original was Á (c3 81).
// c3 81 -> (1252) Ã + \u0081.
// Ã is c3 83. \u0081 is c2 81.
// So c3 83 c2 81 -> Á.
// Why did I have c3 ad c2 81?
// c3 ad is í. í is c3 ad.
// Maybe it was double-encoded from something else.

function repair(buf) {
    let result = [];
    for (let i = 0; i < buf.length; i++) {
        if (buf[i] === 0xC3 && buf[i+1] === 0x83 && buf[i+2] === 0xC2) {
            // Pattern: C3 83 C2 XX -> C3 XX
            result.push(0xC3);
            result.push(buf[i+3]);
            i += 3;
        } else if (buf[i] === 0xC3 && buf[i+1] === 0xAD && buf[i+2] === 0xC2) {
            // Pattern: C3 AD C2 XX -> C3 XX ? (Wait, c3 ad is í, maybe it was a different shift)
            // Let's check: Á is c3 81. 
            // If I have c3 ad c2 81, it's definitely broken.
            result.push(0xC3);
            result.push(buf[i+3]);
            i += 3;
        } else {
            result.push(buf[i]);
        }
    }
    return Buffer.from(result);
}

let repaired = repair(buffer);
// Second pass for other combinations if needed
// ...

fs.writeFileSync(path, repaired);
console.log('REPAIRED BUFFER-LEVEL ENCODING');
