type FormInputEvent = Event & {
  currentTarget: EventTarget & HTMLInputElement;
};

export type ElementInput =
  | Document
  | Element
  | HTMLElement
  | Event
  | FormInputEvent
  | null
  | undefined;

export type SelectorInput = string | null | undefined;

export type ElementOrSelectorInput = ElementInput | SelectorInput;

export type TargetType = "currentTarget" | "target";
