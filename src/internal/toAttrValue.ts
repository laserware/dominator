import { isNil } from "@laserware/arcade";

import type { AttrValue, NullOr } from "../types.ts";

/**
 * Coerces the specified `value` coming from the `getAttribute()` method on an
 * `Element` to a value of type `T` that represents a valid {@linkcode AttrValue}.
 * Returns `null` if `value` is not a string.
 *
 * @template T Type of value to return.
 *
 * @param value Value to coerce to an {@linkcode AttrValue}.
 */
export function toAttrValue<T extends AttrValue>(value: unknown): NullOr<T> {
  if (isNil(value)) {
    return null;
  }

  if (typeof value !== "string") {
    return null;
  }

  if (value === "true" || value === "false") {
    return (value === "true") as T;
  }

  if (value === "") {
    return true as T;
  }

  const numericValue = Number(value);

  if (Number.isNaN(numericValue)) {
    return value as T;
  }

  return numericValue as T;
}
