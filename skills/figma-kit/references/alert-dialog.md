# AlertDialog

A modal confirmation that asks the user to choose before continuing, such as confirming a delete.

```tsx
import { AlertDialog, Button } from 'figma-kit';

<AlertDialog.Root>
  <AlertDialog.Trigger render={<Button variant="destructive" />}>Delete file</AlertDialog.Trigger>
  <AlertDialog.Portal>
    <AlertDialog.Backdrop />
    <AlertDialog.Popup>
      <AlertDialog.Title>Delete file?</AlertDialog.Title>
      <AlertDialog.Description>People with access will lose it too.</AlertDialog.Description>
      <AlertDialog.Actions>
        <AlertDialog.Close render={<Button />}>Cancel</AlertDialog.Close>
        <AlertDialog.Close render={<Button variant="destructive" />} onClick={deleteFile}>
          Delete
        </AlertDialog.Close>
      </AlertDialog.Actions>
    </AlertDialog.Popup>
  </AlertDialog.Portal>
</AlertDialog.Root>
```

To confirm an action started elsewhere, such as a menu item, drop the Trigger and control the dialog.

```tsx
const [confirmOpen, setConfirmOpen] = useState(false);

<DropdownMenu.Item onClick={() => setConfirmOpen(true)}>Delete…</DropdownMenu.Item>

<AlertDialog.Root open={confirmOpen} onOpenChange={setConfirmOpen}>
  <AlertDialog.Portal>…same Backdrop and Popup as above…</AlertDialog.Portal>
</AlertDialog.Root>
```

## Notes

- Clicking outside does not close it, unlike `Dialog`. Escape still closes it.
- `AlertDialog.Close` and `AlertDialog.Trigger` render an unstyled `<button>`. Always pass `render={<Button />}`. Unlike `Dialog.Close`, there is no default close icon.
- A Close with `onClick` runs the handler, then closes the dialog.
- `AlertDialog.Popup` is a padded column with 16px gaps, so put `Title`, `Description`, and `Actions` directly inside it. It has no `Header`, `Section`, or `Controls` parts.
- `AlertDialog.Actions` right-aligns its buttons with 8px gaps. Put the confirming action last.
- `AlertDialog.Popup` defaults to `size="2"` (352px) and `placement="top"`. Sizes are `"1"` (288px), `"2"`, and `"3"` (448px). There is no `"fullscreen"`. Use `placement="center"` to center it.
- `Title` renders as strong `Text` and `Description` as regular `Text`. Base UI uses them to label the dialog for screen readers.
