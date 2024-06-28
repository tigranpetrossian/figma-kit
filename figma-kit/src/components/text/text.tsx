import React from 'react';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import { Slot } from '@radix-ui/react-slot';

const text = cva('fp-Text', {
  variants: {
    size: {
      small: 'fp-size-small',
      medium: 'fp-size-medium',
      large: 'fp-size-large',
    },
    weight: {
      default: 'fp-weight-default',
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
    size: 'medium',
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
  const { asChild, className, size, weight, align, block, ...textProps } = props;
  const Element = asChild ? Slot : 'span';

  return (
    <Element
      ref={ref}
      className={text({
        className,
        size,
        weight,
        align,
        block,
      })}
      {...textProps}
    />
  );
});

type LabelElement = React.ElementRef<'label'>;
type LabelProps = React.ComponentPropsWithoutRef<'label'> & VariantProps<typeof text>;

const Label = React.forwardRef<LabelElement, LabelProps>((props, ref) => {
  const { className, size, weight, align, block, ...labelProps } = props;

  return (
    <label
      ref={ref}
      className={text({
        className,
        size,
        weight,
        align,
        block,
      })}
      {...labelProps}
    />
  );
});

type ParagraphElement = React.ElementRef<'p'>;
type ParagraphProps = React.ComponentPropsWithoutRef<'p'> & VariantProps<typeof text>;

const Paragraph = React.forwardRef<ParagraphElement, ParagraphProps>((props, ref) => {
  const { className, size, weight, align, block, ...paragraphProps } = props;

  return (
    <p
      ref={ref}
      className={text({
        className,
        size,
        weight,
        align,
        block,
      })}
      {...paragraphProps}
    />
  );
});

export type { TextProps, LabelProps, ParagraphProps };
export { Text, Label, Paragraph };
