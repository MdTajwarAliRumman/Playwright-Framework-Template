import { test, expect } from '@playwright/test';
import { TestCasePage } from '../../src/pages/TestCasePage';
import { HomePage } from '../../src/pages/HomePage';
import dotenv from 'dotenv';
dotenv.config();

test.describe('Contact Flow', () => {
    let testCasePage: TestCasePage;
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        testCasePage = new TestCasePage(page);
        homePage = new HomePage(page);

        await homePage.goToURL();
        await homePage.clickOnElement(homePage.TestCaseButton);
    });


    test('Verify user is navigated to test cases page successfully', async ({ page }) => {
        await expect(page.getByText('Test Cases').first()).toHaveText('Test Cases');
    });

});
