import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import * as RadioGroup from './radio-group';

type Story = StoryObj<typeof RadioGroup.Root>;

const meta: Meta<typeof RadioGroup.Root> = {
  title: 'Components/Radio Group',
  component: RadioGroup.Root,
  parameters: {
    radixUrl: 'https://www.radix-ui.com/primitives/docs/components/radio-group',
    radixComponentName: 'Radio Group',
  },
};

export default meta;

export const Horizontal: Story = {
  render: () => {
    return (
      <RadioGroup.Root defaultValue="default">
        <RadioGroup.Label>
          <RadioGroup.Item value="minimalist" />
          Minimalist
        </RadioGroup.Label>
        <RadioGroup.Label>
          <RadioGroup.Item value="modern" />
          Modern
        </RadioGroup.Label>
        <RadioGroup.Label>
          <RadioGroup.Item value="retro" />
          Retro
        </RadioGroup.Label>
      </RadioGroup.Root>
    );
  },
};

export const Vertical: Story = {
  render: () => {
    return (
      <RadioGroup.Root defaultValue="default" orientation="vertical">
        <RadioGroup.Label>
          <RadioGroup.Item value="minimalist" />
          Minimalist
        </RadioGroup.Label>
        <RadioGroup.Label>
          <RadioGroup.Item value="modern" />
          Modern
        </RadioGroup.Label>
        <RadioGroup.Label>
          <RadioGroup.Item value="retro" />
          Retro
        </RadioGroup.Label>
      </RadioGroup.Root>
    );
  },
};

export const Disabled: Story = {
  render: () => {
    return (
      <RadioGroup.Root defaultValue="default" disabled>
        <RadioGroup.Label>
          <RadioGroup.Item value="minimalist" />
          Minimalist
        </RadioGroup.Label>
        <RadioGroup.Label>
          <RadioGroup.Item value="modern" />
          Modern
        </RadioGroup.Label>
        <RadioGroup.Label>
          <RadioGroup.Item value="retro" />
          Retro
        </RadioGroup.Label>
      </RadioGroup.Root>
    );
  },
};
