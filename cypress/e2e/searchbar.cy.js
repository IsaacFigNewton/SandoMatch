describe("Test Search Bar", () => {
  it("Search bar returns correct results", () => {
    cy.visit(
      "https://delightful-mushroom-05d6e7b1e.5.azurestaticapps.net/"
    );
    cy.get(".search-bar").type("za'atar");

    cy.get(".sandwich-list > :nth-child(1)").within(() => {
      cy.get("[class='card-header']").should(
        "contain",
        "Middle Eastern Halloumi Sandwich"
      );
    });
    cy.get(".sandwich-list > :nth-child(2)").within(() => {
      cy.get("[class='card-header']").should(
        "contain",
        "Middle Eastern Tomato Sandwich"
      );
    });
    cy.get(".sandwich-list > :nth-child(3)").within(() => {
      cy.get("[class='card-header']").should(
        "contain",
        "Levantine Egg Sandwich"
      );
    });
  });
});
