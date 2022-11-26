describe('Account transactions details spec', () => {
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

    it('should see created transaction', function () {
        cy.getBySel('nav-top-new-transaction').click();
        cy.get('li:nth-child(1)').click();
        cy.getBySel('transaction-create-amount-input').type(transactions.testtransaction.amount);
        cy.getBySel('transaction-create-description-input').type(transactions.testtransaction.description);
        cy.getBySel('transaction-create-submit-request').click();
        cy.getBySel('new-transaction-return-to-transactions').click();
        cy.get('li:nth-child(1)').contains(transactions.testtransaction.amount)
    })

    it('should see like after click on bell', function () {
        cy.get('div:nth-child(1) > li').click();
        cy.get('div:nth-child(2) > button').click({force: true});
        cy.get('[data-test^=transaction-like-count-]').contains(1);
    })
});
