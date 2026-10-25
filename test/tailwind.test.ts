import { describe, expect, it } from 'vitest';
import postcss, { Rule, type PluginCreator, type Root } from 'postcss';
import postcssNesting from 'postcss-nesting';
import { compile } from 'tailwindcss';
import fs from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';

const require = createRequire(import.meta.url);
const postcssImport = require('postcss-import') as PluginCreator<Record<string, never>>;
const TAILWIND_ENTRY = path.resolve('src/tailwind/tailwind.css');
const TAILWIND_INDEX = path.join(path.dirname(require.resolve('tailwindcss/package.json')), 'index.css');

describe('Tailwind stylesheet', () => {
  it('places all component styles in the components cascade layer', async () => {
    const from = path.resolve('src/tailwind/tailwind.css');
    const input = await fs.readFile(from, 'utf8');
    const result = await postcss([postcssImport(), postcssNesting()]).process(input, { from });
    const root = postcss.parse(result.css);
    const componentRules: string[] = [];
    const incorrectlyLayeredRules: string[] = [];

    root.walkRules((rule) => {
      if (!rule.selector.includes('.fp-')) return;

      componentRules.push(rule.selector);

      let ancestor = rule.parent;
      while (ancestor && ancestor.type !== 'root') {
        if (ancestor.type === 'atrule' && ancestor.name === 'layer') break;
        ancestor = ancestor.parent;
      }

      if (ancestor?.type !== 'atrule' || ancestor.name !== 'layer' || ancestor.params !== 'components') {
        incorrectlyLayeredRules.push(rule.selector);
      }
    });

    expect(componentRules.length).toBeGreaterThan(0);
    expect(incorrectlyLayeredRules).toEqual([]);
  });
});

describe('Tailwind theme', () => {
  it('maps radius utilities to Figma radius tokens, then larger fixed radii', async () => {
    const root = await buildUtilities([
      'rounded',
      'rounded-xs',
      'rounded-sm',
      'rounded-md',
      'rounded-lg',
      'rounded-xl',
      'rounded-2xl',
      'rounded-3xl',
      'rounded-4xl',
    ]);

    expect(declarationsOf(root, '.rounded')).toEqual({ 'border-radius': 'var(--radius-default)' });
    expect(declarationsOf(root, '.rounded-xs')).toEqual({ 'border-radius': 'var(--radius-extra-small)' });
    expect(declarationsOf(root, '.rounded-sm')).toEqual({ 'border-radius': 'var(--radius-small)' });
    expect(declarationsOf(root, '.rounded-md')).toEqual({ 'border-radius': 'var(--radius-medium)' });
    expect(declarationsOf(root, '.rounded-lg')).toEqual({ 'border-radius': 'var(--radius-large)' });
    expect(declarationsOf(root, '.rounded-xl')).toEqual({ 'border-radius': '1rem' });
    expect(declarationsOf(root, '.rounded-2xl')).toEqual({ 'border-radius': '1.5rem' });
    expect(declarationsOf(root, '.rounded-3xl')).toEqual({ 'border-radius': '2rem' });
    expect(declarationsOf(root, '.rounded-4xl')).toEqual({});
  });

  it.each([
    ['text-xs', 1],
    ['text-sm', 2],
    ['text-base', 3],
    ['text-lg', 4],
    ['text-xl', 5],
    ['text-2xl', 6],
    ['text-3xl', 7],
    ['text-4xl', 8],
    ['text-5xl', 9],
    ['text-6xl', 10],
  ])('maps %s to Figma type step %i with its line height and letter spacing', async (utility, step) => {
    const root = await buildUtilities([utility]);

    expect(declarationsOf(root, `.${utility}`)).toEqual({
      'font-size': `var(--font-size-${step})`,
      'line-height': `var(--tw-leading, var(--line-height-${step}))`,
      'letter-spacing': `var(--tw-tracking, var(--letter-spacing-${step}))`,
    });
  });

  it('has no text sizes outside the Figma type steps', async () => {
    const root = await buildUtilities(['text-7xl', 'text-size-1', 'text-small']);

    expect(declarationsOf(root, '.text-7xl')).toEqual({});
    expect(declarationsOf(root, '.text-size-1')).toEqual({});
    expect(declarationsOf(root, '.text-small')).toEqual({});
  });

  it('resolves numeric leading on the spacing scale and keeps Tailwind leading names', async () => {
    const root = await buildUtilities(['leading-4', 'leading-1.5', 'leading-small', 'leading-tight']);

    expect(declarationsOf(root, '.leading-4')).toMatchObject({ 'line-height': 'calc(var(--spacing) * 4)' });
    expect(declarationsOf(root, '.leading-1\\.5')).toMatchObject({ 'line-height': 'calc(var(--spacing) * 1.5)' });
    expect(declarationsOf(root, '.leading-small')).toEqual({});
    expect(declarationsOf(root, '.leading-tight')).toMatchObject({ 'line-height': 'var(--leading-tight)' });
  });

  it('keeps Tailwind tracking names', async () => {
    const root = await buildUtilities(['tracking-1', 'tracking-small', 'tracking-tight']);

    expect(declarationsOf(root, '.tracking-1')).toEqual({});
    expect(declarationsOf(root, '.tracking-small')).toEqual({});
    expect(declarationsOf(root, '.tracking-tight')).toMatchObject({ 'letter-spacing': 'var(--tracking-tight)' });
  });

  it('maps normal and medium to Figma weights and keeps the other Tailwind weights', async () => {
    const root = await buildUtilities([
      'font-light',
      'font-normal',
      'font-medium',
      'font-semibold',
      'font-bold',
      'font-strong',
    ]);

    expect(declarationsOf(root, '.font-light')).toMatchObject({ 'font-weight': 'var(--font-weight-light)' });
    expect(declarationsOf(root, '.font-normal')).toMatchObject({ 'font-weight': 'var(--font-weight-default)' });
    expect(declarationsOf(root, '.font-medium')).toMatchObject({ 'font-weight': 'var(--font-weight-strong)' });
    expect(declarationsOf(root, '.font-semibold')).toMatchObject({ 'font-weight': 'var(--font-weight-semibold)' });
    expect(declarationsOf(root, '.font-bold')).toMatchObject({ 'font-weight': 'var(--font-weight-bold)' });
    expect(declarationsOf(root, '.font-strong')).toEqual({});
  });

  it('maps font families to Figma fonts', async () => {
    const root = await buildUtilities(['font-sans', 'font-mono', 'font-monospace']);

    expect(declarationsOf(root, '.font-sans')).toEqual({ 'font-family': 'var(--font-family-default)' });
    expect(declarationsOf(root, '.font-mono')).toEqual({ 'font-family': 'var(--font-family-monospace)' });
    expect(declarationsOf(root, '.font-monospace')).toEqual({});
  });

  it('renders bold elements at the Figma strong weight', async () => {
    const root = await buildUtilities([]);

    expect(lastDeclarationFor(root, 'b', 'font-weight')).toBe('var(--font-weight-strong)');
    expect(lastDeclarationFor(root, 'strong', 'font-weight')).toBe('var(--font-weight-strong)');
  });
});

async function buildUtilities(candidates: string[]) {
  const compiler = await compile(`@import 'tailwindcss';\n@import '${TAILWIND_ENTRY}';`, {
    base: path.dirname(TAILWIND_ENTRY),
    loadStylesheet,
  });
  return postcss.parse(compiler.build(candidates));
}

async function loadStylesheet(id: string, base: string) {
  const file = id === 'tailwindcss' ? TAILWIND_INDEX : path.resolve(base, id);
  return { path: file, base: path.dirname(file), content: await fs.readFile(file, 'utf8') };
}

function declarationsOf(root: Root, selector: string) {
  const declarations: Record<string, string> = {};
  root.walkRules((rule) => {
    if (rule.selector !== selector) return;
    rule.walkDecls((declaration) => {
      declarations[declaration.prop] = declaration.value;
    });
  });
  return declarations;
}

function lastDeclarationFor(root: Root, selector: string, property: string) {
  let value: string | undefined;
  root.walkDecls(property, (declaration) => {
    const { parent } = declaration;
    if (parent instanceof Rule && parent.selectors.includes(selector)) value = declaration.value;
  });
  return value;
}
