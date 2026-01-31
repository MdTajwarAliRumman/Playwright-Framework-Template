import { Locator, Page } from "@playwright/test";

export class TestCasePage {
    // initialize all the pages

    readonly page: Page;
    readonly TestCaseButton: Locator;


    constructor(page: Page) {
        this.page = page

        // Elements
        this.TestCaseButton = page.locator("//a[contains(text(),'Test Cases')]")

    }

    // Methods
    async clickTestCase() {
        await this.TestCaseButton.click();
    }

}

