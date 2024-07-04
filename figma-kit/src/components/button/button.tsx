import React from 'react';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

const button = cva('fp-Button', {
  variants: {
    variant: {
      primary: 'fp-variant-primary',
      secondary: 'fp-variant-secondary',
      inverse: 'fp-variant-inverse',
      destructive: 'fp-variant-destructive',
      success: 'fp-variant-success',
      text: 'fp-variant-text',
    },
    size: {
      small: 'fp-size-small',
      medium: 'fp-size-medium',
    },
    fullWidth: {
      true: 'fp-full-width',
    },
  },

  defaultVariants: {
    variant: 'secondary',
    size: 'small',
  },
});

type ButtonElement = React.ElementRef<'button'>;
type ButtonProps = React.ComponentPropsWithoutRef<'button'> & VariantProps<typeof button>;

const Button = React.forwardRef<ButtonElement, ButtonProps>((props, ref) => {
  const { className, variant, size, fullWidth, ...buttonProps } = props;

  return <button ref={ref} className={button({ className, variant, size, fullWidth })} {...buttonProps} />;
});

Button.displayName = 'Button';

export type { ButtonProps };
export { Button };
