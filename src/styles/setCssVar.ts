import { isNil } from "@laserware/arcade";

import { toValidElem } from "../internal/toValidElem";
import { InvalidElementError } from "../InvalidElementError";
import type { ElemOrSelectInput } from "../types";

/**
 * Sets the specified CSS variable name to the specified value in the optionally
 * specified element. If no element is specified, updates the variable value
 * in `:root`.
 *
 * @param name Name of the variable to update.
 * @param value Value of the variable.
 * @param [input] Optional Element, Event, or selector for element in which to
 *                set CSS variable.
 */
export function setCssVar(
  name: string,
  value: boolean | number | string,
  input?: ElemOrSelectInput,
): void {
  const elem = isNil(input) ? document.documentElement : toValidElem(input);

  if (elem === null) {
    throw new InvalidElementError(`Unable to update CSS variable ${name}`);
  }

  elem.style.setProperty(name, value.toString());
}
