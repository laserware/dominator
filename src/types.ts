/* istanbul ignore file -- @preserve: These are just type definitions, no need to enforce coverage. */

/**
 * This module contains commonly used utility types, type definitions for
 * DOM properties that can be searched, and type definitions for DOM elements
 * and attributes that extend the DOM types that ship with TypeScript.
 *
 * The `Property*` types are used primarily for the `has*`, `hasAll*`, and
 * `hasSome*` functions to determine if elements contain matching properties.
 *
 * @module types
 */

/**
 * Type is either a single item or array of items of type `T`.
 *
 * @template T Type of item or items.
 */
export type OneOrManyOf<T> = T | T[];

/**
 * Extracts the keys of the specified object as an array.
 *
 * @template T Object to extract keys from.
 */
export type KeysOf<T extends Record<any, any>> = Extract<keyof T, string>[];

/**
 * Adds `null` as the possible type for the fields in the specified type.
 *
 * @template T Type of object to add `null` to fields.
 */
export type WithNullValues<T extends Record<any, any>> = {
  [K in keyof T]: T[K] | null;
};

/**
 * Adds `undefined` as the possible type for the fields in the specified type.
 *
 * @template T Type of object to add `undefined` to fields.
 */
export type WithUndefinedValues<T extends Record<any, any>> = {
  [K in keyof T]: T[K] | undefined;
};

/**
 * Represents primitive values that can be used to set properties on elements.
 */
export type Primitive = boolean | number | string;

/**
 * Filter criteria for determining if a DOM property has the specified value.
 *
 * @template K Key of the property to filter.
 * @template V Value of the property to filter. If not checking for a value, use `null`.
 */
export type PropertyFilter<K extends string, V> = {
  [key in K]?: V;
};

/**
 * Search criteria that can be used to determine if a DOM property is present
 * on an element. If an array, only the presence of the property **names** are
 * checked. If an object, the property name **and** value are checked.
 *
 * To check for the existence of a property only (i.e. you don't care what the
 * value is), use `null` for the field.
 *
 * @template K Key of the property to search.
 * @template V Type of the value to search for (only needed if using {@linkcode PropertyFilter}).
 *
 * @example
 * **HTML**
 *
 * ```html
 * <button id="example" aria-hidden="true" aria-label="Example">
 *   Example
 * </button>
 * ```
 *
 * **Code**
 *
 * ```ts
 * const elem = findElem("#example")!;
 *
 * const result = hasAllAttrs(elem, {
 *   "aria-hidden": true,
 *   // Setting to null means "only check if property exists"
 *   "aria-label": null,
 * });
 * // true
 * ```
 */
export type PropertySearch<K extends string, V> = K[] | PropertyFilter<K, V>;
