// const serverUrl = Cypress.env('serverUrl')
//
// describe('message app', () => {
//   beforeEach(() => {
//     // fixtures
//     cy.fixture('messages/all_before.json').as('messagesJSON');
//     cy.fixture('messages/add.json').as('addMessageJSON');
//     cy.fixture('messages/all_after.json').as('updatedJSON');
//
//     // network stubs
//     cy.server();
//     cy.route('GET', `${serverUrl}/messages/all`, '@messagesJSON').as('getAllMessages')
//
//     cy.visit('/');
//     cy.wait('@getAllMessages')
//     cy.get('h1').contains('Message List');
//   });
//
//   it('should display the message list', () => {
//     cy.get('li').its('length').should('eq', 3);
//     cy.get('li').eq(0).contains('go for a walk');
//   });
//
//   it('should add a new message to the list', () => {
//     // networks stubs
//     cy.server();
//     cy.route('GET', `${serverUrl}/messages/all`, '@updatedJSON').as('getAllMessages');
//     cy.route('POST', `${serverUrl}/messages/create`, '@addMessageJSON').as('addMessage');
//
//     // asserts
//     cy.get('.input').type('drink a bevvy');
//     cy.get('.button').contains('Submit').click();
//     cy.wait('@addMessage');
//     cy.wait('@getAllMessages');
//     cy.get('li').its('length').should('eq', 4);
//     cy.get('li').eq(0).contains('go for a walk');
//     cy.get('li').eq(3).contains('drink a bevvy');
//   });
//
// })
