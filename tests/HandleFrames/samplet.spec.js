import { test, expect } from "@playwright/test";

test("sample testing first round", async ({ page }) => {
  await page.goto(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
  );
  await page.locator('//span[normalize-space()="PIM"]').click();
});

test("sample testing secound round", async ({ page }) => {
  await page.goto(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
  );
  await page.locator('//span[normalize-space()="Leave"]').click();
});
