import { describe, expect, it } from 'vitest';
import { render } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { useState } from 'react';
import { NumericSelect } from '@components/value-field/value-field-numeric-select';
import type { NumericSelectProps } from '@components/value-field/value-field-numeric-select';

const LABEL = 'Size';
const OPTIONS = [10, 12, 14, 20];
const user = userEvent.setup();

type TestNumericSelectProps = Partial<Omit<NumericSelectProps, 'value' | 'onChange' | 'options'>> & {
  initialValue: number;
  options?: readonly number[];
};

const TestNumericSelect = (props: TestNumericSelectProps) => {
  const { initialValue, options = OPTIONS, ...numericSelectProps } = props;
  const [value, setValue] = useState(initialValue);

  return (
    <NumericSelect aria-label={LABEL} value={value} onChange={setValue} options={options} {...numericSelectProps} />
  );
};

describe('NumericSelect', () => {
  it('renders the numeric value', () => {
    const { getByLabelText } = render(<TestNumericSelect initialValue={12} />);
    expect(getByLabelText(LABEL)).toHaveValue('12');
  });

  it('updates from typed input', async () => {
    const { getByLabelText } = render(<TestNumericSelect initialValue={12} />);
    const field = getByLabelText(LABEL);
    await user.type(field, '14');
    await user.keyboard('{Enter}');
    expect(field).toHaveValue('14');
  });

  it('updates from selected option', async () => {
    const { getByLabelText, getByRole } = render(<TestNumericSelect initialValue={12} />);
    await user.click(getByRole('combobox', { name: 'Select value' }));
    await user.click(getByRole('option', { name: '20' }));
    expect(getByLabelText(LABEL)).toHaveValue('20');
  });

  it('shows the current value above options when it is not an option', async () => {
    const { getAllByRole, getByLabelText, getByRole } = render(<TestNumericSelect initialValue={20} />);
    const field = getByLabelText(LABEL);
    await user.type(field, '21');
    await user.keyboard('{Enter}');
    await user.click(getByRole('combobox', { name: 'Select value' }));
    expect(getByRole('option', { name: '21', selected: true })).toBeInTheDocument();
    expect(getAllByRole('option').map((option) => option.textContent)).toEqual(['21', '10', '12', '14', '20']);
    expect(document.querySelector('.fp-MenuSeparator')).toBeInTheDocument();
  });

  it('disables the field and trigger', () => {
    const { getByLabelText, getByRole } = render(<TestNumericSelect initialValue={12} disabled />);
    expect(getByLabelText(LABEL)).toBeDisabled();
    expect(getByRole('combobox', { name: 'Select value' })).toBeDisabled();
  });
});
