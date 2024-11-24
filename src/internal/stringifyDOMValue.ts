/**
 * Converts the specified value to a string. If the value is `null`, returns
 * an empty string. HTML element attributes, properties, and dataset values
 * usually can only be a string.
 *
 * Any non-primitive value (e.g. an object or array), is stringified via
 * {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify|JSON.stringify}.
 *
 * @param value Value to convert to a valid attribute value.
 */
export function stringifyDOMValue(value: unknown): string | undefined {
  if (value === undefined) {
    return undefined;
  }

  if (value === null) {
    return "";
  }

  if (typeof value === "string") {
    return value;
  }

  if (
    typeof value === "number" ||
    typeof value === "boolean" ||
    typeof value === "symbol"
  ) {
    return value.toString();
  }

  return JSON.stringify(value);
}
