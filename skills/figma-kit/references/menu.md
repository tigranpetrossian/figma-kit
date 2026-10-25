# DropdownMenu and ContextMenu

Figma-style dark menus. `DropdownMenu` opens from a button, and `ContextMenu` opens on right-click. Both have the same parts.

```tsx
import { Button, CheckmarkIcon, DropdownMenu } from 'figma-kit';

<DropdownMenu.Root>
  <DropdownMenu.Trigger render={<Button />}>Menu</DropdownMenu.Trigger>
  <DropdownMenu.Portal>
    <DropdownMenu.Positioner sideOffset={6}>
      <DropdownMenu.Popup style={{ minWidth: 200 }}>
        <DropdownMenu.Item onClick={duplicate}>Duplicate</DropdownMenu.Item>
        <DropdownMenu.Item disabled>Rename</DropdownMenu.Item>
        <DropdownMenu.Separator />
        <DropdownMenu.CheckboxItem checked={snap} onCheckedChange={setSnap}>
          <DropdownMenu.CheckboxItemIndicator>
            <CheckmarkIcon size="4" />
          </DropdownMenu.CheckboxItemIndicator>
          Snap to pixel grid
        </DropdownMenu.CheckboxItem>
        <DropdownMenu.SubmenuRoot>
          <DropdownMenu.SubmenuTrigger>Export as</DropdownMenu.SubmenuTrigger>
          <DropdownMenu.Portal>
            <DropdownMenu.Positioner sideOffset={12} alignOffset={-8}>
              <DropdownMenu.Popup>
                <DropdownMenu.Item>PNG</DropdownMenu.Item>
                <DropdownMenu.Item>SVG</DropdownMenu.Item>
              </DropdownMenu.Popup>
            </DropdownMenu.Positioner>
          </DropdownMenu.Portal>
        </DropdownMenu.SubmenuRoot>
      </DropdownMenu.Popup>
    </DropdownMenu.Positioner>
  </DropdownMenu.Portal>
</DropdownMenu.Root>
```

```tsx
<ContextMenu.Root>
  <ContextMenu.Trigger>{layerList}</ContextMenu.Trigger>
  <ContextMenu.Portal>
    <ContextMenu.Positioner>
      <ContextMenu.Popup style={{ minWidth: 200 }}>
        <ContextMenu.Item onClick={paste}>Paste here</ContextMenu.Item>
      </ContextMenu.Popup>
    </ContextMenu.Positioner>
  </ContextMenu.Portal>
</ContextMenu.Root>
```

## Notes

- Nest `Portal` > `Positioner` > `Popup` > items, or Base UI throws. A submenu repeats that chain inside `SubmenuRoot`, after its `SubmenuTrigger`, which adds the right chevron itself.
- `Popup` has no minimum width, so set one on the top-level popup.
- `DropdownMenu.Trigger` renders an unstyled `<button>`, so pass `render={<Button />}`. For an icon-only trigger, wrap the Trigger element in `Tooltip` as tooltip.md shows. `ContextMenu.Trigger` is a `<div>` around the right-click area.
- `Item` takes `onClick` and closes the menu on click. `CheckboxItem` (`checked` and `onCheckedChange`) and `RadioItem` (inside `RadioGroup value onValueChange`) stay open on click.
- `CheckboxItemIndicator` and `RadioItemIndicator` render nothing by default. Give each item its own indicator with a `<CheckmarkIcon size="4" />` child. It shows only while that item is checked, and items leave room for it.
- `GroupLabel` must be inside `Group` or `RadioGroup`, or Base UI throws. A `Group` that is not the popup's first child draws its own top divider, so it needs no `Separator`.
- Menus are dark (`#1e1e1e`) in both light and dark themes, as in Figma. Do not restyle them to the page background.
