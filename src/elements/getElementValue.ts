import { cast } from "@laserware/arcade";

import { toElementOrThrow } from "./toElement.ts";
import type { Target } from "./types.ts";

/**
 * Returns the value of the specified `target` with the specified type. The
 * value is returned as a number if the [`valueAsNumber` property](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/valueAsNumber)
 * returns a valid number, a Date if the [`valueAsDate` property](https://developer.mozilla.org/en-US/docs/Web/API/HTMLInputElement/valueAsDate)
 * is a valid [Date](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Date) (not `null`),
 * a boolean if the input is a `checkbox` or `radio` type, otherwise is returned as a `string`.
 *
 * @template T Type of the value that gets returned.
 *
 * @param target Element, EventTarget, or CSS selector.
 *
 * @returns Value of the specified `target` as type `T`.
 *
 * @throws {@linkcode InvalidElementError} if the specified `target` wasn't found.
 */
export function getElementValue<T>(target: Target | null): T {
  // prettier-ignore
  const element = toElementOrThrow<"input">(target, "Cannot get value for element");

  // Note that the order of these checks is important. Calling `valueAsNumber` on
  // date input will return the Unix epoch, which is _not_ what we want to return,
  // so we do the date check first:
  const dateValue = element.valueAsDate;
  if (dateValue !== null) {
    return cast<T>(new Date(dateValue));
  }

  const numericValue = element.valueAsNumber;
  if (!Number.isNaN(numericValue)) {
    return cast<T>(numericValue);
  }

  const stringValue = element.value as string;
  if (element.type === "checkbox" || element.type === "radio") {
    // TODO: Find out if this is correct!
    return cast<T>(element.checked);
  }

  return cast<T>(stringValue);
}
