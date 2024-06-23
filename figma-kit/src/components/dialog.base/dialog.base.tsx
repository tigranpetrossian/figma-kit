import React from 'react';
import type { VariantProps } from 'class-variance-authority';
import { cva, cx } from 'class-variance-authority';

type HeaderElement = React.ElementRef<'header'>;
type HeaderProps = React.ComponentPropsWithoutRef<'header'>;

const Header = React.forwardRef<HeaderElement, HeaderProps>((props, ref) => {
  const { children, className, ...closeProps } = props;

  return (
    <header ref={ref} className={cx(className, 'fp-DialogBaseHeader')} {...closeProps}>
      {children}
    </header>
  );
});

type SectionElement = React.ElementRef<'div'>;
type SectionProps = React.ComponentPropsWithoutRef<'div'> & VariantProps<typeof section>;

const Section = React.forwardRef<SectionElement, SectionProps>((props, ref) => {
  const { className, size, ...sectionProps } = props;

  return <div ref={ref} className={section({ className, size })} {...sectionProps} />;
});

type ControlsElement = React.ElementRef<'div'>;
type ControlsProps = React.ComponentPropsWithoutRef<'div'>;

const Controls = React.forwardRef<ControlsElement, ControlsProps>((props, ref) => {
  const { className, ...controlProps } = props;
  return <div ref={ref} className={cx(className, 'fp-DialogBaseControls')} {...controlProps} />;
});

const section = cva('fp-DialogBaseSection', {
  variants: {
    size: {
      base: 'fp-DialogBaseSection-base',
      small: 'fp-DialogBaseSection-small',
    },
  },
  defaultVariants: {
    size: 'base',
  },
});

export { Header, Section, Controls, type HeaderProps, type SectionProps, type ControlsProps };
