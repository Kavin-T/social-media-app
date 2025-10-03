import { test, expect } from '@playwright/test';

test.describe('Login Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/login');
  });

  test('renders login form', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible();
    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Login' })).toBeVisible();
  });

  test('login fails with wrong credentials (server error)', async ({ page }) => {

    await page.fill('#email', 'wrong@example.com');
    await page.fill('#password', 'wrongpass');
    await page.click('button[type="submit"]');

    await expect(page.locator('.MuiAlert-root')).toContainText(
      'Email or password incorrect'
    );
  });

  test('successful login redirects to home', async ({ page }) => {

    await page.fill('#email', 'user1@gmail.com');
    await page.fill('#password', 'user1111');
    await page.click('button[type="submit"]');

    await expect(page).toHaveURL('http://localhost:3000/');
  });
});
