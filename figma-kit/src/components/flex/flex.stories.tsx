import type { Meta, StoryObj } from '@storybook/react';
import { Flex } from './flex';

type Story = StoryObj<typeof Flex>;

const meta: Meta<typeof Flex> = {
  title: 'Components/Flex',
  component: Flex,
};

export default meta;

const PreviewBox = () => <div style={{ width: 72, height: 72, backgroundColor: 'var(--figma-color-bg-brand)' }}></div>;

export const Story: Story = {
  render() {
    return (
      <Flex gap="2" align="center" justify="center">
        <PreviewBox />
        <PreviewBox />
        <PreviewBox />
        <PreviewBox />
        <PreviewBox />
      </Flex>
    );
  },
};
