import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../figma-primitives/src/**/*.mdx', '../figma-primitives/src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: [
    '@storybook/addon-onboarding',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@chromatic-com/storybook',
    '@storybook/addon-interactions',
    'storybook-dark-mode',
  ],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
};
export default config;
