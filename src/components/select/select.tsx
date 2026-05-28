import React from 'react';
import { Select as BaseSelect } from '@base-ui/react/select';
import { addClassName } from '@lib/react/add-class-name';

type RootProps<Value = unknown, Multiple extends boolean | undefined = false> = BaseSelect.Root.Props<Value, Multiple>;
const Root = BaseSelect.Root;

type PortalProps = BaseSelect.Portal.Props;
const Portal = BaseSelect.Portal;
type ValueProps = BaseSelect.Value.Props;
const Value = BaseSelect.Value;
type LabelProps = BaseSelect.Label.Props;
const Label = BaseSelect.Label;
type ArrowProps = BaseSelect.Arrow.Props;
const Arrow = BaseSelect.Arrow;

type TriggerElement = HTMLButtonElement;
type TriggerProps = BaseSelect.Trigger.Props;

const Trigger = React.forwardRef<TriggerElement, TriggerProps>((props, ref) => {
  const { className, ...triggerProps } = props;

  return <BaseSelect.Trigger ref={ref} className={addClassName(className, 'fp-SelectTrigger')} {...triggerProps} />;
});

type IconElement = HTMLSpanElement;
type IconProps = BaseSelect.Icon.Props;

const Icon = React.forwardRef<IconElement, IconProps>((props, ref) => {
  const { className, ...iconProps } = props;

  return <BaseSelect.Icon ref={ref} className={addClassName(className, 'fp-SelectTriggerIcon')} {...iconProps} />;
});

type PositionerElement = HTMLDivElement;
type PositionerProps = BaseSelect.Positioner.Props;

const Positioner = React.forwardRef<PositionerElement, PositionerProps>((props, ref) => {
  const { className, positionMethod = 'fixed', ...positionerProps } = props;

  return (
    <BaseSelect.Positioner
      ref={ref}
      className={addClassName(className, 'fp-SelectPositioner')}
      positionMethod={positionMethod}
      {...positionerProps}
    />
  );
});

type PopupElement = HTMLDivElement;
type PopupProps = BaseSelect.Popup.Props;

const Popup = React.forwardRef<PopupElement, PopupProps>((props, ref) => {
  const { className, ...popupProps } = props;

  return <BaseSelect.Popup ref={ref} className={addClassName(className, 'fp-MenuContent')} {...popupProps} />;
});

type ListElement = HTMLDivElement;
type ListProps = BaseSelect.List.Props;

const List = React.forwardRef<ListElement, ListProps>((props, ref) => {
  return <BaseSelect.List ref={ref} {...props} />;
});

type ItemElement = HTMLElement;
type ItemProps = BaseSelect.Item.Props;

const Item = React.forwardRef<ItemElement, ItemProps>((props, ref) => {
  const { className, ...itemProps } = props;

  return <BaseSelect.Item ref={ref} className={addClassName(className, 'fp-MenuItem fp-MenuCheckboxItem')} {...itemProps} />;
});

type ItemTextProps = BaseSelect.ItemText.Props;
const ItemText = BaseSelect.ItemText;

type ItemIndicatorElement = HTMLSpanElement;
type ItemIndicatorProps = BaseSelect.ItemIndicator.Props;

const ItemIndicator = React.forwardRef<ItemIndicatorElement, ItemIndicatorProps>((props, ref) => {
  const { className, ...indicatorProps } = props;

  return <BaseSelect.ItemIndicator ref={ref} className={addClassName(className, 'fp-MenuItemIndicator')} {...indicatorProps} />;
});

type SeparatorElement = HTMLDivElement;
type SeparatorProps = BaseSelect.Separator.Props;

const Separator = React.forwardRef<SeparatorElement, SeparatorProps>((props, ref) => {
  const { className, ...separatorProps } = props;
  return <BaseSelect.Separator ref={ref} className={addClassName(className, 'fp-MenuSeparator')} {...separatorProps} />;
});

type GroupElement = HTMLDivElement;
type GroupProps = BaseSelect.Group.Props;

const Group = React.forwardRef<GroupElement, GroupProps>((props, ref) => {
  const { className, ...groupProps } = props;
  return <BaseSelect.Group ref={ref} className={addClassName(className, 'fp-MenuGroup')} {...groupProps} />;
});

type GroupLabelElement = HTMLDivElement;
type GroupLabelProps = BaseSelect.GroupLabel.Props;

const GroupLabel = React.forwardRef<GroupLabelElement, GroupLabelProps>((props, ref) => {
  const { className, ...labelProps } = props;
  return <BaseSelect.GroupLabel ref={ref} className={addClassName(className, 'fp-MenuLabel')} {...labelProps} />;
});

type ScrollUpArrowElement = HTMLDivElement;
type ScrollUpArrowProps = BaseSelect.ScrollUpArrow.Props;

const ScrollUpArrow = React.forwardRef<ScrollUpArrowElement, ScrollUpArrowProps>((props, ref) => {
  const { className, ...arrowProps } = props;
  return <BaseSelect.ScrollUpArrow ref={ref} className={addClassName(className, 'fp-SelectScrollUpButton')} {...arrowProps} />;
});

type ScrollDownArrowElement = HTMLDivElement;
type ScrollDownArrowProps = BaseSelect.ScrollDownArrow.Props;

const ScrollDownArrow = React.forwardRef<ScrollDownArrowElement, ScrollDownArrowProps>((props, ref) => {
  const { className, ...arrowProps } = props;
  return (
    <BaseSelect.ScrollDownArrow ref={ref} className={addClassName(className, 'fp-SelectScrollDownButton')} {...arrowProps} />
  );
});

Trigger.displayName = 'Select.Trigger';
Icon.displayName = 'Select.Icon';
Positioner.displayName = 'Select.Positioner';
Popup.displayName = 'Select.Popup';
List.displayName = 'Select.List';
Item.displayName = 'Select.Item';
ItemIndicator.displayName = 'Select.ItemIndicator';
Separator.displayName = 'Select.Separator';
Group.displayName = 'Select.Group';
GroupLabel.displayName = 'Select.GroupLabel';
ScrollUpArrow.displayName = 'Select.ScrollUpArrow';
ScrollDownArrow.displayName = 'Select.ScrollDownArrow';

export type {
  RootProps,
  PortalProps,
  ValueProps,
  LabelProps,
  TriggerProps,
  IconProps,
  PositionerProps,
  PopupProps,
  ListProps,
  ItemProps,
  ItemTextProps,
  ItemIndicatorProps,
  SeparatorProps,
  GroupProps,
  GroupLabelProps,
  ScrollUpArrowProps,
  ScrollDownArrowProps,
  ArrowProps,
};
export {
  Root,
  Portal,
  Value,
  Label,
  Trigger,
  Icon,
  Positioner,
  Popup,
  List,
  Item,
  ItemText,
  ItemIndicator,
  Separator,
  Group,
  GroupLabel,
  ScrollUpArrow,
  ScrollDownArrow,
  Arrow,
};
