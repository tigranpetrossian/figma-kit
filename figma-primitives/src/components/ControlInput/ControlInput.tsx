import React, { useRef, useState } from 'react';
import { cx } from 'class-variance-authority';
import mergeProps from 'merge-props';
import type { InputProps } from '@components/Input';
import { Input } from '@components/Input';
import { useComposedRefs } from '@lib/react/useComposeRefs';
import { DEFAULT_BIG_NUDGE, DEFAULT_SMALL_NUDGE } from '@lib/constants';

type RootElement = React.ElementRef<'div'>;
type RootProps = React.ComponentPropsWithoutRef<'div'>;

const Root = React.forwardRef<RootElement, RootProps>((props, ref) => {
  const { className, ...rootProps } = props;
  return <div ref={ref} className={cx(className, 'fp-ControlInputRoot')} {...rootProps} />;
});

type ControlInputParserResult<V> =
  | {
      valid: true;
      value: V;
    }
  | {
      valid: false;
    };

type IncrementTargets = Record<string, boolean> | null;

type ControlInputProps<V> = Omit<InputProps, 'value' | 'onChange'> & {
  value: V;
  onChange: (value: V) => void;
  inputRef?: React.Ref<HTMLInputElement>;
  smallNudge?: number;
  bigNudge?: number;
  parse: (input: string, value: V) => ControlInputParserResult<V>;
  format: (value: V) => string;
  incrementBy?: (value: V, amount: number, incrementTargets: IncrementTargets) => V;
  getIncrementTargets?: (element: HTMLInputElement) => IncrementTargets;
  getIncrementSelection?: () => [start: number, end: number];
};

const Field = <V,>(props: ControlInputProps<V>) => {
  const {
    className,
    inputRef: forwardedRef,
    value: valueProp,
    onChange,
    format,
    parse,
    smallNudge = DEFAULT_SMALL_NUDGE,
    bigNudge = DEFAULT_BIG_NUDGE,
    incrementBy,
    getIncrementTargets,
    getIncrementSelection,
    ...controlInputProps
  } = props;
  const ref = useRef<HTMLInputElement>(null);
  const composedRef = useComposedRefs(forwardedRef, ref);
  const [editingValue, setEditingValue] = useState<string | null>(null);
  const inputValue = editingValue ?? format(valueProp);

  const submit = (input: string) => {
    const parserResult = parse(input, valueProp);

    if (input.length === 0 || !parserResult.valid || parserResult.value === valueProp) {
      return revert();
    }

    setEditingValue(null);
    onChange(parserResult.value);
  };

  const revert = () => {
    setEditingValue(null);
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditingValue(event.currentTarget.value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const inputElement = event.currentTarget;

    if (event.key === 'Enter') {
      event.preventDefault();
      inputElement.blur();
    }

    if (event.key === 'Escape') {
      event.preventDefault();
      revert();
      inputElement.blur();
    }

    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      if (!incrementBy) {
        return;
      }

      event.preventDefault();
      const parseResult = parse(inputElement.value, valueProp);
      const oldValue = parseResult.valid ? parseResult.value : valueProp;
      const nudge = event.shiftKey ? bigNudge : smallNudge;
      const amount = event.key === 'ArrowUp' ? nudge : -nudge;
      const incrementTargets = getIncrementTargets ? getIncrementTargets(inputElement) : null;
      const newValue = incrementBy(oldValue, amount, incrementTargets);
      submit(format(newValue));
      // TODO: Needs better solution
      // Delegate selection to the next tick to make sure it happens after value is set.
      requestAnimationFrame(() => {
        if (incrementTargets && getIncrementSelection) {
          const [start, end] = getIncrementSelection();
          inputElement.setSelectionRange(start, end);
        }
        inputElement.select();
      });
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    submit(event.currentTarget.value);
  };

  return (
    <Input
      ref={composedRef}
      dir="auto"
      autoComplete="off"
      spellCheck="false"
      selectOnClick={true}
      className={cx(className, 'fp-ControlInputField')}
      variant="base"
      value={inputValue}
      onChange={handleChange}
      {...mergeProps(controlInputProps, { onBlur: handleBlur, onKeyDown: handleKeyDown })}
    />
  );
};

export type { ControlInputProps, ControlInputParserResult, IncrementTargets };
export { Root, Field };
