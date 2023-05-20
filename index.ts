import { Color, RandomColorType } from './src/types';
import { getRandomNumber, toHexColor, toRgb } from './src/utils';

/**
 * get complementary color object
 * @param rgb color rgb object
 * @returns complementary color rgb object
 */
export function complementaryColorRgb(rgb: Color): Color {
  const complementaryColor = {
    red: 255 - rgb.red,
    green: 255 - rgb.green,
    blue: 255 - rgb.blue,
  };
  return complementaryColor;
}

/**
 * get complementary color hex string
 * @param hex hex string
 * @returns complementary color hex string
 */
export function complementaryColorHex(hex: string): string {
  const rgb = toRgb(hex);
  const complementaryColor = {
    red: 255 - rgb.red,
    green: 255 - rgb.green,
    blue: 255 - rgb.blue,
  };
  return toHexColor(
    complementaryColor.red,
    complementaryColor.green,
    complementaryColor.blue,
  );
}

// TODO: give more versatile and accurate random color options

/**
 * get random color object
 * @param RandomColorType red / green / blue / all
 * @returns random hex color object
 */
export function getRandomColorRgb(
  colorType: RandomColorType = RandomColorType.all,
): Color {
  // default all random
  let red = getRandomNumber(0, 255);
  let green = getRandomNumber(0, 255);
  let blue = getRandomNumber(0, 255);
  if (colorType === RandomColorType.red) {
    green = 0;
    blue = 0;
  } else if (colorType === RandomColorType.green) {
    red = 0;
    blue = 0;
  } else if (colorType === RandomColorType.blue) {
    green = 0;
    blue = 0;
  }
  return { red, green, blue };
}

/**
 * get random color hex string
 * @param RandomColorType red / green / blue / all
 * @returns random hex color string
 */
export function getRandomColorHex(
  colorType: RandomColorType = RandomColorType.all,
): string {
  // default all random
  const { red, green, blue } = getRandomColorRgb(colorType);
  return toHexColor(red, green, blue);
}

/**
 * get random pastel tone color rgb (207 ~ 255)
 * @returns {red, green, blue}
 */
export function pasteltoneRgb(): Color {
  const red = getRandomNumber(207, 255);
  const green = getRandomNumber(207, 255);
  const blue = getRandomNumber(207, 255);
  return { red, green, blue };
}

/**
 * get random pastel tone color hex string (207 ~ 255)
 * @returns pastel tone color hex string
 */
export function pasteltoneHex(): string {
  const pastelRgb = pasteltoneRgb();
  return toHexColor(pastelRgb.red, pastelRgb.green, pastelRgb.blue);
}
