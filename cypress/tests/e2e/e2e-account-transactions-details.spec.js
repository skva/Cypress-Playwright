describe('Account transactions details', () => {
    let users;
    let transactions;

    before(() => {
        cy.fixture('users').then(data => {
            users = data;
        });
        cy.fixture('transactions').then(data => {
            transactions = data;
        });
    });

    beforeEach(() => {
        cy.visit('/');
        cy.login(users.testuser.username, users.testuser.password);
    });

    it('Created transaction should have correct data', function () {
        cy.get("[data-test='nav-top-new-transaction']").click();
        cy.get('li:nth-child(1)').click();
        cy.get("[data-test='transaction-create-amount-input']").type(transactions.testtransaction.amount);
        cy.get("[data-test='transaction-create-description-input']").type(transactions.testtransaction.description);
        cy.get("[data-test='transaction-create-submit-request']").click();
        cy.get("[data-test='new-transaction-return-to-transactions']").click();
        cy.get('li:nth-child(1)').contains(transactions.testtransaction.amount)
    })

    it('Like counter should increment after click on the bell', function () {
        cy.get('div:nth-child(1) > li').click();
        cy.get('div:nth-child(2) > button').click({force: true});
        cy.get('[data-test^=transaction-like-count-]').contains(1);
    })
});
