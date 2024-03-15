import { dataSelector } from "./dataSelector";
import { isPrimitive } from "../internal/typeGuards";
import { oneMatching } from "../oneMatching";
import type { ElemOrSelectInput } from "../types";

/**
 * Query the DOM for the element with the specified dataset name and optionally
 * value.
 */
export function oneWithDataMatching<T extends Element = HTMLElement>(
  keyOrAttrName: string,
  value?: string | number | boolean,
): T | null;
export function oneWithDataMatching<T extends Element = HTMLElement>(
  keyOrAttrName: string,
  parent?: ElemOrSelectInput,
): T | null;
export function oneWithDataMatching<T extends Element = HTMLElement>(
  keyOrAttrName: string,
  value?: string | number | boolean,
  parent?: ElemOrSelectInput,
): T | null;
export function oneWithDataMatching<T extends Element = HTMLElement>(
  keyOrAttrName: string,
  valueOrParent?: ElemOrSelectInput | number | boolean | string,
  parent?: ElemOrSelectInput,
): T | null {
  if (isPrimitive(valueOrParent)) {
    const selector = dataSelector(keyOrAttrName, valueOrParent);

    return oneMatching(selector, parent);
  } else {
    const selector = dataSelector(keyOrAttrName);

    return oneMatching(selector, valueOrParent);
  }
}
