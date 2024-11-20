import { isNil } from "@laserware/arcade";

import type { ElemOrCssSelector, NilOr, NullOr } from "../types.ts";

import { InvalidElemError } from "./InvalidElemError.ts";
import { toElem } from "./toElem.ts";

/**
 * Type of value that can be returned from the {@linkcode getElemValueAs}
 * function.
 */
export type ElemValueType = "boolean" | "date" | "number" | "string";

type GetElemValueAsReturn<T extends ElemValueType> = T extends "boolean"
  ? boolean
  : T extends "date"
    ? Date | null
    : T extends "number"
      ? number
      : T extends "string"
        ? string
        : never;

/**
 * Returns the value of the specified element.
 *
 * @param target `Element`, `EventTarget`, or CSS selector.
 */
export function getElemValue<T>(target: NullOr<ElemOrCssSelector>): T {
  const elem = toElem<HTMLInputElement>(target);

  if (elem === null) {
    throw new InvalidElemError("Could not get value for element");
  }

  return elem.value as unknown as T;
}

/**
 * Returns the value of the specified element with the specified type.
 *
 * @template T Type of the value that gets returned.
 *
 * @param target `Element`, `EventTarget`, or CSS selector.
 * @param as {@linkcode ElemValueType} to coerce the target value property to.
 */
export function getElemValueAs<T extends ElemValueType>(
  target: NullOr<ElemOrCssSelector>,
  as: T,
): GetElemValueAsReturn<T> {
  const elem = toElem(target)!;

  if (!isInputElement(elem)) {
    throw new Error("Cannot get value on an element if it is not an input");
  }

  if (elem === null) {
    throw new InvalidElemError("Could not get value for element");
  }

  if (as === "number") {
    return elem.valueAsNumber as unknown as GetElemValueAsReturn<T>;
  }

  if (as === "date") {
    return elem.valueAsDate as unknown as GetElemValueAsReturn<T>;
  }

  const elemValue = elem.value as string;

  if (as === "boolean") {
    return (elemValue === "true") as unknown as GetElemValueAsReturn<T>;
  }

  return elemValue as unknown as GetElemValueAsReturn<T>;
}

/**
 * List of HTML input types.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types
 */
// prettier-ignore
const inputTypes = [
  "checkbox", "color", "date", "datetime", "email", "file", "hidden",
  "image", "month", "number", "password", "radio", "range", "reset", "search",
  "submit", "tel", "text", "time", "url", "week",
  // Deprecated
  "datetime",
];

function isInputElement(elem: NilOr<HTMLElement>): elem is HTMLInputElement {
  if (isNil(elem)) {
    return false;
  }

  if (elem instanceof HTMLInputElement) {
    return true;
  }

  if ("type" in elem) {
    for (const inputType of inputTypes) {
      if (elem.type === inputType) {
        return true;
      }
    }
  }

  return false;
}
