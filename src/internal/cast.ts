/**
 * Forces the specified value to be the specified type `T` to get around annoying
 * TypeScript idiosyncrasies.
 *
 * @typeParam T Type to cast specified `value` as.
 *
 * @param value Value to cast to `T`.
 */
export function cast<T>(value: any): T {
  return value as unknown as T;
}
