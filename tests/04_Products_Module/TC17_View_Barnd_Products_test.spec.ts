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
        await homePage.clickOnElement(homePage.ProductsButton);

    });

    test('Verify that categories are visible on left side bar', async ({ page }) => {
        await expect(page.getByText('Brands')).toBeVisible();
    })


    test('Verify navigating to brand page and brand products are displayed', async ({ page }) => {
        await test.step('Verify that Specific brand page and brand products are displayed', async () => {
            await homePage.clickOnElement(allProductsPage.brand1);
            await expect(page.getByText('Brand - ')).toBeVisible();
        })

        await test.step('Verify that another brand page and brand products are displayed', async () => {
            await homePage.clickOnElement(allProductsPage.brand2);
            await expect(page.getByText('Brand - ')).toBeVisible();
        })

    })
});

