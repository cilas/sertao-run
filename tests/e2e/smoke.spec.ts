import { expect, test } from '@playwright/test';

test('carrega a página e renderiza o canvas do Phaser', async ({ page }) => {
  await page.goto('/');

  await expect(page).toHaveTitle(/Sertao Run/i);
  await expect(page.locator('#game-container canvas')).toBeVisible();
});
