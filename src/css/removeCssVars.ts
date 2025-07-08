import { cast } from "@laserware/arcade";

import { toElementOrThrow } from "../elements/toElement.ts";
import type { Target } from "../elements/types.ts";
import { formatForError } from "../internal/formatForError.ts";

import { InvalidCssVarError } from "./InvalidCssVarError.ts";
import type { CssVarName } from "./types.ts";

/**
 * Removes the CSS variable `name` from the optionally specified `target`.
 *
 * If no `target` is specified, the [`documentElement`](https://developer.mozilla.org/en-US/docs/Web/API/Document/documentElement)
 * (i.e. `:root`) is used.
 *
 * @template E Element representation of `target`.
 *
 * @param name Name of the CSS variable to remove.
 * @param [target=documentElement] Optional Element, EventTarget, or CSS selector.
 *
 * @returns Element representation of the specified `target`.
 *
 * @throws {@linkcode InvalidCssVarError} if the CSS variable could not be removed from `target`.
 * @throws {@linkcode elements!InvalidElementError} if the specified `target` wasn't found.
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
 * const element = findElement("#example")!;
 *
 * removeCssVar("color-bg", element);
 * ```
 *
 * **Remove from `:root`**
 *
 * ```ts
 * const element = findElement("#example")!;
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
export function removeCssVar<E extends Element = HTMLElement>(
  name: CssVarName,
  target: Target | null = document.documentElement,
): E {
  // biome-ignore format: Ignore
  const element = toElementOrThrow(target, `Cannot remove CSS variable ${name}`);

  removeSingleCssVar(element, name);

  return cast<E>(element);
}

/**
 * Removes the CSS variables with `names` from the optionally specified `target`.
 *
 * If no `target` is specified, the [`documentElement`](https://developer.mozilla.org/en-US/docs/Web/API/Document/documentElement)
 * (i.e. `:root`) is used.
 *
 * @template E Element representation of `target`.
 *
 * @param names Array of CSS variable names to remove.
 * @param [target=documentElement] Optional Element, EventTarget, or CSS selector.
 *
 * @returns Element representation of the specified `target`.
 *
 * @throws {@linkcode InvalidCssVarError} if a CSS variable could not be removed from `target`.
 * @throws {@linkcode elements!InvalidElementError} if the specified `target` wasn't found.
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
 * const element = findElement("#example")!;
 *
 * removeCssVars(["--color-bg", "--is-big"] , element);
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
export function removeCssVars<E extends Element = HTMLElement>(
  names: CssVarName[],
  target: Target | null = document.documentElement,
): E {
  // biome-ignore format: Ignore
  const element = toElementOrThrow(target, `Cannot remove CSS variables ${formatForError(names)}`);

  for (const name of names) {
    removeSingleCssVar(element, name);
  }

  return cast<E>(element);
}

function removeSingleCssVar(element: Element, name: CssVarName): void {
  try {
    cast<HTMLElement>(element).style.removeProperty(name);
  } catch (err: any) {
    // biome-ignore format: Ignore
    throw new InvalidCssVarError(`Cannot remove CSS variable ${name}: ${err.message}`);
  }
}
