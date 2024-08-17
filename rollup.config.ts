import { defineConfig } from 'rollup';
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
      // minifyInternalExports: true,
      // sourcemap: true,
      entryFileNames: '[name].cjs', // 또는 [name].[format].js 같은 방식으로 설정 가능
    },
    {
      dir: 'dist',
      format: 'es',
      // minifyInternalExports: true,
      // sourcemap: true,
      entryFileNames: '[name].mjs',
    },
  ],
  plugins: [
    typescript({
      declaration: true,
      declarationDir: 'dist/types',
      exclude: ['node_modules/**'],
    }),
  ],
});
