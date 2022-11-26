describe('Account details spec', () => {
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

    it('should see account details', function () {
        cy.getBySel('sidenav-user-settings').click();
        cy.getBySel('user-settings-firstName-input').should('have.value', users.testuser.firstName);
        cy.getBySel('user-settings-lastName-input').should('have.value', users.testuser.lastName);
        cy.getBySel('user-settings-email-input').should('have.value', users.testuser.email);
        cy.getBySel('user-settings-phoneNumber-input').should('have.value', users.testuser.phoneNumber);
    });

    it('should see helper text and disabled save button for invalid email address', function () {
        cy.getBySel('sidenav-user-settings').click();
        cy.getBySel('user-settings-email-input').clear().type(users.invaliduser.email);
        cy.get('[id="user-settings-email-input-helper-text"]').contains('Must contain a valid email address');
        cy.getBySel('user-settings-submit').should('be.disabled');
    });

    it('should see helper text and disabled save button for invalid phone', function () {
        cy.getBySel('sidenav-user-settings').click();
        cy.getBySel('user-settings-phoneNumber-input').clear().type(users.invaliduser.phoneNumber);
        cy.get('[id="user-settings-phoneNumber-input-helper-text"]').contains('Phone number is not valid');
        cy.getBySel('user-settings-submit').should('be.disabled');
    });

    it('should update user account settings', function () {
        cy.getBySel('sidenav-user-settings').click();
        cy.getBySel('user-settings-firstName-input').clear().type(users.newuser.firstName);
        cy.getBySel('user-settings-submit').click();
        cy.reload();
        cy.getBySel('user-settings-firstName-input').should('have.value',users.newuser.firstName);
    });
});
