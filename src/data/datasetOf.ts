import { isNotNil } from "@laserware/arcade";

import { asDataAttrName } from "../internal/dataKeys.ts";
import { parseDOMValue, stringifyDOMValue } from "../internal/domValues.ts";
import { elemOrThrow } from "../internal/elemOrThrow.ts";
import type { AttrValue, ElemOrCssSelector, Stringifiable } from "../types.ts";

/**
 * Valid shape for dataset property. The values can be any type that can be
 * stringified.
 */
type AnyDatasetShape = Record<string, Stringifiable | null>;

/**
 * Wrapper for managing the {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset|dataset}
 * property on an element.
 *
 * Trying to work with the `dataset` property using TypeScript is not great. You
 * have to *repeatedly* perform a bunch of type checks, which is tedious and
 * results in overly-verbose code. This class makes it much easier to get and
 * set properties of the `dataset` (which map to the corresponding `data-*`
 * attributes on an element).
 *
 * The `dataset` property is a (very barebones)
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/DOMStringMap|DOMStringMap}.
 * This wrapper class enables you to get and set values of any type that can be
 * stringified while retaining type safety via the generic passed in.
 *
 * @template DS The shape of the dataset data.
 *
 * @class
 */
export class Dataset<DS extends AnyDatasetShape> {
  readonly #element: HTMLElement;

  /**
   * Creates a new instance of a {@linkcode Dataset} class to manage the dataset
   * property of the corresponding `target`. Optionally pass in `initialData`
   * that can fully match the shape specified in the `DS` generic or partially.
   *
   * @template DS The shape of the dataset data.
   *
   * @param target Element, EventTarget, or CSS selector.
   * @param [initialData] Optional full or partial data that corresponds to the dataset shape.
   *
   * @throws {InvalidElemError} If the specified `target` does not exist.
   */
  constructor(target: ElemOrCssSelector, initialData?: Partial<DS>) {
    this.#element = elemOrThrow(target, "Unable to initialize Dataset");

    if (isNotNil(initialData)) {
      this.update(initialData);
    }
  }

  /**
   * Element containing the dataset property being managed.
   */
  public get element(): HTMLElement {
    return this.#element;
  }

  /**
   * Builds an object with all *defined* dataset values. Note that the return value
   * is a `Partial` because the expected shape of the dataset specified in the
   * `DS` generic doesn't necessarily correspond to dataset properties that
   * *exist* on the element.
   *
   * @returns Object with dataset entries that exist.
   */
  public all(): Partial<DS> {
    if ("dataset" in this.#element) {
      const entries: Record<string, AttrValue> = {};

      for (const name of Object.keys(this.#element.dataset)) {
        // @ts-ignore Expects a `Stringifiable`, but can be `null` or `undefined`.
        entries[name] = parseDOMValue(this.#element.dataset[name]);
      }

      return entries as Partial<DS>;
    } else {
      return {};
    }
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
   * specified. You can pass in a subset of the shape of data and only those
   * values will be updated.
   *
   * @param entries Data to update in the dataset.
   */
  public update(entries: Partial<DS>): this {
    for (const key of Object.keys(entries)) {
      this.#dataset[key] = stringifyDOMValue(entries[key]);
    }

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
  public attrNameFor<K extends keyof DS>(key: K): string {
    return asDataAttrName(key as string);
  }

  get #dataset(): DOMStringMap {
    if ("dataset" in this.#element) {
      return this.#element.dataset;
    } else {
      throw new Error("Element does not have dataset property");
    }
  }
}

/**
 * Creates a new {@linkcode Dataset} instance for managing the
 * {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset|dataset}
 * property on the specified `target`. Optionally pass in `initialData`
 * that can fully or partially match the shape specified in the `DS` generic.
 *
 * @template DS The shape of the dataset data.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param [initialData] Optional full or partial data that corresponds to the dataset shape.
 *
 * @returns Dataset instance associated with `target`.
 */
export function datasetOf<DS extends AnyDatasetShape>(
  target: Element | ElemOrCssSelector,
  initialData?: Partial<DS>,
): Dataset<DS> {
  return new Dataset<DS>(target, initialData);
}
