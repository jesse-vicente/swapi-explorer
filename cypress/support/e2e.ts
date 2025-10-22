/// <reference types="cypress" />
/// <reference types="@testing-library/cypress" />

import "@testing-library/cypress/add-commands";

Cypress.on("uncaught:exception", (err) => {
  if (
    err.message.includes("ResizeObserver") ||
    err.message.includes("hydration")
  ) {
    return false;
  }
  return true;
});
