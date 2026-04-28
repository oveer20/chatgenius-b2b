const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

const imagesDir = path.join(__dirname, '..', 'public', 'images');

const files = fs.readdirSync(imagesDir).filter(f => f.endsWith('.png'));

for (const file of files) {
  const inputPath = path.join(imagesDir, file);
  const outputPath = path.join(imagesDir, file.replace('.png', '.webp'));
  
  sharp(inputPath)
    .resize(1200, null, { withoutEnlargement: true })
    .webp({ quality: 80 })
    .toFile(outputPath)
    .then(() => {
      const inputSize = fs.statSync(inputPath).size / 1024 / 1024;
      const outputSize = fs.statSync(outputPath).size / 1024;
      console.log(`${file}: ${inputSize.toFixed(1)}MB -> ${outputSize.toFixed(0)}KB`);
    });
}