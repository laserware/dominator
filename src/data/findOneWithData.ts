import { dataSelector } from "./dataSelector";
import { findOne } from "../findOne";
import { isPrimitive } from "../internal/typeGuards";
import type { ElemOrSelectInput } from "../types";

/**
 * Query the DOM for the element with the specified dataset name and optionally
 * value.
 */
export function findOneWithData<T extends Element = HTMLElement>(
  keyOrAttrName: string,
  value?: string | number | boolean,
): T | null;
export function findOneWithData<T extends Element = HTMLElement>(
  keyOrAttrName: string,
  parent?: ElemOrSelectInput,
): T | null;
export function findOneWithData<T extends Element = HTMLElement>(
  keyOrAttrName: string,
  value?: string | number | boolean,
  parent?: ElemOrSelectInput,
): T | null;
export function findOneWithData<T extends Element = HTMLElement>(
  keyOrAttrName: string,
  valueOrParent?: ElemOrSelectInput | number | boolean | string,
  parent?: ElemOrSelectInput,
): T | null {
  if (isPrimitive(valueOrParent)) {
    const selector = dataSelector(keyOrAttrName, valueOrParent);

    return findOne(selector, parent);
  } else {
    const selector = dataSelector(keyOrAttrName);

    return findOne(selector, valueOrParent);
  }
}
