import type { Meta } from '@storybook/react';
import { useState } from 'react';
import * as Tooltip from '@components/tooltip';
import { Root, Label, Numeric } from './';

const meta: Meta<typeof Numeric> = {
  component: Numeric,
  title: 'Components/Control Input',
  decorators: [
    (Story) => (
      <Tooltip.TooltipProvider>
        <Story />
      </Tooltip.TooltipProvider>
    ),
  ],
} satisfies Meta<typeof Numeric>;

export default meta;

const AngleIcon = () => (
  <svg className="svg" xmlns="http://www.w3.org/2000/svg" width="8" height="8" viewBox="0 0 8 8">
    <path
      fillOpacity="1"
      fillRule="evenodd"
      stroke="none"
      d="M0 0v8h8V7H5c0-2.21-1.79-4-4-4V0H0zm1 4v3h3c0-1.657-1.343-3-3-3z"
    />
  </svg>
);

export const BasicNumericInput = () => {
  const [value, setValue] = useState(12);

  return <Numeric value={value} onChange={setValue} />;
};

export const WithTooltip = () => {
  const [value, setValue] = useState(1);

  return (
    <Tooltip.Tooltip content="what">
      <div>
        <Numeric value={value} onChange={setValue} />
      </div>
    </Tooltip.Tooltip>
  );
};

export const NumericWithLabel = () => {
  const [value, setValue] = useState(10);

  return (
    <Root>
      <Label>X</Label>
      <Numeric value={value} onChange={setValue} variant="base" />
    </Root>
  );
};

export const NumericWithIcon = () => {
  const [value, setValue] = useState(0);

  return (
    <Root>
      <Label>
        <AngleIcon />
      </Label>
      <Numeric value={value} onChange={setValue} variant="base" suffix="°" />
    </Root>
  );
};
