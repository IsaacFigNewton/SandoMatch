describe("Test Logout", () => {
  it("Successfully logs user out", () => {
    cy.visit(
      "https://delightful-mushroom-05d6e7b1e.5.azurestaticapps.net"
    );
    //Login
    cy.get('[href="/login"] > .auth-button').click();
    cy.get(".user-input").type("mmgout");
    cy.get(".pwd-input").type("hello");
    cy.get(".submit-button").click();
    //Logout
    cy.get(".logout-button > a > button").click();
    //Verify
    cy.get(
      ":nth-child(1) > .card-header > .sando-buttons > .favorite-button"
    ).click();
    cy.on("window:alert", (txt) => {
      expect(txt).to.contain("Sign in to favorite a sando");
    });
  });
});
