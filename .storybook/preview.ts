import type { Preview } from '@storybook/react';
import './storybook-reset.css';
import '../figma-kit/src/styles/figma-development-theme.css';
import '../figma-kit/src/styles/index.css';

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    darkMode: {
      darkClass: 'dark',
      lightClass: 'light',
      classTarget: 'html',
      stylePreview: true,
    },
  },
};

export default preview;
