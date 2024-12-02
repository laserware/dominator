/**
 * Valid type for the key of [HTMLElement.dataset](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset)
 * property entries in HTML/SVG elements.
 */
export type DataPropertyName = string;

/**
 * Valid name for dataset [data-* attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/data-*)
 * on a HTML/SVG element (e.g. `data-some-value`).
 */
export type DataAttrName = `data-${string}`;

/**
 * Valid name for {@linkcode Data} entries. Represents either a key for the
 * [HTMLElement.dataset](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset) property
 * or a name for the [data-* attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/data-*).
 */
export type DataKey = DataPropertyName | DataAttrName;

/**
 * Value that can be assigned to or extracted from a dataset property
 * (prior to stringifying).
 */
export type DataValue =
  | boolean
  | number
  | string
  | any[]
  | Record<number | string, any>;

/**
 *
 * Valid key/value pair representing dataset attributes (prior to stringifying).
 * The key should be a valid {@linkcode DataKey} and the value must be a valid
 * {@linkcode DataValue}. Some of the values may be `null` or `undefined`.
 *
 * Note that the `HTMLElement.dataset` property is a
 * [DOMStringMap](https://developer.mozilla.org/en-US/docs/Web/API/DOMStringMap).
 */
export type Data = Record<string, DataValue | null | undefined>;
