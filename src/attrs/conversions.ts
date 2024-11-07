import { isNil } from "@laserware/arcade";

import type { NullOr, Primitive } from "../types.ts";

export function toPrimitiveValue<T extends Primitive>(
  value: unknown,
): NullOr<T> {
  if (isNil(value)) {
    return null;
  }

  if (typeof value !== "string") {
    return null;
  }

  if (value === "true" || value === "false") {
    return (value === "true") as T;
  }

  const numericValue = Number(value);

  if (Number.isNaN(numericValue)) {
    return value as T;
  }

  return numericValue as T;
}

export function toAttrValue(value: unknown): string | undefined {
  if (isNil(value)) {
    return undefined;
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
