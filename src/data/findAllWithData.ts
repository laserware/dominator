import { isNotNil } from "@laserware/arcade";

import { findAll } from "../elem/findAll.ts";
import { toElem } from "../elem/toElem.ts";
import {
  isPrimitive,
  type AttrValue,
  type ElemOrCssSelector,
} from "../types.ts";

import { dataSelector } from "./dataSelector.ts";

/**
 * Query the DOM for the element with the specified dataset name and optionally
 * value.
 */
export function findAllWithData<E extends Element = HTMLElement>(
  key: string,
  value?: AttrValue,
): E[];
export function findAllWithData<E extends Element = HTMLElement>(
  key: string,
  parent?: ElemOrCssSelector,
): E[];
export function findAllWithData<E extends Element = HTMLElement>(
  key: string,
  value?: AttrValue,
  parent?: ElemOrCssSelector,
): E[];
export function findAllWithData<E extends Element = HTMLElement>(
  key: string,
  valueOrParent?: ElemOrCssSelector | AttrValue,
  parent?: ElemOrCssSelector,
): E[] {
  const valueOrParentElem = toElem(valueOrParent as string);

  const parentElem = toElem(parent) ?? valueOrParentElem;

  // The valueOrParent argument was a CSS selector or an element, so we know
  // the `data-` selector is for the key only:
  if (typeof valueOrParent === "string" && isNotNil(valueOrParentElem)) {
    const selector = dataSelector(key);

    return findAll(selector, parentElem);
  }

  if (isPrimitive(valueOrParent)) {
    const selector = dataSelector(key, valueOrParent);

    return findAll(selector, parentElem);
  }

  return [];
}
