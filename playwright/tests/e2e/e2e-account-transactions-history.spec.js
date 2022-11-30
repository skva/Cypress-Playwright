import {test, expect} from "@playwright/test";
import users from '../../../cypress/fixtures/users.json';
import { LoginHelper } from '../../utils/helper';

test.describe('Account transactions history', () => {
    test.beforeEach(async ({page}) => {
        const loginHelper = new LoginHelper(page);
        await loginHelper.login(users.testuser.username, users.testuser.password);
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