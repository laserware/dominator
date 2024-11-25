import { elemOrThrow } from "../internal/elemOr.ts";
import { formatForError } from "../internal/formatForError.ts";
import type { CssVarName, ElemOrCssSelector } from "../types.ts";

/**
 * Checks if the specified `target` has the specified CSS variable with `name`.
 *
 * If no `target` is specified, uses {@link https://developer.mozilla.org/en-US/docs/Web/API/Document/documentElement|documentElement}
 * (i.e. `:root`).
 *
 * @param name Name of the CSS variable.
 * @param [target] Optional Element, EventTarget, or CSS selector.
 *
 * @returns `true` if the specified CSS variable is present, otherwise `false`.
 *
 * @throws {InvalidElemError} If the specified `target` does not exist.
 */
export function hasCssVar(
  name: CssVarName,
  target: ElemOrCssSelector = document.documentElement,
): boolean {
  // prettier-ignore
  const elem = elemOrThrow(target, `Unable to check for CSS variable ${name}`);

  return hasSingleCssVar(elem, name);
}

/**
 * Checks if  *all* of the CSS variables that match the specified `names` exist
 * in the `target` (or `:root`).
 *
 * If no `target` is specified, uses {@link https://developer.mozilla.org/en-US/docs/Web/API/Document/documentElement|documentElement}
 * (i.e. `:root`).
 *
 * @param names CSS variable names to check for.
 * @param [target] Optional Element, EventTarget, or CSS selector.
 *
 * @returns `true` if the specified `target` has *all* specified CSS variables, otherwise `false`.
 *
 * @throws {InvalidElemError} If the specified `target` does not exist.
 */
export function hasAllCssVars(
  names: CssVarName,
  target: ElemOrCssSelector = document.documentElement,
): boolean {
  // prettier-ignore
  const elem = elemOrThrow(target, `Unable to check for all CSS variables ${formatForError(names)}`);

  for (const name of names) {
    if (!hasSingleCssVar(elem, name as CssVarName)) {
      return false;
    }
  }

  return true;
}

/**
 * Checks if  *some* of the CSS variables that match the specified `names` exist
 * in the `target` (or `:root`).
 *
 * If no `target` is specified, uses {@link https://developer.mozilla.org/en-US/docs/Web/API/Document/documentElement|documentElement}
 * (i.e. `:root`).
 *
 * @param names CSS variable names to check for.
 * @param [target] Optional Element, EventTarget, or CSS selector.
 *
 * @returns `true` if the specified `target` has *some* of the specified CSS variables, otherwise `false`.
 *
 * @throws {InvalidElemError} If the specified `target` does not exist.
 */
export function hasSomeCssVars(
  names: CssVarName,
  target: ElemOrCssSelector = document.documentElement,
): boolean {
  // prettier-ignore
  const elem = elemOrThrow(target, `Unable to check for some CSS variables ${formatForError(names)}`);

  for (const name of names) {
    if (hasSingleCssVar(elem, name as CssVarName)) {
      return true;
    }
  }

  return false;
}

function hasSingleCssVar(element: HTMLElement, name: CssVarName): boolean {
  return window.getComputedStyle(element).getPropertyValue(name) !== "";
}
