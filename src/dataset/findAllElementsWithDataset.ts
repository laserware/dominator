import { findAllElements } from "../findAllElements.ts";
import { isPrimitive } from "../typeGuards.ts";
import type { ElementOrSelectorInput } from "../types.ts";

import { buildDatasetSelector } from "./buildDatasetSelector.ts";

/**
 * Query the DOM for the element with the specified dataset name and optionally
 * value.
 */
export function findAllElementsWithDataset<T extends Element = HTMLElement>(
  keyOrAttributeName: string,
  value?: string | number | boolean,
): T[];
export function findAllElementsWithDataset<T extends Element = HTMLElement>(
  keyOrAttributeName: string,
  parent?: ElementOrSelectorInput,
): T[];
export function findAllElementsWithDataset<T extends Element = HTMLElement>(
  keyOrAttributeName: string,
  value?: string | number | boolean,
  parent?: ElementOrSelectorInput,
): T[];
export function findAllElementsWithDataset<T extends Element = HTMLElement>(
  keyOrAttributeName: string,
  valueOrParent?: ElementOrSelectorInput | number | boolean | string,
  parent?: ElementOrSelectorInput,
): T[] {
  if (isPrimitive(valueOrParent)) {
    const selector = buildDatasetSelector(keyOrAttributeName, valueOrParent);

    return findAllElements(selector, parent);
  } else {
    const selector = buildDatasetSelector(keyOrAttributeName);

    return findAllElements(selector, valueOrParent);
  }
}
