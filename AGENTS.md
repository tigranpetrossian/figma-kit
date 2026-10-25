# AGENTS.md

React components that replicate Figma's UI for plugins. The library is in beta, so breaking API changes are fine.

## Commands

- `pnpm storybook` starts Storybook on port 6006.
- `pnpm test` runs all tests. Pass a file path to run one file, and add `-t "name"` to run one test.
- `pnpm lint` lints and auto-fixes.
- `pnpm exec tsc --noEmit` typechecks.
- `pnpm build` builds the JS, types, and CSS into `dist/`.

## Components

- Most components wrap `@base-ui/react`. Some, like `Button` and `Checkbox`, are plain DOM.
- Compose with Base UI's `render` prop. There is no `asChild`.
- Add classes to Base UI parts with `addClassName`, because their `className` can be a function.
- A new component needs its CSS imported in `src/styles/index.css` and its export added to `src/index.ts`.
- A new icon needs its export added to `src/components/icons/index.ts`.
- Changes to `menu.base/menu.base.css` affect DropdownMenu, ContextMenu, Select, Combobox, and `ValueField.NumericSelect`.

## Styling

- Style an open trigger with `[aria-expanded='true']`, not `[data-popup-open]`. A Tooltip also sets `data-popup-open` on the trigger it shares.
- `src/tailwind/tailwind.css` must keep component styles in the `components` layer. `test/tailwind.test.ts` checks this.
- `src/styles/figma-development-theme.css` is for running outside Figma only. Plugin builds must not import it.

## Conventions

- Export at the bottom of the file: `export type { ... }`, then `export { ... }`. No default exports, except for stories.
- Set `displayName` on `forwardRef` components, as `'Dialog.Popup'` for compound parts.
- Tests go in `test/`.
- Use Conventional Commits. PRs target `beta`.
- Never change the `package.json` version. semantic-release sets it.
