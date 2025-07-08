// noinspection JSConstantReassignment

import { afterEach } from "bun:test";

import { GlobalRegistrator } from "@happy-dom/global-registrator";

GlobalRegistrator.register();

// Ensures the DOM is clear after each test.
afterEach(() => {
  document.body.innerHTML = "";
});
