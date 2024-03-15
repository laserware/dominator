import { toValidElem } from "./internal/toValidElem";
import type { ElemOrSelectInput } from "./types";

/**
 * Returns true if the source element(s) and target elements match.
 *
 * @param source Single element input or array of element inputs to check; if
 *               an array, returns true if _one_ of the elements matches the
 *               target element input.
 * @param target Element input to compare against.
 */
export function isSameAs(
  source: ElemOrSelectInput | ElemOrSelectInput[] | null,
  target: ElemOrSelectInput | null,
): boolean {
  if (Array.isArray(source)) {
    for (const item of source) {
      if (isSingleElemSameAs(item, target)) {
        return true;
      }
    }

    return false;
  } else {
    return isSingleElemSameAs(source, target);
  }
}

function isSingleElemSameAs(
  source: ElemOrSelectInput | null,
  target: ElemOrSelectInput | null,
): boolean {
  const sourceElem = toValidElem(source);
  const targetElem = toValidElem(target);

  if (sourceElem === null && targetElem === null) {
    return false;
  }

  return sourceElem === targetElem;
}
