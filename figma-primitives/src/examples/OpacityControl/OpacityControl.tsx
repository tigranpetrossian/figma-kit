import React, { useState } from 'react';
import * as ControlInput from 'components/ControlInput/ControlInput';
import type { ControlInputParserResult } from 'components/ControlInput/ControlInput';
import { clamp } from 'lib/number/clamp';

const OpacityControl = () => {
  const [value, setValue] = useState(77);

  const handleChange = (value: number) => {
    setValue(value);
  };

  return (
    <>
      {value}
      <ControlInput.Root>
        <ControlInput.Field
          value={value}
          onChange={handleChange}
          format={format}
          parse={parse}
          clamp={(value) => clamp(value, 0, 100)}
          incrementBy={incrementBy}
        />
      </ControlInput.Root>
    </>
  );
};

const format = (value: number) => `${value}%`;

// TODO: can only end with one or more %
// TODO: Or be an expression
const parse = (input: string): ControlInputParserResult<number> => {
  const numeric = parseFloat(input);
  if (isNaN(numeric)) {
    return { valid: false };
  }

  return {
    valid: true,
    value: numeric,
  };
};

function incrementBy(value: number, amount: number): number {
  return value + amount;
}

export { OpacityControl };
