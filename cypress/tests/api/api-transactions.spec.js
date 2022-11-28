describe('Transactions', () => {
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
        cy.loginByApi(users.testuser.username, users.testuser.password);
    });

    it('Post comment should respond with code 200 and correct response body', () => {
        cy.request({
            method: 'POST',
            url: `${Cypress.env("apiUrl")}/comments/${transactions.testtransaction.transactionId}`,
            body: {
                "content": "api",
                "transactionId": "183VHWyuQMS"
            }
        }).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body).contains('OK');
        });
    });
});
