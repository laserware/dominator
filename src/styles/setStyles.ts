import { cast } from "@laserware/arcade";

import { isCssVarName } from "../css/isCssVarName.ts";
import type { ElementOf, TagName } from "../dom.ts";
import { InvalidElementError } from "../elements/InvalidElementError.ts";
import { toElement } from "../elements/toElement.ts";
import type { Target } from "../elements/types.ts";
import { stringifyDOMValue } from "../internal/domValues.ts";
import { formatForError } from "../internal/formatForError.ts";

import type { StyleKey, StyleValue, Styles } from "./types.ts";

/**
 * Sets the style property with name `key` to the specified `value` on the
 * specified `target`.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param key Name of the style property.
 * @param value Value to set for the style property.
 *
 * @returns Element representation of the specified `target`.
 *
 * @throws {@linkcode elements!InvalidElementError} if the `target` could not be found or doesn't have a [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) property.
 */
export function setStyle<TN extends TagName = "*">(
  target: Target | null,
  key: StyleKey,
  value: StyleValue,
): ElementOf<TN> {
  const element = toElement(target);
  if (element === null || !("style" in element)) {
    throw new InvalidElementError(`Cannot set style for ${key}`);
  }

  setSingleStyle(element, key, value);

  return cast<ElementOf<TN>>(element);
}

/**
 * Sets the style properties of the specified `target` to the specified `styles`
 * object with key of style property name and value of the corresponding property
 * value.
 *
 * @template TN Tag name of the Element representation of `target`.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param styles Object with style property values keyed by name.
 *
 * @returns Element representation of the specified `target`.
 *
 * @throws {@linkcode elements!InvalidElementError} if the `target` could not be found or doesn't have a [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) property.
 */
export function setStyles<TN extends TagName = "*">(
  target: Target | null,
  styles: Styles,
): ElementOf<TN> {
  const element = toElement(target);
  if (element === null || !("style" in element)) {
    // biome-ignore format:
    throw new InvalidElementError(`Cannot set styles ${formatForError(styles)}`);
  }

  for (const key of Object.keys(styles)) {
    setSingleStyle(element, key, styles[key as StyleKey] as StyleValue);
  }

  return cast<ElementOf<TN>>(element);
}

function setSingleStyle(
  element: Element,
  key: string,
  value: StyleValue,
): void {
  const styleValue = stringifyDOMValue(value) ?? "";

  if (isCssVarName(key)) {
    cast<HTMLElement>(element).style.setProperty(key, styleValue);
  } else {
    // @ts-ignore
    cast<HTMLElement>(element).style[key] = styleValue;
  }
}
