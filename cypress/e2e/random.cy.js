describe("Test Random Button", () => {
  it("Returns a random sandwich card", () => {
    cy.visit(
      "https://delightful-mushroom-05d6e7b1e.5.azurestaticapps.net/"
    );
    cy.get(".random-button").click();

    cy.get(".sandwich-card");
  });
});
