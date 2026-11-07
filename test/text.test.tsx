import { render, screen } from '@testing-library/react';
import postcss, { type Root } from 'postcss';
import postcssNesting from 'postcss-nesting';
import { describe, expect, it } from 'vitest';
import { Heading, Label, Link, Paragraph, Text, TEXT_COLORS, TEXT_SIZES, type TextColor } from '@components/text';
import fs from 'node:fs/promises';
import path from 'node:path';

const TEXT_STYLESHEET = path.resolve('src/components/text/text.css');
const FIGMA_THEME = path.resolve('src/styles/figma-development-theme.css');
const INTERACTION_STATE_TOKEN = /-(hover|pressed)$/;

describe('Text stylesheet', () => {
  it.each(TEXT_SIZES)('sets size %s to its Figma font size, line height, and letter spacing', async (size) => {
    const root = await parseNested(TEXT_STYLESHEET);

    expect(declarationsOf(root, `.fp-Text:where(.fp-size-${size})`)).toEqual({
      '--font-size': `var(--font-size-${size})`,
      '--line-height': `var(--line-height-${size})`,
      '--letter-spacing': `var(--letter-spacing-${size})`,
    });
  });

  it.each(TEXT_COLORS)('sets color %s to its Figma text color token', async (color) => {
    const [root, themeTokens] = await Promise.all([parseNested(TEXT_STYLESHEET), figmaTextColorTokens()]);
    const token = figmaTokenFor(color);

    expect(themeTokens).toContain(token);
    expect(declarationsOf(root, `.fp-Text:where(.fp-color-${color})`)).toEqual({ '--text-color': `var(${token})` });
  });

  it('offers every Figma text color token except hover and pressed states', async () => {
    const themeTokens = await figmaTextColorTokens();
    const staticTokens = themeTokens.filter((token) => !INTERACTION_STATE_TOKEN.test(token));

    expect(TEXT_COLORS.map(figmaTokenFor).sort()).toEqual(staticTokens.sort());
  });
});

describe('Text', () => {
  it('leaves size, weight, and color unset so nested text inherits them', () => {
    render(
      <Text size="9" weight="strong" color="danger">
        Parent <Text>child</Text>
      </Text>
    );

    const child = screen.getByText('child');
    expect(child.className).not.toMatch(/fp-(size|weight|color)-/);
  });

  it('applies the chosen size, weight, and color', () => {
    render(
      <Text size="5" weight="strong" color="secondary">
        Label
      </Text>
    );

    expect(screen.getByText('Label')).toHaveClass('fp-Text', 'fp-size-5', 'fp-weight-strong', 'fp-color-secondary');
  });

  it('lets Label and Paragraph render a different element', () => {
    render(
      <>
        <Label render={<div />}>Label</Label>
        <Paragraph render={<div />}>Paragraph</Paragraph>
      </>
    );

    expect(screen.getByText('Label').tagName).toBe('DIV');
    expect(screen.getByText('Paragraph').tagName).toBe('DIV');
  });
});

describe('Link', () => {
  it('uses the brand color unless another color is given', () => {
    render(
      <>
        <Link href="#docs">Docs</Link>
        <Link href="#help" color="secondary">
          Help
        </Link>
      </>
    );

    expect(screen.getByRole('link', { name: 'Docs' })).toHaveClass('fp-Link', 'fp-color-brand');
    expect(screen.getByRole('link', { name: 'Help' })).toHaveClass('fp-Link', 'fp-color-secondary');
    expect(screen.getByRole('link', { name: 'Help' })).not.toHaveClass('fp-color-brand');
  });
});

describe('Heading', () => {
  it.each([
    [1, '9'],
    [2, '7'],
    [3, '5'],
    [4, '4'],
    [5, '3'],
  ] as const)('renders level %i as a strong heading at size %s', (level, size) => {
    render(<Heading level={level}>Title</Heading>);

    const heading = screen.getByRole('heading', { level, name: 'Title' });
    expect(heading.tagName).toBe(`H${level}`);
    expect(heading).toHaveClass(`fp-size-${size}`, 'fp-weight-strong');
  });

  it('defaults to level 1', () => {
    render(<Heading>Title</Heading>);

    expect(screen.getByRole('heading', { level: 1, name: 'Title' })).toBeInTheDocument();
  });

  it('keeps its level when size and weight are overridden', () => {
    render(
      <Heading level={2} size="3" weight="default">
        Layer
      </Heading>
    );

    const heading = screen.getByRole('heading', { level: 2, name: 'Layer' });
    expect(heading).toHaveClass('fp-size-3', 'fp-weight-default');
    expect(heading).not.toHaveClass('fp-size-7', 'fp-weight-strong');
  });
});

async function parseNested(file: string) {
  const css = await fs.readFile(file, 'utf8');
  const result = await postcss([postcssNesting()]).process(css, { from: file });
  return postcss.parse(result.css);
}

async function figmaTextColorTokens() {
  const root = postcss.parse(await fs.readFile(FIGMA_THEME, 'utf8'));
  const tokens = new Set<string>();
  root.walkDecls(/^--figma-color-text(-|$)/, (declaration) => {
    tokens.add(declaration.prop);
  });
  return [...tokens];
}

function figmaTokenFor(color: TextColor) {
  return color === 'default' ? '--figma-color-text' : `--figma-color-text-${color}`;
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
