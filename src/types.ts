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

type HslColor = {
  h: number;
  s: number;
  l: number;
};

type HsvColor = {
  h: number;
  s: number;
  v: number;
};

export { Color, RandomColorType, RgbOrder, HslColor, HsvColor };
