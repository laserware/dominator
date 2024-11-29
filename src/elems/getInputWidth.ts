/* istanbul ignore file -- @preserve: We can't test this with Vitest because we can't use the canvas in tests. */

// Caching the canvas and 2D context, so we don't have to create them every time
// we want to measure text:
let canvas: HTMLCanvasElement | null = null;
let context: CanvasRenderingContext2D | null = null;

/**
 * Gets the ideal width of the specified `input` element (in pixels) that based on
 * its value or placeholder using the [measureText](https://stackoverflow.com/a/68326447)
 * approach.
 *
 * @param input The `HTMLInputElement` for which to get width.
 *
 * @returns Ideal width for the `input`.
 *
 * @category Elems
 */
export function getInputWidth(input: HTMLInputElement): number {
  if (canvas === null) {
    canvas = document.createElement("canvas");
  }

  if (context === null) {
    context = canvas.getContext("2d")!;
  }

  const text = input.value || input.placeholder;

  const elementStyle = window.getComputedStyle(input);

  const horizontalBorder =
    Number.parseFloat(elementStyle.borderLeftWidth) +
    Number.parseFloat(elementStyle.borderRightWidth);

  const horizontalPadding =
    Number.parseFloat(elementStyle.paddingLeft) +
    Number.parseFloat(elementStyle.paddingRight);

  context.font = elementStyle.font;

  const textWidth = context.measureText(text).width;

  return Math.ceil(horizontalBorder + horizontalPadding + textWidth);
}
