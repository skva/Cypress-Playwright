describe('Account transactions details spec', () => {
    let users;

    before(() => {
        cy.fixture('users').then(data => {
            users = data;
        });
    });

    beforeEach(() => {
        cy.visit('/');
    });

    it('should see account transaction details', function () {
        cy.login(users.testuser.username, users.testuser.password);

        cy.getBySel('transaction-item-183VHWyuQMS').click();
        cy.getBySel('transaction-detail-header').should('exist');
        cy.getBySel('transaction-sender-avatar').should('exist');
        cy.getBySel('transaction-receiver-avatar').should('exist');

        // TODO
        // Transaction amount
        // Transaction sender-action-receiver

        cy.getBySel('transaction-description').should('exist');

        // TODO
        // Transaction like count
        // Transaction like button
        // Transaction comment input
    });
});
