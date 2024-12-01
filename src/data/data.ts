/**
 * This module provides functions for querying and manipulating the
 * [dataset](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset) entries
 * on HTML and SVG elements.
 *
 * @module data
 */
export { datasetOf, type AnyDatasetShape, type Dataset } from "./datasetOf.ts";
export { getData, getDataValue } from "./getData.ts";
export {
  hasAllData,
  hasDataEntry,
  hasSomeData,
  type DataSearch,
} from "./hasData.ts";
export { removeData, removeDataEntry } from "./removeData.ts";
export { selectData, selectDataEntry } from "./selectData.ts";
export { setData, setDataEntry } from "./setData.ts";
export type {
  Data,
  DataAttrName,
  DataKey,
  DataPropertyName,
  DataValue,
} from "./types.ts";
