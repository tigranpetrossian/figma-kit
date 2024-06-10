import evaluate from '@emmetio/math-expression';

export function evaluateExpression(
  expression: string,
  currentDisplayValue: number,
  treatPercentageAsValue: boolean = false
) {
  const modifiedExpression = treatPercentageAsValue
    ? expression
        .replace(/%/g, '')
        .replace(/(\d*\.?\d+)x/gi, (match, p1) => `(${currentDisplayValue}*${p1})`)
        .replace(/x(\d*\.?\d+)/gi, (match, p1) => `(${currentDisplayValue}*${p1})`)
        .replace(/(?<!\d)x(?!\d)/gi, `${currentDisplayValue}`)
    : expression
        .replace(/(\d*\.?\d+)%/gi, (match, p1) => `(${currentDisplayValue}*${p1}/100)`)
        .replace(/%(\d*\.?\d+)/gi, (match, p1) => `(${currentDisplayValue}*${p1}/100)`)
        .replace(/(\d*\.?\d+)x/gi, (match, p1) => `(${currentDisplayValue}*${p1})`)
        .replace(/x(\d*\.?\d+)/gi, (match, p1) => `(${currentDisplayValue}*${p1})`)
        .replace(/(?<!\d)x(?!\d)/gi, `${currentDisplayValue}`);

  const result = evaluate(modifiedExpression);
  if (result === null) {
    throw new Error('Invalid expression.');
  }
  return result;
}
