import { attrSelector } from "../attrs/attrSelector.ts";
import {
  AttrValue,
  Elem,
  type Attrs,
  type CssSelector,
  type ElemOrCssSelector,
  type NullOr,
  type UndefinedOr,
} from "../types.ts";

import { FindOptions } from "./findOptions.ts";

/**
 * Parses the args passed to the {@link findElem} and {@link findAllElems}
 * functions to find elements in the DOM.
 */
export function parseFindArgs(
  firstArg: FindOptions | CssSelector | Attrs | string,
  valueOrParent: NullOr<Elem> | UndefinedOr<AttrValue> = document,
  parent?: NullOr<Elem>,
): { selector: string; validParent: ElemOrCssSelector } {
  const validParent = parent ?? document;

  if (typeof firstArg === "string") {
    if (Elem.is(valueOrParent)) {
      return { selector: firstArg, validParent: valueOrParent };
    }

    if (AttrValue.is(valueOrParent)) {
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

  if (FindOptions.is(firstArg)) {
    const options = FindOptions.parse(firstArg);

    return {
      selector: options.selector,
      validParent: options.parent ?? document,
    };
  }

  return { selector: attrSelector(firstArg), validParent };
}
