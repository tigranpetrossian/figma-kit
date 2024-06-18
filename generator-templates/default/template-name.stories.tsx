import type { Meta, StoryObj } from '@storybook/react';
import { TemplateName } from './template-name';

type Story = StoryObj<typeof TemplateName>;

const meta: Meta<typeof TemplateName> = {
  component: TemplateName,
};

export default meta;

export const Story: Story = {
  args: {},
};
