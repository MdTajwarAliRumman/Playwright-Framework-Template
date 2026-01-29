import { test, expect } from '@playwright/test';
import { AuthPage } from '../../src/pages/AuthPage';
import { HomePage } from '../../src/pages/HomePage';
import dotenv from 'dotenv';
dotenv.config();

test.describe('Login Flow', () => {
    let authPage: AuthPage;
    let homePage: HomePage;
    const generateEmail = () => `user_${Date.now()}@testmail.com`;

    test.beforeEach(async ({ page }) => {
        authPage = new AuthPage(page);
        homePage = new HomePage(page);

        await homePage.goToURL();
        await homePage.clickOnElement(homePage.SignUpButton);
    });

    test('Verify "Login to your account" is visible', async ({ page }) => {
        await expect(page.getByText('Login to your account')).toBeVisible();
    });

    test(" Verify that 'logged in user' is visible", async ({ page }) => {
        await authPage.SignUp('Tajwar', generateEmail());
        await authPage.AccountInfo('Md. Tajwar', '12345678', '10', 'March', '1995', 'Md. Tajwar', 'Ali', 'Softvence', '601/!, Mirpur', 'Dhaka', 'Australia', 'Dhaka', 'Dhaka', '1216', '01933954158');
        await authPage.continueButton.click();
        await authPage.logoutButton.click();
        await authPage.Login(generateEmail(), '12345678');
        await expect(authPage.loggedInUser).toBeVisible();
    })

    test(" Verify that 'Account Deleted' is visible", async ({ page }) => {
        await authPage.SignUp('Tajwar', 'tajwar1234@gmail.com');
        await authPage.AccountInfo('Md. Tajwar', '12345678', '10', 'March', '1995', 'Md. Tajwar', 'Ali', 'Softvence', '601/!, Mirpur', 'Dhaka', 'Australia', 'Dhaka', 'Dhaka', '1216', '01933954158');
        await authPage.continueButton.click();
        await authPage.logoutButton.click();
        await authPage.Login('tajwar1234@gmail.com', '12345678');
        await expect(authPage.loggedInUser).toBeVisible();
        await authPage.userDeleteBtn.click();
        await expect(page.getByText('ACCOUNT DELETED!')).toBeVisible();
    })

});

