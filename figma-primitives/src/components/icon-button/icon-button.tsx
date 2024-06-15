import React from 'react';
import { cx } from 'class-variance-authority';
import { Tooltip } from '@components/tooltip';

type IconButtonElement = React.ElementRef<'button'>;
type IconButtonProps = React.ComponentPropsWithoutRef<'button'> & {
  'aria-label': string;
  tooltipContent?: React.ReactNode;
  disableTooltip?: boolean;
};

const IconButton = React.forwardRef<IconButtonElement, IconButtonProps>((props, ref) => {
  const { className, 'aria-label': ariaLabel, tooltipContent, disableTooltip, ...iconButtonProps } = props;
  const buttonElement = <button ref={ref} className={cx(className, 'fp-iconButton')} {...iconButtonProps} />;

  return disableTooltip ? buttonElement : <Tooltip content={tooltipContent ?? ariaLabel}>{buttonElement}</Tooltip>;
});

export type { IconButtonProps };
export { IconButton };
