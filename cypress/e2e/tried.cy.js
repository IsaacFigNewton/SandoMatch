describe("Test Tried w/o logging in", () => {
  it("Fails to mark as tried", () => {
    cy.visit(
      "https://delightful-mushroom-05d6e7b1e.5.azurestaticapps.net/"
    );
    cy.get(
      ":nth-child(1) > .card-header > .sando-buttons > .tried-button"
    ).click();
    cy.on("window:alert", (txt) => {
      expect(txt).to.contain("Sign in to try a sando");
    });
  });
});

describe("Test Tried while logged in", () => {
  it("Marks a sandwich as tried", () => {
    cy.visit(
      "https://delightful-mushroom-05d6e7b1e.5.azurestaticapps.net/"
    );
    //Login
    cy.get('[href="/login"] > .auth-button').click();
    cy.get(".user-input").type("mmgout");
    cy.get(".pwd-input").type("hello");
    cy.get(".submit-button").click();
    //Mark as tried
    cy.get(".app-logo").click();
    cy.get(
      ":nth-child(1) > .card-header > .sando-buttons > .tried-button"
    ).click();
    //Check MyTriedSandos
    cy.get(".tried-user-link").click();
    cy.get(".sandwich-card");
  });
});
