
const { cht, getRandomColorHex } = require('colors-helper-tools');

// Test named export cht
const color = cht('#3498db');
console.log('CJS named export test (cht):', color.hex());

// Test other named export
const randomColor = getRandomColorHex();
console.log('CJS named export test (getRandomColorHex):', randomColor);
