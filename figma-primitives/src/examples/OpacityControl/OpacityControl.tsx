import React, { useState } from 'react';
import * as ControlInput from 'components/ControlInput/ControlInput';
import type { ControlInputParserResult } from 'components/ControlInput/ControlInput';
import { clamp } from 'lib/number/clamp';

const OpacityControl = () => {
  const [value, setValue] = useState(66);

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
        />
      </ControlInput.Root>
    </>
  );
};

const format = (value: number) => `${value}%`;

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

export { OpacityControl };
