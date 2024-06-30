import React from 'react';
import * as RadixMenu from '@radix-ui/react-context-menu';
import { cx } from 'class-variance-authority';
import { CircleIcon, CheckmarkIcon, ChevronRightIcon } from '@components/icons';

type RootProps = RadixMenu.ContextMenuProps;
const Root = RadixMenu.Root;
type TriggerProps = RadixMenu.ContextMenuTriggerProps;
const Trigger = RadixMenu.Trigger;
type SubProps = RadixMenu.ContextMenuSubProps;
const Sub = RadixMenu.Sub;
type RadioGroupProps = RadixMenu.ContextMenuRadioGroupProps;
const RadioGroup = RadixMenu.RadioGroup;

type ContentElement = React.ElementRef<typeof RadixMenu.Content>;
type ContentProps = RadixMenu.ContextMenuContentProps;

const Content = React.forwardRef<ContentElement, ContentProps>((props, ref) => {
  const { children, className, ...contentProps } = props;

  return (
    <RadixMenu.Portal>
      <RadixMenu.Content ref={ref} {...contentProps} className={cx(className, 'fp-MenuContent')}>
        {children}
      </RadixMenu.Content>
    </RadixMenu.Portal>
  );
});

type ItemElement = React.ElementRef<typeof RadixMenu.Item>;
type ItemProps = RadixMenu.ContextMenuItemProps;

const Item = React.forwardRef<ItemElement, ItemProps>((props, ref) => {
  const { className, ...itemProps } = props;

  return <RadixMenu.Item ref={ref} {...itemProps} className={cx(className, 'fp-MenuItem')} />;
});

type SeparatorElement = React.ElementRef<typeof RadixMenu.Separator>;
type SeparatorProps = RadixMenu.ContextMenuSeparatorProps;

const Separator = React.forwardRef<SeparatorElement, SeparatorProps>((props, ref) => {
  const { className, ...separatorProps } = props;
  return <RadixMenu.Separator ref={ref} className={cx(className, 'fp-MenuSeparator')} {...separatorProps} />;
});

type LabelElement = React.ElementRef<typeof RadixMenu.Label>;
type LabelProps = RadixMenu.ContextMenuLabelProps;

const Label = React.forwardRef<LabelElement, LabelProps>((props, ref) => {
  const { className, ...labelProps } = props;
  return <RadixMenu.Label ref={ref} className={cx(className, 'fp-MenuLabel')} {...labelProps} />;
});

type GroupElement = React.ElementRef<typeof RadixMenu.Group>;
type GroupProps = RadixMenu.ContextMenuGroupProps;

const Group = React.forwardRef<GroupElement, GroupProps>((props, ref) => {
  const { className, ...groupProps } = props;
  return <RadixMenu.Group ref={ref} className={cx(className, 'fp-MenuGroup')} {...groupProps} />;
});

type SubTriggerElement = React.ElementRef<typeof RadixMenu.SubTrigger>;
type SubTriggerProps = RadixMenu.ContextMenuSubTriggerProps;

const SubTrigger = React.forwardRef<SubTriggerElement, SubTriggerProps>((props, ref) => {
  const { children, className, ...subTriggerProps } = props;

  return (
    <RadixMenu.SubTrigger ref={ref} {...subTriggerProps} className={cx(className, 'fp-MenuItem')}>
      {children}
      <ChevronRightIcon className="fp-MenuSubtriggerCaret" />
    </RadixMenu.SubTrigger>
  );
});

type SubContentElement = React.ElementRef<typeof RadixMenu.SubContent>;
type SubContentProps = RadixMenu.ContextMenuSubContentProps;

const SubContent = React.forwardRef<SubContentElement, SubContentProps>((props, ref) => {
  const { className, ...subContentProps } = props;

  return (
    <RadixMenu.Portal>
      <RadixMenu.SubContent
        ref={ref}
        {...subContentProps}
        className={cx(className, 'fp-MenuContent')}
        sideOffset={12}
      />
    </RadixMenu.Portal>
  );
});

type CheckboxItemElement = React.ElementRef<typeof RadixMenu.CheckboxItem>;
type CheckboxItemProps = RadixMenu.ContextMenuCheckboxItemProps;

const CheckboxItem = React.forwardRef<CheckboxItemElement, CheckboxItemProps>((props, ref) => {
  const { children, className, ...itemProps } = props;

  return (
    <RadixMenu.CheckboxItem ref={ref} {...itemProps} className={cx(className, 'fp-MenuItem fp-MenuCheckboxItem')}>
      <RadixMenu.ItemIndicator className="fp-MenuItemIndicator">
        <CheckmarkIcon size="4" />
      </RadixMenu.ItemIndicator>
      {children}
    </RadixMenu.CheckboxItem>
  );
});

type RadioItemElement = React.ElementRef<typeof RadixMenu.RadioItem>;
type RadioItemProps = RadixMenu.ContextMenuRadioItemProps;

const RadioItem = React.forwardRef<RadioItemElement, RadioItemProps>((props, ref) => {
  const { children, className, ...itemProps } = props;

  return (
    <RadixMenu.RadioItem ref={ref} {...itemProps} className={cx(className, 'fp-MenuItem fp-MenuRadioItem')}>
      <RadixMenu.ItemIndicator className="fp-MenuItemIndicator">
        <CircleIcon size="4" />
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
