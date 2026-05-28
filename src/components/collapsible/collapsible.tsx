import React from 'react';
import { Collapsible as BaseCollapsible } from '@base-ui/react/collapsible';
import { ChevronRightIcon } from '@components/icons';
import { addClassName } from '@lib/react/add-class-name';

type RootElement = React.ElementRef<typeof BaseCollapsible.Root>;
type RootProps = BaseCollapsible.Root.Props;

const Root = React.forwardRef<RootElement, RootProps>((props, ref) => {
  const { className, ...rootProps } = props;

  return <BaseCollapsible.Root ref={ref} className={addClassName(className, 'fp-CollapsibleRoot')} {...rootProps} />;
});

type TriggerElement = React.ElementRef<typeof BaseCollapsible.Trigger>;
type TriggerProps = BaseCollapsible.Trigger.Props;

const Trigger = React.forwardRef<TriggerElement, TriggerProps>((props, ref) => {
  const { className, children, ...triggerProps } = props;

  return (
    <BaseCollapsible.Trigger
      ref={ref}
      className={addClassName(className, 'fp-CollapsibleTrigger')}
      {...triggerProps}
    >
      <ChevronRightIcon viewBox="4 4 16 16" size="4" className="fp-CollapsibleIndicator" />
      {children}
    </BaseCollapsible.Trigger>
  );
});

type PanelElement = React.ElementRef<typeof BaseCollapsible.Panel>;
type PanelProps = BaseCollapsible.Panel.Props;

const Panel = React.forwardRef<PanelElement, PanelProps>((props, ref) => {
  const { className, ...panelProps } = props;

  return <BaseCollapsible.Panel ref={ref} className={addClassName(className, 'fp-CollapsibleContent')} {...panelProps} />;
});

Root.displayName = 'Collapsible.Root';
Trigger.displayName = 'Collapsible.Trigger';
Panel.displayName = 'Collapsible.Panel';

export type { RootProps, PanelProps, TriggerProps };
export { Root, Panel, Trigger };
