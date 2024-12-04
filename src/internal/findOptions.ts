import { isNotNil } from "@laserware/arcade";

import { selectAttrs } from "../attrs/selectAttrs.ts";
import { selectData } from "../data/selectData.ts";
import { toElem } from "../elems/toElem.ts";

import type { Elem, FindOptions } from "../elems/types.ts";

import { selectorWithTag } from "./selectorWithTag.ts";

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
    selector += selectAttrs(options.withAttrs);
  }

  if (isNotNil(options.withData)) {
    selector += selectData(options.withData);
  }

  const parent = toElem(options.parent) ?? document;

  return { selector: selectorWithTag(selector, options.tagName), parent };
}
