import { dataSelector } from "./dataSelector";
import { allMatching } from "../allMatching";
import { isPrimitive } from "../internal/typeGuards";
import type { ElemOrSelectInput } from "../types";

/**
 * Query the DOM for the element with the specified dataset name and optionally
 * value.
 */
export function allWithDataMatching<T extends Element = HTMLElement>(
  keyOrAttrName: string,
  input?: string | number | boolean,
): T[];
export function allWithDataMatching<T extends Element = HTMLElement>(
  keyOrAttrName: string,
  parent?: ElemOrSelectInput,
): T[];
export function allWithDataMatching<T extends Element = HTMLElement>(
  keyOrAttrName: string,
  input?: string | number | boolean,
  parent?: ElemOrSelectInput,
): T[];
export function allWithDataMatching<T extends Element = HTMLElement>(
  keyOrAttrName: string,
  inputOrParent?: ElemOrSelectInput | number | boolean | string,
  parent?: ElemOrSelectInput,
): T[] {
  if (isPrimitive(inputOrParent)) {
    const selector = dataSelector(keyOrAttrName, inputOrParent);

    return allMatching(selector, parent);
  } else {
    const selector = dataSelector(keyOrAttrName);

    return allMatching(selector, inputOrParent);
  }
}
