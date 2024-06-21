import type { Preview } from '@storybook/react';
import './storybook-reset.css';
import '../figma-kit/src/styles/figma-development-theme.css';
import '../figma-kit/src/styles/index.css';
import { DocTemplate } from './DocTemplate';

const preview: Preview = {
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    backgrounds: {
      grid: {
        cellSize: 8,
        opacity: 0.25,
        cellAmount: 4,
        offsetX: 16, // Default is 0 if story has 'fullscreen' layout, 16 if layout is 'padded'
        offsetY: 16, // Default is 0 if story has 'fullscreen' layout, 16 if layout is 'padded'
      },
    },
    options: {
      storySort: {
        order: ['Components', ['Button', 'Icon Button', 'Switch', 'Input', 'Textarea', 'Value Field']],
      },
    },
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
    docs: {
      page: DocTemplate,
    },
  },
};

export default preview;
