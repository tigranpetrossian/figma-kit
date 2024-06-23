import React from 'react';
import * as RadixDialog from '@radix-ui/react-dialog';
import type { VariantProps } from 'class-variance-authority';
import { cva, cx } from 'class-variance-authority';
import { IconButton } from '@components/icon-button';
import { CloseIcon } from '@components/icons';

type RootProps = RadixDialog.DialogProps;
const Root = RadixDialog.Root;

type TriggerElement = React.ElementRef<typeof RadixDialog.Trigger>;
type TriggerProps = Omit<RadixDialog.DialogTriggerProps, 'asChild'>;

const Trigger = React.forwardRef<TriggerElement, TriggerProps>((props, ref) => {
  return <RadixDialog.Trigger ref={ref} {...props} asChild />;
});

const content = cva(['fp-DialogBaseContent', 'fp-DialogContent'], {
  variants: {
    size: {
      default: 'fp-size-default',
      fullscreen: 'fp-size-fullscreen',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

type ContentElement = React.ElementRef<typeof RadixDialog.Content>;
type ContentProps = RadixDialog.DialogContentProps &
  VariantProps<typeof content> & {
    overlay?: boolean;
    portal?: boolean;
    portalContainer?: RadixDialog.DialogPortalProps['container'];
  };

const Content = React.forwardRef<ContentElement, ContentProps>((props, ref) => {
  const { children, className, size, overlay = false, portal, portalContainer, ...contentProps } = props;
  const contentElement = (
    <>
      {overlay ? <RadixDialog.Overlay className="fp-DialogBaseOverlay" /> : null}
      <RadixDialog.Content
        ref={ref}
        className={content({ className, size })}
        // Majority figma dialogs typically don't have descriptions. Users can override this as needed.
        aria-describedby={undefined}
        {...contentProps}
      >
        {children}
      </RadixDialog.Content>
    </>
  );

  return portal ? (
    <RadixDialog.Portal container={portalContainer}>{contentElement}</RadixDialog.Portal>
  ) : (
    contentElement
  );
});

type TitleElement = React.ElementRef<typeof RadixDialog.Title>;
type TitleProps = RadixDialog.DialogTitleProps;

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

export {
  Root,
  Trigger,
  Content,
  Title,
  Close,
  type RootProps,
  type TriggerProps,
  type ContentProps,
  type TitleProps,
  type CloseProps,
};
export {
  Header,
  Section,
  Controls,
  type HeaderProps,
  type SectionProps,
  type ControlsProps,
} from '@components/dialog.base/';
