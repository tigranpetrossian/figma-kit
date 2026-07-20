import React from 'react';
import { ContextMenu as BaseContextMenu } from '@base-ui/react/context-menu';
import { ChevronRightIcon } from '@components/icons';
import { addClassName } from '@lib/react/add-class-name';

type RootProps = BaseContextMenu.Root.Props;
const Root = BaseContextMenu.Root;
type TriggerProps = BaseContextMenu.Trigger.Props;
const Trigger = BaseContextMenu.Trigger;
type PortalProps = BaseContextMenu.Portal.Props;
const Portal = BaseContextMenu.Portal;
type PositionerProps = BaseContextMenu.Positioner.Props;
const Positioner = BaseContextMenu.Positioner;
type SubmenuRootProps = BaseContextMenu.SubmenuRoot.Props;
const SubmenuRoot = BaseContextMenu.SubmenuRoot;
type RadioGroupProps = BaseContextMenu.RadioGroup.Props;
const RadioGroup = BaseContextMenu.RadioGroup;

type PopupElement = HTMLDivElement;
type PopupProps = BaseContextMenu.Popup.Props;

const Popup = React.forwardRef<PopupElement, PopupProps>((props, ref) => {
  const { className, ...popupProps } = props;
  return <BaseContextMenu.Popup ref={ref} className={addClassName(className, 'fp-MenuContent')} {...popupProps} />;
});

type ItemElement = HTMLElement;
type ItemProps = BaseContextMenu.Item.Props;

const Item = React.forwardRef<ItemElement, ItemProps>((props, ref) => {
  const { className, ...itemProps } = props;
  return <BaseContextMenu.Item ref={ref} className={addClassName(className, 'fp-MenuItem')} {...itemProps} />;
});

type SeparatorElement = HTMLDivElement;
type SeparatorProps = BaseContextMenu.Separator.Props;

const Separator = React.forwardRef<SeparatorElement, SeparatorProps>((props, ref) => {
  const { className, ...separatorProps } = props;
  return (
    <BaseContextMenu.Separator ref={ref} className={addClassName(className, 'fp-MenuSeparator')} {...separatorProps} />
  );
});

type GroupLabelElement = HTMLDivElement;
type GroupLabelProps = BaseContextMenu.GroupLabel.Props;

const GroupLabel = React.forwardRef<GroupLabelElement, GroupLabelProps>((props, ref) => {
  const { className, ...labelProps } = props;
  return <BaseContextMenu.GroupLabel ref={ref} className={addClassName(className, 'fp-MenuLabel')} {...labelProps} />;
});

type GroupElement = HTMLDivElement;
type GroupProps = BaseContextMenu.Group.Props;

const Group = React.forwardRef<GroupElement, GroupProps>((props, ref) => {
  const { className, ...groupProps } = props;
  return <BaseContextMenu.Group ref={ref} className={addClassName(className, 'fp-MenuGroup')} {...groupProps} />;
});

type SubmenuTriggerElement = HTMLElement;
type SubmenuTriggerProps = BaseContextMenu.SubmenuTrigger.Props;

const renderItemWithCaret: SubmenuTriggerProps['render'] = (props) => {
  const { children, ...itemProps } = props;

  return (
    <div {...itemProps}>
      {children}
      <ChevronRightIcon className="fp-MenuSubtriggerCaret" />
    </div>
  );
};

const SubmenuTrigger = React.forwardRef<SubmenuTriggerElement, SubmenuTriggerProps>((props, ref) => {
  const { className, render = renderItemWithCaret, ...triggerProps } = props;

  return (
    <BaseContextMenu.SubmenuTrigger
      ref={ref}
      className={addClassName(className, 'fp-MenuItem')}
      render={render}
      {...triggerProps}
    />
  );
});

type CheckboxItemElement = HTMLElement;
type CheckboxItemProps = BaseContextMenu.CheckboxItem.Props;

const CheckboxItem = React.forwardRef<CheckboxItemElement, CheckboxItemProps>((props, ref) => {
  const { className, ...itemProps } = props;

  return (
    <BaseContextMenu.CheckboxItem
      ref={ref}
      className={addClassName(className, 'fp-MenuItem fp-MenuCheckboxItem')}
      {...itemProps}
    />
  );
});

type CheckboxItemIndicatorElement = HTMLSpanElement;
type CheckboxItemIndicatorProps = BaseContextMenu.CheckboxItemIndicator.Props;

const CheckboxItemIndicator = React.forwardRef<CheckboxItemIndicatorElement, CheckboxItemIndicatorProps>(
  (props, ref) => {
    const { className, ...indicatorProps } = props;

    return (
      <BaseContextMenu.CheckboxItemIndicator
        ref={ref}
        className={addClassName(className, 'fp-MenuItemIndicator')}
        {...indicatorProps}
      />
    );
  }
);

type RadioItemElement = HTMLElement;
type RadioItemProps = BaseContextMenu.RadioItem.Props;

const RadioItem = React.forwardRef<RadioItemElement, RadioItemProps>((props, ref) => {
  const { className, ...itemProps } = props;

  return (
    <BaseContextMenu.RadioItem
      ref={ref}
      className={addClassName(className, 'fp-MenuItem fp-MenuRadioItem')}
      {...itemProps}
    />
  );
});

type RadioItemIndicatorElement = HTMLSpanElement;
type RadioItemIndicatorProps = BaseContextMenu.RadioItemIndicator.Props;

const RadioItemIndicator = React.forwardRef<RadioItemIndicatorElement, RadioItemIndicatorProps>((props, ref) => {
  const { className, ...indicatorProps } = props;

  return (
    <BaseContextMenu.RadioItemIndicator
      ref={ref}
      className={addClassName(className, 'fp-MenuItemIndicator')}
      {...indicatorProps}
    />
  );
});

Popup.displayName = 'ContextMenu.Popup';
Item.displayName = 'ContextMenu.Item';
Separator.displayName = 'ContextMenu.Separator';
Group.displayName = 'ContextMenu.Group';
GroupLabel.displayName = 'ContextMenu.GroupLabel';
SubmenuTrigger.displayName = 'ContextMenu.SubmenuTrigger';
CheckboxItem.displayName = 'ContextMenu.CheckboxItem';
CheckboxItemIndicator.displayName = 'ContextMenu.CheckboxItemIndicator';
RadioItem.displayName = 'ContextMenu.RadioItem';
RadioItemIndicator.displayName = 'ContextMenu.RadioItemIndicator';

export type {
  RootProps,
  TriggerProps,
  PortalProps,
  PositionerProps,
  PopupProps,
  ItemProps,
  SeparatorProps,
  GroupProps,
  GroupLabelProps,
  SubmenuRootProps,
  SubmenuTriggerProps,
  CheckboxItemProps,
  CheckboxItemIndicatorProps,
  RadioGroupProps,
  RadioItemProps,
  RadioItemIndicatorProps,
};
export {
  Root,
  Trigger,
  Portal,
  Positioner,
  Popup,
  Item,
  Separator,
  Group,
  GroupLabel,
  SubmenuRoot,
  SubmenuTrigger,
  CheckboxItem,
  CheckboxItemIndicator,
  RadioGroup,
  RadioItem,
  RadioItemIndicator,
};
