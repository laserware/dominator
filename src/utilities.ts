import { isNil } from "@laserware/arcade";

/**
 * Ensures the specified value is converted to a string, regardless of type. If
 * an error occurs, returns an empty string.
 *
 * @param value Value to stringify.
 */
export function safeStringify(
  value: string | number | boolean | null | undefined,
): string {
  try {
    if (typeof value === "string") {
      return value;
    }

    if (isNil(value)) {
      return "";
    }

    return value.toString();
  } catch {
    return "";
  }
}

export function unstringify<T = string>(value: string): T {
  try {
    if (value === "true")
  } catch {
    return value as T;
  }
}
