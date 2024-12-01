import type { AnyElement } from "../dom.ts";
import type { ElemOrCssSelector } from "../elems/types.ts";
import { cast } from "../internal/cast.ts";
import { elemOrThrow } from "../internal/elemOr.ts";
import { formatForError } from "../internal/formatForError.ts";

import type { AttrName } from "./types.ts";

/**
 * Removes the specified attribute `name` from the specified `target`.
 *
 * @template E Element type of specified `target`.
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
 * <button id="example" aria-disabled="true">Example</button>
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
 * <button id="example">Example</button>
 * ```
 */
export function removeAttr<E extends AnyElement = HTMLElement>(
  target: ElemOrCssSelector<E>,
  name: AttrName<E>,
): E {
  const elem = elemOrThrow(target, `Unable to remove attribute ${name}`);

  elem.removeAttribute(name);

  return cast<E>(elem);
}

/**
 * Removes the attributes with specified `names` from specified `target`.
 *
 * @template E Element type of specified `target`.
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
 * >...</div>
 * ```
 *
 * **Code**
 *
 * ```ts
 * const elem = findElem("#example")!;
 *
 * removeAttrs(elem, ["role", "aria-valuemax", "aria-disabled"]);
 * ```
 *
 * **HTML (After)**
 *
 * ```html
 * <div
 *   id="example"
 *   aria-label="Example"
 * >...</div>
 * ```
 */
export function removeAttrs<E extends AnyElement = HTMLElement>(
  target: ElemOrCssSelector<E>,
  names: AttrName<E>[],
): E {
  // prettier-ignore
  const elem = elemOrThrow(target, `Unable to remove attributes ${formatForError(names)}`);

  for (const name of names) {
    elem.removeAttribute(name);
  }

  return cast<E>(elem);
}
