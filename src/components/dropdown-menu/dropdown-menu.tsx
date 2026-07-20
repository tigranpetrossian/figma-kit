import React from 'react';
import { Menu as BaseMenu } from '@base-ui/react/menu';
import { ChevronRightIcon } from '@components/icons';
import { addClassName } from '@lib/react/add-class-name';

type RootProps = BaseMenu.Root.Props;
const Root = BaseMenu.Root;
type TriggerProps = BaseMenu.Trigger.Props;
const Trigger = BaseMenu.Trigger;
type PortalProps = BaseMenu.Portal.Props;
const Portal = BaseMenu.Portal;
type PositionerProps = BaseMenu.Positioner.Props;
const Positioner = BaseMenu.Positioner;
type SubmenuRootProps = BaseMenu.SubmenuRoot.Props;
const SubmenuRoot = BaseMenu.SubmenuRoot;
type RadioGroupProps = BaseMenu.RadioGroup.Props;
const RadioGroup = BaseMenu.RadioGroup;

type PopupElement = HTMLDivElement;
type PopupProps = BaseMenu.Popup.Props;

const Popup = React.forwardRef<PopupElement, PopupProps>((props, ref) => {
  const { className, ...popupProps } = props;

  return <BaseMenu.Popup ref={ref} className={addClassName(className, 'fp-MenuContent')} {...popupProps} />;
});

type ItemElement = HTMLElement;
type ItemProps = BaseMenu.Item.Props;

const Item = React.forwardRef<ItemElement, ItemProps>((props, ref) => {
  const { className, ...itemProps } = props;

  return <BaseMenu.Item ref={ref} className={addClassName(className, 'fp-MenuItem')} {...itemProps} />;
});

type SeparatorElement = HTMLDivElement;
type SeparatorProps = BaseMenu.Separator.Props;

const Separator = React.forwardRef<SeparatorElement, SeparatorProps>((props, ref) => {
  const { className, ...separatorProps } = props;
  return <BaseMenu.Separator ref={ref} className={addClassName(className, 'fp-MenuSeparator')} {...separatorProps} />;
});

type GroupLabelElement = HTMLDivElement;
type GroupLabelProps = BaseMenu.GroupLabel.Props;

const GroupLabel = React.forwardRef<GroupLabelElement, GroupLabelProps>((props, ref) => {
  const { className, ...labelProps } = props;
  return <BaseMenu.GroupLabel ref={ref} className={addClassName(className, 'fp-MenuLabel')} {...labelProps} />;
});

type GroupElement = HTMLDivElement;
type GroupProps = BaseMenu.Group.Props;

const Group = React.forwardRef<GroupElement, GroupProps>((props, ref) => {
  const { className, ...groupProps } = props;
  return <BaseMenu.Group ref={ref} className={addClassName(className, 'fp-MenuGroup')} {...groupProps} />;
});

type SubmenuTriggerElement = HTMLElement;
type SubmenuTriggerProps = BaseMenu.SubmenuTrigger.Props;

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
    <BaseMenu.SubmenuTrigger
      ref={ref}
      className={addClassName(className, 'fp-MenuItem')}
      render={render}
      {...triggerProps}
    />
  );
});

type CheckboxItemElement = HTMLElement;
type CheckboxItemProps = BaseMenu.CheckboxItem.Props;

const CheckboxItem = React.forwardRef<CheckboxItemElement, CheckboxItemProps>((props, ref) => {
  const { className, ...itemProps } = props;

  return (
    <BaseMenu.CheckboxItem
      ref={ref}
      className={addClassName(className, 'fp-MenuItem fp-MenuCheckboxItem')}
      {...itemProps}
    />
  );
});

type CheckboxItemIndicatorElement = HTMLSpanElement;
type CheckboxItemIndicatorProps = BaseMenu.CheckboxItemIndicator.Props;

const CheckboxItemIndicator = React.forwardRef<CheckboxItemIndicatorElement, CheckboxItemIndicatorProps>(
  (props, ref) => {
    const { className, ...indicatorProps } = props;

    return (
      <BaseMenu.CheckboxItemIndicator
        ref={ref}
        className={addClassName(className, 'fp-MenuItemIndicator')}
        {...indicatorProps}
      />
    );
  }
);

type RadioItemElement = HTMLElement;
type RadioItemProps = BaseMenu.RadioItem.Props;

const RadioItem = React.forwardRef<RadioItemElement, RadioItemProps>((props, ref) => {
  const { className, ...itemProps } = props;

  return (
    <BaseMenu.RadioItem ref={ref} className={addClassName(className, 'fp-MenuItem fp-MenuRadioItem')} {...itemProps} />
  );
});

type RadioItemIndicatorElement = HTMLSpanElement;
type RadioItemIndicatorProps = BaseMenu.RadioItemIndicator.Props;

const RadioItemIndicator = React.forwardRef<RadioItemIndicatorElement, RadioItemIndicatorProps>((props, ref) => {
  const { className, ...indicatorProps } = props;

  return (
    <BaseMenu.RadioItemIndicator
      ref={ref}
      className={addClassName(className, 'fp-MenuItemIndicator')}
      {...indicatorProps}
    />
  );
});

Popup.displayName = 'DropdownMenu.Popup';
Item.displayName = 'DropdownMenu.Item';
Separator.displayName = 'DropdownMenu.Separator';
Group.displayName = 'DropdownMenu.Group';
GroupLabel.displayName = 'DropdownMenu.GroupLabel';
SubmenuTrigger.displayName = 'DropdownMenu.SubmenuTrigger';
CheckboxItem.displayName = 'DropdownMenu.CheckboxItem';
CheckboxItemIndicator.displayName = 'DropdownMenu.CheckboxItemIndicator';
RadioItem.displayName = 'DropdownMenu.RadioItem';
RadioItemIndicator.displayName = 'DropdownMenu.RadioItemIndicator';

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
