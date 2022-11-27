describe('missions api', () => {
  beforeEach(() => {
    cy.request({
      log: false,
      method: 'POST',
      url: '/missions/reset',
      headers: {
        Authorization: 'resetcreds',
      },
    });
    cy.log('seeding db');
  });

  it('should get missions', () => {
    cy.api('/missions').as('response');
    cy.get('@response').its('status').should('equal', 200);
  });

  it('should get single mission', () => {
    cy.api('/missions/1').as('response');
    cy.get('@response').its('status').should('equal', 200);
    cy.get('@response').its('body').should('include', {
      id: 1,
      description: 'save the galaxy',
      complete: false,
    });
  });

  it('should throw 404 if single mission is not found', () => {
    cy.api({
      url: '/missions/100',
      failOnStatusCode: false,
    }).as('response');
    cy.get('@response').its('status').should('equal', 404);
  });

  it('can delete mission', () => {
    cy.api('/missions/1').its('status').should('equal', 200);
    cy.api('DELETE', '/missions/1').as('response');
    cy.get('@response').its('status').should('equal', 204);
    cy.api({
      url: '/missions/1',
      failOnStatusCode: false,
    })
      .its('status')
      .should('equal', 404);
  });

  it('can add mission', () => {
    const mission = {
      description: 'test mission',
      complete: false,
    };
    cy.api('POST', '/missions', mission).as('response');
    cy.get('@response').its('status').should('equal', 201);
    cy.get('@response').its('body').should('include', mission);
  });

  it('should update mission', () => {
    const mission = {
      description: 'get cat out of tree',
      complete: true,
    };
    cy.api({
      url: '/missions/1',
      method: 'PUT',
      body: mission,
    }).as('response');
    cy.get('@response').its('status').should('equal', 200);
    cy.get('@response').its('body').should('include', mission);
  });

  it('when adding an invalid mission, get 400 error', () => {
    const mission = {};
    cy.api({
      method: 'POST',
      url: '/missions',
      body: mission,
      failOnStatusCode: false,
    }).as('response');
    cy.get('@response').its('status').should('equal', 400);
    cy.get('@response')
      .its('body')
      .should('deep.include', {
        message: [
          'description must not be an empty string',
          'description must be a string',
          'complete must be a boolean',
        ],
      });
  });
});
