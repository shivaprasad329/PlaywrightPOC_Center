import { test, expect } from "@playwright/test";

test("Check PIM Flow", async ({ page }) => {
  await page.goto(process.env.APPLICATION_URL);
  await page.locator("//span[normalize-space()='PIM']").click();
  await page
    .locator("//h5[normalize-space()='Employee Information']")
    .isVisible();
});
