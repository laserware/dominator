/**
 * Returns the value associated with the specified CSS variable name.
 * @param variableName Name of the variable to get value for
 * @param defaultValue Optional default value to fall back to
 */
export function getCssVar<T>(variableName: string, defaultValue?: T): T {
  try {
    const root = document.querySelector(":root") as Element;
    const value = window.getComputedStyle(root).getPropertyValue(variableName);

    const parsedValue = Number.parseInt(value);
    if (Number.isNaN(parsedValue)) {
      return value as unknown as T;
    }

    return parsedValue as unknown as T;
  } catch {
    if (defaultValue !== undefined) {
      return defaultValue;
    } else {
      throw new Error("Could not find CSS var and no default value defined");
    }
  }
}
