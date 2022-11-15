describe('Account details spec', () => {
    let users;

    before(() => {
        cy.fixture('users').then(data => {
            users = data;
        });
    });

    beforeEach(() => {
        cy.visit('/');
    });

    it('should see account details', function () {
        cy.login(users.testuser.username, users.testuser.password);

        // cy.getBySel('user-onboarding-next').click();
        // cy.getBySel('bankaccount-bankName-input').type('12345');
        // cy.getBySel('bankaccount-routingNumber-input').type('123456789');
        // cy.getBySel('bankaccount-accountNumber-input').type('123456789');
        // cy.getBySel('bankaccount-submit').click();

        cy.getBySel('sidenav-user-settings').click();
        cy.getBySel('user-settings-firstName-input').should('have.value', users.testuser.firstName);
        cy.getBySel('user-settings-lastName-input').should('have.value',users.testuser.lastName);
        cy.getBySel('user-settings-email-input').should('have.value',users.testuser.email);
        cy.getBySel('user-settings-phoneNumber-input').should('have.value',users.testuser.phoneNumber);
    });
});
