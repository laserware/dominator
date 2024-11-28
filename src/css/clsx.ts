/* eslint-disable @typescript-eslint/no-unused-expressions */
/*
 * MIT License
 *
 * Copyright (c) Luke Edwards <luke.edwards05@gmail.com> (lukeed.com)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy of this
 * software and associated documentation files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use, copy, modify, merge,
 * publish, distribute, sublicense, and/or sell copies of the Software, and to permit
 * persons to whom the Software is furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all copies or
 * substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED,
 * INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
 * PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE
 * FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT
 * OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE
 * OR OTHER DEALINGS IN THE SOFTWARE.
 */

/**
 * Possible values for input to the {@linkcode clsx} function.
 *
 * @group CSS
 */
export type ClassValue =
  | ClassArray
  | ClassDict
  | string
  | number
  | bigint
  | null
  | boolean
  | undefined;

/**
 * Object with key of class name and value of truthy/falsy condition.
 * The object is passed into the {@linkcode clsx} function.
 *
 * @group CSS
 */
export type ClassDict = Record<string, any>;

/**
 * Array of class names that can be used as {@linkcode clsx} inputs.
 *
 * @group CSS
 */
export type ClassArray = ClassValue[];

/**
 * A tiny (239B) utility for constructing `className` strings conditionally.
 * Also serves as a faster & smaller drop-in replacement for the
 * [classnames](https://www.npmjs.com/package/classnames) package.
 *
 * @remarks
 * This code was taken directly from the [clsx](https://github.com/lukeed/clsx)
 * library. 99% of the time, I'm using the clsx library alongside dominator,
 * so I decided to just vendor it.
 *
 * @param inputs Variable array of inputs to map to class names.
 *
 * @returns A string representing a valid CSS selector.
 *
 * @group CSS
 */
export function clsx(...inputs: ClassValue[]): string {
  const inputCount = inputs.length;

  let index = 0;
  let inputAtIndex;
  let classValue;
  let result = "";

  for (; index < inputCount; index++) {
    if ((inputAtIndex = inputs[index])) {
      if ((classValue = toClassValue(inputAtIndex))) {
        result && (result += " ");
        result += classValue;
      }
    }
  }
  return result;
}

function toClassValue(classValue: ClassValue): string {
  let arrayIndex;
  let key;
  let result = "";

  /* istanbul ignore next -- @preserve: This never gets hit, but I don't want to change the code. */
  if (classValue === null) {
    return result;
  }

  if (typeof classValue === "string" || typeof classValue === "number") {
    result += classValue;
  } else if (typeof classValue === "object") {
    if (Array.isArray(classValue)) {
      const valueLength = classValue.length;

      for (arrayIndex = 0; arrayIndex < valueLength; arrayIndex++) {
        if (classValue[arrayIndex]) {
          if ((key = toClassValue(classValue[arrayIndex]))) {
            result && (result += " ");
            result += key;
          }
        }
      }
    } else {
      for (key in classValue) {
        if (classValue[key]) {
          result && (result += " ");
          result += key;
        }
      }
    }
  }

  return result;
}
