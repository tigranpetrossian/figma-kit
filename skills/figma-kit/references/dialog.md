# Dialog

A modal window for a focused task, such as settings or onboarding, styled like Figma's own dialogs.

```tsx
import { Button, Dialog } from 'figma-kit';

<Dialog.Root>
  <Dialog.Trigger render={<Button />}>Export settings</Dialog.Trigger>
  <Dialog.Portal>
    <Dialog.Backdrop />
    <Dialog.Popup>
      <Dialog.Header>
        <Dialog.Title>Export settings</Dialog.Title>
        <Dialog.Controls>
          <Dialog.Close />
        </Dialog.Controls>
      </Dialog.Header>
      <Dialog.Section>…</Dialog.Section>
      <Dialog.Section>
        <div className="flex justify-end gap-2">
          <Dialog.Close render={<Button />}>Cancel</Dialog.Close>
          <Dialog.Close render={<Button variant="primary" />} onClick={save}>
            Save
          </Dialog.Close>
        </div>
      </Dialog.Section>
    </Dialog.Popup>
  </Dialog.Portal>
</Dialog.Root>
```

## Notes

- `Dialog.Popup` must be inside `Dialog.Portal`, or Base UI throws. `Dialog.Backdrop` is optional and dims the page.
- `Dialog.Trigger` renders an unstyled `<button>`. Pass `render={<Button />}` and put the label on the Trigger, not on the render element.
- `Dialog.Close` with no children is an `IconButton` with `CloseIcon` and `aria-label="Close"`, the header close button. Pass `aria-label` to change the label and children to replace the icon. For a text button, pass `render={<Button />}` and a label. Never nest a button inside Close. Use `render`.
- A Close with `onClick` runs the handler, then closes the dialog. Use it for confirm buttons.
- `Dialog.Popup` defaults to `size="2"` (352px) and `placement="top"`, which pins it near the top of the window. Use `placement="center"` to center it. Sizes are `"1"` (288px), `"2"`, `"3"` (448px), and `"fullscreen"`. Width never exceeds the window minus 32px.
- Content placed directly in `Dialog.Popup` gets no padding. Wrap it in `Dialog.Section`, which adds 16px padding and a divider between sections. `size="small"` cuts the vertical padding to 8px.
- `Dialog.Header` is a 40px bar with a bottom border. `Dialog.Controls` pushes its children to the right end.
- When the header holds `Tabs.List` instead of a `Dialog.Title`, give `Dialog.Popup` an `aria-label`, since the title is what names the dialog.
- It is uncontrolled by default. To open it from code, drop the Trigger and pass `open` and `onOpenChange` to `Dialog.Root`.
- For a yes or no confirmation, use `AlertDialog` instead.
