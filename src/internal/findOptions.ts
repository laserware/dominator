import { isNotNil } from "@laserware/arcade";

import { attrsSelector } from "../attr/attrsSelector.ts";
import { dataSelector } from "../data/dataSelector.ts";
import { toElem } from "../elem/toElem.ts";
import type {
  Attrs,
  CssSelector,
  Data,
  Elem,
  ElemOrCssSelector,
  TagName,
} from "../types.ts";

import { selectorWithTag } from "./selectorWithTag.ts";

/**
 * Options for finding Element(s). You can find elements by selector, dataset
 * entries, or attributes.
 *
 * To search for the existence of an attribute or dataset property (not the
 * value), set the value to `null`.
 *
 * @internal
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
  tag?: TagName;
}

/**
 * Parses the specified `options` and returns the corresponding `selector`
 * and `parent` based on which type of `options` were specified.
 *
 * @internal
 *
 * @param options {@linkcode FindOptions} instance to parse.
 */
export function parseFindOptions(options: FindOptions): {
  selector: string;
  parent: Elem;
} {
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

  const parent = toElem(options.parent) ?? document;

  return { selector: selectorWithTag(selector, options.tag), parent };
}
