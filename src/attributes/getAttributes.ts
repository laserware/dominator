import { cast, type KeysOf, type WithNullValues } from "@laserware/arcade";

import type { ElementOf, TagName } from "../dom.ts";
import { toElementOrThrow } from "../elements/toElement.ts";
import type { Target } from "../elements/types.ts";
import { parseDOMValue } from "../internal/domValues.ts";
import { formatForError } from "../internal/formatForError.ts";

import type { AttributeName, Attributes, AttributeValue } from "./types.ts";

/**
 * Attempts to get the attribute `name` from the `target`. If the value is found,
 * it is coerced to a boolean if `"true"` or `"false"`, a number if numeric, or
 * the string value if a string. If not found, returns `null`.
 *
 * @remarks
 * We're returning `null`, rather than `undefined` to match the
 * [Element.getAttribute](https://developer.mozilla.org/en-US/docs/Web/API/Element/getAttribute) API.
 *
 * @template V Type of value to return.
 * @template TN Tag name of the Element representation of `target`.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param name Name of the attribute to get.
 *
 * @returns Value of type `V` or `null` if not found.
 *
 * @throws {@linkcode elements!InvalidElementError} if the specified `target` wasn't found.
 *
 * @example
 * **HTML**
 *
 * ```html
 * <div
 *   id="example"
 *   role="slider"
 *   aria-valuemax="30"
 *   aria-label="Example"
 *   aria-disabled="false"
 * >
 *   ...
 * </div>
 * ```
 *
 * **Code**
 *
 * ```ts
 * const element = findElement("#example")!;
 *
 * getAttribute(element, "aria-label");
 * // "Example"
 *
 * getAttribute(element, "aria-valuemax");
 * // 30
 *
 * getAttribute(element, "aria-disabled");
 * // false
 * ```
 */
export function getAttribute<
  V extends AttributeValue = string,
  TN extends TagName = "*",
>(target: Target<TN> | null, name: AttributeName<TN>): V | null {
  const element = toElementOrThrow(target, `Cannot get attribute ${name}`);

  return getSingleAttribute<V, TN>(element, name) ?? null;
}

/**
 * Builds an object with the keys equal to the attribute `names` and the value
 * equal to the corresponding attribute value in the `target`. If the value is
 * found it is coerced to a boolean if `"true"` or `"false"`, a number if
 * numeric, or the string value if a string. If not found, the value is `null`.
 *
 * > [!IMPORTANT]
 * > You will need to perform checks for whether a value is `null` in the returned
 * > object if some of the entries weren't present. See the code block below for
 * > additional details.
 *
 * ```ts
 * // Assuming you pass this in as the generic:
 * type ShapeIn = {
 *   role: string;
 *   "aria-label": string;
 * };
 *
 * // The return type of this function is:
 * type ShapeOut = {
 *   role: string | null;
 *   "aria-label": string | null;
 * };
 * ```
 *
 * @remarks
 * The {@linkcode arcade!WithNullValues} type represents an object with values that could be `null`.
 *
 * @template V Shape of attributes object value to return.
 * @template TN Tag name of the Element representation of `target`.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param names Names of the attributes for which to find values.
 *
 * @returns Object with `names` as keys and corresponding attribute values (or `null` if not present).
 *
 * @throws {@linkcode elements!InvalidElementError} if the specified `target` wasn't found.
 *
 * @example
 * **HTML**
 *
 * ```html
 * <div
 *   id="example"
 *   role="slider"
 *   aria-valuemax="30"
 *   aria-label="Example"
 *   aria-disabled="false"
 * >
 *   ...
 * </div>
 * ```
 *
 * **Code**
 *
 * ```ts
 * type Shape = {
 *   "aria-label": string | null;
 *   "aria-valuemax": number | null;
 *   invalid: string | null;
 * };
 *
 * const element = findElement("#example")!;
 *
 * getAttributes<Shape>(element, [
 *   "aria-label",
 *   "aria-valuemax",
 *   "invalid", // Doesn't exist, so it's `null`
 * ]);
 * // { "aria-label": "Example", "aria-valuemax": 30, invalid: null }
 * ```
 */
export function getAttributes<
  V extends Attributes = Attributes,
  TN extends TagName = "*",
>(target: Target<TN> | null, names: KeysOf<V>): WithNullValues<V> {
  // prettier-ignore
  const element = toElementOrThrow(target, `Cannot get attributes ${formatForError(names)}`);

  const attributes: Record<string, AttributeValue | null> = {};

  for (const name of names) {
    attributes[name] = getSingleAttribute(element, cast<AttributeName>(name));
  }

  return cast<WithNullValues<V>>(attributes);
}

function getSingleAttribute<
  V extends AttributeValue = AttributeValue,
  TN extends TagName = "*",
>(element: ElementOf<TN>, name: AttributeName<TN>): V | null {
  const attributeValue = element.getAttribute(name);

  return parseDOMValue<V>(attributeValue) ?? null;
}
