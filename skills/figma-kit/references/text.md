# Text, Label, Paragraph, Link

Typography primitives that use Figma's UI type scale.

```tsx
import { Input, Label, Link, Paragraph, Text } from 'figma-kit';

<>
  <Text render={<h2 />} size="large" weight="strong">
    Export
  </Text>
  <Paragraph>
    Frames export at 1x. See the <Link href="https://help.figma.com">export guide</Link>.
  </Paragraph>
  <Label htmlFor="file-name">File name</Label>
  <Input id="file-name" />
  <Text size="small" style={{ color: 'var(--figma-color-text-secondary)' }}>
    Applies to all selected frames.
  </Text>
</>
```

## Notes

- `Text` renders a `<span>`, `Paragraph` a `<p>`, `Label` a `<label>`, and `Link` an `<a>`. Only `Text` and `Link` take `render` to change the element, as in `render={<h2 />}`.
- All four take `size` (`"small"` 9px, `"medium"` 11px, `"large"` 13px), `weight` (`"default"`, `"strong"`), `align` (`"start"`, `"center"`, `"end"`), and `block`. With no `size`, text is 11px, Figma's UI size.
- A `Text` inside another `Text` inherits its size and weight unless it sets its own.
- `Text` sets its own color to `--figma-color-text`, so a parent's color does not reach it. For secondary text, set the color with `style` as above, or with the Tailwind `text-secondary` class.
- `<strong>`, `<code>`, and `<mark>` inside these components get Figma styling. `Link` is brand blue with no underline.
