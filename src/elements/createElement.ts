import { cast, isNil, isNotNil, isPlainObject } from "@laserware/arcade";

import { setAttributes } from "../attributes/setAttributes.ts";
import type { Attributes } from "../attributes/types.ts";
import { setCssVars } from "../css/setCssVars.ts";
import type { CssVars } from "../css/types.ts";
import { setDatasetEntries } from "../dataset/setDataset.ts";
import type { Dataset } from "../dataset/types.ts";
import type { ElementOf, TagName } from "../dom.ts";
import { setStyles } from "../styles/setStyles.ts";
import type { Styles } from "../styles/types.ts";

import type {
  ElementPropertiesOf,
  EventListenerFor,
  EventNameFor,
} from "./types.ts";

/**
 * Object with a listener that is called when the corresponding event fires
 * and the options that are passed into [addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener).
 *
 * @template TN Tag name of the associated Element.
 * @template EN Name of the Event that `listener` is associated with.
 */
export type EventDescriptorFor<
  TN extends TagName,
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
 * @template TN Tag name of the associated Element.
 * @template EN Name of the Event that the listener or  is associated with.
 */
export type EventListenerOrDescriptorFor<
  TN extends TagName,
  EN extends EventNameFor<TN>,
> = EventListenerFor<TN, EN> | EventDescriptorFor<TN, EN>;

/**
 * Object with key of event name and value of an event listener or
 * {@linkcode EventDescriptorFor}.
 *
 * @template TN Tag name of the associated Element.
 */
export type EventListenersOrDescriptorsFor<TN extends TagName = "*"> = {
  [EN in EventNameFor<TN>]?: EventListenerOrDescriptorFor<TN, EN>;
};

/**
 * Options for creating an element using {@linkcode createElement}.
 *
 * @expand
 *
 * @template TN Tag name for the created element.
 */
export type CreateElementOptions<TN extends TagName> = Partial<
  Omit<ElementPropertiesOf<TN>, "attributes" | "dataset">
> & {
  /** Attributes to set on element. */
  attributes?: Attributes<TN>;

  /** AbortController to clean up event listeners. */
  controller?: AbortController | undefined;

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

/**
 * Types of children that can be passed to {@linkcode createElement}.
 */
export type ElementChild = HTMLElement | SVGElement | string | null;

/**
 * Creates an HTML element with tag name `TN` and adds the properties/listeners
 * from the `options` object.
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
export function createElement<TN extends TagName>(
  tagName: TN,
  options: CreateElementOptions<TN> = {},
  ...children: ElementChild[]
): ElementOf<TN> {
  const element = document.createElement(tagName);

  const props = { ...options };

  if (isNotNil(options.attributes)) {
    setAttributes(element, options.attributes);
    delete props.attributes;
  }

  if (isNotNil(options.cssVars)) {
    setCssVars(options.cssVars, element);
    delete props.cssVars;
  }

  if (isNotNil(options.dataset)) {
    setDatasetEntries(element, options.dataset);
    delete props.dataset;
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
function addEventListeners<TN extends TagName>(
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
      // prettier-ignore
      eventListener = listenerOrDescriptor as EventListenerFor<TN, typeof eventName>;
    }

    element.addEventListener(
      eventName,
      cast<EventListenerOrEventListenerObject>(eventListener),
      options,
    );
  }
}

function isEventDescriptor<TN extends TagName>(
  value: unknown,
): value is EventDescriptorFor<TN, any> {
  if (value === null) {
    return false;
  }

  if (isPlainObject(value)) {
    return "listener" in value;
  }

  return false;
}
