/**
 * This module provides functions for querying and manipulating the
 * [dataset](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset) entries
 * on HTML and SVG elements.
 *
 * @module dataset
 */
export {
  wrapDataset,
  type AnyDatasetShape,
  type DatasetWrapper,
} from "./wrapDataset.ts";
export { getDatasetEntries, getDatasetValue } from "./getDataset.ts";
export {
  hasAllDatasetEntries,
  hasDatasetEntry,
  hasSomeDatasetEntries,
  type DatasetSearch,
} from "./hasDataset.ts";
export { removeDatasetEntries, removeDatasetEntry } from "./removeDataset.ts";
export { selectDatasetEntries, selectDatasetEntry } from "./selectDataset.ts";
export { setDatasetEntries, setDatasetEntry } from "./setDataset.ts";
export type {
  Dataset,
  DatasetAttributeName,
  DatasetKey,
  DatasetPropertyName,
  DatasetValue,
} from "./types.ts";
