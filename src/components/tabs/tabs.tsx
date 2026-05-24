import React, { useCallback } from 'react';
import * as RadixTabs from '@radix-ui/react-tabs';
import { cx } from 'class-variance-authority';
import { composeRefs } from '@lib/react/use-compose-refs';

type RootElement = React.ElementRef<typeof RadixTabs.Root>;
type RootProps = RadixTabs.TabsProps;

const Root = React.forwardRef<RootElement, RootProps>((props, ref) => {
  const { className, ...rootProps } = props;
  return <RadixTabs.Root ref={ref} className={cx(className, 'fp-TabsRoot')} {...rootProps} />;
});

type ListElement = React.ElementRef<typeof RadixTabs.List>;
type ListProps = RadixTabs.TabsListProps;

const List = React.forwardRef<ListElement, ListProps>((props, ref) => {
  const { className, ...listProps } = props;
  return <RadixTabs.List ref={ref} className={cx(className, 'fp-TabsList')} {...listProps} />;
});

type TriggerElement = React.ElementRef<typeof RadixTabs.Trigger>;
type TriggerProps = RadixTabs.TabsTriggerProps;

const Trigger = React.forwardRef<TriggerElement, TriggerProps>((props, forwardedRef) => {
  const { className, ...triggerProps } = props;
  const triggerRef = useFixedTriggerWidth();
  const ref = composeRefs(forwardedRef, triggerRef);

  return <RadixTabs.Trigger ref={ref} className={cx(className, 'fp-TabsTrigger')} {...triggerProps} />;
});

/**
 * Hardcode the initial trigger width onto the element to prevent layout shifts when the font-weight changes with state.
 * An alternative solution would be using overlaying pseudo-elements in CSS, but this would complicate the API for the consumer,
 * requiring them to manually specify the label and somehow slot icons when used.
 * Note:
 * This won't handle the unlikely case of the trigger label changing after it's been rendered.
 */
function useFixedTriggerWidth() {
  return useCallback((node: TriggerElement) => {
    if (node !== null) {
      node.style.width = node.getBoundingClientRect().width + 'px';
    }
  }, []);
}

type ContentElement = React.ElementRef<typeof RadixTabs.Content>;
type ContentProps = RadixTabs.TabsContentProps;

const Content = React.forwardRef<ContentElement, ContentProps>((props, ref) => {
  const { className, ...contentProps } = props;
  return <RadixTabs.Content ref={ref} className={cx(className, 'fp-TabsContent')} {...contentProps} />;
});

Root.displayName = 'Tabs.Root';
List.displayName = 'Tabs.List';
Trigger.displayName = 'Tabs.Trigger';
Content.displayName = 'Tabs.Content';

export type { RootProps, ListProps, TriggerProps, ContentProps };
export { Root, List, Trigger, Content };
