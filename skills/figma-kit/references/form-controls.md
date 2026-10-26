# Form controls

Text, choice, and range inputs styled like Figma's. For numbers, use `ValueField` instead of `Input`.

```tsx
import { useState } from 'react';
import { Checkbox, Input, Label, RadioGroup, Slider, Switch, Textarea } from 'figma-kit';

function Controls() {
  const [name, setName] = useState('');
  const [notes, setNotes] = useState('');
  const [clip, setClip] = useState(true);
  const [align, setAlign] = useState('left');
  const [snap, setSnap] = useState(false);
  const [size, setSize] = useState(50);

  return (
    <>
      <Input value={name} onChange={(event) => setName(event.target.value)} placeholder="Name" />
      <Textarea value={notes} onChange={(event) => setNotes(event.target.value)} minRows={2} maxRows={6} />
      <Checkbox.Root>
        <Checkbox.Input checked={clip} onChange={(event) => setClip(event.target.checked)} />
        <Checkbox.Label>Clip content</Checkbox.Label>
      </Checkbox.Root>
      <RadioGroup.Root value={align} onValueChange={setAlign}>
        <RadioGroup.Label>
          <RadioGroup.Item value="left" />
          Left
        </RadioGroup.Label>
        <RadioGroup.Label>
          <RadioGroup.Item value="right" />
          Right
        </RadioGroup.Label>
      </RadioGroup.Root>
      <Label className="flex items-center gap-2">
        <Switch checked={snap} onCheckedChange={setSnap} />
        Snap to pixel grid
      </Label>
      <Slider aria-label="Size" value={[size]} onValueChange={([next = size]) => setSize(next)} min={0} max={100} />
    </>
  );
}
```

## Notes

- `Input` and `Textarea` are native elements, so read `event.target.value`. `selectOnClick` on `Input` selects the text on click. `Textarea` grows with its content between `minRows` and `maxRows`.
- `Checkbox.Input` is a native checkbox. Use `checked` and `onChange`, not `onCheckedChange`. It also takes `indeterminate`, and `Checkbox.Description` adds help text under the label.
- `RadioGroup` and `Switch` use Base UI callbacks, `onValueChange(value)` and `onCheckedChange(checked)`. Radio values are strings. Wrap each `RadioGroup.Item` and its text in `RadioGroup.Label`. `orientation="vertical"` stacks the items.
- `Switch` has no label part. Wrap it and its text in figma-kit's `Label`.
- `Slider` takes and returns an array, even with one thumb. Use `onValueCommit` for the value on release. `size` is `'large'` by default or `'small'`. `hints` adds marks that a drag or track press snaps to, and `range={false}` removes the filled part of the track.
- Name a `Slider` with `aria-label` or `aria-labelledby`. With two thumbs, `getAriaLabel(index)` names each one. `inverted` puts the maximum at the start edge and only applies to horizontal sliders.
