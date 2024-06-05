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
          clamp={(value) => clamp(value, 0, 100)}
          incrementBy={incrementBy}
        />
      </ControlInput.Root>
    </>
  );
};

const format = (value: number) => `${value}%`;

const parse = (input: string, value: number): ControlInputParserResult<number> => {
  try {
    const evaluation = evaluateExpression(input, value);
    return evaluation === null
      ? {
          valid: false,
        }
      : { valid: true, value: evaluation };
  } catch (e) {
    return { valid: false };
  }
};

// isNumberLike ? -> convert to number -> return
// isExpressionLike ? try expression

function incrementBy(value: number, amount: number): number {
  return value + amount;
}

export { OpacityControl };
