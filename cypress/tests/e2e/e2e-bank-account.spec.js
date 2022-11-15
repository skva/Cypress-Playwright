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

    it.only('should add new bank account', function () {
        cy.login(users.testuser.username, users.testuser.password);

        cy.getBySel('sidenav-bankaccounts').click();
        cy.getBySel('bankaccount-new').click();
        // TODO Refactor to commands
        cy.getBySel('bankaccount-bankName-input').type('123456');
        cy.getBySel('bankaccount-routingNumber-input').type('987654321');
        cy.getBySel('bankaccount-accountNumber-input').type('987654321');
        cy.getBySel('bankaccount-submit').click();
        // TODO Account number assert
    })

    it.only('should delete bank account', function () {
        cy.login(users.testuser.username, users.testuser.password);

        cy.getBySel('sidenav-bankaccounts').click();
        // TODO Find correct Delete button
    })
});
