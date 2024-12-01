/**
 * This module provides functions for querying and manipulating the
 * [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style)
 * property on HTML and SVG elements.
 *
 * @module styles
 */
export { getStyle, getStyles } from "./getStyles.ts";
export {
  hasAllStyles,
  hasSomeStyles,
  hasStyle,
  type StylesSearch,
} from "./hasStyles.ts";
export { removeStyle, removeStyles } from "./removeStyles.ts";
export { setStyle, setStyles } from "./setStyles.ts";
export type { StyleKey, Styles, StyleValue } from "./types.ts";
