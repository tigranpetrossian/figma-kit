import React from 'react';
import { Toggle } from '@base-ui/react/toggle';
import { ToggleGroup } from '@base-ui/react/toggle-group';
import { cx } from 'class-variance-authority';
import { Text as TextPrimitive, type TextProps as TextPrimitiveProps } from '@components/text';
import { addClassName } from '@lib/react/add-class-name';
import { useControllableState } from '@lib/react/use-controllable-state';

type RootElement = HTMLDivElement;
type RootProps = Omit<ToggleGroup.Props<string>, 'defaultValue' | 'multiple' | 'onValueChange' | 'value'> & {
  defaultValue?: string | undefined;
  fullWidth?: boolean | undefined;
  onValueChange?: ((value: string) => void) | undefined;
  value?: string | undefined;
};

const Root = React.forwardRef<RootElement, RootProps>((props, ref) => {
  const { className, fullWidth, value: valueProp, defaultValue: defaultValueProp, onValueChange, ...rootProps } = props;

  const [value, setValue] = useControllableState({
    prop: valueProp,
    defaultProp: defaultValueProp,
    onChange: onValueChange,
  });

  return (
    <ToggleGroup
      ref={ref}
      className={addClassName(className, cx('fp-SegmentedControlRoot', { 'fp-full-width': fullWidth }))}
      {...rootProps}
      multiple={false}
      value={toGroupValue(value)}
      onValueChange={(value) => {
        const nextValue = value[0];

        if (nextValue !== undefined) {
          setValue(nextValue);
        }
      }}
    />
  );
});

type ItemElement = HTMLButtonElement;
type ItemProps = Toggle.Props<string>;

const Item = React.forwardRef<ItemElement, ItemProps>((props, ref) => {
  const { className, ...itemProps } = props;

  return <Toggle ref={ref} className={addClassName(className, 'fp-SegmentedControlItem')} {...itemProps} />;
});

type TextElement = React.ElementRef<typeof TextPrimitive>;
type TextProps = TextPrimitiveProps;

const Text = React.forwardRef<TextElement, TextProps>((props, ref) => {
  const { className, ...textProps } = props;

  return <TextPrimitive ref={ref} className={cx(className, 'fp-SegmentedControlText')} {...textProps} />;
});

Root.displayName = 'SegmentedControl.Root';
Item.displayName = 'SegmentedControl.Item';
Text.displayName = 'SegmentedControl.Text';

function toGroupValue(value: string | undefined): readonly string[] {
  if (value === undefined) {
    return [];
  }

  return [value];
}

export type { RootProps, ItemProps, TextProps };
export { Root, Item, Text };
