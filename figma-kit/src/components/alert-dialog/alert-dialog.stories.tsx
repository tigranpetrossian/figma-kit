import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@components/button';
import * as AlertDialog from './alert-dialog';

type Story = StoryObj<typeof AlertDialog.Root>;

const meta: Meta<typeof AlertDialog.Root> = {
  title: 'Components/Alert Dialog',
  component: AlertDialog.Root,
  parameters: {
    radixUrl: 'https://www.radix-ui.com/primitives/docs/components/alert-dialog',
    radixComponentName: 'Alert Dialog',
  },
};

export default meta;

export const Story: Story = {
  args: {},
  render: () => {
    return (
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button variant="destructive">Delete File</Button>
        </AlertDialog.Trigger>
        <AlertDialog.Overlay />
        <AlertDialog.Content>
          <AlertDialog.Title>Dialog with primary destructive action</AlertDialog.Title>
          <AlertDialog.Description>
            Moving the file out of Team Foo means some people might lose access to it.
          </AlertDialog.Description>
          <AlertDialog.Actions>
            <AlertDialog.Cancel>
              <Button>Cancel</Button>
            </AlertDialog.Cancel>
            <AlertDialog.Cancel>
              <Button variant="destructive">Delete File</Button>
            </AlertDialog.Cancel>
          </AlertDialog.Actions>
        </AlertDialog.Content>
      </AlertDialog.Root>
    );
  },
};
