import React from 'react';
import type { VariantProps } from 'class-variance-authority';
import { cx, cva } from 'class-variance-authority';
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

type LinkElement = React.ElementRef<'a'>;
type LinkProps = React.ComponentPropsWithoutRef<'a'> &
  VariantProps<typeof text> & {
    asChild?: boolean;
  };

const Link = React.forwardRef<LinkElement, LinkProps>((props, ref) => {
  const { asChild, className, size, weight, align, block, ...linkProps } = props;
  const Element = asChild ? Slot : 'a';

  return (
    <Element
      ref={ref}
      className={cx(
        text({
          className,
          size,
          weight,
          align,
          block,
        }),
        'fp-Link'
      )}
      {...linkProps}
    />
  );
});

export type { TextProps, LabelProps, ParagraphProps, LinkProps };
export { Text, Label, Paragraph, Link };
