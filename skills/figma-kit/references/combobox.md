# Combobox

Combobox is a select with a search field in its popup, for lists long enough to filter, such as fonts.

```tsx
import { useState } from 'react';
import { CheckmarkIcon, ChevronDownIcon, Combobox } from 'figma-kit';

type Font = { value: string; label: string };

const FONTS: Font[] = [
  { value: 'inter', label: 'Inter' },
  { value: 'roboto', label: 'Roboto' },
];

function FontCombobox() {
  const [font, setFont] = useState<Font | null>(FONTS[0]);

  return (
    <Combobox.Root items={FONTS} value={font} onValueChange={setFont}>
      <Combobox.Trigger>
        <Combobox.Value placeholder="Select font" />
        <Combobox.Icon>
          <ChevronDownIcon />
        </Combobox.Icon>
      </Combobox.Trigger>
      <Combobox.Portal>
        <Combobox.Positioner>
          <Combobox.Popup>
            <Combobox.InputGroup>
              <Combobox.SearchInput aria-label="Search fonts" placeholder="Search fonts" />
            </Combobox.InputGroup>
            <Combobox.Empty>No fonts found.</Combobox.Empty>
            <Combobox.List>
              {(item: Font) => (
                <Combobox.Item key={item.value} value={item}>
                  <Combobox.ItemIndicator>
                    <CheckmarkIcon size="4" />
                  </Combobox.ItemIndicator>
                  {item.label}
                </Combobox.Item>
              )}
            </Combobox.List>
          </Combobox.Popup>
        </Combobox.Positioner>
      </Combobox.Portal>
    </Combobox.Root>
  );
}
```

## Notes

- The selected value is the whole item object from `items`, not its `value` string. Pass the object to `Combobox.Item`'s `value` and to the root's `value` or `defaultValue`. `onValueChange` passes the object or `null`.
- `Combobox.List` takes a render function and calls it for each item that matches the search text. Items are matched and displayed by their `label` field. For other shapes, pass `itemToStringLabel` to the root.
- `Combobox.SearchInput` adds the search icon and a clear button. Put it inside `Combobox.InputGroup`. A plain `Combobox.Input` keeps the left padding reserved for that icon.
- `Combobox.Icon` renders Base UI's `▼` glyph when empty, and `Combobox.ItemIndicator` has no default content. Fill both as shown.
- The trigger uses the Select trigger styles and fills its parent's width. Use `Select` for short lists that need no search.
