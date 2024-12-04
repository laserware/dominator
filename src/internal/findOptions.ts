import { isNotNil } from "@laserware/arcade";

import { selectAttributes } from "../attributes/selectAttributes.ts";
import { selectData } from "../data/selectData.ts";
import { toElement } from "../elements/toElement.ts";

import type { ElementLike, FindOptions } from "../elements/types.ts";

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
  parent: ElementLike;
} {
  let selector: string = "";

  if (isNotNil(options.withSelector)) {
    selector += options.withSelector;
  }

  if (isNotNil(options.withAttrs)) {
    selector += selectAttributes(options.withAttrs);
  }

  if (isNotNil(options.withData)) {
    selector += selectData(options.withData);
  }

  const parent = toElement(options.parent) ?? document;

  return { selector: selectorWithTag(selector, options.tagName), parent };
}
