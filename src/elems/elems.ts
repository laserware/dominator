/**
 * This module provides functions for working with HTML and SVG elements.
 *
 * The difference between a native [Element](https://developer.mozilla.org/en-US/docs/Web/API/Element) and an `Elem` is an `Element`
 * is the base class for [HTMLElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement) and [SVGElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement), whereas
 * an `Elem` could represent a [HTMLElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement), a [SVGElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement),
 * the [Document](https://developer.mozilla.org/en-US/docs/Web/API/Document), or the element representation of an [EventTarget](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget).
 * Essentially, it's an abstraction layer over _any_ type of element.
 *
 * @module elems
 */
export { areElemsDifferent } from "./areElemsDifferent.ts";
export { areElemsSame } from "./areElemsSame.ts";
export { asElem } from "./asElem.ts";
export {
  createElem,
  type CreateElemOptions,
  type ElemChild,
  type ElemProperties,
  type EventDescriptor,
  type EventHandlerName,
  type ListenerOrDescriptor,
  type ListenersOrDescriptors,
} from "./createElem.ts";
export { elemExists } from "./elemExists.ts";
export { findAllElems } from "./findAllElems.ts";
export { findAllFocusable } from "./findAllFocusable.ts";
export { findElem } from "./findElem.ts";
export { focusElem, type FocusOptions } from "./focusElem.ts";
export {
  getInputValue,
  getInputValueRaw,
  type InputValueAsType,
  type InputValueTypeName,
} from "./getInputValue.ts";
export { getInputWidth } from "./getInputWidth.ts";
export { idMatches } from "./idMatches.ts";
export { InvalidElemError } from "./InvalidElemError.ts";
export { isElemChildOf } from "./isElemChildOf.ts";
export { isElemInViewport } from "./isElemInViewport.ts";
export { isElemOfType } from "./isElemOfType.ts";
export { isElemSameOrChildOf } from "./isElemSameOrChildOf.ts";
export { isElemScrollable } from "./isElemScrollable.ts";
export { keepElemVisibleIn } from "./keepElemVisibleIn.ts";
export { listToArray } from "./listToArray.ts";
export { toElem } from "./toElem.ts";
