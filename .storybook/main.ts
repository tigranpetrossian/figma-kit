import type { StorybookConfig } from '@storybook/react-vite';
import tsconfigPaths from 'vite-tsconfig-paths';

const config: StorybookConfig = {
  stories: ['../figma-kit/src/**/*.mdx', '../figma-kit/src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  docs: {
    defaultName: 'Documentation',
  },
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    {
      name: '@storybook/addon-storysource',
      options: {
        loaderOptions: {
          injectStoryParameters: false,
        },
      },
    },
    //'@storybook/addon-interactions',
    'storybook-dark-mode',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  async viteFinal(config) {
    const { mergeConfig } = await import('vite');

    return mergeConfig(config, {
      plugins: [tsconfigPaths()],
    });
  },
};

export default config;
