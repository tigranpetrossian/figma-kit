import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import { dependencies, peerDependencies } from './package.json';

const externalDependencies = [...Object.keys(dependencies), ...Object.keys(peerDependencies)];

function isExternal(id: string) {
  return externalDependencies.some((dependency) => id === dependency || id.startsWith(`${dependency}/`));
}

const extensions: Record<string, string> = {
  cjs: 'cjs',
  es: 'mjs',
};

export default defineConfig((env) => {
  return {
    plugins: [react()],
    resolve: {
      tsconfigPaths: true,
    },

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
      rolldownOptions: {
        external: isExternal,
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
