import { toElementOrThrow } from "../internal/elemOr.ts";

import type { Target } from "./types.ts";

/**
 * Checks if the `target` has the ID *property* that matches `id`.
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
 * @throws {@linkcode InvalidElemError} if the specified `target` wasn't found.
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
export function idMatches(target: Target, id: string): boolean {
  const elem = toElementOrThrow(target, "Unable to check for ID match");

  // Clear the `#` in case the ID CSS selector is part of the string:
  const validId = id.replace("#", "");

  return elem.id === validId;
}
