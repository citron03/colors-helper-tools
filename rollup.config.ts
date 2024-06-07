import { defineConfig } from 'rollup';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import terser from '@rollup/plugin-terser';

export default defineConfig({
  input: 'index.ts',
  output: [
    {
      file: 'dist/index.js',
      format: 'cjs',
      minifyInternalExports: true,
    },
    {
      file: 'dist/index.min.js',
      format: 'iife',
      name: 'version',
      plugins: [terser()],
    },
  ],
  plugins: [typescript(), json()],
});
