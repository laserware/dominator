import { keysOf } from "@laserware/arcade";

import type { PropertySearch } from "../types.ts";

/**
 * Returns true if **all** properties in the specified `element` match the
 * `search` criteria based on the specified `predicate` check.
 *
 * @internal
 *
 * @param element Element to search for all properties.
 * @param search Search criteria for finding all properties.
 * @param predicate Callback that returns true if the property *does not* match.
 */
export function hasAllProperties(
  element: Element,
  search: PropertySearch<any, any>,
  predicate: (element: Element, key: any, value?: any) => boolean,
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
 * Returns true if **some** properties in the specified `element` match the
 * `search` criteria based on the specified `predicate` check.
 *
 * @internal
 *
 * @param element Element to search for some properties.
 * @param search Search criteria for finding some properties.
 * @param predicate Callback that returns true if the property *does* match.
 */
export function hasSomeProperties(
  element: Element,
  search: PropertySearch<any, any>,
  predicate: (element: Element, key: any, value?: any) => boolean,
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
