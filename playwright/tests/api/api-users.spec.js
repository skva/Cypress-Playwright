import {expect, test} from "@playwright/test";
import users from "../../../cypress/fixtures/users.json";

test.describe('Users', () => {
    test.beforeEach(async ({request}) => {
        await request.post('/login', {
            data: {
                type: "LOGIN",
                username: "Katharina_Bernier",
                password: "s3cret"
            }
        })
    });

    test("Get users should respond with code 200 and correct response body", async ({ request}) => {
        const response = await request.get(`/users`);
        await expect(response.status()).toBe(200);
        // TODO response body assertion
    });
})