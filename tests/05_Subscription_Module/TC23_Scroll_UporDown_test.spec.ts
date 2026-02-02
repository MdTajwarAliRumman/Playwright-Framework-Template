import { test, expect } from '@playwright/test';
import { HomePage } from '../../src/pages/HomePage';
import dotenv from 'dotenv';
dotenv.config();

test.describe('Subscription Flow', () => {
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        homePage = new HomePage(page);

        await homePage.goToURL();
    });

    test.afterEach(async ({ page }, testInfo) => {
        if (testInfo.status !== testInfo.expectedStatus) {
            await page.screenshot({
                path: `screenshots/${testInfo.title}.png`,
                fullPage: true
            });
        }
    });


    test('Verify that home page is visible successfully', async ({ page }) => {
        await expect(page).toHaveTitle('Automation Exercise');
    })

    test('Verify "SUBSCRIPTION" is visible', async ({ page }) => {
        //Here I am scrolling the subscription field into view
        await homePage.scrollToElement(homePage.SubscriptionField);
    });

    test('Verify that page is scrolled up and "Full Fledged practice website for Automation Engineers" text is visible on screen', async ({ page }) => {
        await homePage.scrollToElement(homePage.SubscriptionButton);
        await homePage.clickOnElement(homePage.scrollUpButton);
        await expect(page.getByText("Automation Exercise").first()).toBeVisible();
    });

});

