import { toValidElem } from "./internal/toValidElem";
import type { ElemOrSelectInput } from "./types";

/**
 * Returns true if the source element(s) and target elements do not match.
 *
 * @param source Single element input or array of element inputs to check; if
 *               an array, returns true only if _all_ elements don't match the
 *               target element input.
 * @param target Element input to compare against.
 */
export function isDifferentFrom(
  source: ElemOrSelectInput | ElemOrSelectInput[] | null,
  target: ElemOrSelectInput | null,
): boolean {
  if (Array.isArray(source)) {
    // Ensure we bail early if we find an element that is the same:
    for (const item of source) {
      if (!isSingleElemDifferentFrom(item, target)) {
        return false;
      }
    }

    return true;
  } else {
    return isSingleElemDifferentFrom(source, target);
  }
}

function isSingleElemDifferentFrom(
  source: ElemOrSelectInput | null,
  target: ElemOrSelectInput | null,
): boolean {
  const sourceElement = toValidElem(source);
  const targetElement = toValidElem(target);

  if (sourceElement === null && targetElement === null) {
    return false;
  }

  return sourceElement !== targetElement;
}
