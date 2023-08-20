import { buildDatasetSelector } from "./buildDatasetSelector.js";
import { findOneElement } from "../findOneElement.js";
import { isPrimitive } from "../typeAssertions.js";
import type { ElementOrSelectorInput } from "../types.js";

/**
 * Query the DOM for the element with the specified dataset name and optionally
 * value.
 */
export function findOneElementWithDataset<T extends Element = HTMLElement>(
  datasetKey: string,
  datasetValue?: string | number | boolean,
): T | null;
export function findOneElementWithDataset<T extends Element = HTMLElement>(
  datasetKey: string,
  parent?: ElementOrSelectorInput,
): T | null;
export function findOneElementWithDataset<T extends Element = HTMLElement>(
  datasetKey: string,
  datasetValue?: string | number | boolean,
  parent?: ElementOrSelectorInput,
): T | null;
export function findOneElementWithDataset<T extends Element = HTMLElement>(
  datasetKey: string,
  datasetValueOrParent?: ElementOrSelectorInput | number | boolean | string,
  parent?: ElementOrSelectorInput,
): T | null {
  if (isPrimitive(datasetValueOrParent)) {
    const selector = buildDatasetSelector(datasetKey, datasetValueOrParent);

    return findOneElement(selector, parent);
  } else {
    const selector = buildDatasetSelector(datasetKey);

    return findOneElement(selector, datasetValueOrParent);
  }
}
