import { test, expect } from '@playwright/test';
import { AuthPage } from '../../src/pages/AuthPage';
import { HomePage } from '../../src/pages/HomePage';
import dotenv from 'dotenv';
dotenv.config();

test.describe('Register Flow', () => {
    let authPage: AuthPage;
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        authPage = new AuthPage(page);
        homePage = new HomePage(page);

        await homePage.goToURL();
        await homePage.clickOnElement();
    });

    // this test is for homepage later on 
    test('Verify that home page is visible successfully', async ({ page }) => {
        await expect(page).toHaveTitle('Automation Exercise - Signup / Login');
    })

    test('Verify "New User Signup!" is visible', async ({ page }) => {
        await expect(page.getByText('New User Signup!')).toBeVisible();
    });

    test("Verify error 'Email Address already exist!' is visible", async ({ page }) => {
        await authPage.SignUp('Tajwar', process.env.USER_EMAIL!);
        await expect(page.getByText('Email Address already exist!')).toBeVisible();
    });

});
