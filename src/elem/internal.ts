import { isNotNil, isPlainObject } from "@laserware/arcade";

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
    isNotNil(value.selector) || isNotNil(value.key) || isNotNil(value.attrs)
  );
}

function parseFindOptions(options: Record<string, any>): {
  selector: string;
  parent: Maybe<ElemOrCssSelector>;
} {
  const validParent = options.parent ?? null;

  if (options.selector) {
    return { selector: options.selector, parent: validParent };
  }

  if (options.key) {
    const selector = dataSelector(options.key, options.value);

    return { selector, parent: validParent };
  }

  if (options.attrs) {
    const selector = attrSelector(options.attrs);

    return { selector, parent: validParent };
  }

  throw new Error("Unable to parse find options");
}
