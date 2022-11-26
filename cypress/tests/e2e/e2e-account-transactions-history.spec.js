describe('Account transactions history spec', () => {
    let users;

    before(() => {
        cy.fixture('users').then(data => {
            users = data;
        });
    });

    beforeEach(() => {
        cy.visit('/');
        cy.login(users.testuser.username, users.testuser.password);
    });

    it('should see account transactions history', function () {
        cy.getBySel('nav-public-tab').should('exist');
        cy.getBySel('nav-contacts-tab').should('exist');
        cy.getBySel('nav-personal-tab').should('exist');
        cy.getBySel('transaction-list-filter-date-range-button').should('exist');
        cy.getBySel('transaction-list-filter-amount-range-button').should('exist');
    })

    it('mine should be underlined after click', function () {
        cy.getBySel('nav-personal-tab').click();
        cy.getBySel('nav-personal-tab').should('have.attr', 'aria-selected', 'true');
    })
});
