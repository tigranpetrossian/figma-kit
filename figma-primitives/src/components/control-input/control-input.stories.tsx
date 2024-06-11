import type { Meta } from '@storybook/react';
import { useState } from 'react';
import { Root, Label, Numeric } from './';

const meta: Meta<typeof Numeric> = {
  component: Numeric,
  title: 'Components/Control Input',
};

export default meta;

export const BasicNumericInput = () => {
  const [value, setValue] = useState(1);

  return <Numeric value={value} onChange={setValue} />;
};

export const NumericWithLabel = () => {
  const [value, setValue] = useState(1);

  return (
    <Root>
      <Label>X</Label>
      <Numeric value={value} onChange={setValue} variant="base" />
    </Root>
  );
};
