import {test, expect} from "@playwright/test";
import users from '../../../cypress/fixtures/users.json';

test.describe('Account balance', () => {
    test.beforeEach(async ({page}) => {

        await page.goto('http://localhost:3000/signin');
        // Click input[name="username"]
        await page.locator('input[name="username"]').click();
        // Fill input[name="username"]
        await page.locator('input[name="username"]').fill(users.testuser.username);
        // Click input[name="password"]
        await page.locator('input[name="password"]').click();
        // Fill input[name="password"]
        await page.locator('input[name="password"]').fill(users.testuser.password);
        // Click [data-test="signin-submit"]
        await Promise.all([
            page.waitForNavigation({url: 'http://localhost:3000/'}),
            page.locator('[data-test="signin-submit"]').click()
        ]);
    });

    test('Account balance field should have correct value', async ({page}) => {
        await expect(page.locator('[data-test=sidenav-user-balance]')).toContainText(users.testuser.dollarBalance)
    });
})

