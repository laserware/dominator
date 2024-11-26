import { elemOrThrow } from "../internal/elemOr.ts";
import type { ElemOrCssSelector } from "../types.ts";

/**
 * Type of value that can be returned from the {@linkcode getInputValue}
 * function.
 */
export type InputValueType = "boolean" | "date" | "number" | "string";

type GetInputValueAsReturn<T extends InputValueType> = T extends "boolean"
  ? boolean
  : T extends "date"
    ? Date
    : T extends "number"
      ? number
      : T extends "string"
        ? string
        : never;

/**
 * Returns the value of the specified `target` with the specified type. The
 * value is returned as a number if the {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/valueAsNumber|valueAsNumber}
 * property returns a valid number, a Date if {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/valueAsDate|valueAsDate}
 * is a valid {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date|Date} (not `null`),
 * a boolean if the input is a `checkbox` or `radio` type, otherwise is returned as a `string`.
 *
 * @template T Type of the value that gets returned.
 *
 * @param target Element, EventTarget, or CSS selector.
 *
 * @returns Value of the specified `target` as type `T`.
 *
 * @throws {InvalidElemError} If the specified `target` wasn't found.
 * @throws {Error} If the `target` specified is not of type `HTMLInputElement`.
 */
export function getInputValue<T extends InputValueType>(
  target: ElemOrCssSelector,
): GetInputValueAsReturn<T> {
  const elem = elemOrThrow(target, "Could not get value for element");

  if (!isInputElement(elem)) {
    throw new Error("Cannot get value on an element if it is not an input");
  }

  // Note that the order of these checks is important. Calling `valueAsNumber` on
  // date input will return the Unix epoch, which is _not_ what we want to return,
  // so we do the date check first:
  const dateValue = elem.valueAsDate;
  if (dateValue !== null) {
    return asInputReturnValue<T>(new Date(dateValue));
  }

  const numericValue = elem.valueAsNumber;
  if (!Number.isNaN(numericValue)) {
    return asInputReturnValue<T>(numericValue);
  }

  const stringValue = elem.value as string;
  if (elem.type === "checkbox" || elem.type === "radio") {
    // TODO: Find out if this is correct!
    return asInputReturnValue<T>(elem.checked);
  }

  return asInputReturnValue<T>(stringValue);
}

/**
 * Gets the value of the specified `target` as the raw string.
 *
 * @param target Element, EventTarget, or CSS selector.
 *
 * @returns String value of the specified `target`.
 *
 * @throws {InvalidElemError} If the specified `target` wasn't found.
 * @throws {Error} If the `target` specified is not of type `HTMLInputElement`.
 */
export function getInputValueRaw(target: ElemOrCssSelector): string {
  const elem = elemOrThrow(target, "Could not get value for element");

  if (isInputElement(elem)) {
    return elem.value;
  } else {
    throw new Error("Cannot get value on an element if it is not an input");
  }
}

function isInputElement(elem: HTMLElement): elem is HTMLInputElement {
  return elem instanceof HTMLInputElement;
}

function asInputReturnValue<T extends InputValueType>(
  value: any,
): GetInputValueAsReturn<T> {
  return value as unknown as GetInputValueAsReturn<T>;
}
