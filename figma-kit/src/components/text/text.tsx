import React from 'react';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import { Slot } from '@radix-ui/react-slot';

const text = cva('fp-Text', {
  variants: {
    size: {
      '1': 'fp-size-1',
      '2': 'fp-size-2',
      '3': 'fp-size-3',
      '4': 'fp-size-4',
      '5': 'fp-size-5',
      '6': 'fp-size-6',
      '7': 'fp-size-7',
      '8': 'fp-size-8',
      '9': 'fp-size-9',
      '10': 'fp-size-10',
      '11': 'fp-size-11',
      '12': 'fp-size-12',
      '13': 'fp-size-13',
      '14': 'fp-size-14',
      '15': 'fp-size-15',
      '16': 'fp-size-16',
      '17': 'fp-size-17',
      '18': 'fp-size-18',
    },
    weight: {
      default: 'fp-weight-default',
      medium: 'fp-weight-medium',
      strong: 'fp-weight-strong',
    },
    align: {
      start: 'fp-align-start',
      center: 'fp-align-center',
      end: 'fp-align-end',
    },
    block: {
      true: 'fp-block',
    },
  },
  defaultVariants: {
    size: '3',
    weight: 'default',
    align: 'start',
  },
});

type TextElement = React.ElementRef<'span'>;
type TextProps = React.ComponentPropsWithoutRef<'span'> &
  VariantProps<typeof text> & {
    asChild?: boolean;
  };

const Text = React.forwardRef<TextElement, TextProps>((props, ref) => {
  const { asChild, className, size, weight, align, ...textProps } = props;
  const Element = asChild ? Slot : 'span';

  return (
    <Element
      ref={ref}
      className={text({
        className,
        size,
        weight,
        align,
      })}
      {...textProps}
    />
  );
});

type LabelElement = React.ElementRef<'label'>;
type LabelProps = React.ComponentPropsWithoutRef<'label'> & VariantProps<typeof text>;

const Label = React.forwardRef<LabelElement, LabelProps>((props, ref) => {
  const { className, size, weight, align, ...labelProps } = props;

  return (
    <label
      ref={ref}
      className={text({
        className,
        size,
        weight,
        align,
      })}
      {...labelProps}
    />
  );
});

type ParagraphElement = React.ElementRef<'p'>;
type ParagraphProps = React.ComponentPropsWithoutRef<'p'> & VariantProps<typeof text>;

const Paragraph = React.forwardRef<ParagraphElement, ParagraphProps>((props, ref) => {
  const { className, size, weight, align, ...paragraphProps } = props;

  return (
    <p
      ref={ref}
      className={text({
        className,
        size,
        weight,
        align,
      })}
      {...paragraphProps}
    />
  );
});

export type { TextProps, LabelProps, ParagraphProps };
export { Text, Label, Paragraph };
