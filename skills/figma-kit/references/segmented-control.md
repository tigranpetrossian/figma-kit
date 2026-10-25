# SegmentedControl

SegmentedControl picks one option from a few side-by-side buttons, such as text alignment.

```tsx
import { useState } from 'react';
import { SegmentedControl, TextAlignCenterIcon, TextAlignLeftIcon, TextAlignRightIcon, Tooltip } from 'figma-kit';

function AlignControl() {
  const [align, setAlign] = useState('left');

  return (
    <SegmentedControl.Root value={align} onValueChange={setAlign}>
      <Tooltip content="Align left">
        <SegmentedControl.Item value="left" aria-label="Align left">
          <TextAlignLeftIcon />
        </SegmentedControl.Item>
      </Tooltip>
      <Tooltip content="Align center">
        <SegmentedControl.Item value="center" aria-label="Align center">
          <TextAlignCenterIcon />
        </SegmentedControl.Item>
      </Tooltip>
      <Tooltip content="Align right">
        <SegmentedControl.Item value="right" aria-label="Align right">
          <TextAlignRightIcon />
        </SegmentedControl.Item>
      </Tooltip>
    </SegmentedControl.Root>
  );
}
```

Text items wrap their label in `SegmentedControl.Text`.

```tsx
import { SegmentedControl } from 'figma-kit';

<SegmentedControl.Root defaultValue="fill">
  <SegmentedControl.Item value="fill">
    <SegmentedControl.Text>Fill</SegmentedControl.Text>
  </SegmentedControl.Item>
  <SegmentedControl.Item value="stroke">
    <SegmentedControl.Text>Stroke</SegmentedControl.Text>
  </SegmentedControl.Item>
</SegmentedControl.Root>;
```

## Notes

- It is single-select. `value`, `defaultValue`, and `onValueChange` use one string, not the arrays of Base UI's `ToggleGroup`. There is no `multiple` prop.
- Clicking the selected item does not clear it. Once a value is set, one item always stays selected.
- Give icon-only items an `aria-label` and wrap each in `Tooltip`, as SKILL.md requires.
- `Item` has no padding of its own. Without `SegmentedControl.Text`, a text label touches the item's edges.
- `fullWidth` stretches the control to its parent's width, and the items grow to fill it.
