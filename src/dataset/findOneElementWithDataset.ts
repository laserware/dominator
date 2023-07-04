import { buildDatasetSelector } from "./buildDatasetSelector.js";
import { findOneElement } from "../findOneElement.js";
import { isPrimitive } from "../typeAssertions.js";
import type { ElementInput } from "../types.js";

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
  parent?: ElementInput,
): T | null;
export function findOneElementWithDataset<T extends Element = HTMLElement>(
  datasetKey: string,
  datasetValue?: string | number | boolean,
  parent?: ElementInput,
): T | null;
export function findOneElementWithDataset<T extends Element = HTMLElement>(
  datasetKey: string,
  datasetValueOrParent?: ElementInput | number | boolean | string,
  parent?: ElementInput,
): T | null {
  if (isPrimitive(datasetValueOrParent)) {
    const selector = buildDatasetSelector(datasetKey, datasetValueOrParent);

    return findOneElement(selector, parent);
  }

  const selector = buildDatasetSelector(datasetKey);

  return findOneElement(selector, datasetValueOrParent);
}
