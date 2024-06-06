import evaluate from '@emmetio/math-expression';

function evaluateExpression(expression: string, value: number) {
  const result = evaluate(
    expression
      .replace(/%/g, '')
      .replace(/(\d+)x/gi, (match, p1) => `(${value}*${p1})`)
      .replace(/x(\d+)/gi, (match, p1) => `(${value}*${p1})`)
  );

  if (result === null) {
    throw new Error('Invalid expression:');
  }

  return result;
}

export { evaluateExpression };
