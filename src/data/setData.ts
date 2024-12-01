import { isNil } from "@laserware/arcade";

import type { AnyElement } from "../dom.ts";
import type { ElemOrCssSelector } from "../elems/types.ts";
import { cast } from "../internal/cast.ts";
import { asDataPropertyName } from "../internal/dataKeys.ts";
import { stringifyDOMValue } from "../internal/domValues.ts";
import { elemOrThrow } from "../internal/elemOr.ts";
import { formatForError } from "../internal/formatForError.ts";

import type { Data, DataKey, DataValue } from "./types.ts";

/**
 * Assigns the specified `value` to the specified dataset `key` in the specified
 * `target`.
 *
 * @template E Element type of specified `target`.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param key Key or property name for the dataset entry.
 * @param value Value to set for associated property or attribute name.
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
 *   data-is-active="false"
 *   data-count="30"
 *   data-label="Example"
 * >
 *   ...
 * </div>
 * ```
 *
 * **Using Attribute Name (`data-*`)**
 *
 * ```ts
 * const elem = findElem("#example")!;
 *
 * setDataEntry(elem, "data-is-active", true);
 * setDataEntry(elem, "data-count", 50);
 * setDataEntry(elem, "data-label", "Update");
 * ```
 *
 * **Using Property Name (camelCase)**
 *
 * ```ts
 * const elem = findElem("#example")!;
 *
 * setDataEntry(elem, "isActive", true);
 * setDataEntry(elem, "count", 50);
 * setDataEntry(elem, "label", "Update");
 * ```
 *
 * **HTML (After)**
 *
 * ```html
 * <div
 *   id="example"
 *   data-is-active="true"
 *   data-count="50"
 *   data-label="Update"
 * >
 *   ...
 * </div>
 * ```
 */
export function setDataEntry<E extends AnyElement = HTMLElement>(
  target: ElemOrCssSelector<E>,
  key: DataKey,
  value: DataValue | null,
): E {
  const elem = elemOrThrow(target, `Unable to set data for ${key}`);

  setSingleDataEntry(elem, key, value);

  return cast<E>(elem);
}

/**
 * Assigns the specified `data` key/value pairs to the specified `target`.
 *
 * @template E Element type of specified `target`.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param data Object with key of dataset key and value of entry value.
 *
 * @throws {@linkcode elems!InvalidElemError} if the specified `target` wasn't found.
 *
 * @example
 * **HTML (Before)**
 *
 * ```html
 * <div
 *   id="example"
 *   data-is-active="false"
 *   data-count="30"
 *   data-label="Example"
 * >
 *   ...
 * </div>
 * ```
 *
 * **Using Attribute Names (`data-*`)**
 *
 * ```ts
 * const elem = findElem("#example")!;
 *
 * setData(elem, {
 *   "data-is-active", true,
 *   "data-count": 50,
 *   "data-label": "Update",
 * });
 * ```
 *
 * **Using Property Names (camelCase)**
 *
 * ```ts
 * const elem = findElem("#example")!;
 *
 * setData(elem, {
 *   isActive, true,
 *   count: 50,
 *   label: "Update",
 * });
 * ```
 *
 * **HTML (After)**
 *
 * ```html
 * <div
 *   id="example"
 *   data-is-active="true"
 *   data-count="50"
 *   data-label="Update"
 * >
 *   ...
 * </div>
 * ```
 */
export function setData<E extends AnyElement = HTMLElement>(
  target: ElemOrCssSelector<E>,
  data: Data,
): E {
  // prettier-ignore
  const elem = elemOrThrow(target, `Unable to set data for keys ${formatForError(data)}`);

  for (const key of Object.keys(data)) {
    setSingleDataEntry(elem, key, data[key]);
  }

  return cast<E>(elem);
}

function setSingleDataEntry(
  elem: AnyElement,
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
