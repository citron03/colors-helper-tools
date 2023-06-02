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
  return function* () {
    while (true) {
      color.red = color.red + step <= 255 ? color.red + step : 0;
      color.green = color.green + step <= 255 ? color.green + step : 0;
      color.blue = color.blue + step <= 255 ? color.blue + step : 0;
      yield color;
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
  return function* () {
    while (true) {
      color.red = color.red + step <= 255 ? color.red + step : 0;
      color.green = color.green + step <= 255 ? color.green + step : 0;
      color.blue = color.blue + step <= 255 ? color.blue + step : 0;
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
