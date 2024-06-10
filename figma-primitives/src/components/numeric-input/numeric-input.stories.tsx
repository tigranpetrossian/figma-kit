import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { NumericInput } from './numeric-input';

type Story = StoryObj<typeof NumericInput>;

const meta: Meta<typeof NumericInput> = {
  component: NumericInput,
};

export default meta;

export const Playground = () => {
  const [value, setValue] = useState(1);

  //return <numeric-input min={0} max={1} scaleFactor={100} precision={0} value={value} onChange={setValue} />;
  return <NumericInput value={value} onChange={setValue} />;
};

export const Story: Story = {
  args: {},
};
