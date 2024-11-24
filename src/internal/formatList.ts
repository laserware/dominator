import { isPlainObject } from "@laserware/arcade";

const formatter = new Intl.ListFormat("en", {
  style: "short",
  type: "conjunction",
});

/**
 * Returns a formatted list of the specified `values`. Uses the
 * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Intl/ListFormat|Intl.ListFormat}
 * API to get the result.
 *
 * @param values Array of values to format as a list.
 */
export function formatList(values: any[] | Record<any, any>): string {
  // We need the list to be a string prior to passing it to the `format` method,
  // so we ensure only strings are included in the list.
  let stringValues: string[] = [];

  if (isPlainObject(values)) {
    stringValues = getStringValues(Object.keys(values));
  } else {
    stringValues = getStringValues(values);
  }

  return formatter.format(stringValues);
}

function getStringValues(values: any[]): string[] {
  const stringValues: string[] = [];

  for (const value of values) {
    try {
      const stringValue = value.toString();

      if (typeof stringValue === "string") {
        stringValues.push(stringValue);
      }
    } catch {
      // Do nothing.
    }
  }

  return stringValues;
}
