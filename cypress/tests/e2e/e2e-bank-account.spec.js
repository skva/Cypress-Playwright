describe('Bank account spec', () => {
    let users;
    let bankaccounts;

    before(() => {
        cy.fixture('users').then(data => {
            users = data;
        });
    });

    before(() => {
        cy.fixture('bankaccounts').then(data => {
            bankaccounts = data;
        });
    });

    beforeEach(() => {
        cy.visit('/');
    });

    it('should add new bank account', function () {
        cy.login(users.testuser.username, users.testuser.password);

        cy.getBySel('sidenav-bankaccounts').click();
        cy.getBySel('bankaccount-new').click();
        cy.getBySel('bankaccount-bankName-input').type(bankaccounts.newBankAccount.bankName);
        cy.getBySel('bankaccount-routingNumber-input').type(bankaccounts.newBankAccount.routingNumber);
        cy.getBySel('bankaccount-accountNumber-input').type(bankaccounts.newBankAccount.accountNumber);
        cy.getBySel('bankaccount-submit').click();

        cy.get('[data-test^="bankaccount-list"]').contains(bankaccounts.newBankAccount.bankName);
    })

    it('should see helper text and disabled save button for bank name less 5 symbols', function () {
        cy.login(users.testuser.username, users.testuser.password);

        cy.getBySel('sidenav-bankaccounts').click();
        cy.getBySel('bankaccount-new').click();
        cy.getBySel('bankaccount-bankName-input').type('123');
        cy.getBySel('bankaccount-routingNumber-input').type(bankaccounts.newBankAccount.routingNumber);
        cy.getBySel('bankaccount-accountNumber-input').type(bankaccounts.newBankAccount.accountNumber);

        cy.getBySel('bankaccount-bankName-input').contains('Must contain at least 5 characters');
        cy.getBySel('bankaccount-submit').should('be.disabled');
    })

    it('should delete bank account', function () {
        cy.login(users.testuser.username, users.testuser.password);

        cy.getBySel('sidenav-bankaccounts').click();
        cy.get('li:nth-child(1) [data-test="bankaccount-delete"]').click();
        cy.reload();
        cy.get('li:nth-child(1)').should('not.have.class', 'MuiButton-label');
    })
});
