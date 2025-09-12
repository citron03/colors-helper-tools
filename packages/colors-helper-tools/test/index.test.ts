import {
  cht,
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

describe('Test Chainable API', () => {
  test('instantiate and output', () => {
    const color = cht('#ff0000');
    expect(color.hex()).toBe('#ff0000');
    expect(color.rgb()).toEqual({ red: 255, green: 0, blue: 0 });
    const hsl = color.hsl();
    expect(hsl.h).toBeCloseTo(0);
    expect(hsl.s).toBeCloseTo(1);
    expect(hsl.l).toBeCloseTo(0.5);
  });

  test('hsv output', () => {
    const color = cht('#ff0000');
    const hsv = color.hsv();
    expect(hsv.h).toBeCloseTo(0);
    expect(hsv.s).toBeCloseTo(1);
    expect(hsv.v).toBeCloseTo(1);
  });

  test('lighten', () => {
    const lightened = cht('#808080').lighten(0.2).hex();
    expect(lightened).toBe('#b3b3b3');
  });

  test('darken', () => {
    const darkened = cht('#808080').darken(0.2).hex();
    expect(darkened).toBe('#4d4d4d');
  });

  test('complementary', () => {
    const comp = cht('#ff0000').complementary().hex();
    expect(comp).toBe('#00ffff');
  });

  test('full chain', () => {
    const result = cht('#ff0000').darken(0.1).complementary().lighten(0.2).hex();
    expect(result).toBe('#99ffff');
  });

  test('monochromatic palette', () => {
    const palette = cht('#ff0000').palette('monochromatic', 4);
    const hexPalette = palette.map(c => c.hex());
    expect(hexPalette.length).toBe(4);
    expect(hexPalette).toEqual(['#660000', '#cc0000', '#ff3333', '#ff9999']);
  });

  test('complementary palette', () => {
    const palette = cht('#ff0000').palette('complementary');
    const hexPalette = palette.map(c => c.hex());
    expect(hexPalette).toEqual(['#ff0000', '#00ffff']);
  });

  test('analogous palette', () => {
    const palette = cht('#ff0000').palette('analogous');
    const hexPalette = palette.map(c => c.hex());
    expect(hexPalette).toEqual(['#ff0000', '#ff8000', '#ff0080']);
  });

  test('triadic palette', () => {
    const palette = cht('#ff0000').palette('triadic');
    const hexPalette = palette.map(c => c.hex());
    expect(hexPalette).toEqual(['#ff0000', '#00ff00', '#0000ff']);
  });

  test('split-complementary palette', () => {
    const palette = cht('#ff0000').palette('split-complementary');
    const hexPalette = palette.map(c => c.hex());
    expect(hexPalette).toEqual(['#ff0000', '#00ff80', '#0080ff']);
  });

  test('contrast ratio', () => {
    const white = cht('#ffffff');
    const black = cht('#000000');
    const red = cht('#ff0000');
    const blue = cht('#0000ff');

    expect(white.contrast(black)).toBeCloseTo(21);
    expect(white.contrast('#ffffff')).toBeCloseTo(1);
    expect(red.contrast(blue)).toBeCloseTo(2.1489);
  });

  test('shades palette', () => {
    const palette = cht('#3498db').palette('shades', 3);
    const hexPalette = palette.map((c) => c.hex());
    expect(hexPalette).toEqual(['#3498db', '#1b6799', '#0e334d']);
  });

  test('tints palette', () => {
    const palette = cht('#3498db').palette('tints', 3);
    const hexPalette = palette.map(c => c.hex());
    expect(hexPalette).toEqual(['#3498db', '#78bae7', '#bbddf3']);
  });

  test('tones palette', () => {
    const palette = cht('#3498db').palette('tones', 3);
    const hexPalette = palette.map(c => c.hex());
    expect(hexPalette).toEqual(['#3498db', '#5093bf', '#6c8da3']);
  });
});