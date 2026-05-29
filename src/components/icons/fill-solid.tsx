import { createIcon } from '@components/icon';

export const FillSolidIcon = createIcon({
  displayName: 'FillSolid',
  path: (
    <>
      <path fill="var(--color-icon-tertiary)" d="M9 9h6v6H9z" />
      <path
        fill="var(--color-icon)"
        fillRule="evenodd"
        d="M8 7h8a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H8a1 1 0 0 1-1-1V8a1 1 0 0 1 1-1M6 8a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2zm3 7V9h6v6zM8 8.5a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-7a.5.5 0 0 1-.5-.5z"
        clipRule="evenodd"
      />
    </>
  ),
});
