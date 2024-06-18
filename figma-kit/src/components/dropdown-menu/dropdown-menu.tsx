import React from 'react';
import * as RadixMenu from '@radix-ui/react-dropdown-menu';
import { cx } from 'class-variance-authority';
import { CaretRightIcon, CircleIcon } from '@components/icons';
import { CheckmarkIcon } from '@components/icons/checkmark';

type RootProps = RadixMenu.DropdownMenuProps;
const Root = RadixMenu.Root;
type TriggerProps = RadixMenu.DropdownMenuTriggerProps;
const Trigger = RadixMenu.Trigger;
type SubProps = RadixMenu.DropdownMenuSubProps;
const Sub = RadixMenu.Sub;
type RadioGroupProps = RadixMenu.DropdownMenuRadioGroupProps;
const RadioGroup = RadixMenu.RadioGroup;

type ContentElement = React.ElementRef<typeof RadixMenu.Content>;
type ContentProps = RadixMenu.DropdownMenuContentProps;

const Content = React.forwardRef<ContentElement, ContentProps>((props, ref) => {
  const { children, className, ...contentProps } = props;

  return (
    <RadixMenu.Portal>
      <RadixMenu.Content ref={ref} {...contentProps} className={cx(className, 'fp-MenuContent')}>
        {children}
        <RadixMenu.Arrow />
      </RadixMenu.Content>
    </RadixMenu.Portal>
  );
});

type ItemElement = React.ElementRef<typeof RadixMenu.Item>;
type ItemProps = RadixMenu.DropdownMenuItemProps;

const Item = React.forwardRef<ItemElement, ItemProps>((props, ref) => {
  const { className, ...itemProps } = props;

  return <RadixMenu.Item ref={ref} {...itemProps} className={cx(className, 'fp-MenuItem')} />;
});

type SeparatorElement = React.ElementRef<typeof RadixMenu.Separator>;
type SeparatorProps = RadixMenu.DropdownMenuSeparatorProps;

const Separator = React.forwardRef<SeparatorElement, SeparatorProps>((props, ref) => {
  const { className, ...separatorProps } = props;
  return <RadixMenu.Separator ref={ref} className={cx(className, 'fp-MenuSeparator')} {...separatorProps} />;
});

type LabelElement = React.ElementRef<typeof RadixMenu.Label>;
type LabelProps = RadixMenu.DropdownMenuLabelProps;

const Label = React.forwardRef<LabelElement, LabelProps>((props, ref) => {
  const { className, ...labelProps } = props;
  return <RadixMenu.Label ref={ref} className={cx(className, 'fp-MenuLabel')} {...labelProps} />;
});

type GroupElement = React.ElementRef<typeof RadixMenu.Group>;
type GroupProps = RadixMenu.DropdownMenuGroupProps;

const Group = React.forwardRef<GroupElement, GroupProps>((props, ref) => {
  const { className, ...groupProps } = props;
  return <RadixMenu.Group ref={ref} className={cx(className, 'fp-MenuGroup')} {...groupProps} />;
});

type SubTriggerElement = React.ElementRef<typeof RadixMenu.SubTrigger>;
type SubTriggerProps = RadixMenu.DropdownMenuSubTriggerProps;

const SubTrigger = React.forwardRef<SubTriggerElement, SubTriggerProps>((props, ref) => {
  const { children, className, ...subTriggerProps } = props;

  return (
    <RadixMenu.SubTrigger ref={ref} {...subTriggerProps} className={cx(className, 'fp-MenuItem')}>
      {children}
      <CaretRightIcon className="fp-MenuSubtriggerCaret" />
    </RadixMenu.SubTrigger>
  );
});

type SubContentElement = React.ElementRef<typeof RadixMenu.SubContent>;
type SubContentProps = RadixMenu.DropdownMenuSubContentProps;

const SubContent = React.forwardRef<SubContentElement, SubContentProps>((props, ref) => {
  const { className, ...subContentProps } = props;

  return (
    <RadixMenu.Portal>
      <RadixMenu.SubContent ref={ref} {...subContentProps} className={cx(className, 'fp-MenuContent')} />
    </RadixMenu.Portal>
  );
});

type CheckboxItemElement = React.ElementRef<typeof RadixMenu.CheckboxItem>;
type CheckboxItemProps = RadixMenu.DropdownMenuCheckboxItemProps;

const CheckboxItem = React.forwardRef<CheckboxItemElement, CheckboxItemProps>((props, ref) => {
  const { children, className, ...itemProps } = props;

  return (
    <RadixMenu.CheckboxItem ref={ref} {...itemProps} className={cx(className, 'fp-MenuItem fp-MenuCheckboxItem')}>
      <RadixMenu.ItemIndicator className="fp-MenuItemIndicator">
        <CheckmarkIcon />
      </RadixMenu.ItemIndicator>
      {children}
    </RadixMenu.CheckboxItem>
  );
});

type RadioItemElement = React.ElementRef<typeof RadixMenu.RadioItem>;
type RadioItemProps = RadixMenu.DropdownMenuRadioItemProps;

const RadioItem = React.forwardRef<RadioItemElement, RadioItemProps>((props, ref) => {
  const { children, className, ...itemProps } = props;

  return (
    <RadixMenu.RadioItem ref={ref} {...itemProps} className={cx(className, 'fp-MenuItem fp-MenuRadioItem')}>
      <RadixMenu.ItemIndicator className="fp-MenuItemIndicator">
        <CircleIcon />
      </RadixMenu.ItemIndicator>
      {children}
    </RadixMenu.RadioItem>
  );
});

export type {
  RootProps,
  TriggerProps,
  ContentProps,
  ItemProps,
  SeparatorProps,
  GroupProps,
  LabelProps,
  SubProps,
  SubTriggerProps,
  SubContentProps,
  CheckboxItemProps,
  RadioGroupProps,
  RadioItemProps,
};
export {
  Root,
  Trigger,
  Content,
  Item,
  Separator,
  Group,
  Label,
  Sub,
  SubTrigger,
  SubContent,
  CheckboxItem,
  RadioGroup,
  RadioItem,
};
