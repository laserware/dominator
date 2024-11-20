import { isNil } from "@laserware/arcade";

import { InvalidElemError } from "../elem/InvalidElemError.ts";
import { toElem } from "../elem/toElem.ts";
import { validDataKey } from "../internal/validDataKey.ts";
import type {
  Dataset,
  DatasetAttrName,
  DatasetKey,
  DatasetValue,
  ElemOrCssSelector,
  NilOr,
} from "../types.ts";

/**
 * Assigns the specified `value` to the specified dataset `key` in the specified
 * `target`. Returns the `Element` representation of the specified `target`.
 *
 * @template E Type of `Element` to return.
 *
 * @param target `Element`, `EventTarget`, or CSS selector.
 * @param key Key or attribute name for the dataset entry.
 * @param value Value to set for associated key or attribute name.
 */
export function setData<E extends Element = HTMLElement>(
  target: ElemOrCssSelector,
  key: DatasetKey,
  value: DatasetValue,
): E;

/**
 * Assigns the specified `dataset` key/value pairs to the specified `target`.
 * Returns the `Element` representation of the specified `target`.
 *
 * @template E Type of `Element` to return.
 *
 * @param target `Element`, `EventTarget`, or CSS selector.
 * @param dataset Object with key of dataset key and value of entry value.
 */
export function setData<E extends Element = HTMLElement>(
  target: ElemOrCssSelector,
  dataset: Dataset,
): E;

export function setData<E extends Element = HTMLElement>(
  target: ElemOrCssSelector,
  keyOrDataset: DatasetKey | DatasetAttrName | Dataset,
  value?: DatasetValue,
): E {
  const elem = toElem<HTMLElement>(target);
  if (elem === null) {
    // prettier-ignore
    throw new InvalidElemError("Unable to set dataset value");
  }

  if (typeof keyOrDataset === "string") {
    setSingleElemData(elem, keyOrDataset, value);
  } else {
    const entries = Object.entries(keyOrDataset);

    for (const [name, value] of entries) {
      setSingleElemData(elem, name, value);
    }
  }

  return elem as unknown as E;
}

function setSingleElemData(
  elem: HTMLElement,
  key: DatasetKey | DatasetAttrName,
  value?: NilOr<DatasetValue>,
): void {
  const validKey = validDataKey(key);

  if (isNil(value)) {
    elem.dataset[validKey] = "";
  } else {
    elem.dataset[validKey] = value.toString();
  }
}
