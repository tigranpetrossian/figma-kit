import React from 'react';
import * as RadixTooltip from '@radix-ui/react-tooltip';
import { cx } from 'class-variance-authority';

const { TooltipProvider } = RadixTooltip;
type TooltipProviderProps = RadixTooltip.TooltipProviderProps;

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
    <RadixTooltip.Root {...rootProps}>
      <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
      <RadixTooltip.Portal forceMount={forceMount} container={container}>
        <Content ref={ref} arrowPadding={10} {...contentProps}>
          {content}
          <Arrow />
        </Content>
      </RadixTooltip.Portal>
    </RadixTooltip.Root>
  );
});

Tooltip.displayName = 'Tooltip';

export { TooltipProvider, Tooltip };
export type { TooltipProps, TooltipProviderProps };
