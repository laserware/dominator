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
    const selectOptions = toSelectOptions(options.withAttributes);
    selector += selectAttributes(selectOptions);
  }

  if (isNotNil(options.withDataset)) {
    const selectOptions = toSelectOptions(options.withDataset);
    selector += selectDatasetEntries(selectOptions);
  }

  const parent = toElement(options.parent) ?? document;

  return { selector: selectorWithTag(selector, options.tagName), parent };
}

function toSelectOptions(
  value: Record<string, any> | string[] | string,
): Record<string, any> {
  if (typeof value === "string") {
    return { [value]: null };
  }

  if (Array.isArray(value)) {
    const result: Record<string, any> = {};

    for (const name of value) {
      result[name] = null;
    }

    return result;
  }

  return value;
}
