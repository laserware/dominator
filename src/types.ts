type FormInputEvent = Event & {
  currentTarget: EventTarget & HTMLInputElement;
};

export type ElementInputWithoutString =
  | Document
  | Element
  | HTMLElement
  | Event
  | FormInputEvent
  | null
  | undefined;

export type ElementInput = ElementInputWithoutString | string;

export type TargetType = "currentTarget" | "target";
