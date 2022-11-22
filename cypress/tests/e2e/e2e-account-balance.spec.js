describe('Account balance spec', () => {
    let users;

    before(() => {
        cy.fixture('users').then(data => {
            users = data;
        });
    });

    beforeEach(() => {
        cy.visit('/');
    });

    it('should see account balance', function () {
        cy.login(users.testuser.username, users.testuser.password);

        cy.getBySel('sidenav-user-balance')
            .invoke('text')
            .invoke('replace', /\D/g, '')
            .then(parseInt)
            .should('equal', users.testuser.balance)
    })
});
