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
      <ValueField.Label>Blur</ValueField.Label>
      <ValueField.Numeric value={value} onChange={setValue} variant="base" />
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
      <ValueField.Label>Blur</ValueField.Label>
      <ValueField.Numeric value={value} onChange={setValue} variant="base" />
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
        <AngleIcon />
      </ValueField.Label>
      <ValueField.Numeric value={value} onChange={setValue} variant="base" />
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
      <ValueField.Numeric value={value} onChange={setValue} variant="base" />
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
            variant="base"
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
            variant="base"
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
            variant="base"
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
            variant="base"
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
          variant="base"
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
          variant="base"
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
          variant="base"
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
          variant="base"
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
          <ValueField.Hex value={rgba} onChange={setRgba} variant="base" />
        </ValueField.Root>
        <ValueField.Root style={{ flex: '0 0 48px' }}>
          <ValueField.Numeric
            value={rgba.a}
            onChange={setAlpha}
            min={0}
            max={1}
            targetRange={[0, 100]}
            suffix="%"
            variant="base"
            precision={2}
          />
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
        <ValueField.Hex value={rgba} onChange={setRgba} variant="base" />
      </ValueField.Root>
      <ValueField.Root >
        <ValueField.Numeric
          value={rgba.a}
          onChange={setAlpha}
          min={0}
          max={1}
          targetRange={[0, 100]}
          suffix="%"
          variant="base"
          precision={2}
        />
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
