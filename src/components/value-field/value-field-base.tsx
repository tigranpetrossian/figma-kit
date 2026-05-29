import React, { useRef, useState } from 'react';
import { mergeProps } from '@base-ui/react/merge-props';
import { cx } from 'class-variance-authority';
import type { InputProps } from '@components/input';
import { Input } from '@components/input';
import { useComposedRefs } from '@lib/react/use-compose-refs';
import { DEFAULT_BIG_NUDGE, DEFAULT_SMALL_NUDGE } from '@lib/constants';
import { type ValueFieldScrubTarget, useValueFieldContext } from '@components/value-field/value-field-elements';
import type { Formatter } from './types';

type BaseProps<V> = Omit<InputProps, 'value' | 'onChange'> & {
  value: V;
  onChange: (value: V) => void;
  inputRef?: React.Ref<HTMLInputElement>;
  smallNudge?: number;
  bigNudge?: number;
  formatter: Formatter<V>;
};

const Base = <V,>(props: BaseProps<V>) => {
  const {
    className,
    inputRef: forwardedRef,
    value: valueProp,
    onChange,
    smallNudge = DEFAULT_SMALL_NUDGE,
    bigNudge = DEFAULT_BIG_NUDGE,
    formatter,
    disabled,
    ...fieldProps
  } = props;
  const ref = useRef<HTMLInputElement>(null);
  const composedRef = useComposedRefs(forwardedRef, ref);
  const scrubValueRef = useRef(valueProp);
  const [editingValue, setEditingValue] = useState<string | null>(null);
  const inputValue = editingValue ?? formatter.format(valueProp);
  const context = useValueFieldContext('ValueField');
  const disabledValue = disabled || context?.disabled ? true : undefined;
  const registerScrubTarget = context?.registerScrubTarget;

  React.useEffect(() => {
    if (!context?.scrubbing) {
      scrubValueRef.current = valueProp;
    }
  }, [context?.scrubbing, valueProp]);

  const submit = (input: string) => {
    const parserResult = formatter.parse(input, valueProp);

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
      // TODO: Needs better solution
      // Delegate selection to the next tick to make sure it happens after value is set.
      requestAnimationFrame(() => {
        inputElement.blur();
      });
    }

    if (event.key === 'ArrowUp' || event.key === 'ArrowDown') {
      if (!formatter.incrementBy) {
        return;
      }

      event.preventDefault();
      const parseResult = formatter.parse(inputElement.value, valueProp);
      const oldValue = parseResult.valid ? parseResult.value : valueProp;
      const nudge = event.shiftKey ? bigNudge : smallNudge;
      const amount = event.key === 'ArrowUp' ? nudge : -nudge;
      const incrementTargets = formatter.getIncrementTargets ? formatter.getIncrementTargets(inputElement) : null;
      const newValue = formatter.incrementBy(oldValue, amount, incrementTargets);
      submit(formatter.format(newValue));
      // TODO: Needs better solution
      // Delegate selection to the next tick to make sure it happens after value is set.
      requestAnimationFrame(() => {
        if (incrementTargets && formatter.getIncrementSelection) {
          const [start, end] = formatter.getIncrementSelection(incrementTargets);
          inputElement.setSelectionRange(start, end);
        } else {
          inputElement.select();
        }
      });
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    submit(event.currentTarget.value);
  };

  const handleScrubStart = React.useCallback(() => {
    const inputElement = ref.current;
    setEditingValue(null);

    if (!inputElement) {
      scrubValueRef.current = valueProp;
      return;
    }

    const parseResult = formatter.parse(inputElement.value, valueProp);
    scrubValueRef.current = parseResult.valid ? parseResult.value : valueProp;
    inputElement.focus();
  }, [formatter, valueProp]);

  const handleScrub = React.useCallback(
    (movementX: number, event: PointerEvent) => {
      if (!formatter.incrementBy) {
        return;
      }

      const currentValue = scrubValueRef.current;
      const nudge = event.shiftKey ? bigNudge : smallNudge;
      const nextValue = formatter.incrementBy(currentValue, movementX * nudge, null);
      const parserResult = formatter.parse(formatter.format(nextValue), currentValue);

      if (!parserResult.valid || parserResult.value === currentValue) {
        return;
      }

      scrubValueRef.current = parserResult.value;
      setEditingValue(null);
      onChange(parserResult.value);
    },
    [bigNudge, formatter, onChange, smallNudge]
  );

  React.useEffect(() => {
    if (!registerScrubTarget || !formatter.incrementBy) {
      return undefined;
    }

    const scrubTarget: ValueFieldScrubTarget = {
      disabled: Boolean(disabledValue),
      inputRef: ref,
      startScrub: handleScrubStart,
      scrub: handleScrub,
    };

    return registerScrubTarget(scrubTarget);
  }, [disabledValue, formatter, handleScrub, handleScrubStart, registerScrubTarget]);

  return (
    <Input
      ref={composedRef}
      dir="auto"
      autoComplete="off"
      spellCheck="false"
      selectOnClick={true}
      className={cx(className, 'fp-ValueFieldBase')}
      value={inputValue}
      onChange={handleChange}
      disabled={disabledValue}
      {...mergeProps<'input'>({ onBlur: handleBlur, onKeyDown: handleKeyDown }, fieldProps)}
    />
  );
};

Base.displayName = 'ValueField.Base';

export type { BaseProps };
export { Base };
