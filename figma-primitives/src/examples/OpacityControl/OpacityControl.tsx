import React, { useState } from 'react';
import { round } from 'remeda';
import * as ControlInput from 'components/ControlInput/ControlInput';
import type { ControlInputParserResult } from 'components/ControlInput/ControlInput';
import { clamp } from 'lib/number/clamp';
import { evaluateExpression } from 'examples/OpacityControl/evaluateExpression';

const OpacityControl = () => {
  const [value, setValue] = useState(0.567503000004);

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
          smallNudge={0.01}
          bigNudge={0.1}
        />
      </ControlInput.Root>
    </>
  );
};

const format = (value: number) => {
  return `${alphaToPercentage(value)}%`;
};

const parse = (input: string, currentValue: number): ControlInputParserResult<number> => {
  const percentageValue = alphaToPercentage(currentValue);
  try {
    const value = evaluateExpression(input, percentageValue);
    return {
      valid: true,
      value: clamp(value, 0, 1),
    };
  } catch (e) {
    return { valid: false };
  }
};

function incrementBy(value: number, amount: number): number {
  return value + amount;
}

function alphaToPercentage(alpha: number): number {
  return round(alpha * 100, 2);
}

export { OpacityControl };
