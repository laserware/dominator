import type { Elem } from "./types.ts";

/**
 * Returns true if the specified value is an {@linkcode Elem} instance.
 *
 * @internal
 */
export function isElem(value: unknown): value is Elem {
  return (
    value instanceof Document ||
    value instanceof Element ||
    value instanceof EventTarget ||
    value instanceof Element ||
    value instanceof HTMLElement ||
    value instanceof SVGElement ||
    value instanceof Node
  );
}
