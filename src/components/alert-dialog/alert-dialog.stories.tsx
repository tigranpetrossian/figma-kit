import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@components/button';
import * as AlertDialog from './alert-dialog';

const meta = {
  title: 'Components/Alert Dialog',
  component: AlertDialog.Root,
} satisfies Meta<typeof AlertDialog.Root>;

type Story = StoryObj<typeof meta>;

const Story: Story = {
  render() {
    return (
      <AlertDialog.Root>
        <AlertDialog.Trigger>
          <Button variant="destructive">Delete file</Button>
        </AlertDialog.Trigger>
        <AlertDialog.Portal>
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
              <AlertDialog.Action>
                <Button variant="destructive">Delete file</Button>
              </AlertDialog.Action>
            </AlertDialog.Actions>
          </AlertDialog.Content>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    );
  },
};

export default meta;
export { Story };
