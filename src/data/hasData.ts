import { isNotNil } from "@laserware/arcade";

import { asDataPropertyName } from "../internal/asDataPropertyName.ts";
import { elemOrThrow } from "../internal/elemOrThrow.ts";
import type { DataKey, DataValue, ElemOrCssSelector } from "../types.ts";

/**
 * Returns true if the specified `target` has a dataset entry with the specified
 * `key` and optionally, the matching `value`.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param key Property (e.g. `someProperty`) or attribute name (e.g. `data-some-property`) for the dataset entry.
 * @param [value] Optional dataset value to check for.
 *
 * @throws {InvalidElemError} If the `target` specified does not exist.
 */
export function hasData(
  target: ElemOrCssSelector,
  key: DataKey,
  value?: DataValue,
): boolean {
  const elem = elemOrThrow(target, "Unable to determine if target has data");

  const validKey = asDataPropertyName(key);

  const datasetValue = elem.dataset?.[validKey];

  if (value === undefined) {
    return isNotNil(datasetValue);
  } else {
    return datasetValue === value;
  }
}
