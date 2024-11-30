# @laserware/dominator

Makes working with the DOM and TypeScript less gross.
See [documentation](https://laserware.github.io/dominator/) if you want to get right to the API.
For a high-level overview of the library, keep reading!

## Modules

This library is split up into several modules (i.e. categories):

### Attrs

The `Attrs` module provides functions for querying and manipulating [attributes](https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes) on HTML and SVG elements.

### CSS

The `CSS` module provides functions for querying and manipulating [CSS variables](https://developer.mozilla.org/en-US/docs/Web/CSS/--*) on HTML and SVG elements.

The API for working with CSS variables is _slightly_ different from the rest of the modules.
Instead of specifying a `target` as the first argument, you specify it as the last argument.
In my experience, CSS variables are normally stored on the `:root` element, so omitting the `target` argument uses the `:root` element.

See the [`getCssVar` function](https://laserware.github.io/dominator/functions/getCssVar.html) as an example.

### Data

The `Data` module provides functions for querying and manipulating the [dataset](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/dataset) entries on HTML and SVG elements.

### Elems

The `Elems` module provides functions for working with HTML and SVG elements.

The difference between a native [Element](https://developer.mozilla.org/en-US/docs/Web/API/Element) and an `Elem` is an `Element` 
is the base class for [HTMLElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement) and [SVGElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement), whereas
an `Elem` could represent a [HTMLElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement), a [SVGElement](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement), 
the [Document](https://developer.mozilla.org/en-US/docs/Web/API/Document), or the element representation of an [EventTarget](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget).
Essentially, it's an abstraction layer over _any_ type of element.

### Styles

The `Styles` module provides functions for querying and manipulating the [style](https://developer.mozilla.org/en-US/docs/Web/API/HTMLElement/style) property on HTML and SVG elements.

## Examples

Let's face it, working with the DOM API kind of sucks (_especially_ with TypeScript).
This library aims to make it a little less painful.

The following examples compare the use of DOM APIs with this library.
The examples will use functions from the `Attrs` and `Elems` modules. 

### Creating Elements

Instead of creating an Element with the DOM APIs:

```ts
const div = document.createElement("div");
div.id = "example";
div.ariaLabel = "Hello!";
```

You can use the `createElem` function:

```ts
import { createElem } from "@laserware/dominator";

const div = createElem("div", { id: "example", props: { ariaLabel: "Hello!" } });
```

### Finding Elements

Finding a single element or multiple elements in the DOM isn't _that_ bad.

Assuming you have this markup:

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

You can use `findElem` and `findAllElems` instead:

```ts
import { findElem, findAllElems } from "@laserware/dominator";

const firstHeaderColumn = findElem(`[role="row"] [role="columnheader"]:first-child`);

// Returns the grid cell elements as an array:
const allGridCells = findAllElems<HTMLDivElement>(`[role="gridcell"]`);

// You can use string selectors for the target and parent to get children:
const gridRows = findAllElems(`[role="row"]`, "grid");
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

You can use `setAttr` or `setAttrs` instead. Both functions return the element:

```ts
import { createElem, setAttr, setAttrs } from "@laserware/dominator";

let div = createElem("div");

// Set one attribute:
div = setAttr(div, "role", "gridcell");

// Set multiple attributes:
div = setAttrs(div, {
  // You can just use a boolean, no need to stringify:
  "aria-disabled": true,
  // Same goes for numbers:
  "aria-colindex": 1,
});
```

### Removing Attributes

Removing attributes using the DOM APIs requires that you remove each attribute individually. 

Assuming you have this markup:

```html
<div id="example" role="gridcell" aria-disabled="true">Example</div>
```

Instead of using the `element.removeAttribute` API:

```ts
const div = document.getElementById("example");

div.removeAttribute("role");
div.removeAttribute("aria-disabled");
```

You can use `removeAttr` or `removeAttrs`. Both functions return the element:

```ts
import {
  findElem,
  removeAttr,
  removeAttrs,
} from "@laserware/dominator";

let div = findElem("#example")!;

div = removeAttr(div, "role");

div = removeAttrs(div, ["aria-disabled", "aria-colindex"]);
```

### Checking for Attributes

If you want to check for the existence of attributes using the DOM API, you'd use `element.hasAttribute`.

If you want to check if a value matches, you're stuck with the annoyances of the DOM APIs. So you're back to dealing with strings.

Assuming you have this markup:

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

You can use `hasAttr`, `hasAllAttrs`, and `hasSomeAttrs` instead:

```ts
import { 
  findElem,
  hasAttr,
  hasAllAttrs,
  hasSomeAttrs,
} from "@laserware/dominator";

const div = findElem("#example");

const hasRole = hasAttr(div, "role");

// Check if any of the attributes are present:
const someArePresent = hasSomeAttrs(div, ["aria-colindex"]);

// Check if any of the attributes names and values match:
const someMatchValues = hasSomeAttrs(div, { "aria-colindex": 1 });

// Check if all of the attributes match, you can use `null` to
// check for the _existence_ of an attribute only:
const allMatch = hasAllAttrs(div, { 
  "aria-colindex": 1, 
  "aria-disabled": null,
});
```

### Selecting Elements with Attributes

Building a CSS selector to find something based on attributes requires a lot of manual labor.

Assuming you have this markup:

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
const firstHeaderColumn = findElem(`[role="row"] [role="columnheader"]`);

const secondGridCell = findElem(`[role="gridcell"][aria-colindex="2"]`);
```

You can use `selectAttr` and `selectAttrs` instead:

```ts
import { findElem, selectAttr, selectAttrs } from "@laserware/dominator";

const firstHeaderSelector = [
  selectAttr("role", "row"),
  selectAttr("role", "columnheader"),
].join(" ");

const firstHeaderColumn = findElem(firstHeaderSelector);

const secondGridCellSelector = selectAttrs({
  role: "gridcell",
  // Note that we're using a number:
  "aria-colindex": 2,
});

const secondGridCell = findElem(secondGridCellSelector);
```

You can do more than work with attributes. You can also set, get, remove, and select dataset entries,
CSS variables, and styles. See the examples in the [documentation](https://laserware.github.io/dominator/) for additional details.
