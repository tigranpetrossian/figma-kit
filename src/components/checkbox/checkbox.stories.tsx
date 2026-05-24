import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Checkbox from './checkbox';

const meta = {
  title: 'Components/Checkbox',
  component: Checkbox.Root,
} satisfies Meta<typeof Checkbox.Root>;

type Story = StoryObj<typeof meta>;

const WithLabel: Story = {
  render() {
    return (
      <Checkbox.Root>
        <Checkbox.Input />
        <Checkbox.Label>Clip content</Checkbox.Label>
      </Checkbox.Root>
    );
  },
};

const WithoutLabel: Story = {
  render() {
    return (
      <Checkbox.Root>
        <Checkbox.Input />
      </Checkbox.Root>
    );
  },
};

const Indeterminate: Story = {
  render() {
    return (
      <Checkbox.Root>
        <Checkbox.Input indeterminate />
        <Checkbox.Label>Clip content</Checkbox.Label>
      </Checkbox.Root>
    );
  },
};

const Disabled: Story = {
  render() {
    return (
      <Checkbox.Root>
        <Checkbox.Input disabled />
        <Checkbox.Label>Clip content</Checkbox.Label>
      </Checkbox.Root>
    );
  },
};

const DisabledChecked: Story = {
  render() {
    return (
      <Checkbox.Root>
        <Checkbox.Input disabled checked />
        <Checkbox.Label>Clip content</Checkbox.Label>
      </Checkbox.Root>
    );
  },
};

const DisabledIndeterminate: Story = {
  render() {
    return (
      <Checkbox.Root>
        <Checkbox.Input disabled indeterminate />
        <Checkbox.Label>Clip content</Checkbox.Label>
      </Checkbox.Root>
    );
  },
};

const MultiLineLabel: Story = {
  render() {
    return (
      <Checkbox.Root style={{ width: 128 }}>
        <Checkbox.Input />
        <Checkbox.Label>Clip content with label that spans multiple lines</Checkbox.Label>
      </Checkbox.Root>
    );
  },
};

const Description: Story = {
  render() {
    return (
      <Checkbox.Root style={{ maxWidth: 512 }}>
        <Checkbox.Input />
        <Checkbox.Label>Checkbox with description</Checkbox.Label>
        <Checkbox.Description>
          Helpful description of the option which may briefly highlight side effects or conditions of the option.
        </Checkbox.Description>
      </Checkbox.Root>
    );
  },
};

export default meta;
export {
  Description,
  Disabled,
  DisabledChecked,
  DisabledIndeterminate,
  Indeterminate,
  MultiLineLabel,
  WithLabel,
  WithoutLabel,
};
