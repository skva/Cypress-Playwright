import {test, expect} from "@playwright/test";
import users from '../../../cypress/fixtures/users.json';
import { LoginHelper } from '../../utils/helper';

test.describe('Login', () => {
    test.beforeEach(async ({page}) => {
        const loginHelper = new LoginHelper(page);
        await loginHelper.login(users.testuser.username, users.testuser.password);
    });

    test('Login successful', async ({page}) => {
        await expect(page.locator('[data-test=sidenav-username]')).toContainText(users.testuser.username);
    });

    // // TODO
    // it('Login failes with invalid credentials', function () {
    //     // cy.login(users.invaliduser.username, users.invaliduser.password);
    //     // cy.get('.MuiAlert-message').should('exist');
    // });
})