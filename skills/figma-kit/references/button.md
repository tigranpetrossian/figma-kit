# Button and IconButton

`Button` is a text button, and `IconButton` is a square button that holds one icon.

```tsx
import { Button, IconButton, MinusIcon, Tooltip } from 'figma-kit';

function FillActions(props: { onRemove: () => void; onApply: () => void }) {
  return (
    <div className="flex items-center gap-2">
      <Tooltip content="Remove fill">
        <IconButton aria-label="Remove fill" onClick={props.onRemove}>
          <MinusIcon />
        </IconButton>
      </Tooltip>
      <Button variant="primary" onClick={props.onApply}>
        Apply
      </Button>
    </div>
  );
}
```

## Notes

- `Button` variants are `secondary` (default), `primary`, `destructive`, `success`, `inverse`, and `text`. Sizes are `small` (default, 24px tall) and `medium` (32px). `fullWidth` stretches it. Otherwise it is as wide as its content.
- `Button` sets no gap, so add one such as `gap-1` when it holds an icon and text. Icons in a Button take the text color.
- `IconButton` requires `aria-label`. Sizes are `small` (default, 24px square) and `medium` (32px).
- `IconButton` has no built-in tooltip. Wrap it in `Tooltip` per the icon-only rule in SKILL.md.
- To open a Popover or DropdownMenu, pass the IconButton as the trigger's `render` prop, as popover.md shows. It then highlights while the popup is open. `activeAppearance` picks the highlight, `subtle` (default) or `solid`.
