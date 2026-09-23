import { test as base } from '@playwright/test';
import { RegisterPage, DigitalDownloadsPage, ShoppingCartPage } from '../pages';

type PageFixtures = {
  registerPage: RegisterPage;
  digitalDownloadsPage: DigitalDownloadsPage;
  shoppingCartPage: ShoppingCartPage;
};

export const test = base.extend<PageFixtures>({
  
  registerPage: async ({ page }, use) => {
    const registerPage = new RegisterPage(page);
    
    await registerPage.navigateToRegister();

    await use(registerPage);

    const logoutLink = page.getByRole('link', { name: 'Log out' });
    if (await logoutLink.isVisible()) {
      await logoutLink.click();
    }
  },

  digitalDownloadsPage: async ({ page }, use) => {
    const digitalDownloadsPage = new DigitalDownloadsPage(page);
    await use(digitalDownloadsPage);
  },

  shoppingCartPage: async ({ page }, use) => {
    const shoppingCartPage = new ShoppingCartPage(page);
    await use(shoppingCartPage);
  },
});

export { expect } from '@playwright/test';