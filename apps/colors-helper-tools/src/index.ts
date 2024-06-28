import { Color, RandomColorType, RgbOrder } from './types';
import { checkRangeColor, getRandomNumber, toHexColor, toRgb } from './utils';

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

/**
 * get random neutral tone color rgb same (r, g, b)
 * @returns {red, green, blue}
 */
export function neutraltoneRgb(): Color {
  const color = getRandomNumber(0, 255);
  return { red: color, green: color, blue: color };
}

/**
 * get random neutral tone color hex string same (r, g, b)
 * @returns neutral tone color hex string
 */
export function neutraltoneHex(): string {
  const color = getRandomNumber(0, 255);
  return toHexColor(color, color, color);
}

/**
 *
 * @param step Takes a step(number) and returns a generator function
 * @returns Returns the generator function. Each time the generator function is called, it returns a Color rgb object that is as dark as the input step.
 */
export function getColorByStepRgbGen(
  step: number,
): () => Generator<Color, never, unknown> {
  if (step > 255) {
    throw new Error('step must be lower than 256');
  } else if (step < 0) {
    throw new Error('step must be greater than 0');
  }
  const color: Color = { red: 0, green: 0, blue: 0 };
  let order: RgbOrder = 'red';
  return function* () {
    while (true) {
      if (order === 'red') {
        color.red = checkRangeColor(color.red + step) ? color.red + step : 0;
        order = 'green';
      } else if (order === 'green') {
        color.green = checkRangeColor(color.green + step)
          ? color.green + step
          : 0;
        order = 'blue';
      } else if (order === 'blue') {
        color.blue = checkRangeColor(color.blue + step) ? color.blue + step : 0;
        order = 'red';
      } else {
        throw Error('unexpected RGB order');
      }
      yield { ...color };
    }
  };
}

/**
 *
 * @param step Input the step(number) to be used in the generator function.
 * @returns Automatically returns a progressively darker Color rgb object when calling the function so that you can use this feature without understanding generator functions.
 */
export function getColorByStepRgb(step: number = 5) {
  const generator = getColorByStepRgbGen(step)();
  return function () {
    return generator.next().value;
  };
}

/**
 *
 * @param step Takes a step(number) and returns a generator function
 * @returns Returns the generator function. Each time the generator function is called, it returns a color hex string that is as dark as the input step.
 */
export function getColorByStepHexGen(
  step: number,
): () => Generator<string, never, unknown> {
  if (step > 255) {
    throw new Error('step must be lower than 256');
  } else if (step < 0) {
    throw new Error('step must be greater than 0');
  }
  const color: Color = { red: 0, green: 0, blue: 0 };
  let order: RgbOrder = 'red';
  return function* () {
    while (true) {
      if (order === 'red') {
        color.red = checkRangeColor(color.red + step) ? color.red + step : 0;
        order = 'green';
      } else if (order === 'green') {
        color.green = checkRangeColor(color.green + step)
          ? color.green + step
          : 0;
        order = 'blue';
      } else if (order === 'blue') {
        color.blue = checkRangeColor(color.blue + step) ? color.blue + step : 0;
        order = 'red';
      } else {
        throw Error('unexpected RGB order');
      }
      yield toHexColor(color.red, color.green, color.blue);
    }
  };
}

/**
 *
 * @param step Input the step(number) to be used in the generator function.
 * @returns Automatically returns a progressively darker color hex string when calling the function so that you can use this feature without understanding generator functions.
 */
export function getColorByStepHex(step: number = 5) {
  const generator = getColorByStepHexGen(step)();
  return function () {
    return generator.next().value;
  };
}
