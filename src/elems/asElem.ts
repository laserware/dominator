import { isElem } from "../typeGuards.ts";
import type { AnyElement, Elem } from "../types.ts";

import { InvalidElemError } from "./InvalidElemError.ts";

/**
 * Returns an element of type `E` for the specified `target`.
 *
 * This differs from {@linkcode toElem} in that it will never return `null`, only
 * the specified Element type, and it only accepts a Element or EventTarget
 * as input.
 *
 * If you specify a `null` or `undefined` input, the function throws rather than
 * returns `null`.
 *
 * This function is useful for getting the [EventTarget](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget)
 * from an Event as a specific Element type without needing to use a non-null
 * assertion. In some cases, you know _exactly_ what type of Element will be
 * associated with an Event and you want to assert it as such.
 *
 * **Important Note**
 *
 * With this function, you are telling TypeScript what the Element is, even if
 * the type you pass into the generic is incorrect. If you try to access properties
 * only available on an `HTMLButtonElement` when the Element or EventTarget you
 * passed in is an `HTMLDivElement`, you're going to get a runtime error.
 *
 * @template E Element type of specified `target`.
 *
 * @param target Element or EventTarget.
 *
 * @throws {@linkcode InvalidElemError} If specified `target` is `null` or `undefined`.
 *
 * @template E Element type of specified `target`.
 *
 * @example
 * **Valid EventTarget**
 *
 * ```ts
 * function handleButtonClick(event: MouseEvent): void {
 *   // We know this is an HTMLButtonElement because the event listener was
 *   // attached to a `<button>` and `currentTarget` is therefore a button:
 *   const buttonElem = asElem<HTMLButtonElement>(event.currentTarget);
 * }
 * ```
 *
 * **Invalid EventTarget**
 *
 * ```ts
 * function handleButtonClick(event: MouseEvent): void {
 *   // We're telling TypeScript this is an `<input>` when it's actually a
 *   // button:
 *   const elem = asElem<HTMLInputElement>(event.currentTarget);
 *
 *   // TypeScript will _not_ complain about this, but you'll get an error:
 *   console.log(elem.valueAsNumber);
 * }
 * ```
 */
export function asElem<E extends AnyElement = HTMLElement>(
  target: Elem<E> | null | undefined,
): E {
  if (isElem(target)) {
    return target as E;
  } else {
    throw new InvalidElemError("Cannot assert as elem");
  }
}
