import {test, expect} from "@playwright/test";
import users from '../../../cypress/fixtures/users.json';
import { LoginHelper } from '../../utils/helper';

test.describe('Account balance', () => {
    test.beforeEach(async ({page}) => {
        const loginHelper = new LoginHelper(page);
        await loginHelper.login(users.testuser.username, users.testuser.password);
    });

    test('Account balance field should have correct value', async ({page}) => {
        await expect(page.locator('[data-test=sidenav-user-balance]')).toContainText(users.testuser.dollarBalance)
    });
})

