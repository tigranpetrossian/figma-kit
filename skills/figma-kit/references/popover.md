# Popover

A non-modal panel anchored to a trigger, such as a styles picker or a settings panel next to a control.

```tsx
import { IconButton, Popover, StylesIcon, Tooltip } from 'figma-kit';

<Popover.Root>
  <Tooltip content="Text styles">
    <Popover.Trigger render={<IconButton aria-label="Text styles" />}>
      <StylesIcon />
    </Popover.Trigger>
  </Tooltip>
  <Popover.Portal>
    <Popover.Positioner side="bottom" align="start" sideOffset={4}>
      <Popover.Popup style={{ width: 240 }}>
        <Popover.Header>
          <Popover.Title>Text styles</Popover.Title>
          <Popover.Controls>
            <Popover.Close />
          </Popover.Controls>
        </Popover.Header>
        <Popover.Section>…</Popover.Section>
      </Popover.Popup>
    </Popover.Positioner>
  </Popover.Portal>
</Popover.Root>
```

## Notes

- Nest `Portal` > `Positioner` > `Popup`, or Base UI throws.
- `Popover.Popup` has the dialog surface (background, radius, shadow) but no width. Set one with `style` or a class.
- `Header`, `Title`, `Controls`, `Section`, and `Close` are the same parts as in Dialog. `Popover.Close` without `render` is an `IconButton` with `CloseIcon`.
- Position with `side`, `align`, `sideOffset`, and `alignOffset` on `Popover.Positioner`. Base UI defaults to `side="bottom"`, `align="center"`, and no offset. `positionMethod` defaults to `"fixed"` here.
- An icon-only trigger needs a tooltip. Wrap the `Popover.Trigger` element in `Tooltip`, as above, and both work on the same button.
- Clicking outside or pressing Escape closes it, and the rest of the UI stays usable while it is open.
- It is uncontrolled by default. Pass `open` and `onOpenChange` to `Popover.Root` to control it.
