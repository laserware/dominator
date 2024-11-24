// Attributes
export { attrSelector, attrsSelector } from "./attrs/attrsSelector.ts";
export { getAttr, getAttrs } from "./attrs/getAttrs.ts";
export { hasAllAttrs, hasAttr, hasSomeAttrs } from "./attrs/hasAttrs.ts";
export { InvalidAttrError } from "./attrs/InvalidAttrError.ts";
export { removeAttr, removeAttrs } from "./attrs/removeAttrs.ts";
export { setAttr, setAttrs } from "./attrs/setAttrs.ts";

// CSS
export { CssVarError } from "./css/CssVarError.ts";
export { getCssVar } from "./css/getCssVars.ts";
export { setCssVar, setCssVars } from "./css/setCssVars.ts";

// Dataset
export { dataSelector } from "./data/dataSelector.ts";
export { getData } from "./data/getData.ts";
export { hasData } from "./data/hasData.ts";
export { removeData } from "./data/removeData.ts";
export { setData } from "./data/setData.ts";

// Elements
export { areElemsDifferent } from "./elem/areElemsDifferent.ts";
export { areElemsSame } from "./elem/areElemsSame.ts";
export { asElem } from "./elem/asElem.ts";
export { elemExists } from "./elem/elemExists.ts";
export { findAllElems } from "./elem/findAllElems.ts";
export { findAllFocusable } from "./elem/findAllFocusable.ts";
export { findElem } from "./elem/findElem.ts";
export { focusElem } from "./elem/focusElem.ts";
export { getElemValue, getElemValueAs } from "./elem/getElemValue.ts";
export { idMatches } from "./elem/idMatches.ts";
export { InvalidElemError } from "./elem/InvalidElemError.ts";
export { isElemChildOf } from "./elem/isElemChildOf.ts";
export { isElemInViewport } from "./elem/isElemInViewport.ts";
export { isElemOfType } from "./elem/isElemOfType.ts";
export { isElemSameOrChildOf } from "./elem/isElemSameOrChildOf.ts";
export { isElemScrollable } from "./elem/isElemScrollable.ts";
export { keepElemVisibleIn } from "./elem/keepElemVisibleIn.ts";
export { setStyles } from "./styles/setStyles.ts";
export { toElem } from "./elem/toElem.ts";

// Miscellaneous Extras and Handy Utilities
export {
  clsx,
  type ClassArray,
  type ClassDict,
  type ClassValue,
} from "./extras/clsx.ts";
export { getInputWidth } from "./extras/getInputWidth.ts";
export { html, type ElementBuilder } from "./extras/htmlBuilder.ts";
export { listToArray } from "./extras/listToArray.ts";

// Types
export type { AriaAttrs } from "./aria.ts";
export type { FindOptions } from "./internal/findOptions.ts";
export {
  AttrValue,
  CssSelector,
  CssVarName,
  Elem,
  Primitive,
  Stringifiable,
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
