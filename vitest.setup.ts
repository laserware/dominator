import "@testing-library/jest-dom/vitest";

import { afterEach, beforeEach } from "vitest";

interface IsDisposable {
  dispose(): void;
}

const ids = {
  root: "test",
  parent: "parent",
  button: "test-button",
  textInput: "text-input",
};

const testSelectors: TestSelectors = {
  forRoot: `#${ids.root}`,
  forParent: `#${ids.parent}`,
  forButton: `#${ids.button}`,
  forTextInput: `#${ids.textInput}`,
  forMissing: `#missing`,
};

// Markup used to create a DOM before tests. Do _not_ make random tweaks to this
// or it will break a bunch of tests!
const html = `
<div id="${ids.root}">
  <div>Empty</div>
  <div aria-hidden="true" data-value="test">Attrs</div>
  <div id="${ids.parent}">
    <div aria-hidden="true" data-value="test">Child</div>
  </div>
  
  <button 
    id="${ids.button}"
    name="button"
    disabled
    aria-disabled="true"
    aria-expanded="true"
    draggable="true"
    inert
    data-some-property="thing"
  >
    Button
  </button>
  
  <span>Multiple Dataset</span>
  
  <form>
    <div>
      <label for="${ids.textInput}">Text Input</label>
      <input id="${ids.textInput}" type="text" value="Test" />
    </div>
  </form>
</div>
`;

function createTestDOM(): IsDisposable {
  const main = document.createElement("main");

  main.innerHTML = html;

  document.body.appendChild(main);

  return {
    dispose() {
      document.body.removeChild(main);
    },
  };
}

let disposable: IsDisposable | null = null;

beforeEach((context: Record<string, any>) => {
  context.selectors = testSelectors;

  disposable = createTestDOM();
});

afterEach(() => {
  disposable?.dispose();
});
