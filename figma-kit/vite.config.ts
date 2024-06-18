/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dts from 'vite-plugin-dts';
import tsconfigPaths from 'vite-tsconfig-paths';

const extensions: Record<string, string> = {
  cjs: 'cjs',
  es: 'mjs',
};

export default defineConfig((env) => {
  return {
    plugins: [tsconfigPaths(), react(), dts({ rollupTypes: true })],

    build: {
      cssCodeSplit: true,
      emptyOutDir: env.mode !== 'development',
      lib: {
        entry: 'src/index.ts',
        formats: ['es', 'cjs'],
        name: 'figma-kit',
        fileName: (format, entryName) => {
          return `${entryName}.${extensions[format]}`;
        },
      },
      rollupOptions: {
        external: ['react', 'react-dom', 'react/jsx-runtime'],
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
          },
        },
      },
    },
    test: {
      environment: 'happy-dom',
      setupFiles: './test/setup.ts',
    },
  };
});
