import {expect, test} from "@playwright/test";

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
        const body = JSON.parse(await response.text());
        for (let i = 0; i < body.results.length; i++) {
            await expect(body.results[i]).toHaveProperty('id');
            await expect(body.results[i]).toHaveProperty('uuid');
            await expect(body.results[i]).toHaveProperty('firstName');
            await expect(body.results[i]).toHaveProperty('lastName');
            await expect(body.results[i]).toHaveProperty('username');
            await expect(body.results[i]).toHaveProperty('password');
            await expect(body.results[i]).toHaveProperty('balance');
            await expect(body.results[i]).toHaveProperty('createdAt');
            await expect(body.results[i]).toHaveProperty('modifiedAt');
        }
    });
})