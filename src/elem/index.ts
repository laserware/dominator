import { areDifferent } from "./areDifferent.ts";
import { areSame } from "./areSame.ts";
import { exists } from "./exists.ts";
import { findAll } from "./findAll.ts";
import { findAllFocusable } from "./findAllFocusable.ts";
import { findOne } from "./findOne.ts";
import { getValue } from "./getValue.ts";
import { hasId } from "./hasId.ts";
import { hasParent } from "./hasParent.ts";
import { isInViewport } from "./isInViewport.ts";
import { isOfType } from "./isOfType.ts";
import { isSameOrChildOf } from "./isSameOrChildOf.ts";
import { isScrollable } from "./isScrollable.ts";
import { keepVisibleInParent } from "./keepVisibleInParent.ts";
import { setFocusTo } from "./setFocusTo.ts";
import { toElem } from "./toElem.ts";

export { areDifferent } from "./areDifferent.ts";
export { areSame } from "./areSame.ts";
export { exists as elemExists } from "./exists.ts";
export { findAll } from "./findAll.ts";
export { findAllFocusable } from "./findAllFocusable.ts";
export { findOne } from "./findOne.ts";
export { getValue } from "./getValue.ts";
export { hasId } from "./hasId.ts";
export { hasParent } from "./hasParent.ts";
export { InvalidElemError } from "./InvalidElemError.ts";
export { isInViewport } from "./isInViewport.ts";
export { isOfType } from "./isOfType.ts";
export { isSameOrChildOf } from "./isSameOrChildOf.ts";
export { isScrollable } from "./isScrollable.ts";
export { keepVisibleInParent } from "./keepVisibleInParent.ts";
export { setFocusTo } from "./setFocusTo.ts";
export { toElem } from "./toElem.ts";

export const elems = {
  areDifferent,
  areSame,
  exists,
  findAll,
  findAllFocusable,
  findOne,
  getValue,
  hasId,
  hasParent,
  inViewport: isInViewport,
  isOfType,
  isSameOrChildOf,
  isScrollable,
  keepVisibleInParent,
  setFocusTo,
  toElem,
};
