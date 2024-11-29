// Attributes
export { getAttr, getAttrs } from "./attrs/getAttrs.ts";
export {
  hasAllAttrs,
  hasAttr,
  hasSomeAttrs,
  type AttrsSearch,
} from "./attrs/hasAttrs.ts";
export { removeAttr, removeAttrs } from "./attrs/removeAttrs.ts";
export { selectAttr, selectAttrs } from "./attrs/selectAttrs.ts";
export { setAttr, setAttrs } from "./attrs/setAttrs.ts";

// CSS
export {
  clsx,
  type ClassArray,
  type ClassDict,
  type ClassValue,
} from "./css/clsx.ts";
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
export {
  datasetOf,
  type AnyDatasetShape,
  type Dataset,
} from "./data/datasetOf.ts";
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
export { focusElem, type FocusOptions } from "./elems/focusElem.ts";
export {
  getInputValue,
  getInputValueRaw,
  type InputValueAsType,
  type InputValueTypeName,
} from "./elems/getInputValue.ts";
export { getInputWidth } from "./elems/getInputWidth.ts";
export { idMatches } from "./elems/idMatches.ts";
export { isElemChildOf } from "./elems/isElemChildOf.ts";
export { isElemInViewport } from "./elems/isElemInViewport.ts";
export { isElemOfType } from "./elems/isElemOfType.ts";
export { isElemSameOrChildOf } from "./elems/isElemSameOrChildOf.ts";
export { isElemScrollable } from "./elems/isElemScrollable.ts";
export { keepElemVisibleIn } from "./elems/keepElemVisibleIn.ts";
export { listToArray } from "./elems/listToArray.ts";
export { toElem } from "./elems/toElem.ts";

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
export type * from "./dom.ts";
export type {
  AttrName,
  Attrs,
  AttrsDefined,
  AttrValue,
  CssSelector,
  CssVarName,
  CssVars,
  CssVarValue,
  Data,
  DataAttrName,
  DataKey,
  DataPropertyName,
  DataValue,
  DOMPropertyFilter,
  DOMPropertyFilterValue,
  DOMPropertyKey,
  DOMPropertySearch,
  DOMPropertyValue,
  Elem,
  ElemOrCssSelector,
  FindOptions,
  KeysOf,
  OneOrManyOf,
  Primitive,
  StyleKey,
  Styles,
  StyleValue,
  WithNullValues,
  WithUndefinedValues,
} from "./types.ts";
export { InvalidCssVarError } from "./errors.ts";
export { InvalidElemError } from "./errors.ts";
export { InvalidAttrError } from "./errors.ts";
