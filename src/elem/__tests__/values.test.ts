import { getElemValueAs } from "../values.ts";

describe("within values", () => {
  describe("the getElem", () => {
    const result = getElemValueAs("#test", "boolean");

    console.log(result.valueOf());
  });
});
