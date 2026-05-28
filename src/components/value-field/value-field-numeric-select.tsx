import React from 'react';
import { Select as BaseSelect } from '@base-ui/react/select';
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
  const selectOptions = getSelectOptions(value, options, valueOption);
  const anchorRef = React.useRef<HTMLDivElement>(null);

  function changeSelectValue(nextValue: string | null) {
    if (nextValue !== null) {
      onChange(Number(nextValue));
    }
  }

  return (
    <BaseSelect.Root items={selectOptions} value={selectValue} onValueChange={changeSelectValue} disabled={disabled}>
      <Multi ref={anchorRef} className={cx(className, 'fp-ValueFieldNumericSelect')} style={style} disabled={disabled}>
        <Root className="fp-ValueFieldNumericSelectField" disabled={disabled}>
          <Numeric ref={ref} value={value} onChange={onChange} disabled={disabled} {...numericProps} />
        </Root>
        <BaseSelect.Trigger className="fp-ValueFieldNumericSelectTrigger" aria-label={triggerLabel}>
          <BaseSelect.Value />
          <BaseSelect.Icon className="fp-ValueFieldNumericSelectIcon">
            <ChevronDownIcon size="4" />
          </BaseSelect.Icon>
        </BaseSelect.Trigger>
      </Multi>
      <BaseSelect.Portal>
        <BaseSelect.Positioner
          anchor={anchorRef}
          className={cx(
            'fp-ValueFieldNumericSelectPositioner',
            valueOption && 'fp-ValueFieldNumericSelectPositionerInOptions'
          )}
          positionMethod="fixed"
          collisionPadding={0}
        >
          <BaseSelect.Popup className="fp-MenuContent">
            <BaseSelect.ScrollUpArrow className="fp-SelectScrollUpButton">
              <ChevronUpIcon size="4" />
            </BaseSelect.ScrollUpArrow>
            <BaseSelect.List>
              {!valueOption && (
                <>
                  <BaseSelect.Item
                    value={selectValue}
                    label={selectValue}
                    className="fp-MenuItem fp-MenuCheckboxItem fp-ValueFieldNumericSelectCurrentItem"
                  >
                    <BaseSelect.ItemIndicator className="fp-MenuItemIndicator">
                      <CheckmarkIcon size="4" />
                    </BaseSelect.ItemIndicator>
                    <BaseSelect.ItemText>{value}</BaseSelect.ItemText>
                  </BaseSelect.Item>
                  <BaseSelect.Separator className="fp-MenuSeparator" />
                </>
              )}
              {options.map((option) => (
                <BaseSelect.Item
                  key={toSelectValue(option)}
                  value={toSelectValue(option)}
                  label={toSelectValue(option)}
                  className="fp-MenuItem fp-MenuCheckboxItem"
                >
                  <BaseSelect.ItemIndicator className="fp-MenuItemIndicator">
                    <CheckmarkIcon size="4" />
                  </BaseSelect.ItemIndicator>
                  <BaseSelect.ItemText>{option}</BaseSelect.ItemText>
                </BaseSelect.Item>
              ))}
            </BaseSelect.List>
            <BaseSelect.ScrollDownArrow className="fp-SelectScrollDownButton">
              <ChevronDownIcon size="4" />
            </BaseSelect.ScrollDownArrow>
          </BaseSelect.Popup>
        </BaseSelect.Positioner>
      </BaseSelect.Portal>
    </BaseSelect.Root>
  );
});

function getSelectOptions(value: number, options: readonly number[], valueOption: boolean) {
  const optionItems = options.map((option) => {
    const optionValue = toSelectValue(option);
    return { value: optionValue, label: optionValue };
  });

  if (valueOption) {
    return optionItems;
  }

  return [{ value: toSelectValue(value), label: toSelectValue(value) }, ...optionItems];
}

function toSelectValue(value: number) {
  return `${value}`;
}

NumericSelect.displayName = 'ValueField.NumericSelect';

export type { NumericSelectProps };
export { NumericSelect };
