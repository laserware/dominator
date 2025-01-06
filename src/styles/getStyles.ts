import { type KeysOf, type WithUndefinedValues, cast } from "@laserware/arcade";

import { InvalidElementError } from "../elements/InvalidElementError.ts";
import { toElement } from "../elements/toElement.ts";
import type { Target } from "../elements/types.ts";
import { parseDOMValue } from "../internal/domValues.ts";
import { formatForError } from "../internal/formatForError.ts";

import type { StyleKey, StyleValue, Styles } from "./types.ts";

/**
 * Attempts to get the specified style property with name `key` from the
 * specified `target`. If the value is found, it is coerced to a boolean if
 * `"true"` or `"false"`, a number if numeric, or the string value if a string.
 * If not found, returns `undefined`.
 *
 * @template V Type of value to return.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param key Name of the style property to get.
 *
 * @returns Value of type `T` or `undefined` if not found.
 *
 * @throws {@linkcode elements!InvalidElementError} if the `target` could not be found or doesn't have a [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) property.
 *
 * @example
 * **HTML**
 *
 * ```html
 * <div
 *   id="example"
 *   style="display: flex; line-height: 1.5;"
 * >...</div>
 * ```
 *
 * **Code**
 *
 * ```ts
 * const element = findElement("#example")!;
 *
 * getStyle(element, "display");
 * // "flex"
 *
 * getStyle(element, "lineHeight");
 * // 1.5
 * ```
 */
export function getStyle<V extends StyleValue = string>(
  target: Target | null,
  key: StyleKey,
): V | undefined {
  const element = toElement(target);
  if (element === null || !("style" in element)) {
    throw new InvalidElementError(`Cannot get style for ${key}`);
  }

  return getSingleStyle<V>(element, key);
}

/**
 * Builds an object with the keys equal to the specified `keys` and
 * the value equal to the corresponding style property value in the specified
 * `target`. If the value is found it is coerced to a boolean if `"true"` or
 * `"false"`, a number if numeric, or the string value if a string. If not
 * found, the value is excluded from the return value.
 *
 * > [!IMPORTANT]
 * > You will need to perform checks for whether a value is `undefined` in the returned
 * > object if some of the entries weren't present. See the code block below for
 * > additional details.
 *
 * ```ts
 * // Assuming you pass this in as the generic:
 * type ShapeIn = {
 *   display: string;
 *   lineHeight: number;
 * };
 *
 * // The return type of this function is:
 * type ShapeOut = {
 *   display: string | undefined;
 *   lineHeight: number | undefined;
 * };
 * ```
 *
 * @remarks
 * The {@linkcode arcade!WithUndefinedValues} type represents an object with values that could be `undefined`.
 *
 * @template V Shape of styles object to return.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param keys Names of the style properties to get values for.
 *
 * @returns Object with specified names as `keys` and corresponding style property values (or `undefined` if not present).
 *
 * @throws {@linkcode elements!InvalidElementError} if the `target` could not be found or doesn't have a [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) property.
 *
 * @example
 * **HTML**
 *
 * ```html
 * <div
 *   id="example"
 *   style="display: flex; line-height: 1.5;"
 * >...</div>
 * ```
 *
 * **Code**
 *
 * ```ts
 * type Shape = {
 *   display: string | undefined;
 *   lineHeight: number | undefined;
 *   fontSize: number | undefined;
 * };
 *
 * const element = findElement("#example")!;
 *
 * getStyles<Shape>(element, [
 *   "display",
 *   "lineHeight",
 *   "fontSize",
 * ]);
 * // { display: "flex", lineHeight: 1.5, fontSize: undefined }
 * ```
 */
export function getStyles<V extends Styles = Styles>(
  target: Target | null,
  keys: KeysOf<V>,
): WithUndefinedValues<V> {
  const element = toElement(target);
  if (element === null || !("style" in element)) {
    // biome-ignore format:
    throw new InvalidElementError(`Cannot get styles ${formatForError(keys)}`);
  }

  const styles: Record<string, StyleValue | undefined> = {};

  for (const key of keys) {
    // @ts-ignore
    styles[key] = getSingleStyle(element, key);
  }

  return cast<WithUndefinedValues<V>>(styles);
}

function getSingleStyle<V extends StyleValue>(
  element: Element,
  key: StyleKey,
): V | undefined {
  // Note that we're using nullish coalescing for the return value of
  // `parseDOMValue` because it may be `null` and we only want to return
  // `undefined` if the style doesn't exist.

  // @ts-ignore I know `key` is a valid key for styles. If it wasn't we return `undefined`.
  const styleEntry = element.style[key];

  if (styleEntry !== undefined && styleEntry !== "") {
    return parseDOMValue<V>(styleEntry);
  }

  const styleProperty = cast<HTMLElement>(element).style.getPropertyValue(key);

  // Apparently the `kebab-case` version of a style property name is accessible
  // from the element's `style` property, so style["font-size"] works.
  // This is a fallback in case someone passes in a CSS variable.
  if (styleProperty !== "") {
    return parseDOMValue<V>(styleProperty);
  }

  return undefined;
}
