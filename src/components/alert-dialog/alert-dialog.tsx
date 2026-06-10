import React from 'react';
import { AlertDialog as BaseAlertDialog } from '@base-ui/react/alert-dialog';
import { cva, cx, type VariantProps } from 'class-variance-authority';
import { Text } from '@components/text';
import { addClassName } from '@lib/react/add-class-name';

type RootProps = BaseAlertDialog.Root.Props;
const Root = BaseAlertDialog.Root;
type PortalProps = BaseAlertDialog.Portal.Props;
const Portal = BaseAlertDialog.Portal;
type TriggerProps = BaseAlertDialog.Trigger.Props;
const Trigger = BaseAlertDialog.Trigger;
type CloseProps = BaseAlertDialog.Close.Props;
const Close = BaseAlertDialog.Close;

const content = cva(['fp-DialogBaseContent', 'fp-AlertDialogContent'], {
  variants: {
    size: {
      '1': 'fp-size-1',
      '2': 'fp-size-2',
      '3': 'fp-size-3',
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
type PopupProps = BaseAlertDialog.Popup.Props & VariantProps<typeof content>;

const Popup = React.forwardRef<PopupElement, PopupProps>((props, ref) => {
  const { className, size, placement, ...popupProps } = props;
  const contentClassName = content({ size, placement });

  return <BaseAlertDialog.Popup ref={ref} className={addClassName(className, contentClassName)} {...popupProps} />;
});

type BackdropElement = HTMLDivElement;
type BackdropProps = BaseAlertDialog.Backdrop.Props;

const Backdrop = React.forwardRef<BackdropElement, BackdropProps>((props, ref) => {
  const { className, ...backdropProps } = props;

  return (
    <BaseAlertDialog.Backdrop
      ref={ref}
      className={addClassName(className, 'fp-DialogBaseOverlay')}
      {...backdropProps}
    />
  );
});

type TitleElement = HTMLHeadingElement;
type TitleProps = BaseAlertDialog.Title.Props;

const Title = React.forwardRef<TitleElement, TitleProps>((props, ref) => {
  const { className, render = <Text weight="strong" />, ...titleProps } = props;

  return (
    <BaseAlertDialog.Title
      ref={ref}
      className={addClassName(className, 'fp-AlertDialogTitle')}
      render={render}
      {...titleProps}
    />
  );
});

type DescriptionElement = HTMLParagraphElement;
type DescriptionProps = BaseAlertDialog.Description.Props;

const Description = React.forwardRef<DescriptionElement, DescriptionProps>((props, ref) => {
  const { className, render = <Text />, ...descriptionProps } = props;

  return (
    <BaseAlertDialog.Description
      ref={ref}
      className={addClassName(className, 'fp-AlertDialogDescription')}
      render={render}
      {...descriptionProps}
    />
  );
});

type ActionsElement = React.ElementRef<'div'>;
type ActionsProps = React.ComponentPropsWithoutRef<'div'> & {
  children: React.ReactNode;
};

const Actions = React.forwardRef<ActionsElement, ActionsProps>((props, ref) => {
  const { className, ...actionsProps } = props;

  return <div ref={ref} className={cx(className, 'fp-AlertDialogActions')} {...actionsProps} />;
});

Popup.displayName = 'AlertDialog.Popup';
Backdrop.displayName = 'AlertDialog.Backdrop';
Title.displayName = 'AlertDialog.Title';
Description.displayName = 'AlertDialog.Description';
Actions.displayName = 'AlertDialog.Actions';

export type {
  RootProps,
  TriggerProps,
  PopupProps,
  BackdropProps,
  PortalProps,
  TitleProps,
  DescriptionProps,
  ActionsProps,
  CloseProps,
};
export { Root, Trigger, Popup, Backdrop, Portal, Title, Description, Actions, Close };
