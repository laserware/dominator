import { isNil } from "@laserware/arcade";

import { cast } from "../internal/cast.ts";
import { asDataPropertyName } from "../internal/dataKeys.ts";
import { stringifyDOMValue } from "../internal/domValues.ts";
import { elemOrThrow } from "../internal/elemOr.ts";
import { formatForError } from "../internal/formatForError.ts";
import type { Data, DataKey, DataValue, ElemOrCssSelector } from "../types.ts";

/**
 * Assigns the specified `value` to the specified dataset `key` in the specified
 * `target`.
 *
 * @template E Type of Element to return.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param key Key or property name for the dataset entry.
 * @param value Value to set for associated property or attribute name.
 *
 * @returns The Element representation of the specified `target`.
 *
 * @throws {InvalidElemError} If the specified `target` does not exist.
 */
export function setDataValue<E extends Element = HTMLElement>(
  target: ElemOrCssSelector,
  key: DataKey,
  value: DataValue,
): E {
  const elem = elemOrThrow(target, `Unable to set data for ${key}`);

  setSingleDataValue(elem, key, value);

  return cast<E>(elem);
}

/**
 * Assigns the specified `data` key/value pairs to the specified `target`.
 * Returns the Element representation of the specified `target`.
 *
 * @template E Type of Element to return.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param data Object with key of dataset key and value of entry value.
 *
 * @throws {InvalidElemError} If the specified `target` does not exist.
 */
export function setData<E extends Element = HTMLElement>(
  target: ElemOrCssSelector,
  data: Data,
): E {
  // prettier-ignore
  const elem = elemOrThrow(target, `Unable to set data for keys ${formatForError(data)}`);

  for (const key of Object.keys(data)) {
    setSingleDataValue(elem, key, data[key]);
  }

  return cast<E>(elem);
}

function setSingleDataValue(
  elem: HTMLElement,
  key: DataKey,
  value?: DataValue | null | undefined,
): void {
  const validKey = asDataPropertyName(key);

  if (isNil(value)) {
    elem.dataset[validKey] = "";
  } else {
    elem.dataset[validKey] = stringifyDOMValue(value);
  }
}
