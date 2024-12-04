import { isNotNil } from "@laserware/arcade";

import { selectAttributes } from "../attributes/selectAttributes.ts";
import { selectDatasetEntries } from "../dataset/selectDataset.ts";

import { selectorWithTag } from "../internal/selectorWithTag.ts";

import { toElement } from "./toElement.ts";

import type { ElementLike, FindOptions } from "./types.ts";

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

  if (isNotNil(options.withAttributes)) {
    selector += selectAttributes(options.withAttributes);
  }

  if (isNotNil(options.withDataset)) {
    selector += selectDatasetEntries(options.withDataset);
  }

  const parent = toElement(options.parent) ?? document;

  return { selector: selectorWithTag(selector, options.tagName), parent };
}
