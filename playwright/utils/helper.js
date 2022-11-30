exports.LoginHelper = class LoginHelper {
    constructor(page) {
        this.page = page;
        this.usernameInput = page.locator('input[name="username"]');
        this.passwordInput = page.locator('input[name="password"]');
        this.clickSubmitButton = page.locator('[data-test="signin-submit"]')
    }

    async login(username, password) {
        await this.page.goto('http://localhost:3000/signin');
        await this.usernameInput.fill(username)
        await this.passwordInput.fill(password)
        await this.clickSubmitButton.click()
    }
}