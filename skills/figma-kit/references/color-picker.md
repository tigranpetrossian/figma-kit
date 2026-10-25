# ColorPicker

ColorPicker is Figma's color picker, with a saturation area, hue and opacity sliders, and typed color fields. figma-kit has no swatch component, so the usual setup is a styled `Popover.Trigger` that opens the picker in a Popover.

```tsx
import { useState } from 'react';
import { ColorPicker, Popover } from 'figma-kit';

type Rgba = NonNullable<ColorPicker.RootProps['color']>;

const CHECKERBOARD = 'repeating-conic-gradient(var(--figma-color-bg-tertiary) 0 25%, var(--figma-color-bg) 0 50%) 0 0 / 8px 8px';

function FillColor(props: { colorSpace: ColorPicker.ColorSpace }) {
  const [color, setColor] = useState<Rgba>({ r: 0.05, g: 0.6, b: 1, a: 1 });

  return (
    <Popover.Root>
      <Popover.Trigger
        aria-label="Fill color"
        className="size-4 rounded-sm border border-default"
        style={{ background: `linear-gradient(${toCss(color)}, ${toCss(color)}), ${CHECKERBOARD}` }}
      />
      <Popover.Portal>
        <Popover.Positioner sideOffset={8} className="z-10">
          <Popover.Popup className="w-60">
            <ColorPicker.Root colorSpace={props.colorSpace} color={color} onColorChange={setColor}>
              <ColorPicker.Area />
              <Popover.Section className="flex flex-col gap-3">
                <ColorPicker.Hue />
                <ColorPicker.Alpha />
                <ColorPicker.Input />
              </Popover.Section>
            </ColorPicker.Root>
          </Popover.Popup>
        </Popover.Positioner>
      </Popover.Portal>
    </Popover.Root>
  );
}

function toCss({ r, g, b, a }: Rgba) {
  return `rgb(${r * 255} ${g * 255} ${b * 255} / ${a})`;
}
```

## Notes

- `ColorPicker.Root` renders no element. Its parent sets the width, and `Area` is a square as wide as that parent. `Area` ignores its `size` prop.
- `color`, `defaultColor`, and `onColorChange` use an RGBA object with channels from 0 to 1, the same shape as `ValueField.Hex`. The type is not exported, so derive it as above.
- `colorSpace` is required. Use `'display-p3'` when `figma.root.documentColorProfile` is `'DISPLAY_P3'`, and `'srgb'` otherwise. Only the plugin's main code can read it, so post it to the UI.
- `ColorPicker.Input` shows a HEX, RGB, HSL, and HSV model select next to that model's fields. Pass `models={['hex']}` to show only the hex and opacity fields.
- A Figma `SolidPaint` keeps alpha out of `color`. Write `{ type: 'SOLID', color: { r, g, b }, opacity: a }`.
- `Popover.Positioner` has no z-index, and Slider thumbs have `z-index: 1`, so a slider on the page draws over the open picker. Give the Positioner a z-index such as `z-10`.
- Keep the swatch out of `ValueField.Root`. Root renders a `<label>`, so a button inside it takes the clicks meant for the input.
