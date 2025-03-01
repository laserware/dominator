import { cast, is } from "@laserware/arcade";

import { setAttributes } from "../attributes/setAttributes.ts";
import type { Attributes } from "../attributes/types.ts";
import { setCssVars } from "../css/setCssVars.ts";
import type { CssVars } from "../css/types.ts";
import { setDatasetEntries } from "../dataset/setDataset.ts";
import type { Dataset } from "../dataset/types.ts";
import type {
  AnyElementEventMap,
  ElementOf,
  HTMLElementTagName,
  SVGElementTagName,
  TagName,
} from "../dom.ts";
import { setStyles } from "../styles/setStyles.ts";
import type { Styles } from "../styles/types.ts";

/**
 * Name of the event handler.
 *
 * @template TN Tag name of the associated element.
 */
export type EventNameFor<TN extends TagName | string> =
  TN extends HTMLElementTagName
    ? keyof HTMLElementEventMap
    : TN extends SVGElementTagName
      ? keyof SVGElementEventMap
      : TN extends string
        ? keyof AnyElementEventMap
        : never;

/**
 * Any event for an HTML or SVG element.
 *
 * @template TN Tag name of the associated element.
 */
export type EventFor<
  TN extends TagName | string,
  EN extends EventNameFor<TN>,
> = TN extends HTMLElementTagName
  ? HTMLElementEventMap[EN]
  : TN extends SVGElementTagName
    ? SVGElementEventMap[EN]
    : TN extends string
      ? AnyElementEventMap
      : never;

/**
 * Event listener that is called with event that corresponds to name `EN`.
 *
 * @template TN Tag name of the associated element.
 * @template EN Name of the event that listener is associated with.
 */
export type EventListenerFor<
  TN extends TagName | string,
  EN extends EventNameFor<TN>,
> = (event: EventFor<TN, EN>) => void;

export interface EventListenerObjectFor<
  TN extends TagName | string,
  EN extends EventNameFor<TN>,
> {
  handleEvent(object: EventFor<TN, EN>): void;
}

export type EventListenerOrEventListenerObjectFor<
  TN extends TagName | string,
  EN extends EventNameFor<TN>,
> = EventListenerFor<TN, EN> | EventListenerObjectFor<TN, EN>;

/**
 * Properties that can be set on the element with the specified `TN` tag name.
 *
 * Note that methods/functions are excluded because this is used in the
 * {@linkcode createElement} function.
 *
 * @template TN Tag name for the associated element.
 */
export type ElementPropertiesOf<TN extends TagName | string> = ElementOf<TN>;

/**
 * Object with a listener that is called when the corresponding event fires
 * and the options that are passed into [addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener).
 *
 * @template TN Tag name of the associated element.
 * @template EN Name of the Event that `listener` is associated with.
 */
export type EventDescriptorFor<
  TN extends TagName | string,
  EN extends EventNameFor<TN>,
> = {
  /**
   * Callback fired when the event is fired.
   */
  listener: EventListenerFor<TN, EN>;

  /**
   * Event listener options object. See [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#options)
   * for additional details.
   */
  options: AddEventListenerOptions;
};

/**
 * Event listener or descriptor used to add listeners to an element created
 * with the {@linkcode createElement} function.
 *
 * @template TN Tag name of the associated element.
 * @template EN Name of the Event that the listener or  is associated with.
 */
export type EventListenerOrDescriptorFor<
  TN extends TagName | string,
  EN extends EventNameFor<TN>,
> = EventListenerFor<TN, EN> | EventDescriptorFor<TN, EN>;

/**
 * Object with key of event name and value of an event listener or
 * {@linkcode EventDescriptorFor}.
 *
 * @template TN Tag name of the associated element.
 */
export type EventListenersOrDescriptorsFor<
  TN extends TagName | string = string,
> = {
  [EN in EventNameFor<TN>]?: EventListenerOrDescriptorFor<TN, EN>;
};

/**
 * Namespace for the element. This is only required for SVG elements.
 */
export const Namespace = {
  HTML: "http://www.w3.org/1999/xhtml",
  SVG: "http://www.w3.org/2000/svg",
} as const;

/**
 * Namespace for the element.
 */
export type Namespace = (typeof Namespace)[keyof typeof Namespace];

/**
 * Options for creating an element using {@linkcode createElement}.
 *
 * @expand
 *
 * @template TN Tag name for the created element.
 */
export type CreateElementOptions<TN extends TagName | string> = Partial<
  Omit<ElementPropertiesOf<TN>, "attributes" | "dataset">
> & {
  /**
   * Namespace to use when creating the element. This is required for elements
   * that need to be created with [`document.createElementNS()`](https://developer.mozilla.org/en-US/docs/Web/API/Document/createElementNS)
   * (namely, SVG and MathML elements).
   */
  namespace?: Namespace;

  /** Attributes to set on element. */
  attributes?: Attributes<ElementOf<TN>>;

  /** CSS variables to set on element. */
  cssVars?: CssVars;

  /** Dataset entries to set on element. */
  dataset?: Dataset;

  /**
   * Event listeners or {@linkcode EventDescriptorFor} objects to set on element.
   *
   * The `EventDescriptor` is an object with a `listener` field that defines
   * the callback that is fired when the corresponding event is dispatched and
   * an `options` object matching the `options` argument in `addEventListener`.
   * See the [MDN documentation](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#options) for additional details.
   */
  on?: EventListenersOrDescriptorsFor;

  /** Styles to set on element. */
  styles?: Styles;
};

function isCreateElementOptions<TN extends TagName | string>(
  value: unknown,
): value is CreateElementOptions<TN> {
  return !isElementChild(value) && is.objectLiteral(value);
}

/**
 * Types of children that can be passed to {@linkcode createElement}.
 */
export type ElementChild = HTMLElement | SVGElement | string | null;

function isElementChild(value: unknown): value is ElementChild {
  if (typeof value === "string" || value === null) {
    return true;
  }

  return value instanceof Element;
}

/**
 * Creates an HTML element with tag name `TN` and adds the properties/listeners
 * from the `options` object as well as the optional `children`.
 *
 * The attributes, CSS variables, dataset entries, and styles specified in
 * `options` are set on the element. Optionally specify `children` to append
 * to the newly created element.
 *
 * @template TN Tag name of the created element.
 *
 * @param tagName Tag name of the HTML/SVG element to create (e.g. `div`, `svg`, etc.).
 * @param options Optional attributes, CSS variables, dataset entries, and styles
 *                to set on element.
 * @param [children] Optional children to append to created element.
 *
 * @returns Element of tag name `TN` with the specified `options`.
 *
 * @example
 * **Code**
 *
 * ```ts
 * // It's nice to use an import alias to shorten the function name:
 * import { createElement as html } from "@laserware/dominator";
 *
 * // Used to clean up the `dblclick` event listener:
 * const controller = new AbortController();
 *
 * const child = html("button", {
 *   ariaLabel: "Click Me",
 *   type: "button",
 *   attributes: {
 *     disabled: true,
 *   },
 *   dataset: {
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
 * const parent = html("div", { styles: { fontSize: "24px" } }, child);
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
export function createElement<TN extends TagName | string = string>(
  tagName: TN,
  options: CreateElementOptions<TN>,
  ...children: ElementChild[]
): ElementOf<TN>;

/**
 * Creates an HTML element with tag name `TN` with the optional `children`.
 *
 * > [!NOTE]
 * > This is useful for creating an element with no properties and appending
 * > children to it.
 *
 * @template TN Tag name of the created element.
 *
 * @param tagName Tag name of the HTML/SVG element to create (e.g. `div`, `svg`, etc.).
 * @param [children] Optional children to append to created element.
 *
 * @returns Element of tag name `TN` with the specified `options`.
 *
 * @example
 * **Code**
 *
 * ```ts
 * // It's nice to use an import alias to shorten the function name:
 * import { createElement as html } from "@laserware/dominator";
 *
 * const parent = html("div", html("span", "Hello"), html("span", "Goodbye"));
 *
 * document.body.appendChild(parent);
 * ```
 *
 * **HTML**
 *
 * ```html
 * <body>
 *   <div>
 *     <span>Hello</span>
 *     <span>Goodbye</span>
 *   </div>
 * </body>
 * ```
 */
export function createElement<TN extends TagName | string>(
  tagName: TN,
  ...children: ElementChild[]
): ElementOf<TN>;

export function createElement<TN extends TagName | string>(
  tagName: TN,
  childOrOptions?: CreateElementOptions<TN> | ElementChild,
  ...children: ElementChild[]
): ElementOf<TN> {
  let element: Element;
  if (isCreateElementOptions(childOrOptions)) {
    if (is.notNil(childOrOptions.namespace)) {
      element = document.createElementNS(childOrOptions.namespace, tagName);
    } else {
      element = document.createElement(tagName);
    }

    const { attributes, cssVars, dataset, on, styles, ...properties } =
      childOrOptions as any;

    if (is.notNil(attributes)) {
      setAttributes(element, attributes);
    }

    if (is.notNil(cssVars)) {
      setCssVars(cssVars, element);
    }

    if (is.notNil(dataset)) {
      setDatasetEntries(element, dataset);
    }

    if (is.notNil(on)) {
      addEventListeners(element as ElementOf<TN>, on);
    }

    if (is.notNil(styles)) {
      setStyles(element, styles);
    }

    for (const name of Object.keys(properties)) {
      // @ts-ignore
      element[name] = properties[name];
    }
  } else if (isElementChild(childOrOptions)) {
    children.unshift(childOrOptions);
  }

  element ??= document.createElement(tagName);

  for (const child of children) {
    if (is.nil(child)) {
      continue;
    }

    if (typeof child === "string") {
      const text = document.createTextNode(child);

      element.appendChild(text);

      continue;
    }

    element.append(child);
  }

  return cast<ElementOf<TN>>(element);
}

/**
 * Adds specified event listeners in `eventsDict` to the specified `element`.
 *
 * @template TN Tag name of the specified `element`.
 *
 * @param element Element to attach events to.
 * @param eventsDict Object with key of event name and value of event listener.
 */
function addEventListeners<TN extends TagName | string>(
  element: ElementOf<TN>,
  eventsDict: EventListenersOrDescriptorsFor<TN>,
): void {
  const eventNames = Object.keys(eventsDict) as EventNameFor<TN>[];

  for (const eventName of eventNames) {
    const listenerOrDescriptor = eventsDict[eventName]!;

    let eventListener: EventListenerFor<TN, typeof eventName>;

    let options: AddEventListenerOptions = {};

    if (isEventDescriptor(listenerOrDescriptor)) {
      eventListener = listenerOrDescriptor.listener;

      options = listenerOrDescriptor.options;
    } else {
      // biome-ignore format:
      eventListener = listenerOrDescriptor as EventListenerFor<TN, typeof eventName>;
    }

    element.addEventListener(
      eventName,
      cast<EventListenerOrEventListenerObject>(eventListener),
      options,
    );
  }
}

function isEventDescriptor<TN extends TagName | string>(
  value: unknown,
): value is EventDescriptorFor<TN, any> {
  return is.objectLiteral(value) && "listener" in value;
}
