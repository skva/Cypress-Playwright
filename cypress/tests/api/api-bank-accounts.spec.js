describe('Bank accounts', () => {
    let users;
    let bankaccounts;

    before(() => {
        cy.fixture('users').then(data => {
            users = data;
        });
        cy.fixture('bankaccounts').then(data => {
            bankaccounts = data;
        });
    });

    beforeEach(() => {
        cy.loginByApi(users.testuser.username, users.testuser.password);
    });

    it('Get bankaccounts should respond with code 200 and correct response body', () => {
        cy.request({
            method: 'GET',
            url: `${Cypress.env("apiUrl")}/bankaccounts`,
        }).then(response => {
            expect(response.status).to.eq(200);
            Cypress._.each(response.body.results, (res) => {
                expect(res).to.have.all.keys('id', 'uuid', 'userId', 'bankName', 'accountNumber', 'routingNumber', 'isDeleted', 'createdAt', 'modifiedAt')
            })
        })
    })

    it('should delete bank account', () => {
        cy.request({
            method: 'DELETE',
            url: `${Cypress.env("apiUrl")}/bankaccounts/${bankaccounts.bankAccount.bankAccountId}`,
        }).then(response => {
            expect(response.status).to.eq(200);
        });
        cy.request({
            method: 'GET',
            url: `${Cypress.env("apiUrl")}/bankaccounts/${bankaccounts.bankAccount.bankAccountId}`,
        }).then(response => {
            expect(response.body.account.isDeleted).eql(true);
        });
    });
});
