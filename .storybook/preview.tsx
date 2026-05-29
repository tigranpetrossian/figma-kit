import type { Decorator, Preview } from '@storybook/react-vite';
import { TooltipProvider } from '../src/components/tooltip';
import '../src/styles/figma-development-theme.css';
import '../src/styles/index.css';
import './preview.css';

const withTheme: Decorator = (Story, context) => {
  const theme = context.globals.theme === 'dark' ? 'figma-dark' : 'light';

  document.documentElement.classList.toggle('figma-dark', theme === 'figma-dark');
  document.documentElement.classList.toggle('light', theme === 'light');

  return (
    <TooltipProvider>
      <div className="story-layout">
        <Story />
      </div>
    </TooltipProvider>
  );
};

const preview: Preview = {
  initialGlobals: {
    theme: 'light',
  },
  globalTypes: {
    theme: {
      name: 'Theme',
      description: 'Figma theme',
      toolbar: {
        icon: 'circlehollow',
        items: [
          { value: 'light', title: 'Light' },
          { value: 'dark', title: 'Dark' },
        ],
        dynamicTitle: true,
      },
    },
  },
  decorators: [withTheme],
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
        offsetX: 16,
        offsetY: 16,
      },
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
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
            'Icons',
            'Switch',
            'Input',
            'Textarea',
            'Value Field',
            'Checkbox',
            'Radio Group',
            'Segmented Control',
            'Slider',
            'Color Picker',
            'Popover',
            'Dialog',
            'Alert Dialog',
            'Select',
            'Dropdown Menu',
            'Context Menu',
            'Tabs',
            'Collapsible',
          ],
        ],
      },
    },
  },
};

export default preview;
