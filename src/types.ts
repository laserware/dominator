type FormInputEvent = Event & {
  currentTarget: EventTarget & HTMLInputElement;
};

export type ElementInput =
  | Document
  | Element
  | Event
  | EventTarget
  | FormInputEvent
  | HTMLElement
  | ChildNode
  | Node
  | ParentNode
  | null
  | undefined;

export type SelectorInput = string | null | undefined;

export type ElementOrSelectorInput = ElementInput | SelectorInput;
