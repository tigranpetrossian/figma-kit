import type { Meta, StoryObj } from '@storybook/react-vite';
import type { CSSProperties } from 'react';
import { CheckmarkIcon, ChevronDownIcon } from '@components/icons';
import * as Combobox from './combobox';

type Option = {
  value: string;
  label: string;
};

const meta = {
  component: Combobox.Root,
  title: 'Components/Combobox',
  decorators: [
    (Story) => {
      return (
        <div style={storyFrameStyle}>
          <Story />
        </div>
      );
    },
  ],
} satisfies Meta<typeof Combobox.Root>;

type Story = StoryObj<typeof meta>;

const Basic: Story = {
  render() {
    return (
      <Combobox.Root items={effectOptions} defaultValue={effectOptions[1]}>
        <Combobox.Trigger>
          <Combobox.Value placeholder="Select effect" />
          <Combobox.Icon>
            <ChevronDownIcon />
          </Combobox.Icon>
        </Combobox.Trigger>
        <Combobox.Portal>
          <Combobox.Positioner>
            <Combobox.Popup>
              <Combobox.InputGroup>
                <Combobox.SearchInput aria-label="Search effects" placeholder="Search effects" />
              </Combobox.InputGroup>
              <Combobox.Empty>No effects found.</Combobox.Empty>
              <Combobox.List>{renderOption}</Combobox.List>
            </Combobox.Popup>
          </Combobox.Positioner>
        </Combobox.Portal>
      </Combobox.Root>
    );
  },
};

const effectOptions: readonly Option[] = [
  { value: 'inner-shadow', label: 'Inner shadow' },
  { value: 'drop-shadow', label: 'Drop shadow' },
  { value: 'layer-blur', label: 'Layer blur' },
  { value: 'background-blur', label: 'Background blur' },
];

function renderOption(option: Option) {
  return (
    <Combobox.Item key={option.value} value={option}>
      <Combobox.ItemIndicator>
        <CheckmarkIcon size="4" />
      </Combobox.ItemIndicator>
      {option.label}
    </Combobox.Item>
  );
}

const storyFrameStyle: CSSProperties = {
  position: 'absolute',
  top: 32,
  left: '50%',
  width: 240,
  transform: 'translateX(-50%)',
};

export default meta;
export { Basic };
