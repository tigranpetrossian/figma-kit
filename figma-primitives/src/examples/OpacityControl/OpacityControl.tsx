import React, { useState } from 'react';
import * as ControlInput from 'components/ControlInput/ControlInput';
import type { ControlInputParserResult } from 'components/ControlInput/ControlInput';
import { clamp } from 'lib/number/clamp';
import { evaluateExpression } from 'examples/OpacityControl/evaluateExpression';

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
          incrementBy={incrementBy}
        />
      </ControlInput.Root>
    </>
  );
};

const format = (value: number) => `${value}%`;

// @todo Rounding
// @todo most likely real valueProp for this is 0-1
const parse = (input: string, currentValue: number): ControlInputParserResult<number> => {
  try {
    const value = evaluateExpression(input, currentValue);
    return {
      valid: true,
      value: clamp(value, 0, 100),
    };
  } catch (e) {
    return { valid: false };
  }
};

function incrementBy(value: number, amount: number): number {
  return value + amount;
}

export { OpacityControl };
