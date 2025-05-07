import { test, expect } from "@playwright/test";

test("test", async ({ page }) => {
  await page.goto("https://www.letskodeit.com/practice");
  const page1Promise = page.waitForEvent("popup");
  await page.getByRole("button", { name: "Open Window" }).click();
  const page1 = await page1Promise;
  await expect(page1.locator("#navbar-inverse-collapse")).toContainText(
    "INTERVIEW"
  );
  await expect(page1.getByRole("link", { name: "INTERVIEW" })).toBeVisible();
  await expect(page1.getByRole("link", { name: "INTERVIEW" })).toBeVisible();
});

test.only("Handling the Tabs", async ({ page }) => {
  await page.goto("https://www.letskodeit.com/practice");

  const [newTab] = await Promise.all([
    page.waitForEvent("popup"),
    page.getByRole("button", { name: "Open Window" }).click(),
  ]);

  await expect(newTab.getByRole("link", { name: "INTERVIEW" })).toBeVisible();
  await expect(newTab.getByRole("link", { name: "INTERVIEW" })).toBeVisible();
});
