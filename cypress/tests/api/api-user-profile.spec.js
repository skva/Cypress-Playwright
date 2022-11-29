describe('User profile', () => {
    let users;

    before(() => {
        cy.fixture('users').then(data => {
            users = data;
        });
    });

    beforeEach(() => {
        cy.loginByApi(users.testuser.username, users.testuser.password);
    });

    it('Get profile by username should respond with code 200 and correct response body', () => {
        cy.request({
            method: 'GET',
            url: `${Cypress.env("apiUrl")}/users/profile/${users.testuser.username}`,
        }).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body.user).to.have.all.keys('firstName', 'lastName', 'avatar')
        });
    });
});
