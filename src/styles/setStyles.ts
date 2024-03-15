import { toValidElem } from "../internal/toValidElem";
import { InvalidElementError } from "../InvalidElementError";
import type { ElemOrSelectInput } from "../types";

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
 * Sets the style properties of the specified input to the specified values
 * where styles is an object with key of style property name and value of the
 * style property value.
 *
 * @param input Element, Event, or selector for input.
 * @param styles Object with style property values keyed by name.
 */
export function setStyles(
  input: ElemOrSelectInput,
  styles: Record<CSSStyleProperty, string>,
): void {
  const elem = toValidElem(input);
  if (elem === null) {
    throw new InvalidElementError("Unable to set styles");
  }

  for (const [key, value] of Object.entries(styles)) {
    const styleName = key as CSSStyleProperty;
    elem.style[styleName] = value;
  }
}
