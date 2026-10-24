import React from 'react';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

const iconButton = cva('fp-IconButton', {
  variants: {
    size: {
      small: 'fp-size-small',
      medium: 'fp-size-medium',
    },
    activeAppearance: {
      subtle: 'fp-active-appearance-subtle',
      solid: 'fp-active-appearance-solid',
    },
  },
  defaultVariants: {
    size: 'small',
    activeAppearance: 'subtle',
  },
});

type IconButtonElement = React.ElementRef<'button'>;
type IconButtonProps = React.ComponentPropsWithoutRef<'button'> &
  VariantProps<typeof iconButton> & {
    'aria-label': string;
  };

const IconButton = React.forwardRef<IconButtonElement, IconButtonProps>((props, ref) => {
  const { className, size, activeAppearance, ...iconButtonProps } = props;

  return <button ref={ref} className={iconButton({ className, size, activeAppearance })} {...iconButtonProps} />;
});

IconButton.displayName = 'IconButton';

export type { IconButtonProps };
export { IconButton };
