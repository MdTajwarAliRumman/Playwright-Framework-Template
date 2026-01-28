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

    // this test is for homepage was visible or not
    test('Verify that home page is visible successfully', async ({ page }) => {
        await expect(page).toHaveTitle('Automation Exercise - Signup / Login');
    })

    test('Verify "New User Signup!" is visible', async ({ page }) => {
        await expect(page.getByText('New User Signup!')).toBeVisible();
    });

    test('Verify "Account logout successfully done"', async ({ page }) => {
        await authPage.Login(process.env.USER_EMAIL!, process.env.USER_PASSWORD!);
        await authPage.logoutButton.click();
        await expect(page.getByText('Login to your account')).toBeVisible();
    });



});
