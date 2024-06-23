import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '@components/button';
import * as AlertDialog from './alert-dialog';

type Story = StoryObj<typeof AlertDialog.Root>;

const meta: Meta<typeof AlertDialog.Root> = {
  title: 'Components/Alert Dialog',
  component: AlertDialog.Root,
};

export default meta;

export const Story: Story = {
  args: {},
  render: () => {
    return (
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button variant="destructiveSecondary">Delete user</Button>
        </AlertDialog.Trigger>
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
