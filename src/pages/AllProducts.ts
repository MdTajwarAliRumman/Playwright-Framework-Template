import { expect, Locator, Page } from "@playwright/test";

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
    readonly AddToCart: Locator;
    readonly products: Locator;
    readonly checkoutButton: Locator;

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

        this.AddToCart = page.getByText("Add to cart")

        this.products = page.locator('.product-image-wrapper');

        this.checkoutButton = page.locator("//a[normalize-space()='Proceed To Checkout']");

    }

    // Methods
    async clickViewProduct() {
        await this.ViewProduct.click();
    }

    async clickAddToCart() {
        await this.AddToCart.click();
    }

    async selectProducts() {
        await this.products.click();
    }


    async verifyAllCartProductsDetails() {
        const AddedCartProducts = this.page.locator('tbody tr[id^="product-"]');
        const count = await AddedCartProducts.count();

        expect(count).toBeGreaterThan(0);

        for (let i = 0; i < count; i++) {
            const cartProduct = AddedCartProducts.nth(i);

            // Product Name
            const name = cartProduct.locator('.cart_description h4 a');
            await expect(name).toBeVisible();

            // Price
            const price = cartProduct.locator('.cart_price p');
            await expect(price).toBeVisible();

            // Quantity
            const quantity = cartProduct.locator('.cart_quantity button');
            await expect(quantity).toBeVisible();

            // Total
            const total = cartProduct.locator('.cart_total_price');
            await expect(total).toBeVisible();
        }
    }

}

