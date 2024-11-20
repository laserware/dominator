import type { ElemOrCssSelector, NullOr } from "../types.ts";

import { toElem } from "./toElem.ts";

/**
 * Returns the value of the specified element.
 *
 * @param target Element, EventTarget, or selector for element.
 */
export function getValue<T>(target: NullOr<ElemOrCssSelector>): NullOr<T> {
  const elem = toElem<HTMLInputElement>(target);

  return (elem?.value ?? null) as unknown as T;
}
