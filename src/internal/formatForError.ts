/* istanbul ignore file -- @preserve: Cannot test because of Intl.ListFormat. */

import { isObjectLiteral } from "@laserware/arcade";

const formatter = new Intl.ListFormat("en", {
  style: "short",
  type: "unit",
});

type FormattableValue = string | number;

/**
 * Returns a formatted display value for an error message contingent on the
 * specified `valueOrValues`. For object and array types, use the
 * [Intl.ListFormat](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat)
 * API to get the result.
 *
 * @internal
 *
 * @remarks
 * - If the specified value is an object, returns a list of the object's keys.
 * - If the specified value is an array, returns a list of the values.
 * - If the specified value is a string or number, returns the value as a string.
 *
 * @param valueOrValues Value or array of values to format for an error message.
 */
export function formatForError(
  valueOrValues: FormattableValue[] | Record<any, any> | FormattableValue,
): string {
  if (typeof valueOrValues === "number") {
    return valueOrValues.toString();
  }

  if (typeof valueOrValues === "string") {
    return valueOrValues;
  }

  // We need the list to be a string before passing it to the `format` method,
  // so we ensure only strings are included in the list.
  let stringValues: string[];

  if (isObjectLiteral(valueOrValues)) {
    stringValues = getStringValues(Object.keys(valueOrValues));
  } else {
    stringValues = getStringValues(valueOrValues);
  }

  return formatter.format(stringValues);
}

function getStringValues(values: any[]): string[] {
  const stringValues: string[] = [];

  for (const value of values) {
    try {
      const stringValue = value.toString();

      if (typeof stringValue === "string") {
        stringValues.push(`"${stringValue}"`);
      }
    } catch {
      // Do nothing.
    }
  }

  return stringValues;
}
