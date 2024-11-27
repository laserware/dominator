import { cast } from "../internal/cast.ts";
import { elemOrThrow } from "../internal/elemOr.ts";
import { formatForError } from "../internal/formatForError.ts";
import type { ElemOrCssSelector, PropName } from "../types.ts";

/**
 * Removes the specified property `name` from the specified `target`.
 *
 * @template E Element type of specified `target`.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param name Name of the property to remove.
 *
 * @returns Element representation of the specified `target`.
 *
 * @throws {InvalidElemError} If the specified `target` wasn't found.
 */
export function removeProp<E extends HTMLElement = HTMLElement>(
  target: ElemOrCssSelector<E>,
  name: PropName<E> | string,
): E {
  const elem = elemOrThrow(target, `Unable to remove property ${name}`);

  removeSingleProp(elem, name);

  return cast<E>(elem);
}

/**
 * Removes the properties with `names` from specified `target`.
 *
 * @template E Element type of specified `target`.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param names Array of property names to remove.
 *
 * @returns Element representation of the specified `target`.
 *
 * @throws {InvalidElemError} If the specified `target` wasn't found.
 */
export function removeProps<E extends HTMLElement = HTMLElement>(
  target: ElemOrCssSelector<E>,
  names: (PropName<E> | string)[],
): E {
  // prettier-ignore
  const elem = elemOrThrow(target, `Unable to remove properties ${formatForError(names)}`);

  for (const name of names) {
    removeSingleProp(elem, name);
  }

  return cast<E>(elem);
}

function removeSingleProp<E extends HTMLElement>(
  element: HTMLElement,
  name: PropName<E> | string,
): void {
  if (isPropName(element, name)) {
    delete element[name];

    if (typeof element[name] === "string") {
      // @ts-ignore Complaining about read-only:
      element[name] = null;
    }
  }
}

function isPropName<E extends HTMLElement>(
  element: E,
  name: unknown,
): name is keyof E {
  // @ts-ignore
  return name in element;
}
