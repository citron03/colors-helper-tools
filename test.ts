import {
  complementaryColorHex,
  getColorByStepHex,
  getColorByStepHexGen,
  getColorByStepRgb,
  getColorByStepRgbGen,
  getRandomColorHex,
  getRandomColorRgb,
  neutraltoneHex,
  neutraltoneRgb,
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

const neutralColorRgb = neutraltoneRgb();
console.log('random neutral color rgb', neutralColorRgb);

const neutralColorHex = neutraltoneHex();
console.log('random neutral color hex', neutralColorHex);

const genRgb = getColorByStepRgbGen(20)();
console.log('rgb step 1 :', genRgb.next().value);
console.log('rgb step 2 :', genRgb.next().value);

const genHex = getColorByStepHexGen(20)();
console.log('hex step 1 :', genHex.next().value);
console.log('hex step 2 :', genHex.next().value);

const simpleGenRgb = getColorByStepRgb(75);
console.log('simple rgb step 1 :', simpleGenRgb());
console.log('simple rgb step 2 :', simpleGenRgb());

const simpleGenHex = getColorByStepHex(100);
console.log('simple hex step 1 :', simpleGenHex());
console.log('simple hex step 2 :', simpleGenHex());

console.log('\n===== test end =====');
