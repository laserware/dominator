/* istanbul ignore file -- @preserve: These are testing utilities, so we don't care about coverage. */

import { cast, dedent } from "@laserware/arcade";

import type { ElementOf, TagName } from "./dom.ts";

export { screen, waitFor } from "@testing-library/dom";

export { userEvent } from "@testing-library/user-event";

/**
 * Selector for an element that will never exist in the test DOM.
 */
export const selectorForNonExistent = "#never-going-to-exist";

/**
 * Renders the specified `html` and returns the element with the corresponding
 * contents.
 *
 * @internal
 *
 * @template TN Tag name of the rendered element.
 *
 * @param html HTML markup to render.
 * @param [options] Optional overrides for element attributes and properties (useful for mocking).
 * @param [children] Optional children to add to element.
 *
 * @returns Element with tag name `TN`.
 */
export function render<TN extends TagName = "*">(
  html: string,
  options: Record<string, any> = {},
  ...children: HTMLElement[]
): ElementOf<TN> {
  const parent = document.createElement("div");

  parent.innerHTML = dedent(html);

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

  return cast<ElementOf<TN>>(element);
}
