/**
 * Parses the drop data from the specified {@link https://developer.mozilla.org/en-US/docs/Web/API/DragEvent|DragEvent}.
 *
 * @template T Type of value to return.
 *
 * @param event `DragEvent` to parse the data from.
 *
 * @returns Value of type `T` if found, otherwise `undefined`.
 */
export function parseTransferData<T = Record<string, unknown>>(
  event: DragEvent,
): T | undefined {
  const textData = event.dataTransfer?.getData("plain/text") ?? "";

  if (textData === "") {
    return undefined;
  }

  try {
    return JSON.parse(textData) as T;
  } catch {
    return undefined;
  }
}
