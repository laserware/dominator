/**
 * This module provides functions for querying and manipulating
 * [attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes)
 * on HTML and SVG elements.
 *
 * @module attributes
 */
export { getAttribute, getAttributes } from "./getAttributes.ts";
export {
  type AttributesSearch,
  hasAllAttributes,
  hasAttribute,
  hasSomeAttributes,
} from "./hasAttributes.ts";
export { InvalidAttributeError } from "./InvalidAttributeError.ts";
export { removeAttribute, removeAttributes } from "./removeAttributes.ts";
export { selectAttribute, selectAttributes } from "./selectAttributes.ts";
export { setAttribute, setAttributes } from "./setAttributes.ts";
export type {
  AttributeName,
  AttributeNameForElement,
  Attributes,
  AttributesDefined,
  AttributeValue,
} from "./types.ts";
