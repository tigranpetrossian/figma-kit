# Tabs

Tabs switch between panels of content, such as Custom and Libraries views.

```tsx
import { Tabs, Text } from 'figma-kit';

<Tabs.Root defaultValue="custom">
  <Tabs.List>
    <Tabs.Tab value="custom">Custom</Tabs.Tab>
    <Tabs.Tab value="libraries">Libraries</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel value="custom">
    <Text>Custom styles</Text>
  </Tabs.Panel>
  <Tabs.Panel value="libraries">
    <Text>Library styles</Text>
  </Tabs.Panel>
</Tabs.Root>;
```

## Notes

- Each `Tabs.Tab` shows the `Tabs.Panel` with the same `value`. Set `defaultValue`, or `value` with `onValueChange`, to one of those values.
- Inactive panels unmount, so state inside them resets on every switch. Pass `keepMounted` to a `Tabs.Panel` to keep it.
- Each `Tabs.Tab` locks its width to the size measured at mount, so the bold active label does not shift the row. A label that changes after mount keeps the old width.
- `Tabs.Root` renders a `div`. To put `Tabs.List` in `Popover.Header` and the panels in `Popover.Section`, wrap the whole `Popover.Root` in `<Tabs.Root style={{ display: 'contents' }}>`.
- There are no variants or sizes.
