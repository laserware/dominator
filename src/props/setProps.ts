import { isNil } from "@laserware/arcade";

import { cast } from "../internal/cast.ts";
import { elemOrThrow } from "../internal/elemOr.ts";
import { formatForError } from "../internal/formatForError.ts";
import type {
  ElemOrCssSelector,
  PropName,
  Props,
  PropValue,
} from "../types.ts";

/**
 * Sets the specified property `name` of the specified `target` to the specified
 * `value`.
 *
 * @template E Element type of specified `target`.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param name Name of the property to set.
 * @param value Value to set for the property.
 *
 * @returns Element representation of the specified `target`.
 *
 * @throws {InvalidElemError} If the specified `target` wasn't found.
 */
export function setProp<E extends HTMLElement = HTMLElement>(
  target: ElemOrCssSelector<E>,
  name: PropName<E>,
  value: PropValue<E> | null | undefined,
): E {
  const elem = elemOrThrow(target, `Unable to set property ${name}`);

  setSingleProp(elem, name, value);

  return cast<E>(elem);
}

/**
 * Sets the properties of the specified `target` to the specified `props`
 * object, where the key of the object is the property name and the value of
 * the object is the property value.
 *
 * @template E Element type of specified `target`.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param props Object with key of property name and value of property value.
 *
 * @returns Element representation of the specified `target`.
 *
 * @throws {InvalidElemError} If the specified `target` wasn't found.
 */
export function setProps<E extends HTMLElement = HTMLElement>(
  target: ElemOrCssSelector<E>,
  props: Props<E>,
): E {
  // prettier-ignore
  const elem = elemOrThrow(target, `Unable to set properties ${formatForError(props)}`);

  const names = cast<PropName<E>[]>(Object.keys(props));

  for (const name of names) {
    setSingleProp(elem, name, props[name]);
  }

  return cast<E>(elem);
}

function setSingleProp<E extends HTMLElement = HTMLElement>(
  element: E,
  name: string,
  value: PropValue<E> | null | undefined,
): void {
  const propName = cast<PropName<E>>(name);

  if (isNil(value)) {
    delete element[propName];
  } else {
    element[propName] = value;
  }
}
