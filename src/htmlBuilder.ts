import type { AriaAttrs } from "./types.ts";

type HTMLElementTagName = keyof HTMLElementTagNameMap;

type SVGElementTagName = keyof SVGElementTagNameMap;

type AnyElementTagName = HTMLElementTagName | SVGElementTagName;

type ElementWithTagName<TN extends AnyElementTagName> =
  TN extends HTMLElementTagName
    ? HTMLElementTagNameMap[TN]
    : TN extends SVGElementTagName
      ? SVGElementTagNameMap[TN]
      : never;

type AnyElement =
  | ElementWithTagName<HTMLElementTagName>
  | ElementWithTagName<SVGElementTagName>;

type ElementAttrs<TN extends AnyElementTagName> = Omit<
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

export type Primitive = boolean | string | number;

export type CSSVariables = {
  [key: `--${string}`]: Primitive;
};

type AllowedCSSStyleDeclaration = Omit<
  CSSStyleDeclaration,
  // These are read-only:
  | "length"
  | "parentRule"

  // These are functions which we don't want to allow in the builder:
  | "getPropertyPriority"
  | "getPropertyValue"
  | "item"
  | "removeProperty"
  | "setProperty"

  // This allows us to access the index of a style, which we also don't want
  // to allow in the builder.
  | number
>;

type CustomProperties = {
  class?: string;
  dataset?: DOMStringMap;
  style?: AllowedCSSStyleDeclaration | CSSVariables;
  [key: `data-${string}`]: Primitive;
};

type AllowedProperties<TN extends AnyElementTagName> =
  | Partial<AriaAttrs>
  | Omit<ElementAttrs<TN>, "style" | "click">
  | { on: ElementEventListenersOrDescriptors }
  | CustomProperties;

/**
 * Interface for the HTML element builder.
 *
 * @property build Function that takes in a parent element and optional AbortController
 *                 and returns an HTML element. The AbortController is required if
 *                 you attach any event listeners to the element. The parent element is
 *                 optional for the root element.
 */
export interface ElementBuilder<
  TN extends AnyElementTagName = AnyElementTagName,
> {
  build(
    parentElement?: AnyElement | undefined,
    controller?: AbortController | undefined,
  ): ElementWithTagName<TN>;
}

type NonFunctionalChild = ElementBuilder | AnyElement | Primitive | null;

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
 *                 See {@link Child} for additional details.
 */
export function html<TN extends AnyElementTagName>(
  tagName: TN,
  properties: Partial<AllowedProperties<TN>>,
  ...children: Child[]
): ElementBuilder<TN> {
  return {
    build(
      parentElement?: AnyElement | undefined,
      controller?: AbortController | undefined,
    ): ElementWithTagName<TN> {
      const element = document.createElement(tagName) as ElementWithTagName<TN>;

      setElementProperties(element, properties, controller);

      const getChildElement = (child: Child): AnyElement | Text | null => {
        if (child === null) {
          return null;
        }

        if (isPrimitive(child)) {
          return document.createTextNode(child.toString());
        }

        if (child instanceof Element) {
          return child;
        }

        if ("build" in child) {
          return child.build(element, controller);
        }

        if (typeof child === "function") {
          return getChildElement(child());
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

      return element;
    },
  };
}

/**
 * Iterates through the specified properties (passed into the builder function)
 * and assigns them to the specified element.
 *
 * @param element Element to be updated with specified properties.
 * @param properties Attributes and event listeners to set on element.
 * @param controller Abort controller to clean up event listeners.
 */
function setElementProperties<TN extends AnyElementTagName>(
  element: ElementWithTagName<TN>,
  properties: Partial<AllowedProperties<TN>> = {},
  controller?: AbortController | undefined,
): void {
  const setObjectProperties = (
    name: "dataset" | "style",
    attrsObject: Record<string, Primitive>,
  ): void => {
    for (const [key, value] of Object.entries(attrsObject)) {
      if (name === "style") {
        setStyleProperty(element, key, value);
      } else {
        setDatasetProperty(element, key, value);
      }
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

    element.setAttribute(name, value.toString());
  }
}

/**
 * Adds specified event listeners to the specified element. If the specified
 * AbortController is undefined, an error is thrown. Otherwise, the events
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

/**
 * Sets the specified property name to the specified value on the element.
 *
 * @param element Element containing style to update.
 * @param propertyName Name of the style property to update.
 * @param value Value of the style property.
 */
function setStyleProperty<TN extends AnyElementTagName>(
  element: ElementWithTagName<TN>,
  propertyName: string,
  value: Primitive,
): void {
  // Using `setProperty` here to set a custom CSS variable:
  if (propertyName.startsWith("--")) {
    element.style.setProperty(propertyName, value.toString());
  } else {
    const allowedName = propertyName as keyof AllowedCSSStyleDeclaration;

    element.style[allowedName] = value.toString();
  }
}

/**
 * Adds the specified key/value pair to the element's dataset.
 *
 * @param element Element containing dataset to update.
 * @param key Key of the dataset object to add/update.
 * @param value Value to assign to the dataset object for the specified key.
 */
function setDatasetProperty<TN extends AnyElementTagName>(
  element: ElementWithTagName<TN>,
  key: string,
  value: Primitive,
): void {
  if (isPrimitive(value)) {
    element.dataset[key] = value.toString();
  } else {
    // prettier-ignore
    throw new Error(`Invalid dataset property value type ${typeof value} for ${key}`)
  }
}

/**
 * Returns true if the specified value is a valid property value (i.e. a boolean,
 * number, or string).
 */
function isPrimitive(value: unknown): value is Primitive {
  return (
    typeof value === "boolean" ||
    typeof value === "number" ||
    typeof value === "string"
  );
}
