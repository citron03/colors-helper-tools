import {
  complementaryColorHex,
  toRgb,
  getRandomColorHex,
  getRandomColorRgb,
  RandomColorType,
} from './index';

console.log('===== test start =====');

const testHex = '#ff00ff';

console.log('toRgb', toRgb(testHex));
console.log('complementaryColorHex', complementaryColorHex(testHex));

const randomHex = getRandomColorHex();
console.log('randomHex', randomHex);

const randomRgb = getRandomColorRgb();
console.log('randomRgb', randomRgb);

const randomRedColorHex = getRandomColorHex(RandomColorType.red);
console.log('random Color Red Hex', randomRedColorHex);
