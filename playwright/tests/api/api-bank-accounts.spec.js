import {expect, test} from "@playwright/test";
import bankaccounts from "../../../cypress/fixtures/bankaccounts.json";

test.describe('Bank accounts', () => {
    test.beforeEach(async ({request}) => {
        await request.post('/login', {
            data: {
                type: "LOGIN",
                username: "Katharina_Bernier",
                password: "s3cret"
            }
        })
    });

    test("Get bankaccounts should respond with code 200 and correct response body", async ({ request}) => {
        const response = await request.get(`/bankaccounts`);
        expect(response.status()).toBe(200);
        const body = JSON.parse(await response.text());
        for (let i = 0; i < body.results.length; i++) {
            await expect(body.results[i]).toHaveProperty('id');
            await expect(body.results[i]).toHaveProperty('uuid');
            await expect(body.results[i]).toHaveProperty('userId');
            await expect(body.results[i]).toHaveProperty('bankName');
            await expect(body.results[i]).toHaveProperty('accountNumber');
            await expect(body.results[i]).toHaveProperty('routingNumber');
            await expect(body.results[i]).toHaveProperty('isDeleted');
            await expect(body.results[i]).toHaveProperty('createdAt');
            await expect(body.results[i]).toHaveProperty('modifiedAt');
        }
    });

    test("Should delete bank account", async ({ request}) => {
        const delResponse =
            await request.delete(`/bankaccounts/${bankaccounts.bankAccount.bankAccountId}`);
        expect(delResponse.status()).toBe(200);
        const getResponse =
            await request.get(`/bankaccounts/${bankaccounts.bankAccount.bankAccountId}`);
        expect(getResponse.status()).toBe(200);
        const body = JSON.parse(await getResponse.text());
        await expect(body.account).toHaveProperty('isDeleted', true);
    });
})