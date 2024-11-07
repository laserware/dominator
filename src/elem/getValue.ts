import type { ElemOrCssSelector, NullOr } from "../types.ts";

import { toElem } from "./toElem.ts";

/**
 * Returns the value of the specified element.
 *
 * @param input Element, EventTarget, or selector for element.
 */
export function getValue<T>(input: NullOr<ElemOrCssSelector>): NullOr<T> {
  const elem = toElem<HTMLInputElement>(input);
  if (elem === null) {
    return null;
  }

  return (elem?.value ?? null) as unknown as T;
}
