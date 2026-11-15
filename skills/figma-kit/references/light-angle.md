# LightAngle

LightAngle is the 56×56 box from Figma's light settings where you drag a light source around a center point. It is a pointer aid for an angle field, not a control on its own, so always pair it with a `ValueField.Numeric` that holds the same angle.

```tsx
import { useState } from 'react';
import { LightAngle, ValueField } from 'figma-kit';

function LightAngleField() {
  const [angle, setAngle] = useState(-45);

  return (
    <div className="flex items-center gap-2">
      <LightAngle value={angle} onValueChange={setAngle} />
      <ValueField.Root className="w-16 flex-none">
        <ValueField.Scrubber />
        <ValueField.Numeric
          aria-label="Light angle"
          value={angle}
          onChange={setAngle}
          min={-180}
          max={180}
          precision={0}
          suffix="°"
        />
      </ValueField.Root>
    </div>
  );
}
```

## Notes

- LightAngle is `aria-hidden` and can't take focus. Keyboard and screen reader users set the angle in the paired field, so give that field the accessible name.
- It is controlled only. `value` and `onValueChange` are required because the paired field shares the state.
- Angles are whole degrees from -180 to 179. 0 puts the source at the top and positive values turn clockwise, so -45 is top-left.
- Pressing an empty spot moves the source to the pointer. Dragging the source itself doesn't make it jump.
- `onValueCommit` fires once when the pointer is released.
- Your `onPointerDown`, `onPointerMove`, and `onPointerUp` run first. Call `event.preventDefault()` in one to skip LightAngle's handling of that event.
