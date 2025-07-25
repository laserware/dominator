import { cast } from "@laserware/arcade";

import { toElementOrThrow } from "../elements/toElement.ts";
import type { Target } from "../elements/types.ts";
import { formatForError } from "../internal/formatForError.ts";

import type { AttributeName } from "./types.ts";

/**
 * Removes the attribute `name` from the `target`.
 *
 * @template E Element representation of `target`.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param name Name of the attribute to remove.
 *
 * @returns Element representation of the specified `target`.
 *
 * @throws {@linkcode elements!InvalidElementError} if the specified `target` wasn't found.
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
 * let element = findElement("#example")!;
 *
 * element = removeAttribute(element, "aria-disabled");
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
export function removeAttribute<E extends Element = HTMLElement>(
  target: Target | null,
  name: AttributeName<E>,
): E {
  const element = toElementOrThrow(target, `Cannot remove attribute ${name}`);

  element.removeAttribute(name);

  return cast<E>(element);
}

/**
 * Removes the attributes with `names` from the `target`.
 *
 * @template E Element representation of `target`.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param names Array of attribute names to remove.
 *
 * @returns Element representation of the specified `target`.
 *
 * @throws {@linkcode elements!InvalidElementError} if the specified `target` wasn't found.
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
 * const element = findElement("#example")!;
 *
 * removeAttributes(element, [
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
export function removeAttributes<E extends Element = HTMLElement>(
  target: Target | null,
  names: AttributeName<E>[],
): E {
  // biome-ignore format: Ignore
  const element = toElementOrThrow(target, `Cannot remove attributes ${formatForError(names)}`);

  for (const name of names) {
    element.removeAttribute(name);
  }

  return cast<E>(element);
}
