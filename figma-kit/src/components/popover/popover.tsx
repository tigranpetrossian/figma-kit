import React from 'react';
import * as RadixPopover from '@radix-ui/react-popover';
import { cx } from 'class-variance-authority';
import { IconButton } from '@components/icon-button';
import { CloseIcon } from '@components/icons';

type RootProps = RadixPopover.PopoverProps;
type AnchorProps = RadixPopover.PopoverAnchorProps;
const Root = RadixPopover.Root;
const Anchor = RadixPopover.Anchor;

type TriggerElement = React.ElementRef<typeof RadixPopover.Trigger>;
type TriggerProps = Omit<RadixPopover.PopoverTriggerProps, 'asChild'>;

const Trigger = React.forwardRef<TriggerElement, TriggerProps>((props, ref) => {
  return <RadixPopover.Trigger ref={ref} {...props} asChild />;
});

type ContentElement = React.ElementRef<typeof RadixPopover.Content>;
type ContentProps = RadixPopover.PopoverContentProps & {
  portal?: boolean;
  portalContainer?: RadixPopover.PopoverPortalProps['container'];
};

const Content = React.forwardRef<ContentElement, ContentProps>((props, ref) => {
  const { children, className, portal, portalContainer, ...contentProps } = props;
  const contentElement = (
    <RadixPopover.Content ref={ref} className={cx(className, 'fp-DialogBaseContent')} {...contentProps}>
      {children}
    </RadixPopover.Content>
  );

  return portal ? (
    <RadixPopover.Portal container={portalContainer}>{contentElement}</RadixPopover.Portal>
  ) : (
    contentElement
  );
});

type TitleElement = React.ElementRef<'div'>;
type TitleProps = React.ComponentPropsWithoutRef<'div'>;

const Title = React.forwardRef<TitleElement, TitleProps>((props, ref) => {
  const { children, className, ...closeProps } = props;

  return (
    <div ref={ref} className={cx(className, 'fp-DialogBaseTitle')} {...closeProps}>
      {children}
    </div>
  );
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
  Title,
  Close,
  Anchor,
  type RootProps,
  type TriggerProps,
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
