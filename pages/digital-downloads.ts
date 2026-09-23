import { Page, Locator, expect } from '@playwright/test';

export class DigitalDownloadsPage {
  readonly page: Page;
  readonly categoryLink: Locator;
  readonly productItems: Locator;
  readonly notificationSuccessBar: Locator;

  constructor(page: Page) {
    this.page = page;
    this.categoryLink = page.getByRole('link', { name: 'Digital downloads' }).first();
    this.productItems = page.locator('.product-item');
    this.notificationSuccessBar = page.locator('#bar-notification .content');
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
 
    if (this.page.url().includes('/3rd-album') || this.page.url().includes('album')) {
      const detailsAddToCartBtn = this.page.locator('.add-to-cart-button').first();
      if (await detailsAddToCartBtn.isVisible()) {
        await detailsAddToCartBtn.click();
      }
    }

    await expect(this.notificationSuccessBar).toBeVisible({ timeout: 10000 });

    return productName.trim();
  }
}