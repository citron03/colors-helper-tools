# 🎨 colors-helper-tools

A lightweight and powerful TypeScript library for all your color manipulation and generation needs. Make your development more colorful! ✨

[![npm version](https://badge.fury.io/js/colors-helper-tools.svg)](https://badge.fury.io/js/colors-helper-tools)

## Installation

```bash
# npm
$ npm install --save colors-helper-tools

# yarn
$ yarn add colors-helper-tools
```

## Quick Start

Easily manipulate colors to fit your design needs.

```ts
import { lightenHex, complementaryColorHex } from 'colors-helper-tools';

const primaryColor = '#8A2BE2'; // BlueViolet

// Get a 20% lighter version of your color
const lightenedColor = lightenHex(primaryColor, 0.2);
console.log(lightenedColor); // '#a85ee8'

// Get the complementary color
const complementary = complementaryColorHex(primaryColor);
console.log(complementary); // '#75e22b'
```

## API Reference

All functions are available for both Hex strings and RGB color objects (e.g., `lightenHex` and `lightenRgb`).

### Color Generation

- `getRandomColorHex()` / `getRandomColorRgb()`: Generates a completely random color.
  - Optional `RandomColorType` parameter (`red`, `green`, `blue`) can be passed to get a color within that specific range.

- `pasteltoneHex()` / `pasteltoneRgb()`: Generates a random, soft pastel color.

- `neutraltoneHex()` / `neutraltoneRgb()`: Generates a random neutral grayscale color.

### Color Manipulation

- `lightenHex(hex, amount)` / `lightenRgb(rgb, amount)`: Makes a color lighter. `amount` is a value from 0 to 1.
  ```ts
  const lighterRed = lightenHex('#ff0000', 0.2); // '#ff6666'
  ```

- `darkenHex(hex, amount)` / `darkenRgb(rgb, amount)`: Makes a color darker. `amount` is a value from 0 to 1.

### Color Relationships

- `complementaryColorHex(hex)` / `complementaryColorRgb(rgb)`: Returns the complementary color.

### Advanced Utilities

- `getColorByStepHex(step)` / `getColorByStepRgb(step)`: Returns a function that provides a new color on each call, incrementing by the given `step` value. Useful for generating procedural color schemes without using generators directly.
  ```ts
  const getNextColor = getColorByStepHex(50);
  console.log(getNextColor()); // '#320000'
  console.log(getNextColor()); // '#323200'
  ```

- `getColorByStepHexGen(step)` / `getColorByStepRgbGen(step)`: Returns a generator function that yields a new color on each call, incrementing by the given `step`.

## Command Line Interface (CLI)

This package also includes a handy CLI for quick color operations right in your terminal.

```sh
# Get help
npx cht -h

# Generate a random color
npx cht random
```

## Examples

See real-world usage examples for different environments:
- <a href="./examples/emotion_example.tsx">Emotion (CSS-in-JS)</a>
- <a href="./examples/jsx_inline_example.tsx">React Inline Styles</a>
- <a href="./examples/react_memo_example.tsx">React with `React.memo`</a>
- <a href="./examples/complementary_example.tsx">Complementary Colors</a>

## License

This project is licensed under the [MIT License](./LICENSE).
