import { InvalidElemError } from "../elem/InvalidElemError.ts";
import { toElem } from "../elem/toElem.ts";

import { cast } from "../internal/cast.ts";
import { formatForError } from "../internal/formatForError.ts";
import { parseDOMValue } from "../internal/parseDOMValue.ts";
import type {
  ElemOrCssSelector,
  KeysOf,
  StyleKey,
  Styles,
  StyleValue,
} from "../types.ts";

export function getStyle<T extends StyleValue>(
  target: ElemOrCssSelector,
  key: StyleKey,
  fallback?: T,
): T | undefined {
  const elem = toElem(target);
  if (elem === null || !("style" in elem)) {
    throw new InvalidElemError(`Unable to get style value for ${key}`);
  }

  return getSingleStyle<T>(elem, key, fallback);
}

export function getStyles<T extends Styles = any>(
  target: ElemOrCssSelector,
  keys: KeysOf<T>,
  fallback?: Partial<T>,
): Partial<T> {
  const elem = toElem(target);
  if (elem === null || !("style" in elem)) {
    // prettier-ignore
    throw new InvalidElemError(`Unable to get style values for ${formatForError(keys)}`);
  }

  const styles: Record<string, any> = {};

  const validFallback = (fallback ?? {}) as Partial<T>;

  for (const key of keys) {
    // @ts-ignore
    styles[key] = getSingleStyle(elem, key, validFallback[key]);
  }

  return cast<Partial<T>>(styles);
}

function getSingleStyle<T extends StyleValue>(
  element: HTMLElement,
  key: StyleKey,
  fallback?: T,
): T | undefined {
  // @ts-ignore I know `key` is a valid key for styles. If it wasn't we return the fallback.
  const styleValue = element.style[key];

  return parseDOMValue<T>(styleValue) ?? fallback ?? undefined;
}