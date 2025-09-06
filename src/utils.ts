import * as fs from 'fs';
import { Color, HslColor } from './types';

/**
 *
 * @param color 0 ~ 255
 * @returns hex string
 */
const toHex = (color: number) => {
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
function toHexColor(red: number, green: number, blue: number): string {
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
 * @param min, max number
 * @returns random number between min max
 */
function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min) + min);
}

/**
 * hex color string to rgb object
 * @param hex string hex (ex. #ffffff)
 * @returns {red, green, blue}
 */
function toRgb(hex: string): Color {
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
 * @param num color number (0 ~ 255)
 * @returns boolean
 */
function checkRangeColor(num: number) {
  return Number.isInteger(num) && num <= 255 && num >= 0;
}

/**
 *
 * @param prefix file name prefix
 * @param extension file_name.extension
 * @returns file name String
 */
const generateFileName = (prefix: string, extension: string): string => {
  const now = new Date();
  const timestamp = now.toISOString().replace(/[:.]/g, '-');
  return `${prefix}-${timestamp}.${extension}`;
};

/**
 *
 * @param filePath file output path
 * @param content String to output
 */
const writeStringToFile = (filePath: string, content: string): void => {
  fs.writeFile(filePath, content, err => {
    if (err) {
      console.error('Error writing to file:', err);
    } else {
      console.log('File has been written successfully.');
    }
  });
};

function rgbToHsl(rgb: Color): HslColor {
  const r = rgb.red / 255;
  const g = rgb.green / 255;
  const b = rgb.blue / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  let l = (max + min) / 2;

  if (max === min) {
    h = s = 0; // achromatic
  } else {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }

  return { h, s, l };
}

function hslToRgb(hsl: HslColor): Color {
  const { h, s, l } = hsl;
  let r, g, b;

  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const c = (1 - Math.abs(2 * l - 1)) * s;
    const x = c * (1 - Math.abs(((h * 6) % 2) - 1));
    const m = l - c / 2;

    if (h >= 0 && h < 1 / 6) {
      r = c;
      g = x;
      b = 0;
    } else if (h >= 1 / 6 && h < 2 / 6) {
      r = x;
      g = c;
      b = 0;
    } else if (h >= 2 / 6 && h < 3 / 6) {
      r = 0;
      g = c;
      b = x;
    } else if (h >= 3 / 6 && h < 4 / 6) {
      r = 0;
      g = x;
      b = c;
    } else if (h >= 4 / 6 && h < 5 / 6) {
      r = x;
      g = 0;
      b = c;
    } else {
      r = c;
      g = 0;
      b = x;
    }
    r = r + m;
    g = g + m;
    b = b + m;
  }

  return {
    red: Math.round(r * 255),
    green: Math.round(g * 255),
    blue: Math.round(b * 255),
  };
}

function getLuminance(rgb: Color): number {
  const a = [rgb.red, rgb.green, rgb.blue].map(v => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
}


export {
  getRandomNumber,
  toRgb,
  toHex,
  toHexColor,
  checkRangeColor,
  writeStringToFile,
  generateFileName,
  rgbToHsl,
  hslToRgb,
  getLuminance,
};
