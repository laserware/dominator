import type { ElemOrCssSelector, NullOr } from "../types.ts";

import { toElem } from "./toElem.ts";

/**
 * Returns the value of the specified element.
 *
 * @param target Element, EventTarget, or selector for element.
 */
export function getValue<T>(target: NullOr<ElemOrCssSelector>): T {
  const elem = toElem<HTMLInputElement>(target);

  if (elem === null) {
    throw new Error("Could not get value for element, element not found");
  }

  return elem.value as unknown as T;
}

/**
 * Returns the Date value of the specified date/time input element.
 *
 * @param target Element, EventTarget, or selector for element. Note that this
 *               must be an input that can return the value as a date.
 */
export function getValueAsDate(
  target: NullOr<ElemOrCssSelector>,
): NullOr<Date> {
  const elem = toElem<HTMLInputElement>(target);

  if (elem === null) {
    // prettier-ignore
    throw new Error("Could not get value as date for element, element not found");
  }

  return elem.valueAsDate;
}

/**
 * Returns the numeric value of the specified input element.
 *
 * @param target Element, EventTarget, or selector for element. Note that this
 *               must be an input that can return the value as a number.
 */
export function getValueAsNumber(target: NullOr<ElemOrCssSelector>): number {
  const elem = toElem<HTMLInputElement>(target);

  if (elem === null) {
    // prettier-ignore
    throw new Error("Could not get value as number for element, element not found");
  }

  return elem.valueAsNumber;
}
