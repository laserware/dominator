import { isNil, isNotNil, isPlainObject } from "@laserware/arcade";

import { setAttrs } from "../attrs/setAttrs.ts";
import type { Attrs } from "../attrs/types.ts";
import { setCssVars } from "../css/setCssVars.ts";
import type { CssVars } from "../css/types.ts";
import { setData } from "../data/setData.ts";
import type { Data } from "../data/types.ts";
import type { AnyElement, ElementWithTagName, TagName } from "../dom.ts";
import { cast } from "../internal/cast.ts";
import { setStyles } from "../styles/setStyles.ts";

import type { Styles } from "../styles/types.ts";

type NeverMethods<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? never : K;
}[keyof T];

export type ExcludeMethods<T> = Pick<T, NeverMethods<T>>;

type NonMethodElemProperties<TN extends TagName> = ExcludeMethods<
  ElementWithTagName<TN>
>;

/**
 * Properties that can be set on the Element with the specified `TN` tag name.
 *
 * Note that methods/functions are excluded because this is used in the
 * {@linkcode createElem} function.
 */
export type ElemProperties<TN extends TagName> = Omit<
  NonMethodElemProperties<TN>,
  keyof GlobalEventHandlers
>;

/**
 * Name of the event handler.
 */
export type EventHandlerName = keyof GlobalEventHandlersEventMap;

type Listener<EN extends EventHandlerName> = (
  event: GlobalEventHandlersEventMap[EN],
) => void;

/**
 * Object with a listener that is called when the corresponding event fires
 * and the options that are passed into [addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener).
 *
 * @template EN Name of the Event that `listener` is associated with`.
 */
export interface EventDescriptor<EN extends EventHandlerName> {
  /**
   * Callback fired when the event is fired.
   */
  listener: Listener<EN>;

  /**
   * Event listener options object. See [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#options)
   * for additional details.
   */
  options: AddEventListenerOptions;
}

/**
 * Event listener or descriptor used to add listeners to an Element created
 * with the {@linkcode createElem} function.
 */
export type ListenerOrDescriptor<EN extends EventHandlerName> =
  | Listener<EN>
  | EventDescriptor<EN>;

/**
 * Object with key of event name and value of an event listener or
 * {@linkcode EventDescriptor}.
 */
export type ListenersOrDescriptors = {
  [EN in EventHandlerName]?: ListenerOrDescriptor<EN>;
};

/**
 * Options for creating an element using {@linkcode createElem}.
 *
 * @template E Element type for attributes.
 */
export interface CreateElemOptions<TN extends TagName> {
  /** Optional ID to set on Element. */
  id?: string;

  /** Optional CSS class to set on Element. */
  className?: string;

  /** Attributes to set on Element. */
  attrs?: Attrs<ElementWithTagName<TN>>;

  /** AbortController to clean up event listeners. */
  controller?: AbortController | undefined;

  /** CSS variables to set on Element. */
  cssVars?: CssVars;

  /** Dataset entries to set on Element. */
  data?: Data;

  /** Event listeners to set on Element. */
  on?: ListenersOrDescriptors;

  /** Properties to set on Element. */
  props?: Partial<Omit<ElemProperties<TN>, "id" | "style" | "click">>;

  /** Styles to set on element. */
  styles?: Styles;
}

/**
 * Types of children that can be passed to {@linkcode createElem}.
 */
export type ElemChild = AnyElement | string | null;

/**
 * Creates an HTML element of type `E` with the specified `tag` and `options`.
 * The attributes, CSS variables, dataset entries, and styles specified in
 * `options` are applied to the root element in the markup.
 *
 * @template TN Tag name of the created Element.
 *
 * @param tag Tag name of the HTML/SVG element to create (e.g. `div`, `svg`, etc.).
 * @param options Optional attributes, CSS variables, dataset entries, and styles
 *                to set on Element.
 * @param [children] Optional children to append to created Element.
 *
 * @returns Element of type `E` with the specified `tag` and `options`.
 */
export function createElem<TN extends TagName>(
  tag: TN,
  options: CreateElemOptions<TN> = {},
  ...children: ElemChild[]
): ElementWithTagName<TN> {
  const element = document.createElement(tag);

  if (isNotNil(options.id)) {
    element.id = options.id;
  }

  if (isNotNil(options.className)) {
    element.classList.add(options.className);
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

  if (isNotNil(options.cssVars)) {
    setCssVars(options.cssVars, element);
  }

  if (isNotNil(options.data)) {
    setData(element, options.data);
  }

  if (isNotNil(options.on)) {
    addEventListeners(element, options.on);
  }

  if (isNotNil(options.styles)) {
    setStyles(element, options.styles);
  }

  for (const child of children) {
    if (isNil(child)) {
      continue;
    }

    if (typeof child === "string") {
      const text = document.createTextNode(child);

      element.appendChild(text);

      continue;
    }

    element.append(child);
  }

  return cast<ElementWithTagName<TN>>(element);
}

/**
 * Adds specified event listeners to the specified Element.
 *
 * @param element Element to attach events to.
 * @param eventsDict Object with key of event name and value of event listener.
 *
 * @throws {Error} If the `controller` is undefined.
 */
function addEventListeners<TN extends TagName>(
  element: ElementWithTagName<TN>,
  eventsDict: ListenersOrDescriptors,
): void {
  const eventNames = Object.keys(eventsDict) as EventHandlerName[];

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

    element.addEventListener(eventName, eventListener, options);
  }
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
