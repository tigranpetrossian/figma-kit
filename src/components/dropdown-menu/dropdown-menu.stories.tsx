import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@components/button';
import { CheckmarkIcon, CircleIcon } from '@components/icons';
import * as DropdownMenu from './dropdown-menu';

const meta = {
  component: DropdownMenu.Root,
  title: 'Components/Dropdown Menu',
  decorators: [
    (Story) => {
      return (
        <div style={{ padding: '0 100px' }}>
          <Story />
        </div>
      );
    },
  ],
} satisfies Meta<typeof DropdownMenu.Root>;

type Story = StoryObj<typeof meta>;

const Story: Story = {
  render(args) {
    return (
      <DropdownMenu.Root {...args}>
        <DropdownMenu.Trigger render={<Button />}>Menu</DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Positioner sideOffset={6}>
            <DropdownMenu.Popup style={{ minWidth: 200 }}>
              <DropdownMenu.Item>Show version history</DropdownMenu.Item>
              <DropdownMenu.Item>Publish library…</DropdownMenu.Item>
              <DropdownMenu.Item>Export…</DropdownMenu.Item>
              <DropdownMenu.Separator />
              <DropdownMenu.Item>Add to sidebar</DropdownMenu.Item>
              <DropdownMenu.Separator />
              <DropdownMenu.Item>Create branch…</DropdownMenu.Item>
              <DropdownMenu.Separator />
              <DropdownMenu.SubmenuRoot>
                <DropdownMenu.SubmenuTrigger>File color profile...</DropdownMenu.SubmenuTrigger>
                <DropdownMenu.Portal>
                  <DropdownMenu.Positioner sideOffset={12} alignOffset={-8}>
                    <DropdownMenu.Popup>
                      <DropdownMenu.CheckboxItem checked>
                        <DropdownMenu.CheckboxItemIndicator>
                          <CheckmarkIcon size="4" />
                        </DropdownMenu.CheckboxItemIndicator>
                        Display P3
                      </DropdownMenu.CheckboxItem>
                      <DropdownMenu.CheckboxItem>Change to sRGB</DropdownMenu.CheckboxItem>
                    </DropdownMenu.Popup>
                  </DropdownMenu.Positioner>
                </DropdownMenu.Portal>
              </DropdownMenu.SubmenuRoot>
              <DropdownMenu.Separator />
              <DropdownMenu.Item>Duplicate</DropdownMenu.Item>
              <DropdownMenu.Item>Rename</DropdownMenu.Item>
              <DropdownMenu.Item>Move to project…</DropdownMenu.Item>
              <DropdownMenu.Item>Delete…</DropdownMenu.Item>
              <DropdownMenu.RadioGroup value="this">
                <DropdownMenu.RadioItem value="this">
                  <DropdownMenu.RadioItemIndicator>
                    <CircleIcon size="4" />
                  </DropdownMenu.RadioItemIndicator>
                  This
                </DropdownMenu.RadioItem>
                <DropdownMenu.RadioItem value="or-this">Or this</DropdownMenu.RadioItem>
                <DropdownMenu.RadioItem value="or-this-one">Or this one</DropdownMenu.RadioItem>
              </DropdownMenu.RadioGroup>
              <DropdownMenu.CheckboxItem checked>
                <DropdownMenu.CheckboxItemIndicator>
                  <CheckmarkIcon size="4" />
                </DropdownMenu.CheckboxItemIndicator>
                Display P3
              </DropdownMenu.CheckboxItem>
              <DropdownMenu.CheckboxItem>Change to sRGB</DropdownMenu.CheckboxItem>
            </DropdownMenu.Popup>
          </DropdownMenu.Positioner>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    );
  },
};

export default meta;
export { Story };
