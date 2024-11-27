// Attributes
export { getAttr, getAttrs } from "./attrs/getAttrs.ts";
export {
  hasAllAttrs,
  hasAttr,
  hasSomeAttrs,
  type AttrsSearch,
} from "./attrs/hasAttrs.ts";
export { InvalidAttrError } from "./attrs/InvalidAttrError.ts";
export { removeAttr, removeAttrs } from "./attrs/removeAttrs.ts";
export { selectAttr, selectAttrs } from "./attrs/selectAttrs.ts";
export { setAttr, setAttrs } from "./attrs/setAttrs.ts";

// CSS
export { getCssVar, getCssVars } from "./css/getCssVars.ts";
export {
  hasAllCssVars,
  hasCssVar,
  hasSomeCssVars,
  type CssVarsSearch,
} from "./css/hasCssVars.ts";
export { InvalidCssVarError } from "./css/InvalidCssVarError.ts";
export { removeCssVar, removeCssVars } from "./css/removeCssVars.ts";
export { setCssVar, setCssVars } from "./css/setCssVars.ts";

// Dataset
export { getData, getDataValue } from "./data/getData.ts";
export {
  hasAllData,
  hasDataEntry,
  hasSomeData,
  type DataSearch,
} from "./data/hasData.ts";
export { removeData, removeDataEntry } from "./data/removeData.ts";
export { selectData, selectDataEntry } from "./data/selectData.ts";
export { setData, setDataEntry } from "./data/setData.ts";

// Elements
export { areElemsDifferent } from "./elems/areElemsDifferent.ts";
export { areElemsSame } from "./elems/areElemsSame.ts";
export { asElem } from "./elems/asElem.ts";
export { elemExists } from "./elems/elemExists.ts";
export { findAllElems } from "./elems/findAllElems.ts";
export { findAllFocusable } from "./elems/findAllFocusable.ts";
export { findElem } from "./elems/findElem.ts";
export { focusElem } from "./elems/focusElem.ts";
export { getInputValue, getInputValueRaw } from "./elems/getInputValue.ts";
export { idMatches } from "./elems/idMatches.ts";
export { InvalidElemError } from "./elems/InvalidElemError.ts";
export { isElemChildOf } from "./elems/isElemChildOf.ts";
export { isElemInViewport } from "./elems/isElemInViewport.ts";
export { isElemOfType } from "./elems/isElemOfType.ts";
export { isElemSameOrChildOf } from "./elems/isElemSameOrChildOf.ts";
export { isElemScrollable } from "./elems/isElemScrollable.ts";
export { keepElemVisibleIn } from "./elems/keepElemVisibleIn.ts";
export { toElem } from "./elems/toElem.ts";

// Miscellaneous Extras and Handy Utilities
export {
  clsx,
  type ClassArray,
  type ClassDict,
  type ClassValue,
} from "./extras/clsx.ts";
export { getInputWidth } from "./extras/getInputWidth.ts";
export {
  html,
  type ElemBuilder,
  type ElemBuilderChild,
} from "./extras/htmlBuilder.ts";
export { listToArray } from "./extras/listToArray.ts";

// Styles
export { getStyle, getStyles } from "./styles/getStyles.ts";
export {
  hasAllStyles,
  hasSomeStyles,
  hasStyle,
  type StylesSearch,
} from "./styles/hasStyles.ts";
export { removeStyle, removeStyles } from "./styles/removeStyles.ts";
export { setStyle, setStyles } from "./styles/setStyles.ts";

// Types
export type {
  AriaAttributes,
  HTMLElementAttributes,
  HTMLElements,
} from "./dom.ts";
export type { FindOptions } from "./internal/findOptions.ts";
export {
  AttrValue,
  CssSelector,
  CssVarName,
  DOMPropertyValue,
  Elem,
  Primitive,
  StyleValue,
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
  type DOMPropertyFilter,
  type DOMPropertyFilterValue,
  type DOMPropertyKey,
  type DOMPropertySearch,
  type ElemOrCssSelector,
  type StyleKey,
  type Styles,
  type TagName,
} from "./types.ts";
