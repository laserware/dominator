// noinspection SpellCheckingInspection

import { isNotNil, isPlainObject } from "@laserware/arcade";

import type { AriaAttrs } from "../aria.ts";
import { setAttrs } from "../attr/setAttrs.ts";
import { setCssVars } from "../css/setCssVars.ts";
import { setData } from "../data/setData.ts";
import { stringifyDOMValue } from "../internal/domValues.ts";
import { setStyles } from "../style/setStyles.ts";
import {
  AttrValue,
  type AnyElement,
  type AnyElementTagName,
  type Attrs,
  type CssVars,
  type Data,
  type ElementWithTagName,
  type Styles,
} from "../types.ts";

type NeverMethods<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? never : K;
}[keyof T];

// prettier-ignore
type GlobalEventHandler =
  | "onabort" | "onanimationcancel" | "onanimationend" | "onanimationiteration"
  | "onanimationstart" | "onauxclick" | "onbeforeinput" | "onbeforetoggle"
  | "onblur" | "oncancel" | "oncanplay" | "oncanplaythrough" | "onchange"
  | "onclick" | "onclose" | "oncontextlost" | "oncontextmenu" | "oncontextrestored"
  | "oncopy" | "oncuechange" | "oncut" | "ondblclick" | "ondrag" | "ondragend"
  | "ondragenter" | "ondragleave" | "ondragover" | "ondragstart" | "ondrop"
  | "ondurationchange" | "onemptied" | "onended" | "onerror" | "onfocus"
  | "onformdata" | "ongotpointercapture" | "oninput" | "oninvalid" | "onkeydown"
  | "onkeypress" | "onkeyup" | "onload" | "onloadeddata" | "onloadedmetadata"
  | "onloadstart" | "onlostpointercapture" | "onmousedown" | "onmouseenter"
  | "onmouseleave" | "onmousemove" | "onmouseout" | "onmouseover" | "onmouseup"
  | "onpaste" | "onpause" | "onplay" | "onplaying" | "onpointercancel"
  | "onpointerdown" | "onpointerenter" | "onpointerleave" | "onpointermove"
  | "onpointerout" | "onpointerover" | "onpointerup" | "onprogress" | "onratechange"
  | "onreset" | "onresize" | "onscroll" | "onscrollend"
  | "onsecuritypolicyviolation" | "onseeked" | "onseeking" | "onselect"
  | "onselectionchange" | "onselectstart" | "onslotchange" | "onstalled"
  | "onsubmit" | "onsuspend" | "ontimeupdate" | "ontoggle" | "ontouchcancel"
  | "ontouchend" | "ontouchmove" | "ontouchstart" | "ontransitioncancel"
  | "ontransitionend" | "ontransitionrun" | "ontransitionstart" | "onvolumechange"
  | "onwaiting" | "onwebkitanimationend" | "onwebkitanimationiteration"
  | "onwebkitanimationstart" | "onwebkittransitionend" | "onwheel" | "onafterprint"
  | "onbeforeprint" | "onbeforeunload" | "ongamepadconnected" | "ongamepaddisconnected"
  | "onhashchange" | "onlanguagechange" | "onmessage" | "onmessageerror"
  | "onoffline" | "ononline" | "onpagehide" | "onpageshow" | "onpopstate"
  | "onrejectionhandled" | "onstorage" | "onunhandledrejection" | "onunload"
  | "onfullscreenchange" | "onfullscreenerror";

type ExcludeMethods<T> = Pick<T, NeverMethods<T>>;

type NonMethodElementProperties<TN extends AnyElementTagName> = ExcludeMethods<
  ElementWithTagName<TN>
>;

type ElementProperties<TN extends AnyElementTagName> = Omit<
  NonMethodElementProperties<TN>,
  GlobalEventHandler
>;

type ElementEventName = keyof GlobalEventHandlersEventMap;

type ElementEventListener<EN extends ElementEventName> = (
  event: GlobalEventHandlersEventMap[EN],
) => void;

interface ElementEventDescriptor<EN extends ElementEventName> {
  listener: ElementEventListener<EN>;
  options: Omit<AddEventListenerOptions, "signal">;
}

namespace ElementEventDescriptor {
  export function is(value: unknown): value is ElementEventDescriptor<any> {
    if (value === null) {
      return false;
    }

    if (isPlainObject(value)) {
      return "listener" in value;
    }

    return false;
  }
}

type ElementEventListenerOrDescriptor<EN extends ElementEventName> =
  | ElementEventListener<EN>
  | ElementEventDescriptor<EN>;

type ElementEventListenersOrDescriptors = {
  [EN in ElementEventName]?: ElementEventListenerOrDescriptor<EN>;
};

type AllowedProperties<TN extends AnyElementTagName> = {
  id?: string;
  class?: string;
  attrs?: Attrs | Partial<AriaAttrs>;
  cssVars?: CssVars;
  data?: Data;
  on?: ElementEventListenersOrDescriptors;
  props?: Partial<Omit<ElementProperties<TN>, "id" | "style" | "click">>;
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
    // @ts-ignore
    return value?.[identifier] === "ElementBuilder";
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
export type ElementBuilderChild = NonFunctionalChild | ChildFunction;

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
 *                 See {@linkcode ElementBuilderChild} for additional details.
 *
 * @returns An object with a `build` function that returns the built Element.
 */
export function html<TN extends AnyElementTagName>(
  tagName: TN,
  properties: Partial<AllowedProperties<TN>>,
  ...children: ElementBuilderChild[]
): ElementBuilder<TN> {
  const build = (
    parentElement?: AnyElement | undefined,
    controller?: AbortController | undefined,
  ): ElementWithTagName<TN> => {
    const element = document.createElement(tagName) as ElementWithTagName<TN>;

    setElementProperties(element, properties, controller);

    const getChildElement = (
      child: ElementBuilderChild,
    ): AnyElement | Text | null => {
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
function addEventListeners<TN extends AnyElementTagName>(
  element: ElementWithTagName<TN>,
  eventsDict: ElementEventListenersOrDescriptors,
  controller?: AbortController | undefined,
): void {
  if (!(controller instanceof AbortController)) {
    // prettier-ignore
    throw new Error("You must pass in an AbortController when specifying event listeners");
  }

  const eventNames = Object.keys(eventsDict) as ElementEventName[];

  for (const eventName of eventNames) {
    const listenerOrDescriptor = eventsDict[eventName]!;

    let eventListener: ElementEventListener<typeof eventName>;

    let options: AddEventListenerOptions = {};

    if (ElementEventDescriptor.is(listenerOrDescriptor)) {
      eventListener = listenerOrDescriptor.listener;

      options = listenerOrDescriptor.options;
    } else {
      // prettier-ignore
      eventListener = listenerOrDescriptor as ElementEventListener<typeof eventName>;
    }

    element.addEventListener(eventName, eventListener, {
      ...options,
      signal: controller.signal,
    });
  }
}
