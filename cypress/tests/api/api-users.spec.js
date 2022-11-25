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

    it('should get users', () => {
        cy.request({
            method: 'GET',
            url: `${Cypress.env("apiUrl")}/users`,
        }).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('results');
            for (let i = 0; i < ((response.body.results).length); i++) {
                expect(response.body.results[i]).to.have.property('id');
                expect(response.body.results[i]).to.have.property('uuid');
                expect(response.body.results[i]).to.have.property('firstName');
                expect(response.body.results[i]).to.have.property('lastName');
                expect(response.body.results[i]).to.have.property('username');
                expect(response.body.results[i]).to.have.property('password');
                expect(response.body.results[i]).to.have.property('balance');
                expect(response.body.results[i]).to.have.property('createdAt');
                expect(response.body.results[i]).to.have.property('modifiedAt');
            }
        });
    });
});
