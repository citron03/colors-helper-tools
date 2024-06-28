import { defineConfig } from 'rollup';
import typescript from '@rollup/plugin-typescript';

export default defineConfig({
  input: {
    index: 'index.ts',
    cli: 'src/cli.ts',
  },
  output: {
    dir: 'dist',
    format: 'cjs',
    minifyInternalExports: true,
  },
  plugins: [
    typescript({
      declaration: true,
      declarationDir: 'dist/types',
      exclude: ['node_modules/**'],
    }),
  ],
});
