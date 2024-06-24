import type { CSSProperties } from 'react';
import React from 'react';
import * as RadixDialog from '@radix-ui/react-dialog';
import type { VariantProps } from 'class-variance-authority';
import { cva, cx } from 'class-variance-authority';
import { IconButton } from '@components/icon-button';
import { CloseIcon } from '@components/icons';

type RootProps = RadixDialog.DialogProps;
const Root = RadixDialog.Root;
type PortalProps = RadixDialog.DialogPortalProps;
const Portal = RadixDialog.Portal;

type TriggerElement = React.ElementRef<typeof RadixDialog.Trigger>;
type TriggerProps = Omit<RadixDialog.DialogTriggerProps, 'asChild'>;

const Trigger = React.forwardRef<TriggerElement, TriggerProps>((props, ref) => {
  return <RadixDialog.Trigger ref={ref} {...props} asChild />;
});

const content = cva(['fp-DialogBaseContent', 'fp-DialogContent'], {
  variants: {
    size: {
      '1': 'fp-size-1',
      '2': 'fp-size-2',
      '3': 'fp-size-3',
      fullscreen: 'fp-size-fullscreen',
    },
    placement: {
      center: 'fp-placement-center',
      top: 'fp-placement-top',
    },
  },
  defaultVariants: {
    size: '2',
    placement: 'top',
  },
});

type ContentElement = React.ElementRef<typeof RadixDialog.Content>;
type ContentProps = RadixDialog.DialogContentProps &
  VariantProps<typeof content> & {
    width?: CSSProperties['width'];
  };

const Content = React.forwardRef<ContentElement, ContentProps>((props, ref) => {
  const { children, className, size, placement, style, width, ...contentProps } = props;

  return (
    <RadixDialog.Content
      ref={ref}
      className={content({ className, size, placement })}
      // Majority figma dialogs typically don't have descriptions. Users can override this as needed.
      aria-describedby={undefined}
      style={{ ...style, width }}
      {...contentProps}
    >
      {children}
    </RadixDialog.Content>
  );
});

type OverlayElement = React.ElementRef<typeof RadixDialog.Overlay>;
type OverlayProps = Omit<RadixDialog.DialogOverlayProps, 'asChild'>;

const Overlay = React.forwardRef<OverlayElement, OverlayProps>((props, ref) => {
  const { className, ...overlayProps } = props;

  return <RadixDialog.Overlay ref={ref} className={cx(className, 'fp-DialogBaseOverlay')} {...overlayProps} />;
});

type TitleElement = React.ElementRef<typeof RadixDialog.Title>;
type TitleProps = Omit<RadixDialog.DialogTitleProps, 'asChild'>;

const Title = React.forwardRef<TitleElement, TitleProps>((props, ref) => {
  const { children, className, ...closeProps } = props;

  return (
    <RadixDialog.Title ref={ref} className={cx(className, 'fp-DialogBaseTitle')} {...closeProps}>
      {children}
    </RadixDialog.Title>
  );
});

type CloseElement = React.ElementRef<typeof RadixDialog.Close>;
type CloseProps = Omit<RadixDialog.DialogCloseProps, 'asChild'>;

const Close = React.forwardRef<CloseElement, CloseProps>((props, ref) => {
  const { children, ...closeProps } = props;

  return (
    <RadixDialog.Close ref={ref} asChild {...closeProps}>
      {children || (
        <IconButton aria-label="Close" disableTooltip>
          <CloseIcon />
        </IconButton>
      )}
    </RadixDialog.Close>
  );
});

export type { RootProps, TriggerProps, PortalProps, ContentProps, OverlayProps, TitleProps, CloseProps };
export { Root, Trigger, Portal, Content, Overlay, Title, Close };
export type { HeaderProps, SectionProps, ControlsProps } from '@components/dialog.base/';
export { Header, Section, Controls } from '@components/dialog.base/';
