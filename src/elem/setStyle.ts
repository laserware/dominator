import type { ElemOrCssSelector, NullOr } from "../types.ts";

import { InvalidElemError } from "./InvalidElemError.ts";
import { toElem } from "./toElem.ts";

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
 * Sets the style properties of the specified `target` to the specified values
 * where `styles` is an object with key of style property name and value of the
 * style property value.
 *
 * @param target `Element`, `EventTarget`, or CSS selector.
 * @param styles Object with style property values keyed by name.
 *
 * @throws {InvalidElemError} If the `target` could not be found.
 */
export function setStyle<E extends Element = HTMLElement>(
  target: NullOr<ElemOrCssSelector>,
  styles: Record<CSSStyleProperty, string>,
): NullOr<E> {
  const elem = toElem<E>(target);
  if (elem === null) {
    throw new InvalidElemError("Unable to set styles, element not found");
  }

  if (!("style" in elem)) {
    throw new Error("Could not set style on invalid element");
  }

  for (const key of Object.keys(styles)) {
    const styleName = key as CSSStyleProperty;
    // @ts-ignore
    elem.style[styleName] = styles[styleName];
  }

  return elem;
}
