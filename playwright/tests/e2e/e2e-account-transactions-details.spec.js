import {test, expect} from "@playwright/test";
import users from '../../../cypress/fixtures/users.json';
import transactions from '../../../cypress/fixtures/transactions.json';
import { LoginHelper } from '../../utils/helper';


test.describe('Account transactions details', () => {
    test.beforeEach(async ({page}) => {
        const loginHelper = new LoginHelper(page);
        await loginHelper.login(users.testuser.username, users.testuser.password);
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