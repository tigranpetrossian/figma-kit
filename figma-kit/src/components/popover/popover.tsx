import type { CSSProperties } from 'react';
import React from 'react';
import * as RadixPopover from '@radix-ui/react-popover';
import { cx } from 'class-variance-authority';
import { IconButton } from '@components/icon-button';
import { CloseIcon } from '@components/icons';

type RootProps = RadixPopover.PopoverProps;
type AnchorProps = RadixPopover.PopoverAnchorProps;
const Root = RadixPopover.Root;
const Anchor = RadixPopover.Anchor;
type PortalProps = RadixPopover.PopoverPortalProps;
const Portal = RadixPopover.Portal;

type TriggerElement = React.ElementRef<typeof RadixPopover.Trigger>;
type TriggerProps = Omit<RadixPopover.PopoverTriggerProps, 'asChild'>;

const Trigger = React.forwardRef<TriggerElement, TriggerProps>((props, ref) => {
  return <RadixPopover.Trigger ref={ref} {...props} asChild />;
});

type ContentElement = React.ElementRef<typeof RadixPopover.Content>;
type ContentProps = RadixPopover.PopoverContentProps & {
  width?: CSSProperties['width'];
};

const Content = React.forwardRef<ContentElement, ContentProps>((props, ref) => {
  const { className, style, width, ...contentProps } = props;

  return (
    <RadixPopover.Content
      ref={ref}
      className={cx(className, 'fp-DialogBaseContent')}
      style={{ ...style, width }}
      {...contentProps}
    />
  );
});

type TitleElement = React.ElementRef<'div'>;
type TitleProps = React.ComponentPropsWithoutRef<'div'>;

const Title = React.forwardRef<TitleElement, TitleProps>((props, ref) => {
  const { className, ...closeProps } = props;

  return <div ref={ref} className={cx(className, 'fp-DialogBaseTitle')} {...closeProps} />;
});

type CloseElement = React.ElementRef<typeof RadixPopover.Close>;
type CloseProps = Omit<RadixPopover.PopoverCloseProps, 'asChild'>;

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

export type { RootProps, TriggerProps, PortalProps, ContentProps, TitleProps, CloseProps, AnchorProps };
export { Root, Trigger, Content, Portal, Title, Close, Anchor };

export type { HeaderProps, SectionProps, ControlsProps } from '@components/dialog.base/';
export { Header, Section, Controls } from '@components/dialog.base/';
