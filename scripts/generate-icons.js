// Create SVG-based placeholder icons for PWA
// You should replace these with actual app icons

const canvas = require('canvas');
const fs = require('fs');
const path = require('path');

// Create a simple blue icon with medical cross
function createIcon(size) {
  const canvas = new (require('canvas').Canvas)(size, size);
  const ctx = canvas.getContext('2d');
  
  // Background
  ctx.fillStyle = '#1e40af';
  ctx.fillRect(0, 0, size, size);
  
  // Medical cross
  ctx.fillStyle = '#ffffff';
  const crossWidth = size * 0.2;
  const crossHeight = size * 0.6;
  
  // Vertical bar
  ctx.fillRect(size / 2 - crossWidth / 2, size / 2 - crossHeight / 2, crossWidth, crossHeight);
  // Horizontal bar
  ctx.fillRect(size / 2 - crossHeight / 2, size / 2 - crossWidth / 2, crossHeight, crossWidth);
  
  return canvas;
}

// Generate icons
const sizes = [192, 512, 96];
const publicDir = path.join(__dirname, 'public');

sizes.forEach(size => {
  const icon = createIcon(size);
  const buffer = icon.toBuffer('image/png');
  fs.writeFileSync(path.join(publicDir, `icon-${size}x${size}.png`), buffer);
  console.log(`Created icon-${size}x${size}.png`);
});

// Create maskable icons
sizes.forEach(size => {
  const icon = createIcon(size);
  const buffer = icon.toBuffer('image/png');
  fs.writeFileSync(path.join(publicDir, `icon-${size}x${size}-maskable.png`), buffer);
  console.log(`Created icon-${size}x${size}-maskable.png`);
});
