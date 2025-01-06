import { isNil } from "@laserware/arcade";

import type { HTMLInputTypeAttribute } from "../dom.ts";

import { isElementType } from "./isElementType.ts";
import { toElement } from "./toElement.ts";
import type { Target } from "./types.ts";

/**
 * Checks if the `target` is an `input` element of specified `inputType`. If
 * `inputType` is omitted, only checks if the `target` is an `input` element.
 * The `inputType` corresponds to the input element's [type attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types).
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param [inputType] Type of input for which to check.
 *
 * @returns `true` if the `target` is an `input` element with optionally matching `inputType`.
 */
export function isInputType(
  target: Target | null,
  inputType?: HTMLInputTypeAttribute,
): target is HTMLInputElement {
  const element = toElement<"input">(target);

  if (isElementType(element, "input")) {
    return isNil(inputType) ? true : element.type === inputType;
  } else {
    return false;
  }
}
