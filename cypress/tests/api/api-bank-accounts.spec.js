describe('Bank accounts', () => {
    let users;
    let bankaccounts;

    before(() => {
        cy.fixture('users').then(data => {
            users = data;
        });
    });

    before(() => {
        cy.fixture('bankaccounts').then(data => {
            bankaccounts = data;
        });
    });

    beforeEach(() => {
        cy.loginByApi(users.testuser.username, users.testuser.password);
    });

    it('should get bank accounts', () => {
        cy.request({
            method: 'GET',
            url: `${Cypress.env("apiUrl")}/bankaccounts`,
        }).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('results');
            for (let i = 0; i < ((response.body.results).length); i++) {
                expect(response.body.results[i]).to.have.property('id');
                expect(response.body.results[i]).to.have.property('uuid');
                expect(response.body.results[i]).to.have.property('userId');
                expect(response.body.results[i]).to.have.property('bankName');
                expect(response.body.results[i]).to.have.property('accountNumber');
                expect(response.body.results[i]).to.have.property('routingNumber');
                expect(response.body.results[i]).to.have.property('isDeleted');
                expect(response.body.results[i]).to.have.property('createdAt');
                expect(response.body.results[i]).to.have.property('modifiedAt');
            }
        });
    });

    it('should delete bank account', () => {
        cy.request({
            method: 'DELETE',
            url: `${Cypress.env("apiUrl")}/bankaccounts/${bankaccounts.deleteBankAccount.bankAccountId}`,
        }).then(response => {
            expect(response.status).to.eq(200);
        });
        cy.request({
            method: 'GET',
            url: `${Cypress.env("apiUrl")}/bankaccounts/${bankaccounts.deleteBankAccount.bankAccountId}`,
        }).then(response => {
            expect(response.body.account.isDeleted).eql(true);
        });
    });
});
