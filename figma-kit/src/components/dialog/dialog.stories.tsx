import type { Meta, StoryObj } from '@storybook/react';
import { IconButton } from '@components/icon-button';
import { PlusIcon } from '@components/icons';
import { Button } from '../button';
import * as Dialog from './dialog';

type Story = StoryObj<typeof Dialog.Root>;

const meta: Meta<typeof Dialog.Root> = {
  title: 'Components/Dialog',
  component: Dialog.Root,
};

export default meta;

export const Story: Story = {
  args: {},
  render: () => {
    return (
      <Dialog.Root>
        <Dialog.Trigger>
          <Button>Open dialog</Button>
        </Dialog.Trigger>
        <Dialog.Content overlay>
          <Dialog.Header>
            <Dialog.Title>Things here or tabs</Dialog.Title>
            <Dialog.Controls>
              <IconButton aria-label="Add">
                <PlusIcon />
              </IconButton>
              <Dialog.Close />
            </Dialog.Controls>
          </Dialog.Header>
          <Dialog.Section>
            They invest in understanding their users’ needs, behaviors, and pain points and relentlessly strive to
            deliver value. Instagram’s performance optimization journey exemplifies this mindset, focusing on improving
            perceived speed and reducing user frustration, leading to significant gains in engagement and retention. By
            placing the user at the center of every decision, Instagram was able to identify and prioritize the most
            impactful optimizations, such as preloading critical resources and leveraging adaptive loading strategies.
            This user-centric approach allowed them to deliver a seamless and delightful experience to their vast user
            base, even as their platform grew in complexity.
          </Dialog.Section>
        </Dialog.Content>
      </Dialog.Root>
    );
  },
};
