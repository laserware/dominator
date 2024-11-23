import type { ElemOrCssSelector, NullOr } from "../types.ts";

import { asElem } from "./asElem.ts";
import { InvalidElemError } from "./InvalidElemError.ts";
import { toElem } from "./toElem.ts";

type CSSStyleProperty =
  | Exclude<
      keyof CSSStyleDeclaration,
      | "length"
      | "parentRule"
      | "getPropertyPriority"
      | "getPropertyValue"
      | "item"
      | "removeProperty"
      | "setProperty"
    >
  | `--${string}`;

export type SettableStyles = Record<CSSStyleProperty, string>;

/**
 * Sets the style properties of the specified `target` to the specified values
 * where `styles` is an object with key of style property name and value of the
 * style property value.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param styles Object with style property values keyed by name.
 *
 * @throws {InvalidElemError} If the `target` could not be found.
 */
export function setStyle<E extends Element = HTMLElement>(
  target: NullOr<ElemOrCssSelector>,
  styles: SettableStyles,
): NullOr<E> {
  const elem = toElem<HTMLElement>(target);
  if (elem === null) {
    throw new InvalidElemError("Unable to set styles, element not found");
  }

  if (!("style" in elem)) {
    throw new Error("Could not set style on invalid element");
  }

  for (const key of Object.keys(styles)) {
    const propertyName = key as CSSStyleProperty;

    if (key.startsWith("--")) {
      elem.style.setProperty(key, styles[propertyName]);
    } else {
      // @ts-ignore
      elem.style[propertyName] = styles[propertyName];
    }
  }

  return asElem<E>(elem);
}
