import { isNil } from "@laserware/arcade";

import { toElem } from "../elem/toElem.ts";
import type { AttrValue, ElemOrCssSelector } from "../types.ts";

import { CssVarError } from "./CssVarError.ts";

/**
 * Sets the specified CSS variable name to the specified value in the optionally
 * specified element. If no element is specified, updates the variable value
 * in `:root`.
 *
 * @param name Name of the variable to update.
 * @param value Value of the variable.
 * @param [target] Optional Element, EventTarget, or selector for element in which to set CSS variable.
 */
export function setCssVar(
  name: string,
  value: AttrValue,
  target?: ElemOrCssSelector,
): void {
  const elem = isNil(target) ? document.documentElement : toElem(target);
  if (elem === null) {
    throw new CssVarError(`Unable to update CSS variable ${name}`);
  }

  elem.style.setProperty(name, value.toString());
}
