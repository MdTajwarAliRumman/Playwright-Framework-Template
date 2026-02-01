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

    test('Verify Hover over first product and click Add to cart', async ({ page }) => {
        await homePage.hoverOnElement(allProductsPage.ViewProduct1);
        await expect(page.getByText("Add to cart").first()).toBeVisible();
        await homePage.clickOnElement(allProductsPage.AddToCart.first());
        await expect(page.getByText("Continue Shopping").first()).toBeVisible();
        await page.getByText("Continue Shopping").first().click();
    });

    test('Verify both products are added to Cart', async ({ page }) => {
        await expect(page.getByText("Add to cart").first()).toBeVisible();
        await homePage.clickOnElement(allProductsPage.AddToCart.first());
        await page.getByText("Continue Shopping").first().click();

        await homePage.hoverOnElement(allProductsPage.ViewProduct1);
        //nth means selecting the second product
        await allProductsPage.products.nth(2).hover();
        await allProductsPage.AddToCart.nth(2).click();

        await expect(page.getByText("View Cart").first()).toBeVisible();
        await page.getByText("View Cart").first().click();
        await expect(page.getByText("Proceed To Checkout")).toBeVisible();
    });

    test('Verify product details are being displayed into the Cart', async ({ page }) => {
        await expect(page.getByText("Add to cart").first()).toBeVisible();
        await homePage.clickOnElement(allProductsPage.AddToCart.first());
        await page.getByText("Continue Shopping").first().click();

        await homePage.hoverOnElement(allProductsPage.ViewProduct1);
        //nth means selecting the second product
        await allProductsPage.products.nth(2).hover();
        await allProductsPage.AddToCart.nth(2).click();

        await expect(page.getByText("View Cart").first()).toBeVisible();
        await page.getByText("View Cart").first().click();
        await expect(page.getByText("Proceed To Checkout")).toBeVisible();

        await allProductsPage.verifyAllCartProductsDetails();
    });

});
