const fs = require('fs');
const path = require('path');

// Emojis to remove from button texts, labels, section tags
const replacements = [
  // Rocket
  ['\uD83D\uDE80 ', ''],
  [' \uD83D\uDE80', ''],
  // Party popper
  ['\uD83C\uDF89', '\u2705'],
  [' \uD83C\uDF89', ''],
  // Trophy  
  ['\uD83C\uDFC6 ', ''],
  [' \uD83C\uDFC6', ''],
  // Counterclockwise arrows (🔄)
  ['\uD83D\uDD04 Resend', 'Resend'],
  // WhatsApp bubble from buttons only (💬 in button text)
  ['\uD83D\uDCAC Ask for Sample Video on WhatsApp', 'Ask for Sample Video on WhatsApp'],
  ['\uD83D\uDCAC Contact on WhatsApp', 'Contact on WhatsApp'],
  ['\uD83D\uDCAC Ask Delivery Support on WhatsApp', 'Ask Delivery Support on WhatsApp'],
  ['\uD83D\uDCAC Chat with Ishan Sir on WhatsApp', 'Chat with Ishan Sir on WhatsApp'],
  // Store
  ['Confirm Order \uD83D\uDCE6', 'Confirm Order'],
  ['Order \uD83D\uDCE6', 'Order'],
  ['Track Package \uD83D\uDEF0\uFE0F', 'Track Package'],
  // Timetable
  ['\uD83D\uDCF9 Join Zoom', 'Join Zoom'],
  // Tutes
  ['\uD83D\uDCC4 View PDF', 'View PDF'],
  // Forgot password
  ['Reset Password & Save \uD83D\uDD10', 'Reset Password & Save'],
];

function walkDir(dir, files = []) {
  for (const entry of fs.readdirSync(dir)) {
    const full = path.join(dir, entry);
    if (entry === 'node_modules' || entry === '.next') continue;
    if (fs.statSync(full).isDirectory()) walkDir(full, files);
    else if (entry.endsWith('.js')) files.push(full);
  }
  return files;
}

const dirs = ['app', 'components'];
let totalChanged = 0;

for (const d of dirs) {
  const allFiles = walkDir(d);
  for (const file of allFiles) {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;
    for (const [from, to] of replacements) {
      if (content.includes(from)) {
        content = content.split(from).join(to);
        changed = true;
        console.log(`  [${from}] -> [${to}] in ${path.basename(file)}`);
      }
    }
    if (changed) {
      fs.writeFileSync(file, content, 'utf8');
      console.log(`✅ Updated: ${file}`);
      totalChanged++;
    }
  }
}

console.log(`\nDone! Updated ${totalChanged} file(s).`);
