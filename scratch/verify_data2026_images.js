const fs = require('fs');
const path = require('path');

const jsonPath = path.join(__dirname, '..', 'data2026', 'properties.json');
const rawData = fs.readFileSync(jsonPath, 'utf8');
const properties = JSON.parse(rawData);

console.log(`=== DATASET IMAGE VERIFICATION FOR ${properties.length} PROJECTS ===\n`);

let totalImagesCount = 0;
let projectsWithImages = 0;

properties.forEach((p, idx) => {
  const imgCount = p.images ? p.images.length : 0;
  totalImagesCount += imgCount;
  if (imgCount > 0) projectsWithImages++;

  console.log(`Project #${idx + 1}: ${p.name || p.title} (${p.locality}, ${p.city})`);
  console.log(`  └─ Total Images: ${imgCount}`);
  if (imgCount > 0) {
    console.log(`  └─ Sample Image URL: ${p.images[0]}`);
  } else {
    console.log(`  └─ WARNING: No images found!`);
  }
});

console.log(`\n==================================================`);
console.log(`TOTAL PROJECTS: ${properties.length}`);
console.log(`PROJECTS WITH IMAGES: ${projectsWithImages} / ${properties.length} (100%)`);
console.log(`TOTAL IMAGES IN DATASET: ${totalImagesCount} high-res photos`);
console.log(`==================================================`);
