# AGENTS.md

This file provides guidance to Codex (Codex.ai/code) when working with code in this repository.

## Repository layout

Single-package pnpm library repo. The root package is the published `figma-kit` package.

- `src/` — library source for the published package.
- `test/` — Vitest tests.
- `docs/` — MDX docs kept outside package execution.
- `patches/` — pnpm patch for `@radix-ui/react-slider@1.2.0` applied via `pnpm.patchedDependencies`.

## Common commands

Run everything from the repo root.

- `pnpm dev` — watch-mode Vite build of the library.
- `pnpm build` — full library build: JS bundles + `styles.css` + `figma-development-theme.css` + `tailwind.css`.
- `pnpm test` — Vitest in run mode. Single file: `pnpm test -- test/path.test.tsx`. Single test: append `-t "name"`.
- `pnpm lint` — ESLint across `**/{src,test}/**/*.{ts,tsx}` with `--max-warnings 0`. Lint-staged runs this on commit.

The library `build` is composed of four steps (`build:js`, `build:css`, `build:figma-dev-theme-css`, `build:tailwind-css`); when iterating on CSS or the Tailwind stylesheet, run only the relevant root subscript.

## Architecture

### Component pattern

Components are thin wrappers over Radix UI primitives, styled with prefixed BEM-ish class names (`fp-*`) and variant resolution via `class-variance-authority` (`cva`). Public API decisions to know:

- `asChild` is intentionally hidden on most primitives — wrappers force `asChild` internally and accept children that are real elements (see `src/components/dialog/dialog.tsx:18`).
- Variants are declared with `cva('fp-Component', { variants: { variant: { ... }, size: { ... } } })` and exposed as typed props via `VariantProps<typeof cva>`. Default variants live in the same `cva` call.
- Each component dir co-locates `*.tsx`, `*.css`, and an `index.ts` barrel that re-exports `* from './component'`.
- Compound components are exported namespaced from `src/index.ts` (e.g. `import { Dialog } from 'figma-kit'` then `<Dialog.Root>`). Singleton components like `Button`, `Text`, `Input` are exported as named symbols.
- Two `*.base/` folders (`dialog.base`, `menu.base`) hold shared structural pieces that are reused across higher-level components (`Dialog` and `AlertDialog` both pull `Header/Section/Controls` from `dialog.base`).

### Styling system

The library targets Figma plugin UI, which injects Figma's semantic color tokens as CSS custom properties (`--figma-color-*`). Components consume those directly — do not hardcode colors.

- `src/styles/index.css` is the entry that `@import`s every token file and every component CSS file in build order. New components must be added here or their styles won't ship in `dist/styles.css`.
- `src/styles/tokens/` defines the library's own non-color tokens (`--space-*`, `--radius-*`, `--font-size-*`, `--elevation-*`, etc.). These are independent of Figma's tokens and are used by components for layout/typography.
- `src/styles/figma-development-theme.css` ships as a separate output and provides hardcoded values for `--figma-color-*` so the library renders correctly outside a real Figma plugin. Never import it from plugin code.
- PostCSS pipeline (`postcss.config.cjs`) runs `postcss-import` then `postcss-nesting`. Component CSS uses native nesting (`&:hover {}`).
- `src/tailwind/tailwind.css` is a Tailwind v4 stylesheet that maps every Figma token to a utility (e.g. `bg-brand`, `text-secondary`, `icon-danger`) via `@theme` blocks. It replaces Tailwind's color theme rather than extending it; consumers opt in by `@import`ing it alongside `tailwindcss` in their CSS entry. The `@utility icon-*` rule sets the `--color-icon` CSS variable consumed by icon components.

### Path aliases

`tsconfig.json` declares aliases used throughout the package:

- `@components/*` → `src/components/*`
- `@lib/*` → `src/lib/*`
- `@examples/*` → `src/examples/*`

Aliases are resolved at build time by Vite's native `resolve.tsconfigPaths`.

### Library shared primitives

`src/lib/`:

- `react/create-context.tsx` — Radix-derived context factory used by compound components that need to share state between parts (e.g. `ValueField`).
- `react/use-compose-refs.ts`, `react/use-controllable-state.ts` — standard Radix patterns for forwarded refs and uncontrolled/controlled state.
- `dom/set-input-value.ts` — programmatically setting input values while triggering React's synthetic event (used for nudging value fields).
- `color.ts`, `number/`, `constants.ts` — used heavily by `value-field` and `color-picker`.

## Code conventions specific to this repo

- Before editing, inspect nearby component patterns first. For new components, add the CSS import to `src/styles/index.css`; if the component is public, export it from `src/index.ts`.
- `import/no-default-export` is enforced.
- `import/exports-last` is enforced — types and values are exported at the bottom of each file in two grouped statements (`export type { ... }` then `export { ... }`).
- `@typescript-eslint/consistent-type-imports` is on — use `import type` for type-only imports.
- `displayName` is set on every `forwardRef` component (often as `Namespace.Part`, e.g. `'Dialog.Trigger'`).

## Testing

- Vitest + Testing Library + happy-dom (`vite.config.ts`, `test/setup.ts`).
- `@testing-library/jest-dom/vitest` matchers are loaded globally.
- Tests live under `test/` (not co-located). The bulk of existing coverage is around `value-field` (numeric/hex/base parsing & evaluation).

## Release

- Conventional Commits enforced via commitlint + Husky (`commitlint.config.ts`).
- semantic-release configured in `release.config.cjs`. Releases run on `main` (stable) and `beta` (prerelease). `feat` → minor, `fix`/`perf` → patch, `docs(README)` → patch.
- The package version field is `0.0.0-semantic-release` — never bump manually.
