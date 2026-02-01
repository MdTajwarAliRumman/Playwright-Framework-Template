import { Locator, Page } from "@playwright/test";

export class PaymentPage {
    // initialize all the pages

    readonly page: Page;
    readonly nameOnCard: Locator;
    readonly cardNumber: Locator;
    readonly cvc: Locator;
    readonly expiryMonth: Locator;
    readonly expiryYear: Locator;
    readonly payButton: Locator;

    constructor(page: Page) {
        this.page = page

        // Elements
        this.nameOnCard = page.locator("//input[@name='name_on_card']");
        this.cardNumber = page.locator("//input[@name='card_number']");
        this.cvc = page.locator("//input[@placeholder='ex. 311']");
        this.expiryMonth = page.locator("//input[@placeholder='MM']");
        this.expiryYear = page.locator("//input[@placeholder='YYYY']");
        this.payButton = page.locator("//button[@id='submit']");
    }

    // Methods
    async paymentDetails(nameOnCard: string, cardNumber: string, cvc: string, expiryMonth: string, expiryYear: string) {
        await this.nameOnCard.fill(nameOnCard);
        await this.cardNumber.fill(cardNumber);
        await this.cvc.fill(cvc);
        await this.expiryMonth.fill(expiryMonth);
        await this.expiryYear.fill(expiryYear);
        await this.payButton.click();
    }

}

