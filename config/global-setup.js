import { chromium } from "playwright";
import { expect } from "playwright/test";
import fs from "fs";
import path from "path";
import dotenv from "dotenv";

// Load environment variables from .env file
dotenv.config();

const authFile = path.join(__dirname, "./../user.json");

async function globalSetup() {
  const storageStatePath = authFile;

  // Check if the storage state file already exists
  if (fs.existsSync(storageStatePath)) {
    console.log("Storage state file exists. Skipping login.");
    return;
  }

  const browser = await chromium.launch({
    headless: false,
    args: ["--start-maximized"],
  });

  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    // Start tracing for debugging purposes
    await context.tracing.start({ screenshots: true, snapshots: true });

    // Navigate to the login page using the URL from .env
    await page.goto(process.env.APPLICATION_URL);

    // Perform login using credentials from .env
    await page
      .getByRole("textbox", { name: "Username" })
      .fill(process.env.LOGINUSERNAME);
    await page
      .getByRole("textbox", { name: "Password" })
      .fill(process.env.PASSWORD);
    await page.getByRole("button", { name: "Login" }).click();

    // Verify successful login by checking for a specific element
    await expect(page.getByRole("link", { name: "Admin" })).toBeVisible();

    // Save the storage state for reuse in tests
    await page.context().storageState({ path: storageStatePath });

    // Stop tracing and save the trace file
    await context.tracing.stop({
      path: "./test-results/setup-trace.zip",
    });

    await browser.close();
  } catch (error) {
    // Handle errors and save a failed trace
    await context.tracing.stop({
      path: "./test-results/failed-setup-trace.zip",
    });
    await browser.close();
    throw error;
  }
}

export default globalSetup;
