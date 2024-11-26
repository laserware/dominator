// noinspection SpellCheckingInspection

import { isNotNil, isPlainObject } from "@laserware/arcade";

import { setAttrs } from "../attr/setAttrs.ts";
import { setCssVars } from "../css/setCssVars.ts";
import { setData } from "../data/setData.ts";
import type { AnyElement, AriaAttributes, ElementWithTagName } from "../dom.ts";
import { stringifyDOMValue } from "../internal/domValues.ts";
import { setStyles } from "../style/setStyles.ts";
import {
  AttrValue,
  type Attrs,
  type CssVars,
  type Data,
  type ExcludeMethods,
  type Styles,
  type TagName,
} from "../types.ts";

type NonMethodElemProperties<TN extends TagName> = ExcludeMethods<
  ElementWithTagName<TN>
>;

type ElemProperties<TN extends TagName> = Omit<
  NonMethodElemProperties<TN>,
  keyof GlobalEventHandlers
>;

type EventName = keyof GlobalEventHandlersEventMap;

type Listener<EN extends EventName> = (
  event: GlobalEventHandlersEventMap[EN],
) => void;

interface EventDescriptor<EN extends EventName> {
  listener: Listener<EN>;
  options: Omit<AddEventListenerOptions, "signal">;
}

namespace EventDescriptor {
  export function is(value: unknown): value is EventDescriptor<any> {
    if (value === null) {
      return false;
    }

    if (isPlainObject(value)) {
      return "listener" in value;
    }

    return false;
  }
}

type ListenerOrDescriptor<EN extends EventName> =
  | Listener<EN>
  | EventDescriptor<EN>;

type ListenersOrDescriptors = {
  [EN in EventName]?: ListenerOrDescriptor<EN>;
};

type AllowedProperties<TN extends TagName> = {
  id?: string;
  class?: string;
  attrs?: Attrs | Partial<AriaAttributes>;
  cssVars?: CssVars;
  data?: Data;
  on?: ListenersOrDescriptors;
  props?: Partial<Omit<ElemProperties<TN>, "id" | "style" | "click">>;
  styles?: Styles;
};

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
export interface ElemBuilder<TN extends TagName = TagName> {
  [identifier]: "ElemBuilder";
  build(
    parentElement?: AnyElement | undefined,
    controller?: AbortController | undefined,
  ): ElementWithTagName<TN>;
}

namespace ElemBuilder {
  export function is(value: unknown): value is ElemBuilder {
    // @ts-ignore
    return value?.[identifier] === "ElemBuilder";
  }
}

type NonFunctionalChild = ElemBuilder | AnyElement | AttrValue | null;

/**
 * Child item passed to the `html` function. A child item can be any one of the
 * following:
 * - HTML or SVG element
 * - Instance of the `html` element builder that hasn't called `build` yet
 * - Boolean, number, or string (which all get converted to text nodes)
 * - Function that returns any one of the above child items
 * - null, which indicates that nothing should be built/rendered
 */
export type ElemBuilderChild = NonFunctionalChild | ChildFunction;

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
 *                 See {@linkcode ElemBuilderChild} for additional details.
 *
 * @returns An object with a `build` function that returns the built Element.
 */
export function html<TN extends TagName>(
  tagName: TN,
  properties: Partial<AllowedProperties<TN>>,
  ...children: ElemBuilderChild[]
): ElemBuilder<TN> {
  const build = (
    parentElement?: AnyElement | undefined,
    controller?: AbortController | undefined,
  ): ElementWithTagName<TN> => {
    const element = document.createElement(tagName) as ElementWithTagName<TN>;

    setElemProperties(element, properties, controller);

    const getChildElement = (
      child: ElemBuilderChild,
    ): AnyElement | Text | null => {
      if (child === null) {
        return null;
      }

      if (ElemBuilder.is(child)) {
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

        /* istanbul ignore next -- @preserve: The nullish coalescing is here to make TS happy. */
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
    [identifier]: "ElemBuilder",
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
function setElemProperties<TN extends TagName>(
  element: ElementWithTagName<TN>,
  properties: Partial<AllowedProperties<TN>> = {},
  controller?: AbortController | undefined,
): void {
  if (isNotNil(properties.id)) {
    element.id = properties.id;
  }

  if (isNotNil(properties.class)) {
    element.classList.add(properties.class);
  }

  if (isNotNil(properties.props)) {
    for (const name of Object.keys(properties.props)) {
      // @ts-ignore
      element[name] = properties.props[name];
    }
  }

  if (isNotNil(properties.attrs)) {
    setAttrs(element, properties.attrs);
  }

  if (isNotNil(properties.data)) {
    setData(element, properties.data);
  }

  if (isNotNil(properties.cssVars)) {
    setCssVars(properties.cssVars, element);
  }

  if (isNotNil(properties.styles)) {
    setStyles(element, properties.styles);
  }

  if (isNotNil(properties.on)) {
    addEventListeners(element, properties.on, controller);
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
 *
 * @throws {Error} If the `controller` is undefined.
 */
function addEventListeners<TN extends TagName>(
  element: ElementWithTagName<TN>,
  eventsDict: ListenersOrDescriptors,
  controller?: AbortController | undefined,
): void {
  if (!(controller instanceof AbortController)) {
    // prettier-ignore
    throw new Error("You must pass in an AbortController when specifying event listeners");
  }

  const eventNames = Object.keys(eventsDict) as EventName[];

  for (const eventName of eventNames) {
    const listenerOrDescriptor = eventsDict[eventName]!;

    let eventListener: Listener<typeof eventName>;

    let options: AddEventListenerOptions = {};

    if (EventDescriptor.is(listenerOrDescriptor)) {
      eventListener = listenerOrDescriptor.listener;

      options = listenerOrDescriptor.options;
    } else {
      // prettier-ignore
      eventListener = listenerOrDescriptor as Listener<typeof eventName>;
    }

    element.addEventListener(eventName, eventListener, {
      ...options,
      signal: controller.signal,
    });
  }
}
