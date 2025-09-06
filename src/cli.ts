#!/usr/bin/env node

import { Command } from 'commander';
import { input, select, confirm } from '@inquirer/prompts';

import cht, { getRandomColorRgb, getRandomColorHex } from '.';
import { VERSION } from './constant';
import { generateFileName, writeStringToFile } from './utils';

const program = new Command();

program
  .name('colors-helper-tools')
  .description('colors-helper-tools helps you control colors !')
  .version(`colors-helper-tools version 🎶 ${VERSION}`);

program
  .command('random')
  .description('Get Random N Colors (default HEX)')
  .argument('[number]', 'number you want to get (default 1)', '1')
  .option('-r, --rgb', 'get rgb colors')
  .option('-f, --file', 'get rgb colors')
  .action((number, options) => {
    const isRgb = !!options.rgb;
    const colors = [];
    for (let i = 0; i < Number(number); i++) {
      let color = '';
      if (isRgb) {
        const rgb = getRandomColorRgb();
        color += `rgb: ${rgb.red} ${rgb.green} ${rgb.blue}`;
      } else {
        color = getRandomColorHex();
      }
      colors.push(color);
    }
    if (options.file) {
      const fileName = generateFileName('random', 'txt');
      writeStringToFile(`./${fileName}`, colors.join('\n'));
    } else {
      console.log(colors.join(' '));
    }
  });

program
  .command('get_random')
  .description('Get Random N Colors by inquiry')
  .action(async () => {
    // Step-by-step prompts using individual calls to input/select/confirm
    const number = await input({
      message: 'How many colors do you want to generate? (default is 1)',
      default: '1',
    });

    const format = await select({
      message: 'Which color format do you want?',
      choices: [
        { name: 'HEX', value: 'HEX' },
        { name: 'RGB', value: 'RGB' },
      ],
    });

    const saveToFile = await confirm({
      message: 'Do you want to save the colors to a file?',
      default: false,
    });

    const colors = [];
    const count = parseInt(number, 10);
    for (let i = 0; i < count; i++) {
      let color;
      if (format === 'RGB') {
        const rgb = getRandomColorRgb();
        color = `rgb: ${rgb.red} ${rgb.green} ${rgb.blue}`;
      } else {
        color = getRandomColorHex();
      }
      colors.push(color);
    }

    if (saveToFile) {
      const fileName = generateFileName('random', 'txt');
      writeStringToFile(`./${fileName}`, colors.join('\n'));
      console.log(`Colors saved to ${fileName}`);
    } else {
      console.log(colors.join(' '));
    }
  });

program
  .command('palette <type> <color>')
  .description('Generate a color palette')
  .argument('[count]', 'Number of colors for monochromatic palette (default 3)', '3')
  .action((type, color, count) => {
    try {
      const palette = cht(color).palette(type, parseInt(count, 10));
      console.log(palette.map(c => c.hex()).join(' '));
    } catch (error) {
      console.error(`Error generating palette: ${error.message}`);
    }
  });

program
  .command('contrast <color1> <color2>')
  .description('Calculate contrast ratio between two colors')
  .action((color1, color2) => {
    try {
      const ratio = cht(color1).contrast(color2);
      console.log(`Contrast Ratio: ${ratio.toFixed(2)}`);
    } catch (error) {
      console.error(`Error calculating contrast: ${error.message}`);
    }
  });

program
  .command('convert <color>')
  .description('Convert color to a specified format')
  .option('--to <format>', 'Format to convert to (hex, rgb, hsl)', 'hex')
  .action((color, options) => {
    try {
      let convertedColor;
      const chtColor = cht(color);
      switch (options.to) {
        case 'hex':
          convertedColor = chtColor.hex();
          break;
        case 'rgb':
          const rgb = chtColor.rgb();
          convertedColor = `rgb(${rgb.red}, ${rgb.green}, ${rgb.blue})`;
          break;
        case 'hsl':
          const hsl = chtColor.hsl();
          convertedColor = `hsl(${Math.round(hsl.h * 360)}, ${Math.round(hsl.s * 100)}%, ${Math.round(hsl.l * 100)}%)`;
          break;
        default:
          throw new Error('Invalid format. Use hex, rgb, or hsl.');
      }
      console.log(convertedColor);
    } catch (error) {
      console.error(`Error converting color: ${error.message}`);
    }
  });

program.parse();

export {};