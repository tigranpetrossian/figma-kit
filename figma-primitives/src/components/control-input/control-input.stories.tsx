import type { Meta } from '@storybook/react';
import { useState } from 'react';
import { Numeric } from './control-input-numeric';

const meta: Meta<typeof Numeric> = {
  component: Numeric,
  title: 'Components/Control Input',
};

export default meta;

export const BasicNumericInput = () => {
  const [value, setValue] = useState(1);

  return <Numeric value={value} onChange={setValue} />;
};
