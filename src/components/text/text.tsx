import React from 'react';
import { useRender } from '@base-ui/react/use-render';
import type { VariantProps } from 'class-variance-authority';
import { cx, cva } from 'class-variance-authority';
import { fromKeys } from 'remeda';

const TEXT_SIZES = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'] as const;

const TEXT_COLORS = [
  'default',
  'secondary',
  'tertiary',
  'disabled',
  'brand',
  'brand-secondary',
  'brand-tertiary',
  'selected',
  'selected-secondary',
  'selected-tertiary',
  'component',
  'component-secondary',
  'component-tertiary',
  'danger',
  'danger-secondary',
  'danger-tertiary',
  'warning',
  'warning-secondary',
  'warning-tertiary',
  'success',
  'success-secondary',
  'success-tertiary',
  'onbrand',
  'onbrand-secondary',
  'onbrand-tertiary',
  'onselected',
  'onselected-secondary',
  'onselected-tertiary',
  'onselected-strong',
  'oncomponent',
  'oncomponent-secondary',
  'oncomponent-tertiary',
  'ondanger',
  'ondanger-secondary',
  'ondanger-tertiary',
  'onwarning',
  'onwarning-secondary',
  'onwarning-tertiary',
  'onsuccess',
  'onsuccess-secondary',
  'onsuccess-tertiary',
  'ondisabled',
  'oninverse',
] as const;

const TEXT_SIZE_VARIANTS = fromKeys(TEXT_SIZES, (size) => `fp-size-${size}`);

const TEXT_COLOR_VARIANTS = fromKeys(TEXT_COLORS, (color) => `fp-color-${color}`);

const HEADING_LEVELS: Record<HeadingLevel, { tagName: HeadingTagName; size: TextSize }> = {
  1: { tagName: 'h1', size: '9' },
  2: { tagName: 'h2', size: '7' },
  3: { tagName: 'h3', size: '5' },
  4: { tagName: 'h4', size: '4' },
  5: { tagName: 'h5', size: '3' },
};

const text = cva('fp-Text', {
  variants: {
    size: TEXT_SIZE_VARIANTS,
    weight: {
      default: 'fp-weight-default',
      strong: 'fp-weight-strong',
    },
    color: TEXT_COLOR_VARIANTS,
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

type TextVariants = VariantProps<typeof text>;
type TextSize = (typeof TEXT_SIZES)[number];
type TextWeight = NonNullable<TextVariants['weight']>;
type TextColor = (typeof TEXT_COLORS)[number];
type HeadingLevel = 1 | 2 | 3 | 4 | 5;
type HeadingTagName = 'h1' | 'h2' | 'h3' | 'h4' | 'h5';

type TextElementProps<TagName extends keyof React.JSX.IntrinsicElements> = Omit<
  React.ComponentPropsWithoutRef<TagName>,
  'color'
> &
  TextVariants & {
    render?: useRender.RenderProp | undefined;
  };

type TextProps = TextElementProps<'span'>;

const Text = React.forwardRef<HTMLSpanElement, TextProps>((props, ref) => {
  const { render, ...textProps } = props;

  return useRender({
    defaultTagName: 'span',
    render,
    ref,
    props: resolveTextProps(textProps),
  });
});

type LabelProps = TextElementProps<'label'>;

const Label = React.forwardRef<HTMLLabelElement, LabelProps>((props, ref) => {
  const { render, ...labelProps } = props;

  return useRender({
    defaultTagName: 'label',
    render,
    ref,
    props: resolveTextProps(labelProps),
  });
});

type ParagraphProps = TextElementProps<'p'>;

const Paragraph = React.forwardRef<HTMLParagraphElement, ParagraphProps>((props, ref) => {
  const { render, ...paragraphProps } = props;

  return useRender({
    defaultTagName: 'p',
    render,
    ref,
    props: resolveTextProps(paragraphProps),
  });
});

type LinkProps = TextElementProps<'a'>;

const Link = React.forwardRef<HTMLAnchorElement, LinkProps>((props, ref) => {
  const { render, className, color = 'brand', ...linkProps } = props;

  return useRender({
    defaultTagName: 'a',
    render,
    ref,
    props: resolveTextProps({ className: cx('fp-Link', className), color, ...linkProps }),
  });
});

type HeadingProps = TextElementProps<'h1'> & {
  level?: HeadingLevel | undefined;
};

const Heading = React.forwardRef<HTMLHeadingElement, HeadingProps>((props, ref) => {
  const { render, level = 1, size, weight = 'strong', ...headingProps } = props;
  const { tagName, size: levelSize } = HEADING_LEVELS[level];

  return useRender({
    defaultTagName: tagName,
    render,
    ref,
    props: resolveTextProps({ size: size ?? levelSize, weight, ...headingProps }),
  });
});

function resolveTextProps<Props extends TextVariants & { className?: string | undefined }>(props: Props) {
  const { className, size, weight, color, align, block, ...elementProps } = props;

  return {
    className: text({ className, size, weight, color, align, block }),
    ...elementProps,
  };
}

Text.displayName = 'Text';
Label.displayName = 'Label';
Paragraph.displayName = 'Paragraph';
Link.displayName = 'Link';
Heading.displayName = 'Heading';

export type {
  TextProps,
  LabelProps,
  ParagraphProps,
  LinkProps,
  HeadingProps,
  TextSize,
  TextWeight,
  TextColor,
  HeadingLevel,
};
export { Text, Label, Paragraph, Link, Heading, TEXT_SIZES, TEXT_COLORS };
