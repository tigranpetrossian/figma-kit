import evaluate from '@emmetio/math-expression';

function evaluateExpression(expression: string, value: number) {
  const result = evaluate(
    `(${expression
      .replace(/%/g, '')
      .replace(/([+-]?\d*\.?\d+)x/gi, (match, p1) => `(${p1}*${value})`)
      .replace(/x([+-]?\d*\.?\d+)/gi, (match, p1) => `(${value}*${p1})`)})/100`
  );

  if (result === null) {
    throw new Error('Invalid expression:');
  }

  return result;
}

export { evaluateExpression };
