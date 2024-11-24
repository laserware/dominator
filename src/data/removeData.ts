import { removeAttr } from "../attrs/removeAttrs.ts";
import { asElem } from "../elem/asElem.ts";
import { asDataAttrName } from "../internal/dataKeys.ts";
import { elemOrThrow } from "../internal/elemOrThrow.ts";
import { formatForError } from "../internal/formatForError.ts";
import type {
  DataKey,
  DataPropertyName,
  ElemOrCssSelector,
  OneOrManyOf,
} from "../types.ts";

/**
 * Removes the dataset entry with the specified `key` from the specified
 * `target`. Returns the Element representation of the specified `target`.
 *
 * @template E Type of Element to return.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param key Dataset property or attribute name for the dataset entry to remove.
 *
 * @throws {InvalidElemError} If the `target` specified does not exist.
 */
export function removeData<E extends Element = HTMLElement>(
  target: ElemOrCssSelector,
  key: DataPropertyName,
): E;

/**
 * Removes the specified dataset entries with the specified `keys` from the
 * specified `target`. Returns the Element representation of the specified
 * `target`.
 *
 * @template E Type of Element to return.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param keys Array of dataset properties or attribute names to remove.
 *
 * @throws {InvalidElemError} If the `target` specified does not exist.
 */
export function removeData<E extends Element = HTMLElement>(
  target: ElemOrCssSelector,
  keys: DataKey[],
): E;

export function removeData<E extends Element = HTMLElement>(
  target: ElemOrCssSelector,
  keyOrKeys: OneOrManyOf<DataKey>,
): E {
  // prettier-ignore
  const elem = elemOrThrow(target, `Unable to remove dataset for ${formatForError(keyOrKeys)}`);

  if (Array.isArray(keyOrKeys)) {
    for (const key of keyOrKeys) {
      removeSingleData(elem, key);
    }
  } else {
    removeSingleData(elem, keyOrKeys);
  }

  return asElem<E>(elem);
}

function removeSingleData(element: HTMLElement, key: string): void {
  const validAttrName = asDataAttrName(key);

  // We remove the _attribute_ rather than deleting the entry from the elements
  // dataset because deleting a dataset entry using `delete` won't work in
  // older versions of Safari:
  removeAttr(element, validAttrName);
}
