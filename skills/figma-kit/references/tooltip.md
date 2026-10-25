# Tooltip

A short dark label that appears when the user hovers or focuses a control. It names icon-only buttons.

```tsx
import { IconButton, PlusIcon, Tooltip, TooltipProvider } from 'figma-kit';

<TooltipProvider>
  <Tooltip content="Add fill" side="bottom">
    <IconButton aria-label="Add fill">
      <PlusIcon />
    </IconButton>
  </Tooltip>
</TooltipProvider>
```

## Notes

- `Tooltip` is one component, not a compound one. Pass the text as `content` and the trigger as the only child.
- The child must be one element that accepts props and a ref, such as any figma-kit control or a DOM element. A string or several children do not typecheck. A fragment typechecks but cannot take the trigger's props.
- To add a tooltip to another component's trigger, make that trigger element the child, as in `<Tooltip content="More"><DropdownMenu.Trigger render={<IconButton aria-label="More" />}>…</DropdownMenu.Trigger></Tooltip>`. Hover shows the tooltip and click still opens the menu.
- It opens after 600ms of hover by default. `TooltipProvider` is optional. Wrap the app in it once to set a shared `delay` and `closeDelay`, and so that moving between controls opens the next tooltip at once.
- It sits above the trigger with a 7px gap and an arrow. Positioning props such as `side`, `align`, and `sideOffset` go directly on `Tooltip`.
- `disabled` turns it off. `open` and `onOpenChange` control it.
- Text wraps, and a newline starts a new line, as in `content={'Line one\nLine two'}`. A quoted JSX attribute keeps `\n` as two literal characters. Tooltips are dark in both light and dark themes, as in Figma.
- When to add one is covered by the icon-only rule in SKILL.md.
