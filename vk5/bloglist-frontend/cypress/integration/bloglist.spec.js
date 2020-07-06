
let user;

describe("Blog app", function() {

  beforeEach(function() {
    cy.request("POST", "http://localhost:3001/api/testing/reset");
    user = {
      name: "Muumi Mamma",
      username: "essutEsiin88",
      password: "salasana"
    };
    cy.request("POST", "http://localhost:3001/api/users", user);
    cy.visit("http://localhost:3000");
  });

  it("Login form is shown", function() {
    cy.contains("login");
  });

  describe("Login", function() {
    it("succeeds with correct credentials", function() {
      cy.get("#input_uname").type(user.username);
      cy.get("#input_pw").type(user.password);
      cy.get("#login_button").click();
      cy.contains("Bloglist");
    });

    it("fails with wrong credentials", function() {
      cy.get("#input_uname").type("essutesiin889");
      cy.get("#input_pw").type(user.password);
      cy.get("#login_button").click();
      cy.contains("wrong credentials")
        .should("have.class", "error");
    });
    describe("When logged in", function() {
      beforeEach(function() {
        cy.get("#input_uname").type(user.username);
        cy.get("#input_pw").type(user.password);
        cy.get("#login_button").click();
      });

      describe("A single blog is created", function() {
        beforeEach(function() {
          cy.get("#visibilityButton").click();
          cy.get("#title").type("Uusi testiblog");
          cy.get("#author").type("Testiblogin kirjottaja");
          cy.get("#url").type("urli");
          cy.get("#createbutton").click();
        });

        it("A blog can be created", function() {
          cy.get("#bloglist").contains("Uusi testiblog");
        });

        it("blog can be liked", function() {
          cy.get("#viewbutton").click();
          cy.get("#likebutton").click();
          cy.contains("likes: 1");
        });

        it("blog can be removed", function() {
          cy.get("#viewbutton").click();
          cy.get("#removebutton").click();
          cy.get("#bloglist").contains("Uusi testiblog")
            .should("not.exist");
        });
      });

      describe("many blogs are created and liked", function() {
        beforeEach(function() {
          for (let blognum = 1; blognum <= 5; blognum++) {
            cy.get("#visibilityButton").click();
            cy.get("#title").clear().type(`testiblog ${blognum}`);
            cy.get("#author").clear().type(`kirjoittaja ${blognum}`);
            cy.get("#url").clear().type(`url ${blognum}`);
            cy.get("#createbutton").click();
            // eslint-disable-next-line cypress/no-unnecessary-waiting
            cy.wait(300);
            cy.get("button#viewbutton").each(
              function(btn){ btn.click(); }
            );
            cy.get("button#likebutton").each(
              function(btn) { btn.click(); }
            );
          }
        });

        /*
        * For *some* reason this test seems to be fickle, so feel free
        * to try your luck a couple of times if necessary.
        */
        it("blogs are in sorted order", function() {
          let blogs = new Array();
          cy.get("div#blog")
            .each(function(element) {
              const tempIndex = element.text().indexOf("likes: ") + 6;
              const tempsubstr = element.text().substr(tempIndex);
              cy.log(tempsubstr);
              blogs.push(parseInt(tempsubstr));
            });
          cy.wrap(blogs)
            .should("equal", blogs.sort());
          cy.log(blogs);
        });

      });

    });

  });


});