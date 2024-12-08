describe("Test User Profile", () => {
  it("User button on main page takes us to user page", () => {
    cy.visit(
      "https://delightful-mushroom-05d6e7b1e.5.azurestaticapps.net/"
    );
    cy.get(".button-image").click();
    cy.location("pathname").should("eq", "/user");
  });

  it("Links on User Profile work", () => {
    cy.visit(
      "https://delightful-mushroom-05d6e7b1e.5.azurestaticapps.net/"
    );
    //Login
    cy.get('[href="/login"] > .auth-button').click();
    cy.get(".user-input").type("mmgout");
    cy.get(".pwd-input").type("hello");
    cy.get(".submit-button").click();
    //Favorites
    cy.get(".fav-user-link").click();
    cy.location("pathname").should("eq", "/favorites");
    cy.go("back");
    //Bookmarked
    cy.get(".book-user-link").click();
    cy.location("pathname").should("eq", "/myBookmarked");
    cy.go("back");
    //Tried
    cy.get(".tried-user-link").click();
    cy.location("pathname").should("eq", "/tried");
    cy.go("back");
  });
});
