---
name: figma-kit
description: Use when building Figma plugin UI with figma-kit, the React component library that matches Figma's own interface. Covers setup and styling with Figma's theme tokens.
---

# figma-kit

## Setup

1. Install it. React 18 or 19 must already be installed.
   ```bash
   npm install figma-kit@beta
   ```
2. Turn on Figma's theme tokens in the plugin's main code. The components read Figma's injected `--figma-color-*` variables.
   ```ts
   figma.showUI(__html__, { themeColors: true });
   ```
3. Import one stylesheet.
   - Without Tailwind, use `@import 'figma-kit/styles.css';` in CSS, or `import 'figma-kit/styles.css';` in the root TS file.
   - With Tailwind v4, use `@import 'tailwindcss';` then `@import 'figma-kit/tailwind.css';`. This file already includes the component styles, so don't import `styles.css` as well. It maps Tailwind's colors, radius, typography, and shadows to Figma tokens, giving classes like `bg-brand`, `text-secondary`, and `rounded-md`.
4. Use the components. Simple components like `Text` are named imports, and compound ones like `Dialog` are namespaced (`<Dialog.Root>`).
   ```tsx
   import { Text, Dialog } from 'figma-kit';
   ```
5. To run the UI in a normal browser, add `@import 'figma-kit/figma-development-theme.css';` to supply the token values Figma would normally inject. Never ship this file in the plugin build.

## Components

Before writing a component, read its reference. It shows how the parts nest and notes what the types don't make obvious.

| Component | Reference |
| --- | --- |
| Button, IconButton | [references/button.md](references/button.md) |
| Dialog | [references/dialog.md](references/dialog.md) |
| AlertDialog | [references/alert-dialog.md](references/alert-dialog.md) |
| Popover | [references/popover.md](references/popover.md) |
| DropdownMenu, ContextMenu | [references/menu.md](references/menu.md) |
| Tooltip | [references/tooltip.md](references/tooltip.md) |
| Select | [references/select.md](references/select.md) |
| Combobox | [references/combobox.md](references/combobox.md) |
| SegmentedControl | [references/segmented-control.md](references/segmented-control.md) |
| Tabs | [references/tabs.md](references/tabs.md) |
| Collapsible | [references/collapsible.md](references/collapsible.md) |
| ValueField (numbers, hex, presets) | [references/value-field.md](references/value-field.md) |
| ColorPicker | [references/color-picker.md](references/color-picker.md) |
| Input, Textarea, Checkbox, RadioGroup, Switch, Slider | [references/form-controls.md](references/form-controls.md) |
| Text, Label, Paragraph, Link | [references/text.md](references/text.md) |
| Icons | [references/icons.md](references/icons.md) |

## Rules

- Wrap icon-only controls, including icon SegmentedControl items, in `Tooltip`. Skip it only for well-known actions such as closing a dialog.
  ```tsx
  <Tooltip content="Remove fill">
    <IconButton aria-label="Remove fill">
      <MinusIcon />
    </IconButton>
  </Tooltip>
  ```
- Use `ValueField.Numeric` for numbers, not `Input`, and give it a `Scrubber`. An icon or letter label goes inside the scrubber.
  ```tsx
  <ValueField.Root>
    <ValueField.Scrubber>
      <ValueField.Label>
        <LineHeightIcon />
      </ValueField.Label>
    </ValueField.Scrubber>
    <ValueField.Numeric value={lineHeight} onChange={setLineHeight} suffix="%" />
  </ValueField.Root>
  ```
- Put `<ChevronDownIcon />` inside `Select.Icon`. Left empty, it renders Base UI's default glyph.
- Join fields that read as one control, such as hex and opacity, in `ValueField.Multi`. Each field keeps its own `ValueField.Root`.
  ```tsx
  <ValueField.Multi>
    <ValueField.Root>
      <ValueField.Hex value={color} onChange={setColor} />
    </ValueField.Root>
    <ValueField.Root className="w-16 flex-none">
      <ValueField.Scrubber />
      <ValueField.Numeric value={color.a} onChange={setAlpha} min={0} max={1} scale={100} precision={0} allowedUnits={['%']} />
      <ValueField.Label>%</ValueField.Label>
    </ValueField.Root>
  </ValueField.Multi>
  ```
- Icons are named exports ending in `Icon`, such as `EyeIcon` and `TextAlignLeftIcon`. [references/icons.md](references/icons.md) lists them all.

## Tailwind

`figma-kit/tailwind.css` keeps Tailwind's class names but fills them with Figma's values. Spacing, sizing, and layout classes are unchanged.

| Purpose | Classes |
| --- | --- |
| Colors | `bg-*`, `text-*`, `border-*`, and `icon-*` follow Figma's token names: `--figma-color-bg-secondary` is `bg-secondary`, and the base token `--figma-color-bg` is `bg-default`. Tailwind's palette, such as `bg-blue-600`, is removed. |
| Font size | `text-xs` (9px), `text-sm` (10px), `text-base` (11px), `text-lg` (12px), `text-xl` (13px), up to `text-6xl` (24px). Each also sets Figma's line height and letter spacing. `text-base` is Figma's default size. |
| Font weight | `font-normal` (450) and `font-medium` (550), Figma's two weights. Other weights such as `font-bold` keep Tailwind's values, so don't use them. |
| Font family | `font-sans`, `font-mono` |
| Radius | `rounded` (default), `rounded-xs`, `rounded-sm`, `rounded-md`, and `rounded-lg` are Figma's radii. `rounded-xl` (16px) to `rounded-3xl` (32px) are for larger surfaces. `rounded-full` is unchanged. |
| Shadow | `shadow-100` to `shadow-500`, Figma's elevation levels |

