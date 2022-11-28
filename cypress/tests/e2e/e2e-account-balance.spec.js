describe('Account balance', () => {
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

    it('Account balance field should have correct value', function () {
        cy.get("[data-test='sidenav-user-balance'")
            .invoke('text')
            .invoke('replace', /\D/g, '')
            .then(parseInt)
            .should('equal', users.testuser.balance)
    })
});
