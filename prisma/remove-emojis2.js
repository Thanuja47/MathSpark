const fs = require('fs');

const cleanups = {
  'app/admin/page.js': [
    ['\uD83D\uDCD6 Manage Lessons', 'Manage Lessons'],
    ['\u2699\uFE0F Manage Access', 'Manage Access'],
  ],
  'app/my-account/page.js': [
    ['\uD83D\uDCAC Request Grade Approval on WhatsApp', 'Request Grade Approval on WhatsApp'],
    ['\uD83D\uDCAC Request Access on WhatsApp', 'Request Access on WhatsApp'],
    ['Watch Video \uD83C\uDF9E', 'Watch Video'],
    ['Watch Video \uD83C\uDF9E\uFE0F', 'Watch Video'],
  ],
  'app/contact/page.js': [
    ['\uD83D\uDCAC ', ''],
    ['\uD83D\uDCAC', ''],
  ],
  'app/courses/[id]/page.js': [
    ['\uD83D\uDE80 Enroll', 'Enroll'],
    ['\uD83D\uDCAC ', ''],
  ],
  'app/exams/page.js': [
    ['Retry Test \uD83D\uDD04', 'Retry Test'],
    ['Retry Test \uD83D\uDCAC', 'Retry Test'],
  ],
  'app/payment/cancel/page.js': [
    ['\uD83D\uDE80 ', ''],
    ['\uD83D\uDCAC ', ''],
  ],
  'components/AccessLockedModal.js': [
    ['\uD83D\uDCAC ', ''],
  ],
  'components/home/AboutSection.js': [
    ['\uD83D\uDCAC ', ''],
  ],
  'components/home/CTASection.js': [
    ['\uD83D\uDCAC WhatsApp Inquiry', 'WhatsApp Inquiry'],
    ['\uD83D\uDCAC ', ''],
  ],
  'components/home/RedesignedHomepage.js': [
    ['\uD83D\uDE80 ', ''],
    ['\uD83D\uDE80', ''],
  ],
  'components/home/WhyMatSpark.js': [
    ['\uD83D\uDCAC ', ''],
  ],
  'components/layout/Footer.js': [
    ['\uD83D\uDCAC ', ''],
  ],
};

let total = 0;
for (const [file, pairs] of Object.entries(cleanups)) {
  try {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;
    for (const [from, to] of pairs) {
      if (content.includes(from)) {
        content = content.split(from).join(to);
        changed = true;
        console.log('  removed emoji in ' + file);
      }
    }
    if (changed) {
      fs.writeFileSync(file, content, 'utf8');
      total++;
      console.log('SAVED: ' + file);
    }
  } catch(e) {
    console.log('SKIP: ' + file + ' — ' + e.message);
  }
}
console.log('\nDone! ' + total + ' files updated.');
