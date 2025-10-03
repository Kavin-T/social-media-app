import { test, expect } from '@playwright/test';

test.describe('Post Page', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/login');
    await page.fill('#email', 'user1@gmail.com');
    await page.fill('#password', 'user1111');
    await page.click('button[type="submit"]');
    await expect(page).toHaveURL('http://localhost:3000/');
  });

  test('create post', async ({ page }) => {
    await page.locator('text=NEW POST').click();
    await expect(page).toHaveURL('http://localhost:3000/posts/create');
  });

});
