describe('Account transactions details spec', () => {
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

    it('should see created transaction', function () {
        cy.login(users.testuser.username, users.testuser.password);

        cy.getBySel('nav-top-new-transaction').click();
        cy.get('li:nth-child(1)').click();
        cy.getBySel('transaction-create-amount-input').type(payload.testtransaction.amount);
        cy.getBySel('transaction-create-description-input').type(payload.testtransaction.description);
        cy.getBySel('transaction-create-submit-request').click();
        cy.getBySel('new-transaction-return-to-transactions').click();
        cy.get('li:nth-child(1)').contains(payload.testtransaction.amount)
    })

    it.only('should see like after click on bell', function () {
        cy.login(users.testuser.username, users.testuser.password);

        cy.get('div:nth-child(1) > li').click();
        cy.get('div:nth-child(2) > button').click({force: true});
        cy.get('[data-test^=transaction-like-count-]').contains(1);
    })
});
