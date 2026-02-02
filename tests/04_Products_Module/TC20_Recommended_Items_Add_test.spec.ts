import { test, expect } from '@playwright/test';
import { AllProductsPage } from '../../src/pages/AllProducts';
import { HomePage } from '../../src/pages/HomePage';
import { AuthPage } from '../../src/pages/AuthPage';
import dotenv from 'dotenv';
dotenv.config();

test.describe('Product Review Flow', () => {
    let allProductsPage: AllProductsPage;
    let homePage: HomePage;
    let authPage: AuthPage;

    test.beforeEach(async ({ page }) => {
        allProductsPage = new AllProductsPage(page);
        homePage = new HomePage(page);
        authPage = new AuthPage(page);

        await homePage.goToURL();
        // await homePage.clickOnElement(homePage.ProductsButton);
    });


    test('Verify that home page is visible successfully', async ({ page }) => {
        await expect(page).toHaveTitle('Automation Exercise');
    })

    test('Verify all the products related to search are visible', async ({ page }) => {
        await allProductsPage.searchBox.fill('Men Tshirt');
        await allProductsPage.searchButton.click();
        await expect(page.getByText("View Product")).toBeVisible();
    });

    test(' Verify success message "Thank you for your review."', async ({ page }) => {
        await test.step('Verify "RECOMMENDED ITEMS" are visible', async () => {
            await homePage.hoverOnElement(page.getByText("RECOMMENDED ITEMS"));
            await expect(page.getByText("RECOMMENDED ITEMS")).toBeVisible();
        });

        await test.step('Verify that product is displayed in cart page', async () => {
            await homePage.clickOnElement(homePage.reommendedItems);
            await expect(page.getByText("View Cart")).toBeVisible();
            await homePage.clickOnElement(page.getByText("View Cart"));
        });

    });

});
