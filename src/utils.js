/**
 * Generates an array of numbers from `start` to `end` with an optional
 * `step` value.
 *
 * @param {number} start - The starting number of the range.
 * @param {number} end - The ending number of the range.
 * @param {number} [step=1] - The step value used to generate the range.
 * @returns {Array<number>} - An array of numbers in the range.
 */
export const range = (start, end, step = 1) => {
  let output = [];
  if (typeof end === 'undefined') {
    end = start;
    start = 0;
  }
  for (let i = start; i < end; i += step) {
    output.push(i);
  }
  return output;
};
