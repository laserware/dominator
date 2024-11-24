import { InvalidElemError } from "../elem/InvalidElemError.ts";
import { toElem } from "../elem/toElem.ts";

import { parseDOMValue } from "../internal/domValues.ts";
import { formatForError } from "../internal/formatForError.ts";
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
): T | undefined {
  const elem = toElem(target);
  if (elem === null || !("style" in elem)) {
    throw new InvalidElemError(`Unable to get style value for ${key}`);
  }

  return getSingleStyle<T>(elem, key);
}

export function getStyles<T extends Styles = Styles>(
  target: ElemOrCssSelector,
  keys: KeysOf<T>,
): Partial<T> {
  const elem = toElem(target);
  if (elem === null || !("style" in elem)) {
    // prettier-ignore
    throw new InvalidElemError(`Unable to get style values for ${formatForError(keys)}`);
  }

  const styles: Partial<T> = {};

  for (const key of keys) {
    // @ts-ignore
    styles[key] = getSingleStyle(elem, key);
  }

  return styles;
}

function getSingleStyle<T extends StyleValue>(
  element: HTMLElement,
  key: StyleKey,
): T | undefined {
  // @ts-ignore I know `key` is a valid key for styles. If it wasn't we return `undefined`.
  const styleValue = element.style[key];

  return parseDOMValue<T>(styleValue) ?? undefined;
}
