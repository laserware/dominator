/**
 * Converts the specified value to a string (valid representation of an attribute
 * value). If the `value` is an invalid type, throws error. If the value is
 * `null`, returns an empty string. If a conversion error occurs, returns
 * `undefined`.
 *
 * @param value Value to convert to a valid attribute value.
 */
export function toAttrValue(value: unknown): string | undefined {
  if (value === undefined) {
    return undefined;
  }

  if (value === null) {
    return "";
  }

  if (typeof value === "string") {
    return value;
  }

  if (Array.isArray(value)) {
    throw new Error("Cannot convert value of array to attribute string");
  }

  try {
    if (
      typeof value === "number" ||
      typeof value === "boolean" ||
      typeof value === "symbol"
    ) {
      return value.toString();
    }
  } catch {
    return undefined;
  }

  if (typeof value === "object") {
    throw new Error("Cannot convert value of object to attribute string");
  }
}
