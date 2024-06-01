import React from 'react';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

const inputBase = cva('fp-inputBase');

type InputBaseProps = React.ComponentPropsWithoutRef<'input'> & VariantProps<typeof inputBase>;
type InputBaseElement = React.ElementRef<'input'>;

const InputBase = React.forwardRef<InputBaseElement, InputBaseProps>((props, ref) => {
  const { type = 'text', className, ...inputProps } = props;

  return <input type={type} className={inputBase({ className })} {...inputProps} ref={ref} />;
});

export type { InputBaseProps };
export { InputBase };
