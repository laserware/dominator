import { isNotNil } from "@laserware/arcade";

import { InvalidElemError } from "../elem/InvalidElemError.ts";
import { toElem } from "../elem/toElem.ts";
import { stringifyAttributeValue } from "../internal/stringifyAttributeValue.ts";
import { toAttrValue } from "../internal/toAttrValue.ts";
import { validDataAttrName } from "../internal/validDataAttrName.ts";
import type { AttrValue, ElemOrCssSelector, NullOr } from "../types.ts";

/**
 * Valid shape for dataset property. The values can be any type that can be
 * stringified.
 */
type AnyDatasetShape = Record<string, any>;

/**
 * Wrapper for managing the {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset|dataset}
 * property on an element.
 *
 * Trying to work with the dataset property using TypeScript is not great. You
 * have to *repeatedly* perform a bunch of type checks, which is tedious and
 * results in overly-verbose code. This class makes it much easier to get and
 * set properties of the dataset (which map to the corresponding `data-*`
 * attributes on an element).
 *
 * The dataset property is a (very barebones)
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
   * Creates a new instance of a {@link Dataset} class to manage the dataset
   * property of the corresponding `target`. Optionally pass in `initialData`
   * that can fully match the shape specified in the `DS` generic or partially.
   *
   * @param target Element, EventTarget, or CSS selector.
   * @param [initialData] Optional full or partial data that corresponds to the dataset shape.
   */
  constructor(target: NullOr<ElemOrCssSelector>, initialData?: Partial<DS>) {
    const element = toElem<HTMLElement>(target);

    if (element === null) {
      throw new InvalidElemError("Unable to get element");
    }

    this.#element = element;

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
   * Returns an object with all the dataset values.
   */
  public all(): DS {
    if ("dataset" in this.#element) {
      const entries: Record<string, NullOr<AttrValue>> = {};

      for (const name of Object.keys(this.#element.dataset)) {
        entries[name] = toAttrValue(this.#element.dataset[name]);
      }

      return entries as DS;
    } else {
      return {} as DS;
    }
  }

  /**
   * Returns the value of the dataset entry with matching `key`.
   *
   * @param key Key of the dataset entry to get.
   */
  public get<K extends keyof DS>(key: K): NullOr<DS[K]> {
    return toAttrValue(this.#dataset[key]);
  }

  /**
   * Sets the dataset entry with the specified `key` to the specified `value`.
   *
   * @param key Key of the dataset entry to update.
   * @param value Value to set for the dataset entry.
   */
  public set<K extends keyof DS>(key: K, value: DS[K]): this {
    this.#dataset[key as string] = stringifyAttributeValue(value);

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
      this.#dataset[key] = stringifyAttributeValue(entries[key]);
    }

    return this;
  }

  /**
   * Returns the element attribute name (i.e. `data-<key>`) for the specified
   * `key`.
   *
   * @param key Dataset key for which to get attribute.
   */
  public attrNameFor<K extends keyof DS>(key: K): string {
    return validDataAttrName(key as string);
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
 * Returns a new {@link Dataset} instance for managing the {@link https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset|dataset}
 * property on the specified `target`. Optionally pass in `initialData`
 * that can fully match the shape specified in the `DS` generic or partially.
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param [initialData] Optional full or partial data that corresponds to the dataset shape.
 */
export function datasetOf<DS extends AnyDatasetShape>(
  target: NullOr<Element | ElemOrCssSelector>,
  initialData?: Partial<DS>,
): Dataset<DS> {
  return new Dataset<DS>(target, initialData);
}
