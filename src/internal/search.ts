import type {
  DOMPropertyFilterValue,
  DOMPropertyKey,
  DOMPropertySearch,
  KeysOf,
} from "../types.ts";

/**
 * Returns true if *all* properties in the specified `element` match the
 * `search` criteria based on the specified `predicate` check.
 *
 * @internal
 *
 * @template V Type of value in the `predicate` (needed to prevent type errors).
 *
 * @param element HTMLElement to search for all properties.
 * @param search Search criteria for finding all properties.
 * @param predicate Callback that returns true if the property *does not* match.
 */
export function hasAllProperties<
  V extends DOMPropertyFilterValue = DOMPropertyFilterValue,
>(
  element: HTMLElement,
  search: DOMPropertySearch,
  predicate: (element: HTMLElement, key: DOMPropertyKey, value?: V) => boolean,
): boolean {
  if (Array.isArray(search)) {
    for (const name of search) {
      if (!predicate(element, name)) {
        return false;
      }
    }
  } else {
    const names = keysOf(search);

    for (const name of names) {
      // @ts-ignore It's fine if the value is null.
      if (!predicate(element, name, search[name])) {
        return false;
      }
    }
  }

  return true;
}

/**
 * Returns true if *some* properties in the specified `element` match the
 * `search` criteria based on the specified `predicate` check.
 *
 * @internal
 *
 * @template V Type of value in the `predicate` (needed to prevent type errors).
 *
 * @param element HTMLElement to search for some properties.
 * @param search Search criteria for finding some properties.
 * @param predicate Callback that returns true if the property *does* match.
 */
export function hasSomeProperties<
  V extends DOMPropertyFilterValue = DOMPropertyFilterValue,
>(
  element: HTMLElement,
  search: DOMPropertySearch,
  predicate: (element: HTMLElement, key: DOMPropertyKey, value?: V) => boolean,
): boolean {
  if (Array.isArray(search)) {
    for (const name of search) {
      if (predicate(element, name)) {
        return true;
      }
    }
  } else {
    const names = keysOf(search);

    for (const name of names) {
      // @ts-ignore It's fine if the value is null.
      if (predicate(element, name, search[name])) {
        return true;
      }
    }
  }

  return false;
}

// TODO: Import this from `arcade`.
function keysOf<T extends Record<any, any>>(value: T): KeysOf<T> {
  return Object.keys(value) as KeysOf<T>;
}
