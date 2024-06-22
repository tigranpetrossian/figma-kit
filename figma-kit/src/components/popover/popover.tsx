import React from 'react';
import * as RadixPopover from '@radix-ui/react-popover';
import type { VariantProps } from 'class-variance-authority';
import { cva, cx } from 'class-variance-authority';
import { IconButton } from '@components/icon-button';
import { CloseIcon } from '@components/icons';

const Root = RadixPopover.Root;
const Trigger = RadixPopover.Trigger;
const Anchor = RadixPopover.Anchor;

type ContentElement = React.ElementRef<typeof RadixPopover.Content>;
type ContentProps = RadixPopover.PopoverContentProps & {
  portal?: boolean;
  portalContainer?: RadixPopover.PopoverPortalProps['container'];
};

const Content = React.forwardRef<ContentElement, ContentProps>((props, ref) => {
  const { children, className, portal, portalContainer, ...contentProps } = props;
  const Wrapper = portal ? RadixPopover.Portal : React.Fragment;

  return (
    <Wrapper container={portalContainer}>
      <RadixPopover.Content ref={ref} className={cx(className, 'fp-DialogContent')} {...contentProps}>
        {children}
      </RadixPopover.Content>
    </Wrapper>
  );
});

type HeaderElement = React.ElementRef<'header'>;
type HeaderProps = React.ComponentPropsWithoutRef<'header'>;

const Header = React.forwardRef<HeaderElement, HeaderProps>((props, ref) => {
  const { children, className, ...closeProps } = props;

  return (
    <header ref={ref} className={cx(className, 'fp-DialogHeader')} {...closeProps}>
      {children}
    </header>
  );
});

type TitleElement = React.ElementRef<'div'>;
type TitleProps = React.ComponentPropsWithoutRef<'div'>;

const Title = React.forwardRef<TitleElement, TitleProps>((props, ref) => {
  const { children, className, ...closeProps } = props;

  return (
    <div ref={ref} className={cx(className, 'fp-DialogTitle')} {...closeProps}>
      {children}
    </div>
  );
});

type ControlsElement = React.ElementRef<'div'>;
type ControlsProps = React.ComponentPropsWithoutRef<'div'>;

const Controls = React.forwardRef<ControlsElement, ControlsProps>((props, ref) => {
  const { className, ...controlProps } = props;

  return <div ref={ref} className={cx(className, 'fp-DialogControls')} {...controlProps} />;
});

type CloseElement = React.ElementRef<typeof RadixPopover.Close>;

type CloseProps = Omit<React.ComponentPropsWithoutRef<typeof RadixPopover.Close>, 'asChild'>;

const Close = React.forwardRef<CloseElement, CloseProps>((props, ref) => {
  const { children, ...closeProps } = props;

  return (
    <RadixPopover.Close ref={ref} asChild {...closeProps}>
      {children || (
        <IconButton aria-label="Close" disableTooltip>
          <CloseIcon />
        </IconButton>
      )}
    </RadixPopover.Close>
  );
});
type SectionElement = React.ElementRef<'div'>;

type SectionProps = React.ComponentPropsWithoutRef<'div'> & VariantProps<typeof section>;
const Section = React.forwardRef<SectionElement, SectionProps>((props, ref) => {
  const { className, size, ...sectionProps } = props;

  return <div ref={ref} className={section({ className, size })} {...sectionProps} />;
});

const section = cva('fp-DialogSection', {
  variants: {
    size: {
      base: 'fp-DialogSection-base',
      small: 'fp-DialogSection-small',
    },
  },
  defaultVariants: {
    size: 'base',
  },
});

export type { ContentProps };
export { Root, Trigger, Content, Header, Title, Controls, Section, Close, Anchor };
