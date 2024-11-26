// Attributes
export { attrSelector, attrsSelector } from "./attr/attrsSelector.ts";
export { InvalidAttrError } from "./attr/InvalidAttrError.ts";
export { getAttr, getAttrs } from "./attr/getAttrs.ts";
export {
  hasAllAttrs,
  hasAttr,
  hasSomeAttrs,
  type AttrsSearch,
} from "./attr/hasAttrs.ts";
export { removeAttr, removeAttrs } from "./attr/removeAttrs.ts";
export { setAttr, setAttrs } from "./attr/setAttrs.ts";

// CSS
export { InvalidCssVarError } from "./css/InvalidCssVarError.ts";
export { getCssVar, getCssVars } from "./css/getCssVars.ts";
export {
  hasAllCssVars,
  hasCssVar,
  hasSomeCssVars,
  type CssVarsSearch,
} from "./css/hasCssVars.ts";
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
export { setData, setDataEntry } from "./data/setData.ts";

// Elements
export { areElemsDifferent } from "./elem/areElemsDifferent.ts";
export { areElemsSame } from "./elem/areElemsSame.ts";
export { asElem } from "./elem/asElem.ts";
export { elemExists } from "./elem/elemExists.ts";
export { findAllElems } from "./elem/findAllElems.ts";
export { findAllFocusable } from "./elem/findAllFocusable.ts";
export { findElem } from "./elem/findElem.ts";
export { focusElem } from "./elem/focusElem.ts";
export { getInputValue, getInputValueRaw } from "./elem/getInputValue.ts";
export { idMatches } from "./elem/idMatches.ts";
export { InvalidElemError } from "./elem/InvalidElemError.ts";
export { isElemChildOf } from "./elem/isElemChildOf.ts";
export { isElemInViewport } from "./elem/isElemInViewport.ts";
export { isElemOfType } from "./elem/isElemOfType.ts";
export { isElemSameOrChildOf } from "./elem/isElemSameOrChildOf.ts";
export { isElemScrollable } from "./elem/isElemScrollable.ts";
export { keepElemVisibleIn } from "./elem/keepElemVisibleIn.ts";
export { toElem } from "./elem/toElem.ts";

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
  type ElementBuilder,
  type ElementBuilderChild,
} from "./extras/htmlBuilder.ts";
export { listToArray } from "./extras/listToArray.ts";

// Styles
export { getStyle, getStyles } from "./style/getStyles.ts";
export {
  hasAllStyles,
  hasSomeStyles,
  hasStyle,
  type StylesSearch,
} from "./style/hasStyles.ts";
export { removeStyle, removeStyles } from "./style/removeStyles.ts";
export { setStyle, setStyles } from "./style/setStyles.ts";

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
