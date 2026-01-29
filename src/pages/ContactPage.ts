import { Locator, Page } from "@playwright/test";

export class ContactPage {
    // initialize all the pages

    readonly page: Page;
    readonly ContactButton: Locator;
    readonly NameTextBox: Locator;
    readonly EmailTextBox: Locator;
    readonly SubjectTextBox: Locator;
    readonly MessageTextBox: Locator;
    readonly SubmitButton: Locator;
    readonly UploadFile: Locator;

    constructor(page: Page) {
        this.page = page

        // Elements
        this.ContactButton = page.locator("//a[normalize-space()='Contact us']")
        this.NameTextBox = page.locator("//input[@placeholder='Name']")
        this.EmailTextBox = page.locator("//input[@placeholder='Email']")
        this.SubjectTextBox = page.locator("//input[@placeholder='Subject']")
        this.MessageTextBox = page.locator("//textarea[@id='message']")
        this.SubmitButton = page.locator("//input[@name='submit']")
        this.UploadFile = page.locator("//input[@name='upload_file']")
    }

    // Methods
    async clickContact() {
        await this.ContactButton.click();
    }

    async contactFormDetails(name: string, email: string, subject: string, message: string) {

        await this.NameTextBox.fill(name);
        await this.EmailTextBox.fill(email);
        await this.SubjectTextBox.fill(subject);
        await this.MessageTextBox.fill(message);
        // await this.UploadFile.setInputFiles('Images/SQA.jpg');
        // await this.SubmitButton.click();
    }

    // This method is for alert message/popup message
    async alertMessage() {
        this.page.once('dialog', dialog => {
            dialog.accept();
            console.log(`Alert message is: ${dialog.message()}`);
            console.log(`Dialog type is: ${dialog.type()}`);
        })
    }
}

