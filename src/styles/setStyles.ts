import { toElem } from "../elems/toElem.ts";
import { InvalidElemError } from "../errors.ts";
import { cast } from "../internal/cast.ts";
import { stringifyDOMValue } from "../internal/domValues.ts";
import { isCssVarName } from "../typeGuards.ts";
import type {
  AnyElement,
  ElemOrCssSelector,
  StyleKey,
  Styles,
  StyleValue,
} from "../types.ts";

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
 * @throws {@linkcode InvalidElemError} If the `target` could not be found or doesn't have a [`style`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) property.
 *
 * @category Styles
 */
export function setStyle<E extends AnyElement = HTMLElement>(
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
 * @template E Element type of specified `target`.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param styles Object with style property values keyed by name.
 *
 * @returns Element representation of the specified `target`.
 *
 * @throws {@linkcode InvalidElemError} If the `target` could not be found or doesn't have a [`style`](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) property.
 *
 * @category Styles
 */
export function setStyles<E extends AnyElement = HTMLElement>(
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
  element: AnyElement,
  key: string,
  value: StyleValue,
): void {
  const styleValue = stringifyDOMValue(value) ?? "";

  if (isCssVarName(key)) {
    element.style.setProperty(key, styleValue);
  } else {
    // @ts-ignore
    element.style[key] = styleValue;
  }
}