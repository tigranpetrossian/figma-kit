import type { Meta } from '@storybook/react';
import { useState } from 'react';
import { Tooltip, TooltipProvider } from '@components/tooltip';
import { Multi, Root, Label, Numeric } from './';

const meta: Meta<typeof Numeric> = {
  component: Numeric,
  title: 'Components/Control Input',
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
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

export const Basic = () => {
  const [value, setValue] = useState(12);

  return <Numeric value={value} onChange={setValue} />;
};

export const WithTooltip = () => {
  const [value, setValue] = useState(1);

  return (
    <Tooltip content="Tooltip">
      <Numeric value={value} onChange={setValue} />
    </Tooltip>
  );
};

export const WithRoot = () => {
  const [value, setValue] = useState(10);

  return (
    <Root>
      <Numeric value={value} onChange={setValue} variant="base" />
    </Root>
  );
};

export const WithLabel = () => {
  const [value, setValue] = useState(10);

  return (
    <Root>
      <Label>X</Label>
      <Numeric value={value} onChange={setValue} variant="base" />
    </Root>
  );
};

export const WithIcon = () => {
  const [value, setValue] = useState(0);

  return (
    <Root>
      <Label>
        <AngleIcon />
      </Label>
      <Numeric value={value} onChange={setValue} variant="base" suffix="°" smallNudge={-1} bigNudge={-15} />
    </Root>
  );
};

type RGBA = { r: number; g: number; b: number; a: number };

export const Rgba = () => {
  const [rgba, setRgba] = useState<RGBA>({ r: 1, g: 1, b: 1, a: 1 });

  const handleRChange = (r: number) => {
    setRgba((rgba) => ({ ...rgba, r }));
  };
  const handleGChange = (g: number) => {
    setRgba((rgba) => ({ ...rgba, g }));
  };
  const handleBChange = (b: number) => {
    setRgba((rgba) => ({ ...rgba, b }));
  };
  const handleAChange = (a: number) => {
    setRgba((rgba) => ({ ...rgba, a }));
  };

  return (
    <div style={{ width: 160 }}>
      <Multi>
        <Root>
          <Numeric
            value={rgba.r}
            onChange={handleRChange}
            variant="base"
            min={0}
            max={1}
            targetRange={[0, 255]}
            precision={0}
          />
        </Root>
        <Root>
          <Numeric
            value={rgba.g}
            onChange={handleGChange}
            variant="base"
            min={0}
            max={1}
            targetRange={[0, 255]}
            precision={0}
          />
        </Root>
        <Root>
          <Numeric
            value={rgba.b}
            onChange={handleBChange}
            variant="base"
            min={0}
            max={1}
            targetRange={[0, 255]}
            precision={0}
          />
        </Root>
        <Root style={{ flex: '0 0 48px' }}>
          <Numeric
            value={rgba.a}
            onChange={handleAChange}
            variant="base"
            min={0}
            max={1}
            targetRange={[0, 100]}
            precision={2}
            suffix="%"
          />
        </Root>
      </Multi>
    </div>
  );
};
