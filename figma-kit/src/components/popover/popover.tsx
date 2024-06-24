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
type ContentProps = RadixPopover.PopoverContentProps;

const Content = React.forwardRef<ContentElement, ContentProps>((props, ref) => {
  const { className, ...contentProps } = props;

  return <RadixPopover.Content ref={ref} className={cx(className, 'fp-DialogBaseContent')} {...contentProps} />;
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

export {
  Root,
  Trigger,
  Content,
  Portal,
  Title,
  Close,
  Anchor,
  type RootProps,
  type TriggerProps,
  type PortalProps,
  type ContentProps,
  type TitleProps,
  type CloseProps,
  type AnchorProps,
};

export {
  Header,
  Section,
  Controls,
  type HeaderProps,
  type SectionProps,
  type ControlsProps,
} from '@components/dialog.base/';
