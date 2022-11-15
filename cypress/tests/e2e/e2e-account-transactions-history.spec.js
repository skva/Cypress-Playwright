describe('Account transactions history spec', () => {
    let users;

    before(() => {
        cy.fixture('users').then(data => {
            users = data;
        });
    });

    beforeEach(() => {
        cy.visit('/');
    });

    it.only('should see account transactions history', function () {
        cy.login(users.testuser.username, users.testuser.password);

        cy.getBySel('nav-public-tab').should('exist');
        cy.getBySel('nav-contacts-tab').should('exist');
        cy.getBySel('nav-personal-tab').should('exist');
        cy.getBySel('transaction-list-filter-date-range-button').should('exist');
        cy.getBySel('transaction-list-filter-amount-range-button').should('exist');

        // TODO
        // Transactions history
    })
});
