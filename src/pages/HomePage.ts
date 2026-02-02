import { Locator, Page } from "@playwright/test";

export class HomePage {
    // < ---------  initialize all the pages --------->
    readonly page: Page;
    readonly SignUpButton: Locator;
    readonly ContactButton: Locator;
    readonly TestCaseButton: Locator;
    readonly ProductsButton: Locator;
    readonly SubscriptionField: Locator;
    readonly SubscriptionButton: Locator;
    readonly CartButton: Locator;
    readonly DeleteAccountButton: Locator;
    readonly reommendedItems: Locator;

    constructor(page: Page) {
        this.page = page

        // <-------- Elements -------->
        this.SignUpButton = page.locator("//a[normalize-space()='Signup / Login']")
        this.ContactButton = page.locator("//a[normalize-space()='Contact us']")
        this.TestCaseButton = page.locator("//a[contains(text(),'Test Cases')]")
        this.ProductsButton = page.locator("//a[@href='/products']")
        this.SubscriptionField = page.locator("//input[@id='susbscribe_email']")
        this.SubscriptionButton = page.locator("//button[@id='subscribe']")
        this.CartButton = page.locator("//a[normalize-space()='Cart']")
        this.DeleteAccountButton = page.locator("//a[normalize-space()='Delete Account']")
        this.reommendedItems = page.locator("//div[@class='item active']//div[1]//div[1]//div[1]//div[1]//a[1]")

    }

    // <-------- Methods -------->
    async goToURL() {
        await this.page.goto(`${process.env.AUTOMATION_EXERCISES_URL}`);
    }

    // this method is for signup only   
    async clickSignup() {
        await this.SignUpButton.click();
    }

    // this method is for click on any element
    async clickOnElement(locator: Locator) {
        await locator.click();
    }

    // this method is for hovering over any element
    async hoverOnElement(locator: Locator) {
        await locator.hover();
    }


}

