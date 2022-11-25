describe('Transactions', () => {
    let users;
    let transactions;

    before(() => {
        cy.fixture('users').then(data => {
            users = data;
        });
    });

    before(() => {
        cy.fixture('transactions').then(data => {
            transactions = data;
        });
    });

    beforeEach(() => {
        cy.loginByApi(users.testuser.username, users.testuser.password);
    });

    it('should create comment', () => {
        cy.request({
            method: 'POST',
            url: `${Cypress.env("apiUrl")}/comments/${transactions.transaction.transactionId}`,
            body: {
                "content": "api withodsadut id",
                "transactionId": "183VHWyuQMS"
            }
        }).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body).contains('OK');
        });
    });
});
