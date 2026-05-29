import type { Meta, StoryObj } from '@storybook/react-vite';
import * as Icons from './index';
// @ts-expect-error it's just storybook
import './icons.stories.css';

const icons = [
  { name: 'actions', Icon: Icons.ActionsIcon },
  { name: 'align-bottom', Icon: Icons.AlignBottomIcon },
  { name: 'align-horizontal-center', Icon: Icons.AlignHorizontalCenterIcon },
  { name: 'align-left', Icon: Icons.AlignLeftIcon },
  { name: 'align-right', Icon: Icons.AlignRightIcon },
  { name: 'align-top', Icon: Icons.AlignTopIcon },
  { name: 'align-vertical-center', Icon: Icons.AlignVerticalCenterIcon },
  { name: 'annotation', Icon: Icons.AnnotationIcon },
  { name: 'aspect-ratio', Icon: Icons.AspectRatioIcon },
  { name: 'auto-height', Icon: Icons.AutoHeightIcon },
  { name: 'auto-width', Icon: Icons.AutoWidthIcon },
  { name: 'blend-mode', Icon: Icons.BlendModeIcon },
  { name: 'boolean', Icon: Icons.BooleanIcon },
  { name: 'checkmark', Icon: Icons.CheckmarkIcon },
  { name: 'checkmark-indeterminate', Icon: Icons.CheckmarkIndeterminateIcon },
  { name: 'chevron-down', Icon: Icons.ChevronDownIcon },
  { name: 'chevron-left', Icon: Icons.ChevronLeftIcon },
  { name: 'chevron-right', Icon: Icons.ChevronRightIcon },
  { name: 'chevron-up', Icon: Icons.ChevronUpIcon },
  { name: 'circle', Icon: Icons.CircleIcon },
  { name: 'clear', Icon: Icons.ClearIcon },
  { name: 'close', Icon: Icons.CloseIcon },
  { name: 'code', Icon: Icons.CodeIcon },
  { name: 'comment', Icon: Icons.CommentIcon },
  { name: 'component', Icon: Icons.ComponentIcon },
  { name: 'constraint-left', Icon: Icons.ConstraintLeftIcon },
  { name: 'constraint-top', Icon: Icons.ConstraintTopIcon },
  { name: 'corner-radius', Icon: Icons.CornerRadiusIcon },
  { name: 'design', Icon: Icons.DesignIcon },
  { name: 'draw', Icon: Icons.DrawIcon },
  { name: 'ellipsis', Icon: Icons.EllipsisIcon },
  { name: 'expand', Icon: Icons.ExpandIcon },
  { name: 'eye', Icon: Icons.EyeIcon },
  { name: 'eyedropper', Icon: Icons.EyedropperIcon },
  { name: 'fill-gradient', Icon: Icons.FillGradientIcon },
  { name: 'fill-pattern', Icon: Icons.FillPatternIcon },
  { name: 'fill-solid', Icon: Icons.FillSolidIcon },
  { name: 'figma', Icon: Icons.FigmaIcon },
  { name: 'fixed-size', Icon: Icons.FixedSizeIcon },
  { name: 'flip-horizontal', Icon: Icons.FlipHorizontalIcon },
  { name: 'flip-vertical', Icon: Icons.FlipVerticalIcon },
  { name: 'frame', Icon: Icons.FrameIcon },
  { name: 'help', Icon: Icons.HelpIcon },
  { name: 'image', Icon: Icons.ImageIcon },
  { name: 'layers-collapse', Icon: Icons.LayersCollapseIcon },
  { name: 'letter-spacing', Icon: Icons.LetterSpacingIcon },
  { name: 'line-height', Icon: Icons.LineHeightIcon },
  { name: 'link', Icon: Icons.LinkIcon },
  { name: 'minus', Icon: Icons.MinusIcon },
  { name: 'move', Icon: Icons.MoveIcon },
  { name: 'number', Icon: Icons.NumberIcon },
  { name: 'opacity', Icon: Icons.OpacityIcon },
  { name: 'palette', Icon: Icons.PaletteIcon },
  { name: 'panel-left-close', Icon: Icons.PanelLeftCloseIcon },
  { name: 'pen', Icon: Icons.PenIcon },
  { name: 'play', Icon: Icons.PlayIcon },
  { name: 'plus', Icon: Icons.PlusIcon },
  { name: 'rectangle', Icon: Icons.RectangleIcon },
  { name: 'rotate-clockwise', Icon: Icons.RotateClockwiseIcon },
  { name: 'rotation', Icon: Icons.RotationIcon },
  { name: 'ruler', Icon: Icons.RulerIcon },
  { name: 'search', Icon: Icons.SearchIcon },
  { name: 'select-matching', Icon: Icons.SelectMatchingIcon },
  { name: 'shadow-bottom-left', Icon: Icons.ShadowBottomLeftIcon },
  { name: 'shadow-bottom-right', Icon: Icons.ShadowBottomRightIcon },
  { name: 'shadow-down', Icon: Icons.ShadowDownIcon },
  { name: 'shadow-left', Icon: Icons.ShadowLeftIcon },
  { name: 'shadow-right', Icon: Icons.ShadowRightIcon },
  { name: 'shadow-top-left', Icon: Icons.ShadowTopLeftIcon },
  { name: 'shadow-top-right', Icon: Icons.ShadowTopRightIcon },
  { name: 'shadow-up', Icon: Icons.ShadowUpIcon },
  { name: 'sliders', Icon: Icons.SlidersIcon },
  { name: 'string', Icon: Icons.StringIcon },
  { name: 'styles', Icon: Icons.StylesIcon },
  { name: 'text', Icon: Icons.TextIcon },
  { name: 'text-align-center', Icon: Icons.TextAlignCenterIcon },
  { name: 'text-align-left', Icon: Icons.TextAlignLeftIcon },
  { name: 'text-align-right', Icon: Icons.TextAlignRightIcon },
  { name: 'text-vertical-align-bottom', Icon: Icons.TextVerticalAlignBottomIcon },
  { name: 'text-vertical-align-middle', Icon: Icons.TextVerticalAlignMiddleIcon },
  { name: 'text-vertical-align-top', Icon: Icons.TextVerticalAlignTopIcon },
  { name: 'variable-mode', Icon: Icons.VariableModeIcon },
  { name: 'variable', Icon: Icons.VariableIcon },
  { name: 'video', Icon: Icons.VideoIcon },
];

function IconsCatalog() {
  return (
    <main className="fp-icons-story">
      <header className="fp-icons-story-header">
        <div>
          <p className="fp-icons-story-eyebrow">Figma Kit</p>
          <h1 className="fp-icons-story-title">Icons</h1>
        </div>
        <span className="fp-icons-story-count">{icons.length} icons</span>
      </header>
      <div className="fp-icons-story-grid">
        {icons.map(({ name, Icon }) => (
          <article className="fp-icons-story-card" key={name}>
            <div className="fp-icons-story-preview">
              <Icon aria-hidden="true" focusable="false" size="6" />
            </div>
            <span className="fp-icons-story-name">{name}</span>
          </article>
        ))}
      </div>
    </main>
  );
}

const meta = {
  title: 'Components/Icons',
  component: IconsCatalog,
  parameters: {
    layout: 'fullscreen',
  },
} satisfies Meta<typeof IconsCatalog>;

type Story = StoryObj<typeof meta>;

const All: Story = {};

export default meta;
export { All };
