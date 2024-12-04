import { cast, isNotNil } from "@laserware/arcade";

import type { AttributeValue } from "../attributes/types.ts";
import type { ElementOf, TagName } from "../dom.ts";
import { toElementOrThrow } from "../elements/toElement.ts";
import type { Target } from "../elements/types.ts";
import { parseDOMValue, stringifyDOMValue } from "../internal/domValues.ts";

import { asDatasetAttributeName } from "./datasetKeys.ts";
import { removeDatasetEntry } from "./removeDataset.ts";
import type { DatasetValue } from "./types.ts";

/**
 * Valid shape for [dataset](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset) property.
 * The values can be any type that can be stringified. Used for defining the shape
 * in the {@linkcode DatasetWrapper} class.
 */
export type AnyDatasetShape = Record<string, DatasetValue | null>;

/**
 * Wrapper for managing the [dataset](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset)
 * property on an element.
 *
 * Trying to work with the `dataset` property using TypeScript is not great. You
 * have to _repeatedly_ perform a bunch of type checks, which is tedious and
 * results in overly-verbose code. This class makes it much easier to get and
 * set properties of the `dataset` (which map to the corresponding `data-*`
 * attributes on an element).
 *
 * The `dataset` property is a (very barebones) [DOMStringMap](https://developer.mozilla.org/en-US/docs/Web/API/DOMStringMap).
 * This wrapper class enables you to get and set values of any type that can be
 * stringified while retaining type safety via the `DS` generic passed in.
 *
 * See usage examples in {@linkcode wrapDataset}.
 *
 * @template DS The shape of the dataset data.
 * @template TN Tag name of element with which the dataset is associated.
 *
 * @class
 */
export class DatasetWrapper<
  DS extends AnyDatasetShape,
  TN extends TagName = "*",
> {
  readonly #element: ElementOf<TN>;

  /**
   * Creates a new instance of a {@linkcode DatasetWrapper} class to manage the dataset
   * property of the corresponding `target`. Optionally pass in `initialData`
   * that can fully match the shape specified in the `DS` generic or partially.
   *
   * @template DS The shape of the dataset data.
   *
   * @param target Element, EventTarget, or CSS selector.
   * @param [initialData] Optional full or partial dataset that corresponds to the dataset shape.
   *
   * @throws {@linkcode elements!InvalidElementError} if the specified `target` wasn't found.
   */
  constructor(target: Target<TN>, initialData?: Partial<DS>) {
    // prettier-ignore
    this.#element = toElementOrThrow<TN>(target, "Unable to initialize Dataset");

    if (isNotNil(initialData)) {
      this.setAll(initialData);
    }
  }

  /**
   * Element containing the dataset property being managed.
   */
  public get element(): ElementOf<TN> {
    return this.#element;
  }

  /**
   * Returns the value of the dataset entry with matching `key`.
   *
   * @param key Key of the dataset entry to get.
   *
   * @returns Dataset property value associated with the specified `key`.
   */
  public get<K extends keyof DS>(key: K): DS[K] | undefined {
    // @ts-ignore The return value type will match the valid values in the shape.
    return parseDOMValue(this.#dataset[key]);
  }

  /**
   * Builds an object with all **defined** dataset attribute values. Note that the
   * return value is a `Partial` because the expected shape of the dataset
   * specified in the `DS` generic doesn't necessarily correspond to dataset
   * properties that _exist_ on the element.
   *
   * @returns Object with dataset entries that exist.
   *
   * @example
   * **HTML**
   *
   * ```html
   * <div id="example" data-count="20">Example</div>
   * ```
   *
   * **Code**
   *
   * ```ts
   * const element = findElement("#example");
   *
   * const data = wrapDataset<{ count: number; label: string }>(element);
   *
   * // Note that `label` is missing because there is no `data-label` attribute
   * // on the specified element:
   * const entries = data.getAll();
   * // { count: 20 }
   * ```
   */
  public getAll(): Partial<DS> {
    const dataset = this.#dataset;

    const entries: Record<string, AttributeValue> = {};

    for (const name of Object.keys(dataset)) {
      // @ts-ignore Expects a `Stringifiable`, but can be `null` or `undefined`.
      entries[name] = parseDOMValue(dataset[name]);
    }

    return cast<Partial<DS>>(entries);
  }

  /**
   * Sets the dataset entry with the specified `key` to the specified `value`.
   *
   * @param key Key of the dataset entry to update.
   * @param value Value to set for the dataset entry.
   */
  public set<K extends keyof DS>(key: K, value: DS[K]): this {
    this.#dataset[key as string] = stringifyDOMValue(value);

    return this;
  }

  /**
   * Updates the element's dataset property values to match the `entries` object
   * specified. You can pass in a subset of the shape of dataset and only those
   * values will be updated.
   *
   * @param entries Data to update in the dataset.
   */
  public setAll(entries: Partial<DS>): this {
    for (const key of Object.keys(entries)) {
      this.#dataset[key] = stringifyDOMValue(entries[key]);
    }

    return this;
  }

  /**
   * Removes the dataset entry associated with the specified `key`.
   *
   * @param key Key of the dataset entry to remove.
   */
  public remove<K extends keyof DS>(key: K): this {
    removeDatasetEntry(this.#element, key as string);

    return this;
  }

  /**
   * Gets the element attribute name (i.e. `data-<key>`) for the specified
   * `key`.
   *
   * @param key Dataset key for which to get attribute.
   *
   * @returns Dataset attribute name associated with the specified `key`.
   */
  public attributeNameFor<K extends keyof DS>(key: K): string {
    return asDatasetAttributeName(key as string);
  }

  get #dataset(): DOMStringMap {
    /* istanbul ignore else -- @preserve: I'm pretty sure this is impossible, but the check can't hurt. */
    if ("dataset" in this.#element) {
      // @ts-ignore
      return this.#element.dataset;
    } else {
      throw new Error("Element does not have dataset property");
    }
  }
}

/**
 * Creates a new {@linkcode DatasetWrapper} instance for managing the
 * [dataset](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset)
 * property on the `target` element. Optionally pass in `initialData`
 * that can fully or partially match the shape specified in the `DS` generic.
 *
 * @template DS The shape of the dataset data.
 * @template TN Tag name of element with which the dataset is associated.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param [initialData] Optional full or partial dataset that corresponds to the dataset shape.
 *
 * @returns {@linkcode DatasetWrapper} instance associated with `target`.
 *
 * @example
 * **HTML (Before)**
 *
 * ```html
 * <div
 *   id="example"
 *   data-is-active="false"
 *   data-count="30"
 *   data-label="Example"
 * >
 *   ...
 * </div>
 * ```
 *
 * **Code**
 *
 * ```ts
 * const element = findElement("#example")!;
 *
 * type Shape = {
 *   isActive: boolean;
 *   isInvalid: boolean | undefined;
 *   count: number;
 *   label: string;
 *   status: string | undefined;
 * }
 *
 * // You can pass in initial dataset which will be added to the element's
 * // dataset (as well as set as attributes on the element).
 * const dataset = wrapDataset<Shape>(element, {
 *   isActive: false,
 *   count: 30,
 *   label: "Example",
 * });
 *
 * // Returns the value for the specified key:
 * dataset.get("count");
 * // 30
 *
 * // `set` returns the `Dataset` instance so you can perform
 * // other operations:
 * dataset
 *   .set("count", 40)
 *   .get("count");
 * // 40
 *
 * // Remove from the element:
 * dataset.remove("label");
 *
 * // Update existing entry or add new one if not present:
 * dataset.set("status", "warning");
 *
 * // Sets multiple entries on element:
 * dataset.setAll({ isActive: true, isInvalid: false });
 *
 * // Returns an object matching `Shape`:
 * dataset.getAll();
 * // { isActive: true, isInvalid: false, count: 40, status: "warning" }
 *
 * // Get attribute name for an entry:
 * dataset.attributeNameFor("isActive");
 * // "data-is-active"
 * ```
 *
 * **HTML (After)**
 *
 * ```html
 * <div
 *   id="example"
 *   data-is-active="true"
 *   data-is-invalid="false"
 *   data-count="40"
 *   data-status="warning"
 * >
 *   ...
 * </div>
 * ```
 */
export function wrapDataset<
  DS extends AnyDatasetShape,
  TN extends TagName = "*",
>(target: Element | Target, initialData?: Partial<DS>): DatasetWrapper<DS, TN> {
  return new DatasetWrapper<DS, TN>(target, initialData);
}
