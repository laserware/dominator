/**
 * This module provides functions for querying and manipulating
 * [attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes)
 * on HTML and SVG elements.
 *
 * @module attrs
 */
export { getAttr, getAttrs } from "./getAttrs.ts";
export {
  hasAllAttrs,
  hasAttr,
  hasSomeAttrs,
  type AttrsSearch,
} from "./hasAttrs.ts";
export { InvalidAttrError } from "./InvalidAttrError.ts";
export { removeAttr, removeAttrs } from "./removeAttrs.ts";
export { selectAttr, selectAttrs } from "./selectAttrs.ts";
export { setAttr, setAttrs } from "./setAttrs.ts";
export type {
  AttrName,
  AttrNameForElement,
  Attrs,
  AttrsDefined,
  AttrValue,
} from "./types.ts";
