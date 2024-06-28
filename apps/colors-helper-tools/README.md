# 🎨 colors-helper-tools

We help you use color.

## Version Info

| version | node version |
| ------- | ------------ |
| 1.0.0+  | 14+          |

## Installation

```bash
# npm
$ npm install --save colors-helper-tools

# yarn
$ yarn add colors-helper-tools
```

## test functions

```bash
$ npm run test
```

## CLI

- you can get random colors with cli

```sh
npx cht -h
```

### return types are Hex string or Color type

```typescript
type Color = {
  red: number;
  green: number;
  blue: number;
};
```

## functions

### toRgb

- hex color string to rgb object

### toHex

- make number to hex string

### toHexColor

- make numbers to hex color string

### complementaryColorHex

- get complementary color hex string

### complementaryColorRgb

- get complementary color object

### random color parms options (enum)

```ts
export enum RandomColorType {
  red = 'red',
  green = 'green',
  blue = 'blue',
  all = 'all',
}
```

### getRandomColorHex

- get random color hex string
- give params (red, green, blue) to get concrete random color hex

### getRandomColorRgb

- get random color object
- give params (red, green, blue) to get concrete random color object

### pasteltoneRgb

- get random pastel tone color
- return Color type

### pasteltoneHex

- get random pastel tone color
- return hex string

### neutraltoneRgb

- get random neutral tone color
- return Color type

### neutraltoneHex

- get random neutral tone color
- return hex string

### getColorByStepRgbGen

- Returns a generator function that sequentially intensifies the returned Color object

```ts
const fn = getColorByStepRgbGen(50)(); // generator
for (let i = 0; i < 10; i++) {
  console.log(fn.next().value); // Color object
}
```

### getColorByStepHexGen

- Returns a generator function that sequentially intensifies the returned color hex string

```ts
const fn = getColorByStepHexGen(50)(); // generator
for (let i = 0; i < 10; i++) {
  console.log(fn.next().value); // hex string
}
```

### getColorByStepRgb

- You can use getColorByStepRgbGen without understanding generator functions.

```ts
const fn = getColorByStepRgb(50); // function
for (let i = 0; i < 10; i++) {
  console.log(fn()); // Color object
}
```

### getColorByStepHex

- You can use getColorByStepHexGen without understanding generator functions.

```ts
const fn = getColorByStepHex(50); // function
for (let i = 0; i < 10; i++) {
  console.log(fn()); // hex string
}
```

#### 🎈 examples

- <a href="./examples/emotion_example.tsx">emotion</a>
- <a href="./examples/jsx_inline_example.tsx">jsx_inline</a>
- <a href="./examples/react_memo_example.tsx">react_memo</a>
- <a href="./examples/complementary_example.tsx">complementary_color</a>

#### ETC

- git push github action config example
  - <a href="./examples/push_example.yml">push_example.yml</a>
