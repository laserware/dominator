/* eslint-disable @typescript-eslint/no-empty-object-type */
// noinspection SpellCheckingInspection,JSDeprecatedSymbols,JSUnusedGlobalSymbols

// Type definitions for HTML attributes, based on JSX React 18 typings
// Original Project/Authors:
// Type definitions for React 18.0
// Project: http://facebook.github.io/react/
// Definitions by: Asana <https://asana.com>
//                 AssureSign <http://www.assuresign.com>
//                 Microsoft <https://microsoft.com>
//                 John Reilly <https://github.com/johnnyreilly>
//                 Benoit Benezech <https://github.com/bbenezech>
//                 Patricio Zavolinsky <https://github.com/pzavolinsky>
//                 Eric Anderson <https://github.com/ericanderson>
//                 Dovydas Navickas <https://github.com/DovydasNavickas>
//                 Josh Rutherford <https://github.com/theruther4d>
//                 Guilherme Hübner <https://github.com/guilhermehubner>
//                 Ferdy Budhidharma <https://github.com/ferdaber>
//                 Johann Rakotoharisoa <https://github.com/jrakotoharisoa>
//                 Olivier Pascal <https://github.com/pascaloliv>
//                 Martin Hochel <https://github.com/hotell>
//                 Frank Li <https://github.com/franklixuefei>
//                 Jessica Franco <https://github.com/Jessidhia>
//                 Saransh Kataria <https://github.com/saranshkataria>
//                 Kanitkorn Sujautra <https://github.com/lukyth>
//                 Sebastian Silbermann <https://github.com/eps1lon>
//                 Kyle Scully <https://github.com/zieka>
//                 Cong Zhang <https://github.com/dancerphil>
//                 Dimitri Mitropoulos <https://github.com/dimitropoulos>
//                 JongChan Choi <https://github.com/disjukr>
//                 Victor Magalhães <https://github.com/vhfmag>
//                 Dale Tan <https://github.com/hellatan>
//                 Priyanshu Rav <https://github.com/priyanshurav>
// Definitions: https://github.com/DefinitelyTyped/DefinitelyTyped
// TypeScript Version: 2.8

type Booleanish = boolean | "true" | "false";

/**
 * All the WAI-ARIA 1.1 attributes from the {@link https://www.w3.org/TR/wai-aria-1.1/|specification}.
 */
export interface AriaAttributes {
  /**
   * Identifies the currently active element when DOM focus is on a composite
   * widget, textbox, group, or application.
   */
  "aria-activedescendant"?: string | undefined | null;
  /**
   * Indicates whether assistive technologies will present all, or only parts
   * of, the changed region based on the change notifications defined by the
   * aria-relevant attribute.
   */
  "aria-atomic"?: Booleanish | undefined | null;
  /**
   * Indicates whether inputting text could trigger display of one or more
   * predictions of the user's intended value for an input and specifies how
   * predictions would be presented if they are made.
   */
  "aria-autocomplete"?: "none" | "inline" | "list" | "both" | undefined | null;
  /**
   * Indicates an element is being modified and that assistive technologies MAY
   * want to wait until the modifications are complete before exposing them
   * to the user.
   */
  "aria-busy"?: Booleanish | undefined | null;
  /**
   * Indicates the current "checked" state of checkboxes, radio buttons, and
   * other widgets. See {@linkcode aria-pressed} and {@linkcode aria-selected}.
   */
  "aria-checked"?: boolean | "false" | "mixed" | "true" | undefined | null;
  /**
   * Defines the total number of columns in a table, grid, or treegrid.
   * See {@linkcode aria-colindex}.
   */
  "aria-colcount"?: number | undefined | null;
  /**
   * Defines an element's column index or position with respect to the total
   * number of columns within a table, grid, or treegrid.
   * @see aria-colcount @see aria-colspan.
   */
  "aria-colindex"?: number | undefined | null;
  /**
   * Defines the number of columns spanned by a cell or gridcell within a
   * table, grid, or treegrid.
   * @see aria-colindex @see aria-rowspan.
   */
  "aria-colspan"?: number | undefined | null;
  /**
   * Identifies the element (or elements) whose contents or presence are
   * controlled by the current element. See {@linkcode aria-owns}.
   */
  "aria-controls"?: string | undefined | null;
  /**
   * Indicates the element that represents the current item within a container
   * or set of related elements.
   */
  "aria-current"?:
    | Booleanish
    | "page"
    | "step"
    | "location"
    | "date"
    | "time"
    | undefined
    | null;
  /**
   * Identifies the element (or elements) that describes the object.
   * See {@linkcode aria-labelledby}.
   */
  "aria-describedby"?: string | undefined | null;
  /**
   * Identifies the element that provides a detailed, extended description for
   * the object. See {@linkcode aria-describedby}.
   */
  "aria-details"?: string | undefined | null;
  /**
   * Indicates that the element is perceivable but disabled, so it is not
   * editable or otherwise operable. See {@linkcode aria-hidden} and
   * {@linkcode aria-readonly}.
   */
  "aria-disabled"?: Booleanish | undefined | null;
  /**
   * Indicates what functions can be performed when a dragged object is released
   * on the drop target.
   * @deprecated in ARIA 1.1
   */
  "aria-dropeffect"?:
    | "none"
    | "copy"
    | "execute"
    | "link"
    | "move"
    | "popup"
    | undefined
    | null;
  /**
   * Identifies the element that provides an error message for the object.
   * @see aria-invalid @see aria-describedby.
   */
  "aria-errormessage"?: string | undefined | null;
  /** Indicates whether the element, or another grouping element it controls, is currently expanded or collapsed. */
  "aria-expanded"?: Booleanish | undefined | null;
  /**
   * Identifies the next element (or elements) in an alternate reading order of content which, at the user's discretion,
   * allows assistive technology to override the general default of reading in document source order.
   */
  "aria-flowto"?: string | undefined | null;
  /**
   * Indicates an element's "grabbed" state in a drag-and-drop operation.
   * @deprecated in ARIA 1.1
   */
  "aria-grabbed"?: Booleanish | undefined | null;
  /** Indicates the availability and type of interactive popup element, such as menu or dialog, that can be triggered by an element. */
  "aria-haspopup"?:
    | Booleanish
    | "menu"
    | "listbox"
    | "tree"
    | "grid"
    | "dialog"
    | undefined
    | null;
  /**
   * Indicates whether the element is exposed to an accessibility API.
   * See {@linkcode aria-disabled}.
   */
  "aria-hidden"?: Booleanish | undefined | null;
  /**
   * Indicates the entered value does not conform to the format expected by the application.
   * See {@linkcode aria-errormessage}.
   */
  "aria-invalid"?: Booleanish | "grammar" | "spelling" | undefined | null;
  /**
   * Indicates keyboard shortcuts that an author has implemented to activate
   * or give focus to an element.
   */
  "aria-keyshortcuts"?: string | undefined | null;
  /**
   * Defines a string value that labels the current element.
   * See {@linkcode aria-labelledby}.
   */
  "aria-label"?: string | undefined | null;
  /**
   * Identifies the element (or elements) that labels the current element.
   * See {@linkcode aria-describedby}.
   */
  "aria-labelledby"?: string | undefined | null;
  /**
   * Defines the hierarchical level of an element within a structure.
   */
  "aria-level"?: number | undefined | null;
  /**
   * Indicates that an element will be updated, and describes the types of
   * updates the user agents, assistive technologies, and user can expect from
   * the live region.
   */
  "aria-live"?: "off" | "assertive" | "polite" | undefined | null;
  /**
   * Indicates whether an element is modal when displayed.
   */
  "aria-modal"?: Booleanish | undefined | null;
  /**
   * Indicates whether a text box accepts multiple lines of input or only a
   * single line.
   */
  "aria-multiline"?: Booleanish | undefined | null;
  /**
   * Indicates that the user may select more than one item from the current
   * selectable descendants.
   */
  "aria-multiselectable"?: Booleanish | undefined | null;
  /**
   * Indicates whether the element's orientation is horizontal, vertical, or
   * unknown/ambiguous.
   */
  "aria-orientation"?: "horizontal" | "vertical" | undefined | null;
  /**
   * Identifies an element (or elements) in order to define a visual, functional,
   * or contextual parent/child relationship between DOM elements where the DOM
   * hierarchy cannot be used to represent the relationship.
   * See {@linkcode aria-controls}.
   */
  "aria-owns"?: string | undefined | null;
  /**
   * Defines a short hint (a word or short phrase) intended to aid the user with
   * data entry when the control has no value. A hint could be a sample value or a
   * brief description of the expected format.
   */
  "aria-placeholder"?: string | undefined | null;
  /**
   * Defines an element's number or position in the current set of listitems or
   * treeitems. Not required if all elements in the set are present in the DOM.
   * See {@linkcode aria-setsize}.
   */
  "aria-posinset"?: number | undefined | null;
  /**
   * Indicates the current "pressed" state of toggle buttons.
   * See {@linkcode aria-checked} and {@linkcode aria-selected}.
   */
  "aria-pressed"?: boolean | "false" | "mixed" | "true" | undefined | null;
  /**
   * Indicates that the element is not editable, but is otherwise operable.
   * See {@linkcode aria-disabled}.
   */
  "aria-readonly"?: Booleanish | undefined | null;
  /**
   * Indicates what notifications the user agent will trigger when the
   * accessibility tree within a live region is modified.
   * See {@linkcode aria-atomic}.
   */
  "aria-relevant"?:
    | "additions"
    | "additions removals"
    | "additions text"
    | "all"
    | "removals"
    | "removals additions"
    | "removals text"
    | "text"
    | "text additions"
    | "text removals"
    | undefined
    | null;
  /**
   * Indicates that user input is required on the element before a form may
   * be submitted.
   */
  "aria-required"?: Booleanish | undefined | null;
  /**
   * Defines a human-readable, author-localized description for the role of
   * an element.
   */
  "aria-roledescription"?: string | undefined | null;
  /**
   * Defines the total number of rows in a table, grid, or treegrid.
   * See {@linkcode aria-rowindex}.
   */
  "aria-rowcount"?: number | undefined | null;
  /**
   * Defines an element's row index or position with respect to the total number
   * of rows within a table, grid, or treegrid. See {@linkcode aria-rowcount}
   * and {@linkcode aria-rowspan}.
   */
  "aria-rowindex"?: number | undefined | null;
  /**
   * Defines the number of rows spanned by a cell or gridcell within a table,
   * grid, or treegrid. See {@linkcode aria-rowindex} and {@linkcode aria-colspan}.
   */
  "aria-rowspan"?: number | undefined | null;
  /**
   * Indicates the current "selected" state of various widgets.
   * See {@linkcode aria-checked} and {@linkcode aria-pressed}.
   */
  "aria-selected"?: Booleanish | undefined | null;
  /**
   * Defines the number of items in the current set of listitems or treeitems.
   * Not required if all elements in the set are present in the DOM.
   * See {@linkcode aria-posinset}.
   */
  "aria-setsize"?: number | undefined | null;
  /**
   * Indicates if items in a table or grid are sorted in ascending or
   * descending order.
   */
  "aria-sort"?:
    | "none"
    | "ascending"
    | "descending"
    | "other"
    | undefined
    | null;
  /**
   * Defines the maximum allowed value for a range widget.
   */
  "aria-valuemax"?: number | undefined | null;
  /**
   * Defines the minimum allowed value for a range widget.
   */
  "aria-valuemin"?: number | undefined | null;
  /**
   * Defines the current value for a range widget.
   * See {@linkcode aria-valuetext}.
   */
  "aria-valuenow"?: number | undefined | null;
  /**
   * Defines the human-readable text alternative of {@linkcode aria-valuenow}
   * for a range widget.
   */
  "aria-valuetext"?: string | undefined | null;
}

// All the WAI-ARIA 1.1 role attribute values from https://www.w3.org/TR/wai-aria-1.1/#role_definitions
export type AriaRole =
  | "alert"
  | "alertdialog"
  | "application"
  | "article"
  | "banner"
  | "button"
  | "cell"
  | "checkbox"
  | "columnheader"
  | "combobox"
  | "complementary"
  | "contentinfo"
  | "definition"
  | "dialog"
  | "directory"
  | "document"
  | "feed"
  | "figure"
  | "form"
  | "grid"
  | "gridcell"
  | "group"
  | "heading"
  | "img"
  | "link"
  | "list"
  | "listbox"
  | "listitem"
  | "log"
  | "main"
  | "marquee"
  | "math"
  | "menu"
  | "menubar"
  | "menuitem"
  | "menuitemcheckbox"
  | "menuitemradio"
  | "navigation"
  | "none"
  | "note"
  | "option"
  | "presentation"
  | "progressbar"
  | "radio"
  | "radiogroup"
  | "region"
  | "row"
  | "rowgroup"
  | "rowheader"
  | "scrollbar"
  | "search"
  | "searchbox"
  | "separator"
  | "slider"
  | "spinbutton"
  | "status"
  | "switch"
  | "tab"
  | "table"
  | "tablist"
  | "tabpanel"
  | "term"
  | "textbox"
  | "timer"
  | "toolbar"
  | "tooltip"
  | "tree"
  | "treegrid"
  | "treeitem"
  | (string & {});

export type FullAutoFill =
  | AutoFill
  | "bday"
  | `${OptionalPrefixToken<AutoFillAddressKind>}${"cc-additional-name"}`
  | "nickname"
  | "language"
  | "organization-title"
  | "photo"
  | "sex"
  | "url";

export interface HTMLAttributes
  extends AriaAttributes,
    Partial<GlobalEventHandlers> {
  // Standard HTML Attributes
  accesskey?: string | undefined | null;
  autocapitalize?:
    | "characters"
    | "off"
    | "on"
    | "none"
    | "sentences"
    | "words"
    | undefined
    | null;
  autofocus?: boolean | undefined | null;
  class?: string | undefined | null;
  contenteditable?:
    | Booleanish
    | "inherit"
    | "plaintext-only"
    | undefined
    | null;
  contextmenu?: string | undefined | null;
  dir?: "ltr" | "rtl" | "auto" | undefined | null;
  draggable?: Booleanish | undefined | null;
  elementtiming?: string | undefined | null;
  enterkeyhint?:
    | "enter"
    | "done"
    | "go"
    | "next"
    | "previous"
    | "search"
    | "send"
    | undefined
    | null;
  hidden?: boolean | "until-found" | "" | undefined | null;
  id?: string | undefined | null;
  lang?: string | undefined | null;
  part?: string | undefined | null;
  placeholder?: string | undefined | null;
  slot?: string | undefined | null;
  spellcheck?: Booleanish | undefined | null;
  style?: string | undefined | null;
  tabindex?: number | undefined | null;
  title?: string | undefined | null;
  translate?: "yes" | "no" | "" | undefined | null;
  inert?: boolean | undefined | null;
  popover?: "auto" | "manual" | "" | undefined | null;
  writingsuggestions?: Booleanish | undefined | null;

  // Unknown
  radiogroup?: string | undefined | null; // <command>, <menuitem>

  // WAI-ARIA
  role?: AriaRole | undefined | null;

  // RDFa Attributes
  about?: string | undefined | null;
  datatype?: string | undefined | null;
  inlist?: any;
  prefix?: string | undefined | null;
  property?: string | undefined | null;
  resource?: string | undefined | null;
  typeof?: string | undefined | null;
  vocab?: string | undefined | null;

  // Non-standard Attributes
  autosave?: string | undefined | null;
  color?: string | undefined | null;
  itemprop?: string | undefined | null;
  itemscope?: boolean | undefined | null;
  itemtype?: string | undefined | null;
  itemid?: string | undefined | null;
  itemref?: string | undefined | null;
  results?: number | undefined | null;
  security?: string | undefined | null;
  unselectable?: "on" | "off" | undefined | null;

  // Living Standard
  /**
   * Hints at the type of data that might be entered by the user while editing
   * the element or its contents.
   * @see https://html.spec.whatwg.org/multipage/interaction.html#input-modalities:-the-inputmode-attribute
   */
  inputmode?:
    | "none"
    | "text"
    | "tel"
    | "url"
    | "email"
    | "numeric"
    | "decimal"
    | "search"
    | undefined
    | null;
  /**
   * Specify that a standard HTML element should behave like a defined custom
   * built-in element.
   * @see https://html.spec.whatwg.org/multipage/custom-elements.html#attr-is
   */
  is?: string | undefined | null;

  // Allow any `data-` attribute
  [key: `data-${string}`]: any;
}

export type HTMLAttributeAnchorTarget =
  | "_self"
  | "_blank"
  | "_parent"
  | "_top"
  | (string & {});

export interface HTMLAnchorAttributes extends HTMLAttributes {
  download?: any;
  href?: string | undefined | null;
  hreflang?: string | undefined | null;
  media?: string | undefined | null;
  ping?: string | undefined | null;
  rel?: string | undefined | null;
  target?: HTMLAttributeAnchorTarget | undefined | null;
  type?: string | undefined | null;
  referrerpolicy?: ReferrerPolicy | undefined | null;
}

export interface HTMLAudioAttributes extends HTMLMediaAttributes {}

export interface HTMLAreaAttributes extends HTMLAttributes {
  alt?: string | undefined | null;
  coords?: string | undefined | null;
  download?: any;
  href?: string | undefined | null;
  hreflang?: string | undefined | null;
  media?: string | undefined | null;
  referrerpolicy?: ReferrerPolicy | undefined | null;
  rel?: string | undefined | null;
  shape?: "circle" | "default" | "poly" | "rect" | undefined | null;
  target?: string | undefined | null;
  ping?: string | undefined | null;
}

export interface HTMLBaseAttributes extends HTMLAttributes {
  href?: string | undefined | null;
  target?: string | undefined | null;
}

export interface HTMLBlockquoteAttributes extends HTMLAttributes {
  cite?: string | undefined | null;
}

export interface HTMLButtonAttributes extends HTMLAttributes {
  disabled?: boolean | undefined | null;
  form?: string | undefined | null;
  formaction?: string | undefined | null;
  formenctype?:
    | "application/x-www-form-urlencoded"
    | "multipart/form-data"
    | "text/plain"
    | undefined
    | null;
  formmethod?:
    | "dialog"
    | "get"
    | "post"
    | "DIALOG"
    | "GET"
    | "POST"
    | undefined
    | null;
  formnovalidate?: boolean | undefined | null;
  formtarget?: string | undefined | null;
  name?: string | undefined | null;
  type?: "submit" | "reset" | "button" | undefined | null;
  value?: string | string[] | number | undefined | null;
  popovertarget?: string | undefined | null;
  popovertargetaction?: "toggle" | "show" | "hide" | undefined | null;
}

export interface HTMLCanvasAttributes extends HTMLAttributes {
  height?: number | string | undefined | null;
  width?: number | string | undefined | null;
}

export interface HTMLTableColAttributes extends HTMLAttributes {
  span?: number | undefined | null;
  width?: number | string | undefined | null;
}

export interface HTMLColgroupAttributes extends HTMLAttributes {
  span?: number | undefined | null;
}

export interface HTMLDataAttributes extends HTMLAttributes {
  value?: string | string[] | number | undefined | null;
}

export interface HTMLDetailsAttributes extends HTMLAttributes {
  open?: boolean | undefined | null;
  name?: string | undefined | null;
}

export interface HTMLDelAttributes extends HTMLAttributes {
  cite?: string | undefined | null;
  datetime?: string | undefined | null;
}

export interface HTMLDialogAttributes extends HTMLAttributes {
  open?: boolean | undefined | null;
}

export interface HTMLEmbedAttributes extends HTMLAttributes {
  height?: number | string | undefined | null;
  src?: string | undefined | null;
  type?: string | undefined | null;
  width?: number | string | undefined | null;
}

export interface HTMLFieldSetAttributes extends HTMLAttributes {
  disabled?: boolean | undefined | null;
  form?: string | undefined | null;
  name?: string | undefined | null;
}

export interface HTMLFormAttributes extends HTMLAttributes {
  acceptcharset?: string | undefined | null;
  action?: string | undefined | null;
  autocomplete?: AutoFillBase | undefined | null;
  enctype?:
    | "application/x-www-form-urlencoded"
    | "multipart/form-data"
    | "text/plain"
    | undefined
    | null;
  method?:
    | "dialog"
    | "get"
    | "post"
    | "DIALOG"
    | "GET"
    | "POST"
    | undefined
    | null;
  name?: string | undefined | null;
  novalidate?: boolean | undefined | null;
  target?: string | undefined | null;
  rel?: string | undefined | null;
}

export interface HTMLHtmlAttributes extends HTMLAttributes {
  manifest?: string | undefined | null;
}

export interface HTMLIFrameAttributes extends HTMLAttributes {
  allow?: string | undefined | null;
  allowfullscreen?: boolean | undefined | null;
  allowtransparency?: boolean | undefined | null;
  /** @deprecated */
  frameborder?: number | string | undefined | null;
  height?: number | string | undefined | null;
  loading?: "eager" | "lazy" | undefined | null;
  /** @deprecated */
  marginheight?: number | undefined | null;
  /** @deprecated */
  marginwidth?: number | undefined | null;
  name?: string | undefined | null;
  referrerpolicy?: ReferrerPolicy | undefined | null;
  sandbox?: string | undefined | null;
  /** @deprecated */
  scrolling?: string | undefined | null;
  seamless?: boolean | undefined | null;
  src?: string | undefined | null;
  srcdoc?: string | undefined | null;
  width?: number | string | undefined | null;
}

export interface HTMLImageAttributes extends HTMLAttributes {
  alt?: string | undefined | null;
  crossorigin?: "anonymous" | "use-credentials" | "" | undefined | null;
  decoding?: "async" | "auto" | "sync" | undefined | null;
  fetchpriority?: "auto" | "high" | "low" | undefined | null;
  height?: number | string | undefined | null;
  ismap?: boolean | undefined | null;
  loading?: "eager" | "lazy" | undefined | null;
  referrerpolicy?: ReferrerPolicy | undefined | null;
  sizes?: string | undefined | null;
  src?: string | undefined | null;
  srcset?: string | undefined | null;
  usemap?: string | undefined | null;
  width?: number | string | undefined | null;
}

export interface HTMLInsAttributes extends HTMLAttributes {
  cite?: string | undefined | null;
  datetime?: string | undefined | null;
}

export type HTMLInputTypeAttribute =
  | "button"
  | "checkbox"
  | "color"
  | "date"
  | "datetime-local"
  | "email"
  | "file"
  | "hidden"
  | "image"
  | "month"
  | "number"
  | "password"
  | "radio"
  | "range"
  | "reset"
  | "search"
  | "submit"
  | "tel"
  | "text"
  | "time"
  | "url"
  | "week"
  | (string & {});

export interface HTMLInputAttributes extends HTMLAttributes {
  accept?: string | undefined | null;
  alt?: string | undefined | null;
  autocomplete?: FullAutoFill | undefined | null;
  // Safari only https://developer.mozilla.org/en-US/docs/Web/HTML/Element/input#autocorrect
  autocorrect?: "on" | "off" | "" | undefined | null;
  capture?: boolean | "user" | "environment" | undefined | null; // https://www.w3.org/TR/html-media-capture/#the-capture-attribute
  checked?: boolean | undefined | null;
  dirname?: string | undefined | null;
  disabled?: boolean | undefined | null;
  form?: string | undefined | null;
  formaction?: string | undefined | null;
  formenctype?:
    | "application/x-www-form-urlencoded"
    | "multipart/form-data"
    | "text/plain"
    | undefined
    | null;
  formmethod?:
    | "dialog"
    | "get"
    | "post"
    | "DIALOG"
    | "GET"
    | "POST"
    | undefined
    | null;
  formnovalidate?: boolean | undefined | null;
  formtarget?: string | undefined | null;
  height?: number | string | undefined | null;
  indeterminate?: boolean | undefined | null;
  list?: string | undefined | null;
  max?: number | string | undefined | null;
  maxlength?: number | undefined | null;
  min?: number | string | undefined | null;
  minlength?: number | undefined | null;
  multiple?: boolean | undefined | null;
  name?: string | undefined | null;
  pattern?: string | undefined | null;
  placeholder?: string | undefined | null;
  readonly?: boolean | undefined | null;
  required?: boolean | undefined | null;
  size?: number | undefined | null;
  src?: string | undefined | null;
  step?: number | string | undefined | null;
  type?: HTMLInputTypeAttribute | undefined | null;
  value?: any;
  width?: number | string | undefined | null;
  webkitdirectory?: boolean | undefined | null;
}

export interface HTMLKeygenAttributes extends HTMLAttributes {
  challenge?: string | undefined | null;
  disabled?: boolean | undefined | null;
  form?: string | undefined | null;
  keytype?: string | undefined | null;
  keyparams?: string | undefined | null;
  name?: string | undefined | null;
}

export interface HTMLLabelAttributes extends HTMLAttributes {
  form?: string | undefined | null;
  for?: string | undefined | null;
}

export interface HTMLLIAttributes extends HTMLAttributes {
  value?: string | string[] | number | undefined | null;
}

export interface HTMLLinkAttributes extends HTMLAttributes {
  as?:
    | "fetch"
    | "audio"
    | "audioworklet"
    | "document"
    | "embed"
    | "font"
    | "frame"
    | "iframe"
    | "image"
    | "json"
    | "manifest"
    | "object"
    | "paintworklet"
    | "report"
    | "script"
    | "serviceworker"
    | "sharedworker"
    | "style"
    | "track"
    | "video"
    | "webidentity"
    | "worker"
    | "xslt"
    | ""
    | undefined
    | null;
  crossorigin?: "anonymous" | "use-credentials" | "" | undefined | null;
  href?: string | undefined | null;
  hreflang?: string | undefined | null;
  integrity?: string | undefined | null;
  media?: string | undefined | null;
  imagesrcset?: string | undefined | null;
  imagesizes?: string | undefined | null;
  referrerpolicy?: ReferrerPolicy | undefined | null;
  rel?: string | undefined | null;
  sizes?: string | undefined | null;
  type?: string | undefined | null;
  charset?: string | undefined | null;
  fetchpriority?: "auto" | "high" | "low" | undefined | null;
}

export interface HTMLMapAttributes extends HTMLAttributes {
  name?: string | undefined | null;
}

export interface HTMLMenuAttributes extends HTMLAttributes {
  type?: string | undefined | null;
}

export interface HTMLMediaAttributes extends HTMLAttributes {
  autoplay?: boolean | undefined | null;
  controls?: boolean | undefined | null;
  controlslist?:
    | "nodownload"
    | "nofullscreen"
    | "noplaybackrate"
    | "noremoteplayback"
    | (string & {})
    | undefined
    | null;
  crossorigin?: "anonymous" | "use-credentials" | "" | undefined | null;
  currenttime?: number | undefined | null;
  defaultmuted?: boolean | undefined | null;
  defaultplaybackrate?: number | undefined | null;
  loop?: boolean | undefined | null;
  mediagroup?: string | undefined | null;
  muted?: boolean | undefined | null;
  playsinline?: boolean | undefined | null;
  preload?: "auto" | "none" | "metadata" | "" | undefined | null;
  src?: string | undefined | null;
  /** A value between 0 and 1 */
  volume?: number | undefined | null;
}

export interface HTMLMetaAttributes extends HTMLAttributes {
  charset?: string | undefined | null;
  content?: string | undefined | null;
  "http-equiv"?:
    | "content-security-policy"
    | "content-type"
    | "default-style"
    | "refresh"
    | "x-ua-compatible"
    | undefined
    | null;
  name?: string | undefined | null;
  media?: string | undefined | null;
}

export interface HTMLMeterAttributes extends HTMLAttributes {
  form?: string | undefined | null;
  high?: number | undefined | null;
  low?: number | undefined | null;
  max?: number | string | undefined | null;
  min?: number | string | undefined | null;
  optimum?: number | undefined | null;
  value?: string | string[] | number | undefined | null;
}

export interface HTMLQuoteAttributes extends HTMLAttributes {
  cite?: string | undefined | null;
}

export interface HTMLObjectAttributes extends HTMLAttributes {
  classid?: string | undefined | null;
  data?: string | undefined | null;
  form?: string | undefined | null;
  height?: number | string | undefined | null;
  name?: string | undefined | null;
  type?: string | undefined | null;
  usemap?: string | undefined | null;
  width?: number | string | undefined | null;
  wmode?: string | undefined | null;
}

export interface HTMLOListAttributes extends HTMLAttributes {
  reversed?: boolean | undefined | null;
  start?: number | undefined | null;
  type?: "1" | "a" | "A" | "i" | "I" | undefined | null;
}

export interface HTMLOptGroupAttributes extends HTMLAttributes {
  disabled?: boolean | undefined | null;
  label?: string | undefined | null;
}

export interface HTMLOptionAttributes extends HTMLAttributes {
  disabled?: boolean | undefined | null;
  label?: string | undefined | null;
  selected?: boolean | undefined | null;
  value?: any;
}

export interface HTMLOutputAttributes extends HTMLAttributes {
  form?: string | undefined | null;
  for?: string | undefined | null;
  name?: string | undefined | null;
}

/** @deprecated */
export interface HTMLParamAttributes extends HTMLAttributes {
  name?: string | undefined | null;
  value?: string | string[] | number | undefined | null;
}

export interface HTMLProgressAttributes extends HTMLAttributes {
  max?: number | string | undefined | null;
  value?: string | string[] | number | undefined | null;
}

export interface HTMLSlotAttributes extends HTMLAttributes {
  name?: string | undefined | null;
}

export interface HTMLScriptAttributes extends HTMLAttributes {
  async?: boolean | undefined | null;
  /** @deprecated */
  charset?: string | undefined | null;
  crossorigin?: "anonymous" | "use-credentials" | "" | undefined | null;
  defer?: boolean | undefined | null;
  fetchpriority?: "auto" | "high" | "low" | undefined | null;
  integrity?: string | undefined | null;
  nomodule?: boolean | undefined | null;
  nonce?: string | undefined | null;
  referrerpolicy?: ReferrerPolicy | undefined | null;
  src?: string | undefined | null;
  type?: string | undefined | null;
}

export interface HTMLSelectAttributes extends HTMLAttributes {
  autocomplete?: FullAutoFill | undefined | null;
  disabled?: boolean | undefined | null;
  form?: string | undefined | null;
  multiple?: boolean | undefined | null;
  name?: string | undefined | null;
  required?: boolean | undefined | null;
  size?: number | undefined | null;
  value?: any;
}

export interface HTMLSourceAttributes extends HTMLAttributes {
  height?: number | string | undefined | null;
  media?: string | undefined | null;
  sizes?: string | undefined | null;
  src?: string | undefined | null;
  srcset?: string | undefined | null;
  type?: string | undefined | null;
  width?: number | string | undefined | null;
}

export interface HTMLStyleAttributes extends HTMLAttributes {
  media?: string | undefined | null;
  nonce?: string | undefined | null;
  scoped?: boolean | undefined | null;
  type?: string | undefined | null;
}

export interface HTMLTableAttributes extends HTMLAttributes {
  align?: "left" | "center" | "right" | undefined | null;
  bgcolor?: string | undefined | null;
  border?: number | undefined | null;
  cellpadding?: number | string | undefined | null;
  cellspacing?: number | string | undefined | null;
  frame?: boolean | undefined | null;
  rules?: "none" | "groups" | "rows" | "columns" | "all" | undefined | null;
  summary?: string | undefined | null;
  width?: number | string | undefined | null;
}

export interface HTMLTextareaAttributes extends HTMLAttributes {
  autocomplete?: FullAutoFill | undefined | null;
  cols?: number | undefined | null;
  dirname?: string | undefined | null;
  disabled?: boolean | undefined | null;
  form?: string | undefined | null;
  maxlength?: number | undefined | null;
  minlength?: number | undefined | null;
  name?: string | undefined | null;
  placeholder?: string | undefined | null;
  readonly?: boolean | undefined | null;
  required?: boolean | undefined | null;
  rows?: number | undefined | null;
  value?: string | string[] | number | undefined | null;
  wrap?: "hard" | "soft" | undefined | null;
}

export interface HTMLTableCellAttributes extends HTMLAttributes {
  align?: "left" | "center" | "right" | "justify" | "char" | undefined | null;
  colspan?: number | undefined | null;
  headers?: string | undefined | null;
  rowspan?: number | undefined | null;
  scope?: "col" | "colgroup" | "row" | "rowgroup" | undefined | null;
  abbr?: string | undefined | null;
  height?: number | string | undefined | null;
  width?: number | string | undefined | null;
  valign?: "top" | "middle" | "bottom" | "baseline" | undefined | null;
}

export interface HTMLTimeAttributes extends HTMLAttributes {
  datetime?: string | undefined | null;
}

export interface HTMLTrackAttributes extends HTMLAttributes {
  default?: boolean | undefined | null;
  kind?:
    | "captions"
    | "chapters"
    | "descriptions"
    | "metadata"
    | "subtitles"
    | undefined
    | null;
  label?: string | undefined | null;
  src?: string | undefined | null;
  srclang?: string | undefined | null;
}

export interface HTMLVideoAttributes extends HTMLMediaAttributes {
  height?: number | string | undefined | null;
  playsinline?: boolean | undefined | null;
  poster?: string | undefined | null;
  width?: number | string | undefined | null;
  disablepictureinpicture?: boolean | undefined | null;
  disableremoteplayback?: boolean | undefined | null;
}

export interface SVGAttributes extends AriaAttributes, HTMLAttributes {
  // Attributes which also defined in HTMLAttributes
  className?: string | undefined | null;
  class?: string | undefined | null;
  color?: string | undefined | null;
  height?: number | string | undefined | null;
  id?: string | undefined | null;
  lang?: string | undefined | null;
  max?: number | string | undefined | null;
  media?: string | undefined | null;
  // On the `textPath` element
  method?: "align" | "stretch" | undefined | null;
  min?: number | string | undefined | null;
  name?: string | undefined | null;
  style?: string | undefined | null;
  target?: string | undefined | null;
  type?: string | undefined | null;
  width?: number | string | undefined | null;

  // Other HTML properties supported by SVG elements in browsers
  role?: AriaRole | undefined | null;
  tabindex?: number | undefined | null;
  crossorigin?: "anonymous" | "use-credentials" | "" | undefined | null;

  // SVG Specific attributes
  "accent-height"?: number | string | undefined | null;
  accumulate?: "none" | "sum" | undefined | null;
  additive?: "replace" | "sum" | undefined | null;
  "alignment-baseline"?:
    | "auto"
    | "baseline"
    | "before-edge"
    | "text-before-edge"
    | "middle"
    | "central"
    | "after-edge"
    | "text-after-edge"
    | "ideographic"
    | "alphabetic"
    | "hanging"
    | "mathematical"
    | "inherit"
    | undefined
    | null;
  allowReorder?: "no" | "yes" | undefined | null;
  alphabetic?: number | string | undefined | null;
  amplitude?: number | string | undefined | null;
  "arabic-form"?:
    | "initial"
    | "medial"
    | "terminal"
    | "isolated"
    | undefined
    | null;
  ascent?: number | string | undefined | null;
  attributeName?: string | undefined | null;
  attributeType?: string | undefined | null;
  autoReverse?: number | string | undefined | null;
  azimuth?: number | string | undefined | null;
  baseFrequency?: number | string | undefined | null;
  "baseline-shift"?: number | string | undefined | null;
  baseProfile?: number | string | undefined | null;
  bbox?: number | string | undefined | null;
  begin?: number | string | undefined | null;
  bias?: number | string | undefined | null;
  by?: number | string | undefined | null;
  calcMode?: number | string | undefined | null;
  "cap-height"?: number | string | undefined | null;
  clip?: number | string | undefined | null;
  "clip-path"?: string | undefined | null;
  clipPathUnits?: number | string | undefined | null;
  "clip-rule"?: number | string | undefined | null;
  "color-interpolation"?: number | string | undefined | null;
  "color-interpolation-filters"?:
    | "auto"
    | "sRGB"
    | "linearRGB"
    | "inherit"
    | undefined
    | null;
  "color-profile"?: number | string | undefined | null;
  "color-rendering"?: number | string | undefined | null;
  contentScriptType?: number | string | undefined | null;
  contentStyleType?: number | string | undefined | null;
  cursor?: number | string | undefined | null;
  cx?: number | string | undefined | null;
  cy?: number | string | undefined | null;
  d?: string | undefined | null;
  decelerate?: number | string | undefined | null;
  descent?: number | string | undefined | null;
  diffuseConstant?: number | string | undefined | null;
  direction?: number | string | undefined | null;
  display?: number | string | undefined | null;
  divisor?: number | string | undefined | null;
  "dominant-baseline"?: number | string | undefined | null;
  dur?: number | string | undefined | null;
  dx?: number | string | undefined | null;
  dy?: number | string | undefined | null;
  edgeMode?: number | string | undefined | null;
  elevation?: number | string | undefined | null;
  "enable-background"?: number | string | undefined | null;
  end?: number | string | undefined | null;
  exponent?: number | string | undefined | null;
  externalResourcesRequired?: number | string | undefined | null;
  fill?: string | undefined | null;
  "fill-opacity"?: number | string | undefined | null;
  "fill-rule"?: "nonzero" | "evenodd" | "inherit" | undefined | null;
  filter?: string | undefined | null;
  filterRes?: number | string | undefined | null;
  filterUnits?: number | string | undefined | null;
  "flood-color"?: number | string | undefined | null;
  "flood-opacity"?: number | string | undefined | null;
  focusable?: number | string | undefined | null;
  "font-family"?: string | undefined | null;
  "font-size"?: number | string | undefined | null;
  "font-size-adjust"?: number | string | undefined | null;
  "font-stretch"?: number | string | undefined | null;
  "font-style"?: number | string | undefined | null;
  "font-variant"?: number | string | undefined | null;
  "font-weight"?: number | string | undefined | null;
  format?: number | string | undefined | null;
  from?: number | string | undefined | null;
  fx?: number | string | undefined | null;
  fy?: number | string | undefined | null;
  g1?: number | string | undefined | null;
  g2?: number | string | undefined | null;
  "glyph-name"?: number | string | undefined | null;
  "glyph-orientation-horizontal"?: number | string | undefined | null;
  "glyph-orientation-vertical"?: number | string | undefined | null;
  glyphRef?: number | string | undefined | null;
  gradientTransform?: string | undefined | null;
  gradientUnits?: string | undefined | null;
  hanging?: number | string | undefined | null;
  href?: string | undefined | null;
  "horiz-adv-x"?: number | string | undefined | null;
  "horiz-origin-x"?: number | string | undefined | null;
  ideographic?: number | string | undefined | null;
  "image-rendering"?: number | string | undefined | null;
  in2?: number | string | undefined | null;
  in?: string | undefined | null;
  intercept?: number | string | undefined | null;
  k1?: number | string | undefined | null;
  k2?: number | string | undefined | null;
  k3?: number | string | undefined | null;
  k4?: number | string | undefined | null;
  k?: number | string | undefined | null;
  kernelMatrix?: number | string | undefined | null;
  kernelUnitLength?: number | string | undefined | null;
  kerning?: number | string | undefined | null;
  keyPoints?: number | string | undefined | null;
  keySplines?: number | string | undefined | null;
  keyTimes?: number | string | undefined | null;
  lengthAdjust?: number | string | undefined | null;
  "letter-spacing"?: number | string | undefined | null;
  "lighting-color"?: number | string | undefined | null;
  limitingConeAngle?: number | string | undefined | null;
  local?: number | string | undefined | null;
  "marker-end"?: string | undefined | null;
  markerHeight?: number | string | undefined | null;
  "marker-mid"?: string | undefined | null;
  "marker-start"?: string | undefined | null;
  markerUnits?: number | string | undefined | null;
  markerWidth?: number | string | undefined | null;
  mask?: string | undefined | null;
  maskContentUnits?: number | string | undefined | null;
  maskUnits?: number | string | undefined | null;
  mathematical?: number | string | undefined | null;
  mode?: number | string | undefined | null;
  numOctaves?: number | string | undefined | null;
  offset?: number | string | undefined | null;
  opacity?: number | string | undefined | null;
  operator?: number | string | undefined | null;
  order?: number | string | undefined | null;
  orient?: number | string | undefined | null;
  orientation?: number | string | undefined | null;
  origin?: number | string | undefined | null;
  overflow?: number | string | undefined | null;
  "overline-position"?: number | string | undefined | null;
  "overline-thickness"?: number | string | undefined | null;
  "paint-order"?: number | string | undefined | null;
  "panose-1"?: number | string | undefined | null;
  path?: string | undefined | null;
  pathLength?: number | string | undefined | null;
  patternContentUnits?: string | undefined | null;
  patternTransform?: number | string | undefined | null;
  patternUnits?: string | undefined | null;
  "pointer-events"?: number | string | undefined | null;
  points?: string | undefined | null;
  pointsAtX?: number | string | undefined | null;
  pointsAtY?: number | string | undefined | null;
  pointsAtZ?: number | string | undefined | null;
  preserveAlpha?: number | string | undefined | null;
  preserveAspectRatio?: string | undefined | null;
  primitiveUnits?: number | string | undefined | null;
  r?: number | string | undefined | null;
  radius?: number | string | undefined | null;
  refX?: number | string | undefined | null;
  refY?: number | string | undefined | null;
  "rendering-intent"?: number | string | undefined | null;
  repeatCount?: number | string | undefined | null;
  repeatDur?: number | string | undefined | null;
  requiredExtensions?: number | string | undefined | null;
  requiredFeatures?: number | string | undefined | null;
  restart?: number | string | undefined | null;
  result?: string | undefined | null;
  rotate?: number | string | undefined | null;
  rx?: number | string | undefined | null;
  ry?: number | string | undefined | null;
  scale?: number | string | undefined | null;
  seed?: number | string | undefined | null;
  "shape-rendering"?: number | string | undefined | null;
  slope?: number | string | undefined | null;
  spacing?: number | string | undefined | null;
  specularConstant?: number | string | undefined | null;
  specularExponent?: number | string | undefined | null;
  speed?: number | string | undefined | null;
  spreadMethod?: string | undefined | null;
  startOffset?: number | string | undefined | null;
  stdDeviation?: number | string | undefined | null;
  stemh?: number | string | undefined | null;
  stemv?: number | string | undefined | null;
  stitchTiles?: number | string | undefined | null;
  "stop-color"?: string | undefined | null;
  "stop-opacity"?: number | string | undefined | null;
  "strikethrough-position"?: number | string | undefined | null;
  "strikethrough-thickness"?: number | string | undefined | null;
  string?: number | string | undefined | null;
  stroke?: string | undefined | null;
  "stroke-dasharray"?: string | number | undefined | null;
  "stroke-dashoffset"?: string | number | undefined | null;
  "stroke-linecap"?: "butt" | "round" | "square" | "inherit" | undefined | null;
  "stroke-linejoin"?:
    | "arcs"
    | "miter-clip"
    | "miter"
    | "round"
    | "bevel"
    | "inherit"
    | undefined
    | null;
  "stroke-miterlimit"?: string | undefined | null;
  "stroke-opacity"?: number | string | undefined | null;
  "stroke-width"?: number | string | undefined | null;
  surfaceScale?: number | string | undefined | null;
  systemLanguage?: number | string | undefined | null;
  tableValues?: number | string | undefined | null;
  targetX?: number | string | undefined | null;
  targetY?: number | string | undefined | null;
  "text-anchor"?: string | undefined | null;
  "text-decoration"?: number | string | undefined | null;
  textLength?: number | string | undefined | null;
  "text-rendering"?: number | string | undefined | null;
  to?: number | string | undefined | null;
  transform?: string | undefined | null;
  "transform-origin"?: string | undefined | null;
  u1?: number | string | undefined | null;
  u2?: number | string | undefined | null;
  "underline-position"?: number | string | undefined | null;
  "underline-thickness"?: number | string | undefined | null;
  unicode?: number | string | undefined | null;
  "unicode-bidi"?: number | string | undefined | null;
  "unicode-range"?: number | string | undefined | null;
  "units-per-em"?: number | string | undefined | null;
  "v-alphabetic"?: number | string | undefined | null;
  values?: string | undefined | null;
  "vector-effect"?: number | string | undefined | null;
  version?: string | undefined | null;
  "vert-adv-y"?: number | string | undefined | null;
  "vert-origin-x"?: number | string | undefined | null;
  "vert-origin-y"?: number | string | undefined | null;
  "v-hanging"?: number | string | undefined | null;
  "v-ideographic"?: number | string | undefined | null;
  viewBox?: string | undefined | null;
  viewTarget?: number | string | undefined | null;
  visibility?: number | string | undefined | null;
  "v-mathematical"?: number | string | undefined | null;
  widths?: number | string | undefined | null;
  "word-spacing"?: number | string | undefined | null;
  "writing-mode"?: number | string | undefined | null;
  x1?: number | string | undefined | null;
  x2?: number | string | undefined | null;
  x?: number | string | undefined | null;
  xChannelSelector?: string | undefined | null;
  "x-height"?: number | string | undefined | null;
  "xlink:actuate"?: string | undefined | null;
  "xlink:arcrole"?: string | undefined | null;
  "xlink:href"?: string | undefined | null;
  "xlink:role"?: string | undefined | null;
  "xlink:show"?: string | undefined | null;
  "xlink:title"?: string | undefined | null;
  "xlink:type"?: string | undefined | null;
  "xml:base"?: string | undefined | null;
  "xml:lang"?: string | undefined | null;
  xmlns?: string | undefined | null;
  "xmlns:xlink"?: string | undefined | null;
  "xml:space"?: string | undefined | null;
  y1?: number | string | undefined | null;
  y2?: number | string | undefined | null;
  y?: number | string | undefined | null;
  yChannelSelector?: string | undefined | null;
  z?: number | string | undefined | null;
  zoomAndPan?: string | undefined | null;

  // Allow any `data-` attribute:
  [key: `data-${string}`]: any;
}

export interface HTMLTemplateAttributes extends HTMLAttributes {
  shadowrootmode?: "open" | "closed" | undefined | null;
}

export interface HTMLWebViewAttributes extends HTMLAttributes {
  allowfullscreen?: boolean | undefined | null;
  allowpopups?: boolean | undefined | null;
  autosize?: boolean | undefined | null;
  blinkfeatures?: string | undefined | null;
  disableblinkfeatures?: string | undefined | null;
  disableguestresize?: boolean | undefined | null;
  disablewebsecurity?: boolean | undefined | null;
  guestinstance?: string | undefined | null;
  httpreferrer?: string | undefined | null;
  nodeintegration?: boolean | undefined | null;
  partition?: string | undefined | null;
  plugins?: boolean | undefined | null;
  /**
   * In the DOM it's only `"auto"` | `"none"` | `"metadata"` | `""`, but Electron
   * allows arbitrary values.
   */
  preload?: string | undefined | null;
  src?: string | undefined | null;
  useragent?: string | undefined | null;
  webpreferences?: string | undefined | null;
}

/*
 * DOM Elements
 */
export interface HTMLAttributesTagNameMap {
  a: HTMLAnchorAttributes;
  abbr: HTMLAttributes;
  address: HTMLAttributes;
  area: HTMLAreaAttributes;
  article: HTMLAttributes;
  aside: HTMLAttributes;
  audio: HTMLAudioAttributes;
  b: HTMLAttributes;
  base: HTMLBaseAttributes;
  bdi: HTMLAttributes;
  bdo: HTMLAttributes;
  big: HTMLAttributes;
  blockquote: HTMLBlockquoteAttributes;
  body: HTMLAttributes;
  br: HTMLAttributes;
  button: HTMLButtonAttributes;
  canvas: HTMLCanvasAttributes;
  caption: HTMLAttributes;
  cite: HTMLAttributes;
  code: HTMLAttributes;
  col: HTMLTableColAttributes;
  colgroup: HTMLColgroupAttributes;
  data: HTMLDataAttributes;
  datalist: HTMLAttributes;
  dd: HTMLAttributes;
  del: HTMLDelAttributes;
  details: HTMLDetailsAttributes;
  dfn: HTMLAttributes;
  dialog: HTMLDialogAttributes;
  div: HTMLAttributes;
  dl: HTMLAttributes;
  dt: HTMLAttributes;
  em: HTMLAttributes;
  embed: HTMLEmbedAttributes;
  fieldset: HTMLFieldSetAttributes;
  figcaption: HTMLAttributes;
  figure: HTMLAttributes;
  footer: HTMLAttributes;
  form: HTMLFormAttributes;
  h1: HTMLAttributes;
  h2: HTMLAttributes;
  h3: HTMLAttributes;
  h4: HTMLAttributes;
  h5: HTMLAttributes;
  h6: HTMLAttributes;
  head: HTMLAttributes;
  header: HTMLAttributes;
  hgroup: HTMLAttributes;
  hr: HTMLAttributes;
  html: HTMLHtmlAttributes;
  i: HTMLAttributes;
  iframe: HTMLIFrameAttributes;
  img: HTMLImageAttributes;
  input: HTMLInputAttributes;
  ins: HTMLInsAttributes;
  kbd: HTMLAttributes;
  keygen: HTMLKeygenAttributes;
  label: HTMLLabelAttributes;
  legend: HTMLAttributes;
  li: HTMLLIAttributes;
  link: HTMLLinkAttributes;
  main: HTMLAttributes;
  map: HTMLMapAttributes;
  mark: HTMLAttributes;
  menu: HTMLMenuAttributes;
  menuitem: HTMLAttributes;
  meta: HTMLMetaAttributes;
  meter: HTMLMeterAttributes;
  nav: HTMLAttributes;
  noscript: HTMLAttributes;
  object: HTMLObjectAttributes;
  ol: HTMLOListAttributes;
  optgroup: HTMLOptGroupAttributes;
  option: HTMLOptionAttributes;
  output: HTMLOutputAttributes;
  p: HTMLAttributes;
  param: HTMLParamAttributes;
  picture: HTMLAttributes;
  pre: HTMLAttributes;
  progress: HTMLProgressAttributes;
  q: HTMLQuoteAttributes;
  rp: HTMLAttributes;
  rt: HTMLAttributes;
  ruby: HTMLAttributes;
  s: HTMLAttributes;
  samp: HTMLAttributes;
  slot: HTMLSlotAttributes;
  script: HTMLScriptAttributes;
  search: HTMLAttributes;
  section: HTMLAttributes;
  select: HTMLSelectAttributes;
  small: HTMLAttributes;
  source: HTMLSourceAttributes;
  span: HTMLAttributes;
  strong: HTMLAttributes;
  style: HTMLStyleAttributes;
  sub: HTMLAttributes;
  summary: HTMLAttributes;
  sup: HTMLAttributes;
  table: HTMLTableAttributes;
  template: HTMLTemplateAttributes;
  tbody: HTMLAttributes;
  td: HTMLTableCellAttributes;
  textarea: HTMLTextareaAttributes;
  tfoot: HTMLAttributes;
  th: HTMLTableCellAttributes;
  thead: HTMLAttributes;
  time: HTMLTimeAttributes;
  title: HTMLAttributes;
  tr: HTMLAttributes;
  track: HTMLTrackAttributes;
  u: HTMLAttributes;
  ul: HTMLAttributes;
  var: HTMLAttributes;
  video: HTMLVideoAttributes;
  wbr: HTMLAttributes;
  webview: HTMLWebViewAttributes;
  // SVG
  svg: SVGAttributes;
  animate: SVGAttributes;
  animateMotion: SVGAttributes;
  animateTransform: SVGAttributes;
  circle: SVGAttributes;
  clipPath: SVGAttributes;
  defs: SVGAttributes;
  desc: SVGAttributes;
  ellipse: SVGAttributes;
  feBlend: SVGAttributes;
  feColorMatrix: SVGAttributes;
  feComponentTransfer: SVGAttributes;
  feComposite: SVGAttributes;
  feConvolveMatrix: SVGAttributes;
  feDiffuseLighting: SVGAttributes;
  feDisplacementMap: SVGAttributes;
  feDistantLight: SVGAttributes;
  feDropShadow: SVGAttributes;
  feFlood: SVGAttributes;
  feFuncA: SVGAttributes;
  feFuncB: SVGAttributes;
  feFuncG: SVGAttributes;
  feFuncR: SVGAttributes;
  feGaussianBlur: SVGAttributes;
  feImage: SVGAttributes;
  feMerge: SVGAttributes;
  feMergeNode: SVGAttributes;
  feMorphology: SVGAttributes;
  feOffset: SVGAttributes;
  fePointLight: SVGAttributes;
  feSpecularLighting: SVGAttributes;
  feSpotLight: SVGAttributes;
  feTile: SVGAttributes;
  feTurbulence: SVGAttributes;
  filter: SVGAttributes;
  foreignObject: SVGAttributes;
  g: SVGAttributes;
  image: SVGAttributes;
  line: SVGAttributes;
  linearGradient: SVGAttributes;
  marker: SVGAttributes;
  mask: SVGAttributes;
  metadata: SVGAttributes;
  mpath: SVGAttributes;
  path: SVGAttributes;
  pattern: SVGAttributes;
  polygon: SVGAttributes;
  polyline: SVGAttributes;
  radialGradient: SVGAttributes;
  rect: SVGAttributes;
  stop: SVGAttributes;
  switch: SVGAttributes;
  symbol: SVGAttributes;
  text: SVGAttributes;
  textPath: SVGAttributes;
  tspan: SVGAttributes;
  use: SVGAttributes;
  view: SVGAttributes;
  [name: string]: { [name: string]: any };
}

export type SVGElementAttributes = SVGAttributes;

// prettier-ignore
export type HTMLElementAttributes<E extends HTMLElement> =
  E extends HTMLAnchorElement
  ? HTMLAnchorAttributes
  : E extends HTMLAreaElement
  ? HTMLAreaAttributes
  : E extends HTMLAudioElement
  ? HTMLAudioAttributes
  : E extends HTMLBaseElement
  ? HTMLBaseAttributes
  : E extends HTMLButtonElement
  ? HTMLButtonAttributes
  : E extends HTMLCanvasElement
  ? HTMLCanvasAttributes
  : E extends HTMLTableColElement
  ? HTMLTableColAttributes
  : E extends HTMLDataElement
  ? HTMLDataAttributes
  : E extends HTMLDetailsElement
  ? HTMLDetailsAttributes
  : E extends HTMLDialogElement
  ? HTMLDialogAttributes
  : E extends HTMLEmbedElement
  ? HTMLEmbedAttributes
  : E extends HTMLFieldSetElement
  ? HTMLFieldSetAttributes
  : E extends HTMLFormElement
  ? HTMLFormAttributes
  : E extends HTMLHtmlElement
  ? HTMLHtmlAttributes
  : E extends HTMLIFrameElement
  ? HTMLIFrameAttributes
  : E extends HTMLImageElement
  ? HTMLImageAttributes
  : E extends HTMLLabelElement
  ? HTMLLabelAttributes
  : E extends HTMLLIElement
  ? HTMLLIAttributes
  : E extends HTMLLinkElement
  ? HTMLLinkAttributes
  : E extends HTMLMapElement
  ? HTMLMapAttributes
  : E extends HTMLMetaElement
  ? HTMLMetaAttributes
  : E extends HTMLMenuElement
  ? HTMLMenuAttributes
  : E extends HTMLMetaElement
  ? HTMLMetaAttributes
  : E extends HTMLMeterElement
  ? HTMLMeterAttributes
  : E extends HTMLObjectElement
  ? HTMLObjectAttributes
  : E extends HTMLOListElement
  ? HTMLOListAttributes
  : E extends HTMLOptGroupElement
  ? HTMLOptGroupAttributes
  : E extends HTMLOptionElement
  ? HTMLOptionAttributes
  : E extends HTMLOutputElement
  ? HTMLOutputAttributes
  : E extends HTMLParamElement
  ? HTMLParamAttributes
  : E extends HTMLProgressElement
  ? HTMLProgressAttributes
  : E extends HTMLQuoteElement
  ? HTMLQuoteAttributes
  : E extends HTMLSlotElement
  ? HTMLSlotAttributes
  : E extends HTMLScriptElement
  ? HTMLScriptAttributes
  : E extends HTMLSourceElement
  ? HTMLSourceAttributes
  : E extends HTMLStyleElement
  ? HTMLStyleAttributes
  : E extends HTMLTableElement
  ? HTMLTableAttributes
  : E extends HTMLTemplateElement
  ? HTMLTemplateAttributes
  : E extends HTMLTableCellElement
  ? HTMLTableCellAttributes
  : E extends HTMLTimeElement
  ? HTMLTimeAttributes
  : E extends HTMLTrackElement
  ? HTMLTrackAttributes
  : E extends HTMLVideoElement
  ? HTMLVideoAttributes
  : HTMLAttributes;
