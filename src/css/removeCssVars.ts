import { InvalidCssVarError } from "../errors.ts";
import { cast } from "../internal/cast.ts";
import { elemOrThrow } from "../internal/elemOr.ts";
import { formatForError } from "../internal/formatForError.ts";
import type { AnyElement, CssVarName, ElemOrCssSelector } from "../types.ts";

/**
 * Removes the specified CSS variable `name` from the optionally specified
 * `target`.
 *
 * If no `target` is specified, uses [`documentElement`](https://developer.mozilla.org/en-US/docs/Web/API/Document/documentElement)
 * (i.e. `:root`).
 *
 * @template E Element type of specified `target`.
 *
 * @param name Name of the CSS variable to remove.
 * @param [target=documentElement] Optional Element, EventTarget, or CSS selector.
 *
 * @returns Element representation of the specified `target`.
 *
 * @throws {@linkcode InvalidCssVarError} If the CSS variable could not be removed from `target`.
 * @throws {@linkcode InvalidElemError} If the specified `target` wasn't found.
 *
 * @group CSS
 */
export function removeCssVar<E extends AnyElement = HTMLElement>(
  name: CssVarName,
  target: ElemOrCssSelector<E> = document.documentElement,
): E {
  const elem = elemOrThrow(target, `Unable to remove CSS variable ${name}`);

  removeSingleCssVar(elem, name);

  return cast<E>(elem);
}

/**
 * Removes the CSS variables with `names` from the optionally specified `target`.
 *
 * If no `target` is specified, uses [`documentElement`](https://developer.mozilla.org/en-US/docs/Web/API/Document/documentElement)
 * (i.e. `:root`).
 *
 * @template E Element type of specified `target`.
 *
 * @param names Array of CSS variable names to remove.
 * @param [target=documentElement] Optional Element, EventTarget, or CSS selector.
 *
 * @returns Element representation of the specified `target`.
 *
 * @throws {@linkcode InvalidCssVarError} If a CSS variable could not be removed from `target`.
 * @throws {@linkcode InvalidElemError} If the specified `target` wasn't found.
 *
 * @group CSS
 */
export function removeCssVars<E extends AnyElement = HTMLElement>(
  names: CssVarName[],
  target: ElemOrCssSelector<E> = document.documentElement,
): E {
  // prettier-ignore
  const elem = elemOrThrow(target, `Unable to remove CSS variables ${formatForError(names)}`);

  for (const name of names) {
    removeSingleCssVar(elem, name);
  }

  return cast<E>(elem);
}

function removeSingleCssVar(element: AnyElement, name: CssVarName): void {
  try {
    element.style.removeProperty(name);
  } catch (err: any) {
    /* istanbul ignore next -- @preserve: This will probably never get hit, but I'm hedging my bets. */
    // prettier-ignore
    throw new InvalidCssVarError(`Unable to remove CSS variable ${name}: ${err.message}`);
  }
}
