describe('Bank account spec', () => {
    let users;

    before(() => {
        cy.fixture('users').then(data => {
            users = data;
        });
    });

    beforeEach(() => {
        cy.visit('/');
    });

    it('should add new bank account', function () {
        cy.login(users.testuser.username, users.testuser.password);

        cy.getBySel('sidenav-bankaccounts').click();
        cy.getBySel('bankaccount-new').click();
        // TODO Refactor to commands
        cy.getBySel('bankaccount-bankName-input').type('123456');
        cy.getBySel('bankaccount-routingNumber-input').type('987654321');
        cy.getBySel('bankaccount-accountNumber-input').type('987654321');
        cy.getBySel('bankaccount-submit').click();

        cy.get('[data-test^="bankaccount-list"]').contains('123456');
    })

    it('should see helper text and disabled save button for bank name less 5 symbols', function () {
        cy.login(users.testuser.username, users.testuser.password);

        cy.getBySel('sidenav-bankaccounts').click();
        cy.getBySel('bankaccount-new').click();
        // TODO Refactor to commands
        cy.getBySel('bankaccount-bankName-input').type('123');
        cy.getBySel('bankaccount-routingNumber-input').type('987654321');
        cy.getBySel('bankaccount-accountNumber-input').type('987654321');

        cy.getBySel('[id="bankaccount-bankName-input-helper-text"]').contains('Password must contain at least 4 characters');
        cy.getBySel('bankaccount-submit').should('be.disabled');
    })

    it('should delete bank account', function () {
        cy.login(users.testuser.username, users.testuser.password);

        cy.getBySel('sidenav-bankaccounts').click();
        // TODO Find correct Delete button
        cy.getBySel('bankaccount-delete').click();
        cy.reload();
        cy.getBySel('bankaccount-delete').should('not.exist');

    })
});
