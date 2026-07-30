const fs = require('fs');
const path = require('path');

const srcFile = path.join(__dirname, '..', 'src', 'data', 'properties.js');
const targetDir = path.join(__dirname, '..', 'data2026');

if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// Read src/data/properties.js content
const content = fs.readFileSync(srcFile, 'utf8');

// Write data2026/properties.js
const targetJs = path.join(targetDir, 'properties.js');
fs.writeFileSync(targetJs, content, 'utf8');
console.log(`Copied properties dataset to ${targetJs}`);

// Parse initialProperties array to write data2026/properties.json
try {
  // Extract JSON array string
  const jsonMatch = content.match(/export const initialProperties = (\[[\s\S]*?\]);/);
  if (jsonMatch) {
    const propertiesArray = eval(jsonMatch[1]);
    const targetJson = path.join(targetDir, 'properties.json');
    fs.writeFileSync(targetJson, JSON.stringify(propertiesArray, null, 2), 'utf8');
    console.log(`Saved ${propertiesArray.length} projects to ${targetJson}`);
  }
} catch (e) {
  console.error("Failed to write properties.json:", e.message);
}
