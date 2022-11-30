import {test, expect} from "@playwright/test";
import users from '../../../cypress/fixtures/users.json';
import bankaccounts from '../../../cypress/fixtures/bankaccounts.json';

test.describe('Register', () => {
    test.beforeEach(async ({page}) => {
        await page.goto('http://localhost:3000/signup');
    });

    test('Registration of a new user should be successful', async ({page}) => {
        await page.locator('#firstName').fill(users.newuser.firstName);
        await page.locator('#lastName').fill(users.newuser.lastName);
        await page.locator('#username').fill(users.newuser.username);
        await page.locator('#password').fill(users.newuser.password);
        await page.locator('#confirmPassword').fill(users.newuser.password);
        await page.locator('[data-test=signup-submit]').click();

        // Login created user and complete onboarding
        // Click input[name="username"]
        await page.locator('input[name="username"]').click();
        // Fill input[name="username"]
        await page.locator('input[name="username"]').fill(users.newuser.username);
        // Click input[name="password"]
        await page.locator('input[name="password"]').click();
        // Fill input[name="password"]
        await page.locator('input[name="password"]').fill(users.newuser.password);
        // Click [data-test="signin-submit"]
        await Promise.all([
            page.waitForNavigation({url: 'http://localhost:3000/'}),
            page.locator('[data-test="signin-submit"]').click()
        ]);

        await expect(page.locator('[data-test=user-onboarding-dialog-title]')).toBeVisible();
        await expect(page.locator('[data-test=user-onboarding-dialog-content]')).toBeVisible();
        await page.locator('[data-test=user-onboarding-next]').click();

        // Create bank account
        await expect(page.locator('[data-test=user-onboarding-dialog-title]')).toBeVisible();
        await page.locator('#bankaccount-bankName-input').fill(bankaccounts.newBankAccount.bankName);
        await page.locator('#bankaccount-routingNumber-input').fill(bankaccounts.newBankAccount.routingNumber);
        await page.locator('#bankaccount-accountNumber-input').fill(bankaccounts.newBankAccount.accountNumber);
        await page.locator('[data-test=bankaccount-submit]').click();

        // Complete onboarding
        await expect(page.locator('[data-test=user-onboarding-dialog-title]')).toBeVisible();
        await expect(page.locator('[data-test=user-onboarding-dialog-content]')).toBeVisible();
        await page.locator('[data-test=user-onboarding-next]').click();

        await expect(page.locator('[data-test=sidenav-user-full-name]')).toHaveText(users.newuser.firstName + " " + users.newuser.shortLastName);
    });

    test('Helper text should appear below password field if input less 4 symbols', async ({page}) => {
        await page.locator('#firstName').fill(users.newuser.firstName);
        await page.locator('#lastName').fill(users.newuser.lastName);
        await page.locator('#username').fill(users.newuser.username);
        await page.locator('#password').fill('123');

        await expect(page.locator('#password-helper-text')).toHaveText('Password must contain at least 4 characters');
        await expect(page.locator('[data-test=signup-submit]')).toBeDisabled();
    });
})