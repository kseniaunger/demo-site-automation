import { test } from "../fixtures";
import { generateUserData } from "../utils";

test.describe('DemoWebShop E2E', () => {

  test('User registration and random item cart verification', async ({
    registerPage,
    digitalDownloadsPage,
    shoppingCartPage
  }) => {
    const user = generateUserData();

    await registerPage.registerNewUser(user);

    await digitalDownloadsPage.navigateToDigitalDownloads();
    const selectedProductName = await digitalDownloadsPage.addRandomProductToCart();

    await shoppingCartPage.openCart();
    await shoppingCartPage.verifyProductInCart(selectedProductName);
    });
});