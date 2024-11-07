import { InvalidElemError } from "../elem/InvalidElemError.ts";
import { toElem } from "../elem/toElem.ts";
import type { ElemOrCssSelector } from "../types.ts";

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
 * @param input Element, EventTarget, or selector for element.
 * @param styles Object with style property values keyed by name.
 */
export function setElemStyle(
  input: ElemOrCssSelector,
  styles: Record<CSSStyleProperty, string>,
): void {
  const elem = toElem(input);
  if (elem === null) {
    throw new InvalidElemError("Unable to set styles");
  }

  for (const key of Object.keys(styles)) {
    const styleName = key as CSSStyleProperty;
    elem.style[styleName] = styles[styleName];
  }
}
