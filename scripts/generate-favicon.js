const fs = require('fs');
const path = require('path');
const { createCanvas } = require('canvas');

// Create a directory for the script if it doesn't exist
if (!fs.existsSync(path.join(__dirname))) {
  fs.mkdirSync(path.join(__dirname), { recursive: true });
}

// Define the favicon dimensions
const size = 32;
const canvas = createCanvas(size, size);
const ctx = canvas.getContext('2d');

// Draw a blue-green gradient background
const gradient = ctx.createLinearGradient(0, 0, size, size);
gradient.addColorStop(0, '#3b82f6');
gradient.addColorStop(1, '#10b981');
ctx.fillStyle = gradient;
ctx.beginPath();
ctx.roundRect(0, 0, size, size, 4);
ctx.fill();

// Draw a simple tractor shape in white
ctx.fillStyle = 'white';
ctx.beginPath();
ctx.moveTo(22, 16);
ctx.lineTo(12, 16);
ctx.lineTo(12, 19);
ctx.lineTo(10, 19);
ctx.lineTo(10, 22);
ctx.lineTo(7, 22);
ctx.lineTo(7, 26);
ctx.lineTo(8, 26);
ctx.lineTo(8, 28);
ctx.lineTo(10, 28);
ctx.lineTo(10, 26);
ctx.lineTo(14, 26);
ctx.lineTo(14, 28);
ctx.lineTo(16, 28);
ctx.lineTo(16, 26);
ctx.lineTo(22, 26);
ctx.lineTo(22, 16);
ctx.fill();

// Draw wheels
ctx.fillStyle = '#333';
ctx.beginPath();
ctx.arc(9, 26, 2, 0, Math.PI * 2);
ctx.arc(15, 26, 2, 0, Math.PI * 2);
ctx.fill();

// Draw wheat stalk
ctx.fillStyle = '#FFD700';
ctx.beginPath();
ctx.moveTo(24, 10);
ctx.lineTo(26, 8);
ctx.lineTo(28, 10);
ctx.lineTo(26, 12);
ctx.lineTo(24, 10);
ctx.fill();
ctx.fillRect(25, 10, 1, 12);

// Draw sprout
ctx.fillStyle = '#4CAF50';
ctx.beginPath();
ctx.moveTo(8, 14);
ctx.bezierCurveTo(8, 14, 6, 12, 8, 10);
ctx.bezierCurveTo(10, 12, 8, 14, 8, 14);
ctx.fill();
ctx.fillRect(8, 11, 1, 7);

// Convert canvas to PNG buffer
const faviconPngBuffer = canvas.toBuffer('image/png');

// Write PNG buffer to file in public directory
fs.writeFileSync(path.join(__dirname, '..', 'public', 'favicon.png'), faviconPngBuffer);

console.log('Favicon PNG created at public/favicon.png');

// Note: For a production app, you would typically use a library like 'png-to-ico' 
// to convert the PNG to ICO format, but that would require additional dependencies.
// For simplicity, we'll use the PNG as our favicon. 