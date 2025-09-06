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

Meet the new, intuitive and chainable API. This is the recommended way to use the library.

```ts
import cht from 'colors-helper-tools';

const primaryColor = '#8A2BE2'; // BlueViolet

// Chain methods to get the perfect color
const newColor = cht(primaryColor)
  .lighten(0.1)
  .complementary()
  .darken(0.05)
  .hex();

console.log(newColor); // e.g., '#84e85a'
```

## API Reference

The primary export is the `cht` factory function, which creates a new color object that you can chain methods on.

`cht(color: string | { red: number, green: number, blue: number })`

### Chained Methods

These methods modify the color and return the instance for further chaining.

- `.lighten(amount: number)`: Makes the color lighter. `amount` is from 0 to 1.
- `.darken(amount: number)`: Makes the color darker. `amount` is from 0 to 1.
- `.complementary()`: Converts the color to its complementary color.
- `.palette(type, count)`: Generates a palette of colors. 
  - `type`: `'monochromatic'`, `'complementary'`, `'analogous'`, `'triadic'`, `'split-complementary'`.
  - `count`: The number of colors for the palette (only for `monochromatic`).

  ```ts
  const triadicPalette = cht('#ff0000').palette('triadic');
  // Returns an array of Cht objects: [red, green, blue]
  ```

### Output Methods

These methods return the final color value in the desired format.

- `.hex()`: Returns the color as a hex string (e.g., `#ffffff`).
- `.rgb()`: Returns the color as an RGB object (e.g., `{ red: 255, green: 255, blue: 255 }`).

---

### Standalone Functions (Legacy)

These functions are still available but the new chainable API is recommended.

- `lightenHex(hex, amount)` / `lightenRgb(rgb, amount)`
- `darkenHex(hex, amount)` / `darkenRgb(rgb, amount)`
- `complementaryColorHex(hex)` / `complementaryColorRgb(rgb)`
- `getRandomColorHex()` / `getRandomColorRgb()`
- `pasteltoneHex()` / `pasteltoneRgb()`
- `neutraltoneHex()` / `neutraltoneRgb()`
- `getColorByStepHex(step)` / `getColorByStepRgb(step)`
- `getColorByStepHexGen(step)` / `getColorByStepRgbGen(step)`

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
