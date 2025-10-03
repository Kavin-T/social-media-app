import { test, expect } from '@playwright/test';

test.describe('Signup Page', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to signup route
    await page.goto('http://localhost:3000/signup');
  });

  test('renders signup form', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'Sign Up' })).toBeVisible();
    await expect(page.locator('#username')).toBeVisible();
    await expect(page.locator('#email')).toBeVisible();
    await expect(page.locator('#password')).toBeVisible();
    await expect(page.getByRole('button', { name: 'Sign Up' })).toBeVisible();
  });

  test('shows validation error for short username', async ({ page }) => {
    await page.fill('#username', 'abc');
    await page.fill('#email', 'test@example.com');
    await page.fill('#password', 'password123');
    await page.click('button[type="submit"]');

    await expect(page.locator('#username-helper-text')).toContainText('between 6 and 30');
  });

  test('successful signup redirects to home', async ({ page }) => {
    // These values should pass validation
    await page.fill('#username', 'user33');
    await page.fill('#email', 'user3@gmail.com');
    await page.fill('#password', 'user3333');

    await page.click('button[type="submit"]');

    // Expect navigation to home page
    await expect(page).toHaveURL('http://localhost:3000/');
  });

});
