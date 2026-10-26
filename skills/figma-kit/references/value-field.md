# ValueField

ValueField is Figma's input for numbers, hex colors, and numbers with preset options. It scrubs on drag and evaluates math such as `12*2`.

```tsx
import { useState } from 'react';
import { ValueField } from 'figma-kit';

type Rgba = ValueField.HexProps['value'];

const FONT_SIZES = [10, 11, 12, 14, 16, 20, 24, 32, 48, 64];

function TextFields() {
  const [opacity, setOpacity] = useState(1);
  const [fontSize, setFontSize] = useState(12);
  const [color, setColor] = useState<Rgba>({ r: 1, g: 0, b: 0, a: 1 });

  return (
    <>
      <ValueField.Root>
        <ValueField.Scrubber />
        <ValueField.Numeric value={opacity} onChange={setOpacity} min={0} max={1} scale={100} precision={0} suffix="%" />
      </ValueField.Root>
      <ValueField.NumericSelect aria-label="Font size" value={fontSize} onChange={setFontSize} options={FONT_SIZES} min={1} precision={0} />
      <ValueField.Root>
        <ValueField.Hex value={color} onChange={setColor} ignoreAlpha />
      </ValueField.Root>
    </>
  );
}
```

## Notes

- `onChange` fires on commit, which is Enter, blur, or an arrow key, and on every step of a scrub. It does not fire per keystroke. Escape discards the edit.
- Typed input is evaluated as math. `x` is the current value, so `2x` doubles it.
- `scale` multiplies the stored value for display and divides typed input by it. Above, a stored `0.5` shows as `50%`. `min` and `max` stay in stored units. `precision`, `suffix`, nudges, and typed input all use the shown units.
- `precision` defaults to 15 decimals, so set it. Use `0` for whole numbers.
- `suffix="%"` puts the unit in the input text and accepts it when typed. A trailing `<ValueField.Label>%</ValueField.Label>` after the input shows the unit outside the text instead. Pair it with `allowedUnits={['%']}`, because without a `%` suffix or unit, typing `50%` means 50% of the current value. `allowedUnits` takes any units to accept and strip, such as `['px']`.
- An empty `<ValueField.Scrubber />` is a thin drag strip on the field's left edge. With a Label inside, the label is the drag handle.
- `NumericSelect` renders its own Root, Scrubber, and dropdown, so do not wrap it in `ValueField.Root`. It takes Numeric props plus `options`. A value outside `options` shows as an extra item at the top. `onItemHighlighted` reports the hovered option, then `undefined` on close, for live previews.
- `Hex` takes and returns an RGBA object with channels from 0 to 1, not a string. ColorPicker uses the same shape. The type is not exported, so derive it as above. The field shows six hex digits. Typed 8-digit hex also sets alpha unless `ignoreAlpha` is set, and color names such as `red` work.
- In `ValueField.Multi`, each field keeps its own `ValueField.Root`, and the Roots grow to share the width. Give a fixed-width field `flex-none` and a width. `disabled` on Multi disables every field in it, a `Slider` included.
