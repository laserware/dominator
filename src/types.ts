/* istanbul ignore file -- @preserve: These are just type definitions, no need to enforce coverage. */
// noinspection SpellCheckingInspection

/**
 * This module contains commonly used utility types.
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
 * Represents primitive values that can be used to set properties on Elements.
 */
export type Primitive = boolean | number | string;
