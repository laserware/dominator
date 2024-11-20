// Caching the canvas and 2D context, so we don't have to create them every time
// we want to measure text:
let canvas: HTMLCanvasElement | null = null;
let context: CanvasRenderingContext2D | null = null;

/**
 * Returns the ideal width of an input element (in pixels) that based on its
 * value or placeholder using the {@link https://stackoverflow.com/a/68326447|measureText}
 * approach.
 *
 * @param target `HTMLInputElement` for which to get width.
 */
export function measureInputWidth(target: HTMLInputElement): number {
  if (canvas === null) {
    canvas = document.createElement("canvas");
  }

  if (context === null) {
    context = canvas.getContext("2d")!;
  }

  const text = target.value || target.placeholder;

  const elementStyle = window.getComputedStyle(target);

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
