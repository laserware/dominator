import type { CssVarName } from "./types.ts";

/**
 * Returns true if the specified `name` is a valid {@linkcode CssVarName}.
 *
 * @internal
 */
export function isCssVarName(name: string): name is CssVarName {
  return name.startsWith("--");
}
