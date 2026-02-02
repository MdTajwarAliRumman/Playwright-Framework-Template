import { test, expect } from '@playwright/test';
import { AllProductsPage } from '../../src/pages/AllProducts';
import { HomePage } from '../../src/pages/HomePage';
import { AuthPage } from '../../src/pages/AuthPage';
import dotenv from 'dotenv';
dotenv.config();

test.describe('All Products Flow', () => {
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
        await expect(page.getByText("View Product")).toBeVisible();
    });

    test('Search Products and Verify Cart After Login', async ({ page }) => {
        await test.step('Verify that products are visible in cart', async () => {
            await allProductsPage.searchBox.fill('Men Tshirt');
            await allProductsPage.searchButton.click();
            await homePage.hoverOnElement(page.getByText("View Product"));
            await homePage.clickOnElement(page.getByText("Add to cart").first());
            await homePage.clickOnElement(page.getByText("View Cart").first());
            await expect(allProductsPage.checkoutButton).toBeVisible();
        });

        await test.step('Verify User is able to login while checkout', async () => {
            await homePage.clickOnElement(allProductsPage.checkoutButton);
            await homePage.clickOnElement(allProductsPage.registerWhileCheckoutBtn);
            await expect(page.getByText('Login to your account')).toBeVisible();
            await authPage.Login(process.env.USER_EMAIL!, process.env.USER_PASSWORD!);
        });

        await test.step('Verify that those products are visible in cart after login', async () => {
            await homePage.clickOnElement(homePage.CartButton);
            await expect(allProductsPage.productQuantityInCart).toBeVisible();
        });
    });

});
