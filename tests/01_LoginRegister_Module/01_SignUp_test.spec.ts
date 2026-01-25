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

        await authPage.goToURL();
        // await homePage.clickSignup();
    });

    test('Verify that home page is visible successfully', async ({ page }) => {
        await expect(page).toHaveTitle('Automation Exercise');
    })

    test('Verify "New User Signup!" is visible', async ({ page }) => {
        await homePage.clickSignup();
        await expect(page.getByText('New User Signup!')).toBeVisible();
    });

    test('Verify that "ENTER ACCOUNT INFORMATION" is visible', async ({ page }) => {
        await homePage.clickSignup();
        await authPage.SignUp('Tajwar', generateEmail());
        await expect(page.getByText('ENTER ACCOUNT INFORMATION')).toBeVisible();
    });

});
