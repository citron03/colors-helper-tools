type Color = {
  red: number;
  green: number;
  blue: number;
};

enum RandomColorType {
  red = 'red',
  green = 'green',
  blue = 'blue',
  all = 'all',
}

type RgbOrder = 'red' | 'green' | 'blue';

export { Color, RandomColorType, RgbOrder };
