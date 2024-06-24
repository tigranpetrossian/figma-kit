import React from 'react';
import * as RadixAlertDialog from '@radix-ui/react-alert-dialog';
import { cva, cx, type VariantProps } from 'class-variance-authority';

type RootProps = RadixAlertDialog.AlertDialogProps;
const Root = RadixAlertDialog.Root;
type PortalProps = RadixAlertDialog.AlertDialogPortalProps;
const Portal = RadixAlertDialog.Portal;

type TriggerElement = React.ElementRef<typeof RadixAlertDialog.Trigger>;
type TriggerProps = Omit<RadixAlertDialog.AlertDialogTriggerProps, 'asChild'>;

const Trigger = React.forwardRef<TriggerElement, TriggerProps>((props, ref) => {
  return <RadixAlertDialog.Trigger ref={ref} {...props} asChild />;
});

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

type ContentElement = React.ElementRef<typeof RadixAlertDialog.Content>;
type ContentProps = RadixAlertDialog.AlertDialogContentProps & VariantProps<typeof content>;

const Content = React.forwardRef<ContentElement, ContentProps>((props, ref) => {
  const { className, size, placement, ...contentProps } = props;

  return <RadixAlertDialog.Content ref={ref} className={content({ className, size, placement })} {...contentProps} />;
});

type OverlayElement = React.ElementRef<typeof RadixAlertDialog.Overlay>;
type OverlayProps = Omit<RadixAlertDialog.AlertDialogOverlayProps, 'asChild'>;

const Overlay = React.forwardRef<OverlayElement, OverlayProps>((props, ref) => {
  const { className, ...overlayProps } = props;

  return <RadixAlertDialog.Overlay ref={ref} className={cx(className, 'fp-DialogBaseOverlay')} {...overlayProps} />;
});

type TitleElement = React.ElementRef<typeof RadixAlertDialog.Title>;
type TitleProps = Omit<RadixAlertDialog.AlertDialogTitleProps, 'asChild'>;

const Title = React.forwardRef<TitleElement, TitleProps>((props, ref) => {
  const { className, ...closeProps } = props;

  return <RadixAlertDialog.Title ref={ref} className={cx(className, 'fp-AlertDialogTitle')} {...closeProps} />;
});

type DescriptionElement = React.ElementRef<typeof RadixAlertDialog.Description>;
type DescriptionProps = Omit<RadixAlertDialog.AlertDialogDescriptionProps, 'asChild'>;

const Description = React.forwardRef<DescriptionElement, DescriptionProps>((props, ref) => {
  const { className, ...closeProps } = props;

  return (
    <RadixAlertDialog.Description ref={ref} className={cx(className, 'fp-AlertDialogDescription')} {...closeProps} />
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

type CancelElement = React.ElementRef<typeof RadixAlertDialog.Cancel>;
type CancelProps = Omit<RadixAlertDialog.AlertDialogCancelProps, 'asChild'>;

const Cancel = React.forwardRef<CancelElement, CancelProps>((props, ref) => {
  return <RadixAlertDialog.Cancel ref={ref} asChild {...props} />;
});

type ActionElement = React.ElementRef<typeof RadixAlertDialog.Action>;
type ActionProps = Omit<RadixAlertDialog.AlertDialogActionProps, 'asChild'>;

const Action = React.forwardRef<ActionElement, ActionProps>((props, ref) => {
  return <RadixAlertDialog.Action ref={ref} asChild {...props} />;
});

export {
  Root,
  Trigger,
  Content,
  Overlay,
  Portal,
  Title,
  Description,
  Actions,
  Cancel,
  Action,
  type RootProps,
  type TriggerProps,
  type ContentProps,
  type OverlayProps,
  type PortalProps,
  type TitleProps,
  type DescriptionProps,
  type ActionsProps,
  type CancelProps,
  type ActionProps,
};
