import React, { useRef } from 'react';
import mergeProps from 'merge-props';
import { cx } from 'class-variance-authority';
import { useSelectOnInputClick } from '@lib/react/use-select-on-input-click';
import { useComposedRefs } from '@lib/react/use-compose-refs';

type InputElement = React.ElementRef<'input'>;
type InputProps = React.ComponentPropsWithoutRef<'input'> & {
  selectOnClick?: boolean;
};

const Input = React.forwardRef<InputElement, InputProps>((props, forwardedRef) => {
  const { type = 'text', className, selectOnClick = false, ...rest } = props;
  const ref = useRef<HTMLInputElement>(null);
  const composedRef = useComposedRefs(ref, forwardedRef);
  const { onMouseLeave, onMouseUp, onFocus } = useSelectOnInputClick();
  const inputProps = selectOnClick ? mergeProps({ onMouseLeave, onMouseUp, onFocus }, rest) : rest;

  return <input ref={composedRef} type={type} className={cx(className, 'fp-Input')} {...inputProps} />;
});

Input.displayName = 'Input';

export type { InputProps };
export { Input };
