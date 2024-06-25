import React from 'react';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

type Options = {
  path: React.ReactElement;
  displayName?: string;
  viewBox?: string;
};

const icon = cva('fp-Icon', {
  variants: {
    size: {
      '1': 'fp-size-1',
      '2': 'fp-size-2',
      '2_5': 'fp-size-2_5',
      '3': 'fp-size-3',
      '3_5': 'fp-size-3_5',
      '4': 'fp-size-4',
      '5': 'fp-size-5',
      '6': 'fp-size-6',
      '7': 'fp-size-7',
      '8': 'fp-size-8',
    },
  },
  defaultVariants: {
    size: '4',
  },
});

type IconElement = React.ElementRef<'svg'>;
type IconProps = React.ComponentPropsWithoutRef<'svg'> &
  VariantProps<typeof icon> & {
    color?: string;
  };

function createIcon(options: Options) {
  const { path, viewBox = '0 0 16 16', displayName } = options;

  const Component = React.forwardRef<IconElement, IconProps>((props, ref) => {
    const { size, color = 'currentColor', className, ...iconProps } = props;

    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        ref={ref}
        viewBox={viewBox}
        className={icon({ className, size })}
        fill={color}
        {...iconProps}
      >
        {path}
      </svg>
    );
  });

  Component.displayName = displayName || 'Icon';

  return Component;
}

export type { IconProps };
export { createIcon };
