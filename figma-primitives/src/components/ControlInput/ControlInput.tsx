import React, { useEffect, useRef } from 'react';
import { cx } from 'class-variance-authority';
import type { InputProps } from 'components/Input';
import { Input } from 'components/Input';
import { useComposedRefs } from 'lib/react/useComposeRefs';
import { setInputElementValue } from 'lib/dom/setInputValue';

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

type ControlInputProps<V> = Omit<InputProps, 'value' | 'onChange'> & {
  value: V;
  onChange: (value: V) => void;
  inputRef?: React.Ref<HTMLInputElement>;
  parse: (input: string) => ControlInputParserResult<V>;
  format: (value: V) => string;
  clamp?: (value: V) => V;
};

const Field = <V,>(props: ControlInputProps<V>) => {
  const { className, inputRef: forwardedRef, value, onChange, format, parse, clamp, ...controlInputProps } = props;
  const ref = useRef<HTMLInputElement>(null);
  const composedRef = useComposedRefs(forwardedRef, ref);

  useEffect(() => {
    setInputElementValue(ref.current, format(value));
  }, [value, format]);

  const submit = (input: string) => {
    const parserResult = parseInput(input);

    if (input.length === 0 || !parserResult.valid || parserResult.value === value) {
      return revert();
    }

    onChange(parserResult.value);
  };

  const revert = () => {
    setInputElementValue(ref.current, format(value));
  };

  const parseInput = (input: string): ControlInputParserResult<V> => {
    const parserResult = parse(input);
    if (!parserResult.valid) {
      return parserResult;
    }

    const value = clamp ? clamp(parserResult.value) : parserResult.value;
    return { valid: true, value };
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
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      {...controlInputProps}
    />
  );
};

export type { ControlInputProps, ControlInputParserResult };
export { Root, Field };
