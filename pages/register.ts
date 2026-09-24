import { Page, Locator, expect } from '@playwright/test';
import { UserData } from '../utils';

export class RegisterPage {
  readonly page: Page;
  
  readonly genderFemaleRadio: Locator;
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly registerButton: Locator;
  readonly continueButton: Locator;
  readonly headerEmailLink: Locator;

  constructor(page: Page) {
    this.page = page;

    this.genderFemaleRadio = page.getByLabel('Female', { exact: true });
    this.firstNameInput = page.getByLabel('First name:');
    this.lastNameInput = page.getByLabel('Last name:');
    this.emailInput = page.getByLabel('Email:');
    this.passwordInput = page.getByLabel('Password:', { exact: true });
    this.confirmPasswordInput = page.getByLabel('Confirm password:');
    this.registerButton = page.getByRole('button', { name: 'Register' });
    this.continueButton = page.getByRole('button', { name: 'Continue' });
    
    this.headerEmailLink = page.locator('.header .account');
  }

  async navigateToRegister() {
    await this.page.goto('/');
    await this.page.getByRole('link', { name: 'Register' }).click();
  }

  async fillRegistrationForm(firstName: string, lastName: string, email: string, pass: string) {
    await this.genderFemaleRadio.check();
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
    await this.passwordInput.fill(pass);
    await this.confirmPasswordInput.fill(pass);
  }

  async submitRegistration() {
    await this.registerButton.click();
    await this.continueButton.click();
  }

  async verifyRegisteredEmail(expectedEmail: string) {
    await expect(this.headerEmailLink).toHaveText(expectedEmail);
  }

  async registerNewUser({firstName, lastName, email, password}: UserData) {
    await this.fillRegistrationForm(firstName, lastName, email, password);
    await this.submitRegistration();
    await this.verifyRegisteredEmail(email);
  }
}