describe('Register account', () => {
    let users;
    let bankAccounts;

    before(() => {
        cy.fixture('users').then(data => {
            users = data;
        });
        cy.fixture('bankAccounts').then(data => {
            bankAccounts = data;
        })
    });

    beforeEach(() => {
        cy.visit('/signup');
    });

    it('Registration of a new user should be successful', function () {
        // Create new user
        cy.fillRegisterAccountFields(users.newuser.firstName,
            users.newuser.lastName,
            users.newuser.username,
            users.newuser.password)
        cy.get("[data-test='signup-submit']").click();

        // Login created user and complete onboarding
        cy.login(users.newuser.username, users.newuser.password);
        cy.get("[data-test='user-onboarding-dialog-title']").should('exist');
        cy.get("[data-test='user-onboarding-dialog-content']").should('exist');
        cy.get("[data-test='user-onboarding-next']").click();

        // Create bank account
        cy.get("[data-test='user-onboarding-dialog-title']").should('exist');
        cy.fillBankAccountFields(bankAccounts.bankAccount.bankName, bankAccounts.bankAccount.routingName, bankAccounts.bankAccount.accountNumber)

        // Complete onboarding
        cy.get("[data-test='user-onboarding-dialog-title']").should('exist');
        cy.get("[data-test='user-onboarding-dialog-content']").should('exist');
        cy.get("[data-test='user-onboarding-next']").click();

        cy.get("[data-test='sidenav-user-full-name']").should( 'contain',(users.newuser.firstName + " " + users.newuser.shortLastName));
    });

    it('Helper text should appear below password field if input less 4 symbols', function () {
        cy.fillRegisterAccountFields(users.newuser.firstName,
            users.newuser.lastName,
            users.newuser.username,
            '123')

        cy.get("[data-test='signup-password']").contains('Password must contain at least 4 characters');
        cy.get("[data-test='signup-submit']").should('be.disabled');
    });
});
