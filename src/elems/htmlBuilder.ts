// noinspection SpellCheckingInspection

import { isNotNil, isPlainObject } from "@laserware/arcade";

import { setAttrs } from "../attrs/setAttrs.ts";
import { setCssVars } from "../css/setCssVars.ts";
import { setData } from "../data/setData.ts";
import type { AriaAttributes } from "../dom.ts";
import { stringifyDOMValue } from "../internal/domValues.ts";
import { setStyles } from "../styles/setStyles.ts";
import { isAttrValue } from "../typeGuards.ts";
import type {
  AnyElement,
  Attrs,
  AttrValue,
  CssVars,
  Data,
  ElementWithTagName,
  Styles,
  TagName,
} from "../types.ts";

// TODO: Try to improve performance of types here. TypeScript spends *a lot* of time checking this file.

type NeverMethods<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? never : K;
}[keyof T];

export type ExcludeMethods<T> = Pick<T, NeverMethods<T>>;

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

function isEventDescriptor(value: unknown): value is EventDescriptor<any> {
  if (value === null) {
    return false;
  }

  if (isPlainObject(value)) {
    return "listener" in value;
  }

  return false;
}

type ListenerOrDescriptor<EN extends EventName> =
  | Listener<EN>
  | EventDescriptor<EN>;

type ListenersOrDescriptors = {
  [EN in EventName]?: ListenerOrDescriptor<EN>;
};

/**
 * Options for an Element built with {@linkcode html}.
 *
 * @category Elems
 */
export interface ElemBuilderOptions<TN extends TagName> {
  id?: string;
  class?: string;
  attrs?: Attrs<any> | Partial<AriaAttributes>;
  cssVars?: CssVars;
  data?: Data;
  on?: ListenersOrDescriptors;
  props?: Partial<Omit<ElemProperties<TN>, "id" | "style" | "click">>;
  styles?: Styles;
}

const identifier = Symbol("identifier");

/**
 * Interface for the HTML element builder returned from the {@linkcode html}
 * function.
 *
 * @category Elems
 */
export interface ElemBuilder<TN extends TagName = TagName> {
  [identifier]: "ElemBuilder";

  /**
   * Function that takes in a parent element and optional AbortController
   * and returns an HTML element.
   *
   * @param [parentElement] Optional parent element to attach built Element to.
   * @param [controller] Optional AbortController to clean up event listeners.
   *                     This is required if you specify any event listeners
   *                     in properties.
   */
  build(
    parentElement?: AnyElement | undefined,
    controller?: AbortController | undefined,
  ): ElementWithTagName<TN>;
}

function isElemBuilder(value: unknown): value is ElemBuilder {
  // @ts-ignore
  return value?.[identifier] === "ElemBuilder";
}

/**
 * Child item passed to the `html` function. A child item can be any one of the
 * following:
 * - HTML or SVG element
 * - Instance of the `html` element builder that hasn't called `build` yet
 * - Boolean, number, or string (which all get converted to text nodes)
 * - Function that returns any one of the above child items
 * - null, which indicates that nothing should be built/rendered
 *
 * @category Elems
 */
export type ElemBuilderChild =
  | ElemBuilder
  | AnyElement
  | AttrValue
  | null
  | (() => ElemBuilder | AnyElement | AttrValue | null);

/**
 * Utility function that wraps the DOM APIs to make it easier to create an
 * HTML or SVG element with less code. It mimics React's `createElement` API.
 *
 * @template TN Tag name of the built Element.
 *
 * @param tagName Tag name of the HTML/SVG element to build (e.g. `div`, `svg`, etc.).
 * @param options Attributes, properties, and event listeners to attach to the element.
 * @param children Child elements, element builders, primitives, callbacks, or null.
 *                 If null, the element is not added. This is useful for conditional rendering.
 *                 See {@linkcode ElemBuilderChild} for additional details.
 *
 * @returns An object with a `build` function that returns the built Element.
 *
 * @category Elems
 */
export function html<TN extends TagName>(
  tagName: TN,
  options: Partial<ElemBuilderOptions<TN>>,
  ...children: ElemBuilderChild[]
): ElemBuilder<TN> {
  const build = (
    parentElement?: AnyElement | undefined,
    controller?: AbortController | undefined,
  ): ElementWithTagName<TN> => {
    const element = document.createElement(tagName) as ElementWithTagName<TN>;

    updateElemFromOptions(element, options, controller);

    const getChildElement = (
      child: ElemBuilderChild,
    ): AnyElement | Text | null => {
      if (child === null) {
        return null;
      }

      if (isElemBuilder(child)) {
        return child.build(element, controller);
      }

      if (typeof child === "function") {
        return getChildElement(child());
      }

      // @ts-ignore
      if (child instanceof Element) {
        return child;
      }

      if (isAttrValue(child)) {
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
 * Iterates through the specified `options` (passed into the builder function)
 * and assigns them to the specified Element.
 *
 * @param element Element to be updated with specified properties.
 * @param options Attributes and event listeners to set on Element.
 * @param controller AbortController to clean up event listeners.
 *
 * @template TN Tag name for the built Element.
 */
function updateElemFromOptions<TN extends TagName>(
  element: ElementWithTagName<TN>,
  options: Partial<ElemBuilderOptions<TN>> = {},
  controller?: AbortController | undefined,
): void {
  if (isNotNil(options.id)) {
    element.id = options.id;
  }

  if (isNotNil(options.class)) {
    element.classList.add(options.class);
  }

  if (isNotNil(options.props)) {
    for (const name of Object.keys(options.props)) {
      // @ts-ignore
      element[name] = options.props[name];
    }
  }

  if (isNotNil(options.attrs)) {
    setAttrs(element, options.attrs);
  }

  if (isNotNil(options.data)) {
    setData(element, options.data);
  }

  if (isNotNil(options.cssVars)) {
    setCssVars(options.cssVars, element);
  }

  if (isNotNil(options.styles)) {
    setStyles(element, options.styles);
  }

  if (isNotNil(options.on)) {
    addEventListeners(element, options.on, controller);
  }
}

/**
 * Adds specified event listeners to the specified Element. If the specified
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

    if (isEventDescriptor(listenerOrDescriptor)) {
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
