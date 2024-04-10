import userEvent from "@testing-library/user-event";

import { asElement } from "../asElement.js";

describe("the asElement function", () => {
  it("returns an element when an element is passed in", () => {
    const buttonElement = document.createElement("button");
    buttonElement.innerText = "Click Me";

    const result = asElement(buttonElement);

    expect(result).toBeInstanceOf(HTMLButtonElement);
  });

  it("returns an element when event.target is passed in", async () => {
    const buttonElement = document.createElement("button");
    buttonElement.innerText = "Click Me";

    let result;

    buttonElement.addEventListener("click", (event) => {
      result = asElement(event.target);
    });

    await userEvent.click(buttonElement);

    expect(result).toBeInstanceOf(HTMLButtonElement);
  });

  it("returns an element when event.currentTarget is passed in", async () => {
    const buttonElement = document.createElement("button");
    buttonElement.innerText = "Click Me";

    let result;

    buttonElement.addEventListener("click", (event) => {
      result = asElement(event.currentTarget);
    });

    await userEvent.click(buttonElement);

    expect(result).toBeInstanceOf(HTMLButtonElement);
  });

  it("returns an element when a Node is passed in", () => {
    const containerElement = document.createElement("div");

    const buttonElement = document.createElement("button");
    buttonElement.innerText = "Click Me";
    const spanElement = document.createElement("span");
    spanElement.innerText = "Test";

    containerElement.append(buttonElement, spanElement);

    const sibling = asElement(buttonElement.nextSibling);
    expect(sibling?.innerText).toBe("Test");

    const parent = asElement(spanElement.parentNode);
    expect(parent).toBeInstanceOf(HTMLDivElement);
  });

  it("returns null for an element that doesn't exist", async () => {
    const button = document.createElement("button");
    button.id = "test-button";
    button.innerText = "Click Me";

    const result = asElement(button.firstElementChild);

    expect(result).toBeNull();
  });
});
