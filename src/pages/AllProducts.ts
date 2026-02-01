import { expect, Locator, Page } from "@playwright/test";

export class AllProductsPage {
    // initialize all the pages

    readonly page: Page;
    readonly registerWhileCheckoutBtn: Locator;
    readonly ViewProduct1: Locator;
    readonly ViewProduct2: Locator;
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
    readonly productQuantityInCart: Locator;
    readonly textAreaMessage: Locator;
    readonly placeOrderButton: Locator;

    constructor(page: Page) {
        this.page = page

        // Elements
        this.ViewProduct1 = page.locator("a[href='/product_details/1']")
        this.ViewProduct2 = page.locator("a[href='/product_details/3']")
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

        this.productQuantityInCart = page.locator(".cart_quantity");

        this.registerWhileCheckoutBtn = page.locator("//u[normalize-space()='Register / Login']");

        this.textAreaMessage = page.locator("//textarea[@name='message']");
        this.placeOrderButton = page.locator("//a[normalize-space()='Place Order']");


    }

    // Methods
    async clickViewProduct() {
        await this.ViewProduct1.click();
    }

    async clickAddToCart() {
        await this.AddToCart.click();
    }

    async selectProducts() {
        await this.products.click();
    }

    // this loop is for different items or product selections and there visibility
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

