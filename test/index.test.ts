import {
  complementaryColorHex,
  darkenHex,
  darkenRgb,
  getColorByStepHex,
  getColorByStepHexGen,
  getColorByStepRgb,
  getColorByStepRgbGen,
  getRandomColorHex,
  getRandomColorRgb,
  lightenHex,
  lightenRgb,
  neutraltoneHex,
  neutraltoneRgb,
  pasteltoneHex,
  pasteltoneRgb,
} from '../src/index'; // Ensure that cli is not included in the test environment
import { RandomColorType } from '../src/types';
import { checkRangeColor, toRgb } from '../src/utils';

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

  const hexColorRegex = /^#([0-9A-F]{6})$/i; // hes color string regex

  it('잘못된 hex 색상 문자열인지 검증', () => {
    const result = getRandomColorHex(); // a 함수 호출

    // 틀린 예시로 검증
    const incorrectHexColor = '#ZZZZZZ';

    expect(result).not.toEqual(incorrectHexColor);
  });

  test('get Random Color Hex', () => {
    const randomHex = getRandomColorHex();
    expect(randomHex).toMatch(hexColorRegex);
  });

  test('get Random Colot Rgb', () => {
    const randomRgb = getRandomColorRgb();
    expect(randomRgb).toEqual(
      expect.objectContaining({
        red: expect.any(Number),
        green: expect.any(Number),
        blue: expect.any(Number),
      }),
    );

    expect(checkRangeColor(randomRgb.red)).toBe(true);
    expect(checkRangeColor(randomRgb.green)).toBe(true);
    expect(checkRangeColor(randomRgb.blue)).toBe(true);
  });

  test('randomRedColorHex red', () => {
    const randomHex = getRandomColorHex(RandomColorType.red);
    expect(randomHex).toMatch(hexColorRegex);
  });

  test('pastelColorRgb', () => {
    const pastelColorRgb = pasteltoneRgb();
    expect(pastelColorRgb).toEqual(
      expect.objectContaining({
        red: expect.any(Number),
        green: expect.any(Number),
        blue: expect.any(Number),
      }),
    );

    expect(checkRangeColor(pastelColorRgb.red)).toBe(true);
    expect(checkRangeColor(pastelColorRgb.green)).toBe(true);
    expect(checkRangeColor(pastelColorRgb.blue)).toBe(true);
  });

  test('pastelColorHex', () => {
    const pastelColorHex = pasteltoneHex();
    expect(pastelColorHex).toMatch(hexColorRegex);
  });

  test('neutralColorRgb', () => {
    const neutralColorRgb = neutraltoneRgb();
    expect(neutralColorRgb).toEqual(
      expect.objectContaining({
        red: expect.any(Number),
        green: expect.any(Number),
        blue: expect.any(Number),
      }),
    );

    expect(checkRangeColor(neutralColorRgb.red)).toBe(true);
    expect(checkRangeColor(neutralColorRgb.green)).toBe(true);
    expect(checkRangeColor(neutralColorRgb.blue)).toBe(true);
  });

  test('neutralColorHex', () => {
    const neutralColorHex = neutraltoneHex();
    expect(neutralColorHex).toMatch(hexColorRegex);
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

describe('Test lighten/darken functions', () => {
  test('lightenHex', () => {
    const lightened = lightenHex('#808080', 0.2);
    expect(lightened).toBe('#b3b3b3');
  });

  test('darkenHex', () => {
    const darkened = darkenHex('#808080', 0.2);
    expect(darkened).toBe('#4d4d4d');
  });

  test('lightenRgb', () => {
    const lightened = lightenRgb({ red: 0, green: 0, blue: 0 }, 0.5);
    expect(lightened).toEqual({ red: 128, green: 128, blue: 128 });
  });

  test('darkenRgb', () => {
    const darkened = darkenRgb({ red: 255, green: 255, blue: 255 }, 0.5);
    expect(darkened).toEqual({ red: 128, green: 128, blue: 128 });
  });

  test('lighten white should be white', () => {
    const lightened = lightenHex('#ffffff', 0.2);
    expect(lightened).toBe('#ffffff');
  });

  test('darken black should be black', () => {
    const darkened = darkenHex('#000000', 0.2);
    expect(darkened).toBe('#000000');
  });
});
