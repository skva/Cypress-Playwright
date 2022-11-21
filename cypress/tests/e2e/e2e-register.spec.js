describe('Register account spec', () => {
    let users;

    before(() => {
        cy.fixture('users').then(data => {
            users = data;
        });
    });

    beforeEach(() => {
        cy.visit('/signup');
    });

    it('should register new user', function () {
        // Create new user
        cy.fillRegisterAccountFields(users.newuser.firstName,
            users.newuser.lastName,
            users.newuser.username,
            users.newuser.password)
        cy.getBySel('signup-submit').click();

        // Login created user and complete onboarding
        cy.login(users.newuser.username, users.newuser.password);
        cy.getBySel('user-onboarding-dialog-title').should('exist');
        cy.getBySel('user-onboarding-dialog-content').should('exist');
        cy.getBySel('user-onboarding-next').click();

        // Create bank account
        cy.getBySel('user-onboarding-dialog-title').should('exist');
        cy.fillBankAccountFields(users.bankaccount.bankName, users.bankaccount.routingName, users.bankaccount.accountNumber)

        // Complete onboarding
        cy.getBySel('user-onboarding-dialog-title').should('exist');
        cy.getBySel('user-onboarding-dialog-content').should('exist');
        cy.getBySel('user-onboarding-next').click();

        cy.getBySel('sidenav-user-full-name').should( 'contain',(users.newuser.firstName + " " + (Array.from(users.newuser.lastName)[0])));
    });

    it.only('should see helper text and disabled submit button for password less 4 symbols', function () {
        cy.fillRegisterAccountFields(users.newuser.firstName,
            users.newuser.lastName,
            users.newuser.username,
            '123')

        cy.getBySel('signup-password').contains('Password must contain at least 4 characters');
        cy.getBySel('signup-submit').should('be.disabled');
    });
});
