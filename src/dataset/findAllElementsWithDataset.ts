import { buildDatasetSelector } from "./buildDatasetSelector.js";
import { findAllElements } from "../findAllElements.js";
import { isPrimitive } from "../typeAssertions.js";
import type { ElementOrSelectorInput } from "../types.js";

/**
 * Query the DOM for the element with the specified dataset name and optionally
 * value.
 */
export function findAllElementsWithDataset<T extends Element = HTMLElement>(
  datasetKey: string,
  datasetValue?: string | number | boolean,
): T[];
export function findAllElementsWithDataset<T extends Element = HTMLElement>(
  datasetKey: string,
  parent?: ElementOrSelectorInput,
): T[];
export function findAllElementsWithDataset<T extends Element = HTMLElement>(
  datasetKey: string,
  datasetValue?: string | number | boolean,
  parent?: ElementOrSelectorInput,
): T[];
export function findAllElementsWithDataset<T extends Element = HTMLElement>(
  datasetKey: string,
  datasetValueOrParent?: ElementOrSelectorInput | number | boolean | string,
  parent?: ElementOrSelectorInput,
): T[] {
  if (isPrimitive(datasetValueOrParent)) {
    const selector = buildDatasetSelector(datasetKey, datasetValueOrParent);

    return findAllElements(selector, parent);
  } else {
    const selector = buildDatasetSelector(datasetKey);

    return findAllElements(selector, datasetValueOrParent);
  }
}
