/**
 * This module provides functions for working with HTML and SVG elements.
 *
 * @module elements
 */
export { areElementsDifferent } from "./areElementsDifferent.ts";
export { areElementsSame } from "./areElementsSame.ts";
export { asElement } from "./asElement.ts";
export {
  createElement,
  Namespace,
  type CreateElementOptions,
  type ElementChild,
  type EventDescriptorFor,
  type EventFor,
  type EventListenerFor,
  type EventListenerObjectFor,
  type EventListenerOrDescriptorFor,
  type EventListenerOrEventListenerObjectFor,
  type EventListenersOrDescriptorsFor,
  type EventNameFor,
} from "./createElement.ts";
export { elementExists } from "./elementExists.ts";
export { findAllElements } from "./findAllElements.ts";
export { findAllFocusable } from "./findAllFocusable.ts";
export { findElement } from "./findElement.ts";
export { focusElement, type FocusOptions } from "./focusElement.ts";
export { getElementValue } from "./getElementValue.ts";
export { hasParentElement } from "./hasParentElement.ts";
export { getInputWidth } from "./getInputWidth.ts";
export { idMatches } from "./idMatches.ts";
export { InvalidElementError } from "./InvalidElementError.ts";
export { isElementChildOf } from "./isElementChildOf.ts";
export { isElementInViewport } from "./isElementInViewport.ts";
export { isElementType } from "./isElementType.ts";
export { isElementSameOrChildOf } from "./isElementSameOrChildOf.ts";
export { isElementScrollable } from "./isElementScrollable.ts";
export { isInputType } from "./isInputType.ts";
export { keepElementVisibleIn } from "./keepElementVisibleIn.ts";
export { listToArray } from "./listToArray.ts";
export { toElement } from "./toElement.ts";
export type {
  ElementLike,
  FindOptions,
  Target,
} from "./types.ts";
