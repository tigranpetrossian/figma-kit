import { describe, expect, it } from 'vitest';
import postcss, { type PluginCreator } from 'postcss';
import postcssNesting from 'postcss-nesting';
import fs from 'node:fs/promises';
import { createRequire } from 'node:module';
import path from 'node:path';

const postcssImport = createRequire(import.meta.url)('postcss-import') as PluginCreator<Record<string, never>>;

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
