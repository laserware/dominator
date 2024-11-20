import { dedent } from "@laserware/arcade";

export interface IsDisposable {
  dispose(): void;
}

const ids = {
  root: "test",
  parent: "parent",
  button: "test-button",
  textInput: "text-input",
};

export const testSelectors = {
  forRoot: `#${ids.root}`,
  forParent: `#${ids.parent}`,
  forButton: `#${ids.button}`,
  forTextInput: `#${ids.textInput}`,
  forMissing: `#missing`,
};

export function createTestDOM(): IsDisposable {
  const main = document.createElement("main");

  main.innerHTML = dedent`
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
      
      <form>
        <div>
          <label for="${ids.textInput}">Text Input</label>
          <input id="${ids.textInput}" type="text" value="Test" />
        </div>
      </form>
    </div>
  `;

  document.body.appendChild(main);

  return {
    dispose() {
      document.body.removeChild(main);
    },
  };
}
