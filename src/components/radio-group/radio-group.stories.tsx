import type { Meta, StoryObj } from '@storybook/react-vite';
import * as RadioGroup from './radio-group';

const meta = {
  title: 'Components/Radio Group',
  component: RadioGroup.Root,
} satisfies Meta<typeof RadioGroup.Root>;

type Story = StoryObj<typeof meta>;

const Horizontal: Story = {
  render() {
    return (
      <RadioGroup.Root defaultValue="minimalist">
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

const Vertical: Story = {
  render() {
    return (
      <RadioGroup.Root defaultValue="minimalist" orientation="vertical">
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

const Disabled: Story = {
  render() {
    return (
      <RadioGroup.Root defaultValue="minimalist" disabled>
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

export default meta;
export { Disabled, Horizontal, Vertical };
