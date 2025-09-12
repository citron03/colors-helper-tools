
import { defineConfig } from 'rollup';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';

export default defineConfig({
  input: {
    index: 'index.ts',
    cli: 'src/cli.ts',
  },
  output: [
    {
      dir: 'dist',
      format: 'cjs',
      sourcemap: true,
      entryFileNames: '[name].cjs',
      exports: 'auto',
    },
    {
      dir: 'dist',
      format: 'es',
      sourcemap: true,
      entryFileNames: '[name].mjs',
      exports: 'auto',
    },
  ],
  plugins: [
    resolve({
      mainFields: ['main', 'module'],
      preferBuiltins: true,
    }),
    json(),
    commonjs({
      include: 'node_modules/**',
      transformMixedEsModules: true,
    }),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: 'dist/types',
      exclude: ['node_modules/**'],
    }),
  ],
});
