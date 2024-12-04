import { cast } from "@laserware/arcade";

import type { ElementOf, TagName } from "../dom.ts";
import { toElementOrThrow } from "../elements/toElement.ts";
import type { Target } from "../elements/types.ts";
import { stringifyDOMValue } from "../internal/domValues.ts";
import { formatForError } from "../internal/formatForError.ts";

import type { AttributeName, Attributes, AttributeValue } from "./types.ts";

/**
 * Sets the attribute `name` of the `target` element to the `value`. The `value`
 * is coerced to a string.
 *
 * @template TN Tag name of the Element representation of `target`.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param name Name of the attribute to set.
 * @param value Value to set for the attribute.
 *
 * @returns Element representation of the specified `target`.
 *
 * @throws {@linkcode elements!InvalidElementError} if the specified `target` wasn't found.
 *
 * @example
 * **HTML (Before)**
 *
 * ```html
 * <div id="example" role="slider">
 *   ...
 * </div>
 * ```
 *
 * **Code**
 *
 * ```ts
 * let element = findElement("#example")!;
 *
 * element = setAttribute(element, "aria-label", "Click me");
 * ```
 *
 * **HTML (After)**
 *
 * ```html
 * <div
 *   id="example"
 *   role="slider"
 *   aria-label="Click me"
 * >
 *   ...
 * </div>
 * ```
 */
export function setAttribute<TN extends TagName = "*">(
  target: Target<TN>,
  name: AttributeName<TN>,
  value: AttributeValue | null | undefined,
): ElementOf<TN> {
  const element = toElementOrThrow(target, `Unable to set attribute ${name}`);

  setSingleAttribute(element, name, value);

  return cast<ElementOf<TN>>(element);
}

/**
 * Sets the attributes of the `target` to the `attributes` object, where the key of
 * the object is the attribute name and the value of the object is the attribute
 * value.
 *
 * @template TN Tag name of the Element representation of `target`.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param attributes Object with key of attribute name and value of attribute value.
 *
 * @returns Element representation of the specified `target`.
 *
 * @throws {@linkcode elements!InvalidElementError} if the specified `target` wasn't found.
 *
 * @example
 * **HTML (Before)**
 *
 * ```html
 * <div id="example" role="slider">
 *   ...
 * </div>
 * ```
 *
 * **Code**
 *
 * ```ts
 * let element = findElement<"div">("#example")!;
 *
 * element = setAttributes(element, {
 *   "aria-label", "Click me",
 *   "aria-valuenow": 20,
 * });
 * ```
 *
 * **HTML (After)**
 *
 * ```html
 * <div
 *   id="example"
 *   role="slider"
 *   aria-label="Click me"
 *   aria-valuenow="20"
 * >
 *   ...
 * </div>
 * ```
 */
export function setAttributes<TN extends TagName = "*">(
  target: Target<TN>,
  attributes: Attributes<TN>,
): ElementOf<TN> {
  // prettier-ignore
  const element = toElementOrThrow(target, `Unable to set attributes ${formatForError(attributes)}`);

  for (const name of Object.keys(attributes)) {
    setSingleAttribute(element, name, attributes[name]);
  }

  return cast<ElementOf<TN>>(element);
}

function setSingleAttribute<TN extends TagName = "*">(
  element: ElementOf<TN>,
  name: string,
  value: AttributeValue | null | undefined,
): void {
  const attributeValue = stringifyDOMValue(value);

  if (attributeValue === undefined) {
    element.removeAttribute(name);
  } else {
    element.setAttribute(name, attributeValue);
  }
}
