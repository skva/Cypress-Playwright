import {test, expect} from "@playwright/test";
import users from '../../../cypress/fixtures/users.json';
import transactions from '../../../cypress/fixtures/transactions.json';


test.describe('Account transactions details', () => {
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

    test('Created transaction should have correct data', async ({page}) => {
        await page.locator('[data-test=nav-top-new-transaction]').click();
        await page.locator("[data-test^='user-list-item-']").first().click();
        await page.locator('#amount').fill(transactions.testtransaction.amount);
        await page.locator('#transaction-create-description-input').fill(transactions.testtransaction.description);
        await page.locator('[data-test=transaction-create-submit-request]').click();
        await page.locator('[data-test=new-transaction-return-to-transactions]').click();
        await expect(page.locator("[data-test^='transaction-item-']").first()).toContainText(transactions.testtransaction.amount)
    });

    test('Like counter should increment after click on the bell', async ({page}) => {
        await page.locator("[data-test^='transaction-item-']").first().click();
        await page.locator("[data-test^='transaction-like-button-']").first().click();
        await expect(page.locator("[data-test^='transaction-like-count-']")).toHaveText('1');

    });
})