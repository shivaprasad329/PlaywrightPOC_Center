import { test, expect } from "@playwright/test";

test("Handle Frames", async ({ page }) => {
  await page.goto("https://letcode.in/frame");

  //Switch to the frame
  const frame = await page.frameLocator('iframe[name="firstFr"]');
  await frame.getByRole("textbox", { name: "Enter name" }).click();
  await frame
    .getByRole("textbox", { name: "Enter name" })
    .fill("Automation Testing");
});
