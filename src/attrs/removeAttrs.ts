import { cast } from "@laserware/arcade";

import type { ElementOf, TagName } from "../dom.ts";
import type { ElemOrCssSelector } from "../elems/types.ts";
import { elemOrThrow } from "../internal/elemOr.ts";
import { formatForError } from "../internal/formatForError.ts";

import type { AttrName } from "./types.ts";

/**
 * Removes the attribute `name` from the `target`.
 *
 * @template TN Tag name of the Element representation of `target`.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param name Name of the attribute to remove.
 *
 * @returns Element representation of the specified `target`.
 *
 * @throws {@linkcode elems!InvalidElemError} if the specified `target` wasn't found.
 *
 * @example
 * **HTML (Before)**
 *
 * ```html
 * <button id="example" aria-disabled="true">
 *   Example
 * </button>
 * ```
 *
 * **Code**
 *
 * ```ts
 * const elem = findElem("#example")!;
 *
 * removeAttr(elem, "aria-disabled");
 * ```
 *
 * **HTML (After)**
 *
 * ```html
 * <button id="example">
 *   Example
 * </button>
 * ```
 */
export function removeAttr<TN extends TagName = "*">(
  target: ElemOrCssSelector<TN>,
  name: AttrName<TN>,
): ElementOf<TN> {
  const elem = elemOrThrow(target, `Unable to remove attribute ${name}`);

  elem.removeAttribute(name);

  return cast<ElementOf<TN>>(elem);
}

/**
 * Removes the attributes with `names` from the `target`.
 *
 * @template TN Tag name of the Element representation of `target`.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param names Array of attribute names to remove.
 *
 * @returns Element representation of the specified `target`.
 *
 * @throws {@linkcode elems!InvalidElemError} if the specified `target` wasn't found.
 *
 * @example
 * **HTML (Before)**
 *
 * ```html
 * <div
 *   id="example"
 *   role="slider"
 *   aria-valuemax="30"
 *   aria-label="Example"
 *   aria-disabled="false"
 * >
 *   ...
 * </div>
 * ```
 *
 * **Code**
 *
 * ```ts
 * const elem = findElem("#example")!;
 *
 * removeAttrs(elem, [
 *   "role",
 *   "aria-valuemax",
 *   "aria-disabled",
 * ]);
 * ```
 *
 * **HTML (After)**
 *
 * ```html
 * <div
 *   id="example"
 *   aria-label="Example"
 * >
 *   ...
 * </div>
 * ```
 */
export function removeAttrs<TN extends TagName = "*">(
  target: ElemOrCssSelector<TN>,
  names: AttrName<TN>[],
): ElementOf<TN> {
  // prettier-ignore
  const elem = elemOrThrow(target, `Unable to remove attributes ${formatForError(names)}`);

  for (const name of names) {
    elem.removeAttribute(name);
  }

  return cast<ElementOf<TN>>(elem);
}
