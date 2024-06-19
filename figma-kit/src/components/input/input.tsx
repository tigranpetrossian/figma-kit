import React, { useRef } from 'react';
import mergeProps from 'merge-props';
import { cva, type VariantProps } from 'class-variance-authority';
import { useSelectOnInputClick } from '@lib/react/use-select-on-input-click';
import { useComposedRefs } from '@lib/react/use-compose-refs';

const inputBase = cva('fp-inputBase', {
  variants: {
    variant: {
      /**
       * Unstyled variant for constructing mode complex fields.
       * */
      base: 'base',
      /**
       * Borderless, unless interacted with.
       * */
      ghost: 'ghost',
      /**
       * Common bordered input.
       * */
      normal: 'normal',
      /*
       * Bottom border only, unless interacted with.
       * */
      underline: 'underline',
    },
  },
  defaultVariants: {
    variant: 'normal',
  },
});

type InputElement = React.ElementRef<'input'>;
type InputProps = React.ComponentPropsWithoutRef<'input'> &
  VariantProps<typeof inputBase> & {
    selectOnClick?: boolean;
  };

const Input = React.forwardRef<InputElement, InputProps>((props, forwardedRef) => {
  const { type = 'text', variant, className, selectOnClick = false, ...rest } = props;
  const ref = useRef<HTMLInputElement>(null);
  const composedRef = useComposedRefs(ref, forwardedRef);
  const { onMouseLeave, onMouseUp, onFocus } = useSelectOnInputClick();
  const inputProps = selectOnClick ? mergeProps({ onMouseLeave, onMouseUp, onFocus }, rest) : rest;

  return <input ref={composedRef} type={type} className={inputBase({ className, variant })} {...inputProps} />;
});

export type { InputProps };
export { Input };
