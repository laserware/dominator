import { Elem, type NilOr } from "../types.ts";

import { InvalidElemError } from "./InvalidElemError.ts";

/**
 * Returns an element of type `E` for the specified target.
 *
 * This differs from {@linkcode toElem} in that it will never return `null`, only
 * the specified `Element` type, and it only accepts a `Element` or `EventTarget`
 * as input.
 *
 * If you specify a `null` or `undefined` input, the function throws rather than
 * returns `null`.
 *
 * This function is useful for getting the {@link https://developer.mozilla.org/en-US/docs/Web/API/EventTarget|EventTarget}
 * from an Event as a specific `Element` type without needing to use a non-null
 * assertion. In some cases, you know *exactly* what type of `Element` will be
 * associated with an `Event` and you want to assert it as such.
 *
 * @template E Type of `Element` to return.
 *
 * @param target `Element` or `EventTarget`.
 *
 * @throws {InvalidElemError} If specified `target` is `null` or `undefined`.
 *
 * @remarks
 * With this function, you are telling TypeScript what the `Element` is, even if
 * the type you pass into the generic is incorrect. If you try to access properties
 * for an `HTMLButtonElement` when the `Element` or `EventTarget` you passed
 * in is an `HTMLDivElement`, you're going to get a runtime error.
 *
 * @template E Type of `Element` to return.
 *
 * @example Usage with Valid `EventTarget`
 * function handleButtonClick(event: MouseEvent): void {
 *   // We know this is an HTMLButtonElement because the event listener was
 *   // attached to a `<button>` and `currentTarget` is therefore a button:
 *   const buttonElem = asElem<HTMLButtonElement>(event.currentTarget);
 * }
 */
export function asElem<E extends Element = HTMLElement>(
  target: NilOr<Elem>,
): E {
  if (Elem.is(target)) {
    return target as E;
  } else {
    throw new InvalidElemError("Cannot assert using asElem");
  }
}
