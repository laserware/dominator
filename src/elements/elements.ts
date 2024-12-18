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
  type CreateElementOptions,
  type ElementChild,
  type EventDescriptorFor,
  type EventListenerOrDescriptorFor,
  type EventListenersOrDescriptorsFor,
} from "./createElement.ts";
export { elementExists } from "./elementExists.ts";
export { findAllElements } from "./findAllElements.ts";
export { findAllFocusable } from "./findAllFocusable.ts";
export { findElement } from "./findElement.ts";
export { focusElement, type FocusOptions } from "./focusElement.ts";
export {
  getElementValue,
  getElementValueRaw,
  type ElementValueAsType,
  type ElementValueTypeName,
} from "./getElementValue.ts";
export { getInputWidth } from "./getInputWidth.ts";
export { idMatches } from "./idMatches.ts";
export { InvalidElementError } from "./InvalidElementError.ts";
export { isElementChildOf } from "./isElementChildOf.ts";
export { isElementInViewport } from "./isElementInViewport.ts";
export { isElementOfType } from "./isElementOfType.ts";
export { isElementSameOrChildOf } from "./isElementSameOrChildOf.ts";
export { isElementScrollable } from "./isElementScrollable.ts";
export { keepElementVisibleIn } from "./keepElementVisibleIn.ts";
export { listToArray } from "./listToArray.ts";
export { toElement } from "./toElement.ts";
export type {
  ElementLike,
  ElementPropertiesOf,
  EventFor,
  EventListenerFor,
  EventListenerObjectFor,
  EventListenerOrEventListenerObjectFor,
  EventNameFor,
  FindOptions,
  NonMethodElementProperties,
  Target,
} from "./types.ts";
