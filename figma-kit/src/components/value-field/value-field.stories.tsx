import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { TooltipProvider } from '@components/tooltip';
import type { RGBA } from '@components/value-field/types';
import * as ValueField from './';

type Story = StoryObj<typeof ValueField.Numeric>;

const meta: Meta<typeof ValueField.Numeric> = {
  component: ValueField.Numeric,
  title: 'Components/Value Field',
  decorators: [
    (Story) => {
      return (
        <TooltipProvider>
          <Story />
        </TooltipProvider>
      );
    },
  ],
} satisfies Meta<typeof ValueField.Numeric>;

export default meta;

const OpacityIcon = () => (
  <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
    <path
      fill="var(--color-icon)"
      fillRule="evenodd"
      clipRule="evenodd"
      d="M8 7h8a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1ZM6 8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V8Zm9 1.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1ZM13.5 11a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Zm-2 2a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Zm-2 2a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Zm1.5.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Zm2-2a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Zm.5 1.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Zm2-4a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Zm-.5 2.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Zm.5 1.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"
    ></path>
  </svg>
);

const NumericComponent = () => {
  const [value, setValue] = useState(0);
  return <ValueField.Numeric value={value} onChange={setValue} />;
};

export const Numeric: Story = {
  parameters: {
    docs: {
      source: {
        code: `
import * as ValueField from 'figma-kit/value-field'

const MyNumericField = () => {
  const [value, setValue] = useState(0);
  return <ValueField.Numeric value={value} onChange={setValue} />;
};
        `,
      },
    },
  },
  render: () => <NumericComponent />,
  argTypes: {
    value: {
      description: 'The numeric value of the input.',
      control: false,
      type: {
        name: 'number',
        required: true,
      },
    },
    onChange: {
      description: 'Callback to call upon submission.',
      table: {
        type: { summary: '(value: number) => void' },
      },
      type: {
        name: 'function',
        required: true,
      },
    },
    min: {
      description: 'The minimum allowed value.',
      type: {
        name: 'number',
        required: false,
      },
    },
    max: {
      description: 'The maximum allowed value.',
      type: {
        name: 'number',
        required: false,
      },
    },
    targetRange: {
      description:
        "The numeric range that the `value` prop will be normalized to when displayed in the input. Requires non-equal 'max' and 'min' values.",
      table: {
        type: { summary: '[number, number]' },
      },
    },
    precision: {
      description: 'The decimal precision that user input will be rounded to.',
      type: {
        name: 'number',
      },
    },
    allowedUnits: {
      description: 'Units that will be accepted as valid input (e.g., "px", "%").',
      table: {
        type: { summary: 'string[]' },
      },
    },
    suffix: {
      description: 'Suffix to be appended to the value (e.g., "px", "%"). Suffix is treated as an allowed unit.',
      type: {
        name: 'string',
      },
    },
    smallNudge: {
      description: 'The small nudge increment for the value.',
      type: {
        name: 'number',
      },
    },
    bigNudge: {
      description: 'The big nudge increment for the value.',
      type: {
        name: 'number',
      },
    },
  },
};

const HexComponent = () => {
  const [rgba, setRgba] = useState({ r: 0, g: 0, b: 0, a: 1 });
  return <ValueField.Hex value={rgba} onChange={setRgba} />;
};

export const Hex: Story = {
  argTypes: {
    value: {
      description: "Color in Figma's RGBA format",
      type: {
        name: 'object',
        value: {},
        required: true,
      },
      table: {
        type: { summary: 'RGBA' },
      },
    },
    onChange: {
      description: 'Callback to call upon submission.',
      table: {
        type: { summary: '(value: RGBA) => void' },
      },
      type: {
        name: 'function',
        required: true,
      },
    },
    // @ts-expect-error storybook is hell
    ignoreAlpha: {
      description: `Ignores the alpha channel in user input, treating it as opaque. Useful when rendering without an alpha field. Results in 'onChange' always being called with an alpha value of 1.`,
      type: {
        name: 'boolean',
        required: false,
        defaultValue: false,
      },
    },
  },
  parameters: {
    docs: {
      source: {
        code: `
import * as ValueField from 'figma-kit/value-field'

const BasicHexField = () => {
  const [rgba, setRgba] = useState({ r: 0, g: 0, b: 0, a: 1 });
  return <ValueField.Hex value={rgba} onChange={setRgba} />;
};
        `,
      },
    },
  },
  render: () => <HexComponent />,
};

const WithLabelComponent = () => {
  const [value, setValue] = useState(0);

  return (
    <ValueField.Root style={{ width: 100 }}>
      <ValueField.Label>X</ValueField.Label>
      <ValueField.Numeric value={value} onChange={setValue} />
    </ValueField.Root>
  );
};

export const WithLabel = {
  parameters: {
    docs: {
      source: {
        code: `
import * as ValueField from 'figma-kit/value-field'

const WithLabel = () => {
  const [value, setValue] = useState(0);

  return (
    <ValueField.Root>
      <ValueField.Label>X</ValueField.Label>
      <ValueField.Numeric value={value} onChange={setValue}  />
    </ValueField.Root>
  );
};
        `,
      },
    },
  },
  render: () => <WithLabelComponent />,
};

const WithIconComponent = () => {
  const [value, setValue] = useState(0);

  return (
    <ValueField.Root style={{ width: 100 }}>
      <ValueField.Label>
        <OpacityIcon />
      </ValueField.Label>
      <ValueField.Numeric value={value} onChange={setValue} />
    </ValueField.Root>
  );
};

export const WithIcon = {
  parameters: {
    docs: {
      source: {
        code: `
import * as ValueField from 'figma-kit/value-field'

const WithIcon = () => {
  const [value, setValue] = useState(0);
  
  return (
    <ValueField.Root>
      <ValueField.Label>
        <AngleIcon />
      </ValueField.Label>
      <ValueField.Numeric value={value} onChange={setValue}  />
    </ValueField.Root>
  );
};
        `,
      },
    },
  },
  render: () => <WithIconComponent />,
};

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
      <ValueField.Multi>
        <ValueField.Root>
          <ValueField.Numeric
            value={rgba.r}
            onChange={handleRChange}
            min={0}
            max={1}
            targetRange={[0, 255]}
            precision={0}
          />
        </ValueField.Root>
        <ValueField.Root>
          <ValueField.Numeric
            value={rgba.g}
            onChange={handleGChange}
            min={0}
            max={1}
            targetRange={[0, 255]}
            precision={0}
          />
        </ValueField.Root>
        <ValueField.Root>
          <ValueField.Numeric
            value={rgba.b}
            onChange={handleBChange}
            min={0}
            max={1}
            targetRange={[0, 255]}
            precision={0}
          />
        </ValueField.Root>
        <ValueField.Root style={{ flex: '0 0 48px' }}>
          <ValueField.Numeric
            value={rgba.a}
            onChange={handleAChange}
            min={0}
            max={1}
            targetRange={[0, 100]}
            precision={2}
            suffix="%"
          />
        </ValueField.Root>
      </ValueField.Multi>
    </div>
  );
};

export const MultiInput: Story = {
  parameters: {
    docs: {
      source: {
        code: `
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
    <ValueField.Multi>
      <ValueField.Root>
        <ValueField.Numeric
          value={rgba.r}
          onChange={handleRChange}
          
          min={0}
          max={1}
          targetRange={[0, 255]}
          precision={0}
        />
      </ValueField.Root>
      <ValueField.Root>
        <ValueField.Numeric
          value={rgba.g}
          onChange={handleGChange}
          
          min={0}
          max={1}
          targetRange={[0, 255]}
          precision={0}
        />
      </ValueField.Root>
      <ValueField.Root>
        <ValueField.Numeric
          value={rgba.b}
          onChange={handleBChange}
          
          min={0}
          max={1}
          targetRange={[0, 255]}
          precision={0}
        />
      </ValueField.Root>
      <ValueField.Root style={{ flex: '0 0 48px' }}>
        <ValueField.Numeric
          value={rgba.a}
          onChange={handleAChange}
          
          min={0}
          max={1}
          targetRange={[0, 100]}
          precision={2}
          suffix="%"
        />
      </ValueField.Root>
    </ValueField.Multi>
  );
};
        
        `,
      },
    },
  },
  render: () => <Rgba />,
};

const HexWithAlphaComponent = () => {
  const [rgba, setRgba] = useState<RGBA>({ r: 1, g: 1, b: 1, a: 1 });

  const setAlpha = (alpha: number) => {
    setRgba(({ r, g, b }) => ({ r, g, b, a: alpha }));
  };

  return (
    <div style={{ width: 160 }}>
      <ValueField.Multi>
        <ValueField.Root>
          <ValueField.Hex value={rgba} onChange={setRgba} />
        </ValueField.Root>
        <ValueField.Root style={{ flex: '0 0 62px' }}>
          <ValueField.Numeric
            value={rgba.a}
            onChange={setAlpha}
            min={0}
            max={1}
            targetRange={[0, 100]}
            allowedUnits={['%']}
            precision={2}
          />
          <ValueField.Label>%</ValueField.Label>
        </ValueField.Root>
      </ValueField.Multi>
    </div>
  );
};

export const HexWithAlpha: Story = {
  parameters: {
    docs: {
      source: {
        code: `
const HexWithAlpha = () => {
  const [rgba, setRgba] = useState<RGBA>({ r: 1, g: 1, b: 1, a: 1 });

  const setAlpha = (alpha: number) => {
    setRgba(({ r, g, b }) => ({ r, g, b, a: alpha }));
  };

  return (
      <ValueField.Multi>
        <ValueField.Root>
          <ValueField.Hex value={rgba} onChange={setRgba} />
        </ValueField.Root>
        <ValueField.Root>
          <ValueField.Numeric
            value={rgba.a}
            onChange={setAlpha}
            min={0}
            max={1}
            targetRange={[0, 100]}
            allowedUnits={['%']}
            precision={2}
          />
          <ValueField.Label>%</ValueField.Label>
        </ValueField.Root>
      </ValueField.Multi>
  );
};
        `,
      },
    },
  },
  render: () => <HexWithAlphaComponent />,
};
