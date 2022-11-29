describe('Users', () => {
    let users;

    before(() => {
        cy.fixture('users').then(data => {
            users = data;
        });
    });

    beforeEach(() => {
        cy.loginByApi(users.testuser.username, users.testuser.password);
    });

    it('Get users should respond with code 200 and correct response body', () => {
        cy.request({
            method: 'GET',
            url: `${Cypress.env("apiUrl")}/users`,
        })
            .then(response => {
            expect(response.status).to.eq(200)
            // expect(response.body.results[0]).to.have.all.keys('id', 'uuid', 'userId', 'bankName', 'accountNumber', 'routingNumber', 'isDeleted', 'createdAt', 'modifiedAt');
            Cypress._.each(response.body.results, (res) => {
                expect(res).to.have.property('id');
                expect(res).to.have.property('uuid')
                expect(res).to.have.property('firstName')
                expect(res).to.have.property('lastName')
                expect(res).to.have.property('username')
                expect(res).to.have.property('password')
                expect(res).to.have.property('balance')
                expect(res).to.have.property('createdAt')
                expect(res).to.have.property('modifiedAt')
            })
        });
    });
});
