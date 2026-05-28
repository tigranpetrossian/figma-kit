import React from 'react';
import { Tooltip as BaseTooltip } from '@base-ui/react/tooltip';
import { addClassName } from '@lib/react/add-class-name';

type TooltipProviderValue = {
  disableHoverablePopup?: boolean | undefined;
};

const TooltipProviderContext = React.createContext<TooltipProviderValue>({});

type TooltipProviderProps = BaseTooltip.Provider.Props & {
  disableHoverablePopup?: boolean | undefined;
};

const TooltipProvider = (props: TooltipProviderProps) => {
  const { children, disableHoverablePopup, ...providerProps } = props;
  const value = React.useMemo(() => {
    return { disableHoverablePopup };
  }, [disableHoverablePopup]);

  return (
    <TooltipProviderContext.Provider value={value}>
      <BaseTooltip.Provider {...providerProps}>{children}</BaseTooltip.Provider>
    </TooltipProviderContext.Provider>
  );
};

type ContentElement = HTMLDivElement;
type ContentProps = BaseTooltip.Popup.Props;

const Content = React.forwardRef<ContentElement, ContentProps>((props, ref) => {
  const { className, ...contentProps } = props;
  return <BaseTooltip.Popup ref={ref} className={addClassName(className, 'fp-tooltip')} {...contentProps} />;
});

type ArrowProps = BaseTooltip.Arrow.Props;

const Arrow = (props: ArrowProps) => {
  const { className, ...arrowProps } = props;
  return (
    <BaseTooltip.Arrow
      className={addClassName(className, 'fp-tooltip-arrow')}
      render={
        <svg xmlns="http://www.w3.org/2000/svg" width="10" height="5" viewBox="0 0 30 10" preserveAspectRatio="none">
          <polygon points="0,0 30,0 15,10" />
        </svg>
      }
      {...arrowProps}
    />
  );
};

type TooltipElement = HTMLDivElement;
type TooltipPositioningProps = Pick<
  BaseTooltip.Positioner.Props,
  | 'align'
  | 'alignOffset'
  | 'anchor'
  | 'arrowPadding'
  | 'collisionAvoidance'
  | 'collisionBoundary'
  | 'collisionPadding'
  | 'disableAnchorTracking'
  | 'positionMethod'
  | 'side'
  | 'sideOffset'
  | 'sticky'
>;
type TooltipRootProps = Pick<
  BaseTooltip.Root.Props,
  | 'defaultOpen'
  | 'disableHoverablePopup'
  | 'disabled'
  | 'onOpenChange'
  | 'onOpenChangeComplete'
  | 'open'
  | 'trackCursorAxis'
>;
type TooltipTriggerProps = Pick<BaseTooltip.Trigger.Props, 'closeDelay' | 'closeOnClick' | 'delay'>;
type TooltipProps = Omit<BaseTooltip.Popup.Props, 'children' | 'content'> &
  TooltipPositioningProps &
  TooltipRootProps &
  TooltipTriggerProps & {
  children: NonNullable<BaseTooltip.Trigger.Props['render']>;
  container?: BaseTooltip.Portal.Props['container'] | undefined;
  content: React.ReactNode;
  keepMounted?: BaseTooltip.Portal.Props['keepMounted'] | undefined;
};

const Tooltip = React.forwardRef<TooltipElement, TooltipProps>((props, ref) => {
  const {
    defaultOpen,
    disabled,
    open,
    onOpenChange,
    onOpenChangeComplete,
    delay,
    closeDelay,
    closeOnClick,
    disableHoverablePopup,
    trackCursorAxis,
    container,
    keepMounted,
    side,
    sideOffset,
    align,
    alignOffset,
    anchor,
    arrowPadding,
    collisionAvoidance,
    collisionBoundary,
    collisionPadding,
    disableAnchorTracking,
    positionMethod,
    sticky,
    children,
    content,
    ...contentProps
  } = props;
  const provider = React.useContext(TooltipProviderContext);

  return (
    <BaseTooltip.Root
      defaultOpen={defaultOpen}
      disabled={disabled}
      disableHoverablePopup={disableHoverablePopup ?? provider.disableHoverablePopup}
      onOpenChange={onOpenChange}
      onOpenChangeComplete={onOpenChangeComplete}
      open={open}
      trackCursorAxis={trackCursorAxis}
    >
      <BaseTooltip.Trigger closeDelay={closeDelay} closeOnClick={closeOnClick} delay={delay} render={children} />
      <BaseTooltip.Portal keepMounted={keepMounted} container={container}>
        <BaseTooltip.Positioner
          align={align}
          alignOffset={alignOffset}
          anchor={anchor}
          arrowPadding={arrowPadding ?? 8}
          collisionAvoidance={collisionAvoidance}
          collisionBoundary={collisionBoundary}
          collisionPadding={collisionPadding}
          disableAnchorTracking={disableAnchorTracking}
          positionMethod={positionMethod}
          side={side}
          sideOffset={sideOffset ?? 7}
          sticky={sticky}
        >
          <Content ref={ref} {...contentProps}>
            {content}
          </Content>
          <Arrow />
        </BaseTooltip.Positioner>
      </BaseTooltip.Portal>
    </BaseTooltip.Root>
  );
});

Tooltip.displayName = 'Tooltip';

export { TooltipProvider, Tooltip };
export type { TooltipProps, TooltipProviderProps };
