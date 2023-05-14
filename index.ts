export type Color = {
  red: number;
  green: number;
  blue: number;
};

/**
 * hex color string to rgb object
 * @param hex string hex (ex. #ffffff)
 * @returns {red, green, blue}
 */
export function toRgb(hex: string): Color {
  const rgb: Color = { red: 0, green: 0, blue: 0 };
  for (let i = 1; i < hex.length; i += 2) {
    const tmp = parseInt(`${hex[i]}${hex[i + 1]}`, 16);
    if (i === 1) {
      rgb.red = tmp;
    } else if (i === 3) {
      rgb.green = tmp;
    } else if (i === 5) {
      rgb.blue = tmp;
    }
  }
  return rgb;
}

/**
 *
 * @param color 0 ~ 255
 * @returns hex string
 */
export const toHex = (color: number) => {
  if (color < 0 || color > 255) {
    throw Error('invalid number');
  }
  let tmp = color.toString(16);
  if (tmp.length < 2) {
    tmp = '0' + tmp;
  }
  return tmp;
};

/**
 *
 * @param red 0 ~ 255
 * @param green 0 ~ 255
 * @param blue 0 ~ 255
 * @returns hex string rgb
 */
export function toHexColor(red: number, green: number, blue: number): string {
  if (
    red < 0 ||
    red > 255 ||
    green < 0 ||
    green > 255 ||
    blue < 0 ||
    blue > 255
  ) {
    throw Error('invalid number');
  }
  const hex = `#${toHex(red)}${toHex(green)}${toHex(blue)}`;
  return hex;
}

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

export enum RandomColorType {
  red = 'red',
  green = 'green',
  blue = 'blue',
  all = 'all',
}

/**
 * get random color object
 * @param RandomColorType red / green / blue / all
 * @returns random hex color object
 */
export function getRandomColorRgb(
  colorType: RandomColorType = RandomColorType.all,
): Color {
  // default all random
  let red = Math.floor(Math.random() * 256);
  let green = Math.floor(Math.random() * 256);
  let blue = Math.floor(Math.random() * 256);
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
