import { test, expect } from '@playwright/test';
import { AllProductsPage } from '../../src/pages/AllProducts';
import { HomePage } from '../../src/pages/HomePage';
import dotenv from 'dotenv';
dotenv.config();

test.describe('Cart Products Flow', () => {
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

    test('Verify Specific Product Details are visible and product is displayed in cart page with exact quantity', async ({ page }) => {
        await homePage.hoverOnElement(allProductsPage.ViewProduct1);
        //nth means selecting the second product
        await allProductsPage.products.nth(2).hover();
        await homePage.clickOnElement(allProductsPage.ViewProduct2);
        await expect(page.getByText("Add to cart").first()).toBeVisible();
        await allProductsPage.productQuantity.fill("4");
        await allProductsPage.clickAddToCart();
        await homePage.clickOnElement(page.getByText("View Cart").first());
        await expect(allProductsPage.productQuantityInCart).toHaveText("4");
    });

});
