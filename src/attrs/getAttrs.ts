import { cast } from "../internal/cast.ts";
import { parseDOMValue } from "../internal/domValues.ts";
import { elemOrThrow } from "../internal/elemOr.ts";
import { formatForError } from "../internal/formatForError.ts";
import type {
  AnyElement,
  AttrName,
  Attrs,
  AttrValue,
  ElemOrCssSelector,
  KeysOf,
  WithNullValues,
} from "../types.ts";

/**
 * Attempts to get the specified attribute `name` from the specified `target`.
 * If the value is found, it is coerced to a boolean if `"true"` or `"false"`, a
 * number if numeric, or the string value if a string. If not found, returns
 * `null`.
 *
 * @remarks
 * We're returning `null`, rather than `undefined` to match the
 * [Element.getAttribute](https://developer.mozilla.org/en-US/docs/Web/API/Element/getAttribute) API.
 *
 * @typeParam T Type of value to return.
 * @typeParam E Element type of specified `target`.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param name Name of the attribute to get.
 *
 * @returns Value of type `T` or `null` if not found.
 *
 * @throws {@linkcode InvalidElemError} If the specified `target` wasn't found.
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
 * >...</div>
 * ```
 *
 * **String Attribute**
 *
 * ```ts
 * const elem = findElem("#example")!;
 *
 * getAttr(elem, "aria-label");
 * // "Example"
 * ```
 *
 * **Number Attribute**
 *
 * ```ts
 * const elem = findElem("#example")!;
 *
 * getAttr(elem, "aria-valuemax");
 * // 30
 * ```
 *
 * **Boolean Attribute**
 *
 * ```ts
 * const elem = findElem("#example")!;
 *
 * getAttr(elem, "aria-disabled");
 * // false
 * ```
 *
 * @category Attrs
 */
export function getAttr<
  T extends AttrValue = AttrValue,
  E extends AnyElement = HTMLElement,
>(target: ElemOrCssSelector<E>, name: AttrName<E>): T | null {
  const elem = elemOrThrow(target, `Unable to get attribute ${name}`);

  return getSingleAttr<T, E>(elem, name) ?? null;
}

/**
 * Builds an object with the keys equal to the specified attribute `names` and
 * the value equal to the corresponding attribute value in the specified `target`.
 * If the value is found it is coerced to a boolean if `"true"` or `"false"`, a
 * number if numeric, or the string value if a string. If not found, the value
 * is `null`.
 *
 * @typeParam T Shape of attributes object to return.
 * @typeParam E Element type of specified `target`.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param names Names of the attributes for which to find values.
 *
 * @returns Object with specified names as keys and corresponding attribute values.
 *          Note that you will need to perform checks for whether a value is
 *          `null` in the returned object if some of the entries weren't present.
 *
 * @throws {@linkcode InvalidElemError} If the specified `target` wasn't found.
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
 * ></div>
 * ```
 *
 * **Code**
 *
 * ```ts
 * interface Shape {
 *   "aria-label": string | null;
 *   "aria-valuemax": number | null;
 *   invalid: string | null;
 * }
 *
 * const elem = findElem("#example")!;
 *
 * // Note that `invalid` doesn't exist on the element, so it's `null`:
 * getAttrs<Shape>(elem, ["aria-label", "aria-valuemax", "invalid"]);
 * // { "aria-label": "Example", "aria-valuemax": 30, invalid: null }
 * ```
 *
 * @category Attrs
 */
export function getAttrs<
  T extends Attrs = Attrs,
  E extends AnyElement = HTMLElement,
>(target: ElemOrCssSelector<E>, names: KeysOf<T>): WithNullValues<T> {
  // prettier-ignore
  const elem = elemOrThrow(target, `Unable to get attributes ${formatForError(names)}`);

  const attrs: Record<string, AttrValue | null> = {};

  for (const name of names) {
    attrs[name] = getSingleAttr(elem, cast<AttrName>(name));
  }

  return cast<WithNullValues<T>>(attrs);
}

function getSingleAttr<
  T extends AttrValue = AttrValue,
  E extends AnyElement = HTMLElement,
>(element: E, name: AttrName<E>): T | null {
  const attrValue = element.getAttribute(name);

  return parseDOMValue<T>(attrValue) ?? null;
}
