import type { Meta, StoryObj } from '@storybook/react';
import { Root, Field } from './ControlInput';

type Story = StoryObj<typeof Root>;

const meta: Meta<typeof Root> = {
  component: Root,
};

export default meta;

export const Opacity: Story = {
  render: () => (
    <>
      <Root>
        <Field value={100} />
      </Root>
    </>
  ),
};
