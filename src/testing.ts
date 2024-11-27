/* istanbul ignore file -- @preserve: These are testing utilities, so we don't care about coverage. */

import { dedent } from "@laserware/arcade";

import { cast } from "./internal/cast.ts";

export { screen, waitFor } from "@testing-library/dom";

export { userEvent } from "@testing-library/user-event";

/**
 * Selector for an element that will never exist in the test DOM.
 */
export const selectorForNonExistent = "#never-going-to-exist";

/**
 * Renders the specified markup and returns the element with the corresponding
 * contents.
 *
 * @param markup HTML markup to render.
 * @param [options] Optional overrides for element attributes and properties (useful for mocking).
 * @param [children] Optional children to add to element.
 */
export function render<E extends HTMLElement = HTMLElement>(
  markup: string,
  options: Record<string, any> = {},
  ...children: HTMLElement[]
): E {
  const parent = document.createElement("div");

  parent.innerHTML = dedent(markup);

  const element = parent.firstElementChild!;

  if (children.length !== 0) {
    for (const child of children) {
      if (document.body.contains(child)) {
        child.remove();
      }
    }

    element.append(...children);
  }

  document.body.appendChild(element);

  for (const [key, value] of Object.entries(options)) {
    // @ts-ignore Not worried about type safety because these are tests.
    element[key] = value;
  }

  return cast<E>(element);
}
