# colors-helper-tools

[![npm version](https://img.shields.io/npm/v/colors-helper-tools.svg)](https://www.npmjs.com/package/colors-helper-tools)
[![npm downloads](https://img.shields.io/npm/dm/colors-helper-tools.svg)](https://www.npmjs.com/package/colors-helper-tools)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A versatile library and CLI tool to help you work with colors, generate palettes, calculate contrast, and more. ✨

## Features

- **Fluent API**: Chain methods for intuitive color manipulation.
- **Color Conversion**: Convert between `HEX`, `RGB`, `HSL`, and `HSV`.
- **Color Modification**: Easily `lighten`, `darken`, or get a `complementary` color.
- **Palette Generation**: Create various types of color palettes:
  - `monochromatic`
  - `complementary`
  - `analogous`
  - `triadic`
  - `split-complementary`
  - `shades`
  - `tints`
  - `tones`
- **Contrast Calculation**: Check the accessibility of your color combinations by calculating the contrast ratio.
- **Random Colors**: Generate random colors, including pastel and neutral tones.
- **CLI Tool**: Access most features directly from your terminal.

## Installation

```bash
npm install colors-helper-tools
```

## Usage as a Library

The library exposes a main function `cht` which wraps a color and allows you to use the fluent API.

```javascript
import cht, { getRandomColorHex } from 'colors-helper-tools';

// --- Basic Usage ---
const myColor = cht('#3498db');

console.log(myColor.hex()); // #3498db
console.log(myColor.rgb()); // { red: 52, green: 152, blue: 219 }

// --- Chaining Methods ---
const lightenedComplementary = cht('#3498db')
  .complementary()
  .lighten(0.2)
  .hex();
console.log(lightenedComplementary); // #ffde99 (example output)

// --- Palette Generation ---
const triadicPalette = cht('#e74c3c').palette('triadic');
console.log(triadicPalette.map(c => c.hex())); // ['#e74c3c', '#3ce74c', '#4c3ce7'] (example output)

// --- Contrast Calculation ---
const contrastRatio = cht('#ffffff').contrast('#3498db');
console.log(contrastRatio.toFixed(2)); // 4.26

// --- Random Colors ---
const randomColor = getRandomColorHex();
console.log(randomColor); // e.g., #a8d8b2
```

## Usage as a CLI

You can also use the `cht` command line tool.

```bash
# Get 3 random HEX colors
cht random 3

# Get 5 random RGB colors and save them to a file
cht random 5 --rgb --file

# Start an interactive prompt to get random colors
cht get_random

# Generate a 5-color monochromatic palette from a base color
cht palette monochromatic "#3498db" 5

# Get the contrast ratio between two colors
cht contrast "#ffffff" "#000000"

# Convert a color to HSL format
cht convert "#3498db" --to hsl
```

### CLI Commands

- `cht random [number] [--rgb] [--file]`: Get N random colors.
- `cht get_random`: Interactive prompt for generating random colors.
- `cht palette <type> <color> [count]`: Generate a color palette.
- `cht contrast <color1> <color2>`: Calculate contrast ratio.
- `cht convert <color> --to <format>`: Convert color format (hex, rgb, hsl).
- `cht --help`: Show all commands and options.

## Contributing

Contributions are welcome! Please feel free to submit a pull request or open an issue.

## License

This project is licensed under the MIT License.
