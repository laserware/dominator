/**
 * Parses the drop data from a Drag event.
 *
 * @param event Drag event to parse the data from.
 */
export function parseTransferData<T = Record<string, unknown>>(
  event: DragEvent,
): T | null {
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
