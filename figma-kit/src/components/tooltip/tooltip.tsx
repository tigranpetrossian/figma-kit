import React from 'react';
import * as RadixTooltip from '@radix-ui/react-tooltip';
import { cx } from 'class-variance-authority';

const TooltipProvider = RadixTooltip.TooltipProvider;
const Root = RadixTooltip.Root;
const Portal = RadixTooltip.Portal;
const Trigger = RadixTooltip.Trigger;

type ContentElement = React.ElementRef<typeof RadixTooltip.Content>;
type ContentProps = RadixTooltip.TooltipContentProps;

const Content = React.forwardRef<ContentElement, ContentProps>((props, ref) => {
  const { className, ...contentProps } = props;
  return <RadixTooltip.Content ref={ref} className={cx(className, 'fp-tooltip')} {...contentProps} />;
});

type ArrowProps = RadixTooltip.TooltipArrowProps;

const Arrow = (props: ArrowProps) => {
  const { className, ...arrowProps } = props;
  return <RadixTooltip.Arrow className={cx(className, 'fp-tooltip-arrow')} {...arrowProps} />;
};

type TooltipElement = React.ElementRef<typeof RadixTooltip.Content>;
type TooltipProps = Omit<RadixTooltip.TooltipProps & ContentProps, 'content'> & {
  children: React.ReactNode;
  container?: HTMLElement | null | undefined;
  content: React.ReactNode;
};

const Tooltip = React.forwardRef<TooltipElement, TooltipProps>((props, ref) => {
  const {
    defaultOpen,
    open,
    onOpenChange,
    delayDuration,
    disableHoverableContent,
    container,
    forceMount,
    children,
    content,
    ...contentProps
  } = props;
  const rootProps = { open, defaultOpen, onOpenChange, delayDuration, disableHoverableContent };

  return (
    <Root {...rootProps}>
      <Trigger asChild>{children}</Trigger>
      <Portal forceMount={forceMount} container={container}>
        <Content ref={ref} {...contentProps}>
          {content}
          <Arrow />
        </Content>
      </Portal>
    </Root>
  );
});

export { TooltipProvider, Tooltip, Root, Portal, Trigger, Content, Arrow };
export type { TooltipProps, ContentProps };
