// Caching the canvas and 2D context, so we don't have to create them every time
// we want to measure text:
let canvas: HTMLCanvasElement | null = null;
let context: CanvasRenderingContext2D | null = null;

/**
 * Returns the ideal width of an input element (in pixels) that based on its
 * value or placeholder.
 *
 * @param input Input element for which to get width.
 *
 * @see https://stackoverflow.com/a/68326447
 */
export function inputWidth(input: HTMLInputElement): number {
  if (canvas === null) {
    canvas = document.createElement("canvas");
  }

  if (context === null) {
    context = canvas.getContext("2d")!;
  }

  const text = input.value || input.placeholder;

  const style = window.getComputedStyle(input);

  const horizontalBorder =
    Number.parseFloat(style.borderLeftWidth) +
    Number.parseFloat(style.borderRightWidth);

  const horizontalPadding =
    Number.parseFloat(style.paddingLeft) +
    Number.parseFloat(style.paddingRight);

  context.font = style.font;

  const textWidth = context.measureText(text).width;

  return Math.ceil(horizontalBorder + horizontalPadding + textWidth);
}
