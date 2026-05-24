import React from 'react';
import * as RadixSelect from '@radix-ui/react-select';
import { cx } from 'class-variance-authority';
import { CheckmarkIcon, ChevronDownIcon, ChevronUpIcon } from '@components/icons';
import type { NumericProps } from './value-field-numeric';
import { Multi, Root } from './value-field-elements';
import { Numeric } from './value-field-numeric';

type NumericSelectElement = React.ElementRef<'input'>;
type NumericSelectProps = Omit<NumericProps, 'className' | 'style'> & {
  options: readonly number[];
  className?: string;
  style?: React.CSSProperties;
  triggerLabel?: string;
};

const NumericSelect = React.forwardRef<NumericSelectElement, NumericSelectProps>((props, ref) => {
  const {
    className,
    style,
    value,
    onChange,
    options,
    disabled,
    triggerLabel = 'Select value',
    ...numericProps
  } = props;
  const valueOption = options.includes(value);
  const selectValue = toSelectValue(value);

  return (
    <RadixSelect.Root value={selectValue} onValueChange={(value) => onChange(Number(value))} disabled={disabled}>
      <Multi className={cx(className, 'fp-ValueFieldNumericSelect')} style={style} disabled={disabled}>
        <Root className="fp-ValueFieldNumericSelectField" disabled={disabled}>
          <Numeric ref={ref} value={value} onChange={onChange} disabled={disabled} {...numericProps} />
        </Root>
        <RadixSelect.Trigger className="fp-ValueFieldNumericSelectTrigger" aria-label={triggerLabel}>
          <RadixSelect.Value />
          <RadixSelect.Icon className="fp-ValueFieldNumericSelectIcon">
            <ChevronDownIcon size="4" />
          </RadixSelect.Icon>
        </RadixSelect.Trigger>
      </Multi>
      <RadixSelect.Portal>
        <RadixSelect.Content className="fp-MenuContent">
          <RadixSelect.ScrollUpButton className="fp-SelectScrollUpButton">
            <ChevronUpIcon size="4" />
          </RadixSelect.ScrollUpButton>
          <RadixSelect.Viewport>
            {!valueOption && (
              <>
                <RadixSelect.Item
                  value={selectValue}
                  textValue={selectValue}
                  className="fp-MenuItem fp-MenuCheckboxItem fp-ValueFieldNumericSelectCurrentItem"
                >
                  <RadixSelect.ItemIndicator className="fp-MenuItemIndicator">
                    <CheckmarkIcon size="4" />
                  </RadixSelect.ItemIndicator>
                  <RadixSelect.ItemText>{value}</RadixSelect.ItemText>
                </RadixSelect.Item>
                <RadixSelect.Separator className="fp-MenuSeparator" />
              </>
            )}
            {options.map((option) => (
              <RadixSelect.Item
                key={toSelectValue(option)}
                value={toSelectValue(option)}
                textValue={toSelectValue(option)}
                className="fp-MenuItem fp-MenuCheckboxItem"
              >
                <RadixSelect.ItemIndicator className="fp-MenuItemIndicator">
                  <CheckmarkIcon size="4" />
                </RadixSelect.ItemIndicator>
                <RadixSelect.ItemText>{option}</RadixSelect.ItemText>
              </RadixSelect.Item>
            ))}
          </RadixSelect.Viewport>
          <RadixSelect.ScrollDownButton className="fp-SelectScrollDownButton">
            <ChevronDownIcon size="4" />
          </RadixSelect.ScrollDownButton>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
});

function toSelectValue(value: number) {
  return `${value}`;
}

NumericSelect.displayName = 'ValueField.NumericSelect';

export type { NumericSelectProps };
export { NumericSelect };
