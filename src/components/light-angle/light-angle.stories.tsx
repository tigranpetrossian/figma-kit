import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { Flex } from '@components/flex';
import * as ValueField from '@components/value-field';
import { LightAngle } from './light-angle';

const meta = {
  title: 'Components/Light Angle',
  component: LightAngle,
} satisfies Meta<typeof LightAngle>;

type Story = StoryObj;

const WithValueField: Story = {
  render() {
    return <LightAngleField />;
  },
};

const LightAngleField = () => {
  const [angle, setAngle] = useState(-45);

  return (
    <Flex direction="column" align="center" gap="2">
      <LightAngle value={angle} onValueChange={setAngle} />
      <ValueField.Root style={{ width: 56 }}>
        <ValueField.Scrubber />
        <ValueField.Numeric
          aria-label="Light angle"
          value={angle}
          onChange={setAngle}
          min={-180}
          max={180}
          precision={0}
          suffix="°"
        />
      </ValueField.Root>
    </Flex>
  );
};

export default meta;
export { WithValueField };
