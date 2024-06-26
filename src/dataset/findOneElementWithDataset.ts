import { findOneElement } from "../findOneElement.ts";
import { isPrimitive } from "../typeGuards.ts";
import type { ElementOrSelectorInput } from "../types.ts";

import { buildDatasetSelector } from "./buildDatasetSelector.ts";

/**
 * Query the DOM for the element with the specified dataset name and optionally
 * value.
 */
export function findOneElementWithDataset<T extends Element = HTMLElement>(
  keyOrAttributeName: string,
  value?: string | number | boolean,
): T | null;
export function findOneElementWithDataset<T extends Element = HTMLElement>(
  keyOrAttributeName: string,
  parent?: ElementOrSelectorInput,
): T | null;
export function findOneElementWithDataset<T extends Element = HTMLElement>(
  keyOrAttributeName: string,
  value?: string | number | boolean,
  parent?: ElementOrSelectorInput,
): T | null;
export function findOneElementWithDataset<T extends Element = HTMLElement>(
  keyOrAttributeName: string,
  valueOrParent?: ElementOrSelectorInput | number | boolean | string,
  parent?: ElementOrSelectorInput,
): T | null {
  if (isPrimitive(valueOrParent)) {
    const selector = buildDatasetSelector(keyOrAttributeName, valueOrParent);

    return findOneElement(selector, parent);
  } else {
    const selector = buildDatasetSelector(keyOrAttributeName);

    return findOneElement(selector, valueOrParent);
  }
}
