import React from 'react';
import { cx } from 'class-variance-authority';
import type { InputProps } from 'components/Input';
import { Input } from 'components/Input';

type RootElement = React.ElementRef<'div'>;
type RootProps = React.ComponentPropsWithoutRef<'div'>;

const Root = React.forwardRef<RootElement, RootProps>((props, ref) => {
  const { className, ...rootProps } = props;

  return <div ref={ref} className={cx(className, 'fp-ControlInputRoot')} {...rootProps} />;
});

type ControlInputElement = React.ElementRef<typeof Input>;
type ControlInputProps = InputProps;

const Field = React.forwardRef<ControlInputElement, ControlInputProps>((props, ref) => {
  const { className, ...controlInputProps } = props;

  return (
    <Input
      ref={ref}
      dir="auto"
      autoComplete="off"
      spellCheck="false"
      selectOnClick={true}
      className={cx(className, 'fp-ControlInputField')}
      variant="base"
      {...controlInputProps}
    />
  );
});

export type { ControlInputProps };
export { Root, Field };
