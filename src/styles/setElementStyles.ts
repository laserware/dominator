import { getValidElement } from "../getValidElement.ts";
import { InvalidElementError } from "../InvalidElementError.ts";
import type { ElementOrSelectorInput } from "../types.ts";

type CSSStyleProperty = Exclude<
  keyof CSSStyleDeclaration,
  | "length"
  | "parentRule"
  | "getPropertyPriority"
  | "getPropertyValue"
  | "item"
  | "removeProperty"
  | "setProperty"
>;

/**
 * Sets the style properties of the specified element to the specified values
 * where styles is an object with key of style property name and value of the
 * style property value.
 *
 * @param element Element, EventTarget, or selector for element.
 * @param styles Object with style property values keyed by name.
 */
export function setElementStyles(
  element: ElementOrSelectorInput,
  styles: Record<CSSStyleProperty, string>,
): void {
  const validElement = getValidElement(element);
  if (validElement === null) {
    throw new InvalidElementError("Unable to set styles");
  }

  for (const [key, value] of Object.entries(styles)) {
    const styleName = key as CSSStyleProperty;
    validElement.style[styleName] = value;
  }
}
