import {expect, test} from "@playwright/test";
import bankaccounts from "../../../cypress/fixtures/bankaccounts.json";

test.describe('Bank accounts', () => {
    test.beforeEach(async ({request}) => {
        await request.post('http://localhost:3002/login', {
            data: {
                type: "LOGIN",
                username: "Katharina_Bernier",
                password: "s3cret"
            }
        })
    });

    test("Get bankaccounts should respond with code 200 and correct response body", async ({ request}) => {
        const response = await request.get(`http://localhost:3002/bankaccounts`);
        expect(response.status()).toBe(200);
        const body = JSON.parse(await response.text());
        await expect(body.results[0]).toHaveProperty('id');
        await expect(body.results[0]).toHaveProperty('uuid');
        await expect(body.results[0]).toHaveProperty('userId');
        await expect(body.results[0]).toHaveProperty('bankName');
        await expect(body.results[0]).toHaveProperty('accountNumber');
        await expect(body.results[0]).toHaveProperty('routingNumber');
        await expect(body.results[0]).toHaveProperty('isDeleted');
        await expect(body.results[0]).toHaveProperty('createdAt');
        await expect(body.results[0]).toHaveProperty('modifiedAt');
        // await body.results.each(async el => {
        //     await expect(el).toHaveProperty('id')
        // })

    });

    test("Should delete bank account", async ({ request}) => {
        const delResponse =
            await request.delete(`http://localhost:3002/bankaccounts/${bankaccounts.bankAccount.bankAccountId}`);
        expect(delResponse.status()).toBe(200);
        const getResponse =
            await request.get(`http://localhost:3002/bankaccounts/${bankaccounts.bankAccount.bankAccountId}`);
        expect(getResponse.status()).toBe(200);
        const body = JSON.parse(await getResponse.text());
        await expect(body.account).toHaveProperty('isDeleted', true);
    });
})