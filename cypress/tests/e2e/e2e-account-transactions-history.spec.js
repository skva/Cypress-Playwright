describe('Account transactions history spec', () => {
    let users;
    let payload;

    before(() => {
        cy.fixture('users').then(data => {
            users = data;
        });
    });

    before(() => {
        cy.fixture('payload').then(data => {
            payload = data;
        });
    });

    beforeEach(() => {
        cy.visit('/');
    });

    it('should see account transactions history', function () {
        cy.login(users.testuser.username, users.testuser.password);

        cy.getBySel('nav-public-tab').should('exist');
        cy.getBySel('nav-contacts-tab').should('exist');
        cy.getBySel('nav-personal-tab').should('exist');
        cy.getBySel('transaction-list-filter-date-range-button').should('exist');
        cy.getBySel('transaction-list-filter-amount-range-button').should('exist');
    })

    it.only('should see created transaction', function () {
        cy.login(users.testuser.username, users.testuser.password);

        cy.getBySel('nav-top-new-transaction').click();
        cy.get('li:nth-child(1)').click();
        // TODO more asserts
        cy.getBySel('transaction-create-amount-input').type(payload.testtransaction.amount);
        cy.getBySel('transaction-create-description-input').type(payload.testtransaction.description);
        cy.getBySel('transaction-create-submit-request').click();
        cy.getBySel('new-transaction-return-to-transactions').click();
        cy.get('li:nth-child(1)').contains(payload.testtransaction.amount)
    })
});
