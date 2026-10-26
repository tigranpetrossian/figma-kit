import React from 'react';
import { Tabs as BaseTabs } from '@base-ui/react/tabs';
import { addClassName } from '@lib/react/add-class-name';

type RootElement = React.ElementRef<typeof BaseTabs.Root>;
type RootProps = BaseTabs.Root.Props;

const Root = React.forwardRef<RootElement, RootProps>((props, ref) => {
  const { className, ...rootProps } = props;
  return <BaseTabs.Root ref={ref} className={addClassName(className, 'fp-TabsRoot')} {...rootProps} />;
});

type ListElement = React.ElementRef<typeof BaseTabs.List>;
type ListProps = BaseTabs.List.Props;

const List = React.forwardRef<ListElement, ListProps>((props, ref) => {
  const { className, ...listProps } = props;
  return <BaseTabs.List ref={ref} className={addClassName(className, 'fp-TabsList')} {...listProps} />;
});

type TabElement = React.ElementRef<typeof BaseTabs.Tab>;
type TabProps = BaseTabs.Tab.Props;

const Tab = React.forwardRef<TabElement, TabProps>((props, ref) => {
  const { className, children, ...tabProps } = props;

  return (
    <BaseTabs.Tab ref={ref} className={addClassName(className, 'fp-TabsTrigger')} {...tabProps}>
      <span className="fp-TabsTriggerLabel">{children}</span>
      <span className="fp-TabsTriggerLabel fp-TabsTriggerLabelHidden" aria-hidden>
        {children}
      </span>
    </BaseTabs.Tab>
  );
});

type PanelElement = React.ElementRef<typeof BaseTabs.Panel>;
type PanelProps = BaseTabs.Panel.Props;

const Panel = React.forwardRef<PanelElement, PanelProps>((props, ref) => {
  const { className, ...panelProps } = props;
  return <BaseTabs.Panel ref={ref} className={addClassName(className, 'fp-TabsContent')} {...panelProps} />;
});

Root.displayName = 'Tabs.Root';
List.displayName = 'Tabs.List';
Tab.displayName = 'Tabs.Tab';
Panel.displayName = 'Tabs.Panel';

export type { RootProps, ListProps, TabProps, PanelProps };
export { Root, List, Tab, Panel };
