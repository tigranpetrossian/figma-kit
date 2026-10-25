# Collapsible

Collapsible hides a group of controls under a header row that toggles it open.

```tsx
import { Checkbox, Collapsible } from 'figma-kit';

<Collapsible.Root>
  <Collapsible.Trigger>State</Collapsible.Trigger>
  <Collapsible.Panel>
    <Checkbox.Root>
      <Checkbox.Input />
      <Checkbox.Label>Reset component state</Checkbox.Label>
    </Checkbox.Root>
  </Collapsible.Panel>
</Collapsible.Root>;
```

## Notes

- `Collapsible.Trigger` already renders a chevron that rotates when open. Pass only the label text, and do not add a chevron icon.
- It starts closed. Use `defaultOpen` to start open, or `open` with `onOpenChange` to control it.
- The panel unmounts while closed, so state inside it resets. Pass `keepMounted` to `Collapsible.Panel` to keep it.
- The panel is indented 16px, the chevron's width, so its content lines up with the trigger label.
- Nest a `Collapsible.Root` inside a panel for sub-sections. The styles adjust the nested indent.
- There are no variants or sizes.
