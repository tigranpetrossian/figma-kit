import type { Preview } from '@storybook/react';
import './storybook-reset.css';
import '../figma-kit/src/styles/figma-development-theme.css';
import '../figma-kit/src/styles/index.css';
import { Controls, Description, Primary, Subtitle, Title } from '@storybook/blocks';
// @ts-ignore
import React from 'react';

const preview: Preview = {
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
  },
  parameters: {
    options: {
      storySort: {
        order: ['Components', ['Button', 'Icon Button', 'Switch', 'Input', 'Textarea', 'Control Input']],
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
      page: () => {
        return (
          // @ts-ignore
          <>
            <Title />
            <Description />
            <Subtitle />
            <Primary />
            <Controls />
          </>
        );
      },
    },
  },
};

export default preview;
