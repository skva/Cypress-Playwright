describe('Bank account', () => {
    let users;
    let bankaccounts;

    before(() => {
        cy.fixture('users').then(data => {
            users = data;
        });
        cy.fixture('bankaccounts').then(data => {
            bankaccounts = data;
        });
    });

    beforeEach(() => {
        cy.visit('/');
        cy.login(users.testuser.username, users.testuser.password);
    });

    it('New bank account should be created successfully', function () {
        cy.get("[data-test='sidenav-bankaccounts']").click();
        cy.get("[data-test='bankaccount-new']").click();
        cy.get("[data-test='bankaccount-bankName-input']").type(bankaccounts.newBankAccount.bankName);
        cy.get("[data-test='bankaccount-routingNumber-input']").type(bankaccounts.newBankAccount.routingNumber);
        cy.get("[data-test='bankaccount-accountNumber-input']").type(bankaccounts.newBankAccount.accountNumber);
        cy.get("[data-test='bankaccount-submit']").click();

        cy.get('[data-test^="bankaccount-list"]').contains(bankaccounts.newBankAccount.bankName);
    })

    it('Helper text should appear and save button should be disabled if input bank name less 5 symbols', function () {
        cy.get("[data-test='sidenav-bankaccounts']").click();
        cy.get("[data-test='bankaccount-new']").click();
        cy.get("[data-test='bankaccount-bankName-input']").type('123');
        cy.get("[data-test='bankaccount-routingNumber-input']").type(bankaccounts.newBankAccount.routingNumber);
        cy.get("[data-test='bankaccount-accountNumber-input']").type(bankaccounts.newBankAccount.accountNumber);

        cy.get("[data-test='bankaccount-bankName-input']").contains('Must contain at least 5 characters');
        cy.get("[data-test='bankaccount-submit']").should('be.disabled');
    })

    it('Bank account should be deleted successfully', function () {
        cy.get("[data-test='sidenav-bankaccounts']").click();
        cy.get('li:nth-child(1) [data-test="bankaccount-delete"]').click();
        cy.reload();
        cy.get('li:nth-child(1)').should('not.have.class', 'MuiButton-label');
    })
});
