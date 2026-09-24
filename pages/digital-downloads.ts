import { Page, Locator, expect } from '@playwright/test';

const ADD_TO_CART_TIMEOUT = 10000;

export class DigitalDownloadsPage {
  readonly page: Page;
  readonly categoryLink: Locator;
  readonly productItems: Locator;
  readonly notificationSuccessBar: Locator;
  readonly detailsPageAddToCartButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.categoryLink = page.getByRole('link', { name: 'Digital downloads' }).first();
    this.productItems = page.locator('.product-item');
    this.notificationSuccessBar = page.locator('#bar-notification .content');
    this.detailsPageAddToCartButton = page.locator('.add-to-cart-button').first();
  }

  async navigateToDigitalDownloads() {
    await this.categoryLink.click();
    await this.productItems.first().waitFor();
  }

  async addRandomProductToCart(): Promise<string> {
    const count = await this.productItems.count();
    if (count === 0) {
      throw new Error('No products found in Digital Downloads section!');
    }

    const randomIndex = Math.floor(Math.random() * count);
    const selectedProduct = this.productItems.nth(randomIndex);

    const productName = await selectedProduct.locator('.product-title a').innerText();

    const addToCartButton = selectedProduct.getByRole('button', { name: 'Add to cart' });
    await addToCartButton.click();

    await this.confirmProductAddedToCart();

    return productName.trim();
  }

  private async confirmProductAddedToCart() {
    await Promise.race([
      this.notificationSuccessBar.waitFor({ state: 'visible', timeout: ADD_TO_CART_TIMEOUT }),
      this.detailsPageAddToCartButton.waitFor({ state: 'visible', timeout: ADD_TO_CART_TIMEOUT }),
    ]).catch(() => {});

    if (await this.detailsPageAddToCartButton.isVisible()) {
      await this.detailsPageAddToCartButton.click();
    }

    await expect(this.notificationSuccessBar).toBeVisible({ timeout: ADD_TO_CART_TIMEOUT });
  }
}