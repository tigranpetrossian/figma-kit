import React from 'react';
import { Popover as BasePopover } from '@base-ui/react/popover';
import { IconButton } from '@components/icon-button';
import { CloseIcon } from '@components/icons';
import { Text } from '@components/text';
import { addClassName } from '@lib/react/add-class-name';

type RootProps = BasePopover.Root.Props;
const Root = BasePopover.Root;
type TriggerProps = BasePopover.Trigger.Props;
const Trigger = BasePopover.Trigger;

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
type CloseProps = BasePopover.Close.Props;

const Close = React.forwardRef<CloseElement, CloseProps>((props, ref) => {
  const {
    render = (
      <IconButton aria-label="Close" disableTooltip>
        <CloseIcon />
      </IconButton>
    ),
    ...closeProps
  } = props;

  return <BasePopover.Close ref={ref} render={render} {...closeProps} />;
});

Popup.displayName = 'Popover.Popup';
Positioner.displayName = 'Popover.Positioner';
Title.displayName = 'Popover.Title';
Close.displayName = 'Popover.Close';

export type { RootProps, TriggerProps, PortalProps, PositionerProps, PopupProps, TitleProps, CloseProps };
export { Root, Trigger, Portal, Positioner, Popup, Title, Close };

export type { HeaderProps, SectionProps, ControlsProps } from '@components/dialog.base/';
export { Header, Section, Controls } from '@components/dialog.base/';
