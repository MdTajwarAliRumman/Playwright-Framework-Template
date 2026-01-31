import { test, expect } from '@playwright/test';
import { AllProductsPage } from '../../src/pages/AllProducts';
import { HomePage } from '../../src/pages/HomePage';
import dotenv from 'dotenv';
dotenv.config();

test.describe('All Products Flow', () => {
    let allProductsPage: AllProductsPage;
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        allProductsPage = new AllProductsPage(page);
        homePage = new HomePage(page);

        await homePage.goToURL();
        await homePage.clickOnElement(homePage.ProductsButton);
    });


    test('Verify that home page is visible successfully', async ({ page }) => {
        await expect(page).toHaveTitle('Automation Exercise - All Products');
    })

    test('Verify user is navigated to ALL PRODUCTS page successfully', async ({ page }) => {
        await expect(page.getByText('All Products')).toHaveText('All Products');
    });

    test('Verify that detail detail is visible: product name, category, price, availability, condition, brand', async ({ page }) => {
        await homePage.clickOnElement(allProductsPage.ViewProduct);
        await expect(allProductsPage.productInformation).toBeVisible();
        await expect(allProductsPage.productName).toBeVisible();
        await expect(allProductsPage.productCategory).toBeVisible();
        await expect(allProductsPage.productPrice).toBeVisible();
        await expect(allProductsPage.productAvailability).toBeVisible();
        await expect(allProductsPage.productQuantity).toBeVisible();
        await expect(allProductsPage.productCondition).toBeVisible();
        await expect(allProductsPage.productBrand).toBeVisible();

    });

});
