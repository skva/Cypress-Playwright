import {expect, test} from "@playwright/test";
import transactions from "../../../cypress/fixtures/transactions.json";

test.describe('Transactions', () => {
    test.beforeEach(async ({request}) => {
        await request.post('/login', {
            data: {
                type: "LOGIN",
                username: "Katharina_Bernier",
                password: "s3cret"
            }
        })
    });

    test("Post comment should respond with code 200 and correct response body", async ({ request}) => {
        const response = await request.post(`/comments/${transactions.testtransaction.transactionId}`, {
            data: {
                content: "api",
                transactionId: `${transactions.testtransaction.transactionId}`,
            },
        });
        expect(response.status()).toBe(200);
        expect(response.statusText()).toContain("OK")
    });
})