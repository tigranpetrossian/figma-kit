import React, { useRef } from 'react';
import mergeProps from 'merge-props';
import { InputBase } from '@components/InputBase';
import { useSelectOnInputClick } from '@lib/react/useSelectOnInputClick';
import { useComposedRefs } from '@lib/react/useComposeRefs';

type InputElement = React.ElementRef<'input'>;
type InputProps = React.ComponentPropsWithoutRef<typeof InputBase> & {
  selectOnClick?: boolean;
};

const Input = React.forwardRef<InputElement, InputProps>((props, forwardedRef) => {
  const { selectOnClick = false, ...rest } = props;
  const ref = useRef<HTMLInputElement>(null);
  const composedRef = useComposedRefs(ref, forwardedRef);
  const { onMouseLeave, onMouseUp, onFocus } = useSelectOnInputClick();
  const inputProps = selectOnClick ? mergeProps({ onMouseLeave, onMouseUp, onFocus }, rest) : rest;

  return <InputBase ref={composedRef} {...inputProps} />;
});

export type { InputProps };
export { Input };
