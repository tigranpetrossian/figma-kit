import React from 'react';
import * as RadixSelect from '@radix-ui/react-select';
import { cx } from 'class-variance-authority';

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
      <RadixSelect.Content ref={ref} {...contentProps} className={cx(className, 'fp-SelectContent')}>
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
    <RadixSelect.Item ref={ref} {...itemProps} className={cx(className, 'fp-SelectItem')}>
      <RadixSelect.ItemIndicator className="fp-SelectItemCheckmark">
        <CheckmarkIcon />
      </RadixSelect.ItemIndicator>
      <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
    </RadixSelect.Item>
  );
});

type SeparatorElement = React.ElementRef<typeof RadixSelect.Separator>;
type SeparatorProps = RadixSelect.SelectSeparatorProps;

const Separator = React.forwardRef<SeparatorElement, SeparatorProps>((props, ref) => {
  const { className, ...separatorProps } = props;
  return <RadixSelect.Separator ref={ref} className={cx(className, 'fp-SelectSeparator')} {...separatorProps} />;
});

type LabelElement = React.ElementRef<typeof RadixSelect.Label>;
type LabelProps = RadixSelect.SelectLabelProps;

const Label = React.forwardRef<LabelElement, LabelProps>((props, ref) => {
  const { className, ...labelProps } = props;
  return <RadixSelect.Label ref={ref} className={cx(className, 'fp-SelectLabel')} {...labelProps} />;
});

type GroupElement = React.ElementRef<typeof RadixSelect.Group>;
type GroupProps = RadixSelect.SelectGroupProps;

const Group = React.forwardRef<GroupElement, GroupProps>((props, ref) => {
  const { className, ...groupProps } = props;
  return <RadixSelect.Group ref={ref} className={cx(className, 'fp-SelectGroup')} {...groupProps} />;
});

const ChevronDownIcon = () => {
  return (
    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M3.646 5.854L0.645996 2.854L1.354 2.146L4 4.793L6.646 2.146L7.354 2.854L4.354 5.854L4 6.207L3.646 5.854Z"
      />
    </svg>
  );
};

const ChevronUpIcon = () => {
  return (
    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M4.354 2.14299L7.354 5.14299L6.646 5.85099L4 3.20399L1.354 5.85099L0.645996 5.14299L3.646 2.14299L4 1.78999L4.354 2.14299Z"
      />
    </svg>
  );
};

const CheckmarkIcon = () => {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13.207 5.207L6.99999 11.414L3.29199 7.707L4.70699 6.293L6.99999 8.586L11.793 3.793L13.207 5.207Z" />
    </svg>
  );
};

export type { RootProps, TriggerProps, ContentProps, ItemProps, SeparatorProps, GroupProps, LabelProps };
export { Root, Trigger, Content, Item, Separator, Group, Label, Arrow };
