import { cast } from "@laserware/arcade";

import type { ElementOf, TagName } from "../dom.ts";
import type { ElemOrCssSelector } from "../elems/types.ts";
import { stringifyDOMValue } from "../internal/domValues.ts";
import { elemOrThrow } from "../internal/elemOr.ts";
import { formatForError } from "../internal/formatForError.ts";

import type { AttrName, Attrs, AttrValue } from "./types.ts";

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
 * @throws {@linkcode elems!InvalidElemError} if the specified `target` wasn't found.
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
 * let elem = findElem("#example")!;
 *
 * elem = setAttr(elem, "aria-label", "Click me");
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
export function setAttr<TN extends TagName = "*">(
  target: ElemOrCssSelector<TN>,
  name: AttrName<TN>,
  value: AttrValue | null | undefined,
): ElementOf<TN> {
  const elem = elemOrThrow(target, `Unable to set attribute ${name}`);

  setSingleAttr(elem, name, value);

  return cast<ElementOf<TN>>(elem);
}

/**
 * Sets the attributes of the `target` to the `attrs` object, where the key of
 * the object is the attribute name and the value of the object is the attribute
 * value.
 *
 * @template TN Tag name of the Element representation of `target`.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param attrs Object with key of attribute name and value of attribute value.
 *
 * @returns Element representation of the specified `target`.
 *
 * @throws {@linkcode elems!InvalidElemError} if the specified `target` wasn't found.
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
 * let elem = findElem<"div">("#example")!;
 *
 * elem = setAttrs(elem, {
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
export function setAttrs<TN extends TagName = "*">(
  target: ElemOrCssSelector<TN>,
  attrs: Attrs<TN>,
): ElementOf<TN> {
  // prettier-ignore
  const elem = elemOrThrow(target, `Unable to set attributes ${formatForError(attrs)}`);

  for (const name of Object.keys(attrs)) {
    setSingleAttr(elem, name, attrs[name]);
  }

  return cast<ElementOf<TN>>(elem);
}

function setSingleAttr<TN extends TagName = "*">(
  element: ElementOf<TN>,
  name: string,
  value: AttrValue | null | undefined,
): void {
  const attrValue = stringifyDOMValue(value);

  if (attrValue === undefined) {
    element.removeAttribute(name);
  } else {
    element.setAttribute(name, attrValue);
  }
}
