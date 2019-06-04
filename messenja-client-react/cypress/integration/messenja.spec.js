const serverUrl = Cypress.env('serverUrl');

describe('message app', () => {
  beforeEach(() => {
    // fixtures
    cy.fixture('messages/all_before.json').as('messagesJSON');
    cy.fixture('messages/add.json').as('addMessageJSON');
    cy.fixture('messages/all_after_add.json').as('updatedJSON');

    // network stub
    cy.server();
    cy.route('GET', `${serverUrl}/messages`, '@messagesJSON').as('getAllMessages');

    cy.visit(`/messages`);
    cy.wait('@getAllMessages');
    cy.get('#title').contains('Mesenja');
  });

  it('should display the message list', () => {
    cy.get('li').its('length').should('eq', 2);
    cy.get('li').eq(0).contains('Hi First Message');
  });

  it('should delete a message', () => {
    cy.get('li').its('length').should('eq', 2);
    cy.get('li').eq(0).contains('Hi First Message');
    cy.get('li').eq(1).contains('Hi Second Message');

    cy.get(':nth-child(1) > button').click()
    cy.get(':nth-child(1) > button').click()
  });

  it('can post a message', () => {
    cy.get('textarea').type('Hello, World')
    cy.get('form > button').click()
    cy.get('center').contains('Hello, World');
    cy.get(':nth-child(3) > button').click()
  });

  it('can delete all messages', () => {
    cy.get('li').its('length').should('eq', 2);
    cy.get('li').eq(0).contains('Hi First Message');

    cy.get(':nth-child(1) > button').click()
    cy.get(':nth-child(1) > button').click()

    cy.get('center > div').contains('No Messages');
  });

});
