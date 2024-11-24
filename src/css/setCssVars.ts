import { isNil, isNotNil } from "@laserware/arcade";

import { asElem } from "../elem/asElem.ts";
import { InvalidElemError } from "../elem/InvalidElemError.ts";
import { toElem } from "../elem/toElem.ts";
import { stringifyDOMValue } from "../internal/domValues.ts";
import {
  CssVarName,
  type CssVars,
  type CssVarValue,
  type ElemOrCssSelector,
} from "../types.ts";

import { CssVarError } from "./CssVarError.ts";

/**
 * Sets the specified CSS variable `name` to the specified `value` in the optionally
 * specified `target`. If no `target` was specified, updates the variable value
 * in `:root`.
 *
 * @remarks
 * The `name` argument is not limited to type {@linkcode CssVarName} because the
 * name is checked prior to setting it on the property.
 *
 * @template E Type of Element to return.
 *
 * @param name Name of the CSS variable to set or update.
 * @param value Value of the CSS variable.
 * @param [target] Optional Element, EventTarget, or CSS selector for element in
 *                 which to set CSS variable.
 *
 * @returns The Element associated with the specified `target`. If no `target` was specified,
 *          returns {@link https://developer.mozilla.org/en-US/docs/Web/API/Document/documentElement|documentElement}.
 *
 * @throws {CssVarError} If the specified `name` is not a valid {@linkcode CssVarName}.
 * @throws {InvalidElemError} If the specified `target` does not exist.
 */
export function setCssVar<E extends Element = HTMLElement>(
  name: string,
  value: CssVarValue,
  target?: ElemOrCssSelector,
): E {
  const elem = isNil(target) ? document.documentElement : toElem(target);
  if (elem === null) {
    throw new InvalidElemError(`Unable to set CSS variable ${name}`);
  }

  setSingleCssVar(elem, name, value);

  return asElem<E>(elem);
}

/**
 * Sets the specified CSS `vars` on the optionally specified `target`.
 * If no `target` was specified, updates the variables in `:root`.
 *
 * @remarks
 * The keys in the `vars` argument are not limited to type {@linkcode CssVarName}
 * because the key (i.e. CSS variable name) is checked prior to setting it on the
 * property.
 *
 * @template E Type of Element to return.
 *
 * @param vars Object with key of CSS variable name and value of value to set for name.
 * @param [target] Optional Element, EventTarget, or CSS selector for element in
 *                 which to set CSS variable.
 *
 * @returns The Element associated with the specified `target`. If no `target` was specified,
 *          returns {@link https://developer.mozilla.org/en-US/docs/Web/API/Document/documentElement|documentElement}.
 *
 * @throws {CssVarError} If a specified name in `vars` is not a valid {@linkcode CssVarName}.
 * @throws {InvalidElemError} If the specified `target` does not exist.
 */
export function setCssVars<E extends Element = HTMLElement>(
  vars: CssVars,
  target?: ElemOrCssSelector,
): E {
  const elem = isNil(target) ? document.documentElement : toElem(target);
  if (elem === null) {
    throw new InvalidElemError(`Unable to set CSS variables`);
  }

  for (const key of Object.keys(vars)) {
    setSingleCssVar(elem, key, vars[key as keyof typeof vars]);
  }

  return asElem<E>(elem);
}

function setSingleCssVar(
  element: HTMLElement,
  name: string,
  value: CssVarValue,
): void {
  if (!CssVarName.is(name)) {
    // prettier-ignore
    throw new CssVarError(`CSS variable ${name} must be a string that starts with "--"`);
  }

  const attrValue = stringifyDOMValue(value);
  if (isNotNil(attrValue)) {
    element.style.setProperty(name, attrValue);
  }
}
