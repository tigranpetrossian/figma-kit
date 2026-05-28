import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import * as SegmentedControl from '@components/segmented-control';

describe('SegmentedControl', () => {
  it('moves selection when another item is clicked', async () => {
    const user = userEvent.setup();

    render(
      <SegmentedControl.Root defaultValue="left">
        <SegmentedControl.Item value="left" aria-label="Align left" />
        <SegmentedControl.Item value="center" aria-label="Align center" />
      </SegmentedControl.Root>
    );

    await user.click(screen.getByLabelText('Align center'));

    expect(screen.getByLabelText('Align left')).toHaveAttribute('aria-pressed', 'false');
    expect(screen.getByLabelText('Align center')).toHaveAttribute('aria-pressed', 'true');
  });
});
