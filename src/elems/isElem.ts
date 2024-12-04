import type { ElementLike } from "./types.ts";

/**
 * Returns true if the `value` is an {@linkcode ElementLike} instance.
 *
 * @internal
 */
export function isElem(value: unknown): value is ElementLike {
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
