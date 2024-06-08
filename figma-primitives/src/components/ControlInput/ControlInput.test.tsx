import { describe, it, expect, vi } from 'vitest';
import '@testing-library/jest-dom/vitest';
import { useState } from 'react';
import { render } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import type { Formatter } from '@components/ControlInput/types';
import * as ControlInput from './ControlInput';

const LABEL = 'test-field';
const INITIAL_VALUE = 30;
const user = userEvent.setup();

const formatter: Formatter<number> = {
  parse: (input: string) => {
    if (input.length > 0 && !isNaN(Number(input))) {
      return { valid: true, value: Number(input) };
    }

    return { valid: false };
  },
  format: (value: number) => `${value}`,
};

describe('given a basic field', () => {
  const VALID_VALUE = '40';
  const INVALID_VALUE = 'dogs';

  const TestControl = ({ onChange }: { onChange?: (value: number) => void }) => {
    const [value, setValue] = useState(INITIAL_VALUE);

    const handleChange = (value: number) => {
      onChange?.(value);
      setValue(value);
    };

    return (
      <ControlInput.Root>
        <ControlInput.Field aria-label={LABEL} value={value} onChange={handleChange} formatter={formatter} />
      </ControlInput.Root>
    );
  };

  it('formats correctly', () => {
    const { getByLabelText } = render(<TestControl />);
    const field = getByLabelText(LABEL);
    expect(field).toHaveValue(formatter.format(INITIAL_VALUE));
  });

  it('saves on blur', async () => {
    const { getByLabelText } = render(<TestControl />);
    const field = getByLabelText(LABEL);
    await user.type(field, VALID_VALUE);
    await user.keyboard('{Tab}');
    expect(field).not.toHaveFocus();
    expect(field).toHaveValue(VALID_VALUE);
  });

  it('reverts invalid values', async () => {
    const { getByLabelText } = render(<TestControl />);
    const field = getByLabelText(LABEL);
    await user.type(field, INVALID_VALUE);
    await user.keyboard('{Tab}');
    expect(field).not.toHaveFocus();
    expect(field).toHaveValue(formatter.format(INITIAL_VALUE));
  });

  it('saves on Enter', async () => {
    const { getByLabelText } = render(<TestControl />);
    const field = getByLabelText(LABEL);
    await user.type(field, VALID_VALUE);
    await user.keyboard('{Enter}');
    expect(field).not.toHaveFocus();
    expect(field).toHaveValue(VALID_VALUE);
  });

  it('reverts on Escape', async () => {
    const { getByLabelText } = render(<TestControl />);
    const field = getByLabelText(LABEL);
    await user.type(field, VALID_VALUE);
    expect(field).toHaveValue(VALID_VALUE);
    await user.keyboard('{Escape}');
    expect(field).not.toHaveFocus();
    expect(field).toHaveValue(formatter.format(INITIAL_VALUE));
  });

  it("doesn't fire onChange when submitted value is the same", async () => {
    const changeHandler = vi.fn();
    const { getByLabelText } = render(<TestControl onChange={changeHandler} />);
    const field = getByLabelText(LABEL);
    await user.type(field, `${INITIAL_VALUE}`);
    await user.keyboard('{Enter}');
    expect(changeHandler).not.toBeCalled();
  });

  it.todo("doesn't close parent modal on Escape"); // feature unimplemented

  it.todo('increments correctly');
});
