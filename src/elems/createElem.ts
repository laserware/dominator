import { cast, isNil, isNotNil, isPlainObject } from "@laserware/arcade";

import { setAttrs } from "../attrs/setAttrs.ts";
import type { Attrs } from "../attrs/types.ts";
import { setCssVars } from "../css/setCssVars.ts";
import type { CssVars } from "../css/types.ts";
import { setData } from "../data/setData.ts";
import type { Data } from "../data/types.ts";
import type { AnyElement, ElementWithTagName, TagName } from "../dom.ts";
import { setStyles } from "../styles/setStyles.ts";

import type { Styles } from "../styles/types.ts";

type NeverMethods<T> = {
  [K in keyof T]: T[K] extends (...args: any[]) => any ? never : K;
}[keyof T];

export type ExcludeMethods<T> = Pick<T, NeverMethods<T>>;

/**
 * Properties of an element with tag name `TN` that are _not_ methods (e.g.
 * `setAttribute` or `attachInternals`).
 *
 * @template TN Tag name for the associated element.
 */
export type NonMethodElemProperties<TN extends TagName> = ExcludeMethods<
  ElementWithTagName<TN>
>;

/**
 * Properties that can be set on the element with the specified `TN` tag name.
 *
 * Note that methods/functions are excluded because this is used in the
 * {@linkcode createElem} function.
 *
 * @template TN Tag name for the associated element.
 */
export type ElemProperties<TN extends TagName> = Omit<
  NonMethodElemProperties<TN>,
  keyof GlobalEventHandlers
>;

/**
 * Name of the event handler.
 */
export type EventHandlerName = keyof GlobalEventHandlersEventMap;

/**
 * Event listener that is called with event that corresponds to name `EN`.
 *
 * @template EN Name of the event that listener is associated with.
 */
export type EventListener<EN extends EventHandlerName> = (
  event: GlobalEventHandlersEventMap[EN],
) => void;

/**
 * Object with a listener that is called when the corresponding event fires
 * and the options that are passed into [addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener).
 *
 * @template EN Name of the Event that `listener` is associated with.
 */
export interface EventDescriptor<EN extends EventHandlerName> {
  /**
   * Callback fired when the event is fired.
   */
  listener: EventListener<EN>;

  /**
   * Event listener options object. See [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#options)
   * for additional details.
   */
  options: AddEventListenerOptions;
}

/**
 * Event listener or descriptor used to add listeners to an element created
 * with the {@linkcode createElem} function.
 *
 * @template EN Name of the Event that the listener or  is associated with.
 */
export type EventListenerOrDescriptor<EN extends EventHandlerName> =
  | EventListener<EN>
  | EventDescriptor<EN>;

/**
 * Object with key of event name and value of an event listener or
 * {@linkcode EventDescriptor}.
 */
export type EventListenersOrDescriptors = {
  [EN in EventHandlerName]?: EventListenerOrDescriptor<EN>;
};

/**
 * Options for creating an element using {@linkcode createElem}.
 *
 * @expand
 *
 * @template TN Tag name for the created element.
 */
export type CreateElemOptions<TN extends TagName> = Partial<
  ElemProperties<TN>
> & {
  /** Attributes to set on element. */
  attrs?: Attrs<ElementWithTagName<TN>>;

  /** AbortController to clean up event listeners. */
  controller?: AbortController | undefined;

  /** CSS variables to set on element. */
  cssVars?: CssVars;

  /** Dataset entries to set on element. */
  data?: Data;

  /**
   * Event listeners or {@linkcode EventDescriptor} objects to set on element.
   *
   * The `EventDescriptor` is an object with a `listener` field that defines
   * the callback that is fired when the corresponding event is dispatched and
   * an `options` object matching the `options` argument in `addEventListener`.
   * See the [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#options) for additional details.
   */
  on?: EventListenersOrDescriptors;

  /** Styles to set on element. */
  styles?: Styles;
};

/**
 * Types of children that can be passed to {@linkcode createElem}.
 */
export type ElemChild = AnyElement | string | null;

/**
 * Creates an HTML element of type `E` with the specified `tag` and `options`.
 * The attributes, CSS variables, dataset entries, and styles specified in
 * `options` are set on the element. Optionally specify `children` to append
 * to the newly created element.
 *
 * @template TN Tag name of the created element.
 *
 * @param tag Tag name of the HTML/SVG element to create (e.g. `div`, `svg`, etc.).
 * @param options Optional attributes, CSS variables, dataset entries, and styles
 *                to set on element.
 * @param [children] Optional children to append to created element.
 *
 * @returns Element of type `E` with the specified `tag` and `options`.
 *
 * @example
 * **Code**
 *
 * ```ts
 * // It's nice to use an import alias to shorten the function name:
 * import { createElem as elem } from "@laserware/dominator";
 *
 * // Used to clean up the `dblclick` event listener:
 * const controller = new AbortController();
 *
 * const child = elem("button", {
 *   ariaLabel: "Click Me",
 *   type: "button",
 *   attrs: {
 *     disabled: true,
 *   },
 *   data: {
 *     isValid: true,
 *   },
 *   cssVars: {
 *     "--color-bg": "blue",
 *   },
 *   on: {
 *     // This listener will never get removed:
 *     click(event: MouseEvent) {
 *       console.log("Clicked!");
 *     },
 *     // If you need to remove a listener, specify an object so you can
 *     // use an `AbortSignal`:
 *     dblclick: {
 *       listener(event: MouseEvent) {
 *         console.log("Double-clicked!");
 *       },
 *       // Pass in a signal to clean up the listener:
 *       options: { signal: controller.signal },
 *     },
 *   },
 * }, "Click");
 *
 * const parent = elem("div", { styles: { fontSize: "24px" } }, child);
 *
 * document.body.appendChild(parent);
 * ```
 *
 * **HTML**
 *
 * ```html
 * <body>
 *   <div style="font-size: 24px;">
 *     <button
 *       type="button"
 *       disabled="true"
 *       aria-label="Click Me"
 *       data-is-valid="true"
 *       style="--color-bg: blue;"
 *     >
 *       Click
 *     </button>
 *   </div>
 * </body>
 * ```
 */
export function createElem<TN extends TagName>(
  tag: TN,
  options: CreateElemOptions<TN> = {},
  ...children: ElemChild[]
): ElementWithTagName<TN> {
  const element = document.createElement(tag);

  const props = { ...options };

  if (isNotNil(options.attrs)) {
    setAttrs(element, options.attrs);
    delete props.attrs;
  }

  if (isNotNil(options.cssVars)) {
    setCssVars(options.cssVars, element);
    delete props.cssVars;
  }

  if (isNotNil(options.data)) {
    setData(element, options.data);
    delete props.data;
  }

  if (isNotNil(options.on)) {
    addEventListeners(element, options.on);
    delete props.on;
  }

  if (isNotNil(options.styles)) {
    setStyles(element, options.styles);
  }

  for (const name of Object.keys(props)) {
    // @ts-ignore
    element[name] = props[name];
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
 * Adds specified event listeners in `eventsDict` to the specified `element`.
 *
 * @template TN Tag name of the specified `element`.
 *
 * @param element Element to attach events to.
 * @param eventsDict Object with key of event name and value of event listener.
 */
function addEventListeners<TN extends TagName>(
  element: ElementWithTagName<TN>,
  eventsDict: EventListenersOrDescriptors,
): void {
  const eventNames = Object.keys(eventsDict) as EventHandlerName[];

  for (const eventName of eventNames) {
    const listenerOrDescriptor = eventsDict[eventName]!;

    let eventListener: EventListener<typeof eventName>;

    let options: AddEventListenerOptions = {};

    if (isEventDescriptor(listenerOrDescriptor)) {
      eventListener = listenerOrDescriptor.listener;

      options = listenerOrDescriptor.options;
    } else {
      // prettier-ignore
      eventListener = listenerOrDescriptor as EventListener<typeof eventName>;
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
