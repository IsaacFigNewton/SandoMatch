describe("Test Favorite w/o logging in", () => {
  it("Fails to favorite a sandwich", () => {
    cy.visit(
      "https://delightful-mushroom-05d6e7b1e.5.azurestaticapps.net/"
    );
    cy.get(
      ":nth-child(1) > .card-header > .sando-buttons > .favorite-button"
    ).click();
    cy.on("window:alert", (txt) => {
      expect(txt).to.contain("Sign in to favorite a sando");
    });
  });
});

describe("Test Favorite while logged in", () => {
  it("Favorites a sandwich", () => {
    cy.visit(
      "https://delightful-mushroom-05d6e7b1e.5.azurestaticapps.net/"
    );
    //Login
    cy.get('[href="/login"] > .auth-button').click();
    cy.get(".user-input").type("mmgout");
    cy.get(".pwd-input").type("hello");
    cy.get(".submit-button").click();
    //Favorite
    cy.get(".app-logo").click();
    cy.get(
      ":nth-child(1) > .card-header > .sando-buttons > .favorite-button"
    ).click();
    //Check MyFavoriteSando
    cy.get(".fav-user-link").click();
    cy.get(".sandwich-card-fav");
  });
});
