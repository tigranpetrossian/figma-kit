import React from 'react';
import { Dialog as BaseDialog } from '@base-ui/react/dialog';
import type { VariantProps } from 'class-variance-authority';
import { cva } from 'class-variance-authority';
import { IconButton } from '@components/icon-button';
import { CloseIcon } from '@components/icons';
import { Text } from '@components/text';
import { addClassName } from '@lib/react/add-class-name';

type RootProps = BaseDialog.Root.Props;
const Root = BaseDialog.Root;
type PortalProps = BaseDialog.Portal.Props;
const Portal = BaseDialog.Portal;
const Trigger = BaseDialog.Trigger;
type TriggerProps = BaseDialog.Trigger.Props;

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

type PopupElement = HTMLDivElement;
type PopupProps = BaseDialog.Popup.Props & VariantProps<typeof content>;

const Popup = React.forwardRef<PopupElement, PopupProps>((props, ref) => {
  const { children, className, size, placement, ...popupProps } = props;
  const contentClassName = content({ size, placement });

  return (
    <BaseDialog.Popup ref={ref} className={addClassName(className, contentClassName)} {...popupProps}>
      {children}
    </BaseDialog.Popup>
  );
});

type BackdropElement = HTMLDivElement;
type BackdropProps = BaseDialog.Backdrop.Props;

const Backdrop = React.forwardRef<BackdropElement, BackdropProps>((props, ref) => {
  const { className, ...backdropProps } = props;

  return (
    <BaseDialog.Backdrop ref={ref} className={addClassName(className, 'fp-DialogBaseOverlay')} {...backdropProps} />
  );
});

type TitleElement = HTMLHeadingElement;
type TitleProps = BaseDialog.Title.Props;

const Title = React.forwardRef<TitleElement, TitleProps>((props, ref) => {
  const { className, render = <Text weight="strong" />, ...titleProps } = props;

  return (
    <BaseDialog.Title
      ref={ref}
      className={addClassName(className, 'fp-DialogBaseTitle')}
      render={render}
      {...titleProps}
    />
  );
});

type CloseElement = HTMLButtonElement;
type CloseProps = BaseDialog.Close.Props;

const Close = React.forwardRef<CloseElement, CloseProps>((props, ref) => {
  const {
    render = (
      <IconButton aria-label="Close" disableTooltip>
        <CloseIcon />
      </IconButton>
    ),
    ...closeProps
  } = props;

  return <BaseDialog.Close ref={ref} render={render} {...closeProps} />;
});

Popup.displayName = 'Dialog.Popup';
Backdrop.displayName = 'Dialog.Backdrop';
Title.displayName = 'Dialog.Title';
Close.displayName = 'Dialog.Close';

export type { RootProps, TriggerProps, PortalProps, PopupProps, BackdropProps, TitleProps, CloseProps };
export { Root, Trigger, Portal, Popup, Backdrop, Title, Close };
export type { HeaderProps, SectionProps, ControlsProps } from '@components/dialog.base/';
export { Header, Section, Controls } from '@components/dialog.base/';
