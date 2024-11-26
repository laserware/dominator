import { isNotNil, isPlainObject } from "@laserware/arcade";

import { attrsSelector } from "../attrs/attrsSelector.ts";
import { dataSelector } from "../data/dataSelector.ts";
import { toElem } from "../elem/toElem.ts";
import type {
  AnyElementTagName,
  Attrs,
  CssSelector,
  Data,
  Elem,
  ElemOrCssSelector,
} from "../types.ts";

import { selectorWithTag } from "./selectorWithTag.ts";

/**
 * Options for finding Element(s). You can find elements by selector, dataset
 * entries, or attributes.
 *
 * To search for the existence of an attribute or dataset property (not the
 * value), set the value to `null`.
 */
export interface FindOptions {
  /** CSS selector search string. */
  withSelector?: CssSelector;

  /** Key/value pairs of attributes to search for. */
  withAttrs?: Attrs;

  /** Key/value pairs of dataset entries to search for. */
  withData?: Data;

  /** Optional parent Element, EventTarget, or CSS selector. */
  parent?: ElemOrCssSelector | null | undefined;

  /** Optional Element tag to limit search. */
  tag?: AnyElementTagName;
}

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
      "withAttrs" in value || "withData" in value || "withSelector" in value
    );
  }

  /**
   * Parses the specified `options` and returns the corresponding `selector`
   * and `parent` based on which type of `options` were specified.
   *
   * @param options {@linkcode FindOptions} instance to parse.
   */
  export function parse(options: FindOptions): FindOptionsParseResult {
    let selector: string = "";

    if (isNotNil(options.withSelector)) {
      selector += options.withSelector;
    }

    if (isNotNil(options.withAttrs)) {
      selector += attrsSelector(options.withAttrs);
    }

    if (isNotNil(options.withData)) {
      selector += dataSelector(options.withData);
    }

    if (selector === "") {
      throw new Error("Unable to parse find options");
    }

    const parent = toElem(options.parent) ?? document;

    return { selector: selectorWithTag(selector, options.tag), parent };
  }
}
