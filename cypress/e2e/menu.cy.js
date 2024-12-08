describe("Test Menu", () => {
  it("All links in menu work", () => {
    cy.visit(
      "https://delightful-mushroom-05d6e7b1e.5.azurestaticapps.net/"
    );
    cy.get(".menu-button").click();
    //User profile
    cy.get(".menu-list > :nth-child(1) > a").click();
    cy.location("pathname").should("eq", "/user");
    cy.go("back");
    //Favorite
    cy.get(":nth-child(2) > a").click();
    cy.location("pathname").should("eq", "/favorites");
    cy.go("back");
    //Bookmarked
    cy.get(".menu-list > :nth-child(3) > a").click();
    cy.location("pathname").should("eq", "/myBookmarked");
    cy.go("back");
    //Tried
    cy.get(".menu-list > :nth-child(4) > a").click();
    cy.location("pathname").should("eq", "/tried");
    cy.go("back");
  });
});
