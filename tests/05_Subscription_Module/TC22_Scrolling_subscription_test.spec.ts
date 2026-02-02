import { test, expect } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';
import dotenv from 'dotenv';
dotenv.config();

test.describe('Subscription Flow', () => {
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);

        await homePage.goToURL();
        //Here I am scrolling the subscription field into view
        await homePage.scrollToElement(homePage.SubscriptionField);
    });


    test('Verify that home page is visible successfully', async ({ page }) => {
        await expect(page).toHaveTitle('Automation Exercise');
    })

    test(' Verify success message "You have been successfully subscribed!" is visible', async ({ page }) => {
        await homePage.SubscriptionField.fill("test@gmail.com");
        await homePage.SubscriptionButton.click();
        await expect(page.getByText("You have been successfully subscribed!")).toBeVisible();
    });


});
