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
      entryFileNames: '[name].cjs', // 또는 [name].[format].js 같은 방식으로 설정 가능
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
      // CommonJS 모듈을 ESM으로 변환할 때 필요한 설정
      include: 'node_modules/**',
      transformMixedEsModules: true,
      requireReturnsDefault: 'auto',
    }),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: 'dist/types',
      exclude: ['node_modules/**'],
    }),
  ],
});
