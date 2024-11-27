import { cast } from "../internal/cast.ts";
import { elemOrThrow } from "../internal/elemOr.ts";
import { formatForError } from "../internal/formatForError.ts";
import type { ElemOrCssSelector, PropName, PropValue } from "../types.ts";

/**
 * Attempts to get the specified property `name` from the specified `target`.
 *
 * @template T Type of value to return.
 * @template E Element type of specified `target`.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param name Name of the property to get.
 *
 * @returns Value of type `T` or `null` if not found.
 *
 * @throws {InvalidElemError} If the specified `target` wasn't found.
 *
 * @example String Property
 * const elem = findElem("button")!;
 * elem.formMethod = "post";
 *
 * const result = getProp(elem, "formMethod");
 * // "post"

 * @example Number Property
 * const elem = findElem("canvas")!;
 * elem.width = 400;
 *
 * const result = getProp(elem, "width");
 * // 400

 * @example Boolean Property
 * const elem = findElem("button")!;
 * elem.formNoValidate = true;
 *
 * const result = getProp(elem, "formNoValidate");
 * // true
 */
export function getProp<E extends HTMLElement>(
  target: ElemOrCssSelector<E>,
  name: PropName<E>,
): E[keyof E] | null {
  const elem = elemOrThrow(target, `Unable to get property ${name}`);

  return getSingleProp(elem, name);
}

type ElementProps<E extends HTMLElement, K extends keyof E> = {
  [P in K]: NonNullable<E[P]>;
};

/**
 * Builds an object with the keys equal to the specified property `names` and
 * the value equal to the corresponding property value in the specified `target`.
 *
 * @remarks
 * The function returns `null` rather than `undefined` for missing values because
 * that's how the properties are typed in the HTML Elements.
 *
 * @template E Element type of specified `target`.
 * @template NS Property names that map to valid properties for Element `E`.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param names Names of the properties for which to find values.
 *
 * @returns Object with specified names as keys and corresponding property values.
 *          Note that you will need to perform checks for whether a value is
 *          `null` in the returned object if some of the entries weren't present.
 *
 * @throws {InvalidElemError} If the specified `target` wasn't found.
 *
 * @example
 * const elem = findElem("button")!;
 * elem.formMethod = "post";
 * elem.formNoValidate = true;
 *
 * // Note that `ariaDisabled` doesn't exist on the element, so it's `null`:
 * const result = getProps(elem, ["formMethod", "formNoValidate", "ariaDisabled"]);
 * // { formMethod: "post", formNoValidate: true, ariaDisabled: null }
 */
export function getProps<E extends HTMLElement, NS extends (keyof E)[]>(
  target: ElemOrCssSelector<E>,
  names: NS,
): ElementProps<E, NS[number]> {
  // prettier-ignore
  const elem = elemOrThrow(target, `Unable to get properties ${formatForError(names)}`);

  type Props = Record<keyof E, PropValue<E> | null>;

  const props: Props = {} as Props;

  for (const name of names) {
    props[name] = getSingleProp(elem, cast<PropName<E>>(name));
  }

  return cast<ElementProps<E, NS[number]>>(props);
}

function getSingleProp<E extends HTMLElement = HTMLElement>(
  element: E,
  name: PropName<E>,
): PropValue<E> | null {
  // @ts-ignore I know this is right, but I couldn't get TS to shut up.
  return element[name];
}
