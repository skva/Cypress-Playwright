describe('Account balance spec', () => {
    let users;

    before(() => {
        cy.fixture('users').then(data => {
            users = data;
        });
    });

    beforeEach(() => {
        cy.visit('/');
        cy.login(users.testuser.username, users.testuser.password);
    });

    it('should see account balance', function () {
        cy.getBySel('sidenav-user-balance')
            .invoke('text')
            .invoke('replace', /\D/g, '')
            .then(parseInt)
            .should('equal', users.testuser.balance)
    })
});
