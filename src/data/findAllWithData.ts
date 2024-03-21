import { dataSelector } from "./dataSelector";
import { findAll } from "../findAll";
import { isPrimitive } from "../internal/typeGuards";
import type { ElemOrSelectInput } from "../types";

/**
 * Query the DOM for the element with the specified dataset name and optionally
 * value.
 */
export function findAllWithData<T extends Element = HTMLElement>(
  keyOrAttrName: string,
  input?: string | number | boolean,
): T[];
export function findAllWithData<T extends Element = HTMLElement>(
  keyOrAttrName: string,
  parent?: ElemOrSelectInput,
): T[];
export function findAllWithData<T extends Element = HTMLElement>(
  keyOrAttrName: string,
  input?: string | number | boolean,
  parent?: ElemOrSelectInput,
): T[];
export function findAllWithData<T extends Element = HTMLElement>(
  keyOrAttrName: string,
  inputOrParent?: ElemOrSelectInput | number | boolean | string,
  parent?: ElemOrSelectInput,
): T[] {
  if (isPrimitive(inputOrParent)) {
    const selector = dataSelector(keyOrAttrName, inputOrParent);

    return findAll(selector, parent);
  } else {
    const selector = dataSelector(keyOrAttrName);

    return findAll(selector, inputOrParent);
  }
}
