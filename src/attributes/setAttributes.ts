import { cast } from "@laserware/arcade";

import { toElementOrThrow } from "../elements/toElement.ts";
import type { Target } from "../elements/types.ts";
import { stringifyDOMValue } from "../internal/domValues.ts";
import { formatForError } from "../internal/formatForError.ts";

import type { AttributeName, AttributeValue, Attributes } from "./types.ts";

/**
 * Sets the attribute `name` of the `target` element to the `value`. The `value`
 * is coerced to a string.
 *
 * @template E Element representation of `target`.
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
export function setAttribute<E extends Element = HTMLElement>(
  target: Target | null,
  name: AttributeName<E>,
  value: AttributeValue | null | undefined,
): E {
  const element = toElementOrThrow(target, `Cannot set attribute ${name}`);

  setSingleAttribute(element, name, value);

  return cast<E>(element);
}

/**
 * Sets the attributes of the `target` to the `attributes` object, where the key of
 * the object is the attribute name and the value of the object is the attribute
 * value.
 *
 * @template E Element representation of `target`.
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
 * let element = findElement<HTMLDivElement>("#example")!;
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
export function setAttributes<E extends Element = HTMLElement>(
  target: Target | null,
  attributes: Attributes<E>,
): E {
  // biome-ignore format:
  const element = toElementOrThrow(target, `Cannot set attributes ${formatForError(attributes)}`);

  for (const name of Object.keys(attributes)) {
    setSingleAttribute(element, name, attributes[name]);
  }

  return cast<E>(element);
}

function setSingleAttribute<E extends Element = HTMLElement>(
  element: E,
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
