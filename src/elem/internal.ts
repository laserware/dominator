import { isPlainObject } from "@laserware/arcade";

import { attrSelector } from "../attrs/attrSelector.ts";
import { dataSelector } from "../data/dataSelector.ts";
import {
  isAttrValue,
  isElem,
  type Attrs,
  type AttrValue,
  type CssSelector,
  type Elem,
  type ElemOrCssSelector,
  type FindOptions,
  type Maybe,
  type NullOr,
  type UndefinedOr,
} from "../types.ts";

/**
 * Parses the args passed to the {@link findOne} and {@link findAll} functions
 * to find elements in the DOM.
 */
export function parseFindArgs(
  firstArg: FindOptions | CssSelector | Attrs | string,
  valueOrParent: NullOr<Elem> | UndefinedOr<AttrValue> = document,
  parent?: NullOr<Elem>,
): { selector: string; validParent: ElemOrCssSelector } {
  const validParent = parent ?? document;

  if (typeof firstArg === "string") {
    if (isElem(valueOrParent)) {
      return { selector: firstArg, validParent: valueOrParent };
    }

    if (isAttrValue(valueOrParent)) {
      return {
        selector: attrSelector({ [firstArg]: valueOrParent }),
        validParent: parent ?? document,
      };
    }

    if (valueOrParent === undefined) {
      return { selector: attrSelector({ [firstArg]: null }), validParent };
    }

    return { selector: firstArg, validParent };
  }

  if (isFindOptions(firstArg)) {
    const options = parseFindOptions(firstArg);

    return {
      selector: options.selector,
      validParent: options.parent ?? document,
    };
  }

  return { selector: attrSelector(firstArg), validParent };
}

function isFindOptions(value: any): value is FindOptions {
  if (!isPlainObject(value)) {
    return false;
  }

  return (
    "withSelector" in value ||
    "withKey" in value ||
    "withAttrs" in value ||
    "withData" in value
  );
}

function parseFindOptions(options: FindOptions): {
  selector: string;
  parent: Maybe<ElemOrCssSelector>;
} {
  const validParent = options.parent ?? null;

  const tag = options.tag ?? "";

  if ("withSelector" in options) {
    return { selector: options.withSelector, parent: validParent };
  }

  if ("withKey" in options) {
    const selector = attrSelector(options.withKey, options.withValue, tag);

    return { selector, parent: validParent };
  }

  if ("withAttrs" in options) {
    const selector = attrSelector(options.withAttrs, tag);

    return { selector, parent: validParent };
  }

  if ("withData" in options) {
    const selector = dataSelector(options.withData, tag);

    return { selector, parent: validParent };
  }

  throw new Error("Unable to parse find options");
}
