import React from 'react';
import * as RadixSelect from '@radix-ui/react-select';
import { cx } from 'class-variance-authority';
import { ChevronDownIcon, ChevronUpIcon, CheckmarkIcon } from '@components/icons';

type RootProps = RadixSelect.SelectProps;

const Root = RadixSelect.Root;
const Arrow = RadixSelect.Arrow;

type TriggerElement = React.ElementRef<typeof RadixSelect.Trigger>;
type TriggerProps = {
  placeholder?: string;
} & RadixSelect.SelectTriggerProps;

const Trigger = React.forwardRef<TriggerElement, TriggerProps>((props, ref) => {
  const { placeholder, className, ...triggerProps } = props;

  return (
    <RadixSelect.Trigger ref={ref} {...triggerProps} className={cx(className, 'fp-SelectTrigger')}>
      <RadixSelect.Value placeholder={placeholder} />
      <RadixSelect.Icon className="fp-SelectTriggerIcon">
        <ChevronDownIcon />
      </RadixSelect.Icon>
    </RadixSelect.Trigger>
  );
});

type ContentElement = React.ElementRef<typeof RadixSelect.Content>;
type ContentProps = RadixSelect.SelectContentProps & {
  portal?: boolean;
};

const Content = React.forwardRef<ContentElement, ContentProps>((props, ref) => {
  const { children, portal = false, className, ...contentProps } = props;
  const Wrapper = portal ? RadixSelect.Portal : React.Fragment;

  return (
    <Wrapper>
      <RadixSelect.Content ref={ref} {...contentProps} className={cx(className, 'fp-MenuContent')}>
        <RadixSelect.ScrollUpButton className="fp-SelectScrollUpButton">
          <ChevronUpIcon />
        </RadixSelect.ScrollUpButton>
        <RadixSelect.Viewport>{children}</RadixSelect.Viewport>
        <RadixSelect.ScrollDownButton className="fp-SelectScrollDownButton">
          <ChevronDownIcon />
        </RadixSelect.ScrollDownButton>
      </RadixSelect.Content>
    </Wrapper>
  );
});

type ItemElement = React.ElementRef<typeof RadixSelect.Item>;
type ItemProps = RadixSelect.SelectItemProps;

const Item = React.forwardRef<ItemElement, ItemProps>((props, ref) => {
  const { children, className, ...itemProps } = props;

  return (
    <RadixSelect.Item ref={ref} {...itemProps} className={cx(className, 'fp-MenuItem fp-MenuCheckboxItem')}>
      <RadixSelect.ItemIndicator className="fp-MenuItemIndicator">
        <CheckmarkIcon size="4" />
      </RadixSelect.ItemIndicator>
      <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
    </RadixSelect.Item>
  );
});

type SeparatorElement = React.ElementRef<typeof RadixSelect.Separator>;
type SeparatorProps = RadixSelect.SelectSeparatorProps;

const Separator = React.forwardRef<SeparatorElement, SeparatorProps>((props, ref) => {
  const { className, ...separatorProps } = props;
  return <RadixSelect.Separator ref={ref} className={cx(className, 'fp-MenuSeparator')} {...separatorProps} />;
});

type LabelElement = React.ElementRef<typeof RadixSelect.Label>;
type LabelProps = RadixSelect.SelectLabelProps;

const Label = React.forwardRef<LabelElement, LabelProps>((props, ref) => {
  const { className, ...labelProps } = props;
  return <RadixSelect.Label ref={ref} className={cx(className, 'fp-MenuLabel')} {...labelProps} />;
});

type GroupElement = React.ElementRef<typeof RadixSelect.Group>;
type GroupProps = RadixSelect.SelectGroupProps;

const Group = React.forwardRef<GroupElement, GroupProps>((props, ref) => {
  const { className, ...groupProps } = props;
  return <RadixSelect.Group ref={ref} className={cx(className, 'fp-MenuGroup')} {...groupProps} />;
});

export type { RootProps, TriggerProps, ContentProps, ItemProps, SeparatorProps, GroupProps, LabelProps };
export { Root, Trigger, Content, Item, Separator, Group, Label, Arrow };
