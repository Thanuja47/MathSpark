const sharp = require('sharp');
const path = require('path');

async function processImages() {
  const publicDir = path.join(__dirname, '..', 'public');
  
  // 1. ishan_teaching.jpg (displayed at ~335x340, target 670x680 WebP)
  await sharp(path.join(publicDir, 'ishan_teaching.jpg'))
    .resize(670, 680, { fit: 'cover', position: 'top' })
    .webp({ quality: 82 })
    .toFile(path.join(publicDir, 'ishan_teaching.webp'));
  console.log('✓ Converted ishan_teaching.jpg -> ishan_teaching.webp');

  // 2. ishan_portrait.jpg (displayed at ~533x541, target 800x812 WebP)
  await sharp(path.join(publicDir, 'ishan_portrait.jpg'))
    .resize(800, 812, { fit: 'cover', position: 'top' })
    .webp({ quality: 82 })
    .toFile(path.join(publicDir, 'ishan_portrait.webp'));
  console.log('✓ Converted ishan_portrait.jpg -> ishan_portrait.webp');
}

processImages().catch(console.error);
