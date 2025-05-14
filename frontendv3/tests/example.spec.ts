// tests/example.spec.ts
import { test, expect } from '@playwright/test';

test('basic test', async ({ page }) => {
  await page.goto('/');
  const title = await page.title();
  expect(title).toBe('Seldom Platform');
});