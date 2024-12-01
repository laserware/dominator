/**
 * @module search
 * @mergeModuleWith types
 */

import type { AttrName, AttrValue } from "./attrs/types.ts";
import type { CssVarName, CssVarValue } from "./css/types.ts";
import type { DataKey, DataValue } from "./data/types.ts";
import type { AnyElement } from "./dom.ts";
import type { StyleKey, StyleValue } from "./styles/types.ts";

/**
 * Key representing any type of DOM property (i.e. attributes, CSS variables,
 * dataset attribute/property names and style keys).
 *
 * @template E Type of Element associated with the underlying DOM properties.
 */
export type DOMPropertyKey<E extends AnyElement = HTMLElement> =
  | AttrName<E>
  | CssVarName
  | DataKey
  | StyleKey;

/**
 * Represents a value that can be assigned to a DOM property after stringification.
 *
 * Objects and arrays are stringified via [JSON.stringify](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify).
 */
export type DOMPropertyValue = AttrValue | CssVarValue | DataValue | StyleValue;

/**
 * Filter value for performing DOM property searches. Use `null` to check if
 * an entry exists only (skip checking if values match).
 */
export type DOMPropertyFilterValue =
  | AttrValue
  | DataValue
  | CssVarValue
  | StyleValue
  | null;

/**
 * Filter criteria for determining if a DOM property has the specified value.
 *
 * @template K Key of the property to filter.
 * @template V Value of the property to filter. If not checking for a value, use `null`.
 */
export type DOMPropertyFilter<
  K extends DOMPropertyKey,
  V extends DOMPropertyFilterValue,
> = { [key in K]?: V };

/**
 * Search criteria that can be used to determine if a DOM property is present
 * on an element. If an array, only the presence of the property **names** are
 * checked. If an object, the property name **and** value are checked.
 *
 * To check for the existence of a property only (i.e. you don't care what the
 * value is), use `null` for the field.
 *
 * @template K Key of the property to search.
 * @template V Type of the value to search for (only needed if using {@linkcode DOMPropertyFilter}).
 *
 * @example
 * **HTML**
 *
 * ```html
 * <button id="example" aria-hidden="true" aria-label="Example">Example</button>
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
export type DOMPropertySearch<
  K extends DOMPropertyKey = DOMPropertyKey,
  V extends DOMPropertyFilterValue = DOMPropertyFilterValue,
> = K[] | DOMPropertyFilter<K, V>;
