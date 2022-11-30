import {test, expect} from "@playwright/test";
import users from '../../../cypress/fixtures/users.json';

test.describe('Account transactions history', () => {
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

    test('Account transaction history should be visible', async ({page}) => {
        await expect(page.locator('[data-test=nav-public-tab]')).toBeVisible();
        await expect(page.locator('[data-test=nav-contacts-tab]')).toBeVisible();
        await expect(page.locator('[data-test=nav-personal-tab]')).toBeVisible();
        await expect(page.locator('[data-test=transaction-list-filter-date-range-button]')).toBeVisible();
        await expect(page.locator('[data-test=transaction-list-filter-amount-range-button]')).toBeVisible();
    });

    test('Mine tab should be underlined after click', async ({page}) => {
        await page.locator('[data-test=nav-personal-tab]').click();
        await expect(page.locator('[data-test=nav-personal-tab]')).toHaveAttribute('aria-selected', 'true');
    });
})