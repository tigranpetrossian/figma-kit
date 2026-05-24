import React from 'react';
import * as RadixCollapsible from '@radix-ui/react-collapsible';
import { cx } from 'class-variance-authority';
import { ChevronRightIcon } from '@components/icons';

type RootElement = React.ElementRef<typeof RadixCollapsible.Root>;
type RootProps = RadixCollapsible.CollapsibleProps;

const Root = React.forwardRef<RootElement, RootProps>((props, ref) => {
  const { className, ...rootProps } = props;

  return <RadixCollapsible.Root ref={ref} className={cx(className, 'fp-CollapsibleRoot')} {...rootProps} />;
});

type TriggerElement = React.ElementRef<typeof RadixCollapsible.Trigger>;
type TriggerProps = RadixCollapsible.CollapsibleTriggerProps;

const Trigger = React.forwardRef<TriggerElement, TriggerProps>((props, ref) => {
  const { className, children, ...triggerProps } = props;

  return (
    <RadixCollapsible.Trigger ref={ref} className={cx(className, 'fp-CollapsibleTrigger')} {...triggerProps}>
      <ChevronRightIcon viewBox="4 4 16 16" size="4" className="fp-CollapsibleIndicator" />
      {children}
    </RadixCollapsible.Trigger>
  );
});

type ContentElement = React.ElementRef<typeof RadixCollapsible.Content>;
type ContentProps = RadixCollapsible.CollapsibleContentProps;

const Content = React.forwardRef<ContentElement, ContentProps>((props, ref) => {
  const { className, ...contentProps } = props;

  return <RadixCollapsible.Content ref={ref} className={cx(className, 'fp-CollapsibleContent')} {...contentProps} />;
});

Root.displayName = 'Collapsible.Root';
Trigger.displayName = 'Collapsible.Trigger';
Content.displayName = 'Collapsible.Content';

export type { RootProps, ContentProps, TriggerProps };
export { Root, Content, Trigger };
