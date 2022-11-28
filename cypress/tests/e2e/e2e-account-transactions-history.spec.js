describe('Account transactions history', () => {
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

    it('Account transaction history should be visible', function () {
        cy.get("[data-test='nav-public-tab']").should('exist');
        cy.get("[data-test='nav-contacts-tab']").should('exist');
        cy.get("[data-test='nav-personal-tab']").should('exist');
        cy.get("[data-test='transaction-list-filter-date-range-button']").should('exist');
        cy.get("[data-test='transaction-list-filter-amount-range-button']").should('exist');
    })

    it('Mine tab should be underlined after click', function () {
        cy.get("[data-test='nav-personal-tab']").click();
        cy.get("[data-test='nav-personal-tab']").should('have.attr', 'aria-selected', 'true');
    })
});
