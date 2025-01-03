# Dominator

Better ergonomics for working with the DOM and TypeScript.

See [documentation](https://laserware.github.io/dominator/) if you want to get right to the API.
For a high-level overview of the library, keep reading!

## Examples

Let's face it, working with the DOM API kind of sucks (_especially_ with TypeScript).
This library aims to make it a little less painful.

The following examples compare the use of DOM APIs with this library. 

### Creating Elements

Instead of creating an Element with the DOM APIs:

```ts
const div = document.createElement("div");
div.id = "example";
div.ariaLabel = "Hello!";
```

You can use the `createElement` function:

```ts
import { createElement } from "@laserware/dominator";

const div = createElement("div", { id: "example", ariaLabel: "Hello!" });
```

### Finding Elements

Finding a single element or multiple elements in the DOM isn't _that_ bad.

Assuming you have this HTML:

```html
<div role="grid" aria-colcount="6">
  <div role="rowgroup">
    <div role="row">
      <div role="columnheader" aria-colindex="1">First name</div>
      <div role="columnheader" aria-colindex="2">Last name</div>
      <div role="columnheader" aria-colindex="5">City</div>
      <div role="columnheader" aria-colindex="6">Zip</div>
    </div>
  </div>
  <div role="rowgroup">
    <div role="row">
      <div role="gridcell" aria-colindex="1">Debra</div>
      <div role="gridcell" aria-colindex="2">Burks</div>
      <div role="gridcell" aria-colindex="5">New York</div>
      <div role="gridcell" aria-colindex="6">14127</div>
    </div>
  </div>
  …
</div>
```

Here's a couple of ways you could find element(s) using the DOM APIs:

```ts
// Single element:
const firstHeaderRow = document.querySelector(`[role="row"] [role="columnheader"]:first-child`);

// Multiple elements in document:
const allGridCells = document.querySelectorAll(`[role="gridcell"]`);

// Finding all children in parent element:
const grid = document.querySelector("grid");
const gridRows = grid.querySelectorAll(`[role="row"]`);
```

But there are some issues. For one, `document.querySelectorAll` returns a [NodeList](https://developer.mozilla.org/en-US/docs/Web/API/NodeList), which are annoying to work with.

You can use `findElement` and `findAllElements` instead:

```ts
import { findElement, findAllElements } from "@laserware/dominator";

const firstHeaderColumn = findElement(
  `[role="row"] [role="columnheader"]:first-child`,
);

// Returns the grid cell elements as an array:
const allGridCells = findAllElements<"div">(`[role="gridcell"]`);

// You can use string selectors for the target and parent to get children:
const gridRows = findAllElements(`[role="row"]`, "grid");
```

### Setting Attributes

Setting attributes with the DOM APIs has some drawbacks:

1. You need to call `setAttribute` for each attribute you want to set.
2. You have to stringify each value before setting it.

```ts
const div = document.createElement("div");

div.setAttribute("role", "gridcell");

// Need to convert boolean to a string:
div.setAttribute("aria-disabled", "true");

// And do the same for numbers:
div.setAttribute("aria-colindex", "1");
```

You can use `setAttribute` or `setAttributes` instead. Both functions return the element:

```ts
import { 
  createElement,
  setAttribute,
  setAttributes, 
} from "@laserware/dominator";

let div = createElement("div");

// Set one attribute:
div = setAttribute(div, "role", "gridcell");

// Set multiple attributes:
div = setAttributes(div, {
  // You can just use a boolean, no need to stringify:
  "aria-disabled": true,
  // Same goes for numbers:
  "aria-colindex": 1,
});
```

### Removing Attributes

Removing attributes using the DOM APIs requires that you remove each attribute individually. 

Assuming you have this HTML:

```html
<div id="example" role="gridcell" aria-disabled="true">Example</div>
```

Instead of using the `element.removeAttribute` API:

```ts
const div = document.getElementById("example");

div.removeAttribute("role");
div.removeAttribute("aria-disabled");
```

You can use `removeAttribute` or `removeAttributes`. Both functions return the element:

```ts
import {
  findElement,
  removeAttribute,
  removeAttributes,
} from "@laserware/dominator";

let div = findElement("#example")!;

div = removeAttribute(div, "role");

div = removeAttributes(div, ["aria-disabled", "aria-colindex"]);
```

### Checking for Attributes

If you want to check for the existence of attributes using the DOM API, you'd use `element.hasAttribute`.

If you want to check if a value matches, you're stuck with the annoyances of `getAttribute`. So you're back to dealing with strings.

Assuming you have this HTML:

```html
<div id="example" role="gridcell" aria-disabled="true" aria-colindex="1">Example</div>
```

Here's how you would check for attributes with the DOM APIs:

```ts
const div = document.getElementById("example");

const hasRole = div.hasAttribute("role");

const index = 1;
const isCol = div.getAttribute("aria-colindex") === index.toString();
```

You can use `hasAttribute`, `hasAllAttributes`, and `hasSomeAttributes` instead:

```ts
import { 
  findElement,
  hasAttribute,
  hasAllAttributes,
  hasSomeAttributes,
} from "@laserware/dominator";

const div = findElement("#example");

const hasRole = hasAttribute(div, "role");

// Check if any of the attributes are present:
const someArePresent = hasSomeAttributes(div, ["aria-colindex"]);

// Check if any of the attributes names and values match:
const someMatchValues = hasSomeAttributes(div, { "aria-colindex": 1 });

// Check if all of the attributes match, you can use `null` to
// check for the _existence_ of an attribute only:
const allMatch = hasAllAttributes(div, { 
  "aria-colindex": 1, 
  "aria-disabled": null,
});
```

### Selecting Elements with Attributes

Building a CSS selector to find something based on attributes requires a lot of manual labor.

Assuming you have this HTML:

```html
<div role="grid" aria-colcount="6">
  <div role="rowgroup">
    <div role="row">
      <div role="columnheader" aria-colindex="1">First name</div>
      <div role="columnheader" aria-colindex="2">Last name</div>
      <div role="columnheader" aria-colindex="5">City</div>
      <div role="columnheader" aria-colindex="6">Zip</div>
    </div>
  </div>
  <div role="rowgroup">
    <div role="row">
      <div role="gridcell" aria-colindex="1">Debra</div>
      <div role="gridcell" aria-colindex="2">Burks</div>
      <div role="gridcell" aria-colindex="5">New York</div>
      <div role="gridcell" aria-colindex="6">14127</div>
    </div>
  </div>
  …
</div>
```

You'll need to write the selectors yourself:

```ts
const firstHeaderColumn = findElement(`[role="row"] [role="columnheader"]`);

const secondGridCell = findElement(`[role="gridcell"][aria-colindex="2"]`);
```

You can use `selectAttribute` and `selectAttributes` instead:

```ts
import { 
  findElement,
  selectAttribute,
  selectAttributes,
} from "@laserware/dominator";

const firstHeaderSelector = [
  selectAttribute("role", "row"),
  selectAttribute("role", "columnheader"),
].join(" ");

const firstHeaderColumn = findElement(firstHeaderSelector);

const secondGridCellSelector = selectAttributes({
  role: "gridcell",
  // Note that we're using a number:
  "aria-colindex": 2,
});

const secondGridCell = findElement(secondGridCellSelector);
```

You can do more than work with attributes. You can also set, get, remove, and select [dataset entries](https://laserware.github.io/dominator/modules/dataset.html),
[CSS variables](https://laserware.github.io/dominator/modules/css.html), and [styles](https://laserware.github.io/dominator/modules/styles.html).
