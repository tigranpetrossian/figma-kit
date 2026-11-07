# Text, Label, Paragraph, Link, Heading

Typography primitives that use Figma's UI type scale.

```tsx
import { Heading, Input, Label, Link, Paragraph, Text } from 'figma-kit';

<>
  <Heading level={2}>Export</Heading>
  <Paragraph>
    Frames export at 1x. See the <Link href="https://help.figma.com">export guide</Link>.
  </Paragraph>
  <Label htmlFor="file-name">File name</Label>
  <Input id="file-name" />
  <Text size="1" color="secondary">
    Applies to all selected frames.
  </Text>
</>
```

## Notes

- `Text` renders a `<span>`, `Paragraph` a `<p>`, `Label` a `<label>`, `Link` an `<a>`, and `Heading` an `<h1>` to `<h5>`. All of them take `render` to change the element, as in `render={<div />}`.
- `size` is a step on Figma's type scale, `"1"` to `"10"`. Each step sets its own font size, line height, and letter spacing:

  | Size   | Font size | Line height |
  | ------ | --------- | ----------- |
  | `"1"`  | 9px       | 14px        |
  | `"2"`  | 10px      | 14px        |
  | `"3"`  | 11px      | 16px        |
  | `"4"`  | 12px      | 16px        |
  | `"5"`  | 13px      | 22px        |
  | `"6"`  | 14px      | 24px        |
  | `"7"`  | 15px      | 25px        |
  | `"8"`  | 16px      | 25px        |
  | `"9"`  | 20px      | 32px        |
  | `"10"` | 24px      | 32px        |

  With no `size`, text is size `"3"`, Figma's UI size.

- `weight` is `"default"` (450) or `"strong"` (550).
- `color` takes a Figma text color token name without the `--figma-color-text-` prefix, such as `"secondary"`, `"danger"`, or `"onbrand"`. `"default"` is `--figma-color-text`. Hover and pressed tokens are left out, so style those states in CSS.
- All of them also take `align` (`"start"`, `"center"`, `"end"`) and `block`.
- A `Text` inside another `Text` inherits its size, weight, and color unless it sets its own. Outside a `Text`, it uses `--figma-color-text`, so a parent's CSS color does not reach it.
- `Heading` takes `level`, 1 to 5, which defaults to 1. Each level has a default size: 1 is `"9"`, 2 is `"7"`, 3 is `"5"`, 4 is `"4"`, and 5 is `"3"`. `size` overrides it. `Heading` is `"strong"` unless `weight` says otherwise.
- `Link` is brand blue with no underline. Pass `color` to change it.
- `<strong>`, `<code>`, and `<mark>` inside these components get Figma styling.
