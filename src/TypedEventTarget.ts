type TypedEventListener<E> = (event: Event & E) => void;

interface TypedEventListenerObject<E> {
  handleEvent(object: Event & E): void;
}

type TypedEventListenerOrEventListenerObject<E> =
  | TypedEventListener<E>
  | TypedEventListenerObject<E>;

/**
 * Used to add type safety to event listeners on a class that extends `EventTarget`.
 * See the example below for additional details.
 *
 * @example
 * // Create an "event map" with the key equal to the name of the
 * // dispatched event and the value equal to the event type:
 * type MyTypedEventMap = {
 *   "open": CustomEvent<string>;
 *   "close": CustomEvent<string>;
 * }
 *
 * // Then, extend `TypedEventTarget` and pass in the event map type
 * // to the generic:
 * export class MyClass extends TypedEventTarget<MyTypedEventMap> {
 *   public dispatchOpen(): void {
 *     this.dispatchEvent("open", { detail: "Hello!" });
 *   }
 *
 *   public dispatchClose(): void {
 *     this.dispatchEvent("close", { detail: "Goodbye!" });
 *   }
 * }
 *
 * // When you create an instance of the class, you get autocomplete/type
 * // safety in event listeners:
 * const myInstance = new MyClass();
 *
 * myInstance.addEventListener("open", (event) => {
 *   console.log(event.detail); // <- "Hello!"
 * });
 *
 * myInstance.addEventListener("close", (event) => {
 *   console.log(event.detail); // <- "Goodbye!"
 *
 *   // This is a type error, this was typed as a string in MyTypedEventMap!
 *   const someNumber: number = event.detail;
 * });
 *
 * // This is a type error, the event doesn't exist in MyTypedEventMap!
 * myInstance.addEventListener("yeet", (event) => {
 *   // ...
 * });
 *
 * myInstance.dispatchOpen();
 *
 * @class
 */
export class TypedEventTarget<
  EventMap extends Record<string, Event | CustomEvent>,
> extends EventTarget {
  // @ts-ignore
  public dispatchEvent<K extends keyof EventMap>(event: EventMap[K]): boolean {
    return super.dispatchEvent(event as Event);
  }

  public addEventListener<K extends keyof EventMap, E extends EventMap[K]>(
    type: K,
    callback: TypedEventListenerOrEventListenerObject<E> | null,
    options?: boolean | AddEventListenerOptions,
  ): void {
    super.addEventListener(
      type as string,
      callback as EventListenerOrEventListenerObject,
      options,
    );
  }

  public removeEventListener<K extends keyof EventMap, E extends EventMap[K]>(
    type: K,
    callback: TypedEventListenerOrEventListenerObject<E> | null,
    options?: boolean | AddEventListenerOptions,
  ): void {
    super.removeEventListener(
      type as string,
      callback as EventListenerOrEventListenerObject,
      options,
    );
  }
}
