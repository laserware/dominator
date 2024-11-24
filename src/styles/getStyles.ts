import { isNotNil, isNil } from "@laserware/arcade";

import { InvalidElemError } from "../elem/InvalidElemError.ts";
import { toElem } from "../elem/toElem.ts";

import { parseDOMValue } from "../internal/parseDOMValue.ts";
import type {
  ElemOrCssSelector,
  NullOr,
  StyleKey,
  StyleValue,
  Styles,
  KeysOf,
} from "../types.ts";
import { formatList } from "../internal/formatList.ts";

export function getStyle<T extends StyleValue>(
  target: NullOr<ElemOrCssSelector>,
  key: StyleKey,
  fallback?: T,
): NullOr<T> {
  const elem = toElem(target);
  if (elem === null || !("style" in elem)) {
    throw new InvalidElemError(`Unable to get style value for ${key}`);
  }

  return getSingleStyle<T>(elem, key, fallback);
}

export function getStyles<T extends Styles = any>(
  target: NullOr<ElemOrCssSelector>,
  keys: KeysOf<T>,
  fallback?: Partial<T>,
): T {
  const elem = toElem(target);
  if (elem === null || !("style" in elem)) {
    // prettier-ignore
    throw new InvalidElemError(`Unable to get style values for ${formatList(keys)}`);
  }

  const styles: Record<string, any> = {};

  const validFallback = (fallback ?? {}) as Partial<T>;

  for (const key of keys) {
    styles[key] = getSingleStyle(elem, key, validFallback[key]);
  }

  return styles as unknown as T;
}

function getSingleStyle<T extends StyleValue>(
  element: HTMLElement,
  key: StyleKey,
  fallback?: T,
): NullOr<T> {
  // @ts-ignore I know `key` is a valid key for styles. If it wasn't we return the fallback.
  const styleValue = element.style[key] ?? fallback ?? null;

  if (isNotNil(styleValue)) {
    return parseDOMValue<T>(styleValue);
  } else {
    return null;
  }
}
