describe('Account details', () => {
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

    it('User account details should be visible', function () {
        cy.get("[data-test='sidenav-user-settings']").click();
        cy.get("[data-test='user-settings-firstName-input']").should('have.value', users.testuser.firstName);
        cy.get("[data-test='user-settings-lastName-input']").should('have.value', users.testuser.lastName);
        cy.get("[data-test='user-settings-email-input']").should('have.value', users.testuser.email);
        cy.get("[data-test='user-settings-phoneNumber-input']").should('have.value', users.testuser.phoneNumber);
    });

    it('Helper text should appear below email field if input invalid value', function () {
        cy.get("[data-test='sidenav-user-settings']").click();
        cy.get("[data-test='user-settings-email-input']").clear().type(users.invaliduser.email);
        cy.get("[id='user-settings-email-input-helper-text']").contains('Must contain a valid email address');
        cy.get("[data-test='user-settings-submit']").should('be.disabled');
    });

    it('Helper text should appear below phone field if input invalid phone', function () {
        cy.get("[data-test='sidenav-user-settings']").click();
        cy.get("[data-test='user-settings-phoneNumber-input']").clear().type(users.invaliduser.phoneNumber);
        cy.get("[id='user-settings-phoneNumber-input-helper-text']").contains('Phone number is not valid');
        cy.get("[data-test='user-settings-submit']").should('be.disabled');
    });

    it('User account settings should update successfully', function () {
        cy.get("[data-test='sidenav-user-settings']").click();
        cy.get("[data-test='user-settings-firstName-input']").clear().type(users.newuser.firstName);
        cy.get("[data-test='user-settings-submit']").click();
        cy.reload();
        cy.get("[data-test='user-settings-firstName-input']").should('have.value',users.newuser.firstName);
    });
});
