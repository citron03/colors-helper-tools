import { defineConfig } from 'rollup';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from '@rollup/plugin-typescript';

export default defineConfig({
  input: {
    index: 'index.ts',
    cli: 'src/cli.ts',
  },
  output: [
    {
      dir: 'dist',
      format: 'cjs',
      minifyInternalExports: true,
      sourcemap: true,
      entryFileNames: '[name].cjs', // 또는 [name].[format].js 같은 방식으로 설정 가능
      exports: 'default',
    },
    {
      dir: 'dist',
      format: 'es',
      minifyInternalExports: true,
      sourcemap: true,
      entryFileNames: '[name].mjs',
    },
  ],
  plugins: [
    resolve(),
    commonjs({
      // CommonJS 모듈을 ESM으로 변환할 때 필요한 설정
      include: 'node_modules/**',
    }),
    typescript({
      tsconfig: './tsconfig.json',
      declaration: true,
      declarationDir: 'dist/types',
      exclude: ['node_modules/**'],
    }),
  ],
});
