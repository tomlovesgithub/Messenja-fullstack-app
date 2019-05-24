const serverUrl = Cypress.env('serverUrl');

describe('message app', () => {
  beforeEach(() => {
    // fixtures
    cy.fixture('messages/all_before.json').as('messagesJSON');
    cy.fixture('messages/add.json').as('addMessageJSON');
    cy.fixture('messages/all_after.json').as('updatedJSON');

    // network stub
    cy.server();
    cy.route('GET', `${serverUrl}/messages`, '@messagesJSON').as('getAllMessages');

    cy.visit('/');
    cy.wait('@getAllMessages');
    cy.get('#title').contains('Mesenja');
  });

  it('should display the message list', () => {
    cy.get('li').its('length').should('eq', 6);
    cy.get('li').eq(0).contains('Hi First Message');
  });

});
