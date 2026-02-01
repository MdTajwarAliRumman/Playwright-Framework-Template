import { test, expect } from '@playwright/test';
import { AllProductsPage } from '../../src/pages/AllProducts';
import { HomePage } from '../../src/pages/HomePage';
import { AuthPage } from '../../src/pages/AuthPage';
import dotenv from 'dotenv';
dotenv.config();

test.describe('Register Checkout Flow', () => {
    let allProductsPage: AllProductsPage;
    let homePage: HomePage;
    let authPage: AuthPage;

    test.beforeEach(async ({ page }) => {
        allProductsPage = new AllProductsPage(page);
        homePage = new HomePage(page);
        authPage = new AuthPage(page);

        await homePage.goToURL();
    });

    test('Verify that home page is visible successfully', async ({ page }) => {
        await expect(page).toHaveTitle('Automation Exercise');
    })

    test('Verify that categories are visible on left side bar', async ({ page }) => {
        await expect(page.getByText('Category')).toBeVisible();
    })

    test(' Verify that category page is displayed and confirm text "WOMEN - TOPS PRODUCTS"', async ({ page }) => {
        await expect(page.getByText('Category')).toBeVisible();
        await homePage.clickOnElement(allProductsPage.womenCategory);
        await homePage.clickOnElement(allProductsPage.womanCategoryItem);
        await expect(page.getByText('Women - Dress Products')).toBeVisible();
    })

    test(' Verify that user is navigated to the Man category page', async ({ page }) => {
        await expect(page.getByText('Category')).toBeVisible();
        await homePage.clickOnElement(allProductsPage.womenCategory);
        await homePage.clickOnElement(allProductsPage.womanCategoryItem);
        await expect(page.getByText('Women - Dress Products')).toBeVisible();
        await homePage.clickOnElement(allProductsPage.manCategory);
        await homePage.clickOnElement(allProductsPage.manCategoryItem);
        await expect(page.getByText('Men - Tshirts Products')).toBeVisible();
    })
});

