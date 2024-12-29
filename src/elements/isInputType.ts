import type { HTMLInputTypeAttribute } from "../dom.ts";

import { toElement } from "./toElement.ts";
import type { Target } from "./types.ts";

/**
 * Checks if the `target` is an `input` element of specified `inputType`. The
 * `inputType` corresponds to the input element's [type attribute](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#input_types).
 *
 * @param target Element, EventTarget, or CSS selector.
 * @param inputType Type of input for which to check.
 *
 * @returns `true` if the `target` is of type `inputType`.
 */
export function isInputType(
  target: Target | null,
  inputType: HTMLInputTypeAttribute,
): target is HTMLInputElement {
  return toElement<"input">(target)?.type === inputType;
}
