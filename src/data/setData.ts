import { cast, isNil } from "@laserware/arcade";

import type { ElementOf, TagName } from "../dom.ts";
import { toElementOrThrow } from "../elements/toElement.ts";
import type { Target } from "../elements/types.ts";
import { asDataPropertyName } from "../internal/dataKeys.ts";
import { stringifyDOMValue } from "../internal/domValues.ts";
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
 * @throws {@linkcode elements!InvalidElementError} if the specified `target` wasn't found.
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
 * const element = findElement("#example")!;
 *
 * setDataEntry(element, "data-is-active", true);
 * setDataEntry(element, "data-count", 50);
 * setDataEntry(element, "data-label", "Update");
 * ```
 *
 * **Using Property Name (camelCase)**
 *
 * ```ts
 * const element = findElement("#example")!;
 *
 * setDataEntry(element, "isActive", true);
 * setDataEntry(element, "count", 50);
 * setDataEntry(element, "label", "Update");
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
  target: Target<TN>,
  key: DataKey,
  value: DataValue | null,
): ElementOf<TN> {
  const element = toElementOrThrow(target, `Unable to set data for ${key}`);

  setSingleDataEntry(element, key, value);

  return cast<ElementOf<TN>>(element);
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
 * @throws {@linkcode elements!InvalidElementError} if the specified `target` wasn't found.
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
 * const element = findElement("#example")!;
 *
 * setData(element, {
 *   "data-is-active", true,
 *   "data-count": 50,
 *   "data-label": "Update",
 * });
 * ```
 *
 * **Using Property Names (camelCase)**
 *
 * ```ts
 * const element = findElement("#example")!;
 *
 * setData(element, {
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
  target: Target<TN>,
  data: Data,
): ElementOf<TN> {
  // prettier-ignore
  const element = toElementOrThrow(target, `Unable to set data for keys ${formatForError(data)}`);

  for (const key of Object.keys(data)) {
    setSingleDataEntry(element, key, data[key]);
  }

  return cast<ElementOf<TN>>(element);
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
