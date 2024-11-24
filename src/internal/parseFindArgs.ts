import { attrsSelector } from "../attrs/attrsSelector.ts";
import {
  AttrValue,
  Elem,
  type Attrs,
  type CssSelector,
  type ElemOrCssSelector,
} from "../types.ts";

import { FindOptions } from "./findOptions.ts";

/**
 * Parses the args passed to the {@linkcode findElem} and {@linkcode findAllElems}
 * functions to find elements in the DOM.
 */
export function parseFindArgs(
  firstArg: FindOptions | CssSelector | Attrs | string,
  valueOrParent: Elem | null | AttrValue | undefined = document,
  parent?: Elem | null,
): { selector: string; validParent: ElemOrCssSelector } {
  const validParent = parent ?? document;

  if (typeof firstArg === "string") {
    if (Elem.is(valueOrParent)) {
      return { selector: firstArg, validParent: valueOrParent };
    }

    if (AttrValue.is(valueOrParent)) {
      return {
        selector: attrsSelector({ [firstArg]: valueOrParent }),
        validParent: parent ?? document,
      };
    }

    if (valueOrParent === undefined) {
      return { selector: attrsSelector({ [firstArg]: null }), validParent };
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

  return { selector: attrsSelector(firstArg), validParent };
}
