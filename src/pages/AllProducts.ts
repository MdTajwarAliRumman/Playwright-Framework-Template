import { Locator, Page } from "@playwright/test";

export class AllProductsPage {
    // initialize all the pages

    readonly page: Page;
    readonly ViewProduct: Locator;
    readonly productInformation: Locator;
    readonly productPrice: Locator;
    readonly productName: Locator;
    readonly productCategory: Locator;
    readonly productQuantity: Locator;
    readonly productAvailability: Locator;
    readonly productCondition: Locator;
    readonly productBrand: Locator;
    readonly searchBox: Locator;
    readonly searchButton: Locator;

    constructor(page: Page) {
        this.page = page

        // Elements
        this.ViewProduct = page.locator("//div[@class='col-sm-9 padding-right']//div[2]//div[1]//div[2]//ul[1]//li[1]//a[1]")
        this.productInformation = page.locator("//div[@class='product-information']")
        this.productPrice = page.locator("div[class='product-information'] span span")
        this.productName = page.locator("div[class='product-information'] h2")
        this.productCategory = page.locator("//p[normalize-space()='Category: Women > Tops']")
        this.productQuantity = page.locator("#quantity")
        this.productAvailability = page.locator("//div[@class='product-details']//p[1]")
        this.productCondition = page.locator("//div[@class='product-details']//p[1]")
        this.productBrand = page.locator("//div[@class='product-details']//p[1]")

        this.searchBox = page.locator("//input[@id='search_product']")
        this.searchButton = page.locator("//button[@id='submit_search']")

    }

    // Methods
    async clickViewProduct() {
        await this.ViewProduct.click();
    }

}

