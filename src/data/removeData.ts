import { cast } from "@laserware/arcade";

import { removeAttr } from "../attrs/removeAttrs.ts";
import type { ElemOrCssSelector } from "../elems/types.ts";
import { asDataAttrName } from "../internal/dataKeys.ts";
import { elemOrThrow } from "../internal/elemOr.ts";
import { formatForError } from "../internal/formatForError.ts";

import type { DataKey, DataPropertyName } from "./types.ts";

/**
 * Removes the dataset entry with the specified `key` from the specified
 * `target`.
 *
 * @template E Element type of specified `target`.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param key Dataset property or attribute name for the dataset entry to remove.
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
 * removeDataEntry(elem, "data-label");
 * ```
 *
 * **Using Property Name (camelCase)**
 *
 * ```ts
 * const elem = findElem("#example")!;
 *
 * removeDataEntry(elem, "label");
 * ```
 *
 * **HTML (After)**
 *
 * ```html
 * <div
 *   id="example"
 *   data-is-active="false"
 *   data-count="30"
 * >
 *   ...
 * </div>
 * ```
 */
export function removeDataEntry<E extends Element = HTMLElement>(
  target: ElemOrCssSelector<E>,
  key: DataPropertyName,
): E {
  // prettier-ignore
  const elem = elemOrThrow(target, `Unable to remove data for ${key}`);

  removeSingleDataEntry(elem, key);

  return cast<E>(elem);
}

/**
 * Removes the specified dataset entries with the specified `keys` from the
 * specified `target`.
 *
 * @template E Element type of specified `target`.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param keys Array of dataset properties or attribute names to remove.
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
 * **Using Attribute Names (`data-*`)**
 *
 * ```ts
 * const elem = findElem("#example")!;
 *
 * removeData(elem, ["data-label", "data-count"]);
 * ```
 *
 * **Using Property Names (camelCase)**
 *
 * ```ts
 * const elem = findElem("#example")!;
 *
 * removeData(elem, ["label", "count"]);
 * ```
 *
 * **HTML (After)**
 *
 * ```html
 * <div
 *   id="example"
 *   data-is-active="false"
 * >
 *   ...
 * </div>
 * ```
 */
export function removeData<E extends Element = HTMLElement>(
  target: ElemOrCssSelector<E>,
  keys: DataKey[],
): E {
  // prettier-ignore
  const elem = elemOrThrow(target, `Unable to remove data for ${formatForError(keys)}`);

  for (const key of keys) {
    removeSingleDataEntry(elem, key);
  }

  return cast<E>(elem);
}

function removeSingleDataEntry(element: Element, key: string): void {
  const validAttrName = asDataAttrName(key);

  // We remove the _attribute_ rather than deleting the entry from the elements
  // dataset because deleting a dataset entry using `delete` won't work in
  // older versions of Safari:
  removeAttr(element, validAttrName);
}
