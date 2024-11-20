import { isPlainObject } from "@laserware/arcade";

import { attrSelector } from "../attrs/attrSelector.ts";
import { dataSelector } from "../data/dataSelector.ts";
import { toElem } from "../elem/toElem.ts";
import type {
  AnyElementTagName,
  AttrName,
  Attrs,
  AttrValue,
  CssSelector,
  Dataset,
  Elem,
  ElemOrCssSelector,
  NilOr,
} from "../types.ts";

/** Find element(s) matching the specified CSS selector. */
export interface FindWithSelectorOptions {
  /** CSS selector search string. */
  withSelector: CssSelector;

  /** Optional parent `Element`, `EventTarget`, or CSS selector. */
  parent?: NilOr<ElemOrCssSelector>;
}

/**
 * Find `Element(s)` with attribute name matching the specified key
 * field. If a value is specified, it is included in the CSS selector.
 */
export interface FindWithAttrOptions {
  /** Name of the attribute. */
  withName: AttrName;

  /** Optional value of the attribute. */
  withValue?: AttrValue;

  /** Optional parent `Element`, `EventTarget`, or CSS selector. */
  parent?: NilOr<ElemOrCssSelector>;

  /** Optional `Element` tag to limit search. */
  tag?: AnyElementTagName;
}

/**
 * Find `Element(s)` with the specified attributes. For attributes that don't
 * have a value, use `null`.
 */
export interface FindWithAttrsOptions {
  /** Key/value pairs of attributes. */
  withAttrs: Attrs;

  /** Optional parent `Element`, `EventTarget`, or CSS selector. */
  parent?: NilOr<ElemOrCssSelector>;

  /** Optional `Element` tag to limit search. */
  tag?: AnyElementTagName;
}

/**
 * Find `Element(s)` with the specified dataset. For `data-` attributes that
 * don't have a value, use `null`.
 */
export interface FindWithDataOptions {
  /** Key/value pairs of dataset to search for. */
  withData: Dataset;

  /** Optional parent `Element`, `EventTarget`, or CSS selector. */
  parent?: NilOr<ElemOrCssSelector>;

  /** Optional `Element` tag to limit search. */
  tag?: AnyElementTagName;
}

/**
 * Options for finding `Element(s)`. You can find elements by selector, name/value
 * pair for an attribute, or a set of attributes.
 *
 * Note that the search fields use a `with*` prefix to ensure they don't
 * accidentally get treated as HTML/SVG attributes.
 */
export type FindOptions =
  | FindWithAttrOptions
  | FindWithAttrsOptions
  | FindWithDataOptions
  | FindWithSelectorOptions;

export interface FindOptionsParseResult {
  selector: string;
  parent: Elem;
}

export namespace FindOptions {
  /**
   * Returns true if the specified `value` is an object of type {@linkcode FindOptions}.
   */
  export function is(value: any): value is FindOptions {
    if (!isPlainObject(value)) {
      return false;
    }

    return (
      "withAttrs" in value ||
      "withData" in value ||
      "withName" in value ||
      "withSelector" in value
    );
  }

  /**
   * Parses the specified `options` and returns the corresponding `selector`
   * and `parent` based on which type of `options` were specified.
   *
   * @param options {@linkcode FindOptions} instance to parse.
   */
  export function parse(options: FindOptions): FindOptionsParseResult {
    let selector: string | null = null;

    if ("withSelector" in options) {
      selector = options.withSelector;
    }

    if ("withName" in options) {
      selector = attrSelector(options.withName, options.withValue, options.tag);
    }

    if ("withAttrs" in options) {
      selector = attrSelector(options.withAttrs, options.tag);
    }

    if ("withData" in options) {
      selector = dataSelector(options.withData, options.tag);
    }

    if (selector === null) {
      throw new Error("Unable to parse find options");
    }

    const parent = toElem(options.parent) ?? document;

    return { selector, parent };
  }
}
