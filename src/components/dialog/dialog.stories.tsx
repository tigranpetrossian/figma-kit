import type { Meta, StoryObj } from '@storybook/react-vite';
import { Button } from '@components/button';
import * as Dialog from './dialog';

const meta = {
  title: 'Components/Dialog',
  component: Dialog.Root,
} satisfies Meta<typeof Dialog.Root>;

type Story = StoryObj<typeof meta>;

const Story: Story = {
  render() {
    return (
      <Dialog.Root>
        <Dialog.Trigger render={<Button />}>Dogs</Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Backdrop />
          <Dialog.Popup>
            <Dialog.Header>
              <Dialog.Title>Onboarding</Dialog.Title>
              <Dialog.Controls>
                <Dialog.Close />
              </Dialog.Controls>
            </Dialog.Header>
            <OnboardingPreview />
            <Dialog.Section>
              <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Button>Next</Button>
              </div>
            </Dialog.Section>
          </Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    );
  },
};

const OnboardingPreview = () => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 72px',
        gap: 16,
        width: 352,
        height: 192,
        padding: 24,
        background: 'var(--figma-color-bg-inverse)',
        color: 'var(--figma-color-text-oninverse)',
        boxSizing: 'border-box',
      }}
    >
      <div style={{ border: '2px solid currentColor', display: 'grid', gridTemplateColumns: '48px 1fr 32px' }}>
        <div style={{ borderRight: '2px solid currentColor' }} />
        <div style={{ borderRight: '2px solid currentColor', borderTop: '14px solid currentColor' }} />
        <div style={{ borderTop: '14px solid currentColor' }} />
      </div>
      <div style={{ display: 'grid', gap: 8, alignContent: 'center' }}>
        <PreviewLine width={72} />
        <PreviewLine width={56} />
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          <PreviewDot color="#18a0fb" />
          <PreviewDot color="#1bc47d" />
          <PreviewDot color="#ffeb00" />
          <PreviewDot color="#ffffff" />
          <PreviewDot color="#7b61ff" />
          <PreviewDot color="#f24822" />
        </div>
      </div>
    </div>
  );
};

type PreviewLineProps = {
  width: number;
};

const PreviewLine = (props: PreviewLineProps) => {
  return <div style={{ width: props.width, height: 10, background: 'currentColor' }} />;
};

type PreviewDotProps = {
  color: string;
};

const PreviewDot = (props: PreviewDotProps) => {
  return <div style={{ width: 18, height: 18, borderRadius: 9, background: props.color }} />;
};

export default meta;
export { Story };
