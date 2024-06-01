import React from 'react';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

const inputBase = cva('fp-inputBase', {
  variants: {
    variant: {
      normal: 'normal',
      ghost: 'ghost',
      underline: 'underline',
    },
  },
  defaultVariants: {
    variant: 'normal',
  },
});

type InputBaseProps = React.ComponentPropsWithoutRef<'input'> & VariantProps<typeof inputBase>;
type InputBaseElement = React.ElementRef<'input'>;

const InputBase = React.forwardRef<InputBaseElement, InputBaseProps>((props, ref) => {
  const { type = 'text', variant, className, ...inputProps } = props;

  return <input type={type} className={inputBase({ className, variant })} {...inputProps} ref={ref} />;
});

export type { InputBaseProps };
export { InputBase };
