import { isNotNil } from "@laserware/arcade";

import type { AriaAttrs } from "../aria.ts";
import { setAttr } from "../attrs/setAttrs.ts";
import { setData } from "../data/setData.ts";
import { stringifyDOMValue } from "../internal/stringifyDOMValue.ts";
import { setStyles } from "../styles/setStyles.ts";
import {
  AttrValue,
  type AnyElement,
  type AnyElementTagName,
  type AttrsDefined,
  type CssVars,
  type ElementWithTagName,
  type Styles,
} from "../types.ts";

type ElementProperties<TN extends AnyElementTagName> = Omit<
  ElementWithTagName<TN>,
  "addEventListener"
>;

type ElementEventName = keyof GlobalEventHandlersEventMap;

type ElementEventListener<EN extends ElementEventName> = (
  event: GlobalEventHandlersEventMap[EN],
) => void;

interface ElementEventDescriptor<EN extends ElementEventName> {
  listener: ElementEventListener<EN>;
  options: Omit<AddEventListenerOptions, "signal">;
}

type ElementEventListenerOrDescriptor<EN extends ElementEventName> =
  | ElementEventListener<EN>
  | ElementEventDescriptor<EN>;

type ElementEventListenersOrDescriptors = {
  [EN in ElementEventName]?: ElementEventListenerOrDescriptor<EN>;
};

type CustomProperties = {
  class?: string;
  dataset?: DOMStringMap;
  style?: Styles | CssVars;
  [key: `data-${string}`]: AttrValue;
};

type AllowedProperties<TN extends AnyElementTagName> =
  | Partial<AriaAttrs>
  | Omit<ElementProperties<TN>, "style" | "click">
  | { on: ElementEventListenersOrDescriptors }
  | CustomProperties;

const identifier = Symbol("identifier");

/**
 * Interface for the HTML element builder.
 *
 * The AbortController (`controller` argument in the `build` callback) is required
 * if you attach any event listeners to the element. The `parentElement` is
 * optional for the root element.
 *
 * @property build Function that takes in a parent element and optional AbortController
 *                 and returns an HTML element.
 */
export interface ElementBuilder<
  TN extends AnyElementTagName = AnyElementTagName,
> {
  [identifier]: "ElementBuilder";
  build(
    parentElement?: AnyElement | undefined,
    controller?: AbortController | undefined,
  ): ElementWithTagName<TN>;
}

namespace ElementBuilder {
  export function is(value: unknown): value is ElementBuilder {
    try {
      // @ts-ignore
      return value?.[identifier] === "ElementBuilder";
    } catch {
      return false;
    }
  }
}

type NonFunctionalChild = ElementBuilder | AnyElement | AttrValue | null;

/**
 * Child item passed to the `html` function. A child item can be any one of the
 * following:
 * - HTML or SVG element
 * - Instance of the `html` element builder that hasn't called `build` yet
 * - Boolean, number, or string (which all get converted to text nodes)
 * - Function that returns any one of the above child items
 * - null, which indicates that nothing should be built/rendered
 */
export type Child = NonFunctionalChild | ChildFunction;

/**
 * Callback that returns a builder child. Note that you cannot return another
 * function that returns a builder child.
 */
type ChildFunction = () => NonFunctionalChild;

/**
 * Utility function that wraps the DOM APIs to make it easier to create an
 * HTML or SVG element with less code. It mimics React's `createElement` API.
 *
 * @param tagName Tag name of the HTML/SVG element to build (e.g. `div`, `svg`, etc.).
 * @param properties Attributes, properties, and event listeners to attach to the element.
 * @param children Child elements, element builders, primitives, callbacks, or null.
 *                 If null, the element is not added. This is useful for conditional rendering.
 *                 See {@linkcode Child} for additional details.
 */
export function html<TN extends AnyElementTagName>(
  tagName: TN,
  properties: Partial<AllowedProperties<TN>>,
  ...children: Child[]
): ElementBuilder<TN> {
  const build = (
    parentElement?: AnyElement | undefined,
    controller?: AbortController | undefined,
  ): ElementWithTagName<TN> => {
    const element = document.createElement(tagName) as ElementWithTagName<TN>;

    setElementProperties(element, properties, controller);

    const getChildElement = (child: Child): AnyElement | Text | null => {
      if (child === null) {
        return null;
      }

      if (ElementBuilder.is(child)) {
        return child.build(element, controller);
      }

      if (typeof child === "function") {
        return getChildElement(child());
      }

      // @ts-ignore
      if (child instanceof Element) {
        return child;
      }

      if (AttrValue.is(child)) {
        const stringValue = stringifyDOMValue(child);

        return document.createTextNode(stringValue ?? "");
      }

      throw new Error("Invalid child");
    };

    for (const child of children) {
      const childElement = getChildElement(child);

      if (childElement === null) {
        continue;
      }

      element.appendChild(childElement);
    }

    if (isNotNil(parentElement)) {
      parentElement.appendChild(element);
    }

    return element;
  };

  return {
    [identifier]: "ElementBuilder",
    build,
  };
}

/**
 * Iterates through the specified properties (passed into the builder function)
 * and assigns them to the specified element.
 *
 * @param element Element to be updated with specified properties.
 * @param properties Attributes and event listeners to set on element.
 * @param controller AbortController to clean up event listeners.
 */
function setElementProperties<TN extends AnyElementTagName>(
  element: ElementWithTagName<TN>,
  properties: Partial<AllowedProperties<TN>> = {},
  controller?: AbortController | undefined,
): void {
  const setObjectProperties = (
    name: "dataset" | "style",
    attrsObject: AttrsDefined,
  ): void => {
    if (name === "style") {
      setStyles(element, attrsObject as Styles);
    } else {
      setData(element, attrsObject);
    }
  };

  for (const [name, value] of Object.entries(properties)) {
    if (name === "on") {
      addEventListeners(element, value, controller);
      continue;
    }

    if (name === "dataset" || name === "style") {
      setObjectProperties(name, value);
      continue;
    }

    setAttr(element, name, value);
  }
}

/**
 * Adds specified event listeners to the specified element. If the specified
 * AbortController is `undefined`, an error is thrown. Otherwise, the events
 * won't get cleaned up when `controller.abort` is called.
 *
 * @param element Element to attach events to.
 * @param eventsDict Object with key of event name and value of event listener.
 * @param controller AbortController to clean up event listeners.
 */
function addEventListeners<TN extends AnyElementTagName>(
  element: ElementWithTagName<TN>,
  eventsDict: ElementEventListenersOrDescriptors,
  controller?: AbortController | undefined,
): void {
  if (controller === undefined) {
    // prettier-ignore
    throw new Error("You must pass in an AbortController when specifying event listeners");
  }

  const eventNames = Object.keys(eventsDict) as ElementEventName[];

  for (const eventName of eventNames) {
    // prettier-ignore
    const eventListenerOrDescriptor = eventsDict[eventName]!;

    let eventListener: ElementEventListener<typeof eventName>;

    let options: AddEventListenerOptions = {};

    if (isElementEventDescriptor(eventListenerOrDescriptor)) {
      eventListener = eventListenerOrDescriptor.listener;
      options = eventListenerOrDescriptor.options;
    } else {
      eventListener = eventListenerOrDescriptor as ElementEventListener<
        typeof eventName
      >;
    }

    element.addEventListener(eventName, eventListener, {
      ...options,
      signal: controller.signal,
    });
  }
}

function isElementEventDescriptor(
  value: unknown,
): value is ElementEventDescriptor<any> {
  if (typeof value !== "object") {
    return false;
  }

  if (value === null) {
    return false;
  }

  return "listener" in value;
}
