import { test, expect } from '@playwright/test';
import { AuthPage } from '../../src/pages/AuthPage';
import { HomePage } from '../../src/pages/HomePage';
import testdata from '../../test-data/testdata.json';
import dotenv from 'dotenv';
dotenv.config();

// Here i have directing testdata from the json file to the object type
type TestData = {
    Credentials1: {
        email: string,
        password: string
    },
    Credentials2: {
        email: string,
        password: string
    },
    Credentials3: {
        email: string,
        password: string
    },
    Credentials4: {
        email: string,
        password: string
    },
    Credentials5: {
        email: string,
        password: string
    }

}

test.describe('Login Flow', () => {
    let authPage: AuthPage;
    let homePage: HomePage;

    test.beforeEach(async ({ page }) => {
        authPage = new AuthPage(page);
        homePage = new HomePage(page);

        await authPage.goToURL();
        await homePage.clickSignup();
    });

    // I've used unknown to silence the missmatch error of TS in the test data and the object type
    const typedTestData = testdata as unknown as TestData;
    for (const dataSetName in typedTestData) {
        const CredentialsData = typedTestData[dataSetName as keyof TestData];

        test(`Verify Users could not Login by providing, ${dataSetName}`, async ({ page }) => {
            await authPage.Login(CredentialsData.email, CredentialsData.password);
            await expect(page.getByText('Your email or password is incorrect!')).toBeVisible();

        });

    }

    test('Verify, Users could not Login by keeping the fileds empty', async ({ page }) => {
        await authPage.Login('', '');
        // await expect(authPage.LoginEmailTextBox).toBeVisible();
        // await expect(authPage.LoginPasswordTextBox).toBeVisible();
        await expect(authPage.LoginEmailTextBox).toHaveAttribute('required', '');
        await expect(authPage.LoginPasswordTextBox).toHaveAttribute('required', '');
        await expect(page.getByText('Login to your account')).toBeVisible();

    });
});










//<<----------------------------------------------Without dataset or proper methods code below------------------------------->>
// test.describe('Login Flow', () => {
//     let authPage: AuthPage;
//     let homePage: HomePage;
//     const generateEmail = () => `user_${Date.now()}@testmail.com`;

//     test.beforeEach(async ({ page }) => {
//         authPage = new AuthPage(page);
//         homePage = new HomePage(page);

//         await authPage.goToURL();
//         await homePage.clickSignup();
//     });

//     test('Verify, Users could not Login by keeping the fileds empty', async ({ page }) => {
//         await authPage.Login('', '');
//         // await expect(authPage.LoginEmailTextBox).toBeVisible();
//         // await expect(authPage.LoginPasswordTextBox).toBeVisible();
//         await expect(authPage.LoginEmailTextBox).toHaveAttribute('required', '');
//         await expect(authPage.LoginPasswordTextBox).toHaveAttribute('required', '');
//         await expect(page.getByText('Login to your account')).toBeVisible();

//     });

//     test('Verify, Users could not Login by providing invalid email and invalid password', async ({ page }) => {
//         await authPage.Login('tajwar1234@gmail.com', '12345678');
//         await expect(page.getByText('Your email or password is incorrect!')).toBeVisible();

//     });

//     test('Verify, Users could not Login by providing invalid email and valid password', async ({ page }) => {
//         await authPage.Login('tajwar1mail.com', '12345678');
//         await expect(page.getByText('Your email or password is incorrect!')).toBeVisible();

//     });

//     test('Verify, Users could not Login by providing valid email and invalid password', async ({ page }) => {
//         await authPage.Login('tajwar1234@gmail.com', '12345678');
//         await expect(page.getByText('Your email or password is incorrect!')).toBeVisible();

//     });

// });

