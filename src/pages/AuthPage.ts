import { Locator, Page } from "@playwright/test";
import dotenv from 'dotenv';
dotenv.config();

export class AuthPage {
    // initialize all the pages

    readonly page: Page;
    readonly NameTextBox: Locator;
    readonly SignupEmailTextBox: Locator;
    readonly SignupButton: Locator;

    readonly LoginEmailTextBox: Locator;
    readonly LoginPasswordTextBox: Locator;
    readonly LoginButton: Locator;

    readonly AccountInfoTitle: Locator;

    constructor(page: Page) {
        this.page = page

        // Elements
        this.NameTextBox = page.locator("//input[@placeholder='Name']")
        this.SignupEmailTextBox = page.locator("//input[@data-qa='signup-email']")
        this.SignupButton = page.locator("//button[normalize-space()='Signup']")

        this.LoginEmailTextBox = page.locator("//input[@data-qa='login-email']")
        this.LoginPasswordTextBox = page.locator("//input[@placeholder='Password']")
        this.LoginButton = page.locator("//button[normalize-space()='Login']")

        this.AccountInfoTitle = page.getByText('ENTER ACCOUNT INFORMATION')
    }

    // Methods
    async goToURL() {
        await this.page.goto(`${process.env.AUTOMATION_EXERCISES_URL}`);
    }

    async SignUp(name: string, email: string) {
        await this.NameTextBox.fill(name);
        await this.SignupEmailTextBox.fill(email);
        await this.SignupButton.click();

    }

}