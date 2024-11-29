import "@testing-library/jest-dom/vitest";

import { afterEach } from "vitest";

// Ensures the DOM is clear after each test.
afterEach(() => {
  document.body.innerHTML = "";
});
