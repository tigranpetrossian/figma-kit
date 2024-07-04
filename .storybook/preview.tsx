import type { Preview } from '@storybook/react';
import './storybook-reset.css';
import '../figma-kit/src/styles/figma-development-theme.css';
import '../figma-kit/src/styles/index.css';
import { TooltipProvider } from '../figma-kit/src/components/tooltip';
import React from 'react';
import { StoryLayout } from './StoryLayout';

const preview: Preview = {
  argTypes: {
    children: {
      table: {
        disable: true,
      },
    },
  },
  decorators: [
    (Story, storyContext) => (
      <TooltipProvider>
        <StoryLayout context={storyContext}>
          <Story />
        </StoryLayout>
      </TooltipProvider>
    ),
  ],
  parameters: {
    layout: 'fullscreen',
    actions: {
      disable: true,
    },
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
        order: [
          'Components',
          [
            'Text',
            'Flex',
            'Button',
            'Icon Button',
            'Switch',
            'Input',
            'Textarea',
            'Value Field',
            'Checkbox',
            'Radio Group',
            'Segmented Control',
            'Slider',
            'Popover',
            'Dialog',
            'Alert Dialog',
            'Select',
            'Dropdown Menu',
            'Context Menu',
          ],
        ],
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
  },
};

export default preview;
