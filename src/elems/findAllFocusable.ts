import { findAllElems } from "./findAllElems.ts";
import { toElem } from "./toElem.ts";
import type { ElemOrCssSelector } from "./types.ts";

const focusableElementsSelector = [
  "a",
  "button",
  "input",
  "textarea",
  "select",
  "details",
  `[tabindex]:not([tabindex="-1"])`,
  `[disabled]:not([disabled="true"])`,
].join(",");

/**
 * Searches for all focusable elements in either the `Document` (if no `parent`
 * specified) or the specified `parent`.
 *
 * See [this article](https://zellwk.com/blog/keyboard-focusable-elements/) for
 * how focusable elements are determined.
 *
 * @param [parent=document] Optional Element or EventTarget for parent.
 *
 * @returns Array of focusable elements in the optionally specified `parent`.
 *
 * @example
 * **HTML**
 *
 * ```html
 * <form action="" method="get" class="form-example">
 *   <div class="form-example">
 *     <label for="name">Enter your name: </label>
 *     <input type="text" name="name" id="name" required />
 *   </div>
 *   <div class="form-example">
 *     <label for="email">Enter your email: </label>
 *     <input type="email" name="email" id="email" required />
 *   </div>
 *   <div class="form-example">
 *     <input type="submit" value="Subscribe!" />
 *   </div>
 * </form>
 * ```
 *
 * **Code**
 *
 * ```ts
 * const items = findAllFocusable("form");
 * // [<input id="name">, <input id="email">, <input type="submit">]
 * ```
 */
export function findAllFocusable(
  parent: ElemOrCssSelector | null | undefined = document,
): HTMLElement[] {
  const parentElem = toElem(parent) ?? document;

  return findAllElems<HTMLElement>(focusableElementsSelector, parentElem);
}
