import { test, expect } from "@playwright/test";



test("Check PIM Flow", async ({ browser }) => {
  const context = await browser.newContext({
    storageState: "user.json",
  });
  const page = await context.newPage();

  await page.goto(
    "https://opensource-demo.orangehrmlive.com/web/index.php/auth/login"
  );
  await page.locator("//span[normalize-space()='PIM']").click();
  await page
    .locator("//h5[normalize-space()='Employee Information']")
    .isVisible();
});
