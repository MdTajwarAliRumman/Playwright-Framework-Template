import { test, expect } from '@playwright/test';
import { AllProductsPage } from '../../src/pages/AllProducts';
import { HomePage } from '../../src/pages/HomePage';
import { AuthPage } from '../../src/pages/AuthPage';
import { PaymentPage } from '../../src/pages/PaymentPage';
import dotenv from 'dotenv';
dotenv.config();

test.describe('Register Checkout Flow', () => {
    let allProductsPage: AllProductsPage;
    let homePage: HomePage;

    let authPage: AuthPage;
    let paymentPage: PaymentPage;

    test.beforeEach(async ({ page }) => {
        allProductsPage = new AllProductsPage(page);
        homePage = new HomePage(page);
        authPage = new AuthPage(page);
        paymentPage = new PaymentPage(page);

        await homePage.goToURL();
        // await homePage.clickOnElement(homePage.ProductsButton);
    });


    test('Verify that home page is visible successfully', async ({ page }) => {
        await expect(page).toHaveTitle('Automation Exercise');
    })


    // here i have created one test case for register while checkout- in which i have conducted all the steps in test.step
    test('Verify Register while checkout', async ({ page }) => {

        await test.step('Verify that "ENTER ACCOUNT INFORMATION" is visible', async () => {
            await homePage.clickOnElement(homePage.SignUpButton);
            await authPage.Login(process.env.USER_EMAIL!, process.env.USER_PASSWORD!);
        });

        await test.step(" Verify that 'logged in user' is visible", async () => {
            await expect(authPage.loggedInUser).toBeVisible();
        })

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

        await test.step(" Verify Address Details and Review Your Order", async () => {
            await homePage.clickOnElement(homePage.CartButton);
            await allProductsPage.checkoutButton.click();
            await expect(page.getByText('Address Details')).toBeVisible();
            await expect(page.getByText('Review Your Order')).toBeVisible();
        })

        await test.step(" Verify Filling up the message area and then placing order", async () => {
            await allProductsPage.textAreaMessage.fill(process.env.DESCRIPTION_DEMO!);
            await allProductsPage.placeOrderButton.click();
        })

        await test.step(" Verify Payment details are being stored", async () => {
            await paymentPage.nameOnCard.fill(process.env.USER_NAME!);
            await paymentPage.cardNumber.fill(process.env.NUMBER!);
            await paymentPage.cvc.fill('123');
            await paymentPage.expiryMonth.fill(process.env.MONTH!);
            await paymentPage.expiryYear.fill(process.env.YEAR!);
            await paymentPage.payButton.click();
        })

        await test.step(" Verify success message 'Your order has been placed successfully!'", async () => {
            await expect(page.getByText('Order Placed!')).toBeVisible();
        })
    });

});

