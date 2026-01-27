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

    readonly AccountNameTextBox: Locator;
    readonly PasswordTextBox: Locator;
    readonly DayDropDown: Locator;
    readonly MonthDropDown: Locator;
    readonly YearDropDown: Locator;
    readonly NewsSettlerCheckbox: Locator;
    readonly OffersCheckbox: Locator;
    readonly firstName: Locator;
    readonly lastName: Locator;
    readonly company: Locator;
    readonly address: Locator;
    readonly address2: Locator;
    readonly country: Locator;
    readonly state: Locator;
    readonly city: Locator;
    readonly zipCode: Locator;
    readonly mobileNumber: Locator;
    readonly createAccountButton: Locator;
    readonly continueButton: Locator;
    readonly loggedInUser: Locator;
    readonly userDeleteBtn: Locator;
    readonly logoutButton: Locator;

    constructor(page: Page) {
        this.page = page

        // Elements
        this.LoginEmailTextBox = page.locator("//input[@data-qa='login-email']")
        this.LoginPasswordTextBox = page.locator("//input[@placeholder='Password']")
        this.LoginButton = page.locator("//button[normalize-space()='Login']")


        this.NameTextBox = page.locator("//input[@placeholder='Name']")
        this.SignupEmailTextBox = page.locator("//input[@data-qa='signup-email']")
        this.SignupButton = page.locator("//button[normalize-space()='Signup']")

        this.AccountInfoTitle = page.getByText('ENTER ACCOUNT INFORMATION')

        this.AccountNameTextBox = page.locator("//input[@id='name']")
        this.PasswordTextBox = page.locator("//input[@id='password']")
        this.DayDropDown = page.locator("//select[@id='days']")
        this.MonthDropDown = page.locator("//select[@id='months']")
        this.YearDropDown = page.locator("//select[@id='years']")
        this.NewsSettlerCheckbox = page.locator("//input[@id='newsletter']")
        this.OffersCheckbox = page.locator("//input[@id='optin']")
        this.firstName = page.locator("//input[@id='first_name']")
        this.lastName = page.locator("//input[@id='last_name']")
        this.company = page.locator("//input[@id='company']")
        this.address = page.locator("//input[@id='address1']")
        this.address2 = page.locator("//input[@id='address2']")
        this.country = page.locator("//select[@id='country']")
        this.state = page.locator("//input[@id='state']")
        this.city = page.locator("//input[@id='city']")
        this.zipCode = page.locator("//input[@id='zipcode']")
        this.mobileNumber = page.locator("//input[@id='mobile_number']")
        this.createAccountButton = page.locator("//button[normalize-space()='Create Account']")
        this.continueButton = page.locator("//a[normalize-space()='Continue']")
        this.loggedInUser = page.locator("//header[@id='header']//li[1]//a[1]")
        this.userDeleteBtn = page.locator("//a[normalize-space()='Delete Account']")

        this.logoutButton = page.locator("//a[normalize-space()='Logout']")
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

    async AccountInfo(name: string, password: string, day: string, month: string, year: string, firstName: string, lastName: string, company: string,
        address: string, address2: string, country: string, state: string, city: string, zipCode: string, mobileNumber: string) {
        await this.AccountNameTextBox.fill(name);
        await this.PasswordTextBox.fill(password);
        await this.DayDropDown.selectOption(day);
        await this.MonthDropDown.selectOption(month);
        await this.YearDropDown.selectOption(year);
        await this.NewsSettlerCheckbox.check();
        await this.OffersCheckbox.check();
        await this.firstName.fill(firstName);
        await this.lastName.fill(lastName);
        await this.company.fill(company);
        await this.address.fill(address);
        await this.address2.fill(address2);
        await this.country.selectOption(country);
        await this.state.fill(state);
        await this.city.fill(city);
        await this.zipCode.fill(zipCode);
        await this.mobileNumber.fill(mobileNumber);
        await this.createAccountButton.click();
    }

    async Login(email: string, password: string) {
        await this.LoginEmailTextBox.fill(email);
        await this.LoginPasswordTextBox.fill(password);
        await this.LoginButton.click();
    }

}