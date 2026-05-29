import React from 'react';
import { Combobox as BaseCombobox } from '@base-ui/react/combobox';
import { Separator as BaseSeparator } from '@base-ui/react/separator';
import { ClearIcon } from '@components/icons/clear';
import { SearchIcon } from '@components/icons/search';
import { addClassName } from '@lib/react/add-class-name';
import { useComposedRefs } from '@lib/react/use-compose-refs';

type RootProps<Value = unknown, Multiple extends boolean | undefined = false> = BaseCombobox.Root.Props<
  Value,
  Multiple
>;
const Root = BaseCombobox.Root;

type LabelProps = BaseCombobox.Label.Props;
const Label = BaseCombobox.Label;
type ValueProps = BaseCombobox.Value.Props;
const Value = BaseCombobox.Value;
type PortalProps = BaseCombobox.Portal.Props;
const Portal = BaseCombobox.Portal;
type ArrowProps = BaseCombobox.Arrow.Props;
const Arrow = BaseCombobox.Arrow;
type BackdropProps = BaseCombobox.Backdrop.Props;
const Backdrop = BaseCombobox.Backdrop;

type TriggerElement = HTMLButtonElement;
type TriggerProps = BaseCombobox.Trigger.Props;

const Trigger = React.forwardRef<TriggerElement, TriggerProps>((props, ref) => {
  const { className, ...triggerProps } = props;

  return (
    <BaseCombobox.Trigger
      ref={ref}
      className={addClassName(className, 'fp-SelectTrigger fp-ComboboxTrigger')}
      {...triggerProps}
    />
  );
});

type IconElement = HTMLSpanElement;
type IconProps = BaseCombobox.Icon.Props;

const Icon = React.forwardRef<IconElement, IconProps>((props, ref) => {
  const { className, ...iconProps } = props;

  return (
    <BaseCombobox.Icon
      ref={ref}
      className={addClassName(className, 'fp-SelectTriggerIcon fp-ComboboxTriggerIcon')}
      {...iconProps}
    />
  );
});

type PositionerElement = HTMLDivElement;
type PositionerProps = BaseCombobox.Positioner.Props;

const Positioner = React.forwardRef<PositionerElement, PositionerProps>((props, ref) => {
  const { className, positionMethod = 'fixed', sideOffset = 4, ...positionerProps } = props;

  return (
    <BaseCombobox.Positioner
      ref={ref}
      className={addClassName(className, 'fp-ComboboxPositioner')}
      positionMethod={positionMethod}
      sideOffset={sideOffset}
      {...positionerProps}
    />
  );
});

type PopupElement = HTMLDivElement;
type PopupProps = BaseCombobox.Popup.Props;

const Popup = React.forwardRef<PopupElement, PopupProps>((props, ref) => {
  const { className, ...popupProps } = props;

  return <BaseCombobox.Popup ref={ref} className={addClassName(className, 'fp-ComboboxPopup')} {...popupProps} />;
});

type InputGroupElement = HTMLDivElement;
type InputGroupProps = BaseCombobox.InputGroup.Props;

const InputGroup = React.forwardRef<InputGroupElement, InputGroupProps>((props, ref) => {
  const { className, ...inputGroupProps } = props;

  return (
    <BaseCombobox.InputGroup
      ref={ref}
      className={addClassName(className, 'fp-ComboboxInputGroup')}
      {...inputGroupProps}
    />
  );
});

type InputElement = HTMLInputElement;
type InputProps = BaseCombobox.Input.Props;

const Input = React.forwardRef<InputElement, InputProps>((props, ref) => {
  const { className, ...inputProps } = props;

  return (
    <BaseCombobox.Input ref={ref} className={addClassName(className, 'fp-Input fp-ComboboxInput')} {...inputProps} />
  );
});

type SearchInputProps = InputProps;

const SearchInput = React.forwardRef<InputElement, SearchInputProps>((props, ref) => {
  const { placeholder = ' ', ...inputProps } = props;
  const inputRef = React.useRef<InputElement>(null);
  const composedRef = useComposedRefs(ref, inputRef);

  function clearInputValue() {
    clearNativeInputValue(inputRef.current);
    inputRef.current?.focus();
  }

  return (
    <React.Fragment>
      <SearchIcon />
      <Input ref={composedRef} placeholder={placeholder} {...inputProps} />
      <button
        type="button"
        aria-label="Clear search"
        className="fp-IconButton fp-size-small fp-ComboboxSearchClear"
        onMouseDown={(event) => event.preventDefault()}
        onClick={clearInputValue}
      >
        <ClearIcon />
      </button>
    </React.Fragment>
  );
});

type ListElement = HTMLDivElement;
type ListProps = BaseCombobox.List.Props;

const List = React.forwardRef<ListElement, ListProps>((props, ref) => {
  const { className, ...listProps } = props;

  return <BaseCombobox.List ref={ref} className={addClassName(className, 'fp-ComboboxList')} {...listProps} />;
});

type ItemElement = HTMLDivElement;
type ItemProps = BaseCombobox.Item.Props;

const Item = React.forwardRef<ItemElement, ItemProps>((props, ref) => {
  const { className, ...itemProps } = props;

  return (
    <BaseCombobox.Item
      ref={ref}
      className={addClassName(className, 'fp-MenuItem fp-MenuCheckboxItem fp-ComboboxItem')}
      {...itemProps}
    />
  );
});

type ItemIndicatorElement = HTMLSpanElement;
type ItemIndicatorProps = BaseCombobox.ItemIndicator.Props;

const ItemIndicator = React.forwardRef<ItemIndicatorElement, ItemIndicatorProps>((props, ref) => {
  const { className, ...indicatorProps } = props;

  return (
    <BaseCombobox.ItemIndicator
      ref={ref}
      className={addClassName(className, 'fp-MenuItemIndicator fp-ComboboxItemIndicator')}
      {...indicatorProps}
    />
  );
});

type EmptyElement = HTMLDivElement;
type EmptyProps = BaseCombobox.Empty.Props;

const Empty = React.forwardRef<EmptyElement, EmptyProps>((props, ref) => {
  const { className, ...emptyProps } = props;

  return <BaseCombobox.Empty ref={ref} className={addClassName(className, 'fp-ComboboxMessage')} {...emptyProps} />;
});

type StatusElement = HTMLDivElement;
type StatusProps = BaseCombobox.Status.Props;

const Status = React.forwardRef<StatusElement, StatusProps>((props, ref) => {
  const { className, ...statusProps } = props;

  return <BaseCombobox.Status ref={ref} className={addClassName(className, 'fp-ComboboxMessage')} {...statusProps} />;
});

type GroupElement = HTMLDivElement;
type GroupProps = BaseCombobox.Group.Props;

const Group = React.forwardRef<GroupElement, GroupProps>((props, ref) => {
  const { className, ...groupProps } = props;

  return <BaseCombobox.Group ref={ref} className={addClassName(className, 'fp-MenuGroup')} {...groupProps} />;
});

type GroupLabelElement = HTMLDivElement;
type GroupLabelProps = BaseCombobox.GroupLabel.Props;

const GroupLabel = React.forwardRef<GroupLabelElement, GroupLabelProps>((props, ref) => {
  const { className, ...labelProps } = props;

  return <BaseCombobox.GroupLabel ref={ref} className={addClassName(className, 'fp-MenuLabel')} {...labelProps} />;
});

type CollectionProps = BaseCombobox.Collection.Props;
const Collection = BaseCombobox.Collection;

type SeparatorElement = HTMLDivElement;
type SeparatorProps = BaseSeparator.Props;

const Separator = React.forwardRef<SeparatorElement, SeparatorProps>((props, ref) => {
  const { className, ...separatorProps } = props;

  return <BaseSeparator ref={ref} className={addClassName(className, 'fp-MenuSeparator')} {...separatorProps} />;
});

type ClearElement = HTMLButtonElement;
type ClearProps = BaseCombobox.Clear.Props;

const Clear = React.forwardRef<ClearElement, ClearProps>((props, ref) => {
  const { className, ...clearProps } = props;

  return (
    <BaseCombobox.Clear
      ref={ref}
      className={addClassName(className, 'fp-IconButton fp-size-small fp-ComboboxClear')}
      {...clearProps}
    />
  );
});

Trigger.displayName = 'Combobox.Trigger';
Icon.displayName = 'Combobox.Icon';
Positioner.displayName = 'Combobox.Positioner';
Popup.displayName = 'Combobox.Popup';
InputGroup.displayName = 'Combobox.InputGroup';
Input.displayName = 'Combobox.Input';
SearchInput.displayName = 'Combobox.SearchInput';
List.displayName = 'Combobox.List';
Item.displayName = 'Combobox.Item';
ItemIndicator.displayName = 'Combobox.ItemIndicator';
Empty.displayName = 'Combobox.Empty';
Status.displayName = 'Combobox.Status';
Group.displayName = 'Combobox.Group';
GroupLabel.displayName = 'Combobox.GroupLabel';
Separator.displayName = 'Combobox.Separator';
Clear.displayName = 'Combobox.Clear';

function clearNativeInputValue(input: InputElement | null) {
  if (input === null) {
    return;
  }

  const valueSetter = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, 'value')?.set;

  if (valueSetter === undefined) {
    input.value = '';
  } else {
    valueSetter.call(input, '');
  }

  input.dispatchEvent(new Event('input', { bubbles: true, cancelable: true }));
}

export type {
  RootProps,
  LabelProps,
  ValueProps,
  TriggerProps,
  IconProps,
  PortalProps,
  PositionerProps,
  PopupProps,
  InputGroupProps,
  InputProps,
  SearchInputProps,
  ListProps,
  ItemProps,
  ItemIndicatorProps,
  EmptyProps,
  StatusProps,
  GroupProps,
  GroupLabelProps,
  CollectionProps,
  SeparatorProps,
  ClearProps,
  ArrowProps,
  BackdropProps,
};
export {
  Root,
  Label,
  Value,
  Trigger,
  Icon,
  Portal,
  Positioner,
  Popup,
  InputGroup,
  Input,
  SearchInput,
  List,
  Item,
  ItemIndicator,
  Empty,
  Status,
  Group,
  GroupLabel,
  Collection,
  Separator,
  Clear,
  Arrow,
  Backdrop,
};
