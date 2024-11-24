import { html } from "../htmlBuilder.ts";

describe("the html function from htmlBuilder", () => {
  it("builds an element with no children or properties", () => {
    const result = html("div", {}, null).build();

    expect(result.outerHTML).toBe("<div></div>");
  });

  it("builds an element with children and no properties", () => {
    const parent = html("main", {}, null).build();

    html("div", {}, html("span", {}, "Hello")).build(parent);

    expect(parent.outerHTML).toBe("<main><div><span>Hello</span></div></main>");
  });

  it("builds an element with no children and properties", () => {
    const result = html("div", { class: "test", style: { margin: 0, padding: 0 } }).build();

    expect(result.outerHTML).toBe(`<div class="test" style="margin: 0px; padding: 0px;"></div>`);
  });
});
