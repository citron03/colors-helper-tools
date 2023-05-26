import {
  complementaryColorHex,
  getColorByStepHex,
  getColorByStepRgb,
  getRandomColorHex,
  getRandomColorRgb,
  pasteltoneHex,
  pasteltoneRgb,
} from './index';
import { RandomColorType } from './src/types';
import { toRgb } from './src/utils';

console.log('===== test start =====\n');

const testHex = '#ff00ff';

console.log('toRgb', toRgb(testHex));
console.log('complementaryColorHex', complementaryColorHex(testHex));

const randomHex = getRandomColorHex();
console.log('randomHex', randomHex);

const randomRgb = getRandomColorRgb();
console.log('randomRgb', randomRgb);

const randomRedColorHex = getRandomColorHex(RandomColorType.red);
console.log('random Color Red Hex', randomRedColorHex);

const pastelColorRgb = pasteltoneRgb();
console.log('random pastel color rgb', pastelColorRgb);

const pastelColorHex = pasteltoneHex();
console.log('random pastel color hex', pastelColorHex);

const genRgb = getColorByStepRgb(20)();
console.log('rgb step 1 :', genRgb.next().value);
console.log('rgb step 2 :', genRgb.next().value);

const genHex = getColorByStepHex(50)();
console.log('hex step 1 :', genHex.next().value);
console.log('hex step 2 :', genHex.next().value);

console.log('\n===== test end =====');
