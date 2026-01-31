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

    test('Verify "SEARCHED PRODUCTS" is visible', async ({ page }) => {
        await allProductsPage.searchBox.fill('Men Tshirt');
        await allProductsPage.searchButton.click();
        await expect(page.getByText("Searched Products")).toBeVisible();
    });

    test('Verify all the products related to search are visible', async ({ page }) => {
        await allProductsPage.searchBox.fill('Men Tshirt');
        await allProductsPage.searchButton.click();
        await expect(allProductsPage.ViewProduct).toBeVisible();
    });

});
