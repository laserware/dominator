import { isNotNil } from "@laserware/arcade";

import { setAttrs } from "../attrs/setAttrs.ts";
import { setCssVars } from "../css/setCssVars.ts";
import { setData } from "../data/setData.ts";
import { cast } from "../internal/cast.ts";
import { setStyles } from "../styles/setStyles.ts";
import type { Attrs, CssVars, Data, Styles } from "../types.ts";

import { toElem } from "./toElem.ts";

/**
 * Options for creating an element using {@linkcode createElem}.
 */
interface CreateElemOptions {
  /** Attributes to set on element. */
  attrs?: Attrs;

  /** CSS variables to set on element. */
  cssVars?: CssVars;

  /** Dataset entries to set on element. */
  data?: Data;

  /** Styles to set on element. */
  styles?: Styles;
}

/**
 * Creates an HTML element of type `E` with the specified `markup` and `options`.
 * The attributes, CSS variables, dataset entries, and styles specified in
 * `options` are applied to the root element in the markup.
 *
 * @remarks
 * This is an alternative for the {@linkcode html} builder function for when you
 * just need a one-off element or you want to define the element structure
 * mostly in markup.
 *
 * @template E Type of Element to return.
 *
 * @param markup HTML string that represents the element.
 * @param [options] Optional attributes, CSS variables, dataset entries, and styles
 *                  to set on element.
 *
 * @returns Element of type `E` with the specified `markup` and `options`.
 */
export function createElem<E extends Element = HTMLElement>(
  markup: string,
  options: CreateElemOptions = {},
): E {
  const parent = document.createElement("div");

  parent.innerHTML = markup;

  const elem = toElem(parent.firstElementChild);

  if (elem === null) {
    throw new Error("Unable to create element");
  }

  if (isNotNil(options.attrs)) {
    setAttrs(elem, options.attrs);
  }

  if (isNotNil(options.cssVars)) {
    setCssVars(options.cssVars, elem);
  }

  if (isNotNil(options.data)) {
    setData(elem, options.data);
  }

  if (isNotNil(options.styles)) {
    setStyles(elem, options.styles);
  }

  return cast<E>(elem);
}
