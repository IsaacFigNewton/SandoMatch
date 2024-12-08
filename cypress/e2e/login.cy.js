describe("Test Login", () => {
  it("Logs a user into the app", () => {
    cy.visit(
      "https://delightful-mushroom-05d6e7b1e.5.azurestaticapps.net"
    );
    cy.get('[href="/login"] > .auth-button').click();
    cy.get(".user-input").type("mmgout");
    cy.get(".pwd-input").type("hello");
    cy.get(".submit-button").click();
  });
});

describe("Test Invalid Login", () => {
  it("Fails to log a user into the app", () => {
    cy.visit(
      "https://delightful-mushroom-05d6e7b1e.5.azurestaticapps.net"
    );
    cy.get('[href="/login"] > .auth-button').click();
    cy.get(".user-input").type("mmgout");
    cy.get(".pwd-input").type("fghj");
    cy.get(".submit-button").click();
    cy.on("window:alert", (txt) => {
      expect(txt).to.contain("Invalid username or password.");
    });
  });
});
