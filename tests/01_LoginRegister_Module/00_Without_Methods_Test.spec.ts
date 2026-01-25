import { test, expect } from '@playwright/test';
import { AuthPage } from '../../src/pages/AuthPage';
import { HomePage } from '../../src/pages/HomePage';
import dotenv from 'dotenv';
dotenv.config();

test.describe('Signup Flow', () => {
    let authPage: AuthPage;
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        authPage = new AuthPage(page);
        homePage = new HomePage(page);

        await authPage.goToURL();
        await homePage.clickSignup();
    });

    test('Verify that home page is visible successfully', async ({ page }) => {

        // await expect(page).toHaveTitle('Automation Exercise');
        const homePage = new HomePage(page);
        const authPage = new AuthPage(page);
        await authPage.goToURL();
        await expect(page).toHaveTitle("Automation Exercise")
        await homePage.SignUpButton.click()
    })

    test('Verify "New User Signup!" is visible', async ({ page }) => {

        const homePage = new HomePage(page);
        const authPage = new AuthPage(page);
        await authPage.goToURL();
        await homePage.SignUpButton.click()

        await expect(page.getByText('New User Signup!')).toBeVisible();
        await authPage.NameTextBox.fill("Tajwar")
        await authPage.SignupEmailTextBox.fill("hivip45894@gxuzi.com")
        await authPage.SignupButton.click()

    });

    test('Verify that "ENTER ACCOUNT INFORMATION" is visible', async ({ page }) => {

        const homePage = new HomePage(page);
        const authPage = new AuthPage(page);
        await authPage.goToURL();
        await homePage.SignUpButton.click()

        await expect(page.getByText('New User Signup!')).toBeVisible();
        await authPage.NameTextBox.fill("Tajwar")
        await authPage.SignupEmailTextBox.fill("hivip45894@gxuzi.com")
        await authPage.SignupButton.click()

        await expect(authPage.AccountInfoTitle).toBeVisible();
    });

});
