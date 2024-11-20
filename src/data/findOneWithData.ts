import { isNotNil } from "@laserware/arcade";

import { findOne } from "../elem/findOne.ts";
import { toElem } from "../elem/toElem.ts";
import {
  isPrimitive,
  type AttrValue,
  type ElemOrCssSelector,
  type NullOr,
} from "../types.ts";

import { dataSelector } from "./dataSelector.ts";

/**
 * Query the DOM for the element with the specified dataset name and optionally
 * value.
 */
export function findOneWithData<E extends Element = HTMLElement>(
  key: string,
  value?: string | number | boolean,
): NullOr<E>;
export function findOneWithData<E extends Element = HTMLElement>(
  key: string,
  parent?: ElemOrCssSelector,
): NullOr<E>;
export function findOneWithData<E extends Element = HTMLElement>(
  key: string,
  value?: AttrValue,
  parent?: ElemOrCssSelector,
): NullOr<E>;
export function findOneWithData<E extends Element = HTMLElement>(
  key: string,
  valueOrParent?: ElemOrCssSelector | AttrValue,
  parent?: ElemOrCssSelector,
): NullOr<E> {
  const valueOrParentElem = toElem(valueOrParent as string);

  const parentElem = toElem(parent) ?? valueOrParentElem;

  // The valueOrParent argument was a CSS selector or an element, so we know
  // the `data-` selector is for the key only:
  if (typeof valueOrParent === "string" && isNotNil(valueOrParentElem)) {
    const selector = dataSelector(key);

    return findOne(selector, parentElem);
  }

  if (isPrimitive(valueOrParent)) {
    const selector = dataSelector(key, valueOrParent);

    return findOne(selector, parentElem);
  }

  return null;
}
