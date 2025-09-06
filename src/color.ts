import { Color as ColorType } from './types';
import { toRgb, toHexColor, rgbToHsl, hslToRgb } from './utils';

// Helper to check if a value is a hex string
function isHex(value: any): value is string {
  return typeof value === 'string' && value.startsWith('#');
}

class Cht {
  private _rgb: ColorType;

  constructor(color: string | ColorType) {
    if (isHex(color)) {
      this._rgb = toRgb(color);
    } else if (typeof color === 'object' && 'red' in color) {
      this._rgb = color;
    } else {
      throw new Error('Invalid color format. Use hex string or RGB object.');
    }
  }

  /**
   * Returns the color as an RGB object.
   */
  rgb(): ColorType {
    return this._rgb;
  }

  /**
   * Returns the color as a hex string.
   */
  hex(): string {
    return toHexColor(this._rgb.red, this._rgb.green, this._rgb.blue);
  }

  /**
   * Lightens the color by a given amount.
   * @param amount The amount to lighten (0 to 1).
   * @returns The Cht instance for chaining.
   */
  lighten(amount: number): this {
    const hsl = rgbToHsl(this._rgb);
    hsl.l = Math.min(1, hsl.l + amount);
    this._rgb = hslToRgb(hsl);
    return this;
  }

  /**
   * Darkens the color by a given amount.
   * @param amount The amount to darken (0 to 1).
   * @returns The Cht instance for chaining.
   */
  darken(amount: number): this {
    const hsl = rgbToHsl(this._rgb);
    hsl.l = Math.max(0, hsl.l - amount);
    this._rgb = hslToRgb(hsl);
    return this;
  }

  /**
   * Converts the color to its complementary color.
   * @returns The Cht instance for chaining.
   */
  complementary(): this {
    this._rgb = {
      red: 255 - this._rgb.red,
      green: 255 - this._rgb.green,
      blue: 255 - this._rgb.blue,
    };
    return this;
  }

  /**
   * Generates a palette of colors based on the current color.
   * @param type The type of palette to generate.
   * @param count The number of colors in the palette (used by monochromatic).
   * @returns An array of new Cht instances.
   */
  palette(
    type: 'monochromatic' | 'complementary' | 'analogous' | 'triadic' | 'split-complementary',
    count: number = 3
  ): Cht[] {
    const palette: Cht[] = [new Cht(this.rgb())];
    const baseHsl = rgbToHsl(this._rgb);

    switch (type) {
      case 'monochromatic':
        palette.length = 0; // Reset for this type
        for (let i = 0; i < count; i++) {
          const lightness = (i + 1) / (count + 1);
          palette.push(new Cht(hslToRgb({ ...baseHsl, l: lightness })));
        }
        break;

      case 'complementary':
        palette.push(new Cht(hslToRgb({ ...baseHsl, h: (baseHsl.h + 0.5) % 1 })));
        break;

      case 'analogous':
        palette.push(new Cht(hslToRgb({ ...baseHsl, h: (baseHsl.h + 1 / 12) % 1 })));
        palette.push(new Cht(hslToRgb({ ...baseHsl, h: (baseHsl.h - 1 / 12 + 1) % 1 })));
        break;

      case 'triadic':
        palette.push(new Cht(hslToRgb({ ...baseHsl, h: (baseHsl.h + 1 / 3) % 1 })));
        palette.push(new Cht(hslToRgb({ ...baseHsl, h: (baseHsl.h + 2 / 3) % 1 })));
        break;

      case 'split-complementary':
        palette.push(new Cht(hslToRgb({ ...baseHsl, h: (baseHsl.h + 0.5 - 1 / 12 + 1) % 1 })));
        palette.push(new Cht(hslToRgb({ ...baseHsl, h: (baseHsl.h + 0.5 + 1 / 12) % 1 })));
        break;

      default:
        throw new Error(`Palette type '${type}' is not supported yet.`);
    }

    return palette;
  }
}

export default Cht;
