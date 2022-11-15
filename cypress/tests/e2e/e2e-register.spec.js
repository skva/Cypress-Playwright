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
        cy.getBySel('signup-first-name').type('Jack');
        cy.getBySel('signup-last-name').type('Wreck');
        cy.getBySel('signup-username').type('ship');
        cy.getBySel('signup-password').type('12345678');
        cy.getBySel('signup-confirmPassword').type('12345678');
        cy.getBySel('signup-submit').click();

        // Login created user and complete onboarding
        cy.login('ship', '12345678');
        cy.getBySel('user-onboarding-dialog-title').should('exist');
        cy.getBySel('user-onboarding-dialog-content').should('exist');
        cy.getBySel('user-onboarding-next').click();

        // Create bank account
        cy.getBySel('user-onboarding-dialog-title').should('exist');
        cy.fillBankAccountFields('12345', '123456789', '123456789')

        // Complete onboarding
        cy.getBySel('user-onboarding-dialog-title').should('exist');
        cy.getBySel('user-onboarding-dialog-content').should('exist');
        cy.getBySel('user-onboarding-next').click();

        cy.getBySel('sidenav-user-full-name').should( 'contain','Jack W')
    });

    it('should see helper text and disabled submit button for password less 4 symbols', function () {
        cy.getBySel('signup-first-name').type('Jack');
        cy.getBySel('signup-last-name').type('Wreck');
        cy.getBySel('signup-username').type('ship');
        cy.getBySel('signup-password').type('123');
        cy.getBySel('signup-confirmPassword').type('123');

        cy.getBySel('signup-password').contains('Password must contain at least 4 characters');
        cy.getBySel('signup-submit').should('be.disabled');
    });

    it('should see helper text and disabled submit button for password less 4 symbols', function () {
        cy.getBySel('signup-first-name').type('Jack');
        cy.getBySel('signup-last-name').type('Wreck');
        cy.getBySel('signup-username').type('ship');
        cy.getBySel('signup-password').type('12345678');
        cy.getBySel('signup-confirmPassword').type('12345679');

        cy.getBySel('signup-confirmPassword').contains('Password does not match');
        cy.getBySel('signup-submit').should('be.disabled');
    });
});
