import { Page, Locator, expect } from '@playwright/test';

export class ShoppingCartPage {
  readonly page: Page;
  readonly shoppingCartLink: Locator;
  readonly cartProductNames: Locator;

  constructor(page: Page) {
    this.page = page;
    this.shoppingCartLink = page.getByRole('link', { name: 'Shopping cart' }).first();
    this.cartProductNames = page.locator('.shopping-cart-page .product-name');
  }

  async openCart() {
    await this.shoppingCartLink.click();
  }

  async verifyProductInCart(expectedProductName: string) {
    await expect(this.cartProductNames).toContainText(expectedProductName);
  }
}