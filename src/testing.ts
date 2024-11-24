import { dedent, isNotNil } from "@laserware/arcade";

/* istanbul ignore file -- @preserve: These are testing utilities, so we don't care about coverage. */

/**
 * Selector for an element that will never exist in the test DOM.
 */
export const selectorForNonExistent = "!missing!";

const ROOT_ELEM_ID = "test-root-element";

/**
 * Renders the specified markup and returns the element with the corresponding
 * contents.
 *
 * @param markup HTML markup to render.
 */
export function render<E extends HTMLElement = HTMLElement>(markup: string): E {
  const existingMainElement = document.querySelector(`#${ROOT_ELEM_ID}`);
  if (existingMainElement !== null) {
    document.body.removeChild(existingMainElement);
  }

  const mainElement = createMainElement(markup);

  return getTargetElement(mainElement) as E;
}

function createMainElement(markup: string): HTMLElement {
  const mainElement = document.createElement("main");

  mainElement.setAttribute("id", ROOT_ELEM_ID);

  mainElement.innerHTML = dedent(markup);

  document.body.appendChild(mainElement);

  return mainElement;
}

function getTargetElement(mainElement: HTMLElement): HTMLElement {
  if (isNotNil(mainElement.firstElementChild)) {
    return mainElement.firstElementChild as HTMLElement;
  } else {
    return mainElement as HTMLElement;
  }
}
