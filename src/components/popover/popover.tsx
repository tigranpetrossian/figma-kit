import React from 'react';
import { Popover as BasePopover } from '@base-ui/react/popover';
import { IconButton } from '@components/icon-button';
import { CloseIcon } from '@components/icons';
import { Text } from '@components/text';
import { addClassName } from '@lib/react/add-class-name';

type RootProps = BasePopover.Root.Props;
const Root = BasePopover.Root;
type TriggerElement = HTMLButtonElement;
type TriggerProps = Omit<BasePopover.Trigger.Props, 'children' | 'nativeButton' | 'render'> & {
  children: NonNullable<BasePopover.Trigger.Props['render']>;
};

const Trigger = React.forwardRef<TriggerElement, TriggerProps>((props, ref) => {
  const { children, ...triggerProps } = props;

  return <BasePopover.Trigger ref={ref} render={children} {...triggerProps} />;
});

type PortalProps = BasePopover.Portal.Props;
const Portal = BasePopover.Portal;
type PositionerElement = HTMLDivElement;
type PositionerProps = BasePopover.Positioner.Props;

const Positioner = React.forwardRef<PositionerElement, PositionerProps>((props, ref) => {
  const { positionMethod = 'fixed', ...positionerProps } = props;
  return <BasePopover.Positioner ref={ref} positionMethod={positionMethod} {...positionerProps} />;
});

type PopupElement = HTMLDivElement;
type PopupProps = BasePopover.Popup.Props;

const Popup = React.forwardRef<PopupElement, PopupProps>((props, ref) => {
  const { className, ...popupProps } = props;
  return <BasePopover.Popup ref={ref} className={addClassName(className, 'fp-DialogBaseContent')} {...popupProps} />;
});

type TitleElement = HTMLHeadingElement;
type TitleProps = BasePopover.Title.Props;

const Title = React.forwardRef<TitleElement, TitleProps>((props, ref) => {
  const { className, render = <Text weight="strong" />, ...titleProps } = props;

  return (
    <BasePopover.Title
      ref={ref}
      className={addClassName(className, 'fp-DialogBaseTitle')}
      render={render}
      {...titleProps}
    />
  );
});

type CloseElement = HTMLButtonElement;
type CloseProps = Omit<BasePopover.Close.Props, 'children' | 'nativeButton' | 'render'> & {
  children?: BasePopover.Close.Props['render'] | undefined;
};

const Close = React.forwardRef<CloseElement, CloseProps>((props, ref) => {
  const { children, ...closeProps } = props;
  const close = children ?? (
    <IconButton aria-label="Close" disableTooltip>
      <CloseIcon />
    </IconButton>
  );

  return <BasePopover.Close ref={ref} render={close} {...closeProps} />;
});

Trigger.displayName = 'Popover.Trigger';
Popup.displayName = 'Popover.Popup';
Positioner.displayName = 'Popover.Positioner';
Title.displayName = 'Popover.Title';
Close.displayName = 'Popover.Close';

export type { RootProps, TriggerProps, PortalProps, PositionerProps, PopupProps, TitleProps, CloseProps };
export { Root, Trigger, Portal, Positioner, Popup, Title, Close };

export type { HeaderProps, SectionProps, ControlsProps } from '@components/dialog.base/';
export { Header, Section, Controls } from '@components/dialog.base/';
