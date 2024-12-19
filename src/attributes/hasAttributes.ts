import { isNil } from "@laserware/arcade";

import type { TagName } from "../dom.ts";
import { toElementOrThrow } from "../elements/toElement.ts";
import type { Target } from "../elements/types.ts";
import { formatForError } from "../internal/formatForError.ts";
import { hasAllProperties, hasSomeProperties } from "../internal/search.ts";
import type { PropertySearch } from "../types.ts";

import { getAttribute } from "./getAttributes.ts";
import type { AttributeName, AttributeValue } from "./types.ts";

/**
 * Search criteria for checking if attributes are present in an element.
 * You can use an array of attribute names to check only if the attributes are
 * present, or an object to search for specific values. Use `null` for the value
 * if you only care about the presence of an attribute.
 *
 * @template TN Tag name of element with corresponding attributes to search.
 */
export type AttributesSearch<TN extends TagName = "*"> = PropertySearch<
  AttributeName<TN>,
  AttributeValue | null
>;

/**
 * Checks if the `target` has the attribute `name`. If a `value` is specified,
 * checks that the values match.
 *
 * @template TN Tag name of the Element representation of `target`.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param name Name of the attribute to check for.
 * @param [value] Optional attribute value to check for.
 *
 * @returns `true` if the attribute `name` is present and `value` matches (if specified).
 *
 * @throws {@linkcode elements!InvalidElementError} if the specified `target` wasn't found.
 *
 * @example
 * **HTML**
 *
 * ```html
 * <button id="example" aria-pressed="true" aria-label="Example">
 *   Example
 * </button>
 * ```
 *
 * **Code**
 *
 * ```ts
 * const element = findElement("#example")!;
 *
 * hasAttribute(element, "aria-pressed");
 * // true
 *
 * hasAttribute(element, "aria-pressed", "true");
 * // false ("true" cannot be a string, must be the boolean value `true`)
 *
 * hasAttribute(element, "aria-label", "Example");
 * // true
 * ```
 */
export function hasAttribute<TN extends TagName = "*">(
  target: Target<TN> | null,
  name: AttributeName<TN>,
  value?: AttributeValue,
): boolean {
  // prettier-ignore
  const element = toElementOrThrow(target, `Cannot check for attribute ${name}`);

  return hasSingleAttribute(element, name, value);
}

/**
 * Checks if the `target` has **all** of the attributes that match the `search`
 * criteria.
 *
 * @template TN Tag name of the Element representation of `target`.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param search Array of attribute names or attributes filter object to check for.
 *
 * @returns `true` if the `target` matches all search criteria.
 *
 * @throws {@linkcode elements!InvalidElementError} if the specified `target` wasn't found.
 *
 * @example
 * **HTML**
 *
 * ```html
 * <div id="example" aria-hidden="true" inert>
 *   Example
 * </div>
 * ```
 *
 * **Code**
 *
 * ```ts
 * const element = findElement("#example")!;
 *
 * hasAllAttributes(element, ["aria-hidden"]);
 * // true
 *
 * hasAllAttributes(element, ["aria-hidden", "missing"]);
 * // false ("missing" does not exist)
 *
 * hasAllAttributes(element, {
 *   "aria-hidden": true,
 *   inert: null,
 * });
 * // true
 * ```
 */
export function hasAllAttributes<TN extends TagName = "*">(
  target: Target<TN> | null,
  search: AttributesSearch<TN>,
): boolean {
  // prettier-ignore
  const element = toElementOrThrow(target, `Cannot check for all attributes ${formatForError(search)}`);

  return hasAllProperties(element, search, hasSingleAttribute);
}

/**
 * Checks if the `target` has **some** of the attributes that match the `search`
 * criteria.
 *
 * @template TN Tag name of the Element representation of `target`.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param search Array of attribute names or attributes filter object to check for.
 *
 * @returns `true` if the `target` matches some search criteria.
 *
 * @throws {@linkcode elements!InvalidElementError} if the specified `target` wasn't found.
 *
 * @example
 * **HTML**
 *
 * ```html
 * <div id="example" aria-hidden="true" inert>Example</div>
 * ```
 *
 * **Code**
 *
 * Note that the `aria-label` attribute isn't present on the `div` above,
 * but the function still returns `true`:
 *
 * ```ts
 * const element = findElement("#example")!;
 *
 * hasSomeAttributes(element, ["aria-hidden", "aria-label"]);
 * // true
 *
 * hasSomeAttributes(element, {
 *   inert: null,
 *   "aria-hidden": true,
 *   "aria-label": "Click Me",
 * });
 * // true
 * ```
 */
export function hasSomeAttributes<TN extends TagName = "*">(
  target: Target<TN> | null,
  search: AttributesSearch<TN>,
): boolean {
  // prettier-ignore
  const element = toElementOrThrow(target, `Cannot check for some attributes ${formatForError(search)}`);

  return hasSomeProperties(element, search, hasSingleAttribute);
}

function hasSingleAttribute(
  element: Element,
  name: AttributeName,
  value?: AttributeValue | null,
): boolean {
  if (isNil(value)) {
    return element.hasAttribute(name);
  } else {
    return getAttribute(element, name) === value;
  }
}
