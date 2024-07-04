import type { Meta, StoryObj } from '@storybook/react';
import { Switch } from './switch';

type Story = StoryObj<typeof Switch>;

const meta = {
  component: Switch,
  title: 'Components/Switch',
  parameters: {
    radixUrl: 'https://www.radix-ui.com/primitives/docs/components/switch',
    radixComponentName: 'Switch',
    controls: { expanded: true },
  },
  argTypes: {
    defaultChecked: {
      type: 'boolean',
      description:
        'The state of the switch when it is initially rendered. Use when you do not need to control its state.',
    },
    checked: {
      type: 'boolean',
      description: 'The controlled state of the switch. Must be used in conjunction with onCheckedChange.',
    },
    onCheckedChange: {
      type: 'function',
      description: 'Event handler called when the checked state of the switch changes.',
    },
    disabled: {
      type: 'boolean',
      description: 'When true, prevents the user from interacting with the switch.',
    },
    required: {
      type: 'boolean',
      description: 'When true, indicates that an input field must be filled out before submitting the form.',
    },
    name: {
      type: 'string',
      description: 'The name of the input field in a form.',
    },
    value: {
      type: 'string',
      description: 'The value of the switch input when submitted in a form.',
    },
  },
} satisfies Meta<typeof Switch>;

export default meta;

const uncheckedCode = `
<Switch />
`;

const checkedCode = `
<Switch checked />
`;

const disabledCode = `
<Switch checked disabled />
`;

// Limitation - no Mixed state support
export const Unchecked: Story = {
  parameters: {
    storySource: {
      source: uncheckedCode,
    },
  },
  args: {},
};

export const Checked: Story = {
  parameters: {
    storySource: {
      source: checkedCode,
    },
  },
  args: {
    checked: true,
  },
};

export const Disabled: Story = {
  parameters: {
    storySource: {
      source: disabledCode,
    },
  },
  args: {
    checked: true,
    disabled: true,
  },
};
