import { test, expect } from '@playwright/test';
import { AuthPage } from '../../src/pages/AuthPage';
import { HomePage } from '../../src/pages/HomePage';
import dotenv from 'dotenv';

dotenv.config();

test.describe('Signup Flow', () => {
    let authPage: AuthPage;
    let homePage: HomePage;
    const generateEmail = () => `user_${Date.now()}@testmail.com`;

    test.beforeEach(async ({ page }) => {
        authPage = new AuthPage(page);
        homePage = new HomePage(page);

        await homePage.goToURL();

        await homePage.clickOnElement(homePage.SignUpButton);
    });


    test.afterEach(async ({ page }, testInfo) => {
        if (testInfo.status !== testInfo.expectedStatus) {
            await page.screenshot({
                path: `../screenshots/${testInfo.title}.png`,
                fullPage: true
            });
        }
    });


    test('Verify "New User Signup!" is visible', async ({ page }) => {
        await expect(page.getByText('Testing New User Signup!')).toBeVisible();
    });

    test('Verify that "ENTER ACCOUNT INFORMATION" is visible', async ({ page }) => {
        await authPage.SignUp('Tajwar', generateEmail());
        await expect(page.getByText('Invalid text to test Screenshot!')).toBeVisible();
    });

    test(" Verify that 'ACCOUNT CREATED!' is visible", async ({ page }) => {
        await authPage.SignUp('Tajwar', generateEmail());
        await authPage.AccountInfo('Md. Tajwar', '12345678', '10', 'March', '1995', 'Md. Tajwar', 'Ali', 'Softvence', '601/!, Mirpur', 'Dhaka', 'Australia', 'Dhaka', 'Dhaka', '1216', '01933954158');
        await expect(page.getByText('Account Created!')).toBeVisible();
    })

    test(" Verify that 'logged in user' is visible", async ({ page }) => {
        await authPage.SignUp('Tajwar', generateEmail());
        await authPage.AccountInfo('Md. Tajwar', '12345678', '10', 'March', '1995', 'Md. Tajwar', 'Ali', 'Softvence', '601/!, Mirpur', 'Dhaka', 'Australia', 'Dhaka', 'Dhaka', '1216', '01933954158');
        await authPage.continueButton.click();
        await expect(authPage.loggedInUser).toBeVisible();

    })

    test(" Verify that 'ACCOUNT DELETED!' is visible", async ({ page }) => {
        await authPage.SignUp('Tajwar', generateEmail());
        await authPage.AccountInfo('Md. Tajwar', '12345678', '10', 'March', '1995', 'Md. Tajwar', 'Ali', 'Softvence', '601/!, Mirpur', 'Dhaka', 'Australia', 'Dhaka', 'Dhaka', '1216', '01933954158');
        await authPage.continueButton.click();
        await expect(authPage.loggedInUser).toBeVisible();
        await authPage.userDeleteBtn.click();
        await expect(page.getByText('ACCOUNT DELETED!')).toBeVisible();
    })

});
