import { Locator, Page } from "@playwright/test";

export class HomePage {
    // initialize all the pages

    readonly page: Page;
    readonly SignUpButton: Locator;

    constructor(page: Page) {
        this.page = page

        // Elements
        this.SignUpButton = page.locator("//a[normalize-space()='Signup / Login']")
    }

    // Methods
    async goToURL() {
        await this.page.goto(`${process.env.AUTOMATION_EXERCISES_URL}`);
    }

    async clickSignup() {
        await this.page.getByText('Signup / Login').click();
    }
}

