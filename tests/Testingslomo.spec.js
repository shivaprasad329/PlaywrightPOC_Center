import { test, expect } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const baseURL = process.env.URL;
const userName = process.env.LoggedUserName;
const password = process.env.Loggedpassword;

test("Testing slomo", async ({ page }) => {
  await page.goto(baseURL);
  await page.locator("//input[@placeholder='Username']").fill(userName);
  await page.locator("//input[@placeholder='Password']").fill(password);
  await page.locator("//button[normalize-space()='Login']").click();
  await page.getByRole("heading", { name: "Dashboard" }).isVisible();

  await expect(page.getByRole("heading", { name: "Dashboard" })).toBeVisible();
  await expect(page.getByRole("heading")).toContainText("Dashboard");
});
