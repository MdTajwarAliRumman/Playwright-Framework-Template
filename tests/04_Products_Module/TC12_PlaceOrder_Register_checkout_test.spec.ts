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
    const generateEmail = () => `user_${Date.now()}@testmail.com`;


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
            await allProductsPage.productQuantity.fill("2");
            await allProductsPage.clickAddToCart();
        });

        await test.step('Verify cart page is displayed', async () => {
            await homePage.clickOnElement(page.getByText("View Cart").first());
            await expect(allProductsPage.checkoutButton).toBeVisible();
        });

        await test.step('Verify Register while checkout', async () => {
            await homePage.clickOnElement(allProductsPage.checkoutButton);
            await homePage.clickOnElement(allProductsPage.registerWhileCheckoutBtn);
        });

        await test.step('Verify that "ENTER ACCOUNT INFORMATION" is visible', async () => {
            await authPage.SignUp('Tajwar', generateEmail());
            await expect(page.getByText('ENTER ACCOUNT INFORMATION')).toBeVisible();
        });

        await test.step(" Verify that 'ACCOUNT CREATED!' is visible", async () => {
            await authPage.AccountInfo('Md. Tajwar', '12345678', '10', 'March', '1995', 'Md. Tajwar', 'Ali', 'Softvence', '601/!, Mirpur', 'Dhaka', 'Australia', 'Dhaka', 'Dhaka', '1216', '01933954158');
            await expect(page.getByText('Account Created!')).toBeVisible();
        })

        await test.step(" Verify that 'logged in user' is visible", async () => {
            await authPage.continueButton.click();
            await expect(authPage.loggedInUser).toBeVisible();
        })

        await test.step(" Verify Address Details and Review Your Order", async () => {
            await homePage.clickOnElement(homePage.CartButton);
            await allProductsPage.checkoutButton.click();
            await expect(page.getByText('Address Details')).toBeVisible();
            await expect(page.getByText('Review Your Order')).toBeVisible();
        })


    });






    // test('Verify Register while checkout', async ({ page }) => {
    //     await homePage.hoverOnElement(allProductsPage.ViewProduct1);
    //     //nth means selecting the second product
    //     await allProductsPage.products.nth(2).hover();
    //     await homePage.clickOnElement(allProductsPage.ViewProduct2);
    //     await expect(page.getByText("Add to cart").first()).toBeVisible();
    //     await allProductsPage.productQuantity.fill("2");
    //     await allProductsPage.clickAddToCart();
    //     await homePage.clickOnElement(page.getByText("View Cart").first());
    //     test(' Verify that cart page is displayed', async ({ page }) => {
    //         await expect(allProductsPage.checkoutButton).toBeVisible();
    //     })

    // });

});

