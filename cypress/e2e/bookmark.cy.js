describe("Test Bookmark w/o logging in", () => {
  it("Fails to bookmark", () => {
    cy.visit(
      "https://delightful-mushroom-05d6e7b1e.5.azurestaticapps.net/"
    );
    cy.get(
      ":nth-child(1) > .card-header > .sando-buttons > .bookmark-button"
    ).click();
    cy.on("window:alert", (txt) => {
      expect(txt).to.contain("Sign in to bookmark a sando");
    });
  });
});

describe("Test Bookmark while logged in", () => {
  it("Bookmarks a sandwich", () => {
    cy.visit(
      "https://delightful-mushroom-05d6e7b1e.5.azurestaticapps.net/"
    );
    //Login
    cy.get('[href="/login"] > .auth-button').click();
    cy.get(".user-input").type("mmgout");
    cy.get(".pwd-input").type("hello");
    cy.get(".submit-button").click();
    //Bookmark
    cy.get(".app-logo").click();
    cy.get(
      ":nth-child(1) > .card-header > .sando-buttons > .bookmark-button"
    ).click();
    //Check MyBookmarkedSandos
    cy.get(".book-user-link").click();
    cy.get(".sandwich-card");
  });
});
