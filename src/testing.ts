/* istanbul ignore file -- @preserve: These are testing utilities, so we don't care about coverage. */

import { dedent } from "@laserware/arcade";

import { cast } from "./internal/cast.ts";

export { screen, waitFor } from "@testing-library/dom";

export { default as userEvent } from "@testing-library/user-event";

/**
 * Selector for an element that will never exist in the test DOM.
 */
export const selectorForNonExistent = "#never-going-to-exist";

/**
 * Renders the specified markup and returns the element with the corresponding
 * contents.
 *
 * @param markup HTML markup to render.
 */
export function render<E extends HTMLElement = HTMLElement>(markup: string): E {
  const parent = document.createElement("div");

  parent.innerHTML = dedent(markup);

  const child = parent.firstElementChild!;

  document.body.appendChild(child);

  return cast<E>(child);
}
