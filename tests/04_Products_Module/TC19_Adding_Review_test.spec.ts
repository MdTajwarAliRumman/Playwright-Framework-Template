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
        await homePage.clickOnElement(homePage.ProductsButton);
    });


    test('Verify that home page is visible successfully', async ({ page }) => {
        await expect(page).toHaveTitle('Automation Exercise - All Products');
    })

    test('Verify user is navigated to ALL PRODUCTS page successfully', async ({ page }) => {
        await expect(page.getByText('All Products')).toHaveText('All Products');
    });

    test('Verify all the products related to search are visible', async ({ page }) => {
        await allProductsPage.searchBox.fill('Men Tshirt');
        await allProductsPage.searchButton.click();
        await expect(page.getByText("View Product")).toBeVisible();
    });

    test(' Verify success message "Thank you for your review."', async ({ page }) => {
        await test.step('Verify that "Write Your Review" is visible', async () => {
            await homePage.hoverOnElement(allProductsPage.ViewProduct1);
            await homePage.clickOnElement(allProductsPage.ViewProduct1);
            await expect(page.getByText("Write Your Review").first()).toBeVisible();
        });

        await test.step('Verify that "Thank you for your review." is visible', async () => {
            await authPage.reviewName.fill(`${process.env.USER_NAME}`);
            await authPage.reviewEmail.fill(`${process.env.USER_EMAIL}`);
            await authPage.reviewMessage.fill(`${process.env.DESCRIPTION_DETAIL}`);
            await authPage.reviewButton.click();
            await expect(page.getByText("Thank you for your review.")).toBeVisible();
        });

    });

});
