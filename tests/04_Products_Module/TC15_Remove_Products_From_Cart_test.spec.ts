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
        // await homePage.clickOnElement(homePage.ProductsButton);
    });


    test('Verify that home page is visible successfully', async ({ page }) => {
        await expect(page).toHaveTitle('Automation Exercise');
    })


    // here i have created one test case for register while checkout- in which i have conducted all the steps in test.step
    test('Verify Register while checkout', async ({ page }) => {

        await test.step('Open product and add to cart', async () => {
            await homePage.hoverOnElement(allProductsPage.ViewProduct1);
            await allProductsPage.products.nth(2).hover();
            await homePage.clickOnElement(allProductsPage.ViewProduct2);
            await expect(page.getByText("Add to cart").first()).toBeVisible();
            await allProductsPage.clickAddToCart();
        });

        await test.step('Verify cart page is displayed', async () => {
            await homePage.clickOnElement(page.getByText("View Cart").first());
            await expect(allProductsPage.checkoutButton).toBeVisible();
        });

        await test.step(" Verify that product is removed from the cart", async () => {
            await homePage.clickOnElement(allProductsPage.removeFromCart);
            await expect(page.getByText("Cart is empty! Click here to buy products.")).toBeVisible();
        })
    });

});

