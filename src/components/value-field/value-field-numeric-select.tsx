import React from 'react';
import { Select as BaseSelect } from '@base-ui/react/select';
import { cx } from 'class-variance-authority';
import { CheckmarkIcon, ChevronDownIcon, ChevronUpIcon } from '@components/icons';
import type { Formatter } from './types';
import type { NumericProps } from './value-field-numeric';
import { Multi, Root } from './value-field-elements';
import { Numeric, useNumericFormatter } from './value-field-numeric';
import { Scrubber } from './value-field-scrubber';

type NumericSelectElement = React.ElementRef<'input'>;
type NumericSelectProps = Omit<NumericProps, 'className' | 'style'> & {
  options: readonly number[];
  onItemHighlighted?: (value: number | undefined) => void;
  className?: string;
  style?: React.CSSProperties;
  triggerLabel?: string;
};

type NumericSelectItem = {
  value: string;
  label: string;
  option: number;
};

const NumericSelect = React.forwardRef<NumericSelectElement, NumericSelectProps>((props, ref) => {
  const {
    className,
    style,
    value,
    onChange,
    options,
    onItemHighlighted,
    disabled,
    triggerLabel = 'Select value',
    ...numericProps
  } = props;
  const formatter = useNumericFormatter(numericProps);
  const optionItems = options.map((option) => toSelectItem(option, formatter));
  const matchedItem = optionItems.find((item) => item.label === formatter.format(value));
  const valueOption = matchedItem !== undefined;
  const valueItem = matchedItem ?? toSelectItem(value, formatter);
  const selectItems = valueOption ? optionItems : [valueItem, ...optionItems];
  const anchorRef = React.useRef<HTMLDivElement>(null);
  const highlightedValueRef = React.useRef<number | undefined>(undefined);

  function changeSelectValue(nextValue: string | null) {
    const item = selectItems.find((item) => item.value === nextValue);
    if (item) {
      onChange(item.option);
    }
  }

  function highlightItem(nextValue: number | undefined) {
    if (highlightedValueRef.current === nextValue) {
      return;
    }

    highlightedValueRef.current = nextValue;
    onItemHighlighted?.(nextValue);
  }

  function changeOpen(open: boolean) {
    if (!open) {
      highlightItem(undefined);
    }
  }

  function clearHighlightOnPopupFocus(event: React.FocusEvent<HTMLElement>) {
    if (event.target === event.currentTarget) {
      highlightItem(undefined);
    }
  }

  return (
    <BaseSelect.Root
      items={selectItems}
      value={valueItem.value}
      onValueChange={changeSelectValue}
      onOpenChange={changeOpen}
      disabled={disabled}
    >
      <Multi ref={anchorRef} className={cx(className, 'fp-ValueFieldNumericSelect')} style={style} disabled={disabled}>
        <Root className="fp-ValueFieldNumericSelectField" disabled={disabled}>
          <Scrubber />
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
          <BaseSelect.Popup className="fp-MenuContent" onFocus={clearHighlightOnPopupFocus}>
            <BaseSelect.ScrollUpArrow className="fp-SelectScrollUpButton">
              <ChevronUpIcon size="4" />
            </BaseSelect.ScrollUpArrow>
            <BaseSelect.List>
              {!valueOption && (
                <>
                  <BaseSelect.Item
                    value={valueItem.value}
                    label={valueItem.label}
                    className="fp-MenuItem fp-MenuCheckboxItem fp-ValueFieldNumericSelectCurrentItem"
                    onFocus={() => highlightItem(value)}
                  >
                    <BaseSelect.ItemIndicator className="fp-MenuItemIndicator">
                      <CheckmarkIcon size="4" />
                    </BaseSelect.ItemIndicator>
                    <BaseSelect.ItemText>{valueItem.label}</BaseSelect.ItemText>
                  </BaseSelect.Item>
                  <BaseSelect.Separator className="fp-MenuSeparator" />
                </>
              )}
              {optionItems.map((item) => (
                <BaseSelect.Item
                  key={item.value}
                  value={item.value}
                  label={item.label}
                  className="fp-MenuItem fp-MenuCheckboxItem"
                  onFocus={() => highlightItem(item.option)}
                >
                  <BaseSelect.ItemIndicator className="fp-MenuItemIndicator">
                    <CheckmarkIcon size="4" />
                  </BaseSelect.ItemIndicator>
                  <BaseSelect.ItemText>{item.label}</BaseSelect.ItemText>
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

function toSelectItem(option: number, formatter: Formatter<number>): NumericSelectItem {
  return { value: String(option), label: formatter.format(option), option };
}

NumericSelect.displayName = 'ValueField.NumericSelect';

export type { NumericSelectProps };
export { NumericSelect };
