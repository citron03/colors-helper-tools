#!/usr/bin/env node

import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';


import cht, { getRandomColorRgb, getRandomColorHex } from '.';
import { VERSION } from './constant';
import { generateFileName, writeStringToFile } from './utils';
import * as readlineSync from 'readline-sync';
import prompts from 'prompts';


yargs(hideBin(process.argv))
  .scriptName('colors-helper-tools')
  .usage('Usage: $0 <command> [options]')
  .version(VERSION)
  .command(
    'random [number]',
    'Get Random N Colors (default HEX)',
    (yargs) => {
      yargs
        .positional('number', {
          describe: 'number you want to get (default 1)',
          default: 1,
          type: 'number',
        })
        .option('rgb', {
          alias: 'r',
          type: 'boolean',
          description: 'get rgb colors',
        })
        .option('file', {
          alias: 'f',
          type: 'boolean',
          description: 'save colors to a file',
        });
    },
    (argv: any) => {
      const isRgb = !!argv.rgb;
      const colors = [];
      for (let i = 0; i < Number(argv.number); i++) {
        let color = '';
        if (isRgb) {
          const rgb = getRandomColorRgb();
          color += `rgb: ${rgb.red} ${rgb.green} ${rgb.blue}`;
        } else {
          color = getRandomColorHex();
        }
        colors.push(color);
      }
      if (argv.file) {
        const fileName = generateFileName('random', 'txt');
        writeStringToFile(`./${fileName}`, colors.join('\n'));
      } else {
        console.log(colors.join(' '));
      }
    }
  )
  .command(
    'get_random',
    'Get Random N Colors by inquiry',
    () => {},
    async () => {
      const number = readlineSync.question('How many colors do you want to generate? (default is 1)', { defaultInput: '1' });

      const { format } = await prompts({
        type: 'select',
        name: 'format',
        message: 'Which color format do you want?',
        choices: [
          { title: 'HEX', value: 'HEX' },
          { title: 'RGB', value: 'RGB' },
        ],
      });

      const saveToFile = readlineSync.keyInYNStrict('Do you want to save the colors to a file?');

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
    }
  )
  .command(
    'palette <type> <color> [count]',
    'Generate a color palette',
    (yargs) => {
      yargs
        .positional('type', {
          describe: 'The type of palette to generate',
          type: 'string',
        })
        .positional('color', {
          describe: 'The base color (hex or rgb)',
          type: 'string',
        })
        .positional('count', {
          describe: 'Number of colors for monochromatic palette (default 3)',
          default: 3,
          type: 'number',
        });
    },
    (argv: any) => {
      try {
        const palette = cht(argv.color).palette(argv.type, argv.count);
        console.log(palette.map((c) => c.hex()).join(' '));
      } catch (error) {
        console.error(`Error generating palette: ${(error as Error).message}`);
      }
    }
  )
  .command(
    'contrast <color1> <color2>',
    'Calculate contrast ratio between two colors',
    (yargs) => {
      yargs
        .positional('color1', {
          describe: 'First color (hex or rgb)',
          type: 'string',
        })
        .positional('color2', {
          describe: 'Second color (hex or rgb)',
          type: 'string',
        });
    },
    (argv: any) => {
      try {
        const ratio = cht(argv.color1).contrast(argv.color2);
        console.log(`Contrast Ratio: ${ratio.toFixed(2)}`);
      } catch (error) {
        console.error(`Error calculating contrast: ${(error as Error).message}`);
      }
    }
  )
  .command(
    'convert <color>',
    'Convert color to a specified format',
    (yargs) => {
      yargs
        .positional('color', {
          describe: 'The color to convert (hex or rgb)',
          type: 'string',
        })
        .option('to', {
          alias: 't',
          describe: 'Format to convert to (hex, rgb, hsl)',
          default: 'hex',
          choices: ['hex', 'rgb', 'hsl'],
          type: 'string',
        });
    },
    (argv: any) => {
      try {
        let convertedColor;
        const chtColor = cht(argv.color);
        switch (argv.to) {
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
        console.error(`Error converting color: ${(error as Error).message}`);
      }
    }
  )
  .demandCommand(1, 'You need at least one command before moving on')
  .help()
  .parse();
