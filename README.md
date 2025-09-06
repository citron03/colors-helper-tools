# 🎨 colors-helper-tools Monorepo

This is a monorepo containing the `colors-helper-tools` library and its documentation site.

[![npm version](https://badge.fury.io/js/colors-helper-tools.svg)](https://badge.fury.io/js/colors-helper-tools)

## Monorepo Structure

- `packages/colors-helper-tools`: The core color manipulation library.
- `packages/docs`: The documentation website built with Next.js.

## Installation

To set up the monorepo, clone the repository and install dependencies using pnpm:

```bash
git clone https://github.com/citron03/colors-helper-tools.git
cd colors-helper-tools
pnpm install
```

## Quick Start (colors-helper-tools library)

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

console.log(newColor); // e.g., 'e.g., #84e85a'
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

### Analysis Methods

- `.contrast(anotherColor)`: Calculates the WCAG contrast ratio between the current color and another. Returns a value from 1 to 21.
  - `anotherColor`: Can be a hex string, an RGB object, or another Cht instance.

  ```ts
  const white = cht('#FFFFFF');
  const black = cht('#000000');
  const ratio = white.contrast(black); // 21
  ```

### Output Methods

These methods return the final color value in the desired format.

- `.hex()`: Returns the color as a hex string (e.g., `#ffffff`).
- `.rgb()`: Returns the color as an RGB object (e.g., `{ red: 255, green: 255, blue: 255 }`).
- `.hsl()`: Returns the color as an HSL object (e.g., `{ h: 0.5, s: 1, l: 0.5 }`).
- `.hsv()`: Returns the color as an HSV object (e.g., `{ h: 0.5, s: 1, v: 0.5 }`).

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

To run the CLI from the monorepo root:

```sh
# Get help
pnpm --filter colors-helper-tools cht -h

# Generate a random color
pnpm --filter colors-helper-tools cht random

# Generate a triadic palette from a base color
pnpm --filter colors-helper-tools cht palette triadic #ff0000

# Calculate contrast ratio between two colors
pnpm --filter colors-helper-tools cht contrast #ffffff #000000

# Convert a color to HSL format
pnpm --filter colors-helper-tools cht convert #3498db --to hsl
```

## Documentation Site

The documentation site is located in `packages/docs`. To run it locally:

```bash
cd packages/docs
pnpm dev
```

For comprehensive guides, API references, and examples, please visit our official documentation site. (Link will be updated once deployed)

## Examples

Examples are now integrated into the documentation site. Please refer to the documentation site for usage examples.

## License

This project is licensed under the [MIT License](./LICENSE).