const fs = require('fs');
let content = fs.readFileSync('lib/data.js', 'utf8');

// The corruption: em-dash (U+2014) followed by left-double-quote (U+201C)
// e.g. 'Grade 07 —" Sinhala' → should be 'Grade 07 – Sinhala'
// Replace em-dash+left-quote combo with a simple en-dash
const emDash = '\u2014';
const leftQuote = '\u201C';
const rightQuote = '\u201D';
const enDash = '\u2013';

// Count before
const before = (content.split(emDash + leftQuote).length - 1);
console.log('Broken "—"" occurrences found:', before);

// Fix: em-dash + left-quote → en-dash (cleaner separator for titles)
content = content.split(emDash + leftQuote).join(' \u2013 ');

// Also fix any standalone right-quote that may have been left  
// Fix right-quote after years/numbers that shouldn't be there e.g. 2025)"
// (Only fix if it looks like encoding garbage next to a close-paren or number)
const after = (content.split(emDash + leftQuote).length - 1);
console.log('Remaining broken occurrences:', after);

fs.writeFileSync('lib/data.js', content, 'utf8');
console.log('lib/data.js saved.');

// Show result
const lines = content.split('\n').filter(l => l.includes('title:') && l.includes('Grade'));
lines.slice(0, 10).forEach(l => console.log(l.trim()));
