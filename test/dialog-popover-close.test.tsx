import React from 'react';
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import * as Dialog from '@components/dialog';
import * as Popover from '@components/popover';
import { Button } from '@components/button';

type CloseComponent = typeof Dialog.Close | typeof Popover.Close;

const OPEN_CONTAINERS: Array<[string, CloseComponent, (close: React.ReactNode) => React.ReactNode]> = [
  [
    'Dialog.Close',
    Dialog.Close,
    (close) => (
      <Dialog.Root defaultOpen>
        <Dialog.Portal>
          <Dialog.Popup>{close}</Dialog.Popup>
        </Dialog.Portal>
      </Dialog.Root>
    ),
  ],
  [
    'Popover.Close',
    Popover.Close,
    (close) => (
      <Popover.Root defaultOpen>
        <Popover.Portal>
          <Popover.Positioner>
            <Popover.Popup>{close}</Popover.Popup>
          </Popover.Positioner>
        </Popover.Portal>
      </Popover.Root>
    ),
  ],
];

describe.each(OPEN_CONTAINERS)('%s', (_, Close, renderOpen) => {
  it('renders a close icon button labeled "Close" by default', () => {
    render(renderOpen(<Close />));

    const button = screen.getByRole('button', { name: 'Close' });
    expect(button.querySelector('svg')).not.toBeNull();
  });

  it('replaces the default icon with custom children', () => {
    render(renderOpen(<Close>×</Close>));

    const button = screen.getByRole('button', { name: 'Close' });
    expect(button).toHaveTextContent('×');
    expect(button.querySelector('svg')).toBeNull();
  });

  it('names a custom render element by its children', () => {
    render(renderOpen(<Close render={<Button />}>Cancel</Close>));

    expect(screen.getByRole('button', { name: 'Cancel' })).toHaveTextContent('Cancel');
  });

  it('uses a custom aria-label on the default icon button', () => {
    render(renderOpen(<Close aria-label="Fermer" />));

    const button = screen.getByRole('button', { name: 'Fermer' });
    expect(button.querySelector('svg')).not.toBeNull();
  });
});
