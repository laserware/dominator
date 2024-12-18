import { toElementOrThrow } from "./toElement.ts";
import type { Target } from "./types.ts";

/**
 * Name of the value type associated with an element.
 */
export type ElementValueTypeName = "boolean" | "date" | "number" | "string";

/**
 * Type that corresponds to the {@linkcode ElementValueTypeName}. This is a
 * convenience type for coercing a type name specified as a string to the
 * actual type (e.g. `ElementValueTypeName` of `"string"` would indicate that
 * the return value will be of type `string`).
 *
 * See {@linkcode getElementValue} to understand how this is used in practice.
 *
 * @template T Name of the input value type.
 */
export type ElementValueAsType<T extends ElementValueTypeName> =
  T extends "boolean"
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
 * value is returned as a number if the [`valueAsNumber` property](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/valueAsNumber)
 * returns a valid number, a Date if the [`valueAsDate` property](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/valueAsDate)
 * is a valid [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) (not `null`),
 * a boolean if the input is a `checkbox` or `radio` type, otherwise is returned as a `string`.
 *
 * @template T Type of the value that gets returned.
 *
 * @param target Element, EventTarget, or CSS selector.
 *
 * @returns Value of the specified `target` as type `T`.
 *
 * @throws {@linkcode InvalidElementError} if the specified `target` wasn't found.
 */
export function getElementValue<T extends ElementValueTypeName>(
  target: Target,
): ElementValueAsType<T> {
  // prettier-ignore
  const element = toElementOrThrow<"input">(target, "Cannot get value for element");

  // Note that the order of these checks is important. Calling `valueAsNumber` on
  // date input will return the Unix epoch, which is _not_ what we want to return,
  // so we do the date check first:
  const dateValue = element.valueAsDate;
  if (dateValue !== null) {
    return asInputReturnValue<T>(new Date(dateValue));
  }

  const numericValue = element.valueAsNumber;
  if (!Number.isNaN(numericValue)) {
    return asInputReturnValue<T>(numericValue);
  }

  const stringValue = element.value as string;
  if (element.type === "checkbox" || element.type === "radio") {
    // TODO: Find out if this is correct!
    return asInputReturnValue<T>(element.checked);
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
 * @throws {@linkcode InvalidElementError} if the specified `target` wasn't found.
 */
export function getElementValueRaw(target: Target): string {
  // prettier-ignore
  const element = toElementOrThrow<"input">(target, "Cannot get value for element");

  return element.value;
}

function asInputReturnValue<T extends ElementValueTypeName>(
  value: any,
): ElementValueAsType<T> {
  return value as unknown as ElementValueAsType<T>;
}
