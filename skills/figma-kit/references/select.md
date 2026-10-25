# Select

Select picks one value from a fixed list, such as an effect type or blend mode.

```tsx
import { useState } from 'react';
import { CheckmarkIcon, ChevronDownIcon, ChevronUpIcon, Select } from 'figma-kit';

const EFFECTS = [
  { value: 'drop-shadow', label: 'Drop shadow' },
  { value: 'inner-shadow', label: 'Inner shadow' },
];

function EffectSelect() {
  const [effect, setEffect] = useState<string | null>('drop-shadow');

  return (
    <Select.Root items={EFFECTS} value={effect} onValueChange={setEffect}>
      <Select.Trigger>
        <Select.Value />
        <Select.Icon>
          <ChevronDownIcon />
        </Select.Icon>
      </Select.Trigger>
      <Select.Portal>
        <Select.Positioner>
          <Select.Popup>
            <Select.ScrollUpArrow>
              <ChevronUpIcon />
            </Select.ScrollUpArrow>
            <Select.List>
              {EFFECTS.map((item) => (
                <Select.Item key={item.value} value={item.value}>
                  <Select.ItemIndicator>
                    <CheckmarkIcon size="4" />
                  </Select.ItemIndicator>
                  <Select.ItemText>{item.label}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.List>
            <Select.ScrollDownArrow>
              <ChevronDownIcon />
            </Select.ScrollDownArrow>
          </Select.Popup>
        </Select.Positioner>
      </Select.Portal>
    </Select.Root>
  );
}
```

## Notes

- Pass the `{ value, label }` array to `Select.Root` as `items`. Without it, `Select.Value` shows the raw value (`drop-shadow`), not the label.
- `Select.Icon`, `Select.ScrollUpArrow`, and `Select.ScrollDownArrow` render Base UI's `▼` and `▲` text glyphs when empty, and `Select.ItemIndicator` renders nothing. Fill all four as shown.
- `onValueChange` passes `string | null`, so a `useState<string>` setter does not typecheck. Type the state with `| null` or guard the callback.
- The popup opens over the trigger with the selected item lined up with the value text. Set `alignItemWithTrigger={false}` on `Select.Positioner` to open it below.
- For sections inside `Select.List`, put `<Select.Separator />` between items, or wrap items in `Select.Group` with a `Select.GroupLabel`.
