import {test, expect} from "@playwright/test";
import users from '../../../cypress/fixtures/users.json';

test.describe('Account details', () => {
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

    test('User account details should be visible', async ({page}) => {
        await page.locator('data-test=sidenav-user-settings').click();
        await expect(page.locator('data-test=user-settings-firstName-input')).toHaveAttribute('value', users.newuser.firstName);
        await expect(page.locator('data-test=user-settings-lastName-input')).toHaveAttribute('value', users.testuser.lastName);
        await expect(page.locator('data-test=user-settings-email-input')).toHaveAttribute('value', users.testuser.email);
        await expect(page.locator('data-test=user-settings-phoneNumber-input')).toHaveAttribute('value', users.testuser.phoneNumber);
    });

    test('Helper text should appear below email field if input invalid value', async ({page}) => {
        await page.locator('data-test=sidenav-user-settings').click();
        await page.locator('data-test=user-settings-email-input').fill(users.invaliduser.email);
        await expect(page.locator('#user-settings-email-input-helper-text')).toHaveText('Must contain a valid email address');
        await expect(page.locator('data-test=user-settings-submit')).toBeDisabled();
    });

    test('Helper text should appear below phone field if input invalid phone', async ({page}) => {
        await page.locator('data-test=sidenav-user-settings').click();
        await page.locator('data-test=user-settings-phoneNumber-input').fill(users.invaliduser.phoneNumber);
        await expect(page.locator('#user-settings-phoneNumber-input-helper-text')).toHaveText('Phone number is not valid');
        await expect(page.locator('data-test=user-settings-submit')).toBeDisabled();
    });

    test('User account settings should update successfully', async ({page}) => {
        await page.locator('data-test=sidenav-user-settings').click();
        await page.locator('data-test=user-settings-firstName-input').fill(users.newuser.firstName);
        await page.locator('data-test=user-settings-submit').click();
        await page.reload();
        await expect(page.locator('data-test=user-settings-firstName-input')).toHaveAttribute('value', users.newuser.firstName);

    });
})

