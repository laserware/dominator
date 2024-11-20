// Attributes
export { attrSelector } from "./attrs/attrSelector.ts";
export { getAttr, getAttrs } from "./attrs/getAttr.ts";
export { hasAllAttrs, hasAttr, hasSomeAttrs } from "./attrs/hasAttr.ts";
export { setAttr, setAttrs } from "./attrs/setAttr.ts";

// Dataset
export { dataSelector } from "./data/dataSelector.ts";
export { getData } from "./data/getData.ts";
export { hasData } from "./data/hasData.ts";
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
export { setStyle } from "./elem/setStyle.ts";
export { toElem } from "./elem/toElem.ts";

// Miscellaneous Extras
export { measureInputWidth } from "./extras/measureInputWidth.ts";
export { moveCursorToTextEnd } from "./extras/moveCursorToTextEnd.ts";
export { parseTransferData } from "./extras/parseTransferData.ts";

// CSS
export { CssVarError } from "./css/CssVarError.ts";
export { getCssVar } from "./css/getCssVar.ts";
export { setCssVar } from "./css/setCssVar.ts";

// Handy Utilities
export { clsx } from "./clsx.ts";
export { html } from "./htmlBuilder.ts";
export { listToArray } from "./listToArray.ts";

// Types
export type { AriaAttrs } from "./aria.ts";
export type { FindOptions } from "./internal/findOptions.ts";
export type {
  AnyElement,
  AnyElementTagName,
  AttrName,
  Attrs,
  AttrsDefined,
  AttrValue,
  CssSelector,
  Dataset,
  DatasetAttrName,
  DatasetKey,
  DatasetValue,
  Elem,
  ElementWithTagName,
  ElemOrCssSelector,
  HTMLElementTagName,
  SVGElementTagName,
} from "./types.ts";
