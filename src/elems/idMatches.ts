import { elemOrThrow } from "../internal/elemOr.ts";
import type { ElemOrCssSelector } from "../types.ts";

/**
 * Checks if the specified `target` has the specified `id` *property*.
 *
 * Note that you can pass an ID string or CSS selector (e.g. `#some-id`).
 * If your ID starts with `#` and is *not* a CSS selector, ensure there are
 * two `#` prefixes instead of one.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param id ID to check for element.
 *
 * @returns `true` if the `target` has the specified `id`.
 *
 * @throws {@linkcode InvalidElemError} If the specified `target` wasn't found.
 *
 * @example
 * **HTML**
 *
 * ```html
 * <div class="example" id="no-hash">Example</div>
 * <div class="example" id="#hash">Example</div>
 * ```
 *
 * **Code**
 *
 * ```ts
 * const [noHash, hasHash] = findAllElems(".example");
 *
 * idMatches(noHash, "no-hash");
 * // true
 *
 * idMatches(hasHash, "#hash");
 * // false
 *
 * idMatches(hasHash, "##hash");
 * // true
 * ```
 */
export function idMatches(target: ElemOrCssSelector, id: string): boolean {
  const elem = elemOrThrow(target, "Unable to check for ID match");

  // Clear the `#` in case the ID CSS selector is part of the string:
  const validId = id.replace("#", "");

  return elem.id === validId;
}
