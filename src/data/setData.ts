import { cast, isNil } from "@laserware/arcade";

import type { ElementOf, TagName } from "../dom.ts";
import type { ElemOrCssSelector } from "../elems/types.ts";
import { asDataPropertyName } from "../internal/dataKeys.ts";
import { stringifyDOMValue } from "../internal/domValues.ts";
import { elemOrThrow } from "../internal/elemOr.ts";
import { formatForError } from "../internal/formatForError.ts";

import type { Data, DataKey, DataValue } from "./types.ts";

/**
 * Assigns the `value` to the dataset attribute/property name `key` in the `target`.
 *
 * @template TN Tag name of the Element representation of `target`.
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
export function setDataEntry<TN extends TagName = "*">(
  target: ElemOrCssSelector<TN>,
  key: DataKey,
  value: DataValue | null,
): ElementOf<TN> {
  const elem = elemOrThrow(target, `Unable to set data for ${key}`);

  setSingleDataEntry(elem, key, value);

  return cast<ElementOf<TN>>(elem);
}

/**
 * Assigns the `data` key/value pairs to the `target`.
 *
 * @template TN Tag name of the Element representation of `target`.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param data Object with keys of dataset attribute/property names and values
 *             of corresponding values.
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
export function setData<TN extends TagName = "*">(
  target: ElemOrCssSelector<TN>,
  data: Data,
): ElementOf<TN> {
  // prettier-ignore
  const elem = elemOrThrow(target, `Unable to set data for keys ${formatForError(data)}`);

  for (const key of Object.keys(data)) {
    setSingleDataEntry(elem, key, data[key]);
  }

  return cast<ElementOf<TN>>(elem);
}

function setSingleDataEntry(
  element: Element,
  key: DataKey,
  value?: DataValue | null | undefined,
): void {
  const validKey = asDataPropertyName(key);

  if (isNil(value)) {
    cast<HTMLElement>(element).dataset[validKey] = "";
  } else {
    cast<HTMLElement>(element).dataset[validKey] = stringifyDOMValue(value);
  }
}
