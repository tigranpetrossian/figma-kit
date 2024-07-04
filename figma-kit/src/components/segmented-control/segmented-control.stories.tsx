import type { Meta, StoryObj } from '@storybook/react';
import { Tooltip } from '@components/tooltip';
import * as SegmentedControl from './segmented-control';

type Story = StoryObj<typeof SegmentedControl.Root>;

const meta: Meta<typeof SegmentedControl.Root> = {
  title: 'Components/Segmented Control',
  component: SegmentedControl.Root,
  parameters: {
    radixUrl: 'https://www.radix-ui.com/primitives/docs/components/toggle-group',
    radixComponentName: 'Toggle Group',
  },
};

export default meta;

export const Basic: Story = {
  render() {
    return (
      <SegmentedControl.Root defaultValue="left">
        <SegmentedControl.Item value="left" aria-label="Align left">
          <IconAlignLeft />
        </SegmentedControl.Item>
        <SegmentedControl.Item value="center" aria-label="Align center">
          <IconAlignCenter />
        </SegmentedControl.Item>
        <SegmentedControl.Item value="right" aria-label="Align right">
          <IconAlignRight />
        </SegmentedControl.Item>
        <SegmentedControl.Item value="justify" aria-label="Align justify">
          <IconAlignJustify />
        </SegmentedControl.Item>
      </SegmentedControl.Root>
    );
  },
};

export const FullWidth: Story = {
  render() {
    return (
      <SegmentedControl.Root fullWidth defaultValue="left">
        <SegmentedControl.Item value="left" aria-label="Align left">
          <IconAlignLeft />
        </SegmentedControl.Item>
        <SegmentedControl.Item value="center" aria-label="Align center">
          <IconAlignCenter />
        </SegmentedControl.Item>
        <SegmentedControl.Item value="right" aria-label="Align right">
          <IconAlignRight />
        </SegmentedControl.Item>
        <SegmentedControl.Item value="justify" aria-label="Align justify">
          <IconAlignJustify />
        </SegmentedControl.Item>
      </SegmentedControl.Root>
    );
  },
};

export const WithTooltips: Story = {
  render() {
    return (
      <SegmentedControl.Root defaultValue="left">
        <Tooltip content="Align left">
          <SegmentedControl.Item value="left" aria-label="Align left">
            <IconAlignLeft />
          </SegmentedControl.Item>
        </Tooltip>
        <Tooltip content="Align center">
          <SegmentedControl.Item value="center" aria-label="Align center">
            <IconAlignCenter />
          </SegmentedControl.Item>
        </Tooltip>
        <Tooltip content="Align right">
          <SegmentedControl.Item value="right" aria-label="Align right">
            <IconAlignRight />
          </SegmentedControl.Item>
        </Tooltip>
        <Tooltip content="Align justify">
          <SegmentedControl.Item value="justify" aria-label="Align justify">
            <IconAlignJustify />
          </SegmentedControl.Item>
        </Tooltip>
      </SegmentedControl.Root>
    );
  },
};

export const Disabled: Story = {
  render() {
    return (
      <SegmentedControl.Root defaultValue="left" disabled>
        <SegmentedControl.Item value="left" aria-label="Align left">
          <IconAlignLeft />
        </SegmentedControl.Item>
        <SegmentedControl.Item value="center" aria-label="Align center">
          <IconAlignCenter />
        </SegmentedControl.Item>
        <SegmentedControl.Item value="right" aria-label="Align right">
          <IconAlignRight />
        </SegmentedControl.Item>
        <SegmentedControl.Item value="justify" aria-label="Align justify">
          <IconAlignJustify />
        </SegmentedControl.Item>
      </SegmentedControl.Root>
    );
  },
};

export const Text: Story = {
  render() {
    return (
      <SegmentedControl.Root defaultValue="minimalist">
        <SegmentedControl.Item value="minimalist">
          <SegmentedControl.Text>Minimalist</SegmentedControl.Text>
        </SegmentedControl.Item>
        <SegmentedControl.Item value="modern">
          <SegmentedControl.Text>Modern</SegmentedControl.Text>
        </SegmentedControl.Item>
        <SegmentedControl.Item value="retro">
          <SegmentedControl.Text>Retro</SegmentedControl.Text>
        </SegmentedControl.Item>
      </SegmentedControl.Root>
    );
  },
};

const IconAlignLeft = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="10" viewBox="0 0 14 10" fill="none">
      <path fill="var(--color-icon)" fillRule="evenodd" d="M0 0h14v1H0V0zm0 4h8v1H0V4zm10 4H0v1h10V8z"></path>
    </svg>
  );
};

const IconAlignRight = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="10" viewBox="0 0 14 10" fill="none">
      <path
        fill="var(--color-icon)"
        fillRule="evenodd"
        stroke="none"
        d="M0 0h14v1H0V0zm6 4h8v1H6V4zm8 4H4v1h10V8z"
      ></path>
    </svg>
  );
};

const IconAlignCenter = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="10" viewBox="0 0 14 10" fill="none">
      <path
        fill="var(--color-icon)"
        fillRule="evenodd"
        stroke="none"
        d="M0 0h14v1H0V0zm3 4h8v1H3V4zm9 4H2v1h10V8z"
      ></path>
    </svg>
  );
};

const IconAlignJustify = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="10" viewBox="0 0 14 10" fill="none">
      <path
        fill="var(--color-icon)"
        fillRule="evenodd"
        stroke="none"
        d="M0 0h14v1H0V0zm0 4h14v1H0V4zm14 4H0v1h14V8z"
      ></path>
    </svg>
  );
};
