import { cast } from "../internal/cast.ts";
import { elemOrThrow } from "../internal/elemOr.ts";
import { formatForError } from "../internal/formatForError.ts";
import type { CssVarName, ElemOrCssSelector } from "../types.ts";

import { InvalidCssVarError } from "./InvalidCssVarError.ts";

/**
 * Removes the specified CSS variable `name` from the optionally specified
 * `target`.
 *
 * If no `target` is specified, uses {@link https://developer.mozilla.org/en-US/docs/Web/API/Document/documentElement|documentElement}
 * (i.e. `:root`).
 *
 * @template E Type of Element to return.
 *
 * @param name Name of the CSS variable to remove.
 * @param [target] Optional Element, EventTarget, or CSS selector.
 *
 * @returns The Element representation of the specified `target`.
 *
 * @throws {InvalidCssVarError} If the CSS variable could not be removed from `target`.
 * @throws {InvalidElemError} If the specified `target` does not exist.
 */
export function removeCssVar<E extends Element = HTMLElement>(
  name: CssVarName,
  target: ElemOrCssSelector = document.documentElement,
): E {
  const elem = elemOrThrow(target, `Unable to remove CSS variable ${name}`);

  removeSingleCssVar(elem, name);

  return cast<E>(elem);
}

/**
 * Removes the CSS variables with `names` from the optionally specified `target`.
 *
 * If no `target` is specified, uses {@link https://developer.mozilla.org/en-US/docs/Web/API/Document/documentElement|documentElement}
 * (i.e. `:root`).
 *
 * @template E Type of Element to return.
 *
 * @param names Array of CSS variable names to remove.
 * @param [target] Optional Element, EventTarget, or CSS selector.
 *
 * @returns The Element representation of the specified `target`.
 *
 * @throws {InvalidCssVarError} If a CSS variable could not be removed from `target`.
 * @throws {InvalidElemError} If the specified `target` does not exist.
 */
export function removeCssVars<E extends Element = HTMLElement>(
  names: CssVarName[],
  target: ElemOrCssSelector = document.documentElement,
): E {
  // prettier-ignore
  const elem = elemOrThrow(target, `Unable to remove CSS variables ${formatForError(names)}`);

  for (const name of names) {
    removeSingleCssVar(elem, name);
  }

  return cast<E>(elem);
}

function removeSingleCssVar(element: HTMLElement, name: CssVarName): void {
  try {
    element.style.removeProperty(name);
  } catch (err: any) {
    /* istanbul ignore next -- @preserve: This will probably never get hit, but I'm hedging my bets. */
    // prettier-ignore
    throw new InvalidCssVarError(`Unable to remove CSS variable ${name}: ${err.message}`);
  }
}
