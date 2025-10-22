describe("Planets List Page", () => {
  beforeEach(() => {
    cy.visit("/");
  });

  describe("Initial rendering", () => {
    it("should display the page title and description", () => {
      cy.findByRole("heading", { name: /planetas de star wars/i }).should(
        "be.visible"
      );
      cy.findByText(
        /explore a galáxia e descubra os planetas do universo star wars!/i
      ).should("be.visible");
    });

    it("should display the search field", () => {
      cy.findByPlaceholderText(/buscar planetas/i).should("be.visible");
    });

    it("should load and display the list of planets", () => {
      cy.get('[data-testid="planet-card"]', { timeout: 10000 }).should(
        "have.length.at.least",
        1
      );
      cy.findByRole("heading", { name: /alderaan/i }).should("be.visible");
    });

    it("should display the total number of planets", () => {
      cy.contains(/planetas encontrados/i, { timeout: 10000 }).should(
        "be.visible"
      );
    });
  });

  describe("Planet search", () => {
    it("should filter planets when typing in the search field", () => {
      cy.findByPlaceholderText(/buscar planetas/i).type("alderaan");

      cy.contains(/resultado\(s\) encontrado\(s\) para "alderaan"/i, {
        timeout: 10000,
      }).should("be.visible");
      cy.findByRole("heading", { name: /alderaan/i }).should("be.visible");
    });

    it('should clear the search when clicking the "Clear" button', () => {
      cy.findByPlaceholderText(/buscar planetas/i).type("alderaan");
      cy.findByRole("button", { name: /limpar/i }).click();

      cy.findByPlaceholderText(/buscar planetas/i).should("have.value", "");
      cy.contains(/planetas encontrados/i, { timeout: 10000 }).should(
        "be.visible"
      );
    });

    it("should display a message when no planets are found", () => {
      cy.findByPlaceholderText(/buscar planetas/i).type(
        "example-planet-that-does-not-exist"
      );

      cy.findByText(/nenhum planeta encontrado/i, {
        timeout: 10000,
      }).should("be.visible");
      cy.findByText(/tente ajustar sua busca ou limpar os filtros/i).should(
        "be.visible"
      );
    });
  });

  describe("Pagination", () => {
    it("should display pagination controls", () => {
      cy.get('[data-testid="planet-card"]', { timeout: 10000 }).should("exist");
      cy.contains("span", /próxima/i).should("be.visible");
    });

    it("should navigate to the next page", () => {
      cy.get('[data-testid="planet-card"]', { timeout: 10000 }).should("exist");
      cy.contains("span", /próxima/i).click();

      cy.get('[data-testid="planet-card"]', { timeout: 10000 }).should(
        "have.length.at.least",
        1
      );

      cy.contains("span", /anterior/i).should("be.visible");
    });

    it("should navigate to the previous page", () => {
      cy.get('[data-testid="planet-card"]', { timeout: 10000 }).should("exist");
      cy.contains("span", /próxima/i).click();

      cy.get('[data-testid="planet-card"]', { timeout: 10000 }).should("exist");

      cy.contains("span", /anterior/i).click();

      cy.get('[data-testid="planet-card"]', { timeout: 10000 }).should(
        "have.length.at.least",
        1
      );
    });

    it("should scroll to the top when changing pages", () => {
      cy.get('[data-testid="planet-card"]', { timeout: 10000 }).should("exist");

      cy.scrollTo("bottom");

      cy.contains("span", /próxima/i).click();

      cy.wait(500);
      cy.window().its("scrollY").should("be.lessThan", 100);
    });
  });

  describe("Navigation to details", () => {
    it("should navigate to the details page when clicking a planet", () => {
      cy.get('[data-testid="planet-card"]', { timeout: 10000 })
        .first()
        .findByRole("button", { name: /ver detalhes/i })
        .click();

      cy.url().should("include", "/planets/");
      cy.findByRole("button", { name: /voltar para a lista/i }).should(
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

      cy.visit("/");

      cy.get('[data-testid="planet-card-skeleton"]').should("exist");
    });
  });

  describe("Error handling", () => {
    it("should display an error message when the API fails", () => {
      cy.intercept("GET", "**/planets/*", {
        statusCode: 500,
        body: { error: "Internal Server Error" },
      }).as("getPlanetsError");

      cy.visit("/");
      cy.wait("@getPlanetsError");

      cy.findByText(/erro ao carregar planetas/i, {
        timeout: 10000,
      }).should("be.visible");
      cy.findByRole("button", { name: /tentar novamente/i }).should(
        "be.visible"
      );
    });

    it('should reload the page when clicking "Try again"', () => {
      cy.intercept("GET", "**/planets/*", {
        statusCode: 500,
      }).as("getPlanetsError");

      cy.visit("/");
      cy.wait("@getPlanetsError");

      cy.findByRole("button", { name: /tentar novamente/i }).should(
        "be.visible"
      );

      cy.intercept("GET", "**/planets/*").as("getPlanetsSuccess");

      cy.findByRole("button", { name: /tentar novamente/i }).click();

      cy.url().should("eq", Cypress.config().baseUrl + "/");
    });
  });
});
