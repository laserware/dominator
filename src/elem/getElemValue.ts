import { isNotNil } from "@laserware/arcade";

import { elemOrThrow } from "../internal/elemOrThrow.ts";
import type { ElemOrCssSelector } from "../types.ts";

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
 * List of HTML input types.
 * @see https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types
 * @internal
 */
// prettier-ignore
const inputTypes = [
  "checkbox", "color", "date", "datetime", "email", "file", "hidden",
  "image", "month", "number", "password", "radio", "range", "reset", "search",
  "submit", "tel", "text", "time", "url", "week",
  // Deprecated
  "datetime",
];

/**
 * Gets the value of the specified `target` as the raw string.
 *
 * @param target Element, EventTarget, or CSS selector.
 *
 * @returns String value of the specified `target`.
 *
 * @throws {InvalidElemError} If the `target` specified does not exist.
 * @throws {Error} If the `target` specified is not of type `HTMLInputElement`.
 */
export function getElemValue(target: ElemOrCssSelector): string {
  const elem = elemOrThrow(target, "Could not get value for element");

  if (isInputElement(elem)) {
    return elem.value;
  } else {
    throw new Error("Cannot get value on an element if it is not an input");
  }
}

/**
 * Returns the value of the specified `target` with the specified type.
 *
 * @template T Type of the value that gets returned.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param as {@linkcode ElemValueType} to coerce the target value property to.
 * @param [fallback] Optional fallback value to use if the value is missing/invalid.
 *
 * @returns Value of the specified `target` as type `T`.
 *
 * @throws {InvalidElemError} If the `target` specified does not exist.
 * @throws {Error} If the `target` specified is not of type `HTMLInputElement`.
 */
export function getElemValueAs<T extends ElemValueType>(
  target: ElemOrCssSelector,
  as: T,
  fallback?: T,
): GetElemValueAsReturn<T> {
  const elem = elemOrThrow(target, "Could not get value for element");

  if (!isInputElement(elem)) {
    throw new Error("Cannot get value on an element if it is not an input");
  }

  if (as === "number") {
    const numericValue = elem.valueAsNumber;

    if (Number.isNaN(numericValue) && isNotNil(fallback)) {
      return asElemReturnValue<T>(fallback);
    } else {
      return asElemReturnValue<T>(numericValue);
    }
  }

  if (as === "date") {
    const dateValue = elem.valueAsDate;

    if (dateValue === null && isNotNil(fallback)) {
      return asElemReturnValue<T>(fallback);
    } else {
      return asElemReturnValue<T>(dateValue);
    }
  }

  const stringValue = elem.value as string;

  if (as === "boolean") {
    const hasValue = isNotNil(stringValue) && stringValue !== "";

    if (hasValue) {
      return asElemReturnValue<T>(stringValue === "true");
    }

    if (isNotNil(fallback)) {
      return asElemReturnValue<T>(fallback);
    }
  }

  return asElemReturnValue<T>(stringValue);
}

function isInputElement(elem: HTMLElement): elem is HTMLInputElement {
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

function asElemReturnValue<T extends ElemValueType>(
  value: any,
): GetElemValueAsReturn<T> {
  return value as unknown as GetElemValueAsReturn<T>;
}
