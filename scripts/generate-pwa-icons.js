const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

const publicDir = path.join(__dirname, '../public');

// SVG for regular icon
const createIconSVG = (size) => `
  <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" style="stop-color:#1e40af;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#1e3a8a;stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="${size}" height="${size}" fill="url(#grad)"/>
    <rect x="${size * 0.35}" y="${size * 0.22}" width="${size * 0.3}" height="${size * 0.56}" fill="white" rx="${size * 0.02}"/>
    <rect x="${size * 0.22}" y="${size * 0.35}" width="${size * 0.56}" height="${size * 0.3}" fill="white" rx="${size * 0.02}"/>
  </svg>
`;

// SVG for maskable icon
const createMaskableIconSVG = (size) => `
  <svg width="${size}" height="${size}" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <radialGradient id="radgrad" cx="50%" cy="50%" r="50%">
        <stop offset="0%" style="stop-color:#1e40af;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#1e3a8a;stop-opacity:1" />
      </radialGradient>
    </defs>
    <circle cx="${size / 2}" cy="${size / 2}" r="${size * 0.38}" fill="url(#radgrad)"/>
    <rect x="${size * 0.38}" y="${size * 0.28}" width="${size * 0.24}" height="${size * 0.44}" fill="white" rx="${size * 0.02}"/>
    <rect x="${size * 0.28}" y="${size * 0.38}" width="${size * 0.44}" height="${size * 0.24}" fill="white" rx="${size * 0.02}"/>
  </svg>
`;

async function generateIcons() {
  try {
    console.log('🎨 Generating PWA icons with AI design...\n');
    
    const sizes = [192, 512, 96];
    
    for (const size of sizes) {
      // Regular icon
      const iconSvg = createIconSVG(size);
      const filePath = path.join(publicDir, `icon-${size}x${size}.png`);
      await sharp(Buffer.from(iconSvg))
        .png()
        .toFile(filePath);
      const iconStats = fs.statSync(filePath);
      console.log(`✅ Created icon-${size}x${size}.png (${iconStats.size} bytes)`);
      
      // Maskable icon
      const maskableSvg = createMaskableIconSVG(size);
      const maskableFilePath = path.join(publicDir, `icon-${size}x${size}-maskable.png`);
      await sharp(Buffer.from(maskableSvg))
        .png()
        .toFile(maskableFilePath);
      const maskableStats = fs.statSync(maskableFilePath);
      console.log(`✅ Created icon-${size}x${size}-maskable.png (${maskableStats.size} bytes)`);
    }
    
    // Generate screenshots using canvas if available
    console.log('\n📸 Generating app screenshots...\n');
    
    try {
      const canvas = require('canvas');
      
      // Mobile screenshot
      const mobileCanvas = canvas.createCanvas(540, 720);
      const mobileCtx = mobileCanvas.getContext('2d');
      
      const mobileGradient = mobileCtx.createLinearGradient(0, 0, 540, 720);
      mobileGradient.addColorStop(0, '#1e40af');
      mobileGradient.addColorStop(1, '#3b82f6');
      mobileCtx.fillStyle = mobileGradient;
      mobileCtx.fillRect(0, 0, 540, 720);
      
      mobileCtx.fillStyle = '#ffffff';
      mobileCtx.font = 'bold 54px Arial';
      mobileCtx.textAlign = 'center';
      mobileCtx.fillText('Medi.care', 270, 90);
      
      // Cross
      mobileCtx.fillRect(230, 180, 80, 280);
      mobileCtx.fillRect(110, 300, 280, 80);
      
      mobileCtx.font = '27px Arial';
      mobileCtx.fillText('Book Doctor Appointments', 270, 680);
      
      const mobileBuffer = mobileCanvas.toBuffer('image/png');
      fs.writeFileSync(path.join(publicDir, 'screenshot1.png'), mobileBuffer);
      console.log(`✅ Created screenshot1.png - Mobile (540x720) (${mobileBuffer.length} bytes)`);
      
      // Desktop screenshot
      const desktopCanvas = canvas.createCanvas(1280, 720);
      const desktopCtx = desktopCanvas.getContext('2d');
      
      const desktopGradient = desktopCtx.createLinearGradient(0, 0, 1280, 720);
      desktopGradient.addColorStop(0, '#1e40af');
      desktopGradient.addColorStop(1, '#3b82f6');
      desktopCtx.fillStyle = desktopGradient;
      desktopCtx.fillRect(0, 0, 1280, 720);
      
      desktopCtx.fillStyle = '#ffffff';
      desktopCtx.font = 'bold 64px Arial';
      desktopCtx.textAlign = 'center';
      desktopCtx.fillText('Medi.care', 640, 80);
      
      // Cross
      desktopCtx.fillRect(560, 150, 120, 350);
      desktopCtx.fillRect(360, 310, 350, 120);
      
      desktopCtx.font = '32px Arial';
      desktopCtx.fillText('Online Doctor Appointment System', 640, 650);
      
      const desktopBuffer = desktopCanvas.toBuffer('image/png');
      fs.writeFileSync(path.join(publicDir, 'screenshot2.png'), desktopBuffer);
      console.log(`✅ Created screenshot2.png - Desktop (1280x720) (${desktopBuffer.length} bytes)`);
    } catch (canvasError) {
      console.log('⚠️ Screenshot generation skipped (canvas not required)');
    }
    
    console.log('\n✨ Icon generation completed!\n');
    console.log('📁 Icons saved to: public/');
    console.log('\n📦 Generated files:');
    console.log('  ✓ icon-192x192.png');
    console.log('  ✓ icon-192x192-maskable.png');
    console.log('  ✓ icon-512x512.png');
    console.log('  ✓ icon-512x512-maskable.png');
    console.log('  ✓ icon-96x96.png');
    console.log('  ✓ icon-96x96-maskable.png');
    console.log('  ✓ screenshot1.png (mobile)');
    console.log('  ✓ screenshot2.png (desktop)');
    console.log('\n✅ PWA is ready! All icons are in place.\n');
    
  } catch (error) {
    console.error('❌ Error generating icons:', error.message);
    process.exit(1);
  }
}

generateIcons();
