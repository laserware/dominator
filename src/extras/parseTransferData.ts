import type { NullOr } from "../types.ts";

/**
 * Parses the drop data from the specified {@link https://developer.mozilla.org/en-US/docs/Web/API/DragEvent|DragEvent}.
 *
 * @param event `DragEvent` to parse the data from.
 */
export function parseTransferData<T = Record<string, unknown>>(
  event: DragEvent,
): NullOr<T> {
  const textData = event.dataTransfer?.getData("plain/text") ?? null;

  if (textData === null) {
    return null;
  }

  try {
    return JSON.parse(textData) as T;
  } catch {
    return null;
  }
}
