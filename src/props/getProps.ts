import { cast } from "../internal/cast.ts";
import { elemOrThrow } from "../internal/elemOr.ts";
import { formatForError } from "../internal/formatForError.ts";
import type {
  ElemOrCssSelector,
  KeysOf,
  PropName,
  Props,
  PropValue,
  WithUndefinedValues,
} from "../types.ts";

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
export function getProp<E extends HTMLElement = HTMLElement>(
  target: ElemOrCssSelector<E>,
  name: PropName<E>,
): PropValue<E> | undefined {
  const elem = elemOrThrow(target, `Unable to get property ${name}`);

  return getSingleProp(elem, name);
}

/**
 * Builds an object with the keys equal to the specified property `names` and
 * the value equal to the corresponding property value in the specified `target`.
 *
 * @template T Shape of properties object to return.
 * @template E Element type of specified `target`.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param names Names of the properties for which to find values.
 *
 * @returns Object with specified names as keys and corresponding property values.
 *          Note that you will need to perform checks for whether a value is
 *          `undefined` in the returned object if some of the entries weren't present.
 *
 * @throws {InvalidElemError} If the specified `target` wasn't found.
 *
 * @example
 * interface Shape {
 *   formMethod: string;
 *   formNoValidate: boolean;
 * }
 *
 * const elem = findElem("button")!;
 * elem.formMethod = "post";
 * elem.formNoValidate = true;
 *
 * // Note that `invalid` doesn't exist on the element, so it's `undefined`:
 * const result = getProps<Shape>(elem, ["formMethod", "formNoValidate", "invalid"]);
 * // { formMethod: "post", formNoValidate: true, invalid: undefined }
 */
export function getProps<
  T extends Props = Props,
  E extends HTMLElement = HTMLElement,
>(target: ElemOrCssSelector<E>, names: KeysOf<T>): WithUndefinedValues<T> {
  // prettier-ignore
  const elem = elemOrThrow(target, `Unable to get properties ${formatForError(names)}`);

  const props: Record<string, PropValue<E> | undefined> = {};

  for (const name of names) {
    props[name] = getSingleProp(elem, cast<PropName<E>>(name));
  }

  return cast<WithUndefinedValues<T>>(props);
}

function getSingleProp<E extends HTMLElement = HTMLElement>(
  element: E,
  name: PropName<E>,
): PropValue<E> | undefined {
  // @ts-ignore I know this is right, but I couldn't get TS to shut up.
  return element[name];
}
