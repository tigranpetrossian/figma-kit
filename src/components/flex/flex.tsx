import React from 'react';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';

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
    gap: gapVariants('fp-gap'),
    columnGap: gapVariants('fp-columnGap'),
    rowGap: gapVariants('fp-rowGap'),
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

Flex.displayName = 'Flex';

function gapVariants(prefix: 'fp-gap' | 'fp-rowGap' | 'fp-columnGap') {
  return {
    '0': `${prefix}-0`,
    px: `${prefix}-px`,
    '0.5': `${prefix}-0_5`,
    '1': `${prefix}-1`,
    '1.5': `${prefix}-1_5`,
    '2': `${prefix}-2`,
    '2.5': `${prefix}-2_5`,
    '3': `${prefix}-3`,
    '3.5': `${prefix}-3_5`,
    '4': `${prefix}-4`,
    '5': `${prefix}-5`,
    '6': `${prefix}-6`,
    '7': `${prefix}-7`,
    '8': `${prefix}-8`,
    '9': `${prefix}-9`,
    '10': `${prefix}-10`,
    '11': `${prefix}-11`,
    '12': `${prefix}-12`,
    '13': `${prefix}-13`,
    '14': `${prefix}-14`,
    '15': `${prefix}-15`,
    '16': `${prefix}-16`,
  };
}

export type { FlexProps };
export { Flex };
