import {test, expect} from "@playwright/test";
import users from '../../../cypress/fixtures/users.json';
import { LoginHelper } from '../../utils/helper';

test.describe('Account details', () => {
    test.beforeEach(async ({page}) => {
        const loginHelper = new LoginHelper(page);
        await loginHelper.login(users.testuser.username, users.testuser.password);
    });

    test('User account details should be visible', async ({page}) => {
        await page.locator('data-test=sidenav-user-settings').click();
        await expect(page.locator('data-test=user-settings-firstName-input')).toHaveAttribute('value', users.testuser.firstName);
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
        await expect(page.locator('data-test=sidenav-user-full-name')).toContainText(users.newuser.firstName);
    });
})

