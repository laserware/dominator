// Attributes
export {
  attrSelector,
  attrsSelector,
  getAttr,
  getAttrs,
  hasAllAttrs,
  hasAttr,
  hasSomeAttrs,
  InvalidAttrError,
  removeAttr,
  removeAttrs,
  setAttr,
  setAttrs,
  type AttrsSearch,
} from "./attrs/index.ts";

// CSS
export {
  CssVarError,
  getCssVar,
  getCssVars,
  hasAllCssVars,
  hasCssVar,
  hasSomeCssVars,
  removeCssVar,
  removeCssVars,
  setCssVar,
  setCssVars,
  type CssVarsSearch,
} from "./css/index.ts";

// Dataset
export {
  getData,
  getDataValue,
  hasAllData,
  hasDataEntry,
  hasSomeData,
  removeData,
  removeDataEntry,
  setData,
  setDataValue,
  type DataSearch,
} from "./data/index.ts";

// Elements
export {
  areElemsDifferent,
  areElemsSame,
  asElem,
  elemExists,
  findAllElems,
  findAllFocusable,
  findElem,
  focusElem,
  getInputValue,
  getInputValueRaw,
  idMatches,
  InvalidElemError,
  isElemChildOf,
  isElemInViewport,
  isElemOfType,
  isElemSameOrChildOf,
  isElemScrollable,
  keepElemVisibleIn,
  toElem,
} from "./elem/index.ts";

// Miscellaneous Extras and Handy Utilities
export {
  clsx,
  getInputWidth,
  html,
  listToArray,
  type ClassArray,
  type ClassDict,
  type ClassValue,
  type ElementBuilder,
  type ElementBuilderChild,
} from "./extras/index.ts";

// Styles
export {
  getStyle,
  getStyles,
  hasAllStyles,
  hasSomeStyles,
  hasStyle,
  removeStyle,
  removeStyles,
  setStyle,
  setStyles,
  type StylesSearch,
} from "./styles/index.ts";

// Types
export type { AriaAttrs } from "./aria.ts";
export type { FindOptions } from "./internal/findOptions.ts";
export {
  AttrValue,
  CssSelector,
  CssVarName,
  DOMPropertyValue,
  Elem,
  Primitive,
  StyleValue,
  type AnyElement,
  type AnyElementTagName,
  type AttrName,
  type Attrs,
  type AttrsDefined,
  type CssVars,
  type CssVarValue,
  type Data,
  type DataAttrName,
  type DataKey,
  type DataPropertyName,
  type DataValue,
  type ElementWithTagName,
  type ElemOrCssSelector,
  type HTMLElementTagName,
  type StyleKey,
  type Styles,
  type SVGElementTagName,
} from "./types.ts";
