import { expect, test } from "playwright/test";

test.describe("Handle Alerts", () => {
  test("Handle Alerts Diologs", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/javascript_alerts");

    //Handling the Alerts box Using the page.on method
    page.on("dialog", async (dialog) => {
      console.log(dialog.message());
      expect(dialog.message()).toBe("I am a JS Alert");
      await dialog.accept();
    });

    await page.getByRole("button", { name: "Click for JS Alert" }).click();
  });

  test("Handle confirmation Diologs", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/javascript_alerts");

    //Handling the Alerts box Using the page.on method
    page.on("dialog", async (dialog) => {
      console.log(dialog.message());
      expect(dialog.message()).toBe("I am a JS Confirm");
      await dialog.accept();
    });

    await page.getByRole("button", { name: "Click for JS Confirm" }).click();
  });

  test("Handle textbox prompt Diologs", async ({ page }) => {
    await page.goto("https://the-internet.herokuapp.com/javascript_alerts");

    //Handling the Alerts box Using the page.on method
    page.on("dialog", async (dialog) => {
      console.log(dialog.message());
      expect(dialog.message()).toBe("I am a JS prompt");

      await dialog.accept("Hello World!");
    });

    await page.getByRole("button", { name: "Click for JS Prompt" }).click();
  });
});
