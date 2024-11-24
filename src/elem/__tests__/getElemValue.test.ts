import { render } from "../../testing.ts";
import { getElemValue, getElemValueAs } from "../getElemValue.ts";

describe("within getElemValue", () => {
  describe("the getElemValue function", () => {
    it("returns the value of the element", () => {
      render(`
        <form>
          <div>
            <label for="text">Text Input</label>
            <input id="text" type="text" value="Test" />
          </div>
        </form>
      `);

      const result = getElemValue("input");

      expect(result).toBe("Test");
    });
  });

  describe("the getElemValueAs function", () => {
    it("returns a number value if valid", () => {
      render(`
        <form>
          <div>
            <label for="text">Text Input</label>
            <input id="text" type="number" value="22" />
          </div>
        </form>
      `);

      const result = getElemValueAs("input", "number");

      expect(result).toBe(22);
    });
  });
});
