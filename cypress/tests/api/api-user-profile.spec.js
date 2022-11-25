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

    it('should get user profile', () => {
        cy.request({
            method: 'GET',
            url: `${Cypress.env("apiUrl")}/users/profile/${users.testuser.username}`,
        }).then(response => {
            expect(response.status).to.eq(200);
            expect(response.body).to.have.property('user');
            expect(response.body.user).to.have.property('firstName');
            expect(response.body.user).to.have.property('lastName');
            expect(response.body.user).to.have.property('avatar');
        });
    });
});
