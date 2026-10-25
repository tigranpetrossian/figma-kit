# Icons

Every icon is a named export from `figma-kit`. They render at 24×24 by default, matching Figma's UI icons.

```tsx
import { EyeIcon } from 'figma-kit';

<EyeIcon />
<EyeIcon size="4" className="icon-secondary" />
```

- `size` takes `'1'` to `'10'` (plus `'2_5'`, `'3_5'`) on the spacing scale. The default `'6'` is 24px.
- Icons paint with the `--color-icon` variable, not `currentColor`. Set it with the Tailwind `icon-*` utilities (`icon-secondary`, `icon-brand`, `icon-danger`), not `text-*`. figma-kit controls such as SegmentedControl, Tabs, and Checkbox set it for their own states, so icons inside them need no color class.

## Available icons

- **Alignment:** `AlignLeftIcon`, `AlignHorizontalCenterIcon`, `AlignRightIcon`, `AlignTopIcon`, `AlignVerticalCenterIcon`, `AlignBottomIcon`
- **Text:** `TextIcon`, `TextAlignLeftIcon`, `TextAlignCenterIcon`, `TextAlignRightIcon`, `TextVerticalAlignTopIcon`, `TextVerticalAlignMiddleIcon`, `TextVerticalAlignBottomIcon`, `LineHeightIcon`, `LetterSpacingIcon`
- **Layout and sizing:** `AutoWidthIcon`, `AutoHeightIcon`, `FixedSizeIcon`, `AspectRatioIcon`, `ConstraintLeftIcon`, `ConstraintTopIcon`, `CornerRadiusIcon`, `RotationIcon`, `RotateClockwiseIcon`, `FlipHorizontalIcon`, `FlipVerticalIcon`, `MoveIcon`, `RulerIcon`, `ExpandIcon`
- **Fill and effects:** `FillSolidIcon`, `FillGradientIcon`, `FillPatternIcon`, `OpacityIcon`, `BlendModeIcon`, `EyedropperIcon`, `PaletteIcon`, `StylesIcon`, `ShadowUpIcon`, `ShadowDownIcon`, `ShadowLeftIcon`, `ShadowRightIcon`, `ShadowTopLeftIcon`, `ShadowTopRightIcon`, `ShadowBottomLeftIcon`, `ShadowBottomRightIcon`
- **Layers and nodes:** `FrameIcon`, `RectangleIcon`, `CircleIcon`, `ComponentIcon`, `ImageIcon`, `VideoIcon`, `BooleanIcon`, `PenIcon`, `DrawIcon`, `LayersCollapseIcon`, `SelectMatchingIcon`
- **Variables:** `VariableIcon`, `VariableModeIcon`, `NumberIcon`, `StringIcon`
- **Actions and controls:** `PlusIcon`, `MinusIcon`, `CloseIcon`, `ClearIcon`, `CheckmarkIcon`, `CheckmarkIndeterminateIcon`, `EllipsisIcon`, `ActionsIcon`, `EyeIcon`, `SearchIcon`, `LinkIcon`, `PlayIcon`, `SlidersIcon`, `HelpIcon`, `CommentIcon`, `AnnotationIcon`, `CodeIcon`, `DesignIcon`, `PanelLeftCloseIcon`, `FigmaIcon`
- **Chevrons:** `ChevronDownIcon`, `ChevronUpIcon`, `ChevronLeftIcon`, `ChevronRightIcon`

## Custom icons

The list above is complete. There is no closed-eye or arrow icon. Draw a missing one in your own code with `createIcon`, and paint it with `var(--color-icon)` so it follows the same color utilities.

```tsx
import { createIcon } from 'figma-kit';

const MyIcon = createIcon({
  displayName: 'MyIcon',
  path: <path fill="var(--color-icon)" d="…" />,
});
```
