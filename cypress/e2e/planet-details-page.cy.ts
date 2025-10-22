describe("Planet Details Page", () => {
  beforeEach(() => {
    cy.visit("/planets/1", { timeout: 10000 });
  });

  describe("Planet details rendering", () => {
    it("should display the planet name", () => {
      cy.findByRole("heading", { name: /tatooine/i }).should("be.visible");
    });

    it('should display the "Back to list" button', () => {
      cy.findByRole("button", { name: /voltar para a lista/i }).should(
        "be.visible"
      );
    });

    it("should display basic planet information", () => {
      cy.findByText(/período de rotação:/i).should("be.visible");
      cy.findByText(/período de orbitação:/i).should("be.visible");
      cy.findByText(/diâmetro:/i).should("be.visible");
      cy.findByText(/clima:/i).should("be.visible");
      cy.findByText(/gravidade:/i).should("be.visible");
      cy.findByText(/terreno:/i).should("be.visible");
      cy.findByText(/população:/i).should("be.visible");
    });

    it("should display film information if the planet appears in movies", () => {
      cy.findByText(/aparece nos filmes:/i).should("be.visible");
      cy.contains(/ep\./i).should("exist");
    });
  });

  describe("Residents information", () => {
    it("should display the natives section when there are residents", () => {
      cy.findByText(/nativos/i).should("be.visible");
      cy.findByText(/personagens que nasceram ou vivem neste planeta/i).should(
        "be.visible"
      );
    });

    it("should display resident cards", () => {
      cy.get('[data-testid="resident-card"]').should("have.length.at.least", 1);
    });

    it("should display the correct number of residents in the title", () => {
      cy.findByText(/nativos \(\d+\)/i).should("be.visible");
    });
  });

  describe("Navigation", () => {
    it('should return to the list when clicking "Back to list"', () => {
      cy.findByRole("button", { name: /voltar para a lista/i }).click();

      cy.url().should("eq", Cypress.config().baseUrl + "/");
      cy.findByRole("heading", { name: /planetas de star wars/i }).should(
        "be.visible"
      );
    });
  });

  describe("Loading states", () => {
    it("should display skeletons during loading", () => {
      cy.intercept("GET", "**/planets/*", (req) => {
        req.reply((res) => {
          res.setDelay(1000);
          return res;
        });
      });

      cy.get('[class*="animate-pulse"]').should("exist");
    });
  });

  describe("Error handling", () => {
    beforeEach(() => {
      cy.intercept("GET", "**/planets/1*", {
        statusCode: 500,
        body: { error: "Internal Server Error" },
      }).as("getPlanetError");

      cy.wait("@getPlanetError");
    });

    it("should display an error message when the API fails", () => {
      cy.findByText(/erro ao carregar planeta/i, {
        timeout: 10000,
      }).should("be.visible");
      cy.findByText(/ocorreu um erro inesperado/i).should("be.visible");
    });

    it('should return to the list when clicking "Back to list"', () => {
      cy.findAllByRole("button", { name: /voltar para a lista/i })
        .last()
        .click();

      cy.url().should("eq", Cypress.config().baseUrl + "/");
    });
  });
});
