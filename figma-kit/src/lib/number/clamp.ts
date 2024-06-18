export function clamp(value: number, min: number, max?: number) {
  if (!max) {
    max = min;
    min = -Infinity;
  }

  return Math.min(Math.max(value, min), max);
}
