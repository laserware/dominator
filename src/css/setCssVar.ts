import { isNil } from "@laserware/arcade";

import { toElem } from "../elem/toElem.ts";
import type { AttrValue, ElemOrCssSelector, NullOr } from "../types.ts";

import { CssVarError } from "./CssVarError.ts";

/**
 * Sets the specified CSS variable `name` to the specified `value` in the optionally
 * specified `target`. If no `target` was specified, updates the variable value
 * in `:root`. Returns the `Element` associated with the specified `target`.
 * If no `target` was specified, returns {@link https://developer.mozilla.org/en-US/docs/Web/API/Document/documentElement|documentElement}.
 *
 * @template E Type of `Element` to return.
 *
 * @param name Name of the variable to update.
 * @param value Value of the variable.
 * @param [target] Optional `Element`, `EventTarget`, or CSS selector for element in
 *                 which to set CSS variable.
 *
 * @throws {CssVarError} If the `target` element specified does not exist.
 */
export function setCssVar<E extends Element = HTMLElement>(
  name: string,
  value: AttrValue,
  target?: NullOr<ElemOrCssSelector>,
): E {
  const elem = isNil(target) ? document.documentElement : toElem(target);
  if (elem === null) {
    // prettier-ignore
    throw new CssVarError(`Unable to update CSS variable ${name}, target not found`);
  }

  elem.style.setProperty(name, value.toString());

  return elem as unknown as E;
}
