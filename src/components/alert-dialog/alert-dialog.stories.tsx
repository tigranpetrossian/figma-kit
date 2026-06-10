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
        <AlertDialog.Trigger render={<Button variant="destructive" />}>Delete file</AlertDialog.Trigger>
        <AlertDialog.Portal>
          <AlertDialog.Backdrop />
          <AlertDialog.Popup>
            <AlertDialog.Title>Dialog with primary destructive action</AlertDialog.Title>
            <AlertDialog.Description>
              Moving the file out of Team Foo means some people might lose access to it.
            </AlertDialog.Description>
            <AlertDialog.Actions>
              <AlertDialog.Close render={<Button />}>Cancel</AlertDialog.Close>
              <AlertDialog.Close render={<Button variant="destructive" />}>Delete file</AlertDialog.Close>
            </AlertDialog.Actions>
          </AlertDialog.Popup>
        </AlertDialog.Portal>
      </AlertDialog.Root>
    );
  },
};

export default meta;
export { Story };
