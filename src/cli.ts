#!/usr/bin/env node

import { Command } from 'commander';
import { input, select, confirm } from '@inquirer/prompts';

import { getRandomColorRgb, getRandomColorHex } from '.';
import { VERSION } from './constant';
import { generateFileName, writeStringToFile } from './utils';

// import fs from 'fs';
// import path from 'path';

// const packageJsonPath = path.join(__dirname, '../package.json');

// const packageJsonData = fs.readFileSync(packageJsonPath, 'utf-8');
// const packageJsonObject = JSON.parse(packageJsonData);
// const version = packageJsonObject.version;

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

program.parse();

export {};
