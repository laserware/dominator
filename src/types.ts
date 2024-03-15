type FormInputEvent = Event & {
  currentTarget: EventTarget & HTMLInputElement;
};

export type ElemInput =
  | Document
  | Element
  | HTMLElement
  | Event
  | FormInputEvent
  | null
  | undefined;

export type SelectInput = string | null | undefined;

export type ElemOrSelectInput = ElemInput | SelectInput;

export type TargetType = "currentTarget" | "target";
