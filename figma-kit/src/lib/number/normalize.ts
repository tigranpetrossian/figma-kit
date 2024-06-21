/**
 * Map a value to a specified range.
 * https://stats.stackexchange.com/a/281164
 *
 * @param sourceRange {[number, number]} - input range
 * @param targetRange {[number, number]} - The target range to map the value to
 * @return {function(number): number} A function that takes a number and maps it to the specified range
 *
 * @example:
 * normalize([0, 1], [0, 100])(0.5) -> 50
 * normalize([0, 1], [0, 255])(1) -> 255
 */
export function normalize(sourceRange: [number, number], targetRange: [number, number]) {
  const [sourceMin, sourceMax] = sourceRange;
  const [targetMin, targetMax] = targetRange;

  return function (value: number): number {
    if (sourceMin === sourceMax || targetMin === targetMax) {
      return targetMin;
    }

    return ((value - sourceMin) / (sourceMax - sourceMin)) * (targetMax - targetMin) + targetMin;
  };
}
