import { isNil } from "@laserware/arcade";

import { asElem } from "../elem/asElem.ts";
import { InvalidElemError } from "../elem/InvalidElemError.ts";
import { toElem } from "../elem/toElem.ts";
import { stringifyDOMValue } from "../internal/stringifyDOMValue.ts";
import {
  CssVarName,
  StyleValue,
  type ElemOrCssSelector,
  type NullOr,
  type StyleKey,
  type Styles,
} from "../types.ts";

/**
 * Sets the style property with name `key` to the specified `value` on the
 * specified `target`.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param key {@linkcode StyleKey} representing the name of the style property.
 * @param value {@linkcode StyleValue} to set for the corresponding key.
 *
 * @throws {InvalidElemError} If the `target` could not be found or doesn't have a
 *                           {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style|style} property.
 */
export function setStyle<E extends Element = HTMLElement>(
  target: NullOr<ElemOrCssSelector>,
  key: StyleKey,
  value: StyleValue,
): NullOr<E> {
  const elem = toElem(target);
  if (elem === null || !("style" in elem)) {
    throw new InvalidElemError("Unable to set style");
  }

  if (StyleValue.is(value)) {
    setSingleStyle(elem, key, value);
  }

  return asElem<E>(elem);
}

/**
 * Sets the style properties of the specified `target` to the specified `styles`
 * object with key of {@linkcode StyleKey} and value of the {@linkcode StyleValue}.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param styles Object with style property values keyed by name.
 *
 * @throws {InvalidElemError} If the `target` could not be found or doesn't have a {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style|style} property.
 */
export function setStyles<E extends Element = HTMLElement>(
  target: NullOr<ElemOrCssSelector>,
  styles: Styles,
): NullOr<E> {
  const elem = toElem(target);
  if (elem === null || !("style" in elem)) {
    throw new InvalidElemError("Unable to set styles");
  }

  for (const key of Object.keys(styles)) {
    setSingleStyle(elem, key, styles[key as keyof typeof styles]);
  }

  return asElem<E>(elem);
}

function setSingleStyle(
  element: HTMLElement,
  key: string,
  value: StyleValue,
): void {
  const attributeValue = stringifyDOMValue(value);
  if (isNil(attributeValue)) {
    throw new Error(`Unable to stringify ${key} value of ${value}`);
  }

  if (CssVarName.is(key)) {
    element.style.setProperty(key, attributeValue);
  } else {
    // @ts-ignore
    element.style[key] = attributeValue;
  }
}
