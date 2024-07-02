import React from 'react';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

const gapVariants = {
  '0': 'fp-gap-0',
  px: 'fp-gap-px',
  '0_5': 'fp-gap-0_5',
  '1': 'fp-gap-1',
  '1_5': 'fp-gap-1_5',
  '2': 'fp-gap-2',
  '2_5': 'fp-gap-2_5',
  '3': 'fp-gap-3',
  '3_5': 'fp-gap-3_5',
  '4': 'fp-gap-4',
  '5': 'fp-gap-5',
  '6': 'fp-gap-6',
  '7': 'fp-gap-7',
  '8': 'fp-gap-8',
  '9': 'fp-gap-9',
  '10': 'fp-gap-10',
  '11': 'fp-gap-11',
  '12': 'fp-gap-12',
  '13': 'fp-gap-13',
  '14': 'fp-gap-14',
  '15': 'fp-gap-15',
  '16': 'fp-gap-16',
};

const flex = cva('fp-Flex', {
  variants: {
    direction: {
      row: 'fp-direction-row',
      column: 'fp-direction-column',
      rowReverse: 'fp-direction-row-reverse',
      columnReverse: 'fp-direction-column-reverse',
    },
    align: {
      start: 'fp-align-start',
      center: 'fp-align-center',
      end: 'fp-align-end',
      baseline: 'fp-align-baseline',
      stretch: 'fp-align-stretch',
    },
    justify: {
      start: 'fp-justify-start',
      center: 'fp-justify-center',
      end: 'fp-justify-end',
      between: 'fp-justify-between',
    },
    wrap: {
      nowrap: 'fp-wrap-nowrap',
      wrap: 'fp-wrap-wrap',
      wrapReverse: 'fp-wrap-wrap-reverse',
    },
    gap: gapVariants,
    columnGap: gapVariants,
    rowGap: gapVariants,
  },
  defaultVariants: {
    direction: 'row',
  },
});

type FlexElement = React.ElementRef<'div'>;
type FlexProps = React.ComponentPropsWithoutRef<'div'> & VariantProps<typeof flex>;

const Flex = React.forwardRef<FlexElement, FlexProps>((props, ref) => {
  const { className, direction, align, justify, wrap, gap, columnGap, rowGap, ...flexProps } = props;

  return (
    <div
      ref={ref}
      className={flex({ className, direction, align, justify, wrap, gap, columnGap, rowGap })}
      {...flexProps}
    />
  );
});

export type { FlexProps };
export { Flex };
