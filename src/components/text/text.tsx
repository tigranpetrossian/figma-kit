import React from 'react';
import { useRender } from '@base-ui/react/use-render';
import type { VariantProps } from 'class-variance-authority';
import { cx, cva } from 'class-variance-authority';

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
    render?: useRender.RenderProp | undefined;
  };

const Text = React.forwardRef<TextElement, TextProps>((props, ref) => {
  const { className, render, size, weight, align, block, ...textProps } = props;

  return useRender({
    defaultTagName: 'span',
    render,
    ref,
    props: {
      className: text({
        className,
        size,
        weight,
        align,
        block,
      }),
      ...textProps,
    },
  });
});

Text.displayName = 'Text';

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

Label.displayName = 'Label';

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
    render?: useRender.RenderProp | undefined;
  };

Paragraph.displayName = 'Paragraph';

const Link = React.forwardRef<LinkElement, LinkProps>((props, ref) => {
  const { className, render, size, weight, align, block, ...linkProps } = props;

  return useRender({
    defaultTagName: 'a',
    render,
    ref,
    props: {
      className: cx(
        text({
          className,
          size,
          weight,
          align,
          block,
        }),
        'fp-Link'
      ),
      ...linkProps,
    },
  });
});

Link.displayName = 'Link';

export type { TextProps, LabelProps, ParagraphProps, LinkProps };
export { Text, Label, Paragraph, Link };
