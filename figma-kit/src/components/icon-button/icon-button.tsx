import React from 'react';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import { Tooltip } from '@components/tooltip';

const iconButton = cva('fp-IconButton', {
  variants: {
    variant: {
      default: 'fp-variant-default',
      toolbar: 'fp-variant-toolbar',
    },
  },
  defaultVariants: {
    variant: 'default', // 👍
  },
});

type IconButtonElement = React.ElementRef<'button'>;
type IconButtonProps = React.ComponentPropsWithoutRef<'button'> &
  VariantProps<typeof iconButton> & {
    'aria-label': string;
    tooltipContent?: React.ReactNode;
    disableTooltip?: boolean;
  };

const IconButton = React.forwardRef<IconButtonElement, IconButtonProps>((props, ref) => {
  const { className, variant, 'aria-label': ariaLabel, tooltipContent, disableTooltip, ...iconButtonProps } = props;
  const buttonElement = <button ref={ref} className={iconButton({ className, variant })} {...iconButtonProps} />;

  return disableTooltip ? buttonElement : <Tooltip content={tooltipContent ?? ariaLabel}>{buttonElement}</Tooltip>;
});

export type { IconButtonProps };
export { IconButton };
