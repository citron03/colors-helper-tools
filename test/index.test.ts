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
} from '../index';
import { RandomColorType } from '../src/types';
import { toRgb } from '../src/utils';

const testHex = '#ff00ff';

describe('Test colors-helper-tools functions', () => {
  test('toRgb', () => {
    const rgb = toRgb(testHex);
    expect(rgb).toEqual({ red: 255, green: 0, blue: 255 });
  });

  test('complementaryColorHex', () => {
    const hex = complementaryColorHex(testHex);
    expect(hex).toEqual('#00ff00');
  });

  test('getRandomColorHex', () => {
    const randomHex = getRandomColorHex();
    expect(randomHex).toEqual(randomHex);
  });

  test('randomRgb', () => {
    const randomRgb = getRandomColorRgb();
    expect(randomRgb).toEqual(randomRgb);
  });

  test('randomRedColorHex red', () => {
    const randomRgb = getRandomColorHex(RandomColorType.red);
    expect(randomRgb).toEqual(randomRgb);
  });

  test('pastelColorRgb', () => {
    const pastelColorRgb = pasteltoneRgb();
    expect(pastelColorRgb).toEqual(pastelColorRgb);
  });

  test('pastelColorHex', () => {
    const pastelColorHex = pasteltoneHex();
    expect(pastelColorHex).toEqual(pastelColorHex);
  });

  test('neutralColorRgb', () => {
    const neutralColorRgb = neutraltoneRgb();
    expect(neutralColorRgb).toEqual(neutralColorRgb);
  });

  test('neutralColorHex', () => {
    const neutralColorHex = neutraltoneHex();
    expect(neutralColorHex).toEqual(neutralColorHex);
  });

  test('getColorByStepRgbGen', () => {
    const genRgb = getColorByStepRgbGen(20)();
    const first = genRgb.next().value;
    const second = genRgb.next().value;
    expect(first).toEqual({ blue: 0, green: 0, red: 20 });
    expect(second).toEqual({ blue: 0, green: 20, red: 20 });
  });

  test('getColorByStepHexGen', () => {
    const genHex = getColorByStepHexGen(20)();
    const first = genHex.next().value;
    const second = genHex.next().value;
    expect(first).toEqual('#140000');
    expect(second).toEqual('#141400');
  });

  test('simpleGenRgb', () => {
    const simpleGenRgb = getColorByStepRgb(75);
    const first = simpleGenRgb();
    const second = simpleGenRgb();
    expect(first).toEqual({ blue: 0, green: 0, red: 75 });
    expect(second).toEqual({ blue: 0, green: 75, red: 75 });
  });

  test('simpleGenHex', () => {
    const simpleGenHex = getColorByStepHex(100);
    const first = simpleGenHex();
    const second = simpleGenHex();
    expect(first).toEqual('#640000');
    expect(second).toEqual('#646400');
  });
});
