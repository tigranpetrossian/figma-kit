import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.stories.@(ts|tsx)'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  typescript: {
    reactDocgen: false,
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      resolve: {
        tsconfigPaths: true,
      },
    });
  },
};

export default config;
