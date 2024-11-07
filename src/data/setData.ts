import { isNil } from "@laserware/arcade";

import { InvalidElemError } from "../elem/InvalidElemError.ts";
import { toElem } from "../elem/toElem.ts";
import type {
  Attrs,
  AttrValue,
  ElemOrCssSelector,
  Maybe,
  NullOr,
} from "../types.ts";

import { validDataKey } from "./dataNames.ts";

/**
 * Assigns the specified value to the specified dataset key in the specified
 * element.
 *
 * @param input Element, EventTarget, or selector for element.
 * @param key Key or attribute name for the dataset entry.
 * @param value Value to set for associated key or attribute name.
 */
export function setData<E extends Element = HTMLElement>(
  input: ElemOrCssSelector,
  key: string,
  value: AttrValue,
): NullOr<E>;

/**
 * Assigns the specified value to the specified dataset key in the specified
 * element.
 *
 * @param input Element, EventTarget, or selector for element.
 * @param attrs Object with key of dataset key and value of entry value.
 */
export function setData<E extends Element = HTMLElement>(
  input: ElemOrCssSelector,
  attrs: Attrs,
): NullOr<E>;

export function setData<E extends Element = HTMLElement>(
  input: ElemOrCssSelector,
  keyOrAttrs: string | Attrs,
  value?: AttrValue,
): NullOr<E> {
  const elem = toElem<E>(input);
  if (elem === null) {
    // prettier-ignore
    throw new InvalidElemError(`Unable to set dataset value`);
  }

  if (typeof keyOrAttrs === "string") {
    setElemData(elem, keyOrAttrs, value);
  } else {
    const entries = Object.entries(keyOrAttrs);

    for (const [name, value] of entries) {
      setElemData(elem, name, value);
    }
  }

  return elem;
}

function setElemData(
  elem: Element,
  key: string,
  value?: Maybe<AttrValue>,
): void {
  const validKey = validDataKey(key);

  if (isNil(value)) {
    (elem as HTMLElement).dataset[validKey] = "";
  } else {
    (elem as HTMLElement).dataset[validKey] = value.toString();
  }
}
