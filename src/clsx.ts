/* eslint-disable @typescript-eslint/strict-boolean-expressions,@typescript-eslint/no-unused-expressions */
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
export type ClassValue =
  | ClassArray
  | ClassDict
  | string
  | number
  | bigint
  | null
  | boolean
  | undefined;

export type ClassDict = Record<string, any>;

export type ClassArray = ClassValue[];

/**
 * @file This code was taken directly from the {@link https://github.com/lukeed/clsx|clsx}
 *       library. 99% of the time, I'm using the clsx library alongside dominator,
 *       so I decided to just vendor it.
 */

/**
 * A tiny (239B) utility for constructing className strings conditionally.
 * Also serves as a faster & smaller drop-in replacement for the classnames module.
 *
 * @param inputs Variable array of inputs to map to class names.
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
