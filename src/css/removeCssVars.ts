import { cast } from "@laserware/arcade";

import type { ElementOf, TagName } from "../dom.ts";
import type { Target } from "../elems/types.ts";
import { toElementOrThrow } from "../internal/elemOr.ts";
import { formatForError } from "../internal/formatForError.ts";

import { InvalidCssVarError } from "./InvalidCssVarError.ts";
import type { CssVarName } from "./types.ts";

/**
 * Removes the CSS variable `name` from the optionally specified `target`.
 *
 * If no `target` is specified, uses [`documentElement`](https://developer.mozilla.org/en-US/docs/Web/API/Document/documentElement)
 * (i.e. `:root`).
 *
 * @template TN Tag name of the Element representation of `target`.
 *
 * @param name Name of the CSS variable to remove.
 * @param [target=documentElement] Optional Element, EventTarget, or CSS selector.
 *
 * @returns Element representation of the specified `target`.
 *
 * @throws {@linkcode InvalidCssVarError} if the CSS variable could not be removed from `target`.
 * @throws {@linkcode elems!InvalidElemError} if the specified `target` wasn't found.
 *
 * @example
 * **HTML (Before)**
 *
 * ```html
 * <style>:root { --color-fg: green; --is-small: false }</style>
 *
 * <button id="example" style="--color-bg: blue; font-size: 18px;">Example</button>
 * ```
 *
 * **Remove from Element**
 *
 * ```ts
 * const elem = findElem("#example")!;
 *
 * removeCssVar("color-bg", elem);
 * ```
 *
 * **Remove from `:root`**
 *
 * ```ts
 * const elem = findElem("#example")!;
 *
 * removeCssVar("color-fg");
 * ```
 *
 * **HTML (After)**
 *
 * ```html
 * <style>:root { --is-small: false }</style>
 *
 * <button id="example" style="font-size: 18px;">Example</button>
 * ```
 */
export function removeCssVar<TN extends TagName = "*">(
  name: CssVarName,
  target: Target<TN> = document.documentElement,
): ElementOf<TN> {
  const elem = toElementOrThrow(
    target,
    `Unable to remove CSS variable ${name}`,
  );

  removeSingleCssVar(elem, name);

  return cast<ElementOf<TN>>(elem);
}

/**
 * Removes the CSS variables with `names` from the optionally specified `target`.
 *
 * If no `target` is specified, uses [`documentElement`](https://developer.mozilla.org/en-US/docs/Web/API/Document/documentElement)
 * (i.e. `:root`).
 *
 * @template TN Tag name of the Element representation of `target`.
 *
 * @param names Array of CSS variable names to remove.
 * @param [target=documentElement] Optional Element, EventTarget, or CSS selector.
 *
 * @returns Element representation of the specified `target`.
 *
 * @throws {@linkcode InvalidCssVarError} if a CSS variable could not be removed from `target`.
 * @throws {@linkcode elems!InvalidElemError} if the specified `target` wasn't found.
 *
 * @example
 * **HTML (Before)**
 *
 * ```html
 * <style>
 *   :root {
 *     --color-fg: green;
 *     --padding-small: "24px";
 *     --is-small: true;
 *   }
 * </style>
 *
 * <button id="example" style="--color-bg: blue; --is-big: true; font-size: 18px;">
 *   Example
 * </button>
 * ```
 *
 * **Remove from Element**
 *
 * ```ts
 * const elem = findElem("#example")!;
 *
 * removeCssVars(["--color-bg", "--is-big"] , elem);
 * ```
 *
 * **Remove from `:root`**
 *
 * ```ts
 * removeCssVars(["--color-fg", "--padding-small"]);
 * ```
 *
 * **HTML (After)**
 *
 * ```html
 * <style>
 *   :root {
 *     --is-small: true;
 *   }
 * </style>
 *
 * <button id="example" style="font-size: 18px;">
 *   Example
 * </button>
 * ```
 */
export function removeCssVars<TN extends TagName = "*">(
  names: CssVarName[],
  target: Target<TN> = document.documentElement,
): ElementOf<TN> {
  // prettier-ignore
  const elem = toElementOrThrow(target, `Unable to remove CSS variables ${formatForError(names)}`);

  for (const name of names) {
    removeSingleCssVar(elem, name);
  }

  return cast<ElementOf<TN>>(elem);
}

function removeSingleCssVar(element: Element, name: CssVarName): void {
  try {
    cast<HTMLElement>(element).style.removeProperty(name);
  } catch (err: any) {
    /* istanbul ignore next -- @preserve: This will probably never get hit, but I'm hedging my bets. */
    // prettier-ignore
    throw new InvalidCssVarError(`Unable to remove CSS variable ${name}: ${err.message}`);
  }
}
