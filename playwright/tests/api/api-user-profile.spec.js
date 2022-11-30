import {expect, test} from "@playwright/test";
import users from "../../../cypress/fixtures/users.json";

test.describe('User Profile', () => {
    test.beforeEach(async ({request}) => {
        await request.post('http://localhost:3002/login', {
            data: {
                type: "LOGIN",
                username: "Katharina_Bernier",
                password: "s3cret"
            }
        })
    });

    test("Get profile by username should respond with code 200 and correct response body", async ({ request}) => {
        const response = await request.get(`http://localhost:3002/users/profile/${users.testuser.username}`);
        await expect(response.status()).toBe(200);
        const body = JSON.parse(await response.text());
        await expect(body.user).toHaveProperty('firstName');
        await expect(body.user).toHaveProperty('lastName');
        await expect(body.user).toHaveProperty('avatar');
    });
})