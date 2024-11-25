import { isNil } from "@laserware/arcade";

import { asElem } from "../elem/asElem.ts";
import { asDataPropertyName } from "../internal/dataKeys.ts";
import { stringifyDOMValue } from "../internal/domValues.ts";
import { elemOrThrow } from "../internal/elemOr.ts";
import { formatForError } from "../internal/formatForError.ts";
import type { Data, DataKey, DataValue, ElemOrCssSelector } from "../types.ts";

/**
 * Assigns the specified `value` to the specified dataset `key` in the specified
 * `target`. Returns the Element representation of the specified `target`.
 *
 * @template E Type of Element to return.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param key Key or attribute name for the dataset entry.
 * @param value Value to set for associated key or attribute name.
 *
 * @throws {InvalidElemError} If the specified `target` does not exist.
 */
export function setData<E extends Element = HTMLElement>(
  target: ElemOrCssSelector,
  key: DataKey,
  value: DataValue,
): E;

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
): E;

export function setData<E extends Element = HTMLElement>(
  target: ElemOrCssSelector,
  keyOrData: DataKey | Data,
  value?: DataValue,
): E {
  // prettier-ignore
  const elem = elemOrThrow(target, `Unable to set dataset value(s) for ${formatForError(keyOrData)}`)

  if (typeof keyOrData === "string") {
    setSingleDataEntry(elem, keyOrData, value);
  } else {
    for (const key of Object.keys(keyOrData)) {
      setSingleDataEntry(elem, key, keyOrData[key]);
    }
  }

  return asElem<E>(elem);
}

function setSingleDataEntry(
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
