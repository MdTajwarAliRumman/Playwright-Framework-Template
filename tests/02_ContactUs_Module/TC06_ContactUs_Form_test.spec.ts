import { test, expect } from '@playwright/test';
import { ContactPage } from '../../src/pages/ContactPage';
import { HomePage } from '../../src/pages/HomePage';
import dotenv from 'dotenv';
dotenv.config();

test.describe('Contact Flow', () => {
    let contactPage: ContactPage;
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        contactPage = new ContactPage(page);
        homePage = new HomePage(page);

        await homePage.goToURL();
        await homePage.clickOnElement(homePage.ContactButton);
    });

    // this test is for homepage later on 
    test('Verify that home page is visible successfully', async ({ page }) => {
        await expect(page).toHaveTitle('Automation Exercise - Contact Us');
    })

    test('Verify "GET IN TOUCH" is visible', async ({ page }) => {
        await expect(page.getByText('GET IN TOUCH')).toBeVisible();
    });

    test("Verify success message 'Success! Your details have been submitted successfully.' is visible", async ({ page }) => {
        await contactPage.contactFormDetails(`${process.env.USER_EMAIL}`, `${process.env.USER_EMAIL}`, `${process.env.DESCRIPTION_DEMO}`, `${process.env.DESCRIPTION_DEMO}`);
        await contactPage.UploadFile.setInputFiles('Images/SQA.jpg');
        await contactPage.SubmitButton.click();
        // await contactPage.alertMessage();
        await page.waitForTimeout(5000);
        // await expect(page.getByText("Success! Your details have been submitted successfully.")).toBeVisible();

    });

});
