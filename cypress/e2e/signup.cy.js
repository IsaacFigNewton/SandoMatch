describe("Tests Registration", () => {
  it("Registers a new user", () => {
    cy.visit(
      "https://delightful-mushroom-05d6e7b1e.5.azurestaticapps.net/"
    );
    cy.get('[href="/signup"] > .auth-button').click();
    cy.get(".user-input").type("mmgout");
    cy.get(".pwd-input").type("hello");
    cy.get(".submit-button").click();
  });
});
