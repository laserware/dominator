import { InvalidElemError } from "../elem/InvalidElemError.ts";
import { toElem } from "../elem/toElem.ts";
import { cast } from "../internal/cast.ts";
import { stringifyDOMValue } from "../internal/domValues.ts";
import {
  CssVarName,
  StyleValue,
  type ElemOrCssSelector,
  type StyleKey,
  type Styles,
} from "../types.ts";

/**
 * Sets the style property with name `key` to the specified `value` on the
 * specified `target`.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param key Name of the style property.
 * @param value Value to set for the style property.
 *
 * @returns The Element representation of the specified `target`.
 *
 * @throws {InvalidElemError} If the `target` could not be found or doesn't have a
 *                           {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style|style} property.
 */
export function setStyle<E extends Element = HTMLElement>(
  target: ElemOrCssSelector,
  key: StyleKey,
  value: StyleValue,
): E {
  const elem = toElem(target);
  if (elem === null || !("style" in elem)) {
    throw new InvalidElemError("Unable to set style");
  }

  setSingleStyle(elem, key, value);

  return cast<E>(elem);
}

/**
 * Sets the style properties of the specified `target` to the specified `styles`
 * object with key of style property name and value of the corresponding property
 * value.
 *
 * @template E Type of Element to return.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param styles Object with style property values keyed by name.
 *
 * @returns The Element representation of the specified `target`.
 *
 * @throws {InvalidElemError} If the `target` could not be found or doesn't have a
 *                            {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style|style} property.
 */
export function setStyles<E extends Element = HTMLElement>(
  target: ElemOrCssSelector,
  styles: Styles,
): E {
  const elem = toElem(target);
  if (elem === null || !("style" in elem)) {
    throw new InvalidElemError("Unable to set styles");
  }

  for (const key of Object.keys(styles)) {
    setSingleStyle(elem, key, styles[key as StyleKey] as StyleValue);
  }

  return cast<E>(elem);
}

function setSingleStyle(
  element: HTMLElement,
  key: string,
  value: StyleValue,
): void {
  const styleValue = stringifyDOMValue(value) ?? "";

  if (CssVarName.is(key)) {
    element.style.setProperty(key, styleValue);
  } else {
    // @ts-ignore
    element.style[key] = styleValue;
  }
}