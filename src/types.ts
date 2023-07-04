type FormInputEvent = Event & {
  currentTarget: EventTarget & HTMLInputElement;
};

export type ElementInput =
  | Document
  | Element
  | HTMLElement
  | Event
  | FormInputEvent
  | string
  | null
  | undefined;
