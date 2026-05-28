import type { Meta, StoryObj } from '@storybook/react-vite';
import { Fragment, type ReactNode } from 'react';
import { CheckmarkIcon, ChevronDownIcon, ChevronUpIcon } from '@components/icons';
import * as Select from './select';

type Option = {
  value: string;
  label: string;
  disabled?: boolean;
};

type OptionGroup = {
  label?: string;
  options: readonly Option[];
};

const meta = {
  component: Select.Root,
  title: 'Components/Select',
  decorators: [
    (Story) => {
      return (
        <div style={{ width: 128 }}>
          <Story />
        </div>
      );
    },
  ],
} satisfies Meta<typeof Select.Root>;

type Story = StoryObj<typeof meta>;

const Simple: Story = {
  render() {
    return (
      <Select.Root items={simpleOptions} value="drop-shadow">
        <SelectTrigger />
        <SelectPopup>{simpleOptions.map(renderOption)}</SelectPopup>
      </Select.Root>
    );
  },
};

const Separators: Story = {
  render() {
    return (
      <Select.Root items={separatorOptions} value="pass-through">
        <SelectTrigger />
        <SelectPopup>
          {separatorSections.map((section, index) => (
            <Fragment key={getSectionKey(section)}>
              {index > 0 && <Select.Separator />}
              {section.map(renderOption)}
            </Fragment>
          ))}
        </SelectPopup>
      </Select.Root>
    );
  },
};

const GroupsAndLabels: Story = {
  render() {
    return (
      <Select.Root items={groupedOptions} value="pass-through">
        <SelectTrigger />
        <SelectPopup>
          {groupedSections.map((group) => (
            <Select.Group key={group.label ?? getSectionKey(group.options)}>
              {group.label && <Select.GroupLabel>{group.label}</Select.GroupLabel>}
              {group.options.map(renderOption)}
            </Select.Group>
          ))}
        </SelectPopup>
      </Select.Root>
    );
  },
};

const simpleOptions: readonly Option[] = [
  { value: 'inner-shadow', label: 'Inner shadow' },
  { value: 'drop-shadow', label: 'Drop shadow' },
  { value: 'layer-blur', label: 'Layer blur' },
  { value: 'background-blur', label: 'Background blur' },
];

const separatorSections: readonly (readonly Option[])[] = [
  [
    { value: 'pass-through', label: 'Pass through' },
    { value: 'normal', label: 'Normal', disabled: true },
  ],
  [
    { value: 'darken', label: 'Darken' },
    { value: 'multiply', label: 'Multiply' },
    { value: 'plus-darker', label: 'Plus darker' },
    { value: 'color-burn', label: 'Color burn' },
  ],
  [
    { value: 'lighten', label: 'Lighten' },
    { value: 'screen', label: 'Screen' },
    { value: 'plus-lighter', label: 'Plus lighter' },
    { value: 'color-dodge', label: 'Color dodge' },
  ],
  [
    { value: 'overlay', label: 'Overlay' },
    { value: 'soft-light', label: 'Soft light' },
    { value: 'hard-light', label: 'Hard light' },
  ],
  [
    { value: 'difference', label: 'Difference' },
    { value: 'exclusion', label: 'Exclusion' },
  ],
  [
    { value: 'hue', label: 'Hue' },
    { value: 'saturation', label: 'Saturation' },
    { value: 'color', label: 'Color' },
    { value: 'luminosity', label: 'Luminosity' },
  ],
];

const separatorOptions = separatorSections.flat();

const groupedSections: readonly OptionGroup[] = [
  {
    options: [
      { value: 'pass-through', label: 'Pass through' },
      { value: 'normal', label: 'Normal' },
    ],
  },
  {
    label: 'Darker',
    options: [
      { value: 'darken', label: 'Darken' },
      { value: 'multiply', label: 'Multiply' },
      { value: 'plus-darker', label: 'Plus darker' },
      { value: 'color-burn', label: 'Color burn' },
    ],
  },
  {
    label: 'Lighter',
    options: [
      { value: 'lighten', label: 'Lighten' },
      { value: 'screen', label: 'Screen' },
      { value: 'plus-lighter', label: 'Plus lighter' },
      { value: 'color-dodge', label: 'Color dodge' },
    ],
  },
  {
    label: 'Contrast',
    options: [
      { value: 'overlay', label: 'Overlay' },
      { value: 'soft-light', label: 'Soft light' },
      { value: 'hard-light', label: 'Hard light' },
    ],
  },
  {
    label: 'Comparative',
    options: [
      { value: 'difference', label: 'Difference' },
      { value: 'exclusion', label: 'Exclusion' },
    ],
  },
  {
    label: 'Color',
    options: [
      { value: 'hue', label: 'Hue' },
      { value: 'saturation', label: 'Saturation' },
      { value: 'color', label: 'Color' },
      { value: 'luminosity', label: 'Luminosity' },
    ],
  },
];

const groupedOptions = groupedSections.flatMap((group) => group.options);

function SelectTrigger() {
  return (
    <Select.Trigger>
      <Select.Value />
      <Select.Icon>
        <ChevronDownIcon />
      </Select.Icon>
    </Select.Trigger>
  );
}

function SelectPopup(props: { children: ReactNode }) {
  const { children } = props;

  return (
    <Select.Portal>
      <Select.Positioner>
        <Select.Popup>
          <Select.ScrollUpArrow>
            <ChevronUpIcon />
          </Select.ScrollUpArrow>
          <Select.List>{children}</Select.List>
          <Select.ScrollDownArrow>
            <ChevronDownIcon />
          </Select.ScrollDownArrow>
        </Select.Popup>
      </Select.Positioner>
    </Select.Portal>
  );
}

function renderOption(option: Option) {
  return (
    <Select.Item key={option.value} value={option.value} label={option.label} disabled={option.disabled}>
      <Select.ItemIndicator>
        <CheckmarkIcon size="4" />
      </Select.ItemIndicator>
      <Select.ItemText>{option.label}</Select.ItemText>
    </Select.Item>
  );
}

function getSectionKey(section: readonly Option[]) {
  return section.map((option) => option.value).join(':');
}

export default meta;
export { GroupsAndLabels, Separators, Simple };
