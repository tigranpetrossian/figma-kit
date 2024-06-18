import React from 'react';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

const button = cva('fp-buttonBase', {
  variants: {
    variant: {
      primary: 'fp-buttonPrimary',
      secondary: 'fp-buttonSecondary',
      inverse: 'fp-buttonInverse',
      destructive: 'fp-buttonDestructive',
      destructiveSecondary: 'fp-buttonDestructiveSecondary',
      success: 'fp-buttonSuccess',
      text: 'fp-buttonText',
    },
    fullWidth: {
      true: 'fp-buttonFullWidth',
    },
  },

  defaultVariants: {
    variant: 'secondary',
  },
});

type ButtonElement = React.ElementRef<'button'>;
type ButtonProps = React.ComponentPropsWithoutRef<'button'> & VariantProps<typeof button>;

const Button = React.forwardRef<ButtonElement, ButtonProps>((props, ref) => {
  const { className, variant, ...buttonProps } = props;

  return <button ref={ref} className={button({ className, variant })} {...buttonProps} />;
});

export type { ButtonProps };
export { Button };
