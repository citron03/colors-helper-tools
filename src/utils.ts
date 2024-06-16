import * as fs from 'fs';
import { Color } from './types';

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

export {
  getRandomNumber,
  toRgb,
  toHex,
  toHexColor,
  checkRangeColor,
  writeStringToFile,
  generateFileName,
};
